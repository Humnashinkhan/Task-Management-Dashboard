import { useMemo, useState } from "react";
import useTasks from "./hooks/useTasks";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import Filters from "./components/Filters";
import TaskList from "./components/TaskList";
import TaskFormModal from "./components/TaskFormModal";
import ConfirmDialog from "./components/ConfirmDialog";

const INITIAL_FILTERS = { search: "", status: "All", priority: "All", sort: "asc" };

export default function App() {
  const { tasks, counts, addTask, updateTask, deleteTask } = useTasks();

  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  // Search + status + priority + sort all work together
  const visibleTasks = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return tasks
      .filter((t) => (q ? t.title.toLowerCase().includes(q) : true))
      .filter((t) => (filters.status === "All" ? true : t.status === filters.status))
      .filter((t) => (filters.priority === "All" ? true : t.priority === filters.priority))
      .sort((a, b) =>
        filters.sort === "asc"
          ? a.dueDate.localeCompare(b.dueDate)
          : b.dueDate.localeCompare(a.dueDate)
      );
  }, [tasks, filters]);

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.status !== "All" ||
    filters.priority !== "All";

  const openCreate = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleSubmit = (data) => {
    if (editingTask) updateTask(editingTask.id, data);
    else addTask(data);
    setFormOpen(false);
    setEditingTask(null);
  };

  const confirmDelete = () => {
    if (taskToDelete) deleteTask(taskToDelete.id);
    setTaskToDelete(null);
  };

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeStatus={filters.status}
        onSelectStatus={(s) => {
          updateFilter("status", s);
          setSidebarOpen(false);
        }}
        counts={counts}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} onAddClick={openCreate} />

        <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 p-4 sm:p-6">
          <SummaryCards counts={counts} />

          <Filters
            filters={filters}
            onChange={updateFilter}
            onReset={() => setFilters(INITIAL_FILTERS)}
            hasActiveFilters={hasActiveFilters}
          />

          <TaskList
            tasks={visibleTasks}
            totalTasks={tasks.length}
            hasActiveFilters={hasActiveFilters}
            onAdd={openCreate}
            onEdit={openEdit}
            onDelete={setTaskToDelete}
            onStatusChange={(id, status) => updateTask(id, { status })}
            onResetFilters={() => setFilters(INITIAL_FILTERS)}
          />
        </main>
      </div>

      {formOpen && (
        <TaskFormModal
          task={editingTask}
          onSubmit={handleSubmit}
          onClose={() => {
            setFormOpen(false);
            setEditingTask(null);
          }}
        />
      )}

      {taskToDelete && (
        <ConfirmDialog
          title="Delete task?"
          message={`"${taskToDelete.title}" will be permanently removed. This can't be undone.`}
          confirmLabel="Delete"
          onConfirm={confirmDelete}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </div>
  );
}