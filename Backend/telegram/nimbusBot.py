import sys
import os
from pathlib import Path
import logging
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, ContextTypes, filters

BACKEND_DIR = Path(__file__).resolve().parents[1]
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from agents.user_agent import generate_llm_answer
from agents.weather_expert_agent import generate_expert_analysis

# Cargar variables de entorno
load_dotenv(BACKEND_DIR / ".env")

TOKEN = os.getenv("TELEGRAM_TOKEN")
logging.basicConfig(level=logging.INFO)

# Contexto meteorológico global
WEATHER_CONTEXT = {
    "location": "El Junco, San Cristóbal, Galápagos",
    "elevation": "864m",
    "latitude": "~1°S",
    "longitude": "~89°W",
    "forecast_hours": 6,
    "precipitation_probability": 0.75,
    "intensity": "moderado",
    "timestamp": "2026-03-10"
}


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    message = (
        "🌧️ <b>¡Bienvenido a Nimbus Weather Bot!</b>\n\n"
        "Soy un asistente conversacional sobre predicción de precipitación en Galápagos.\n\n"
        "<b>Puedes preguntarme:</b>\n"
        "❓ '¿Va a llover hoy?'\n"
        "❓ '¿Cuánta lluvia esperas?'\n"
        "❓ '¿Debo llevar paraguas?'\n"
        "❓ '¿Cuál es la probabilidad de lluvia?'\n\n"
        "O usa /expert para análisis técnico."
    )
    await update.message.reply_text(message, parse_mode="HTML")


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_message = update.message.text.lower()
    
    try:
        expert_keywords = ["técnico", "técnica", "experto", "auc", "pod", "calibr", "métrica", 
                          "análisis técnico", "ciencia", "científico"]
        is_expert_query = any(keyword in user_message for keyword in expert_keywords)
        
        if is_expert_query:
            await update.message.reply_text("🔬 Analizando datos meteorológicos...", parse_mode="HTML")
            expert_context = {
                **WEATHER_CONTEXT,
                "roc_auc": 0.82,
                "pr_auc": 0.75,
                "bss": 0.65,
                "pod": 0.85,
                "far": 0.15,
                "forecast_horizon": "3h-6h-12h",
                "dominant_features": ["wind_speed", "humidity", "temperature"],
                "user_query": user_message
            }
            result = generate_expert_analysis(expert_context, query=user_message)
        else:
            await update.message.reply_text("🔍 Procesando tu pregunta...", parse_mode="HTML")
            user_context = {
                **WEATHER_CONTEXT,
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
        logging.error(f"Error procesando mensaje: {e}")
        await update.message.reply_text(f"Error: {str(e)}", parse_mode="HTML")



def main():
    if not TOKEN:
        logging.error("TELEGRAM_TOKEN")
        return

    app = Application.builder().token(TOKEN).build()

    # Comando de inicio
    app.add_handler(CommandHandler("start", start))
    
    # Handler para mensajes de texto - DEBE IR AL FINAL
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    logging.info("🚀 Nimbus Weather Bot starting...")
    logging.info("📡 Agente conversacional activo - responde a mensajes naturales")
    app.run_polling()


if __name__ == "__main__":
    main()