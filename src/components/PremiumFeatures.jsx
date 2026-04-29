import React from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { Crown, Lock, BarChart3, Zap, Globe, Shield, Sparkles } from 'lucide-react';

function PremiumFeatures() {
  const { premiumFeatures } = useFlags();

  const features = [
    {
      icon: BarChart3,
      name: 'Advanced Analytics',
      description: 'Deep insights into your data with AI-powered recommendations'
    },
    {
      icon: Zap,
      name: 'Priority Processing',
      description: 'Your requests are processed 10x faster than standard'
    },
    {
      icon: Globe,
      name: 'Global CDN',
      description: 'Content delivered from 200+ edge locations worldwide'
    },
    {
      icon: Shield,
      name: 'Enterprise Security',
      description: 'SOC2, HIPAA, and GDPR compliance built-in'
    }
  ];

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-4 border-b bg-gradient-to-r from-amber-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Crown className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-gray-900">Premium Features</h2>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            premiumFeatures 
              ? 'bg-amber-100 text-amber-700' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {premiumFeatures ? '👑 Unlocked' : '🔒 Locked'}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Demo 3: Business Self-Service - {premiumFeatures ? 'Enterprise plan features visible' : 'Upgrade to unlock'}
        </p>
      </div>

      <div className="p-6">
        {premiumFeatures ? (
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <p className="text-green-600 font-medium">Premium features are enabled for your account!</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const FeatureIcon = feature.icon;
                return (
                  <div 
                    key={index}
                    className="p-4 rounded-lg border border-amber-200 bg-gradient-to-br from-amber-50 to-white"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <FeatureIcon className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{feature.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Features Locked</h3>
            <p className="text-gray-500 mb-4 max-w-md mx-auto">
              Upgrade to Enterprise plan to unlock advanced analytics, priority processing, and more.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mb-6">
              {features.map((feature, index) => {
                const FeatureIcon = feature.icon;
                return (
                  <div key={index} className="p-3 rounded-lg bg-gray-50 opacity-60">
                    <FeatureIcon className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">{feature.name}</p>
                  </div>
                );
              })}
            </div>
            
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-200">
              Upgrade to Enterprise
            </button>
          </div>
        )}

        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            <strong>Flag:</strong> premium-features = {premiumFeatures ? 'true' : 'false'} | 
            Targeted by plan = "enterprise"
          </p>
        </div>
      </div>
    </div>
  );
}

export default PremiumFeatures;
