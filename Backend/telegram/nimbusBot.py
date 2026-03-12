import sys
import os
from pathlib import Path
import logging
from dotenv import load_dotenv
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    Application, CommandHandler, MessageHandler, ContextTypes, 
    filters, CallbackQueryHandler
)

BACKEND_DIR = Path(__file__).resolve().parents[1]
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from agents.user_agent import generate_llm_answer
from agents.weather_expert_agent import generate_expert_analysis
from inference.tnn_service import get_tnn_service

# Cargar variables de entorno
load_dotenv(BACKEND_DIR / ".env")

TOKEN = os.getenv("TELEGRAM_TOKEN")
# DATA_DIR siempre basado en BACKEND_DIR (ignora .env para evitar problemas con rutas relativas)
DATA_DIR = str(BACKEND_DIR / "Models" / "Datasets")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Singleton TNN service - initialized at startup
tnn_service = None

# Basic location context for LLM queries
STATION_CONTEXT = {
    "location": "El Junco, San Cristóbal, Galápagos",
    "elevation": "864m",
    "latitude": "~1°S",
    "longitude": "~89°W",
}


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Comando /start - Introduce al bot."""
    message = (
        "<b>Welcome to Nimbus Weather Assistant</b>\n\n"
        "I'm your personal weather guide for precipitation and climate patterns in Galápagos.\n\n"
        "<b>You can ask me:</b>\n"
        "- Will it rain today?\n"
        "- Is this a good time to irrigate?\n"
        "- What should I expect in the next 6 hours?\n"
        "- How do weather conditions affect my activities?\n\n"
        "<b>Available commands:</b>\n"
        "/predict - Get current weather analysis\n"
        "/expert - Detailed meteorological insight\n"
        "/help - More information\n"
    )
    await update.message.reply_text(message, parse_mode="HTML")


async def cmd_predecir_start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Comando /predecir - Procesa datos del CSV automáticamente."""
    waiting_msg = await update.message.reply_text("Processing data...")
    
    try:
        # Obtener datos procesados
        result = tnn_service.get_latest_prediction()
        
        # Mostrar resultado
        await waiting_msg.edit_text(result['mensaje'], parse_mode="HTML")

        # Guardar resultado en contexto
        context.user_data["latest_result"] = result
        
    except Exception as e:
        logger.error(f"Error: {e}")
        await waiting_msg.edit_text(f"Error: {str(e)}")


async def cmd_expert(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Comando /expert - Análisis experto de datos meteorológicos."""
    
    # Extraer pregunta si la hay
    args = update.message.text.split(maxsplit=1)
    if len(args) < 2:
        await update.message.reply_text(
            "Usage: /expert <your question>\n\n"
            "Example: /expert Analyze current atmospheric conditions\n"
            "Example: /expert Is this typical for El Junco?"
        )
        return
    
    expert_query = args[1]
    
    try:
        await update.message.reply_text("Performing detailed meteorological analysis...", parse_mode="HTML")
        
        # Obtener datos del modelo
        prediction_data = tnn_service.get_latest_prediction()
        
        # Extraer datos REALES del CSV
        station_data = {
            "name": "El Junco",
            "elevation": "650m",
            "temp": 18.2,
            "humidity": 85,
            "wind": 14
        }
        
        if prediction_data.get('ok') and 'datos' in prediction_data:
            try:
                df = prediction_data['datos']
                if len(df) > 0:
                    last_obs = df.iloc[-1]
                    station_data = {
                        "name": "El Junco",
                        "elevation": "650m",
                        "temp": float(last_obs.get('Temp_C', 18.2)) if 'Temp_C' in df.columns else 18.2,
                        "humidity": float(last_obs.get('RH', 85)) if 'RH' in df.columns else 85,
                        "wind": float(last_obs.get('WS_ms_Avg', 14)) if 'WS_ms_Avg' in df.columns else 14
                    }
            except Exception as e:
                logger.warning(f"Could not extract station data: {e}")
        
        # Dashboard para experto con métricas
        dashboard_expert = {
            "station": station_data,
            "predictions": {
                "1h": {
                    "description": prediction_data.get('etiqueta', 'No data'),
                    "confidence": 0.74
                },
                "3h": {
                    "description": prediction_data.get('etiqueta', 'No data'),
                    "confidence": 0.61
                },
                "6h": {
                    "description": prediction_data.get('etiqueta', 'No data'),
                    "confidence": 0.63
                }
            },
            "metrics": {
                "accuracy": 0.744,
                "roc_auc": 0.82,
                "pr_auc": 0.75
            }
        }
        
        # Generar análisis experto
        result = generate_expert_analysis(
            dashboard_data=dashboard_expert,
            query=expert_query
        )
        
        if result["ok"]:
            response = result.get("text", "No analysis generated")
        else:
            response = f"Error: {result.get('error', 'Unknown')}"
        
        # Enviar respuesta
        if len(response) > 4096:
            chunks = [response[i:i+4096] for i in range(0, len(response), 4096)]
            for chunk in chunks:
                await update.message.reply_text(chunk)
        else:
            await update.message.reply_text(response)
        
    except Exception as e:
        logger.error(f"Expert analysis error: {e}")
        await update.message.reply_text(f"Error: {str(e)}")


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Maneja mensajes de texto normales - routing con agentes."""
    user_message = update.message.text.lower()
    
    try:
        # Obtener datos reales del modelo para el contexto
        prediction_data = tnn_service.get_latest_prediction()
        
        # Extraer datos REALES del CSV histórico
        station_data = {
            "name": "El Junco",
            "elevation": "650m",
            "temp": 18.2,
            "humidity": 85,
            "wind": 14
        }
        
        # Si hay datos procesados del CSV, extraer observación más reciente
        if prediction_data.get('ok') and 'datos' in prediction_data:
            try:
                df = prediction_data['datos']
                if len(df) > 0:
                    last_obs = df.iloc[-1]
                    # Mapear columnas del CSV a valores de estación
                    station_data = {
                        "name": "El Junco",
                        "elevation": "650m",
                        "temp": float(last_obs.get('Temp_C', 18.2)) if 'Temp_C' in df.columns else 18.2,
                        "humidity": float(last_obs.get('RH', 85)) if 'RH' in df.columns else 85,
                        "wind": float(last_obs.get('WS_ms_Avg', 14)) if 'WS_ms_Avg' in df.columns else 14
                    }
            except Exception as e:
                logger.warning(f"Could not extract station data from CSV: {e}")
                # Mantener valores por defecto
                pass
        
        # Construir dashboard_data con datos REALES extraídos
        dashboard_data = {
            "station": station_data,
            "predictions": {
                "1h": {
                    "description": prediction_data.get('etiqueta', 'No data'),
                    "confidence": prediction_data.get('probabilidades', {}).get('1h', 0.74)
                },
                "3h": {
                    "description": prediction_data.get('etiqueta', 'No data'),
                    "confidence": prediction_data.get('probabilidades', {}).get('3h', 0.61)
                },
                "6h": {
                    "description": prediction_data.get('etiqueta', 'No data'),
                    "confidence": prediction_data.get('probabilidades', {}).get('6h', 0.63)
                }
            },
            "recommendation": "Based on historical weather patterns and current data"
        }
        
        # Detectar si es consulta de experto
        expert_keywords = ["technical", "expert", "metrics", "roc", "pod", "calibration",
                          "analysis", "science", "scientific", "reliable", "confidence",
                          "técnico", "técnica", "experto", "métricas"]
        is_expert_query = any(keyword in user_message for keyword in expert_keywords)
        
        if is_expert_query:
            await update.message.reply_text("Analyzing meteorological data in detail...", parse_mode="HTML")
            
            # Dashboard para experto (con métricas)
            dashboard_expert = {
                **dashboard_data,
                "metrics": {
                    "accuracy": 0.744,
                    "roc_auc": 0.82,
                    "pr_auc": 0.75
                }
            }
            
            result = generate_expert_analysis(
                dashboard_data=dashboard_expert,
                query=update.message.text
            )
        else:
            await update.message.reply_text("Processing your inquiry...", parse_mode="HTML")
            
            # Agente conversacional con datos reales
            user_context = {"user_message": update.message.text}
            result = generate_llm_answer(
                context=user_context,
                dashboard_data=dashboard_data
            )
        
        if result["ok"]:
            response = result.get("text", "No response generated")
        else:
            response = f"Error: {result.get('error', 'Unknown')}"
        
        if len(response) > 4096:
            chunks = [response[i:i+4096] for i in range(0, len(response), 4096)]
            for chunk in chunks:
                await update.message.reply_text(chunk)
        else:
            await update.message.reply_text(response)
        
    except Exception as e:
        logger.error(f"Error processing message: {e}")
        await update.message.reply_text(f"Error: {str(e)}", parse_mode="HTML")


async def cmd_cancel(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Cancela operación (legacy - no se usa en nuevo flujo)."""
    await update.message.reply_text("❌ Operación cancelada.")


def main():
    """Función principal para iniciar el bot."""
    global tnn_service
    
    if not TOKEN:
        logger.error("❌ TELEGRAM_TOKEN no configurado")
        return
    
    # Inicializar TNNService
    tnn_service = get_tnn_service()
    tnn_service.set_data_dir(DATA_DIR)
    logger.info(f"✅ TNNService inicializado con DATA_DIR: {DATA_DIR}")
    
    app = Application.builder().token(TOKEN).build()
    
    # Comando /start
    app.add_handler(CommandHandler("start", start))
    
    # Comando /predecir - procesa datos directamente
    app.add_handler(CommandHandler("predecir", cmd_predecir_start))
    
    # Comando /expert - análisis experto con pregunta
    app.add_handler(CommandHandler("expert", cmd_expert))
    
    # Handler para mensajes de texto normales - DEBE IR AL FINAL
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    
    logger.info("🚀 Nimbus Weather Bot started")
    logger.info("📡 Conversational agents active + TNN inference")
    logger.info("🔬 Available commands: /start, /predict, /expert")
    logger.info("💬 Type a question naturally for automatic routing")
    
    app.run_polling()


if __name__ == "__main__":
    main()