import React, { useState, useEffect } from 'react';
import { withLDProvider, useLDClient } from 'launchdarkly-react-client-sdk';
import { demoUsers, getUserContext } from './users/demoUsers';
import Header from './components/Header';
import UserSwitcher from './components/UserSwitcher';
import CheckoutFlow from './components/CheckoutFlow';
import PaymentProcessor from './components/PaymentProcessor';
import HolidayBanner from './components/HolidayBanner';
import PremiumFeatures from './components/PremiumFeatures';
import FlagStatus from './components/FlagStatus';
import SDKStatus from './components/SDKStatus';
import FooterMonitors from './components/FooterMonitors';
import RolloutAnalytics from './components/RolloutAnalytics';
import DeploymentVsRelease from './components/DeploymentVsRelease';

const LAUNCHDARKLY_CLIENT_ID = import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID || 'YOUR_CLIENT_ID_HERE';

function AppContent() {
  const [currentUser, setCurrentUser] = useState(demoUsers[0]);
  const ldClient = useLDClient();

  useEffect(() => {
    if (ldClient) {
      ldClient.identify(getUserContext(currentUser));
    }
  }, [currentUser, ldClient]);

  return (
    <div className="min-h-screen bg-gray-50">
      <SDKStatus />
      <Header />
      
      <HolidayBanner />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <UserSwitcher 
          users={demoUsers} 
          currentUser={currentUser} 
          onUserChange={setCurrentUser} 
        />
        
        <FlagStatus currentUser={currentUser} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <CheckoutFlow />
          <PaymentProcessor />
        </div>
        
        <PremiumFeatures />
        
        <RolloutAnalytics />
        
        <DeploymentVsRelease />
      </main>
      
      <FooterMonitors currentUser={currentUser} />
    </div>
  );
}

function ConfigurationRequired() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg">
        <h1 className="text-2xl font-bold text-red-600 mb-4">⚠️ Configuration Required</h1>
        <p className="text-gray-700 mb-4">
          Please set your LaunchDarkly Client-side ID to run this demo.
        </p>
        <div className="bg-gray-100 rounded p-4 font-mono text-sm">
          <p className="text-gray-600 mb-2"># Create a .env file with:</p>
          <p className="text-blue-600">VITE_LAUNCHDARKLY_CLIENT_ID=your-client-id</p>
        </div>
        <p className="text-gray-500 mt-4 text-sm">
          Get your Client-side ID from: LaunchDarkly Dashboard → Settings → Projects → Environments
        </p>
      </div>
    </div>
  );
}

function App() {
  if (LAUNCHDARKLY_CLIENT_ID === 'YOUR_CLIENT_ID_HERE') {
    return <ConfigurationRequired />;
  }

  return <AppContent />;
}

export default withLDProvider({
  clientSideID: LAUNCHDARKLY_CLIENT_ID,
  context: getUserContext(demoUsers[0]),
  options: {
    bootstrap: 'localStorage',
    evaluationReasons: true
  }
})(App);
