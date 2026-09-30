import React from "react";
import {
  BarChart3,
  Droplets,
  Leaf,
  Sparkles,
  Zap,
} from "lucide-react";

import { reportRows } from "./tankMotorData";

const SavingsReportsPanels = ({
  electricitySaved,
  waterSaved,
  motorHealth,
}) => {
  return (
    <section className="grid gap-3 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-xl font-bold text-(--fe-text)">
          <BarChart3 className="h-5 w-5 text-(--fe-primary-700)" />
          Daily / Weekly Reports
        </h2>

        <div className="mt-3 overflow-hidden rounded-lg border border-(--fe-border)">
          <div className="grid grid-cols-4 bg-(--fe-surface-muted) px-4 py-3 text-sm font-bold text-(--fe-text-muted)">
            <span>Period</span>
            <span>Water</span>
            <span>Runtime</span>
            <span>Savings</span>
          </div>

          {reportRows.map((row) => (
            <div
              key={row.period}
              className="grid grid-cols-4 border-t border-(--fe-border) px-4 py-3 text-sm"
            >
              <span className="font-bold text-(--fe-text)">
                {row.period}
              </span>

              <span className="text-(--fe-text-muted)">
                {row.water}
              </span>

              <span className="text-(--fe-text-muted)">
                {row.runtime}
              </span>

              <span className="font-bold text-(--fe-primary-700)">
                {row.savings}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-(--fe-border) bg-(--fe-primary-900) p-4 text-white shadow-sm">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <Sparkles className="h-5 w-5 text-(--fe-wheat)" />
          Smart Recommendation
        </h2>

        <p className="mt-3 text-base font-medium">
          Your cotton field received enough water today. Next irrigation
          recommended tomorrow at 6:00 AM.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-white/10 p-4">
            <Zap className="h-5 w-5 text-(--fe-wheat)" />
            <p className="mt-2 text-sm text-stone-200">
              Electricity saved
            </p>

            <p className="mt-1 text-xl font-bold">
              {electricitySaved} kWh
            </p>
          </div>

          <div className="rounded-lg bg-white/10 p-4">
            <Droplets className="h-5 w-5 text-sky-200" />

            <p className="mt-2 text-sm text-stone-200">
              Water saved
            </p>

            <p className="mt-1 text-xl font-bold">
              {waterSaved} L
            </p>
          </div>

          <div className="rounded-lg bg-white/10 p-4">
            <Leaf className="h-5 w-5 text-emerald-200" />

            <p className="mt-2 text-sm text-stone-200">
              Motor health
            </p>

            <p className="mt-1 text-xl font-bold">
              {motorHealth}%
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsReportsPanels;