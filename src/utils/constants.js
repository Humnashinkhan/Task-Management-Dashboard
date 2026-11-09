export const STATUSES = ["Pending", "In Progress", "Completed"];
export const PRIORITIES = ["Low", "Medium", "High"];
export const STORAGE_KEY = "task-dashboard:tasks";

export const STATUS_STYLES = {
  Pending: "bg-honey-100 text-honey-800",
  "In Progress": "bg-lagoon-100 text-lagoon-800",
  Completed: "bg-moss-100 text-moss-800",
};

export const PRIORITY_STYLES = {
  Low: "bg-ink-100 text-ink-700",
  Medium: "bg-plum-100 text-plum-800",
  High: "bg-red-100 text-red-800",
};

export const todayString = () => {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

// "2026-11-09" -> "9 Nov 2026" (parsed manually to avoid timezone shifts)
export const formatDate = (iso) => {
  const [y, m, d] = String(iso).split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};