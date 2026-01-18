from replit import db
import requests
import time
from datetime import datetime, timezone

# Config
COINBASE_URL = "https://api.coinbase.com/v2/prices/SOL-USD/spot"
INTERVAL = 30
WINDOW = 10
DIP_THRESHOLD = 3.0

# Initialize DB keys if they don't exist
if 'prices' not in db:
    db['prices'] = []
if 'alerts' not in db:
    db['alerts'] = []

def get_sol_price():
    try:
        r = requests.get(COINBASE_URL, timeout=10)
        r.raise_for_status()
        return float(r.json()['data']['amount'])
    except Exception as e:
        print(f"Fetch failed: {e}")
        return None

def detect_dip():
    prices = list(db.get('prices', []))
    alerts = list(db.get('alerts', []))
    
    price = get_sol_price()
    if price is None:
        return None, 0

    prices.append(price)
    if len(prices) > WINDOW:
        prices.pop(0)

    db['prices'] = prices # Update early to keep history

    if len(prices) < WINDOW:
        return price, 0

    drop_pct = ((prices[0] - price) / prices[0]) * 100
    confidence = min(100, int(drop_pct * 10 + 40))  # simple formula

    if drop_pct >= DIP_THRESHOLD:
        msg = f"DIP ALERT: SOL -{drop_pct:.2f}% to ${price:,.2f}"
        alert_entry = {
            'time': datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC"),
            'msg': msg,
            'confidence': confidence,
            'type': 'full_dip'
        }
        alerts.append(alert_entry)
        if len(alerts) > 50:
            alerts = alerts[-50:]
        db['alerts'] = alerts
        return price, confidence

    return price, 0

__all__ = ['get_sol_price', 'detect_dip', 'db', 'INTERVAL']
