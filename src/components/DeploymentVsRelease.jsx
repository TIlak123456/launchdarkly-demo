import React, { useState } from 'react';
import { GitBranch, GitMerge, Server, Users, Flag, ArrowRight, CheckCircle, XCircle, Zap, ChevronDown, ChevronUp } from 'lucide-react';

function DeploymentVsRelease() {
  const [showModern, setShowModern] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 mt-8 text-white overflow-hidden">
      {/* Collapsed Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <GitBranch className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl font-bold">Trunk-Based Development & CI/CD</h2>
          <span className="text-xs bg-cyan-600 text-white px-2 py-1 rounded-full">
            {isExpanded ? 'Click to collapse' : 'Click to expand'}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-6 h-6 text-slate-400" />
        ) : (
          <ChevronDown className="w-6 h-6 text-slate-400" />
        )}
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="p-6 pt-2">
          <div className="flex items-center justify-end mb-6">
            <div className="flex bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setShowModern(false)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  !showModern ? 'bg-red-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Traditional
              </button>
              <button
                onClick={() => setShowModern(true)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  showModern ? 'bg-green-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                With LaunchDarkly
              </button>
            </div>
          </div>

          {!showModern ? (
            <div className="space-y-6">
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
                <h3 className="text-red-400 font-semibold mb-2">Traditional Feature Branching</h3>
                <p className="text-slate-300 text-sm">
                  Long-lived feature branches, merge conflicts, delayed integration, and risky big-bang releases.
                </p>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center">
                    <GitBranch className="w-8 h-8 text-orange-400" />
                  </div>
                  <span className="text-xs mt-2 text-slate-400">Feature Branch</span>
                  <span className="text-xs text-orange-400">2-4 weeks</span>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-500" />
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center">
                    <GitMerge className="w-8 h-8 text-yellow-400" />
                  </div>
                  <span className="text-xs mt-2 text-slate-400">Merge Conflicts</span>
                  <span className="text-xs text-yellow-400">Pain</span>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-500" />
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center">
                    <Server className="w-8 h-8 text-blue-400" />
                  </div>
                  <span className="text-xs mt-2 text-slate-400">Deploy</span>
                  <span className="text-xs text-blue-400">All servers</span>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-500" />
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-red-700 rounded-lg flex items-center justify-center border-2 border-red-500">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-xs mt-2 text-slate-400">Release</span>
                  <span className="text-xs text-red-400">100% at once!</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
                  <XCircle className="w-5 h-5 text-red-400 mb-2" />
                  <p className="text-sm text-slate-300">Deploy = Release</p>
                  <p className="text-xs text-slate-500">No separation, all or nothing</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
                  <XCircle className="w-5 h-5 text-red-400 mb-2" />
                  <p className="text-sm text-slate-300">Rollback = Redeploy</p>
                  <p className="text-xs text-slate-500">Minutes to hours of downtime</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
                  <XCircle className="w-5 h-5 text-red-400 mb-2" />
                  <p className="text-sm text-slate-300">Test in Prod?</p>
                  <p className="text-xs text-slate-500">Impossible without risk</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-2">Trunk-Based Development + Feature Flags</h3>
                <p className="text-slate-300 text-sm">
                  Everyone commits to main. CI/CD deploys continuously. Feature flags control who sees what.
                </p>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center">
                    <GitBranch className="w-8 h-8 text-green-400" />
                  </div>
                  <span className="text-xs mt-2 text-slate-400">Commit to Main</span>
                  <span className="text-xs text-green-400">Daily</span>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-500" />
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center">
                    <Zap className="w-8 h-8 text-yellow-400" />
                  </div>
                  <span className="text-xs mt-2 text-slate-400">CI/CD Pipeline</span>
                  <span className="text-xs text-yellow-400">Automated</span>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-500" />
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center">
                    <Server className="w-8 h-8 text-blue-400" />
                  </div>
                  <span className="text-xs mt-2 text-slate-400">Deploy</span>
                  <span className="text-xs text-blue-400">100% servers</span>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-500" />
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-cyan-600 rounded-lg flex items-center justify-center border-2 border-cyan-400 animate-pulse">
                    <Flag className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-xs mt-2 text-cyan-400 font-semibold">LaunchDarkly</span>
                  <span className="text-xs text-cyan-300">Controls Release</span>
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Progressive Release (Code is deployed, flag controls visibility)</h4>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-slate-700 rounded-full h-4 overflow-hidden">
                    <div className="h-full flex">
                      <div className="bg-purple-500 w-[5%]"></div>
                      <div className="bg-blue-500 w-[10%]"></div>
                      <div className="bg-green-500 w-[35%]"></div>
                      <div className="bg-slate-600 w-[50%]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-slate-400">
                  <span className="text-purple-400">5% Internal</span>
                  <span className="text-blue-400">15% Beta</span>
                  <span className="text-green-400">50% Canary</span>
                  <span className="text-slate-500">100% Full</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-800 rounded-lg p-4 border border-green-600">
                  <CheckCircle className="w-5 h-5 text-green-400 mb-2" />
                  <p className="text-sm text-slate-300">Deploy ≠ Release</p>
                  <p className="text-xs text-slate-500">Decouple deployment from release</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 border border-green-600">
                  <CheckCircle className="w-5 h-5 text-green-400 mb-2" />
                  <p className="text-sm text-slate-300">Instant Rollback</p>
                  <p className="text-xs text-slate-500">Toggle flag, not redeploy</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 border border-green-600">
                  <CheckCircle className="w-5 h-5 text-green-400 mb-2" />
                  <p className="text-sm text-slate-300">Test in Production</p>
                  <p className="text-xs text-slate-500">Safely with targeting rules</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-cyan-900/30 border border-cyan-700 rounded-lg">
            <p className="text-cyan-300 text-sm text-center">
              <strong>Key Insight:</strong> Your CI/CD pipeline deploys code to 100% of servers. 
              LaunchDarkly controls who <em>sees</em> the feature. Deployment is a technical event. Release is a business decision.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeploymentVsRelease;
