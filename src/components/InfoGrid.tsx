"use client";

import { useState } from 'react';

export default function InfoGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items = [
    {
      title: 'Date and Time',
      desc: '15th September 2025\n7:00 AM - 10:00 AM EAT',
      icon: (
        <svg className="h-7 w-7 text-blue-600 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5M9 12.75h6m-6 3h6" />
        </svg>
      ),
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Location',
      desc: 'Capital Club\nWestlands, Nairobi, Kenya',
      icon: (
        <svg className="h-7 w-7 text-emerald-600 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Refund Policy',
      desc: 'No Refunds\nContact organizer to request a refund',
      icon: (
        <svg className="h-7 w-7 text-amber-600 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      title: 'Duration & Format',
      desc: '3 hours\nMobile eTicket',
      icon: (
        <svg className="h-7 w-7 text-purple-600 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-violet-600'
    }
  ];

  return (
    <div className="mt-12 rounded-3xl bg-white border border-slate-200 p-8 shadow-lg hover:shadow-xl transition-all duration-500 animate-in slide-in-from-bottom-4 fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {items.map((item, index) => (
          <div 
            key={item.title} 
            className="flex items-start gap-4 group cursor-pointer transition-all duration-300 hover:transform hover:scale-[1.02] p-4 rounded-2xl hover:bg-slate-50/50"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              animationDelay: `${index * 150}ms`
            }}
          >
            <div className={`
              flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center
              transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6
              ${hoveredIndex === index 
                ? `bg-gradient-to-br ${item.gradient} shadow-lg` 
                : 'bg-gradient-to-br from-slate-100 to-slate-200'
              }
            `}>
              <div className={`transition-all duration-300 ${hoveredIndex === index ? 'text-white scale-110' : ''}`}>
                {item.icon}
              </div>
            </div>
            <div className="flex-1 transition-all duration-300 group-hover:translate-x-1">
              <h3 className="text-lg font-bold text-slate-700 mb-2 transition-colors duration-300 group-hover:text-slate-900">
                {item.title}
              </h3>
              <div className="whitespace-pre-line text-slate-600 text-sm leading-relaxed transition-colors duration-300 group-hover:text-slate-700">
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


