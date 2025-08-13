export default function InfoGrid() {
  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[{
        title: 'Date and Time',
        desc: 'Mon, September 15, 2025\n7:30 AM - 10:00 AM EAT'
      },{
        title: 'Location',
        desc: 'Capital Club\nWestlands, Nairobi, Kenya'
      },{
        title: 'Refund Policy',
        desc: 'No Refunds\nContact organizer to request a refund'
      },{
        title: 'Duration & Format',
        desc: '3 hours\nMobile eTicket'
      }].map((item) => (
        <div key={item.title} className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5 shadow-sm">
          <div className="text-[15px] font-bold text-slate-900 dark:text-slate-100">{item.title}</div>
          <div className="mt-2 whitespace-pre-line text-slate-600 dark:text-slate-300 text-sm leading-6">{item.desc}</div>
        </div>
      ))}
    </div>
  );
}


