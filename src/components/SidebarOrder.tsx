import Link from "next/link";

export default function SidebarOrder() {
  return (
    <aside className="h-fit rounded-2xl bg-[var(--surface)] shadow-md border border-[var(--border)] p-6 sticky top-20">
      <div className="text-3xl font-black text-blue-600">KES 5,000</div>
      <div className="mt-4 text-sm text-slate-700">
        <div className="flex items-start gap-3">
          <span className="mt-0.5">📅</span>
          <div>
            <div className="font-semibold">Mon, Sept 15, 2025</div>
            <div className="text-slate-500">7:30 AM - 10:00 AM EAT</div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="font-semibold">General Admission</div>
        <p className="text-slate-500 text-sm">Includes breakfast & access to the event</p>
        <div className="mt-4 inline-flex items-center gap-3">
          <button className="h-9 w-9 rounded-full border border-[var(--border)]">-</button>
          <div className="w-6 text-center">1</div>
          <button className="h-9 w-9 rounded-full border border-[var(--border)]">+</button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-lg font-extrabold">
        <span>Total:</span>
        <span className="text-red-500">KES 5,000</span>
      </div>

      <Link href="/checkout" className="mt-4 block w-full rounded-lg bg-blue-600 text-white text-center font-semibold py-3 shadow-lg hover:bg-blue-700">
        Proceed to Checkout
      </Link>
      <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">Your payment is secure and encrypted.</div>
    </aside>
  );
}


