import React, { useState, useEffect } from 'react';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import { BarChart3, TrendingUp, TrendingDown, Users, AlertTriangle, CheckCircle, Clock, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

// Guardrail thresholds - these would come from LaunchDarkly or config in production
const GUARDRAILS = {
  errorRate: { threshold: 2, operator: 'below' },      // Error rate must be below 2%
  latency: { threshold: 500, operator: 'below' },      // Latency must be below 500ms
  successRate: { threshold: 95, operator: 'above' }    // Success rate must be above 95%
};

function RolloutAnalytics() {
  const { newPaymentProcessor } = useFlags();
  const ldClient = useLDClient();
  const [simulateBadCanary, setSimulateBadCanary] = useState(false);
  const [isTargetingOn, setIsTargetingOn] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [metrics, setMetrics] = useState({
    legacy: {
      errorRate: 2.4,
      latency: 340,
      successRate: 97.6,
      transactions: 8420
    },
    new: {
      errorRate: 0.8,
      latency: 120,
      successRate: 99.2,
      transactions: 4210
    }
  });

  // Check if targeting is ON for the flag
  useEffect(() => {
    if (!ldClient) return;
    
    const checkTargeting = () => {
      try {
        const detail = ldClient.variationDetail('new-payment-processor', false);
        // If reason is OFF, targeting is disabled
        setIsTargetingOn(detail?.reason?.kind !== 'OFF');
      } catch (e) {
        setIsTargetingOn(false);
      }
    };
    
    checkTargeting();
    
    // Listen for flag changes
    ldClient.on('change', checkTargeting);
    return () => ldClient.off('change', checkTargeting);
  }, [ldClient]);

  // Simulate real-time metric updates (only when targeting is ON)
  useEffect(() => {
    if (!isTargetingOn) return; // Skip if targeting is OFF
    const interval = setInterval(() => {
      setMetrics(prev => {
        if (simulateBadCanary) {
          // Bad canary scenario - error rate spikes, latency increases
          return {
            legacy: {
              ...prev.legacy,
              errorRate: Math.max(1.5, prev.legacy.errorRate + (Math.random() - 0.5) * 0.3),
              latency: Math.max(280, prev.legacy.latency + (Math.random() - 0.4) * 20),
              transactions: prev.legacy.transactions + Math.floor(Math.random() * 10)
            },
            new: {
              ...prev.new,
              errorRate: Math.min(8, Math.max(2.5, prev.new.errorRate + (Math.random() - 0.3) * 0.5)),
              latency: Math.min(800, Math.max(450, prev.new.latency + (Math.random() - 0.3) * 30)),
              successRate: Math.max(88, Math.min(94, prev.new.successRate + (Math.random() - 0.6) * 0.5)),
              transactions: prev.new.transactions + Math.floor(Math.random() * 3)
            }
          };
        } else {
          // Healthy canary scenario
          return {
            legacy: {
              ...prev.legacy,
              errorRate: Math.max(1.5, prev.legacy.errorRate + (Math.random() - 0.5) * 0.3),
              latency: Math.max(280, prev.legacy.latency + (Math.random() - 0.4) * 20),
              transactions: prev.legacy.transactions + Math.floor(Math.random() * 10)
            },
            new: {
              ...prev.new,
              errorRate: Math.max(0.3, Math.min(1.5, prev.new.errorRate + (Math.random() - 0.5) * 0.2)),
              latency: Math.max(80, Math.min(200, prev.new.latency + (Math.random() - 0.5) * 15)),
              successRate: Math.max(97, Math.min(99.5, prev.new.successRate + (Math.random() - 0.5) * 0.3)),
              transactions: prev.new.transactions + Math.floor(Math.random() * 5)
            }
          };
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [simulateBadCanary, isTargetingOn]);

  // Reset metrics when toggling simulation
  const toggleBadCanary = () => {
    setSimulateBadCanary(!simulateBadCanary);
    if (!simulateBadCanary) {
      // Switching to bad canary - spike the metrics immediately
      setMetrics(prev => ({
        ...prev,
        new: {
          errorRate: 3.2,
          latency: 520,
          successRate: 92.1,
          transactions: prev.new.transactions
        }
      }));
    } else {
      // Switching back to healthy - reset metrics
      setMetrics(prev => ({
        ...prev,
        new: {
          errorRate: 0.8,
          latency: 120,
          successRate: 99.2,
          transactions: prev.new.transactions
        }
      }));
    }
  };

  const MetricCard = ({ title, legacyValue, newValue, unit, lowerIsBetter = true, icon: Icon }) => {
    const improvement = lowerIsBetter 
      ? ((legacyValue - newValue) / legacyValue * 100)
      : ((newValue - legacyValue) / legacyValue * 100);
    const isImproved = improvement > 0;

    return (
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{title}</span>
          </div>
          <div className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full ${
            isImproved ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {isImproved ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{Math.abs(improvement).toFixed(1)}%</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-500 mb-1">Legacy</p>
            <p className="text-lg font-bold text-gray-700">
              {typeof legacyValue === 'number' ? legacyValue.toFixed(1) : legacyValue}{unit}
            </p>
          </div>
          <div className={`text-center p-2 rounded ${
            isImproved ? 'bg-green-50' : 'bg-red-50'
          }`}>
            <p className="text-xs text-gray-500 mb-1">New (Canary)</p>
            <p className={`text-lg font-bold ${isImproved ? 'text-green-600' : 'text-red-600'}`}>
              {typeof newValue === 'number' ? newValue.toFixed(1) : newValue}{unit}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Don't render if targeting is OFF
  if (!isTargetingOn) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 mt-8 overflow-hidden">
      {/* Collapsed Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-indigo-100/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900">Progressive Rollout Analytics</h2>
          <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">
            {isExpanded ? 'Click to collapse' : 'Click to expand'}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className={`w-2 h-2 rounded-full ${newPaymentProcessor ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
            <span className="text-xs text-gray-500">
              {newPaymentProcessor ? 'Canary group' : 'Control group'}
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="p-6 pt-2">
          <div className="flex items-center justify-end mb-4">
            <button
              onClick={toggleBadCanary}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                simulateBadCanary
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {simulateBadCanary ? '✓ Reset to Healthy' : '⚠️ Simulate Bad Canary'}
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Real-time comparison between <strong>Legacy Payment Processor</strong> (control) and <strong>New Payment Processor</strong> (canary).
            These metrics help decide whether to expand or rollback the release.
          </p>

          {/* Rollout Status Bar */}
          <div className="mb-6 p-4 bg-white rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Rollout Progress</span>
              <span className="text-sm text-indigo-600 font-medium">50% → Canary Phase</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="flex h-3 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full" style={{ width: '50%' }}></div>
                <div className="bg-gray-300 h-full" style={{ width: '50%' }}></div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>0% (Start)</span>
              <span>5% (Internal)</span>
              <span className="text-indigo-600 font-medium">50% (Current)</span>
              <span>100% (Full)</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard 
              title="Error Rate" 
              legacyValue={metrics.legacy.errorRate} 
              newValue={metrics.new.errorRate}
              unit="%"
              lowerIsBetter={true}
              icon={AlertTriangle}
            />
            <MetricCard 
              title="Latency (p95)" 
              legacyValue={metrics.legacy.latency} 
              newValue={metrics.new.latency}
              unit="ms"
              lowerIsBetter={true}
              icon={Clock}
            />
            <MetricCard 
              title="Success Rate" 
              legacyValue={metrics.legacy.successRate} 
              newValue={metrics.new.successRate}
              unit="%"
              lowerIsBetter={false}
              icon={CheckCircle}
            />
            <MetricCard 
              title="Transactions" 
              legacyValue={metrics.legacy.transactions} 
              newValue={metrics.new.transactions}
              unit=""
              lowerIsBetter={false}
              icon={Users}
            />
          </div>

          {/* Guardrail Status - Dynamic */}
          {(() => {
            const errorRatePassing = metrics.new.errorRate < GUARDRAILS.errorRate.threshold;
            const latencyPassing = metrics.new.latency < GUARDRAILS.latency.threshold;
            const successRatePassing = metrics.new.successRate > GUARDRAILS.successRate.threshold;
            const allPassing = errorRatePassing && latencyPassing && successRatePassing;
            const failedCount = [errorRatePassing, latencyPassing, successRatePassing].filter(x => !x).length;

            return (
              <div className="bg-white rounded-lg border p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">Guardrail Status</h3>
                  {allPassing ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">All Passing</span>
                  ) : (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full animate-pulse">
                      {failedCount} Guardrail{failedCount > 1 ? 's' : ''} Breached
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Error Rate Guardrail */}
              <div className={`flex items-center space-x-3 p-3 rounded-lg border ${
                errorRatePassing 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                {errorRatePassing 
                  ? <CheckCircle className="w-5 h-5 text-green-500" />
                  : <XCircle className="w-5 h-5 text-red-500" />
                }
                <div>
                  <p className={`text-sm font-medium ${errorRatePassing ? 'text-green-700' : 'text-red-700'}`}>
                    Error Rate
                  </p>
                  <p className={`text-xs ${errorRatePassing ? 'text-green-600' : 'text-red-600'}`}>
                    {metrics.new.errorRate.toFixed(1)}% {errorRatePassing ? '<' : '≥'} {GUARDRAILS.errorRate.threshold}% {errorRatePassing ? '✓' : '✗'}
                  </p>
                </div>
              </div>

              {/* Latency Guardrail */}
              <div className={`flex items-center space-x-3 p-3 rounded-lg border ${
                latencyPassing 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                {latencyPassing 
                  ? <CheckCircle className="w-5 h-5 text-green-500" />
                  : <XCircle className="w-5 h-5 text-red-500" />
                }
                <div>
                  <p className={`text-sm font-medium ${latencyPassing ? 'text-green-700' : 'text-red-700'}`}>
                    Latency
                  </p>
                  <p className={`text-xs ${latencyPassing ? 'text-green-600' : 'text-red-600'}`}>
                    {metrics.new.latency.toFixed(0)}ms {latencyPassing ? '<' : '≥'} {GUARDRAILS.latency.threshold}ms {latencyPassing ? '✓' : '✗'}
                  </p>
                </div>
              </div>

              {/* Success Rate Guardrail */}
              <div className={`flex items-center space-x-3 p-3 rounded-lg border ${
                successRatePassing 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                {successRatePassing 
                  ? <CheckCircle className="w-5 h-5 text-green-500" />
                  : <XCircle className="w-5 h-5 text-red-500" />
                }
                <div>
                  <p className={`text-sm font-medium ${successRatePassing ? 'text-green-700' : 'text-red-700'}`}>
                    Success Rate
                  </p>
                  <p className={`text-xs ${successRatePassing ? 'text-green-600' : 'text-red-600'}`}>
                    {metrics.new.successRate.toFixed(1)}% {successRatePassing ? '>' : '≤'} {GUARDRAILS.successRate.threshold}% {successRatePassing ? '✓' : '✗'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Dynamic Recommendation */}
            <div className={`mt-4 p-3 rounded-lg border ${
              allPassing 
                ? 'bg-indigo-50 border-indigo-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <p className={`text-sm ${allPassing ? 'text-indigo-700' : 'text-red-700'}`}>
                <strong>Recommendation:</strong> {allPassing 
                  ? 'All guardrails passing. Safe to expand rollout to 75% or 100%.'
                  : '⚠️ PAUSE ROLLOUT - Guardrails breached. Investigate metrics before expanding. Consider rollback if issues persist.'
                }
              </p>
            </div>
          </div>
        );
      })()}

          {/* Demo Note */}
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-xs text-gray-500 text-center">
              <strong>Demo Note:</strong> In production, these metrics would come from your observability platform (Datadog, New Relic, etc.) 
              integrated with LaunchDarkly's Guarded Releases feature.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RolloutAnalytics;
