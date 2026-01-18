import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { SignalFeed } from '@/components/signal-feed';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const [solPrice, setSolPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('5 min');
  const [lastUpdated, setLastUpdated] = useState(0);

  const timeFrameLabels = ['5 min', '15 min', '1 hour', '4 hours', '1 day'];

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdated(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Dynamic chart data based on selected timeframe
  const getChartData = () => {
    let data = [137.8, 137.95, 137.72, 137.86, 137.74, solPrice || 137.85];
    let labels = ['-5min', '-4min', '-3min', '-2min', '-1min', 'Now'];

    if (selectedTimeFrame === '15 min') {
      data = [136.5, 137.2, 137.8, 138.1, 137.5, solPrice || 137.85];
      labels = ['-15min', '-12min', '-9min', '-6min', '-3min', 'Now'];
    } else if (selectedTimeFrame === '1 hour') {
      data = [135.2, 136.8, 138.5, 137.2, 136.9, solPrice || 137.85];
      labels = ['-60min', '-48min', '-36min', '-24min', '-12min', 'Now'];
    } else if (selectedTimeFrame === '4 hours') {
      data = [140.2, 138.5, 137.1, 136.4, 137.8, solPrice || 137.85];
      labels = ['-4h', '-3h', '-2h', '-1h', '-30m', 'Now'];
    } else if (selectedTimeFrame === '1 day') {
      data = [142.5, 139.2, 135.8, 138.1, 140.4, solPrice || 137.85];
      labels = ['-24h', '-18h', '-12h', '-6h', '-3h', 'Now'];
    }

    return {
      labels,
      datasets: [
        {
          label: 'SOL Price',
          data,
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: (context: any) => {
            const index = context.dataIndex;
            if (index === 2) return '#ef4444'; // Sell signal
            if (index === 4) return '#22c55e'; // Buy signal
            return '#06b6d4';
          },
          pointRadius: (context: any) => {
            const index = context.dataIndex;
            return (index === 2 || index === 4) ? 8 : 0;
          },
          pointHoverRadius: 10,
          borderWidth: 2,
        },
      ],
    };
  };

  const chartData = getChartData();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#000',
        titleColor: '#06b6d4',
        bodyColor: '#fff',
        borderColor: 'rgba(6, 182, 212, 0.2)',
        borderWidth: 1,
        callbacks: {
          label: (context: any) => {
            if (context.dataIndex === 2) return `SELL SIGNAL: $${context.parsed.y}`;
            if (context.dataIndex === 4) return `BUY SIGNAL: $${context.parsed.y}`;
            return `Price: $${context.parsed.y}`;
          }
        }
      },
    },
    scales: {
      x: { 
        grid: { color: 'rgba(139, 92, 246, 0.05)' },
        ticks: { color: 'rgba(255, 255, 255, 0.3)', font: { size: 10 } }
      },
      y: { 
        display: true,
        grid: { color: 'rgba(139, 92, 246, 0.05)' },
        ticks: { color: 'rgba(255, 255, 255, 0.3)', font: { size: 10 } }
      },
    },
  };

  // Fetch SOL price from Coinbase
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch('https://api.coinbase.com/v2/prices/SOL-USD/spot');
        const data = await res.json();
        setSolPrice(parseFloat(data.data.amount));
        setError(null);
        setLastUpdated(0);
      } catch (err) {
        setError('Failed to fetch price');
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // every 30s

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number | null) => {
    return price ? `$${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '—';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-gray-900/40 border border-purple-900/20 rounded-2xl p-8 mb-8 flex flex-col items-center justify-center backdrop-blur-sm relative overflow-hidden group text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h2 className="text-sm uppercase tracking-wider text-cyan-400/70 font-bold mb-2">Live SOL Price</h2>
          <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {formatPrice(solPrice)}
          </div>
          <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
            Last updated: {lastUpdated}s ago
          </div>
          {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Neural Execution Graph */}
          <div className="lg:col-span-2 bg-gray-900/40 border border-purple-900/20 rounded-2xl p-8 backdrop-blur-sm min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-semibold text-cyan-300">Neural Strategy Execution</h2>
                <p className="text-xs text-gray-500">High-confidence Buy/Sell signals mapped to real-time price action</p>
              </div>
              <div className="flex gap-2">
                {timeFrameLabels.map(tf => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeFrame(tf)}
                    className={`px-4 py-1.5 text-[10px] font-bold rounded-lg border transition-all ${
                      selectedTimeFrame === tf
                        ? 'bg-purple-600 text-white border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                        : 'border-gray-800 text-gray-600 hover:border-gray-700'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 w-full min-h-[350px]">
              <Line data={chartData} options={chartOptions} />
            </div>

            <div className="mt-8 flex items-center justify-center gap-8 border-t border-white/5 pt-8">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Neural Buy Signal</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Neural Sell Signal</span>
               </div>
            </div>
          </div>

          {/* Live Signal Feed */}
          <div className="lg:col-span-1">
            <SignalFeed />
          </div>
        </div>
    </div>
  );
}
