import React from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { Flag, CheckCircle, XCircle } from 'lucide-react';

function FlagStatus({ currentUser }) {
  const flags = useFlags();

  const flagConfig = [
    {
      key: 'newCheckoutFlow',
      name: 'new-checkout-flow',
      description: 'Kill Switch Demo - Toggle to fix broken checkout',
      demo: 'Demo 1'
    },
    {
      key: 'newPaymentProcessor',
      name: 'new-payment-processor',
      description: 'Progressive Rollout - Canary deployment',
      demo: 'Demo 2'
    },
    {
      key: 'holidayBanner',
      name: 'holiday-banner',
      description: 'Business Self-Service - Targeted by country',
      demo: 'Demo 3'
    },
    {
      key: 'premiumFeatures',
      name: 'premium-features',
      description: 'Business Self-Service - Targeted by plan',
      demo: 'Demo 3'
    }
  ];

  return (
    <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-4">
      <div className="flex items-center space-x-2 mb-3">
        <Flag className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold text-gray-900">Feature Flag Status</h3>
        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
          Live from LaunchDarkly
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {flagConfig.map((flag) => {
          const value = flags[flag.key];
          const isEnabled = Boolean(value);
          
          return (
            <div 
              key={flag.key}
              className={`p-3 rounded-lg border ${
                isEnabled 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <code className="text-xs font-mono text-gray-600">{flag.name}</code>
                {isEnabled ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <p className="text-xs text-gray-500">{flag.description}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-indigo-600 font-medium">{flag.demo}</span>
                <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                  isEnabled 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {isEnabled ? 'true' : 'false'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      <p className="mt-3 text-xs text-gray-500 text-center">
        Toggle flags in LaunchDarkly dashboard to see real-time changes. Current user: <strong>{currentUser.name}</strong>
      </p>
    </div>
  );
}

export default FlagStatus;
