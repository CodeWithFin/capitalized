type Row = { time: string; activity: string };

const rows: Row[] = [
  { time: '7:00 AM', activity: 'Check-in + coffee, tea, juice' },
  { time: '7:30 AM', activity: 'Welcome Note (Capital Club & Siscom)' },
  { time: '7:45 AM', activity: 'Sponsor Highlight' },
  { time: '8:00 AM', activity: 'Fireside Chat with Eng. Peter Njenga' },
  { time: '8:45 AM', activity: 'Q&A Session' },
  { time: '9:00 AM', activity: 'Networking over Buffet Breakfast' },
  { time: '9:45 AM', activity: 'Optional Capital Club Tour' },
];

export default function Agenda() {
  return (
    <section id="agenda" className="mt-8">
      <h3 className="text-2xl font-extrabold text-slate-900">Event Agenda</h3>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-[140px_1fr] bg-blue-600 text-white text-sm font-semibold">
          <div className="px-4 py-3">TIME</div>
          <div className="px-4 py-3">ACTIVITY</div>
        </div>
        <div>
          {rows.map((r, i) => (
            <div key={r.time + i} className="grid grid-cols-[140px_1fr] text-sm">
              <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 text-slate-900 font-semibold">{r.time}</div>
              <div className="px-4 py-3 border-t border-slate-200 text-slate-800">{r.activity}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


