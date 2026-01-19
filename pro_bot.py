import asyncio
import os
import logging
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes
from core import get_sol_price, detect_dip, INTERVAL

# Set up logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Use secret from environment
TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN_PRO")
# For testing, we might need a way to track subscribers. 
# In a real app, this would be a DB. For now, we'll use a set in memory.
subscribers = set()

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not update.message:
        return
    chat_id = update.effective_chat.id
    subscribers.add(chat_id)
    await update.message.reply_text(
        "Welcome to ECHO_SWAP_PRO_BOT\n\n"
        "High-priority neural signals & market context.\n"
        "You'll receive:\n"
        "• 85%+ confidence buy/sell triggers\n"
        "• Daily SOL fear & greed summary\n"
        "• Priority dip alerts (fastest delivery)"
    )

async def status(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not update.message:
        return
    price = get_sol_price()
    text = f"Current SOL: ${price:,.2f}" if price else "Fetching price..."
    await update.message.reply_text(text)

async def dip_loop(application: Application):
    logger.info("Starting Pro Bot signal monitoring loop...")
    while True:
        try:
            price, confidence = detect_dip()
            if confidence >= 85:
                msg = f"🚀 HIGH CONFIDENCE SIGNAL: Buy opportunity! Confidence {confidence}/100 | SOL ${price:,.2f}"
                for chat_id in subscribers:
                    try:
                        await application.bot.send_message(chat_id=chat_id, text=msg)
                    except Exception as e:
                        logger.error(f"Failed to send alert to {chat_id}: {e}")
            await asyncio.sleep(INTERVAL)
        except Exception as e:
            logger.error(f"Error in Pro Bot loop: {e}")
            await asyncio.sleep(10)

def main():
    if not TOKEN:
        logger.error("TELEGRAM_BOT_TOKEN_PRO not found in environment variables.")
        return

    application = Application.builder().token(TOKEN).build()
    
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("status", status))

    # Add the loop as a background task
    loop = asyncio.get_event_loop()
    loop.create_task(dip_loop(application))

    application.run_polling()

if __name__ == '__main__':
    main()
