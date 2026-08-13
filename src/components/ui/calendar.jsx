import * as React from "react";
import { ChevronLeft, ChevronRight, X, CalendarDays } from "lucide-react";
import { cn } from "../../lib/utils";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const ModernCalendar = ({
  dateRange,
  onChange,
  onComplete,
  disablePastDates = false,
  disablePresentDates = false,
  disableFutureDates = false,
}) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectingFrom, setSelectingFrom] = React.useState(null);

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date(todayStart);
  todayEnd.setHours(23, 59, 59, 999);

  const tomorrowStart = new Date(todayStart);
  tomorrowStart.setDate(todayStart.getDate() + 1);

  const isSameDay = (d1, d2) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  const isToday = (date) => isSameDay(date, new Date());

  const isPastDate = (date) => date < todayStart;

  const isFutureDate = (date) => date > todayEnd;

  const isInRange = (date) => date >= dateRange.from && date <= dateRange.to;

  const isRangeStart = (date) => isSameDay(date, dateRange.from);

  const isRangeEnd = (date) => isSameDay(date, dateRange.to);

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthLastDay - i),
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }

    const remainingDays = 42 - days.length;

    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i),
      });
    }

    return days;
  };

  const handleDateClick = (date) => {
    if (disablePastDates && date < todayStart) return;
    if (disablePresentDates && date < tomorrowStart) return;
    if (disableFutureDates && date > todayEnd) return;

    if (!selectingFrom) {
      setSelectingFrom(date);
      onChange({ from: date, to: date });
    } else {
      if (date < selectingFrom) {
        onChange({ from: date, to: selectingFrom });
      } else {
        onChange({ from: selectingFrom, to: date });
      }

      setSelectingFrom(null);
      setTimeout(onComplete, 300);
    }
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth));
  };

  const renderCalendar = (monthOffset = 0) => {
    const displayDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + monthOffset,
    );

    const days = getDaysInMonth(displayDate);

    return (
      <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Month
            </p>

            <select
              value={displayDate.getMonth()}
              onChange={handleMonthChange}
              className="mt-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-800 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            >
              {monthNames.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {monthOffset === 0 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setCurrentDate(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth() - 1,
                    ),
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-brand-blue hover:bg-brand-blue hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setCurrentDate(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth() + 1,
                    ),
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-brand-blue hover:bg-brand-blue hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div className="mb-2 grid grid-cols-7 gap-1">
          {dayNames.map((day) => (
            <div
              key={day}
              className="flex h-8 items-center justify-center text-xs font-bold text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {days.map((d, i) => {
            const inRange = isInRange(d.date);
            const start = isRangeStart(d.date);
            const end = isRangeEnd(d.date);
            const today = isToday(d.date);

            const disabled =
              (disablePastDates && isPastDate(d.date)) ||
              (disablePresentDates && d.date < tomorrowStart) ||
              (disableFutureDates && isFutureDate(d.date));

            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                onClick={() => !disabled && handleDateClick(d.date)}
                className={cn(
                  "relative flex h-9 w-full items-center justify-center rounded-xl text-xs font-semibold transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-brand-blue/30",
                  !d.isCurrentMonth && "text-gray-300",
                  d.isCurrentMonth && "text-gray-700",
                  disabled && "cursor-not-allowed opacity-30",
                  !disabled &&
                    "cursor-pointer hover:bg-gray-100 hover:scale-105",
                  today &&
                    !inRange &&
                    "border border-brand-blue text-brand-blue bg-brand-blue/5",
                  inRange && !disabled && "bg-brand-blue/10 text-brand-blue",
                  (start || end) &&
                    !disabled &&
                    "bg-brand-blue text-white shadow-md shadow-brand-blue/20 hover:bg-brand-blue hover:text-white",
                )}
              >
                {d.day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full rounded-3xl border border-gray-100 bg-gradient-to-br from-white via-white to-gray-50 p-5 shadow-xl">
      <button
        type="button"
        onClick={onComplete}
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-100 hover:text-red-600"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="mb-5 flex flex-col gap-4 pr-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
            <CalendarDays className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Select Date Range
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Click a start date, then choose an end date.
            </p>

            {(disablePastDates ||
              disablePresentDates ||
              disableFutureDates) && (
              <p className="mt-1 text-xs font-medium text-orange-500">
                {disablePastDates &&
                  disablePresentDates &&
                  "Past and present dates are disabled."}
                {disablePastDates &&
                  !disablePresentDates &&
                  "Past dates are disabled."}
                {!disablePastDates &&
                  disablePresentDates &&
                  "Present dates are disabled."}
                {disableFutureDates && " Future dates are disabled."}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-gray-50 p-2">
          <span className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-brand-blue shadow-sm">
            {formatDate(dateRange.from)}
          </span>

          <span className="text-gray-400">→</span>

          <span className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-brand-blue shadow-sm">
            {formatDate(dateRange.to)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        {renderCalendar(0)}
        {renderCalendar(1)}
      </div>
    </div>
  );
};

export default ModernCalendar;
