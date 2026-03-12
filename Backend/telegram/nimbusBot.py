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
        "🌧️ <b>¡Bienvenido a Nimbus Weather Bot!</b>\n\n"
        "Soy un asistente conversacional sobre precipitación en Galápagos.\n\n"
        "<b>Puedes preguntarme:</b>\n"
        "❓ '¿Va a llover hoy?'\n"
        "❓ '¿Cuánta lluvia esperas?'\n"
        "❓ '¿Debo llevar paraguas?'\n"
        "❓ '¿Cuál es la probabilidad de lluvia?'\n\n"
        "<b>Comandos:</b>\n"
        "/predecir - Procesar datos meteorológicos\n"
        "/expert - Análisis técnico\n"
    )
    await update.message.reply_text(message, parse_mode="HTML")


async def cmd_predecir_start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Comando /predecir - Procesa datos del CSV automáticamente."""
    waiting_msg = await update.message.reply_text("Procesando datos...")
    
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


async def horizonte_change_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Deprecated - kept for compatibility"""
    pass


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Maneja mensajes de texto normales - routing con agentes."""
    user_message = update.message.text.lower()
    
    try:
        expert_keywords = ["técnico", "técnica", "experto", "auc", "pod", "calibr", "métrica", 
                          "análisis técnico", "ciencia", "científico"]
        is_expert_query = any(keyword in user_message for keyword in expert_keywords)
        
        if is_expert_query:
            await update.message.reply_text("🔬 Analizando datos meteorológicos...", parse_mode="HTML")
            
            # Contexto experto
            expert_context = {
                **STATION_CONTEXT,
                "roc_auc": 0.82,
                "pr_auc": 0.75,
                "bss": 0.65,
                "pod": 0.85,
                "far": 0.15,
                "dominant_features": ["wind_speed", "humidity", "temperature"],
                "user_query": user_message,
            }
            
            result = generate_expert_analysis(expert_context, query=user_message)
        else:
            await update.message.reply_text("🔍 Procesando tu pregunta...", parse_mode="HTML")
            user_context = {
                **STATION_CONTEXT,
                "user_query": user_message,
                "season": "transición"
            }
            result = generate_llm_answer(user_context)
        
        if result["ok"]:
            response = result.get("text", "Sin respuesta")
        else:
            response = f"Error: {result.get('error', 'Desconocido')}"
        
        if len(response) > 4096:
            chunks = [response[i:i+4096] for i in range(0, len(response), 4096)]
            for chunk in chunks:
                await update.message.reply_text(chunk)
        else:
            await update.message.reply_text(response)
        
    except Exception as e:
        logger.error(f"Error procesando mensaje: {e}")
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
    
    # Handler para mensajes de texto normales - DEBE IR AL FINAL
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    
    logger.info("🚀 Nimbus Weather Bot iniciado")
    logger.info("📡 Agentes conversacionales activos + TNN inference")
    logger.info("🔬 Comandos: /start, /predecir, /horizonte, /expert")
    
    app.run_polling()


if __name__ == "__main__":
    main()