import { STORAGE_KEY, STATUSES, PRIORITIES } from "./constants";

// Keep only well-formed tasks; repair minor problems instead of crashing.
const sanitize = (item) => {
  if (!item || typeof item !== "object") return null;
  const title = typeof item.title === "string" ? item.title.trim() : "";
  const dueDate = typeof item.dueDate === "string" ? item.dueDate : "";
  if (!title || !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) return null;

  return {
    id: typeof item.id === "string" && item.id ? item.id : makeId(),
    title,
    description: typeof item.description === "string" ? item.description : "",
    priority: PRIORITIES.includes(item.priority) ? item.priority : "Medium",
    status: STATUSES.includes(item.status) ? item.status : "Pending",
    dueDate,
    createdAt: typeof item.createdAt === "number" ? item.createdAt : Date.now(),
  };
};

export const makeId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const loadTasks = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(sanitize).filter(Boolean);
  } catch {
    return []; // corrupt JSON, blocked storage, etc.
  }
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // storage full or unavailable: app keeps working in memory
  }
};