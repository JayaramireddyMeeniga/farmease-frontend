import React from "react";
import { BadgeIndianRupee, CalendarDays, Clock3 } from "lucide-react";
import { formatCurrency } from "./workforceCalculations";

const SelectedLaborersSummary = ({
  selectedLaborers, requiredWorkers, days, workTime, bookingTotal, onBookLaborers,
}) => {
  if (selectedLaborers.length === 0) return null;

  return (
    <div className="mt-5 rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Selected laborers: {selectedLaborers.length}/{requiredWorkers}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {selectedLaborers.map((laborer) => laborer.name).join(", ")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
            <CalendarDays className="h-4 w-4" />
            {days} days
          </span>
          <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
            <Clock3 className="h-4 w-4" />
            {workTime.fromTime} - {workTime.toTime}
          </span>
          <span className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-800 ring-1 ring-green-100">
            <BadgeIndianRupee className="h-4 w-4" />
            {formatCurrency(bookingTotal)}
          </span>
          <button
            type="button"
            onClick={onBookLaborers}
            className="h-10 rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Book Selected Laborers
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedLaborersSummary;
