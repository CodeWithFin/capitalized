"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [isClubMember, setIsClubMember] = useState(false);
  const [clubId, setClubId] = useState("");

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
                  placeholder="0712345678 or 0112345678"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">0712345678 or 0112345678</p>
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
                           <p className="text-xs text-gray-500 mt-1">Use: CLUB2024 for testing</p>
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

              {/* Pay Now Button */}
              <button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


