import React, { useState, useEffect } from 'react';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';

function SDKStatus() {
  const ldClient = useLDClient();
  const [status, setStatus] = useState('connecting'); // 'connecting' | 'connected' | 'disconnected'
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    if (!ldClient) {
      setStatus('connecting');
      return;
    }

    const checkConnection = () => {
      try {
        // If we can get flags, we're connected
        const flags = ldClient.allFlags();
        if (flags && Object.keys(flags).length >= 0) {
          setStatus('connected');
          setLastUpdate(new Date());
        }
      } catch (e) {
        setStatus('disconnected');
      }
    };

    // Initial check
    checkConnection();

    // Listen for flag changes (indicates active connection)
    const handleChange = () => {
      setStatus('connected');
      setLastUpdate(new Date());
    };

    ldClient.on('change', handleChange);
    ldClient.on('ready', handleChange);

    // Periodic check every 5 seconds
    const interval = setInterval(checkConnection, 5000);

    return () => {
      ldClient.off('change', handleChange);
      ldClient.off('ready', handleChange);
      clearInterval(interval);
    };
  }, [ldClient]);

  const statusConfig = {
    connecting: {
      color: 'bg-yellow-500',
      pulseColor: 'bg-yellow-400',
      text: 'Connecting...',
      textColor: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      icon: Loader2,
      animate: true
    },
    connected: {
      color: 'bg-green-500',
      pulseColor: 'bg-green-400',
      text: 'Connected',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: Wifi,
      animate: false
    },
    disconnected: {
      color: 'bg-red-500',
      pulseColor: 'bg-red-400',
      text: 'Disconnected',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: WifiOff,
      animate: false
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className={`fixed top-4 right-4 z-50 ${config.bgColor} ${config.borderColor} border rounded-lg shadow-lg p-3`}>
      <div className="flex items-center space-x-3">
        <div className="relative">
          {/* Pulse animation for connected state */}
          {status === 'connected' && (
            <span className={`absolute inline-flex h-4 w-4 rounded-full ${config.pulseColor} opacity-75 animate-ping`}></span>
          )}
          <span className={`relative inline-flex h-4 w-4 rounded-full ${config.color}`}></span>
        </div>
        
        <div className="flex items-center space-x-2">
          <StatusIcon className={`w-4 h-4 ${config.textColor} ${config.animate ? 'animate-spin' : ''}`} />
          <div>
            <p className={`text-sm font-medium ${config.textColor}`}>
              LaunchDarkly SDK
            </p>
            <p className={`text-xs ${config.textColor} opacity-75`}>
              {config.text}
              {lastUpdate && status === 'connected' && (
                <span className="ml-1">
                  • Last sync: {lastUpdate.toLocaleTimeString()}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SDKStatus;
