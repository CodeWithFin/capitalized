import Image from "next/image";

export default function Banner() {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
      <div className="relative aspect-[16/9] w-full">
        <Image
          src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1600&auto=format&fit=crop"
          alt="Event banner"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="px-4 py-3 border-t border-[var(--border)] text-xs text-slate-500 dark:text-slate-400">Powered by Capital Club, Siscom, AI Kenya, Lyrid</div>
    </div>
  );
}


