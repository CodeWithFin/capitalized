"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

type TicketType = 'individual' | 'corporate';

type MpesaPaymentParams = {
  email: string;
  phoneNumber: string;
  amount: number;
  eventType: string;
  isClubMember: boolean;
  ticketType: TicketType;
  quantity: number;
};

type PaymentStatus = 'idle' | 'initiating' | 'pending' | 'success' | 'failed';

async function initiateMpesaPayment({ email, phoneNumber, amount, eventType, isClubMember, ticketType, quantity }: MpesaPaymentParams) {
  try {
    const res = await fetch("/api/mpesa/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phoneNumber, amount, eventType, isClubMember, ticketType, quantity }),
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
  const searchParams = useSearchParams();
  
  // Get URL parameters
  const urlTicketType = searchParams.get('ticket') as TicketType || 'individual';
  const urlAmount = parseInt(searchParams.get('amount') || '5000');
  const urlQuantity = parseInt(searchParams.get('quantity') || '1');
  const urlIsClubMember = searchParams.get('clubMember') === 'true';
  const urlClubId = searchParams.get('clubId') || '';

  // State for checkout
  const [ticketType, setTicketType] = useState<TicketType>(urlTicketType);
  const [quantity, setQuantity] = useState(urlQuantity);
  const [totalAmount, setTotalAmount] = useState(urlAmount);
  const [isClubMember, setIsClubMember] = useState(urlIsClubMember);
  const [clubId, setClubId] = useState(urlClubId);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [message, setMessage] = useState("");
  const [checkoutRequestId, setCheckoutRequestId] = useState("");
  const [paymentDetails, setPaymentDetails] = useState<{amount?: number, mpesaRef?: string}>({});

  // Calculate unit price and total
  const getUnitPrice = () => {
    if (ticketType === 'individual') {
      return isClubMember && clubId.trim() ? 3500 : 5000;
    } else {
      return 50000;
    }
  };

  // Update total when quantity or other factors change
  useEffect(() => {
    setTotalAmount(getUnitPrice() * quantity);
  }, [ticketType, quantity, isClubMember, clubId]);

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
    
    if (!email || !phoneNumber || totalAmount <= 0) {
      setMessage("Please fill in all required fields");
      setPaymentStatus('idle');
      return;
    }

    const res = await initiateMpesaPayment({ 
      email, 
      phoneNumber, 
      amount: totalAmount, 
      eventType: ticketType === 'individual' ? '5000' : '50000',
      isClubMember,
      ticketType,
      quantity
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
            <div className="bg-blue-600 text-white text-center py-6">
              <h1 className="text-2xl font-bold">
                {ticketType === 'individual' ? 'Individual Ticket' : 'Corporate Package'} Checkout
              </h1>
              <p className="text-blue-100 mt-2">Complete your purchase</p>
            </div>

            {/* Form */}
            <div className="p-8 space-y-6">
              {/* Ticket Summary */}
              <div className="bg-gray-50 rounded-lg p-4 border">
                <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Ticket Type:</span>
                    <span className="font-medium">
                      {ticketType === 'individual' ? 'Individual Ticket' : 'Corporate & SME Package'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Quantity:</span>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="h-6 w-6 rounded border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 text-xs font-semibold"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="h-6 w-6 rounded border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 text-xs font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Unit Price:</span>
                    <span>KES {getUnitPrice().toLocaleString()}</span>
                  </div>
                  {ticketType === 'individual' && isClubMember && clubId.trim() && (
                    <div className="flex justify-between text-green-600">
                      <span>Club Discount:</span>
                      <span>- KES 1,500</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-blue-600">KES {totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
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
                <p className="text-xs text-gray-500 mt-1">Enter your M-Pesa registered number</p>
              </div>

              {/* Club Member Section - Only for Individual tickets */}
              {ticketType === 'individual' && (
                <>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="clubMember"
                      checked={isClubMember}
                      onChange={(e) => setIsClubMember(e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="clubMember" className="ml-3 text-sm text-gray-900">
                      Club Member (Save KES 1,500)
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
                    </div>
                  )}
                </>
              )}

              {/* Divider */}
              <div className="border-t border-gray-300 my-4"></div>

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