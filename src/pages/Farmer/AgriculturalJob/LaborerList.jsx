import React from "react";
import { CheckCircle2, Users } from "lucide-react";
import { formatCurrency } from "./workforceCalculations";

const LaborerList = ({
  error, laborers, selectedLaborers, recommendedDailyCoolie, onToggleLaborer,
}) => (
  <div className="bg-slate-50/80 px-5 py-5">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-lg font-semibold text-slate-900">
        Available laborers
      </h2>
      {error && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 ring-1 ring-red-100">
          {error}
        </div>
      )}
    </div>

    {laborers.length > 0 ? (
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {laborers.map((laborer) => {
          const selected = selectedLaborers.some(
            (item) => item.id === laborer.id,
          );

          return (
            <button
              key={laborer.id}
              type="button"
              onClick={() => onToggleLaborer(laborer)}
              className={`rounded-lg border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${selected
                  ? "border-green-500 ring-2 ring-green-100"
                  : "border-slate-200 hover:border-green-200"
                }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {laborer.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {laborer.expertise.join(", ")}
                  </p>
                </div>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-sm font-semibold text-amber-700">
                  {laborer.rating.toFixed(1)}
                </span>
              </div>

              <div className="mt-4 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Coolie amount
                  </p>
                  <p className="mt-1 text-xl font-bold text-green-800">
                    {formatCurrency(recommendedDailyCoolie)}
                  </p>
                </div>
                {selected && <CheckCircle2 className="h-6 w-6 text-green-600" />}
              </div>
            </button>
          );
        })}
      </div>
    ) : (
      <div className="mt-4 flex min-h-52 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
        <Users className="h-10 w-10 text-slate-300" />
        <h3 className="mt-3 text-base font-semibold text-slate-900">
          Search for laborers
        </h3>
        <p className="mt-1 max-w-md text-sm text-slate-500">
          Choose crop, market price, task, and dates to calculate a working-hour
          based daily coolie amount and find matching workers.
        </p>
      </div>
    )}
  </div>
);

export default LaborerList;
