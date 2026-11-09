export default function EmptyState({ icon, title, message, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center rounded-xl border-2 border-dashed border-ink-300 bg-white px-6 py-14 text-center">
      <div className="mb-3 text-5xl" aria-hidden="true">{icon}</div>
      <h3 className="text-lg font-semibold text-ink-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-ink-500">{message}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="mt-5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}