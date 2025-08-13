export default function WhyAttend() {
  const bullets = [
    'Unpack how sustainable energy is the backbone of Africa\'s AI infrastructure.',
    'Gain insights on partnerships between energy providers, tech innovators, and policy leaders.',
    'Learn strategies to bridge the energy gap for AI-driven economic transformation.',
    'Connect with a curated audience shaping Africa\'s tech–energy nexus.',
  ];
  return (
    <section id="why" className="mt-12">
      <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Why Attend</h2>
      <ul className="mt-4 space-y-3">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
            <span className="text-blue-600 dark:text-blue-400">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}


