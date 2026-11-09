import {
    STATUSES,
    STATUS_STYLES,
    PRIORITY_STYLES,
    formatDate,
    todayString,
} from "../utils/constants";
import CustomSelect from "./CustomSelect";

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
    const overdue = task.status !== "Completed" && task.dueDate < todayString();

    return (
        <article className="flex h-full flex-col rounded-xl border border-ink-200 bg-white p-4 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <h3
                    className={`min-w-0 break-words text-base font-semibold ${task.status === "Completed" ? "text-ink-400 line-through" : "text-ink-900"
                        }`}
                >
                    {task.title}
                </h3>
                <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${PRIORITY_STYLES[task.priority]}`}
                >
                    {task.priority}
                </span>
            </div>

            {task.description && (
                <p className="mt-2 line-clamp-3 break-words text-sm text-ink-600">
                    {task.description}
                </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className={`rounded-full px-2.5 py-0.5 font-medium ${STATUS_STYLES[task.status]}`}>
                    {task.status}
                </span>
                <span className={overdue ? "font-medium text-red-600" : "text-ink-500"}>
                    📅 {formatDate(task.dueDate)}
                    {overdue && " · Overdue"}
                </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-ink-100 pt-3">
                {/* <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          aria-label={`Change status of ${task.title}`}
          className="rounded-lg border border-ink-300 bg-white px-2 py-1 text-xs focus:border-brand-500 focus:outline-none"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select> */}
                <div className="w-36">
                    <CustomSelect
                        size="sm"
                        openUp
                        value={task.status}
                        onChange={(v) => onStatusChange(task.id, v)}
                        options={STATUSES}
                        ariaLabel={`Change status of ${task.title}`}
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="rounded-lg px-3 py-1 text-xs font-medium text-brand-600 hover:bg-brand-50"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(task)}
                        className="rounded-lg px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </article>
    );
}