# Task Management Dashboard

A clean, responsive task management dashboard built with **React**, **Vite** and **Tailwind CSS**. Users can create, edit, search, filter, sort and delete tasks. All data is stored in the browser's LocalStorage, so no backend is needed.

**Live demo:** https://task-management-dashboard-five-gamma.vercel.app/

**Repository:** https://github.com/Humnashinkhan/Task-Management-Dashboard

---

## Features

- Create, view, edit and delete tasks
- Task fields: title (required), description (optional), priority (Low / Medium / High), due date (required), status (Pending / In Progress / Completed)
- Summary cards for Total, Pending, In Progress and Completed tasks, updated instantly
- Search by title
- Filter by status and priority
- Sort by due date (earliest first or latest first)
- Search, filters and sort all work together
- Quick status change directly from a task card
- Overdue label for unfinished tasks past their due date
- Form validation with clear error messages (title and due date are required)
- Confirmation dialog before deleting a task
- Persistence with LocalStorage, safe against missing, empty or corrupt data
- Two different empty states: "No tasks yet" and "No matching tasks" (when filters return nothing)
- Fully responsive: the sidebar becomes a slide-in drawer on mobile, with no horizontal overflow
- Custom accessible dropdown (keyboard support: arrow keys, Enter, Escape)

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18+ (functional components and hooks) | UI |
| Vite | Dev server and build tool |
| Tailwind CSS v4 (`@tailwindcss/vite`) | Styling, with a custom colour palette defined in `@theme` |

---

## Getting Started

### Prerequisites
- Node.js 18 or newer
- npm

### Installation

```bash
git clone <your-github-repo-link>
cd task-dashboard
npm install
```

### Run in development

```bash
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

### Production build

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── main.jsx                  # App entry point
├── index.css                 # Tailwind import, theme colours, fonts
├── App.jsx                   # Page layout, filter state, modal state
├── utils/
│   ├── constants.js          # Statuses, priorities, badge styles, date helpers
│   └── storage.js            # Safe LocalStorage load/save and data sanitising
├── hooks/
│   └── useTasks.js           # Task state, CRUD actions, derived counts, persistence
└── components/
    ├── Sidebar.jsx           # Navigation (drawer on mobile)
    ├── Header.jsx            # Top bar with "Add Task" button
    ├── SummaryCards.jsx      # Total / Pending / In Progress / Completed
    ├── Filters.jsx           # Search, status, priority and sort controls
    ├── TaskList.jsx          # List and the two empty states
    ├── TaskCard.jsx          # Single task card
    ├── TaskFormModal.jsx     # Create / edit form with validation
    ├── ConfirmDialog.jsx     # Delete confirmation
    ├── CustomSelect.jsx      # Reusable styled dropdown
    └── EmptyState.jsx        # Reusable empty-state block
```

---

## Key Code Decisions

- **Derived counts.** The summary counts are calculated from the `tasks` array with `useMemo`, instead of being stored separately. They can never go out of sync, and they update immediately when a status changes or a task is deleted.
- **Single filter pipeline.** Search, status filter, priority filter and sort run in one `useMemo` chain in `App.jsx`, so every control combines with the others (for example "report" + Pending + High).
- **Safe persistence.** `storage.js` wraps all LocalStorage access in `try/catch`, validates the parsed data, and repairs or discards bad entries. Corrupt JSON, a wrong data type or blocked storage returns an empty list instead of crashing the app.
- **Custom hook.** `useTasks` keeps all task logic (add, update, delete, save) in one place, so the UI components stay simple and reusable.
- **Date handling.** Due dates are stored as `YYYY-MM-DD` strings. They sort correctly as text and avoid timezone shifts that happen with `Date` objects.
- **Reusable components.** `CustomSelect` and `EmptyState` are used in several places. A native `<select>` menu can't be fully styled, so `CustomSelect` provides a themed, keyboard-accessible alternative.
- **Responsive layout.** The main area uses `min-w-0` and `overflow-x-hidden` so long titles and content never cause horizontal scrolling. Long text uses `break-words`.

---

## Edge Cases Handled

| Case | Behaviour |
|---|---|
| Submit without title or due date | Blocked, with an inline error message |
| Title longer than 100 characters | Blocked, with an error message |
| Search + status + priority together | Work together in one filter pipeline |
| Delete or status change | Counts update immediately |
| Missing, empty or invalid LocalStorage data | App loads with an empty list |
| No tasks at all | "No tasks yet" with an Add button |
| Filters return no results | "No matching tasks" with a Clear filters button |

### How to test the corrupt-data case
1. Open DevTools → Application → Local Storage.
2. Set the key `task-dashboard:tasks` to `{bad json`.
3. Refresh. The app should load with an empty list and no errors.

---

## Deployment

The app is deployed on Vercel / Netlify with the default Vite settings:

- Build command: `npm run build`
- Output directory: `dist`

---

## Possible Future Improvements

- Drag and drop between status columns
- Due date reminders
- Export and import tasks as JSON
- Unit tests with Vitest and React Testing Library

---

## Author

**HUMNASHIN KHAN**
humnashin9955@gmail.com · 
