import { useEffect, useState } from "react";
import { STATUSES, PRIORITIES } from "../utils/constants";
import CustomSelect from "./CustomSelect";

const inputClass = (hasError) =>
  `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
      : "border-ink-300 focus:border-brand-500 focus:ring-brand-200"
  }`;

export default function TaskFormModal({ task, onSubmit, onClose }) {
  const isEdit = Boolean(task);

  const [form, setForm] = useState({
    title: task?.title ?? "",
    description: task?.description ?? "",
    priority: task?.priority ?? "Medium",
    dueDate: task?.dueDate ?? "",
    status: task?.status ?? "Pending",
  });
  const [errors, setErrors] = useState({});

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // For text, textarea and date inputs (receives an event)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // For CustomSelect (receives a plain value, NOT an event)
  const handleSelect = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    const title = form.title.trim();
    if (!title) next.title = "Title is required.";
    else if (title.length > 100) next.title = "Title must be 100 characters or fewer.";
    if (!form.dueDate) next.dueDate = "Due date is required.";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink-900/60 p-0 sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-form-title"
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        onClick={(e) => e.stopPropagation()}
        className="max-h-[95vh] w-full max-w-lg space-y-4 overflow-y-auto rounded-t-2xl bg-white p-5 pb-40 shadow-xl sm:rounded-2xl sm:p-6 sm:pb-40"
      >
        <h2 id="task-form-title" className="text-lg font-semibold text-ink-900">
          {isEdit ? "Edit Task" : "Add New Task"}
        </h2>

        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-ink-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            autoFocus
            value={form.title}
            onChange={handleChange}
            className={inputClass(errors.title)}
            placeholder="What needs to be done?"
          />
          {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-medium text-ink-700">
            Description <span className="text-ink-400">(optional)</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            className={inputClass(false)}
            placeholder="Add more details..."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="priority" className="mb-1 block text-sm font-medium text-ink-700">
              Priority
            </label>
            <CustomSelect
              id="priority"
              value={form.priority}
              options={PRIORITIES}
              onChange={(v) => handleSelect("priority", v)}
            />
          </div>

          <div>
            <label htmlFor="status" className="mb-1 block text-sm font-medium text-ink-700">
              Status
            </label>
            <CustomSelect
              id="status"
              value={form.status}
              options={STATUSES}
              onChange={(v) => handleSelect("status", v)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="dueDate" className="mb-1 block text-sm font-medium text-ink-700">
            Due date <span className="text-red-500">*</span>
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
            className={inputClass(errors.dueDate)}
          />
          {errors.dueDate && <p className="mt-1 text-xs text-red-600">{errors.dueDate}</p>}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-ink-300 px-4 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            {isEdit ? "Save Changes" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}