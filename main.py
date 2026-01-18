import os

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port, debug=False)
# HTML templates using Tailwind CSS via CDN
BASE_LAYOUT = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Echo Swap – SOL Dip Alerts</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #000; color: #fff; }
        .text-gradient {
            background: linear-gradient(to right, #06b6d4, #a855f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .bg-gradient-solana {
            background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1));
        }
        .btn-gradient {
            background: linear-gradient(to right, #06b6d4, #a855f7);
            transition: all 0.3s ease;
        }
        .btn-gradient:hover {
            opacity: 0.9;
            transform: translateY(-2px);
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
        }
    </style>
</head>
<body class="font-sans antialiased min-h-screen flex flex-col items-center justify-center p-6">
    {{ content | safe }}
</body>
</html>
"""

HOME_PAGE = """
<div class="max-w-4xl w-full text-center space-y-12">
    <div class="space-y-4">
        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight">
            Welcome to <span class="text-gradient">Echo Swap</span>
        </h1>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto">
            High-confidence SOL Dip Alerts powered by neural strategy execution.
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Basic Tier -->
        <div class="bg-gray-900/50 border border-white/10 p-8 rounded-3xl space-y-6 flex flex-col">
            <h3 class="text-2xl font-bold">Basic</h3>
            <div class="flex flex-col items-center justify-center bg-white/5 p-4 rounded-xl">
                <span class="text-4xl font-bold">$9</span>
                <span class="text-gray-500 text-sm">per month</span>
            </div>
            <ul class="text-sm text-gray-400 space-y-2 flex-1">
                <li>Standard Signal Feed</li>
                <li>Email Notifications</li>
                <li>5m Data Refresh</li>
            </ul>
            <a href="https://gumroad.com/l/echo-basic" class="btn-gradient w-full py-4 rounded-xl font-bold text-lg">
                Get Basic
            </a>
        </div>

        <!-- Pro Tier -->
        <div class="bg-gray-900/50 border-2 border-cyan-500/50 p-8 rounded-3xl space-y-6 flex flex-col relative scale-105">
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Recommended
            </div>
            <h3 class="text-2xl font-bold">Pro</h3>
            <div class="flex flex-col items-center justify-center bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                <span class="text-4xl font-bold text-cyan-400">$19</span>
                <span class="text-cyan-400/50 text-sm font-bold">per month</span>
            </div>
            <ul class="text-sm text-gray-400 space-y-2 flex-1">
                <li>Neural Strategy Signals</li>
                <li>Priority Alerts</li>
                <li>Telegram Bot Access</li>
            </ul>
            <a href="/thank-you?tier=pro" class="btn-gradient w-full py-4 rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/20">
                Get Pro
            </a>
        </div>

        <!-- Elite Tier -->
        <div class="bg-gray-900/50 border border-white/10 p-8 rounded-3xl space-y-6 flex flex-col">
            <h3 class="text-2xl font-bold">Elite</h3>
            <div class="flex flex-col items-center justify-center bg-white/5 p-4 rounded-xl">
                <span class="text-4xl font-bold">$29</span>
                <span class="text-gray-500 text-sm">per month</span>
            </div>
            <ul class="text-sm text-gray-400 space-y-2 flex-1">
                <li>Institutional API</li>
                <li>Whale Tracking</li>
                <li>Dedicated Manager</li>
            </ul>
            <a href="https://gumroad.com/l/echo-elite" class="btn-gradient w-full py-4 rounded-xl font-bold text-lg">
                Get Elite
            </a>
        </div>
    </div>
</div>
"""

THANK_YOU_PAGE = """
<div class="max-w-2xl w-full text-center space-y-8 bg-gray-900/50 border border-white/10 p-12 rounded-3xl backdrop-blur-sm">
    <div class="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
    </div>
    <div class="space-y-4">
        <h2 class="text-4xl font-bold">Thank You!</h2>
        <p class="text-gray-400 text-lg">
            Your {{ tier | capitalize }} subscription is active. Welcome to the inner circle of neural trading.
        </p>
    </div>
    <div class="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
        <p class="text-sm uppercase tracking-widest font-bold text-cyan-400">Your Private Invite Link</p>
        <a href="https://t.me/echo_swap_{{ tier }}_private" class="text-xl font-mono text-purple-400 break-all hover:underline">
            t.me/echo_swap_{{ tier }}_private
        </a>
    </div>
    <a href="/" class="inline-block text-gray-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
        Back to Home
    </a>
</div>
"""

@app.route("/")
def home():
    return render_template_string(BASE_LAYOUT, content=HOME_PAGE)

@app.route("/thank-you")
def thank_you():
    tier = request.args.get("tier", "basic")
    return render_template_string(BASE_LAYOUT, content=render_template_string(THANK_YOU_PAGE, tier=tier))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
