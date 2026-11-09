import { useEffect, useRef, useState } from "react";

const SIZES = {
  md: "px-3 py-2 text-sm",
  sm: "px-2.5 py-1 text-xs",
};

export default function CustomSelect({
  id,
  value,
  options, // ["A", "B"] or [{ value, label }]
  onChange, // called with the new value
  ariaLabel,
  size = "md",
  openUp = false,
  hasError = false,
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef(null);

  const items = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o
  );
  const selectedIndex = items.findIndex((o) => o.value === value);
  const selected = items[selectedIndex];

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const choose = (item) => {
    onChange(item.value);
    setOpen(false);
  };

  const openMenu = () => {
    setActive(selectedIndex);
    setOpen(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && open) {
      e.stopPropagation(); // don't also close a parent modal
      setOpen(false);
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return openMenu();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + step + items.length) % items.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open && active >= 0) choose(items[active]);
      else openMenu();
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={handleKeyDown}
        className={`flex w-full items-center justify-between gap-2 rounded-lg border bg-white text-left text-ink-800 transition focus:outline-none focus:ring-2 ${
          SIZES[size]
        } ${
          hasError
            ? "border-red-400 focus:border-red-500 focus:ring-red-200"
            : "border-ink-300 focus:border-brand-500 focus:ring-brand-200"
        }`}
      >
        <span className="truncate">{selected ? selected.label : "Select..."}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-ink-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute left-0 z-30 max-h-60 w-full min-w-[9rem] overflow-y-auto rounded-xl border border-ink-700 bg-ink-800 p-1 shadow-xl ${
            openUp ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          {items.map((item, i) => {
            const isSelected = item.value === value;
            const isActive = i === active;
            return (
              <li
                key={item.value}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(item)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm ${
                  isSelected
                    ? "bg-brand-500 text-white"
                    : isActive
                    ? "bg-ink-700 text-white"
                    : "text-ink-100"
                }`}
              >
                <span className="truncate">{item.label}</span>
                {isSelected && <span aria-hidden="true">✓</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}