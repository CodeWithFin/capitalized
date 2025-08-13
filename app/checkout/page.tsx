'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type SearchParams = { qty?: string; price?: string };

export default function CheckoutPage({ searchParams }: { searchParams: SearchParams }) {
  const initialQty = Number(searchParams.qty ?? '1') || 1;
  const price = Number(searchParams.price ?? '5000') || 5000;
  const [qty, setQty] = useState(initialQty);
  const total = useMemo(() => qty * price, [qty, price]);

  return (
    <main>
      <Header />

      <section className="container-xl mt-8 grid gap-8 md:mt-12 md:grid-cols-[1fr,420px]">
        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold md:text-4xl">Checkout</h1>

          <div className="card p-6">
            <h2 className="mb-4 text-xl font-bold">Attendee Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField id="fullName" label="Full name" placeholder="Jane Doe" />
              <TextField id="email" label="Email" placeholder="jane@company.com" type="email" />
              <TextField id="phone" label="Phone" placeholder="+254 7xx xxx xxx" />
              <TextField id="company" label="Company" placeholder="Your company" />
            </div>
          </div>

          <div className="card p-6">
            <h2 className="mb-4 text-xl font-bold">Tickets</h2>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">General Admission</div>
                <div className="text-sm text-slate-600">Includes breakfast & access to the event</div>
              </div>
              <div className="flex items-center gap-3">
                <button className="btn-outline h-9 w-9 rounded-full p-0" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <div className="w-8 text-center font-semibold">{qty}</div>
                <button className="btn-outline h-9 w-9 rounded-full p-0" onClick={() => setQty(qty + 1)}>+</button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link href="/" className="btn-outline">← Back</Link>
          </div>
        </div>

        <aside className="md:sticky md:top-24">
          <div className="card p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-12 w-20">
                <Image src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop" alt="Event" fill className="rounded object-cover" />
              </div>
              <div>
                <div className="text-sm font-semibold">The Capitalized Fireside Breakfast Chat</div>
                <div className="text-xs text-slate-600">Fri, July 4, 2025 · 7:30 AM – 10:00 AM</div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Ticket price</span><span>KES {price.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Quantity</span><span>{qty}</span></div>
              <div className="flex justify-between font-semibold"><span>Total</span><span className="text-brand-blue">KES {total.toLocaleString()}</span></div>
            </div>

            <button className="btn-primary mt-6 w-full">Pay Now</button>
            <p className="mt-2 text-center text-xs text-slate-500">Your payment is secure and encrypted.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 py-3 backdrop-blur">
      <div className="container-xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-7 w-40">
            <Image src="https://dummyimage.com/200x40/0b1220/ffffff&text=CAPITALIZED" alt="Capitalized" fill className="object-contain" />
          </div>
        </Link>
      </div>
    </header>
  );
}

function TextField({ id, label, type = 'text', placeholder }: { id: string; label: string; type?: string; placeholder?: string }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-slate-600">{label}</span>
      <input id={id} name={id} type={type} placeholder={placeholder} className="rounded-2xl border border-slate-300 px-3 py-2 outline-none ring-brand-blue/20 focus:ring-4" />
    </label>
  );
}


