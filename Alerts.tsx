import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Bell, Zap, Anchor, Clock, Info, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

type Signal = {
  id: number;
  message: string;
  tier: 'basic' | 'pro' | 'elite';
  isPreDip: number;
  confidence: number;
  timestamp: string;
};

export default function Alerts() {
  const { data: signals, isLoading } = useQuery<Signal[]>({
    queryKey: ['/api/signals'],
    refetchInterval: 5000,
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Bell className="text-cyan-400 h-8 w-8" />
            Notifications
          </h1>
          <p className="text-gray-500 text-sm">Stay updated with real-time market signals and system alerts.</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-cyan-500/60">
          <ActivityIndicator />
          Neural Link Active
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4 opacity-50">
            <div className="w-10 h-10 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
            <p className="text-xs font-bold uppercase tracking-widest">Fetching Updates...</p>
          </div>
        ) : signals?.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl">
            <Info className="mx-auto h-10 w-10 text-gray-700 mb-4" />
            <p className="text-sm text-gray-500 font-medium">No new notifications at this time.</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {signals?.map((signal) => (
              <motion.div
                key={signal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative"
              >
                <div className={`p-5 rounded-2xl border transition-all duration-300 backdrop-blur-sm flex gap-4 ${
                  signal.isPreDip === 1 
                    ? 'bg-yellow-500/5 border-yellow-500/10 hover:border-yellow-500/20' 
                    : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                }`}>
                  <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    signal.isPreDip === 1 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-cyan-500/10 text-cyan-400'
                  }`}>
                    {signal.isPreDip === 1 ? <Zap size={18} /> : <Bell size={18} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-gray-300">
                          {signal.isPreDip === 1 ? 'Potential Dip Detected' : 'Market Signal'}
                        </span>
                        <Badge 
                          variant="secondary" 
                          className={`text-[9px] h-4 uppercase font-bold tracking-tighter ${
                            signal.tier === 'elite' ? 'bg-purple-500/10 text-purple-400' :
                            signal.tier === 'pro' ? 'bg-cyan-500/10 text-cyan-400' :
                            'bg-gray-500/10 text-gray-400'
                          }`}
                        >
                          {signal.tier}
                        </Badge>
                      </div>
                      <span className="text-[10px] text-gray-600 font-medium whitespace-nowrap">
                        {format(new Date(signal.timestamp), 'h:mm a')}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-400 leading-relaxed mb-3">
                      {signal.message}
                    </p>

                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
                      <div className="flex items-center gap-1.5 text-cyan-500/70">
                        <CheckCircle2 size={12} />
                        {signal.confidence}% Confidence
                      </div>
                      {signal.tier === 'elite' && (
                        <div className="flex items-center gap-1.5 text-purple-500/70">
                          <Anchor size={12} />
                          Whale Tracking
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-white/5 rounded-lg text-gray-500">
                      <Info size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function ActivityIndicator() {
  return (
    <div className="relative flex h-2 w-2">
      <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></div>
      <div className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></div>
    </div>
  );
}
