import React from 'react';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import { getUserContext } from '../users/demoUsers';
import { Users, RefreshCw } from 'lucide-react';

function UserSwitcher({ users, currentUser, onUserChange }) {
  const ldClient = useLDClient();

  const handleUserChange = async (user) => {
    onUserChange(user);
    if (ldClient) {
      await ldClient.identify(getUserContext(user));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Switch Demo User</h2>
        </div>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
          Demo Control
        </span>
      </div>
      
      <p className="text-gray-500 text-sm mb-4">
        Switch between users to see how feature flags affect different user segments.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {users.map((user) => (
          <button
            key={user.key}
            onClick={() => handleUserChange(user)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              currentUser.key === user.key
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{user.avatar}</span>
              <div>
                <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                <p className="text-xs text-gray-500">{user.country} • {user.plan}</p>
              </div>
            </div>
            {currentUser.key === user.key && (
              <div className="mt-2 flex items-center text-xs text-blue-600">
                <RefreshCw className="w-3 h-3 mr-1" />
                Active
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          <strong>Current User:</strong> {currentUser.email} | 
          <strong> Country:</strong> {currentUser.country} | 
          <strong> Plan:</strong> {currentUser.plan} | 
          <strong> Type:</strong> {currentUser.userType}
        </p>
      </div>
    </div>
  );
}

export default UserSwitcher;
