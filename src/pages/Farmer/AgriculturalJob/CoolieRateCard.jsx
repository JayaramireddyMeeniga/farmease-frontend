import React from "react";
import { BadgeIndianRupee } from "lucide-react";
import { formatCurrency, formatHours } from "./workforceCalculations";

const CoolieRateCard = ({
  selectedCrop, taskType, selectedCount, requiredWorkers, days,
  hoursPerDay, hourlyCoolie, baseDailyCoolie, recommendedDailyCoolie,
}) => (
  <aside className="rounded-lg border border-green-100 bg-green-50/80 p-5">
    <div className="flex items-start gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-green-700 shadow-sm">
        <BadgeIndianRupee className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-slate-900">
          Suggested daily coolie
        </h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          The amount updates from crop price, labor share, and task difficulty,
          then adjusts for working hours per day.
        </p>
      </div>
    </div>

    <div className="mt-5 rounded-lg bg-white p-4 ring-1 ring-green-100">
      <p className="text-sm font-medium text-slate-500">
        {selectedCrop} {taskType}
      </p>
      <p className="mt-2 text-3xl font-bold text-green-800">
        {formatCurrency(recommendedDailyCoolie)}
        <span className="text-sm font-semibold text-slate-500">
          {" "}
          / worker / day
        </span>
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-500">
        {formatCurrency(hourlyCoolie)} / hour from{" "}
        {formatCurrency(baseDailyCoolie)} full-day rate
      </p>
      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-slate-500">Workers</p>
          <p className="font-semibold text-slate-900">
            {selectedCount}/{requiredWorkers}
          </p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-slate-500">Days</p>
          <p className="font-semibold text-slate-900">{days}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-slate-500">Hours</p>
          <p className="font-semibold text-slate-900">
            {formatHours(hoursPerDay)}/day
          </p>
        </div>
      </div>
    </div>
  </aside>
);

export default CoolieRateCard;
