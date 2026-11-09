export default function Header({ onMenuClick, onAddClick }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-ink-200 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-ink-600 hover:bg-ink-100 lg:hidden"
          aria-label="Open menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-semibold text-ink-900 sm:text-xl">Dashboard</h1>
          <p className="hidden text-xs text-ink-500 sm:block">Manage and track your tasks</p>
        </div>
      </div>

      <button
        onClick={onAddClick}
        className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
      >
        + Add Task
      </button>
    </header>
  );
}