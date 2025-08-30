"use client";

export default function Partners() {
  const logos = [
    { name: 'Wapipay', url: '/images/Wapi-Logo.jpg', fallback: 'Wapipay' },
    { name: 'Capital Club', url: '/images/club-capital.png', fallback: 'Capital Club' },
    { name: 'AI Kenya', url: '/images/Ai-Kenya-logo.png', fallback: 'AI Kenya' },
    { name: 'SISCOM', url: '/images/SISCOM vers 3-13.png', fallback: 'SISCOM' },
    { name: 'Angani', url: '/images/angani.png', fallback: 'Angani' },
    { name: 'Lyrid', url: '/images/Lyrid_logo.jpeg', fallback: 'Lyrid' },
  ];

  // Duplicate logos for seamless scrolling
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section id="partners" className="w-full bg-white py-20 scroll-mt-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-800">Our Trusted Partners</h2>
        <div className="mt-3 w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </div>
      
      {/* Scrolling Container */}
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll-left">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 mx-12 h-20 w-40 flex items-center justify-center rounded-lg p-4"
            >
              <img
                src={logo.url}
                alt={logo.name}
                className="max-h-full max-w-full object-contain transition-all duration-300 hover:scale-109"
                style={{ transform: 'scale(1.04)' }}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<div class="text-slate-800 font-semibold text-sm">${logo.fallback}</div>`;
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}


