"use client";

import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 p-8 text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold mb-2 text-green-500">
          Payment Initiated!
        </h2>

        <div className="text-gray-300 space-y-2 mb-6">
          <p>Your M-Pesa payment has been initiated successfully.</p>
          <p>Please complete the payment on your phone.</p>
          <p>You will receive an SMS confirmation once the payment is processed.</p>
        </div>

        <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 mb-6">
          <p className="text-green-300 text-sm">
            🎉 Thank you for joining the Capitalized Event! 
            Your ticket will be confirmed via SMS once payment is complete.
          </p>
        </div>

        <Link
          href="/"
          className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
