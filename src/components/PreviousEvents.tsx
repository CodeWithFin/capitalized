"use client";

import { useState, useEffect, useRef } from "react";

export default function PreviousEvents() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Auto-rotation settings
  const ROTATION_INTERVAL = 5000; // 5 seconds

  const events = [
    {
      id: 1,
      title: "Africa in the Age of AI",
      banner: "/images/capitalized2.png",
      speaker: {
        name: "Juliana Rotich",
        role: "Tech Entrepreneur and Fintech Leader"
      },
      moderator: {
        name: "Derrick Gakuu",
        role: "Founder Siscom, Innovation Expert"
      },
      description: "Our second event explored the transformative power of AI in Africa, bringing together tech leaders, entrepreneurs, and innovators to discuss how artificial intelligence is reshaping the continent's digital landscape and economic future."
    },
    {
      id: 2,
      title: "The Inaugural Chat on Digital Finance",
      banner: "/images/Main_banner.png",
      speaker: {
        name: "Paul Mwaura Ndichu",
        role: "Cofounder Wapipay, Global Fintech Expert"
      },
      moderator: {
        name: "Derrick Gakuu",
        role: "Founder Siscom, Innovation Expert"
      },
      description: "Our first event brought together industry pioneers to discuss the future of digital finance in Africa. The sold-out session was filled with insightful keynotes, dynamic Q&A, and unparalleled networking opportunities that sparked vital collaborations."
    }
  ];

  // Auto-rotation effect
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentCard((prev) => (prev + 1) % events.length);
      }, ROTATION_INTERVAL);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, events.length]);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % events.length);
    // Reset auto-rotation timer when manually navigating
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentCard((prev) => (prev + 1) % events.length);
      }, ROTATION_INTERVAL);
    }
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + events.length) % events.length);
    // Reset auto-rotation timer when manually navigating
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentCard((prev) => (prev + 1) % events.length);
      }, ROTATION_INTERVAL);
    }
  };

  const handleCardClick = (index: number) => {
    setCurrentCard(index);
    // Reset auto-rotation timer when manually selecting
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentCard((prev) => (prev + 1) % events.length);
      }, ROTATION_INTERVAL);
    }
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section id="previous" className="mt-16 scroll-mt-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-800">From Our Previous Events</h2>
        <div className="mt-2 w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
        <p className="text-sm text-slate-600 mt-2">
          {!isPaused && (
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Auto-rotating every {ROTATION_INTERVAL / 1000}s • Hover to pause
            </span>
          )}
          {isPaused && (
            <span className="inline-flex items-center gap-1 text-orange-600">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Auto-rotation paused
            </span>
          )}
        </p>
      </div>
      
      {/* Sliding Cards Container */}
      <div 
        className="relative max-w-3xl mx-auto px-16"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Navigation Arrows */}
        <button
          onClick={prevCard}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white hover:bg-slate-50 rounded-full shadow-lg border border-slate-200 flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-xl"
        >
          <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L7.5 12l8.25-7.5" />
          </svg>
        </button>
        
        <button
          onClick={nextCard}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white hover:bg-slate-50 rounded-full shadow-lg border border-slate-200 flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-xl"
        >
          <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg border border-slate-200 flex items-center justify-center transition-all duration-200 hover:scale-105"
          title={isPaused ? "Resume auto-rotation" : "Pause auto-rotation"}
        >
          {isPaused ? (
            <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>
          )}
        </button>

        {/* Event Cards */}
        <div className="overflow-hidden rounded-2xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentCard * 100}%)` }}
          >
            {events.map((event, index) => (
              <div key={event.id} className="w-full flex-shrink-0 px-2">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                  {/* Clean Banner Display */}
                  <div className="overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="relative aspect-[16/9] w-full">
                      <img
                        src={event.banner}
                        alt={`Previous Event - ${event.title}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="px-3 py-2 border-t border-slate-200 text-xs text-slate-600">
                      Previous Event: {event.title}
                    </div>
                  </div>

                  {/* Speaker and Moderator Info */}
                  <div className="p-6 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Speaker Section */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-xs text-blue-600 font-medium">Speaker</div>
                            <div className="font-bold text-slate-900 text-sm">{event.speaker.name}</div>
                            <div className="text-xs text-slate-600">{event.speaker.role}</div>
                          </div>
                        </div>
                      </div>

                      {/* Moderator Section */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-xs text-purple-600 font-medium">Moderator</div>
                            <div className="font-bold text-slate-900 text-sm">{event.moderator.name}</div>
                            <div className="text-xs text-slate-600">{event.moderator.role}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6 bg-slate-50">
                    <h3 className="text-xl font-bold text-slate-800 mb-3">
                      A Look Back: {event.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Powered By Section */}
                  <div className="bg-white px-6 py-4 border-t border-slate-200">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-slate-600 font-medium text-sm">Powered by:</div>
                      <div className="flex items-center gap-6">
                        {/* Capital Club Logo */}
                        <div className="h-6 w-20 flex items-center justify-center">
                          <img
                            src="/images/club-capital.png"
                            alt="Capital Club"
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = '<span class="text-slate-700 font-semibold text-xs">CAPITAL CLUB</span>';
                              }
                            }}
                          />
                        </div>
                        
                        {/* Siscom Logo */}
                        <div className="h-6 w-16 flex items-center justify-center">
                          <img
                            src="/images/SISCOM vers 3-13.png"
                            alt="SISCOM"
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = '<span class="text-slate-700 font-semibold text-xs">SISCOM</span>';
                              }
                            }}
                          />
                        </div>
                        
                        {/* Wapipay Logo */}
                        <div className="h-6 w-20 flex items-center justify-center">
                          <img
                            src="/images/Wapi-Logo.jpg"
                            alt="Wapipay"
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = '<span class="text-slate-700 font-semibold text-xs">WAPIPAY</span>';
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 relative ${
                index === currentCard ? 'bg-blue-600 scale-125' : 'bg-slate-300 hover:bg-slate-400'
              }`}
            >
              {/* Progress ring for current card */}
              {index === currentCard && !isPaused && (
                <div className="absolute inset-0 rounded-full border-2 border-blue-300">
                  <div 
                    className="absolute inset-0 rounded-full border-2 border-blue-600 border-t-transparent animate-spin"
                    style={{ 
                      animation: `spin ${ROTATION_INTERVAL}ms linear infinite`
                    }}
                  ></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}


