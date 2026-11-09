import { useEffect } from "react";

const NAV = [
  { label: "All Tasks", value: "All", countKey: "total" },
  { label: "Pending", value: "Pending", countKey: "pending" },
  { label: "In Progress", value: "In Progress", countKey: "inProgress" },
  { label: "Completed", value: "Completed", countKey: "completed" },
];

export default function Sidebar({ open, onClose, activeStatus, onSelectStatus, counts }) {
  // Escape closes the drawer + lock page scroll while it is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // If the screen grows to desktop size, reset the drawer state
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => e.matches && onClose();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [onClose]);

  return (
    <>
      {/* Mobile backdrop: tapping outside also closes the drawer */}
      {open && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="fixed inset-0 z-40 cursor-default bg-ink-900/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-64 flex-col bg-ink-900 text-ink-100 transition-all duration-200 lg:static lg:h-auto lg:shrink-0 lg:visible lg:translate-x-0 ${
          open ? "visible translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-5">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
              ✓
            </span>
            TaskFlow
          </div>

          {/* Close button: large tap area, SVG icon, mobile only */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-ink-300 hover:bg-ink-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-400 lg:hidden"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-ink-400">
            Views
          </p>
          {NAV.map((item) => {
            const active = activeStatus === item.value;
            return (
              <button
                type="button"
                key={item.value}
                onClick={() => onSelectStatus(item.value)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-brand-600 text-white"
                    : "text-ink-200 hover:bg-ink-800"
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    active ? "bg-white/20" : "bg-ink-800"
                  }`}
                >
                  {counts[item.countKey]}
                </span>
              </button>
            );
          })}
        </nav>

        <p className="shrink-0 px-5 py-4 text-xs text-ink-400">Data is saved in your browser.</p>
      </aside>
    </>
  );
}