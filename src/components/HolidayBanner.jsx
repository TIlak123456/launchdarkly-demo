import React from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { Gift, X, Sparkles } from 'lucide-react';

function HolidayBanner() {
  const { holidayBanner } = useFlags();
  const [dismissed, setDismissed] = React.useState(false);

  if (!holidayBanner || dismissed) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-red-600 via-red-500 to-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 animate-pulse">
              <Sparkles className="w-5 h-5" />
              <Gift className="w-6 h-6" />
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-lg">
                🎄 Holiday Sale! 30% OFF Everything! 🎄
              </p>
              <p className="text-sm text-red-100">
                Use code <span className="font-mono bg-white/20 px-2 py-0.5 rounded">HOLIDAY30</span> at checkout. Limited time only!
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors text-sm">
              Shop Now
            </button>
            <button 
              onClick={() => setDismissed(true)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-black/10 py-1">
        <p className="text-center text-xs text-white/80">
          Demo 3: Business Self-Service | <strong>Flag:</strong> holiday-banner = true | Targeted by country/segment
        </p>
      </div>
    </div>
  );
}

export default HolidayBanner;
