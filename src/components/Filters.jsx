import { STATUSES, PRIORITIES } from "../utils/constants";
import CustomSelect from "./CustomSelect";
const selectClass =
    "w-full rounded-lg border border-ink-300 bg-white px-3 py-2 text-sm text-ink-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";

export default function Filters({ filters, onChange, onReset, hasActiveFilters }) {
    return (
        <section className="rounded-xl border border-ink-200 bg-white p-4 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="sm:col-span-2 lg:col-span-1">
                    <label htmlFor="search" className="mb-1 block text-xs font-medium text-ink-500">
                        Search by title
                    </label>
                    <input
                        id="search"
                        type="text"
                        value={filters.search}
                        onChange={(e) => onChange("search", e.target.value)}
                        placeholder="e.g. report"
                        className={selectClass}
                    />
                </div>

                <div>
                    <label htmlFor="status" className="mb-1 block text-xs font-medium text-ink-500">
                        Status
                    </label>
                    <CustomSelect
                        id="status"
                        value={filters.status}
                        onChange={(v) => onChange("status", v)}
                        options={[{ value: "All", label: "All statuses" }, ...STATUSES]}
                    />
                </div>
                <div>
                    <label htmlFor="priority" className="mb-1 block text-xs font-medium text-ink-500">
                        Priority
                    </label>
                    <CustomSelect
                        id="priority"
                        value={filters.priority}
                        onChange={(v) => onChange("priority", v)}
                        options={[{ value: "All", label: "All priorities" }, ...PRIORITIES]}
                    />
                </div>
                <div>
                    <label htmlFor="sort" className="mb-1 block text-xs font-medium text-ink-500">
                        Sort by due date
                    </label>
                    <CustomSelect
                        id="sort"
                        value={filters.sort}
                        onChange={(v) => onChange("sort", v)}
                        options={[
                            { value: "asc", label: "Earliest first" },
                            { value: "desc", label: "Latest first" },
                        ]}
                    />
                </div>


            </div>

            {hasActiveFilters && (
                <button
                    onClick={onReset}
                    className="mt-3 text-sm font-medium text-brand-600 hover:text-brand-800"
                >
                    Clear all filters
                </button>
            )}
        </section>
    );
}