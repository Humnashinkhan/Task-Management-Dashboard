import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";

export default function TaskList({
  tasks,
  totalTasks,
  hasActiveFilters,
  onAdd,
  onEdit,
  onDelete,
  onStatusChange,
  onResetFilters,
}) {
  // Case 1: no tasks exist at all
  if (totalTasks === 0) {
    return (
      <EmptyState
        icon="📝"
        title="No tasks yet"
        message="Create your first task to start tracking your work."
        actionLabel="+ Add your first task"
        onAction={onAdd}
      />
    );
  }

  // Case 2: tasks exist, but filters hide them all
  if (tasks.length === 0 && hasActiveFilters) {
    return (
      <EmptyState
        icon="🔍"
        title="No matching tasks"
        message="No tasks match your current search or filters. Try changing or clearing them."
        actionLabel="Clear filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <section aria-label="Task list">
      <p className="mb-3 text-sm text-ink-500">
        Showing {tasks.length} of {totalTasks} task{totalTasks !== 1 && "s"}
      </p>
      <ul className="grid gap-4 md:grid-cols-2">
        {tasks.map((task) => (
          <li key={task.id} className="min-w-0">
            <TaskCard
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}