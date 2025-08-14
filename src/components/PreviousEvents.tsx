"use client";

export default function PreviousEvents() {
  return (
    <section id="previous" className="mt-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-800">From Our Previous Event</h2>
        <div className="mt-2 w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </div>
      
      {/* Event Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Clean Banner Display */}
        <div className="overflow-hidden rounded-t-3xl border border-slate-200 bg-white shadow-sm">
          <div className="relative aspect-[16/9] w-full">
            <img
              src="/images/Main_banner.png"
              alt="Previous Event - Digital Finance Chat"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          <div className="px-4 py-3 border-t border-slate-200 text-xs text-slate-600">Previous Event: The Inaugural Chat on Digital Finance</div>
        </div>

        {/* Speaker and Moderator Info */}
        <div className="p-8 lg:p-12 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Speaker Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-blue-600 font-medium">Speaker</div>
                  <div className="font-bold text-slate-900">Paul Mwaura Ndichu</div>
                  <div className="text-sm text-slate-600">Cofounder Wapipay, Global Fintech Expert</div>
                </div>
              </div>
            </div>

            {/* Moderator Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-purple-600 font-medium">Moderator</div>
                  <div className="font-bold text-slate-900">Derrick Gakuu</div>
                  <div className="text-sm text-slate-600">Founder Siscom, Innovation Expert</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="p-8 lg:p-12 bg-slate-50">
          <h3 className="text-3xl font-bold text-slate-800 mb-4">
            A Look Back: The Inaugural Chat on Digital Finance
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Our first event brought together industry pioneers to discuss the future of digital finance in Africa. The sold-out session was filled with insightful keynotes, dynamic Q&A, and unparalleled networking opportunities that sparked vital collaborations.
          </p>
        </div>

        {/* Powered By Section */}
        <div className="bg-white px-8 lg:px-12 py-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-slate-600 font-medium">Powered by:</div>
            <div className="flex items-center gap-8">
              {/* Capital Club Logo */}
              <div className="h-8 w-24 flex items-center justify-center">
                <img
                  src="/images/club-capital.png"
                  alt="Capital Club"
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<span class="text-slate-700 font-semibold text-sm">CAPITAL CLUB</span>';
                    }
                  }}
                />
              </div>
              
              {/* Siscom Logo */}
              <div className="h-8 w-20 flex items-center justify-center">
                <img
                  src="/images/SISCOM vers 3-13.png"
                  alt="SISCOM"
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<span class="text-slate-700 font-semibold text-sm">SISCOM</span>';
                    }
                  }}
                />
              </div>
              
              {/* Wapipay Logo */}
              <div className="h-8 w-24 flex items-center justify-center">
                <img
                  src="/images/Wapi-Logo.jpg"
                  alt="Wapipay"
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<span class="text-slate-700 font-semibold text-sm">WAPIPAY</span>';
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


