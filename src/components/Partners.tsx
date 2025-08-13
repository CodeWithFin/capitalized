export default function Partners() {
  const logos = [
    { name: 'AI Kenya', url: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=800&auto=format&fit=crop' },
    { name: 'Wapipay', url: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=800&auto=format&fit=crop' },
    { name: 'Capital Club', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop' },
    { name: 'Lyrid', url: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=800&auto=format&fit=crop' },
    { name: 'SISCOM', url: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=800&auto=format&fit=crop' },
    { name: 'Angani', url: 'https://images.unsplash.com/photo-1551281044-8f8d42923184?q=80&w=800&auto=format&fit=crop' },
  ];
  return (
    <section id="partners" className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-10">
      <h3 className="text-center text-2xl font-extrabold text-slate-900 dark:text-slate-100">Our Trusted Partners</h3>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
        {logos.map((l) => (
          <div key={l.name} className="relative h-10 w-28 overflow-hidden rounded bg-slate-100 dark:bg-slate-800">
            <img src={l.url} alt={l.name} className="h-full w-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}


