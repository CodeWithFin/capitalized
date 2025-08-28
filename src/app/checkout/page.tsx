"use client";

import { useState, useEffect } from "react";

type MpesaPaymentParams = {
  email: string;
  phoneNumber: string;
  amount: number;
  eventType: string;
  isClubMember: boolean;
  quantity?: number;
  clubId?: string;
};

type PaymentStatus = 'idle' | 'initiating' | 'pending' | 'success' | 'failed';

async function initiateMpesaPayment({ email, phoneNumber, amount, eventType, isClubMember, quantity, clubId }: MpesaPaymentParams) {
  try {
    const res = await fetch("/api/mpesa/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phoneNumber, amount, eventType, isClubMember, quantity, clubId }),
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
  const [quantity, setQuantity] = useState(1);
  const [isClubMember, setIsClubMember] = useState(false);
  const [clubId, setClubId] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [message, setMessage] = useState("");
  const [checkoutRequestId, setCheckoutRequestId] = useState("");
  const [paymentDetails, setPaymentDetails] = useState<{amount?: number, mpesaRef?: string}>({});

  // Read URL parameters and pre-populate form
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ticket = urlParams.get('ticket');
    const amount = urlParams.get('amount');
    const urlQuantity = urlParams.get('quantity');
    const clubMember = urlParams.get('clubMember');
    const urlClubId = urlParams.get('clubId');

    if (ticket && amount) {
      // Set the event based on the ticket type from home page
      if (ticket === 'individual') {
        setSelectedEvent('5000');
      } else if (ticket === 'corporate') {
        setSelectedEvent('50000');
      }
    }

    // Set quantity from URL parameter
    if (urlQuantity) {
      setQuantity(parseInt(urlQuantity, 10) || 1);
    }

    // Set club member information from URL
    if (clubMember === 'true') {
      setIsClubMember(true);
      if (urlClubId) {
        setClubId(urlClubId);
      }
    }
  }, []);

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
    
    // Determine base amount based on ticket type (ignore quantity for M-Pesa)
    let baseAmount = 0;
    if (selectedEvent === "5000") {
      baseAmount = 5000; // Standard ticket
    } else if (selectedEvent === "50000") {
      baseAmount = 50000; // Corporate ticket
    }
    
    // For M-Pesa, we only send the base amount (5000 or 50000)
    const mpesaAmount = baseAmount;
    
    console.log(`💳 Processing M-Pesa payment:`);
    console.log(`💰 Amount: KES ${mpesaAmount.toLocaleString()}`);
    console.log(`🎫 Ticket Type: ${selectedEvent === "5000" ? "Standard" : "Corporate"}`);
    
    if (!email || !phoneNumber || !selectedEvent || mpesaAmount <= 0) {
      setMessage("Please fill in all required fields");
      setPaymentStatus('idle');
      return;
    }

    const res = await initiateMpesaPayment({ 
      email, 
      phoneNumber, 
      amount: mpesaAmount, // Send exact amount: 5000 or 50000
      eventType: selectedEvent, 
      isClubMember,
      quantity,
      clubId: isClubMember ? clubId : undefined
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
                  <option value="">Choose ticket type</option>
                  <option value="5000">Individual Ticket – KES 5,000.00</option>
                  <option value="50000">Corporate & SME Package – KES 50,000.00</option>
                </select>
              </div>

              {/* Quantity Selector */}
              {selectedEvent && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Number of Tickets
                  </label>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <button 
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="h-10 w-10 rounded-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 text-lg font-semibold flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <div className="w-16 text-center">
                        <span className="text-xl font-bold text-gray-900">{quantity}</span>
                        <div className="text-xs text-gray-500">
                          {selectedEvent === "50000" ? "packages" : "tickets"}
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="h-10 w-10 rounded-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 text-lg font-semibold flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Unit Price</div>
                      <div className="text-lg font-bold text-gray-900">
                        KES {selectedEvent === "5000" 
                          ? (isClubMember && clubId.trim() ? "3,500" : "5,000")
                          : "50,000"
                        }
                      </div>
                      {selectedEvent === "50000" && (
                        <div className="text-xs text-blue-600">Includes 5 admissions</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

                      {/* Club Member Checkbox - Only for Individual tickets */}
                       {selectedEvent === "5000" && (
                         <div className="flex items-center">
                           <input
                             type="checkbox"
                             id="clubMember"
                             checked={isClubMember}
                             onChange={(e) => setIsClubMember(e.target.checked)}
                             className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                           />
                           <label htmlFor="clubMember" className="ml-3 text-sm text-gray-900">
                             Club Member (Get KES 1,500 discount)
                           </label>
                         </div>
                       )}

                       {/* Club ID Input - Only shown when Club Member is checked */}
                       {selectedEvent === "5000" && isClubMember && (
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
                           <div className="mb-2">
                             <p className="text-lg font-bold text-gray-900">
                               M-Pesa Payment Amount:
                             </p>
                             <p className="text-2xl font-bold text-blue-600">
                               KES {(() => {
                                 if (selectedEvent === "5000") {
                                   return "5,000";
                                 } else if (selectedEvent === "50000") {
                                   return "50,000";
                                 }
                                 return "0";
                               })()}
                             </p>
                             <p className="text-sm text-gray-600 mt-2">
                               {selectedEvent === "5000" 
                                 ? "Standard Ticket" 
                                 : selectedEvent === "50000" 
                                   ? "Corporate Package" 
                                   : "Select a ticket type"
                               }
                             </p>
                           </div>
                           
                           {/* Show breakdown if quantity > 1 or club discount */}
                           {(quantity > 1 || (selectedEvent === "5000" && isClubMember && clubId.trim())) && (
                             <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                               <p className="text-sm font-semibold text-blue-800 mb-1">Order Summary:</p>
                               <div className="text-xs text-blue-700">
                                 {quantity > 1 && (
                                   <p>{quantity} × {selectedEvent === "50000" ? "Corporate packages" : "tickets"}</p>
                                 )}
                                 {selectedEvent === "5000" && isClubMember && clubId.trim() && (
                                   <p>Club member discount: -KES {(1500 * quantity).toLocaleString()}</p>
                                 )}
                                 <p className="font-semibold mt-1">
                                   Final Total: KES {(() => {
                                     let unitPrice = 0;
                                     if (selectedEvent === "5000") {
                                       unitPrice = isClubMember && clubId.trim() ? 3500 : 5000;
                                     } else if (selectedEvent === "50000") {
                                       unitPrice = 50000;
                                     }
                                     return (unitPrice * quantity).toLocaleString();
                                   })()}
                                 </p>
                               </div>
                             </div>
                           )}
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


