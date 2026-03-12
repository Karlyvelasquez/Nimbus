"""Train GRU models for JUN precipitation forecasting at 1h, 3h, and 6h horizons.

Pipeline:
1. Read 15-minute JUN dataset.
2. Aggregate to hourly data using mean for regular variables and sum for precipitation.
3. Build supervised sequences for each forecast horizon.
4. Train one GRU model per horizon.
5. Save model artifacts and metrics.

Usage example:
    python Backend/Models/Junco/train_gru_jun.py
"""

from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Tuple

import numpy as np
import pandas as pd
import torch
import torch.nn as nn
from sklearn.metrics import mean_absolute_error, mean_squared_error
from sklearn.preprocessing import StandardScaler
from torch.utils.data import DataLoader, TensorDataset


@dataclass
class SplitData:
    x_train: np.ndarray
    y_train: np.ndarray
    x_val: np.ndarray
    y_val: np.ndarray
    x_test: np.ndarray
    y_test: np.ndarray


class GRURegressor(nn.Module):
    def __init__(self, input_size: int, hidden_size: int = 64, num_layers: int = 2, dropout: float = 0.2):
        super().__init__()
        self.gru = nn.GRU(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            dropout=dropout if num_layers > 1 else 0.0,
            batch_first=True,
        )
        self.head = nn.Sequential(
            nn.Linear(hidden_size, 32),
            nn.ReLU(),
            nn.Linear(32, 1),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        out, _ = self.gru(x)
        return self.head(out[:, -1, :]).squeeze(-1)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Train GRU models for JUN precipitation")
    parser.add_argument(
        "--data-path",
        type=Path,
        default=Path("Backend/Models/Datasets/JUN_consolid_f15.csv"),
        help="Path to JUN 15-minute CSV dataset.",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("Backend/Models/Junco/artifacts"),
        help="Directory to save trained models and metrics.",
    )
    parser.add_argument("--timestamp-col", type=str, default="TIMESTAMP")
    parser.add_argument("--rain-col", type=str, default="Rain_mm_Tot")
    parser.add_argument("--resample-rule", type=str, default="1h", help="Resampling frequency.")
    parser.add_argument("--lookback", type=int, default=24, help="Historical window length in hours.")
    parser.add_argument("--horizons", nargs="+", type=int, default=[1, 3, 6], help="Forecast horizons in hours.")
    parser.add_argument("--epochs", type=int, default=30)
    parser.add_argument("--batch-size", type=int, default=128)
    parser.add_argument("--lr", type=float, default=1e-3)
    parser.add_argument("--hidden-size", type=int, default=64)
    parser.add_argument("--num-layers", type=int, default=2)
    parser.add_argument("--dropout", type=float, default=0.2)
    parser.add_argument("--patience", type=int, default=6, help="Early stopping patience.")
    parser.add_argument("--seed", type=int, default=42)
    return parser.parse_args()


def set_seed(seed: int) -> None:
    np.random.seed(seed)
    torch.manual_seed(seed)
    if torch.cuda.is_available():
        torch.cuda.manual_seed_all(seed)


def load_and_resample(
    data_path: Path,
    timestamp_col: str,
    rain_col: str,
    resample_rule: str,
) -> pd.DataFrame:
    df = pd.read_csv(data_path, na_values=["NA", "", "null", "None"])
    if timestamp_col not in df.columns:
        raise ValueError(f"Timestamp column '{timestamp_col}' not found in dataset")
    if rain_col not in df.columns:
        raise ValueError(f"Rain column '{rain_col}' not found in dataset")

    df[timestamp_col] = pd.to_datetime(df[timestamp_col], errors="coerce")
    df = df.dropna(subset=[timestamp_col]).sort_values(timestamp_col)

    for col in df.columns:
        if col != timestamp_col:
            df[col] = pd.to_numeric(df[col], errors="coerce")

    df = df.set_index(timestamp_col)
    numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()

    agg_map = {col: "mean" for col in numeric_cols}
    agg_map[rain_col] = "sum"
    hourly = df[numeric_cols].resample(resample_rule).agg(agg_map)

    hourly = hourly.replace([np.inf, -np.inf], np.nan)
    # Some columns in this dataset are entirely missing; remove them before training.
    hourly = hourly.dropna(axis=1, how="all")
    hourly = hourly.ffill().bfill().dropna(how="all")
    return hourly


def build_supervised(df: pd.DataFrame, rain_col: str, horizon: int) -> Tuple[pd.DataFrame, pd.Series]:
    x = df.copy()
    y = df[rain_col].shift(-horizon)
    supervised = x.copy()
    supervised["target"] = y
    supervised = supervised.dropna(subset=["target"])
    x = supervised.drop(columns=["target"])
    y = supervised["target"]
    return x, y


def train_val_test_split(x: pd.DataFrame, y: pd.Series, train_ratio: float = 0.7, val_ratio: float = 0.15) -> SplitData:
    n = len(x)
    train_end = int(n * train_ratio)
    val_end = int(n * (train_ratio + val_ratio))

    x_train = x.iloc[:train_end].to_numpy(dtype=np.float32)
    y_train = y.iloc[:train_end].to_numpy(dtype=np.float32)

    x_val = x.iloc[train_end:val_end].to_numpy(dtype=np.float32)
    y_val = y.iloc[train_end:val_end].to_numpy(dtype=np.float32)

    x_test = x.iloc[val_end:].to_numpy(dtype=np.float32)
    y_test = y.iloc[val_end:].to_numpy(dtype=np.float32)

    return SplitData(x_train, y_train, x_val, y_val, x_test, y_test)


def to_sequences(x: np.ndarray, y: np.ndarray, lookback: int) -> Tuple[np.ndarray, np.ndarray]:
    if len(x) <= lookback:
        raise ValueError("Not enough samples to create sequences. Reduce lookback or provide more data.")
    xs, ys = [], []
    for i in range(lookback, len(x)):
        xs.append(x[i - lookback : i])
        ys.append(y[i])
    return np.array(xs, dtype=np.float32), np.array(ys, dtype=np.float32)


def make_loaders(split: SplitData, lookback: int, batch_size: int) -> Tuple[DataLoader, DataLoader, DataLoader, StandardScaler]:
    scaler = StandardScaler()
    scaler.fit(split.x_train)

    x_train_scaled = scaler.transform(split.x_train)
    x_val_scaled = scaler.transform(split.x_val)
    x_test_scaled = scaler.transform(split.x_test)

    xtr, ytr = to_sequences(x_train_scaled, split.y_train, lookback)
    xva, yva = to_sequences(x_val_scaled, split.y_val, lookback)
    xte, yte = to_sequences(x_test_scaled, split.y_test, lookback)

    train_loader = DataLoader(TensorDataset(torch.from_numpy(xtr), torch.from_numpy(ytr)), batch_size=batch_size, shuffle=True)
    val_loader = DataLoader(TensorDataset(torch.from_numpy(xva), torch.from_numpy(yva)), batch_size=batch_size, shuffle=False)
    test_loader = DataLoader(TensorDataset(torch.from_numpy(xte), torch.from_numpy(yte)), batch_size=batch_size, shuffle=False)
    return train_loader, val_loader, test_loader, scaler


def evaluate(model: nn.Module, loader: DataLoader, device: torch.device) -> Tuple[float, np.ndarray, np.ndarray]:
    model.eval()
    preds, targets = [], []
    with torch.no_grad():
        for xb, yb in loader:
            xb = xb.to(device)
            yb = yb.to(device)
            out = model(xb)
            preds.append(out.cpu().numpy())
            targets.append(yb.cpu().numpy())

    y_pred = np.concatenate(preds)
    y_true = np.concatenate(targets)
    mse = mean_squared_error(y_true, y_pred)
    return float(mse), y_true, y_pred


def train_model(
    train_loader: DataLoader,
    val_loader: DataLoader,
    input_size: int,
    hidden_size: int,
    num_layers: int,
    dropout: float,
    epochs: int,
    lr: float,
    patience: int,
    device: torch.device,
) -> nn.Module:
    model = GRURegressor(input_size=input_size, hidden_size=hidden_size, num_layers=num_layers, dropout=dropout).to(device)
    criterion = nn.MSELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=lr)

    best_val = float("inf")
    best_state = None
    wait = 0

    for epoch in range(1, epochs + 1):
        model.train()
        train_losses: List[float] = []

        for xb, yb in train_loader:
            xb = xb.to(device)
            yb = yb.to(device)

            optimizer.zero_grad()
            pred = model(xb)
            loss = criterion(pred, yb)
            loss.backward()
            optimizer.step()
            train_losses.append(float(loss.item()))

        val_mse, _, _ = evaluate(model, val_loader, device)
        train_mse = float(np.mean(train_losses)) if train_losses else float("nan")
        print(f"Epoch {epoch:03d} | train_mse={train_mse:.6f} | val_mse={val_mse:.6f}")

        if val_mse < best_val:
            best_val = val_mse
            best_state = {k: v.detach().cpu().clone() for k, v in model.state_dict().items()}
            wait = 0
        else:
            wait += 1
            if wait >= patience:
                print(f"Early stopping at epoch {epoch}")
                break

    if best_state is not None:
        model.load_state_dict(best_state)
    return model


def save_artifacts(
    out_dir: Path,
    horizon: int,
    model: nn.Module,
    scaler: StandardScaler,
    metrics: Dict[str, float],
    y_true: np.ndarray,
    y_pred: np.ndarray,
    feature_names: List[str],
) -> None:
    h_dir = out_dir / f"h{horizon}"
    h_dir.mkdir(parents=True, exist_ok=True)

    torch.save(model.state_dict(), h_dir / "gru_model.pt")

    scaler_payload = {
        "mean": scaler.mean_.tolist(),
        "scale": scaler.scale_.tolist(),
        "feature_names": feature_names,
    }
    (h_dir / "scaler.json").write_text(json.dumps(scaler_payload, indent=2), encoding="utf-8")
    (h_dir / "metrics.json").write_text(json.dumps(metrics, indent=2), encoding="utf-8")

    pred_df = pd.DataFrame({"y_true": y_true, "y_pred": y_pred})
    pred_df.to_csv(h_dir / "predictions_test.csv", index=False)


def main() -> None:
    args = parse_args()
    set_seed(args.seed)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    print(f"Using device: {device}")
    print("Loading and resampling dataset...")
    hourly = load_and_resample(args.data_path, args.timestamp_col, args.rain_col, args.resample_rule)
    print(f"Rows after hourly aggregation: {len(hourly)}")

    args.output_dir.mkdir(parents=True, exist_ok=True)

    summary: Dict[str, Dict[str, float]] = {}

    for horizon in args.horizons:
        print("=" * 70)
        print(f"Training horizon: {horizon} hour(s)")

        x_df, y_ser = build_supervised(hourly, args.rain_col, horizon)
        split = train_val_test_split(x_df, y_ser)
        train_loader, val_loader, test_loader, scaler = make_loaders(split, args.lookback, args.batch_size)

        model = train_model(
            train_loader=train_loader,
            val_loader=val_loader,
            input_size=x_df.shape[1],
            hidden_size=args.hidden_size,
            num_layers=args.num_layers,
            dropout=args.dropout,
            epochs=args.epochs,
            lr=args.lr,
            patience=args.patience,
            device=device,
        )

        test_mse, y_true, y_pred = evaluate(model, test_loader, device)
        test_rmse = float(np.sqrt(test_mse))
        test_mae = float(mean_absolute_error(y_true, y_pred))
        metrics = {"mse": float(test_mse), "rmse": test_rmse, "mae": test_mae}

        save_artifacts(
            out_dir=args.output_dir,
            horizon=horizon,
            model=model,
            scaler=scaler,
            metrics=metrics,
            y_true=y_true,
            y_pred=y_pred,
            feature_names=x_df.columns.tolist(),
        )

        summary[f"h{horizon}"] = metrics
        print(f"Test metrics h{horizon}: {metrics}")

    summary_path = args.output_dir / "summary_metrics.json"
    summary_path.write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print("=" * 70)
    print(f"Training complete. Summary saved to: {summary_path}")


if __name__ == "__main__":
    main()
