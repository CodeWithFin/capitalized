"use client";

import { useState, useEffect } from "react";

type MpesaPaymentParams = {
  email: string;
  phoneNumber: string;
  amount: number;
  eventType: string;
  isClubMember: boolean;
};

type PaymentStatus = 'idle' | 'initiating' | 'pending' | 'success' | 'failed';

async function initiateMpesaPayment({ email, phoneNumber, amount, eventType, isClubMember }: MpesaPaymentParams) {
  try {
    const res = await fetch("/api/mpesa/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phoneNumber, amount, eventType, isClubMember }),
    });
    return await res.json();
  } catch (e) {
    return { error: "Failed to initiate payment" };
  }
}

async function checkPaymentStatus(checkoutRequestId: string) {
  try {
    const res = await fetch(`/api/mpesa/status?checkoutRequestId=${checkoutRequestId}`);
    return await res.json();
  } catch (e) {
    return { status: 'pending' };
  }
}

export default function CheckoutPage() {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [isClubMember, setIsClubMember] = useState(false);
  const [clubId, setClubId] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [message, setMessage] = useState("");
  const [checkoutRequestId, setCheckoutRequestId] = useState("");
  const [paymentDetails, setPaymentDetails] = useState<{amount?: number, mpesaRef?: string}>({});

  // Poll payment status
  useEffect(() => {
    if (paymentStatus === 'pending' && checkoutRequestId) {
      const pollInterval = setInterval(async () => {
        const statusRes = await checkPaymentStatus(checkoutRequestId);
        
        if (statusRes.status === 'success') {
          setPaymentStatus('success');
          clearInterval(pollInterval);
        } else if (statusRes.status === 'failed') {
          setPaymentStatus('failed');
          setMessage('Payment failed. Please try again.');
          clearInterval(pollInterval);
        }
      }, 3000); // Poll every 3 seconds

      // Timeout after 5 minutes
      const timeout = setTimeout(() => {
        clearInterval(pollInterval);
        if (paymentStatus === 'pending') {
          setPaymentStatus('failed');
          setMessage('Payment timeout. Please try again.');
        }
      }, 5 * 60 * 1000);

      return () => {
        clearInterval(pollInterval);
        clearTimeout(timeout);
      };
    }
  }, [paymentStatus, checkoutRequestId]);

  const handlePayment = async () => {
    setPaymentStatus('initiating');
    setMessage("");
    
    const amount = selectedEvent === "5000" && isClubMember && clubId.trim() ? 3500 : selectedEvent === "5000" ? 50000 : 0;
    
    if (!email || !phoneNumber || !selectedEvent || amount <= 0) {
      setMessage("Please fill in all required fields");
      setPaymentStatus('idle');
      return;
    }

    const res = await initiateMpesaPayment({ 
      email, 
      phoneNumber, 
      amount, 
      eventType: selectedEvent, 
      isClubMember 
    });

    if (res.success) {
      setCheckoutRequestId(res.checkoutRequestId);
      setPaymentStatus('pending');
      setMessage("Payment initiated. Check your phone and enter your M-Pesa PIN to complete the payment.");
    } else {
      setPaymentStatus('failed');
      setMessage(res.error || "Failed to initiate payment");
    }
  };

  const resetPayment = () => {
    setPaymentStatus('idle');
    setMessage("");
    setCheckoutRequestId("");
    setPaymentDetails({});
  };

  return (
             <div className="min-h-screen bg-white">

            {/* Main Content */}
           <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Subscribe Form Card */}
                 <div className="bg-white rounded-2xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-red-600 text-white text-center py-6">
              <h1 className="text-2xl font-bold">Subscribe Now</h1>
            </div>

            {/* Form */}
            <div className="p-8 space-y-6">
              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Phone Number (M-Pesa)
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="0712345678"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">0712345678</p>
              </div>

              {/* Select Event */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Select Event
                </label>
                <select
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-gray-900 appearance-none cursor-pointer"
                >
                  <option value="">Choose amount</option>
                  <option value="5000">Capitalized Fireside Breakfast Chat – KES 5000.00</option>
                </select>
              </div>

                      {/* Club Member Checkbox */}
                       <div className="flex items-center">
                         <input
                           type="checkbox"
                           id="clubMember"
                           checked={isClubMember}
                           onChange={(e) => setIsClubMember(e.target.checked)}
                           className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                         />
                         <label htmlFor="clubMember" className="ml-3 text-sm text-gray-900">
                           Club Member
                         </label>
                       </div>

                       {/* Club ID Input - Only shown when Club Member is checked */}
                       {isClubMember && (
                         <div>
                           <label className="block text-sm font-medium text-gray-900 mb-2">
                             Club ID
                           </label>
                           <input
                             type="text"
                             value={clubId}
                             onChange={(e) => setClubId(e.target.value)}
                             placeholder="Enter your club ID"
                             className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                           />
                           {/* <p className="text-xs text-gray-500 mt-1">Use: CLUB2024 for testing</p> */}
                         </div>
                       )}

              {/* Divider */}
              <div className="border-t border-gray-300 my-4"></div>

              {/* Total Amount */}
                       <div className="bg-gray-50 rounded-lg p-4 border-t-4 border-green-500">
                         <div className="text-center">
                           <p className="text-lg font-bold text-gray-900">
                             Total Amount: KES {selectedEvent === "5000" && isClubMember && clubId.trim() ? "3,500.00" : selectedEvent === "5000" ? "5,000.00" : "0.00"}
                           </p>
                         </div>
                       </div>

              {/* Payment Status and Button */}
              {paymentStatus === 'success' ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <div className="text-green-600 text-lg font-semibold mb-2">✅ Payment Successful!</div>
                    <p className="text-green-600 text-sm mt-2">
                      Your ticket has been confirmed. Check your SMS for details.
                    </p>
                  </div>
                  <button
                    onClick={resetPayment}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200"
                  >
                    Make Another Payment
                  </button>
                </div>
              ) : paymentStatus === 'failed' ? (
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <div className="text-red-600 text-lg font-semibold mb-2">❌ Payment Failed</div>
                    <p className="text-red-700 text-sm">{message}</p>
                  </div>
                  <button
                    onClick={resetPayment}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200"
                  >
                    Try Again
                  </button>
                </div>
              ) : paymentStatus === 'pending' ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      <span className="text-blue-600 font-semibold">Payment in Progress</span>
                    </div>
                    <p className="text-blue-700 text-sm">{message}</p>
                    <p className="text-blue-600 text-xs mt-2">
                      Please complete the payment on your phone. This page will update automatically.
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={paymentStatus === 'initiating'}
                  onClick={handlePayment}
                >
                  {paymentStatus === 'initiating' ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Initiating Payment...</span>
                    </div>
                  ) : (
                    'Pay Now'
                  )}
                </button>
              )}
              
              {message && paymentStatus === 'idle' && (
                <div className="mt-4 text-center text-sm text-red-600">{message}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


