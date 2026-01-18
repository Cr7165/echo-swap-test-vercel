from flask import Flask
import os

app = Flask(__name__)

@app.route('/')
def home():
    return "<h1 style='color: cyan; text-align: center;'>Echo Swap Test – Deployed on Vercel!</h1>"

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
