import numpy as np
import pandas as pd
from pathlib import Path
import logging

# ============================================================
# CONFIGURACIÓN — Solo preprocesamiento (sin modelos)
# ============================================================
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Parámetros del preprocesamiento
LOOK_BACK = 24
RAIN_COL = 'Rain_mm_Tot'

FEATURES = [
    'SlrkW_Avg', 'SlrMJ_Tot', 'WS_ms_Avg', 'NR_Wm2_Avg',
    'VW', 'WindDir', 'Rain_mm_Tot',
    'hour_sin', 'hour_cos', 'month_sin', 'month_cos',
    'Rain_lag1', 'Rain_lag2', 'Rain_lag3'
]


class PredictorLluvia:
    """Clase de preprocesamiento de datos CSV de estaciones meteorológicas."""

    def __init__(self):
        pass

    # ----------------------------------------------------------
    # MÉTODO PRINCIPAL
    # ----------------------------------------------------------
    def predecir(self, csv_path: str, max_records: int = 1000) -> dict:
        """
        Preprocesa CSV y retorna datos procesables.
        
        Args:
            csv_path: Ruta al CSV
            max_records: Máximo de registros a procesar (default 1000)
        
        Returns:
            dict con información sobre el preprocesamiento
        """
        try:
            data = self._preprocesar_csv(csv_path)
            
            # Limitar a max_records si necesario
            if len(data) > max_records:
                data = data.iloc[-max_records:]
            
            if len(data) == 0:
                return self._error('No hay datos para procesar')
            
            return {
                'clase'          : None,
                'etiqueta'       : 'Datos procesados',
                'probabilidades' : {},
                'alerta'         : False,
                'mensaje'        : f'[+] {len(data)} registros procesados y listos para usar.',
                'error'          : None,
                'registros_listos': len(data),
                'datos'          : data
            }
        except Exception as e:
            return self._error(f'Error al procesar el CSV: {str(e)}')

    # ----------------------------------------------------------
    # PREPROCESAMIENTO DEL CSV
    # ----------------------------------------------------------
    def _preprocesar_csv(self, csv_path: str) -> pd.DataFrame:
        """Carga CSV de 15min, resamplea a 1h y construye las features."""

        df = pd.read_csv(
            csv_path,
            parse_dates=['TIMESTAMP'],
            index_col='TIMESTAMP',
            na_values=['NA', 'NaN', '']
        )
        logging.info(f"[*] CSV cargado: {len(df)} observaciones de 15min")
        logging.info(f"[*] Columnas disponibles: {df.columns.tolist()}")

        # Resampleo 15min → 1h
        other_cols = [c for c in df.columns if c != RAIN_COL]
        df_h = pd.concat([
            df[other_cols].resample('1h').mean(),
            df[[RAIN_COL]].resample('1h').sum()
        ], axis=1)
        logging.info(f"[*] Despues de resampleo a 1h: {len(df_h)} registros")

        # Interpolación más agresiva
        df_h = df_h.interpolate(method='linear', limit=24)
        
        # Detectar qué columnas críticas existen en el CSV
        critical_cols = [col for col in ['SlrkW_Avg', 'SlrMJ_Tot', 'WS_ms_Avg', 'NR_Wm2_Avg', 'VW', 'WindDir', RAIN_COL] 
                        if col in df_h.columns]
        
        if not critical_cols:
            raise ValueError('No hay columnas críticas disponibles en el CSV')
        
        df_h = df_h.dropna(subset=critical_cols)
        logging.info(f"[*] Despues de interpolacion y dropna criticas: {len(df_h)} registros")

        # Features temporales cíclicas
        df_h['hour_sin']  = np.sin(2 * np.pi * df_h.index.hour / 24)
        df_h['hour_cos']  = np.cos(2 * np.pi * df_h.index.hour / 24)
        df_h['month_sin'] = np.sin(2 * np.pi * df_h.index.month / 12)
        df_h['month_cos'] = np.cos(2 * np.pi * df_h.index.month / 12)

        # Lags de lluvia
        if RAIN_COL in df_h.columns:
            df_h['Rain_lag1'] = df_h[RAIN_COL].shift(1)
            df_h['Rain_lag2'] = df_h[RAIN_COL].shift(2)
            df_h['Rain_lag3'] = df_h[RAIN_COL].shift(3)

            # Rellenar NAs en lags con 0
            for lag_col in ['Rain_lag1', 'Rain_lag2', 'Rain_lag3']:
                if lag_col in df_h.columns:
                    df_h[lag_col] = df_h[lag_col].fillna(0)

        df_antes = len(df_h)
        # DropNA SOLO en las features que existen y se usarán
        features_disponibles = [f for f in FEATURES if f in df_h.columns]
        
        if not features_disponibles:
            raise ValueError(f'Ninguna de las features esperadas existe en el CSV. Features esperadas: {FEATURES}')
        
        df_h = df_h.dropna(subset=features_disponibles)
        df_despues = len(df_h)
        logging.info(f"[*] Despues de dropna final: {df_despues} registros ({df_antes - df_despues} filas descartadas)")

        # Verificar que tenemos datos
        if len(df_h) == 0:
            raise ValueError('El CSV no tiene datos procesables después del dropna (todas las filas tiene NaN en features críticas)')

        logging.info(f"[+] Preprocesamiento completado: {len(df_h)} registros listos")
        return df_h[features_disponibles]

    # ----------------------------------------------------------
    # ERROR
    # ----------------------------------------------------------
    def _error(self, mensaje: str) -> dict:
        return {
            'clase'          : None,
            'etiqueta'       : None,
            'probabilidades' : None,
            'alerta'         : False,
            'mensaje'        : f'[-] {mensaje}',
            'error'          : mensaje
        }
