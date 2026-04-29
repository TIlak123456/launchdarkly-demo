import React, { useState } from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { CreditCard, Zap, Shield, Clock, CheckCircle } from 'lucide-react';

function PaymentProcessor() {
  const { newPaymentProcessor } = useFlags();
  const [selectedMethod, setSelectedMethod] = useState('card');

  const legacyProcessor = {
    name: 'Legacy Payment System',
    icon: Clock,
    color: 'gray',
    features: ['Standard processing', '3-5 second confirmation', 'Basic fraud detection'],
    processingTime: '3-5 seconds'
  };

  const newProcessor = {
    name: 'New Payment Processor',
    icon: Zap,
    color: 'purple',
    features: ['Instant processing', 'Sub-second confirmation', 'AI fraud detection', 'Multi-currency support'],
    processingTime: '< 1 second'
  };

  const processor = newPaymentProcessor ? newProcessor : legacyProcessor;
  const ProcessorIcon = processor.icon;

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            newPaymentProcessor 
              ? 'bg-purple-100 text-purple-700' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {newPaymentProcessor ? '🚀 New Processor' : '📦 Legacy'}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Demo 2: Progressive Rollout - {newPaymentProcessor ? 'New processor (canary)' : 'Legacy processor'}
        </p>
      </div>

      <div className="p-6">
        <div className={`p-4 rounded-lg border-2 mb-6 ${
          newPaymentProcessor 
            ? 'border-purple-200 bg-purple-50' 
            : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex items-center space-x-3 mb-3">
            <div className={`p-2 rounded-lg ${
              newPaymentProcessor ? 'bg-purple-200' : 'bg-gray-200'
            }`}>
              <ProcessorIcon className={`w-6 h-6 ${
                newPaymentProcessor ? 'text-purple-700' : 'text-gray-700'
              }`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{processor.name}</h3>
              <p className="text-xs text-gray-500">Processing time: {processor.processingTime}</p>
            </div>
          </div>
          
          <ul className="space-y-2">
            {processor.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <CheckCircle className={`w-4 h-4 mr-2 ${
                  newPaymentProcessor ? 'text-purple-500' : 'text-gray-400'
                }`} />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 mb-6">
          <label className="text-sm font-medium text-gray-700">Select Payment Method</label>
          
          <div className="grid grid-cols-3 gap-3">
            {['card', 'paypal', 'apple'].map((method) => (
              <button
                key={method}
                onClick={() => setSelectedMethod(method)}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  selectedMethod === method
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-2xl">
                  {method === 'card' ? '💳' : method === 'paypal' ? '🅿️' : '🍎'}
                </span>
                <p className="text-xs mt-1 text-gray-600 capitalize">{method === 'apple' ? 'Apple Pay' : method}</p>
              </button>
            ))}
          </div>
        </div>

        {selectedMethod === 'card' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Shield className="w-4 h-4" />
          <span>Secured by {newPaymentProcessor ? 'AI-powered' : 'standard'} encryption</span>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            <strong>Flag:</strong> new-payment-processor = {newPaymentProcessor ? 'true' : 'false'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentProcessor;
