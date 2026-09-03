import * as React from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { cn } from "../../lib/utils";

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});
const displayFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const toInputDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const parseInputDate = (value) => {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const getCalendarDays = (visibleMonth) => {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);

  startDate.setDate(firstDay.getDate() - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    return date;
  });
};

const DateInput = React.forwardRef(
  (
    {
      className,
      buttonClassName,
      iconClassName,
      error,
      value = "",
      onChange,
      name,
      required,
      disabled,
      placeholder = "Select date",
      label = "Select date",
      ...props
    },
    ref,
  ) => {
    const selectedDate = parseInputDate(value);
    const [open, setOpen] = React.useState(false);
    const [visibleMonth, setVisibleMonth] = React.useState(
      selectedDate || new Date(),
    );

    React.useEffect(() => {
      if (selectedDate) setVisibleMonth(selectedDate);
    }, [value]);

    const calendarDays = React.useMemo(
      () => getCalendarDays(visibleMonth),
      [visibleMonth],
    );

    const commitDate = (date) => {
      const nextValue = toInputDate(date);
      const event = {
        target: { value: nextValue, name },
        currentTarget: { value: nextValue, name },
      };

      onChange?.(event);
      setOpen(false);
    };

    const moveMonth = (amount) => {
      setVisibleMonth(
        new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + amount, 1),
      );
    };

    const displayValue = selectedDate
      ? displayFormatter.format(selectedDate)
      : placeholder;

    return (
      <div className={cn("w-full", className)}>
        <input
          ref={ref}
          type="hidden"
          name={name}
          value={value}
          required={required}
          {...props}
        />

        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen(true)}
          className={cn(
            "flex h-11 w-full items-center justify-between gap-3 rounded-lg border bg-slate-50 px-3 text-left text-sm outline-none transition",
            error
              ? "border-red-500 focus-visible:ring-red-100"
              : "border-slate-200 hover:border-green-300 focus-visible:ring-green-100",
            "focus-visible:bg-white focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
            buttonClassName,
          )}
        >
          <span
            className={cn(
              "min-w-0 truncate font-semibold",
              selectedDate ? "text-slate-800" : "text-slate-400",
            )}
          >
            {displayValue}
          </span>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-white text-green-700 shadow-sm">
            <CalendarDays className={cn("h-4 w-4", iconClassName)} />
          </span>
        </button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-2xl [&>button]:text-white [&>button]:opacity-90 [&>button]:hover:bg-white/10 [&>button]:hover:opacity-100 [&>button]:focus:ring-white/50">
            <DialogHeader className="bg-[#285448] px-5 py-4 text-left text-white">
              <DialogTitle className="flex items-center gap-2 text-lg">
                <CalendarDays className="h-5 w-5" />
                {label}
              </DialogTitle>
              <DialogDescription className="text-green-50/80">
                Choose a date from the calendar.
              </DialogDescription>
            </DialogHeader>

            <div className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => moveMonth(-1)}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-green-50 hover:text-green-700"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <p className="text-base font-bold text-slate-900">
                  {monthFormatter.format(visibleMonth)}
                </p>
                <button
                  type="button"
                  onClick={() => moveMonth(1)}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-green-50 hover:text-green-700"
                  aria-label="Next month"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400">
                {dayLabels.map((day) => (
                  <div key={day} className="py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="mt-1 grid grid-cols-7 gap-1">
                {calendarDays.map((date) => {
                  const dateValue = toInputDate(date);
                  const selected = dateValue === value;
                  const muted = date.getMonth() !== visibleMonth.getMonth();

                  return (
                    <button
                      key={dateValue}
                      type="button"
                      onClick={() => commitDate(date)}
                      className={cn(
                        "grid h-10 place-items-center rounded-lg text-sm font-semibold transition",
                        selected
                          ? "bg-green-700 text-white shadow-md shadow-green-900/20"
                          : "text-slate-700 hover:bg-green-50 hover:text-green-800",
                        muted && !selected && "text-slate-300",
                      )}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
);

DateInput.displayName = "DateInput";

export { DateInput };
