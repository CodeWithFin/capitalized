"use client";

import { useState } from "react";
import { useTicket } from "./TicketContext";

export default function SidebarOrder() {
  const {
    selectedTicket,
    quantity,
    total,
    isClubMember,
    clubId,
    setSelectedTicket,
    setQuantity,
    setIsClubMember,
    setClubId,
    getUnitPrice
  } = useTicket();
  const [showDetails, setShowDetails] = useState(false);

  const ticketTypes = {
    individual: {
      name: "Individual Ticket",
      price: 5000,
      description: "Express checkout for individuals",
      features: [
        "Breakfast included",
        "Access to all sessions",
        "Networking opportunities",
        "Event materials"
      ]
    },
    corporate: {
      name: "Corporate & SME Package",
      price: 50000,
      description: "Complete corporate experience",
      features: [
        "Admits five (5) people",
        "Speaker slot opportunity",
        "Table branding",
        "Co-marketing benefits",
        "Premium breakfast",
        "VIP networking access"
      ]
    }
  };

  const currentTicket = ticketTypes[selectedTicket];

  const handleTicketSelect = (ticketType: 'individual' | 'corporate') => {
    setSelectedTicket(ticketType);
    setQuantity(1);
    setShowDetails(false);
  };

  return (
    <aside className="h-fit rounded-2xl bg-white shadow-lg border border-slate-200 p-8 sticky top-20 min-w-[420px]">
      {/* Ticket Type Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 mb-3">Choose Your Ticket</h3>
        <div className="space-y-3">
          {/* Individual Ticket */}
          <div 
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selectedTicket === 'individual' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-slate-200 hover:border-slate-300'
            }`}
            onClick={() => handleTicketSelect('individual')}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">Individual Ticket</div>
                <div className="text-sm text-slate-600">Express checkout</div>
                {selectedTicket === 'individual' && isClubMember && clubId && (
                  <div className="text-xs text-green-600 mt-1">Club member discount applied!</div>
                )}
              </div>
              <div className="text-xl font-bold text-blue-600">
                KES {selectedTicket === 'individual' ? getUnitPrice().toLocaleString() : '5,000'}
              </div>
            </div>
          </div>

          {/* Corporate Ticket */}
          <div 
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selectedTicket === 'corporate' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-slate-200 hover:border-slate-300'
            }`}
            onClick={() => handleTicketSelect('corporate')}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">Corporate & SME</div>
                <div className="text-sm text-slate-600">Premium package</div>
              </div>
              <div className="text-xl font-bold text-blue-600">KES 50,000</div>
            </div>
          </div>
        </div>
      </div>

      {/* Club Member Section - Only for Individual tickets */}
      {selectedTicket === 'individual' && (
        <div className="mb-6 pb-6 border-b border-slate-200">
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="clubMember"
              checked={isClubMember}
              onChange={(e) => setIsClubMember(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="clubMember" className="ml-3 text-sm font-medium text-slate-900">
              Club Member (Save KES 1,500)
            </label>
          </div>
          
          {isClubMember && (
            <div className="mt-3">
              <input
                type="text"
                value={clubId}
                onChange={(e) => setClubId(e.target.value)}
                placeholder="Enter your club ID"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-slate-900 placeholder-slate-500 text-sm"
              />
            </div>
          )}
        </div>
      )}

      {/* Event Details */}
      <div className="mb-6 pb-6 border-b border-slate-200">
        <div className="flex items-start gap-3">
          <svg className="h-5 w-5 text-blue-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <div>
            <div className="font-semibold text-slate-900">17th October 2025</div>
            <div className="text-slate-700">7:00 AM - 10:00 AM EAT</div>
          </div>
        </div>
      </div>

      {/* Package Details with Dropdown */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold text-slate-900">{currentTicket.name}</div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
          >
            More Info
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        <p className="text-slate-700 text-sm mb-3">{currentTicket.description}</p>
        
        {/* Expandable Details */}
        <div className={`overflow-hidden transition-all duration-300 ${showDetails ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="pt-2 border-t border-slate-100">
            <h4 className="font-medium text-slate-900 mb-2">Package includes:</h4>
            <ul className="space-y-2">
              {currentTicket.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-slate-700">
                  <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-900">Quantity</span>
          <div className="inline-flex items-center gap-3">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-8 w-8 rounded-full border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 text-sm font-semibold"
            >
              -
            </button>
            <div className="w-8 text-center text-slate-900 font-semibold">{quantity}</div>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="h-8 w-8 rounded-full border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 text-sm font-semibold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="mb-6 flex items-center justify-between text-lg font-extrabold">
        <span className="text-slate-900">Total:</span>
        <span className="text-blue-600">KES {total.toLocaleString()}</span>
      </div>

      {/* Checkout Button */}
      <button
        onClick={() => {
          const params = new URLSearchParams({
            ticket: selectedTicket,
            amount: total.toString(),
            quantity: quantity.toString()
          });
          
          if (selectedTicket === 'individual' && isClubMember && clubId.trim()) {
            params.set('clubMember', 'true');
            params.set('clubId', clubId);
          }
          
          window.location.href = `/checkout?${params.toString()}`;
        }}
        className="group block w-full rounded-2xl bg-blue-600 text-white text-center font-bold py-4 text-lg shadow-lg hover:bg-blue-700 hover:shadow-2xl hover:scale-105 transition-all duration-300"
      >
        <div className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5 group-hover:animate-spin group-hover:text-yellow-300 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="group-hover:tracking-wide transition-all duration-300">
            {selectedTicket === 'individual' ? 'Express Checkout' : 'Proceed to Checkout'}
          </span>
        </div>
      </button>
      
      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-600">
        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Your payment is secure and encrypted.
      </div>
    </aside>
  );
}
