import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-4xl px-6 py-3 flex items-center justify-between">
          <Link href="/" className="font-extrabold tracking-tight text-slate-900 dark:text-slate-100 text-xl">
            CAPITALIZED
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 grid grid-cols-1 md:grid-cols-[1fr_360px] gap-8">
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Checkout</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-300 text-sm">Enter your details to complete purchase.</p>

          <form className="mt-6 grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First name</label>
                <input className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm" placeholder="Jane" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last name</label>
                <input className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
              <input type="email" className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm" placeholder="you@example.com" />
            </div>
            <div className="grid grid-cols-[120px_1fr_1fr] gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Quantity</label>
                <input defaultValue={1} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Ticket</label>
                <input disabled value="General Admission" className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Price</label>
                <input disabled value="KES 5,000" className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 px-3 py-2 text-sm" />
              </div>
            </div>

            <button type="button" className="mt-2 inline-flex items-center justify-center rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold shadow hover:bg-blue-700">
              Pay Now
            </button>
          </form>
        </section>

        <aside className="h-fit rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <div className="text-lg font-semibold">Order Summary</div>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>General Admission x1</span>
              <span>KES 5,000</span>
            </div>
            <div className="flex items-center justify-between border-t pt-3 font-bold">
              <span>Total</span>
              <span className="text-red-500">KES 5,000</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Your payment is secure and encrypted.</p>
        </aside>
      </main>
    </div>
  );
}


