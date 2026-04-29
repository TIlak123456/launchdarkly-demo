import React, { useState } from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { ShoppingBag, CreditCard, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

function CheckoutFlow() {
  const { newCheckoutFlow } = useFlags();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    setError(null);
    setSuccess(false);

    await new Promise(resolve => setTimeout(resolve, 1500));

    if (newCheckoutFlow) {
      setError('Payment processing failed: Invalid card token. Please try again.');
      setIsProcessing(false);
    } else {
      setSuccess(true);
      setIsProcessing(false);
    }
  };

  const resetCheckout = () => {
    setError(null);
    setSuccess(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Checkout</h2>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            newCheckoutFlow 
              ? 'bg-purple-100 text-purple-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {newCheckoutFlow ? '🆕 New Flow' : '✅ Stable Flow'}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Demo 1: Kill Switch - {newCheckoutFlow ? 'New checkout (has bugs!)' : 'Stable checkout'}
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Premium Widget</span>
            <span className="font-medium">$49.99</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Pro Subscription</span>
            <span className="font-medium">$29.99</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">$5.99</span>
          </div>
          <div className="flex justify-between items-center py-2 text-lg font-bold">
            <span>Total</span>
            <span className="text-blue-600">$85.97</span>
          </div>
        </div>

        {newCheckoutFlow && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">New Checkout Experience</p>
              <p className="text-xs text-yellow-600">You're seeing our new checkout flow (beta)</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">Checkout Failed</p>
                <p className="text-xs text-red-600 mt-1">{error}</p>
                <button 
                  onClick={resetCheckout}
                  className="mt-2 text-xs text-red-700 underline hover:no-underline"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800">Order Confirmed!</p>
                <p className="text-xs text-green-600 mt-1">Thank you for your purchase. Order #12345</p>
                <button 
                  onClick={resetCheckout}
                  className="mt-2 text-xs text-green-700 underline hover:no-underline"
                >
                  Place another order
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleCheckout}
          disabled={isProcessing || success}
          className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all ${
            isProcessing || success
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <CreditCard className="w-5 h-5" />
          <span>
            {isProcessing ? 'Processing...' : success ? 'Order Placed' : 'Complete Purchase'}
          </span>
        </button>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            <strong>Flag:</strong> new-checkout-flow = {newCheckoutFlow ? 'true' : 'false'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutFlow;
