import Link from "next/link";

export default function SidebarOrder() {
  return (
    <aside className="h-fit rounded-2xl bg-white shadow-lg border border-slate-200 p-8 sticky top-20 min-w-[420px]">
      <div className="text-4xl font-black text-blue-600 mb-2">KES 5,000</div>
      <div className="mt-4 text-sm text-slate-800">
        <div className="flex items-start gap-3">
          <svg className="h-5 w-5 text-blue-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <div>
            <div className="font-semibold text-slate-900">15th September 2025</div>
            <div className="text-slate-700">7:00 AM - 10:00 AM EAT</div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="font-semibold text-slate-900">General Admission</div>
        <p className="text-slate-700 text-sm">Includes breakfast & access to the event</p>
        <div className="mt-4 inline-flex items-center gap-4">
          <button className="h-10 w-10 rounded-full border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 text-lg font-semibold">-</button>
          <div className="w-8 text-center text-slate-900 font-semibold text-lg">1</div>
          <button className="h-10 w-10 rounded-full border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 text-lg font-semibold">+</button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-lg font-extrabold">
        <span className="text-slate-900">Total:</span>
        <span className="text-blue-600">KES 5,000</span>
      </div>

      <Link href="/checkout" className="group mt-6 block w-full rounded-2xl bg-blue-600 text-white text-center font-bold py-4 text-lg shadow-lg hover:bg-blue-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse-slow">
        <div className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5 group-hover:animate-spin group-hover:text-yellow-300 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="group-hover:tracking-wide transition-all duration-300">Proceed to Checkout</span>
        </div>
      </Link>
      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-600">
        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Your payment is secure and encrypted.
      </div>
    </aside>
  );
}


