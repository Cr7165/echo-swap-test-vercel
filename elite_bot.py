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
TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN_ELITE")
subscribers = set()

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not update.message:
        return
    chat_id = update.effective_chat.id
    subscribers.add(chat_id)
    await update.message.reply_text(
        "Welcome to ECHO_SWAP_ELITE_BOT\n\n"
        "Institutional-grade tracking & personalized oversight.\n"
        "You get:\n"
        "• Instant whale alerts (>100k SOL moves)\n"
        "• Raw multi-chain neural core snippets\n"
        "• 1-on-1 concierge mode (reply /concierge to start)\n"
        "• Cross-chain signals (BTC/ETH → SOL impact)"
    )

async def concierge(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not update.message:
        return
    await update.message.reply_text(
        "Concierge mode activated.\n"
        "Ask me anything about your portfolio, strategy, or SOL market.\n"
        "Example: 'What's the risk if SOL drops 5%?'"
    )
    # Later: add LLM integration or rule-based responses

async def status(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not update.message:
        return
    price = get_sol_price()
    text = f"Current SOL: ${price:,.2f}" if price else "Fetching price..."
    await update.message.reply_text(text)

async def elite_loop(application: Application):
    logger.info("Starting Elite Bot institution-grade monitoring...")
    while True:
        try:
            price, confidence = detect_dip()
            if confidence >= 85:
                msg = f"ELITE SIGNAL: {confidence}/100 confidence | SOL ${price:,.2f}"
                for chat_id in subscribers:
                    try:
                        await application.bot.send_message(chat_id=chat_id, text=msg)
                    except Exception as e:
                        logger.error(f"Failed to send elite alert to {chat_id}: {e}")
            await asyncio.sleep(INTERVAL)
        except Exception as e:
            logger.error(f"Error in Elite Bot loop: {e}")
            await asyncio.sleep(10)

def main():
    if not TOKEN:
        logger.error("TELEGRAM_BOT_TOKEN_ELITE not found in environment variables.")
        return

    application = Application.builder().token(TOKEN).build()
    
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("status", status))
    application.add_handler(CommandHandler("concierge", concierge))

    loop = asyncio.get_event_loop()
    loop.create_task(elite_loop(application))

    application.run_polling()

if __name__ == '__main__':
    main()
