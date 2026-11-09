import { useEffect } from "react";

export default function ConfirmDialog({ title, message, confirmLabel = "Confirm", onConfirm, onCancel }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 p-4"
      onClick={onCancel}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2 id="confirm-title" className="text-lg font-semibold text-ink-900">{title}</h2>
        <p className="mt-2 break-words text-sm text-ink-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-ink-300 px-4 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}