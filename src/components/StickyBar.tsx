import Link from "next/link";

export default function StickyBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <div className="text-sm text-slate-700 dark:text-slate-300"><span className="font-semibold mr-2">Total:</span><span className="text-red-500 font-extrabold">KES 5,000</span></div>
        <Link href="/checkout" className="group inline-flex items-center gap-2 rounded-2xl bg-blue-600 text-white px-6 py-3 text-base font-bold shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 animate-pulse-slow">
          <svg className="w-5 h-5 group-hover:animate-bounce transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          <span className="group-hover:animate-pulse">Pay Now!</span>
        </Link>
      </div>
    </div>
  );
}


