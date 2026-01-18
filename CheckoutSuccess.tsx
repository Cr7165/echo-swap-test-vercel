import { CheckCircle2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocation } from "wouter"
import proLogo from "@assets/generated_images/echo_swap_pro_tier_logo.png"
import eliteLogo from "@assets/generated_images/echo_swap_elite_tier_logo.png"

export default function CheckoutSuccess() {
  const [, setLocation] = useLocation()
  const searchParams = new URLSearchParams(window.location.search);
  const tier = searchParams.get("tier") || "pro";

  return (
    <div className="container mx-auto px-4 py-32 max-w-2xl text-center">
      <div className="bg-gray-900/40 border border-purple-900/20 rounded-3xl p-12 backdrop-blur-sm">
        <div className="relative mb-8">
          {tier === 'elite' ? (
            <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-slate-400/30 border-2 border-slate-400/50">
              <img src={eliteLogo} alt="Elite Tier Logo" className="w-full h-full object-cover" />
            </div>
          ) : tier === 'pro' ? (
            <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/30 border-2 border-cyan-500/50">
              <img src={proLogo} alt="Pro Tier Logo" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={48} className="text-green-400" />
            </div>
          )}
        </div>
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-400 text-lg mb-8">
          Your Echo Swap account has been upgraded. You now have access to high-confidence neural signals and advanced trading metrics.
        </p>

        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 mb-8 space-y-4">
          <p className="text-sm uppercase tracking-widest font-bold text-cyan-400">Your Private Invite Link</p>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center gap-3">
              <Send className="h-5 w-5 text-purple-400" />
              <a 
                href={tier === "elite" ? "https://t.me/ECHO_SWAP_ELITE_BOT" : tier === "pro" ? "https://t.me/ECHO_SWAP_PRO_BOT" : `https://t.me/echo_swap_${tier}_vip`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xl font-mono text-purple-400 break-all hover:underline"
              >
                @{tier === "elite" ? "ECHO_SWAP_ELITE_BOT" : tier === "pro" ? "ECHO_SWAP_PRO_BOT" : `echo_swap_${tier}_vip`}
              </a>
            </div>
            <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Access Tier: {tier} Only</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 italic">This is your exclusive gateway to the Echo Swap {tier} signal feed.</p>
        </div>

        <div className="flex flex-col gap-4">
          <Button 
            onClick={() => setLocation("/dashboard")}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold py-6 text-lg shadow-xl"
          >
            Go to Dashboard
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setLocation("/")}
            className="text-gray-400 hover:text-white"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
