"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [isClubMember, setIsClubMember] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ultra-Realistic Cyberpunk Background */}
      <div className="absolute inset-0">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Animated neon grid */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)]"
            style={{ backgroundSize: '50px 50px' }}
          ></div>
        </div>

        {/* Dynamic flowing colors */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-purple-700/40 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-pink-500/20 via-red-600/20 to-orange-500/30" style={{animation: 'pulse 4s ease-in-out infinite'}}></div>
        </div>

        {/* Floating particles with depth */}
        <div className="absolute inset-0">
          {/* Large glowing orbs */}
          <div 
            className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
            style={{
              left: `${20 + mousePosition.x * 0.02}%`,
              top: `${10 + mousePosition.y * 0.01}%`,
              animation: 'float 6s ease-in-out infinite'
            }}
          ></div>
          <div 
            className="absolute w-80 h-80 bg-purple-500/25 rounded-full blur-2xl"
            style={{
              right: `${15 + mousePosition.x * 0.015}%`,
              bottom: `${20 + mousePosition.y * 0.01}%`,
              animation: 'float 8s ease-in-out infinite reverse'
            }}
          ></div>
          <div 
            className="absolute w-72 h-72 bg-pink-400/20 rounded-full blur-3xl"
            style={{
              left: `${60 + mousePosition.x * 0.01}%`,
              top: `${60 + mousePosition.y * 0.015}%`,
              animation: 'float 10s ease-in-out infinite'
            }}
          ></div>

          {/* Medium energy spheres */}
          <div className="absolute w-32 h-32 bg-green-400/30 rounded-full blur-xl top-1/4 right-1/3 animate-pulse"></div>
          <div className="absolute w-24 h-24 bg-blue-400/40 rounded-full blur-lg bottom-1/3 left-1/4" style={{animation: 'pulse 3s ease-in-out infinite'}}></div>
          
          {/* Small floating dots */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-cyan-300/60 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Holographic light rays */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-10 opacity-20">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent transform rotate-12"></div>
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent transform -rotate-12"></div>
            <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-pink-400 to-transparent transform rotate-6"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {/* Futuristic Form Container */}
          <div className="relative">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur opacity-30 animate-pulse"></div>
            
            {/* Main form */}
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Header with enhanced gradient */}
              <div className="relative bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white text-center py-8">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative">
                  <h1 className="text-3xl font-bold tracking-wide">Subscribe Now</h1>
                  <div className="mt-2 w-16 h-1 bg-white/80 mx-auto rounded-full"></div>
                </div>
              </div>

              {/* Form content */}
              <div className="p-8 space-y-6">
                {/* Email Address */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-4 rounded-2xl border border-white/20 bg-white/90 backdrop-blur-sm focus:bg-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-lg"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 pointer-events-none"></div>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">
                    Phone Number (M-Pesa)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="0712345678 or 0112345678"
                      className="w-full px-4 py-4 rounded-2xl border border-white/20 bg-white/90 backdrop-blur-sm focus:bg-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-lg"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 pointer-events-none"></div>
                  </div>
                </div>

                {/* Select Event */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">
                    Select Event
                  </label>
                  <div className="relative">
                    <select
                      value={selectedEvent}
                      onChange={(e) => setSelectedEvent(e.target.value)}
                      className="w-full px-4 py-4 rounded-2xl border border-white/20 bg-white/90 backdrop-blur-sm focus:bg-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 text-gray-800 appearance-none cursor-pointer shadow-lg"
                    >
                      <option value="">Choose amount</option>
                      <option value="5000">General Admission - KES 5,000</option>
                      <option value="3500">Student - KES 3,500</option>
                      <option value="0">Free (Media/Sponsor)</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 pointer-events-none"></div>
                  </div>
                </div>

                {/* Club Member */}
                <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <input
                    type="checkbox"
                    id="clubMember"
                    checked={isClubMember}
                    onChange={(e) => setIsClubMember(e.target.checked)}
                    className="w-5 h-5 text-cyan-400 bg-white/20 border-white/30 rounded focus:ring-cyan-400 focus:ring-2"
                  />
                  <label htmlFor="clubMember" className="text-sm font-medium text-gray-300">
                    Club Member
                  </label>
                </div>

                {/* Total Amount */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-50"></div>
                  <div className="relative bg-white/95 rounded-2xl p-6 border border-green-400/30 shadow-xl">
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-900">
                        Total Amount: KES {selectedEvent === "5000" ? "5,000" : selectedEvent === "3500" ? "3,500" : "0.00"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pay Now Button */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-2xl blur opacity-60 animate-pulse"></div>
                  <button
                    type="button"
                    className="relative w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-5 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl"
                  >
                    <span className="relative z-10">Pay Now</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Back link */}
          <div className="text-center mt-8">
            <Link 
              href="/" 
              className="text-cyan-300 hover:text-white text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Event Details</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}


