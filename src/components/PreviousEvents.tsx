export default function PreviousEvents() {
  return (
    <section id="previous" className="mt-16">
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">From Our Previous Events</h2>
      <article className="mt-6 rounded-2xl bg-[var(--surface)] shadow-sm border border-[var(--border)] p-5 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[var(--surface-2)]">
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop"
            alt="Previous event"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Africa in the Age of AI: How to Evolve and Win with AI</h3>
          <p className="mt-3 text-slate-600 dark:text-slate-300">An exclusive fireside breakfast featuring fintech and energy leaders exploring Africa's AI revolution.</p>
        </div>
      </article>
    </section>
  );
}


