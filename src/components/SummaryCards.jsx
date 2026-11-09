const CARDS = [
  { key: "total", label: "Total", color: "text-ink-900", bar: "bg-ink-400" },
  { key: "pending", label: "Pending", color: "text-honey-600", bar: "bg-honey-400" },
  { key: "inProgress", label: "In Progress", color: "text-lagoon-600", bar: "bg-lagoon-500" },
  { key: "completed", label: "Completed", color: "text-moss-600", bar: "bg-moss-500" },
];

export default function SummaryCards({ counts }) {
  return (
    <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" aria-label="Task summary">
      {CARDS.map((c) => (
        <div
          key={c.key}
          className="relative overflow-hidden rounded-xl border border-ink-200 bg-white p-4 shadow-sm"
        >
          <span className={`absolute inset-x-0 top-0 h-1 ${c.bar}`} />
          <p className="text-sm text-ink-500">{c.label}</p>
          <p className={`mt-1 text-3xl font-bold ${c.color}`}>{counts[c.key]}</p>
        </div>
      ))}
    </section>
  );
}