import * as React from "react";
import { CheckCircle2, Clock3 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { cn } from "../../lib/utils";

const hours = Array.from({ length: 24 }, (_, index) => index);
const minutes = [0, 15, 30, 45];
const quickTimes = [
  { label: "8 AM", value: "08:00" },
  { label: "1 PM", value: "13:00" },
  { label: "3 PM", value: "15:00" },
  { label: "6 PM", value: "18:00" },
];

const splitTime = (value) => {
  if (!value) return { hour: 8, minute: 0 };

  const [hour, minute] = value.split(":").map(Number);
  return { hour, minute };
};

const formatTimeValue = (hour, minute) =>
  `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

const formatDisplayTime = (value) => {
  if (!value) return "";

  const { hour, minute } = splitTime(value);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
};

const TimeInput = React.forwardRef(
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
      placeholder = "Select time",
      label = "Select time",
      ...props
    },
    ref,
  ) => {
    const initialTime = splitTime(value);
    const [open, setOpen] = React.useState(false);
    const [draftHour, setDraftHour] = React.useState(initialTime.hour);
    const [draftMinute, setDraftMinute] = React.useState(initialTime.minute);

    React.useEffect(() => {
      const nextTime = splitTime(value);
      setDraftHour(nextTime.hour);
      setDraftMinute(nextTime.minute);
    }, [value]);

    const commitTime = (nextValue = formatTimeValue(draftHour, draftMinute)) => {
      const event = {
        target: { value: nextValue, name },
        currentTarget: { value: nextValue, name },
      };

      onChange?.(event);
      setOpen(false);
    };

    const displayValue = value ? formatDisplayTime(value) : placeholder;

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
              value ? "text-slate-800" : "text-slate-400",
            )}
          >
            {displayValue}
          </span>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-white text-green-700 shadow-sm">
            <Clock3 className={cn("h-4 w-4", iconClassName)} />
          </span>
        </button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md overflow-hidden rounded-xl border-0 bg-white p-0 shadow-2xl [&>button]:text-white [&>button]:opacity-90 [&>button]:hover:bg-white/10 [&>button]:hover:opacity-100 [&>button]:focus:ring-white/50">
            <DialogHeader className="bg-[#285448] px-4 py-2 text-left text-white">
              <DialogTitle className="flex items-center gap-2 text-base">
                <Clock3 className="h-4 w-4" />
                {label}
              </DialogTitle>
              <DialogDescription className="text-xs -mt-0.5 text-green-50/80">
                Pick the hour and minute for the work shift.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 px-4 pb-4">
              <div className="rounded-md bg-green-50 px-4 py-3 text-center ring-1 ring-green-100">
                <p className="text-[11px] font-semibold uppercase text-green-700">
                  Selected time
                </p>
                <p className="mt-0.5 text-2xl font-black text-slate-900">
                  {formatDisplayTime(formatTimeValue(draftHour, draftMinute))}
                </p>
              </div>

              <div>
                <p className="mb-1.5 text-xs font-bold text-slate-700">
                  Quick times
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {quickTimes.map((time) => (
                    <button
                      key={time.value}
                      type="button"
                      onClick={() => {
                        const nextTime = splitTime(time.value);
                        setDraftHour(nextTime.hour);
                        setDraftMinute(nextTime.minute);
                      }}
                      className="rounded-md bg-slate-100 px-2 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-800"
                    >
                      {time.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-1.5 text-xs font-bold text-slate-700">Hour</p>
                <div className="grid grid-cols-8 gap-2.5">
                  {hours.map((hour) => (
                    <button
                      key={hour}
                      type="button"
                      onClick={() => setDraftHour(hour)}
                      className={cn(
                        "h-8 rounded-md px-1.5 text-xs font-semibold transition",
                        draftHour === hour
                          ? "bg-green-700 text-white shadow-md shadow-green-900/20"
                          : "bg-slate-100 text-slate-600 hover:bg-green-50 hover:text-green-800",
                      )}
                    >
                      {String(hour).padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-1.5 text-xs font-bold text-slate-700">
                  Minute
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {minutes.map((minute) => (
                    <button
                      key={minute}
                      type="button"
                      onClick={() => setDraftMinute(minute)}
                      className={cn(
                        "h-8 rounded-md px-2 text-xs font-semibold transition",
                        draftMinute === minute
                          ? "bg-green-700 text-white shadow-md shadow-green-900/20"
                          : "bg-slate-100 text-slate-600 hover:bg-green-50 hover:text-green-800",
                      )}
                    >
                      {String(minute).padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-9 rounded-md bg-slate-100 px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => commitTime()}
                  className="inline-flex h-9 items-center gap-1.5 rounded-md bg-green-700 px-3 text-xs font-semibold text-white shadow-md shadow-green-900/20 transition hover:bg-green-800"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Apply
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
);

TimeInput.displayName = "TimeInput";

export { TimeInput };
