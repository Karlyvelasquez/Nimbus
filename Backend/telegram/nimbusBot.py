import sys
import os
from pathlib import Path
import logging

from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes

BACKEND_DIR = Path(__file__).resolve().parents[1]
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))
    

def _load_dotenv(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if "=" not in line:
                    continue
                key, val = line.split("=", 1)
                key = key.strip()
                val = val.strip()
                if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
                    val = val[1:-1]
                if key and key not in os.environ:
                    os.environ[key] = val
    except FileNotFoundError:
        return


# Load .env from Backend directory if present
_load_dotenv(BACKEND_DIR / ".env")

TOKEN = os.getenv("TELEGRAM_TOKEN")
logging.basicConfig(level=logging.INFO)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    message = (
        f"👋 Hi"
    )
    await update.message.reply_text(message, parse_mode="HTML")
    
async def ayuda(update: Update, context: ContextTypes.DEFAULT_TYPE):
    mensaje = (
        "🆘 <b>¿En qué te puedo ayudar?</b>"
    )
    await update.message.reply_text(mensaje, parse_mode="HTML")


def main():
    if not TOKEN:
        print("ERROR")
        return

    app = Application.builder().token(TOKEN).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("ayuda", ayuda))

    logging.info("Starting bot...")
    app.run_polling()


if __name__ == "__main__":
    main()