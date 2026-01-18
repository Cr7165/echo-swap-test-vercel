import time
import os
import asyncio
from telegram import Bot
from core import detect_dip, db

# Configuration
PRO_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN_PRO")
ELITE_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN_ELITE")

async def broadcast_alert(alert_msg):
    """Sends alert to both Pro and Elite bots if configured."""
    tasks = []
    
    # Send to Pro Bot if configured
    if PRO_BOT_TOKEN:
        bot_pro = Bot(token=PRO_BOT_TOKEN)
        # In a real app, you'd fetch chat IDs from a database
        # For this demo, we assume the user has a configured channel or we use a placeholder
        # tasks.append(bot_pro.send_message(chat_id="@your_pro_channel", text=alert_msg))
        pass

    # Send to Elite Bot if configured
    if ELITE_BOT_TOKEN:
        bot_elite = Bot(token=ELITE_BOT_TOKEN)
        # tasks.append(bot_elite.send_message(chat_id="@your_elite_channel", text=alert_msg))
        pass
    
    if tasks:
        await asyncio.gather(*tasks)

def main_loop():
    print("Starting Echo Swap Neural Core...")
    # Initialize prices in db if empty to avoid detect_dip returning 0 too long
    if not db.get('prices'):
        db['prices'] = []
        
    while True:
        try:
            price, confidence = detect_dip()
            if price:
                print(f"[{datetime.now().strftime('%H:%M:%S')}] Price: ${price:,.2f} | Confidence: {confidence}%")
            
            # If a dip was detected (confidence > 0), you could trigger alerts here
            if confidence >= 70:
                alert_msg = f"🚀 NEURAL ALERT: SOL dip detected! Confidence: {confidence}%"
                print(f"TRIGGERING BROADCAST: {alert_msg}")
                # asyncio.run(broadcast_alert(alert_msg)) # Uncomment when bot tokens are set
                
            time.sleep(30)
        except Exception as e:
            print(f"Core Loop Error: {e}")
            time.sleep(10)

if __name__ == "__main__":
    from datetime import datetime
    main_loop()
