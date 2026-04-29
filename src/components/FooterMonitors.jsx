import React from 'react';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import { Flag, User, Settings, AlertCircle } from 'lucide-react';

function FooterMonitors({ currentUser }) {
  const flags = useFlags();
  const ldClient = useLDClient();

  const flagDefinitions = [
    {
      key: 'newCheckoutFlow',
      dashboardKey: 'new-checkout-flow',
      name: 'Kill Switch',
      description: 'new-checkout-flow'
    },
    {
      key: 'newPaymentProcessor',
      dashboardKey: 'new-payment-processor',
      name: 'Progressive Rollout',
      description: 'new-payment-processor'
    },
    {
      key: 'holidayBanner',
      dashboardKey: 'holiday-banner',
      name: 'Holiday Banner',
      description: 'holiday-banner'
    },
    {
      key: 'premiumFeatures',
      dashboardKey: 'premium-features',
      name: 'Premium Features',
      description: 'premium-features'
    }
  ];

  // Get flag metadata to check if targeting is on
  // Note: The client SDK receives evaluation reasons when the flag is evaluated
  const getFlagMetadata = (flagKey) => {
    if (!ldClient) return { exists: false, targetingOn: false, reason: 'NO_CLIENT' };
    
    try {
      // Use the allFlagsState method to get detailed flag info
      const allFlags = ldClient.allFlags();
      const flagExists = flagKey in allFlags;
      
      if (!flagExists) {
        return { exists: false, targetingOn: false, reason: 'NOT_FOUND' };
      }
      
      // Try to get variation detail - this includes the reason
      // The SDK method is variationDetail(flagKey, defaultValue)
      const detail = ldClient.variationDetail(flagKey, null);
      
      // Check the reason kind
      // OFF = targeting is disabled
      // FALLTHROUGH, RULE_MATCH, TARGET_MATCH, PREREQUISITE_FAILED = targeting is ON
      const reason = detail?.reason?.kind || 'UNKNOWN';
      const isTargetingOff = reason === 'OFF';
      
      return {
        exists: true,
        targetingOn: !isTargetingOff,
        reason: reason
      };
    } catch (e) {
      console.log('Error getting flag metadata:', e);
      return { exists: false, targetingOn: false, reason: 'ERROR' };
    }
  };

  return (
    <div className="bg-gray-900 border-t border-gray-700">
      {/* Global Flag Status - Dashboard State */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center space-x-2 mb-4">
          <Settings className="w-5 h-5 text-gray-400" />
          <h3 className="text-white font-semibold">Dashboard Flag Status</h3>
          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
            Targeting ON/OFF in LaunchDarkly
          </span>
        </div>
        
        <p className="text-gray-400 text-sm mb-4">
          These indicators show if <strong>targeting is enabled</strong> for each flag in the LaunchDarkly dashboard.
          When targeting is OFF, all users get the default OFF variation.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {flagDefinitions.map((flag) => {
            const metadata = getFlagMetadata(flag.dashboardKey);
            const isTargetingOn = metadata.targetingOn;
            
            return (
              <div 
                key={flag.key}
                className={`rounded-lg p-4 border ${
                  isTargetingOn 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-gray-800/50 border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm font-medium">{flag.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <div className={`w-3 h-3 rounded-full ${isTargetingOn ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      {isTargetingOn && (
                        <span className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-50"></span>
                      )}
                    </div>
                    <span className={`text-xs font-mono ${isTargetingOn ? 'text-green-400' : 'text-gray-500'}`}>
                      {isTargetingOn ? 'ON' : 'OFF'}
                    </span>
                  </div>
                </div>
                <code className="text-xs text-gray-500">{flag.dashboardKey}</code>
                {!isTargetingOn && (
                  <p className="text-xs text-yellow-500 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Targeting disabled
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700"></div>

      {/* Per-User Flag Evaluation */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center space-x-2 mb-4">
          <User className="w-5 h-5 text-blue-400" />
          <h3 className="text-white font-semibold">Per-User Flag Evaluation</h3>
          <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded">
            {currentUser.name}
          </span>
        </div>
        
        <p className="text-gray-400 text-sm mb-4">
          These show the <strong>evaluated value</strong> for the current user based on targeting rules (segments, percentages, attributes).
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {flagDefinitions.map((flag) => {
            const value = flags[flag.key];
            const isTrue = Boolean(value);
            
            return (
              <div 
                key={flag.key}
                className={`rounded-lg p-4 border ${
                  isTrue 
                    ? 'bg-green-900/30 border-green-700' 
                    : 'bg-gray-800 border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm font-medium">{flag.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className={`relative w-3 h-3 rounded-full ${isTrue ? 'bg-green-500' : 'bg-red-500'}`}>
                      {isTrue && (
                        <span className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-50"></span>
                      )}
                    </div>
                    <span className={`text-xs font-mono ${isTrue ? 'text-green-400' : 'text-red-400'}`}>
                      {isTrue ? 'true' : 'false'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <code className="text-xs text-gray-500">{flag.dashboardKey}</code>
                  <span className="text-xs text-gray-500">
                    {isTrue ? '✓ Feature ON' : '✗ Feature OFF'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* User Context Summary */}
        <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-xs text-gray-400">
            <strong className="text-gray-300">Current User Context:</strong>{' '}
            <span className="text-blue-400">{currentUser.email}</span> | 
            Country: <span className="text-yellow-400">{currentUser.country}</span> | 
            Plan: <span className="text-purple-400">{currentUser.plan}</span> | 
            Type: <span className="text-green-400">{currentUser.userType}</span>
          </p>
        </div>
      </div>

      {/* Footer Credit */}
      <div className="border-t border-gray-700 py-4">
        <p className="text-center text-gray-500 text-sm">
          ABC Company Demo - Powered by LaunchDarkly
        </p>
      </div>
    </div>
  );
}

export default FooterMonitors;
