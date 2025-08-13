'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function Page() {
  const [qty, setQty] = useState(1);
  const price = 5000;
  const total = useMemo(() => qty * price, [qty]);

  return (
    <main>
      <SiteHeader />

      <section className="container-xl mt-8 grid items-start gap-8 md:mt-14 md:grid-cols-[1fr,420px]">
        <Hero />
        <div className="md:sticky md:top-24"><CheckoutCard qty={qty} onQty={setQty} total={total} price={price} /></div>
      </section>

      <section className="container-xl mt-10 grid gap-8 md:grid-cols-[1fr,420px]">
        <WhyAttend />
        <DetailsCard />
      </section>

      <section className="container-xl mt-10">
        <AgendaTable />
      </section>

      <section className="container-xl mt-16">
        <Partners />
      </section>

      <section className="container-xl mt-16">
        <PreviousEvents />
      </section>

      <StickyCheckout total={total} />
    </main>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 py-3 backdrop-blur">
      <div className="container-xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-7 w-40">
            <Image src="https://dummyimage.com/200x40/0b1220/ffffff&text=CAPITALIZED" alt="Capitalized" fill className="object-contain" />
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <div className="hero-bg rounded-3xl p-6 md:p-10">
      <div className="space-y-2">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">The Capitalized Fireside Breakfast Chat</h1>
        <p className="text-2xl text-slate-700">Africa in the Age of AI · How to evolve and win with AI</p>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl shadow-card">
        <Image src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop" alt="Event banner" width={1400} height={800} className="h-auto w-full" />
        <div className="glass flex items-center justify-between px-6 py-4 text-sm text-slate-700">
          <div className="flex items-center gap-4">
            <span>Powered by:</span>
            <span>Capital Club EA</span>
            <span>Siscom</span>
            <span>AI Kenya</span>
            <span>Lyrid</span>
            <span>Angani</span>
          </div>
          <span className="text-slate-400">&nbsp;</span>
        </div>
      </div>
    </div>
  );
}

function DetailsCard() {
  return (
    <div className="card p-6">
      <div className="text-4xl font-extrabold text-brand-blue">KES 5,000</div>
      <div className="mt-4 space-y-6 text-slate-700">
        <DetailRow icon="calendar" title="Fri, August 1, 2025" subtitle="7:30 AM - 10:00 AM EAT" />
        <DetailRow icon="pin" title="Capital Club" subtitle="Westlands, Nairobi, Kenya" />
        <DetailRow icon="refresh" title="Refund Policy" subtitle="No Refunds · Contact organizer to request a refund" />
        <DetailRow icon="time" title="Duration & Format" subtitle="2 hours 30 minutes · Mobile eTicket" />
      </div>
    </div>
  );
}

function DetailRow({ icon, title, subtitle }: { icon: 'calendar' | 'pin' | 'refresh' | 'time'; title: string; subtitle: string }) {
  const iconMap: Record<string, string> = {
    calendar: 'https://cdn.jsdelivr.net/gh/tabler/tabler-icons/icons/calendar-event.svg',
    pin: 'https://cdn.jsdelivr.net/gh/tabler/tabler-icons/icons/map-pin.svg',
    refresh: 'https://cdn.jsdelivr.net/gh/tabler/tabler-icons/icons/refresh.svg',
    time: 'https://cdn.jsdelivr.net/gh/tabler/tabler-icons/icons/clock.svg',
  };
  return (
    <div className="flex items-start gap-3">
      <span className="icon-badge mt-0.5">
        <Image src={iconMap[icon]} alt="" width={18} height={18} />
      </span>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-slate-600">{subtitle}</div>
      </div>
    </div>
  );
}

function WhyAttend() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <InfoCard title="Date and Time" value="Fri, August 1, 2025" meta="7:30 AM - 10:00 AM EAT" />
        <InfoCard title="Location" value="Capital Club" meta="Westlands, Nairobi" />
        <InfoCard title="Refund Policy" value="No Refunds" meta="Contact organizer for refund" />
        <InfoCard title="Duration & Format" value="2h 30m" meta="Mobile eTicket" />
      </div>

      <div>
        <h3 className="mb-4 text-2xl font-bold">About this event</h3>
        <p className="max-w-3xl text-slate-700">
          CAPITALIZED 2.0 invites you to an exclusive, closed-door fireside breakfast exploring how Africa can lead, shape, and thrive in the era of Artificial Intelligence. Hosted at Capital Club Nairobi and powered by Siscom, this intimate 30-person gathering will bring together C-Suite leaders, investors, industrialists, founders, and policymakers for a bold, honest conversation on AI, innovation, and Africa's digital future.
        </p>
      </div>

      <div>
        <h3 className="mb-3 text-xl font-bold">Featured Speaker</h3>
        <p className="text-slate-700"><strong>Juliana Rotich</strong> – CEO, Fintech Leader, Technology Entrepreneur & Advisor. A globally recognized fintech leader, technology entrepreneur, and board advisor, Juliana Rotich brings decades of experience in building, scaling, and guiding transformative tech ventures across Africa and global markets.</p>
      </div>

      <div>
        <h3 className="mb-3 text-xl font-bold">Moderator</h3>
        <p className="text-slate-700"><strong>Derrick Gakuu</strong> – Co-Founder, Siscom. With a career spanning Safaricom, Payless, and now Siscom, Derrick is a bold strategist and ecosystem builder shaping Africa’s innovation and digital infrastructure space.</p>
      </div>

      <div>
        <h3 className="mb-3 text-xl font-bold">Why Attend</h3>
        <ul className="space-y-3 text-slate-700">
          <li>Gain rare, real-world insights on Africa’s emerging AI opportunity — from fintech to frontier tech.</li>
          <li>Engage in candid discussions with founders, corporates, investors, and public sector leaders.</li>
          <li>Practical lessons on why Africa must lead in the AI revolution and build high-performance innovation ecosystems.</li>
          <li>Network with a curated audience of decision-makers and disruptors.</li>
        </ul>
      </div>
    </div>
  );
}

function InfoCard({ title, value, meta }: { title: string; value: string; meta: string }) {
  return (
    <div className="card p-5">
      <div className="text-sm font-semibold text-slate-500">{title}</div>
      <div className="text-lg font-bold">{value}</div>
      <div className="text-sm text-slate-600">{meta}</div>
    </div>
  );
}

function AgendaTable() {
  const rows = [
    ['7:00 AM', 'Check-in + coffee, tea, juice'],
    ['7:30 AM', 'Welcome Note (Capital Club & Siscom)'],
    ['7:45 AM', 'Sponsor Highlight'],
    ['8:00 AM', 'Fireside Chat with Juliana Rotich'],
    ['8:45 AM', 'Q&A Session'],
    ['9:00 AM', 'Networking over Buffet Breakfast'],
    ['9:45 AM', 'Optional Capital Club Tour'],
  ];
  return (
    <div>
      <h3 className="mb-4 text-xl font-bold">Event Agenda</h3>
      <table className="agenda">
        <thead>
          <tr>
            <th className="w-40">Time</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([time, activity]) => (
            <tr key={time}>
              <td className="font-medium">{time}</td>
              <td>{activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Partners() {
  const partners = ['AI Kenya', 'Wapi', 'Capital Club EA', 'Lyrid', 'Siscom', 'Angani'];
  return (
    <div className="card py-8">
      <h3 className="section-title">Our Trusted Partners</h3>
      <div className="section-title-underline" />
      <div className="container-xl grid grid-cols-2 place-items-center gap-x-10 gap-y-6 md:grid-cols-6">
        {partners.map((p) => (
          <div key={p} className="text-sm font-semibold text-slate-600">
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviousEvents() {
  return (
    <div className="space-y-8">
      <h3 className="section-title">From Our Previous Event</h3>
      <div className="section-title-underline" />
      <div className="card grid gap-6 p-6 md:grid-cols-[360px,1fr]">
        <Image src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1280&auto=format&fit=crop" alt="Previous event" width={720} height={480} className="h-auto w-full rounded-xl" />
        <div className="self-center">
          <h4 className="text-2xl font-extrabold">A Look Back: The Inaugural Chat on Digital Finance</h4>
          <p className="mt-3 max-w-2xl text-slate-700">Our first event brought together industry pioneers to discuss the future of digital finance in Africa. The sold-out session was filled with insightful keynotes, dynamic Q&A, and unparalleled networking opportunities that sparked vital collaborations.</p>
        </div>
      </div>
    </div>
  );
}

function CheckoutCard({ qty, onQty, total, price }: { qty: number; onQty: (n: number) => void; total: number; price: number }) {
  return (
    <div className="ticket p-6">
      <div className="text-4xl font-extrabold text-brand-blue">KES {price.toLocaleString()}</div>
      <div className="mt-6 space-y-6">
        <div>
          <div className="text-sm font-semibold text-slate-500">Fri, July 4, 2025</div>
          <div className="text-sm text-slate-600">7:30 AM - 10:00 AM EAT</div>
        </div>
        <div>
          <div className="mb-2 text-sm font-semibold">General Admission</div>
          <div className="flex items-center gap-3">
            <button aria-label="decrement" onClick={() => onQty(Math.max(1, qty - 1))} className="btn-outline h-8 w-8 rounded-full p-0">−</button>
            <div className="w-8 text-center font-semibold">{qty}</div>
            <button aria-label="increment" onClick={() => onQty(qty + 1)} className="btn-outline h-8 w-8 rounded-full p-0">+</button>
          </div>
          <div className="mt-1 text-xs text-slate-500">Includes breakfast & access to the event</div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-2xl font-extrabold text-brand-blue">KES {total.toLocaleString()}</span>
        </div>
        <Link href={`/checkout?qty=${qty}&price=${price}`} className="btn-primary w-full">Proceed to Checkout</Link>
        <p className="text-center text-xs text-slate-500">Your payment is secure and encrypted.</p>
      </div>
    </div>
  );
}

function StickyCheckout({ total }: { total: number }) {
  return (
    <div className="sticky-checkout">
      <div className="container-xl flex items-center justify-between py-3">
        <div className="text-lg font-semibold">
          Total: <span className="text-brand-blue">KES {total.toLocaleString()}</span>
        </div>
        <Link href={`/checkout?qty=1&price=5000`} className="btn-primary">Pay Now!</Link>
      </div>
    </div>
  );
}


