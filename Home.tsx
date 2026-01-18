import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocation } from "wouter"
import proLogo from "@assets/generated_images/echo_swap_pro_tier_logo.png"
import eliteLogo from "@assets/generated_images/echo_swap_elite_tier_logo.png"

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    description: "Essential tools for beginner traders",
    features: [
      "Real-time SOL Monitoring",
      "Standard Neural Alerts",
      "Telegram Integration",
      "Email Support",
    ],
    buttonText: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19.99",
    description: "Advanced analytics and high-speed execution",
    features: [
      "Everything in Basic",
      "Priority Neural Signals",
      "Sentiment Score Analysis",
      "Custom Signal Thresholds",
      "24/7 Priority Support",
    ],
    buttonText: "Get Pro Access",
    highlight: true,
    badge: "Recommended",
  },
  {
    name: "Elite",
    price: "$20.99",
    description: "Maximum performance for professional bots",
    features: [
      "Everything in Pro",
      "Institutional-grade API Access",
      "Multi-chain Neural Analysis",
      "Whale Tracking Signals",
      "Dedicated Account Manager",
    ],
    buttonText: "Join the Elite",
    highlight: false,
  },
]

export default function Home() {
  const [, setLocation] = useLocation()

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Master the <span className="text-gradient">Neural Pulse</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Choose the plan that fits your trading strategy. Experience high-confidence signals powered by Echo Swap's neural trading core.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`relative flex flex-col border-purple-900/20 bg-gray-900/40 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-purple-500/40 group ${
              plan.highlight ? 'ring-2 ring-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]' : ''
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                {plan.badge}
              </div>
            )}
            <CardHeader className="text-center pt-8">
              {plan.name === 'Pro' && (
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl overflow-hidden shadow-lg shadow-cyan-500/20 border border-cyan-500/30">
                  <img src={proLogo} alt="Pro Tier Logo" className="w-full h-full object-cover" />
                </div>
              )}
              {plan.name === 'Elite' && (
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl overflow-hidden shadow-lg shadow-slate-400/20 border border-slate-400/30">
                  <img src={eliteLogo} alt="Elite Tier Logo" className="w-full h-full object-cover" />
                </div>
              )}
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <CardDescription className="text-gray-400">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-8">
              <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2 min-h-[160px]">
                <span className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white">
                  {plan.price}
                </span>
                <span className="text-cyan-400/60 text-xs font-bold uppercase tracking-[0.2em]">
                  Billed Monthly
                </span>
              </div>
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center">
                      <Check size={12} className="text-cyan-400" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pb-8">
              <Button 
                onClick={() => setLocation(`/checkout-success?tier=${plan.name.toLowerCase()}`)}
                className={`w-full font-bold py-6 text-lg transition-all duration-300 ${
                  plan.name === 'Elite'
                    ? 'bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 hover:from-slate-100 hover:via-slate-300 hover:to-slate-100 text-slate-950 shadow-xl hover:shadow-slate-500/20'
                    : plan.highlight 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white shadow-xl hover:shadow-cyan-500/20' 
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-24 text-center p-12 rounded-3xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-purple-900/10">
        <h2 className="text-3xl font-bold mb-4">Neural Infrastructure Status</h2>
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">99.9%</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Uptime</div>
          </div>
          <div className="w-px h-12 bg-white/5" />
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">&lt; 50ms</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Signal Latency</div>
          </div>
          <div className="w-px h-12 bg-white/5" />
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">Secure</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">TLS Core</div>
          </div>
        </div>
      </div>
    </div>
  )
}
