import Link from "next/link";

export default function StickyBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <div className="text-sm text-slate-700 dark:text-slate-300"><span className="font-semibold mr-2">Total:</span><span className="text-red-500 font-extrabold">KES 5,000</span></div>
        <Link href="/checkout" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-blue-700">
          Pay Now!
        </Link>
      </div>
    </div>
  );
}


