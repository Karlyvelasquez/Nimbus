"""
TNNService: Singleton service for TNN model inference.

Provides lazy-loaded access to PredictorLluvia for weather predictions.
Models are loaded ONCE at first use, not on every prediction.
"""

import os
import logging
from pathlib import Path
from typing import Optional, Dict, Any
from threading import Lock

logger = logging.getLogger(__name__)


class TNNService:
    """
    Singleton service for TNN model predictions.
    
    Attributes:
        _instance: Singleton instance
        _lock: Thread lock for safe singleton initialization
        _predictor: Lazy-loaded PredictorLluvia instance
        _data_dir: Directory containing CSV files for prediction
    """
    
    _instance: Optional['TNNService'] = None
    _lock: Lock = Lock()
    
    def __new__(cls):
        """Implement singleton pattern with thread safety."""
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._initialized = False
        return cls._instance
    
    def __init__(self):
        """Initialize service (called once due to _initialized flag)."""
        if self._initialized:
            return
        
        self._predictor: Optional[Any] = None
        self._predictor_initialized = False
        
        # Get data directory from environment or use default
        self._data_dir = os.getenv("DATA_DIR", "./Models/Datasets/")
        
        logger.info(f"TNNService initialized with data_dir: {self._data_dir}")
        self._initialized = True
    
    def _load_predictor(self) -> bool:
        """
        Lazy-load PredictorLluvia on first use.
        
        Returns:
            True if successfully loaded, False otherwise
        """
        if self._predictor_initialized:
            return self._predictor is not None
        
        try:
            # Import PredictorLluvia from inferencia_tnn (relative import)
            from .inferencia_tnn import PredictorLluvia
            
            # Instantiate predictor (no arguments - paths are hardcoded in inferencia_tnn)
            self._predictor = PredictorLluvia()
            self._predictor_initialized = True
            logger.info("PredictorLluvia loaded successfully")
            return True
            
        except ImportError as e:
            logger.warning(f"PredictorLluvia not available: {e}")
            self._predictor_initialized = True
            self._predictor = None
            return False
        except Exception as e:
            logger.error(f"Error loading PredictorLluvia: {e}")
            self._predictor_initialized = True
            self._predictor = None
            return False
    
    def get_prediction(self, csv_path: str) -> Dict[str, Any]:
        """
        Get prediction (data processing) for a CSV file.
        
        Args:
            csv_path: Full path to CSV file with weather data
        
        Returns:
            Dictionary with processed data and status
        """
        if not self._load_predictor():
            return self._get_fallback_prediction(error_reason="PredictorLluvia not available")
        
        try:
            if not os.path.exists(csv_path):
                return self._get_fallback_prediction(error_reason=f"CSV file not found: {csv_path}")
            
            # Call predictor method
            prediction = self._predictor.predecir(csv_path, max_records=1000)
            
            # Check if there was an error
            if prediction.get('error') is not None:
                return self._get_fallback_prediction(error_reason=prediction.get('error', 'Unknown error'))
            
            # Add 'ok' flag
            prediction['ok'] = True
            
            logger.info(f"Processed {csv_path}: {prediction.get('registros_listos')} records")
            return prediction
            
        except Exception as e:
            logger.error(f"Error processing {csv_path}: {e}")
            return self._get_fallback_prediction(error_reason=str(e))
    
    def get_latest_prediction(self) -> Dict[str, Any]:
        """
        Get prediction using the most recent CSV from DATA_DIR.
        Prioriza JUN_consolid_f15.csv si existe.
        
        Returns:
            Dictionary with processed data and status
        """
        try:
            # Find CSV file in data directory
            data_path = Path(self._data_dir)
            if not data_path.exists():
                return self._get_fallback_prediction(error_reason=f"Data directory not found: {self._data_dir}")
            
            # Priorizar JUN_consolid_f15.csv
            jun_csv = data_path / "JUN_consolid_f15.csv"
            if jun_csv.exists():
                latest_csv = str(jun_csv)
            else:
                # Si no existe JUN, usar el CSV más reciente
                csv_files = sorted(data_path.glob("*.csv"), key=os.path.getmtime, reverse=True)
                if not csv_files:
                    return self._get_fallback_prediction(error_reason=f"No CSV files found in {self._data_dir}")
                latest_csv = str(csv_files[0])
            
            logger.info(f"Using CSV: {latest_csv}")
            return self.get_prediction(latest_csv)
            
        except Exception as e:
            logger.error(f"Error finding latest prediction: {e}")
            return self._get_fallback_prediction(horizonte, error_reason=str(e))
    
    def _validate_prediction_output(self, prediction: Dict[str, Any]) -> bool:
        """
        Validate that prediction has required keys.
        
        Args:
            prediction: Dictionary from PredictorLluvia
        
        Returns:
            True if valid, False otherwise
        """
        required_keys = {'clase', 'etiqueta', 'probabilidades', 'alerta', 'mensaje'}
        return isinstance(prediction, dict) and required_keys.issubset(prediction.keys())
    
    def _get_fallback_prediction(self, error_reason: str = "") -> Dict[str, Any]:
        """
        Return a safe fallback result when processing fails.
        
        Args:
            error_reason: Reason why fallback is being used
        
        Returns:
            Dictionary with fallback result
        """
        logger.warning(f"Using fallback result: {error_reason}")
        
        return {
            'ok': False,
            'clase': None,
            'etiqueta': None,
            'probabilidades': {},
            'alerta': False,
            'mensaje': f'Error: {error_reason}',
            'error': error_reason,
            'registros_listos': 0
        }
    
    def set_data_dir(self, data_dir: str) -> None:
        """
        Set the data directory for latest predictions.
        
        Args:
            data_dir: Path to directory containing station CSV files
        """
        self._data_dir = data_dir
        logger.info(f"Data directory updated to: {data_dir}")
    
    def reload_predictor(self) -> bool:
        """
        Force reload of PredictorLluvia (useful for testing or model updates).
        
        Returns:
            True if successfully reloaded, False otherwise
        """
        self._predictor_initialized = False
        self._predictor = None
        return self._load_predictor()


def get_tnn_service() -> TNNService:
    """
    Get the singleton TNNService instance.
    
    Returns:
        TNNService singleton
    """
    return TNNService()


__all__ = [
    'TNNService',
    'get_tnn_service',
]
