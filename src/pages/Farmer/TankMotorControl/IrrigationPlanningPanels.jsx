import React from "react";
import {
  CalendarClock,
  CloudRain,
  MapPin,
  Sprout,
  Timer,
} from "lucide-react";

import {
  cropRules,
  irrigationZones,
  motorFleet,
} from "./tankMotorData";

const IrrigationPlanningPanels = () => {
  return (
    <section className="grid gap-3 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-4 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-(--fe-text)">
              <CalendarClock className="h-5 w-5 text-(--fe-primary-700)" />
              Automatic Irrigation Timer
            </h2>

            <p className="mt-2 text-sm leading-6 text-(--fe-text-muted)">
              Schedule watering by crop, field, zone, row, or plant line.
            </p>
          </div>

          <span className="rounded-lg bg-(--fe-bg-soft) px-3 py-2 text-sm font-bold text-(--fe-primary-700)">
            Weather aware
          </span>
        </div>

        <div className="mt-3 overflow-hidden rounded-lg border border-(--fe-border)">
          <div className="hidden grid-cols-[1fr_1fr_1.2fr_1fr] bg-(--fe-surface-muted) px-4 py-3 text-sm font-bold text-(--fe-text-muted) md:grid">
            <span>Crop</span>
            <span>Zone</span>
            <span>Watering rule</span>
            <span>Next run</span>
          </div>

          {cropRules.map((rule) => (
            <div
              key={`${rule.crop}-${rule.zone}`}
              className="grid gap-3 border-t border-(--fe-border) p-4 md:grid-cols-[1fr_1fr_1.2fr_1fr]"
            >
              <div>
                <p className="font-bold text-(--fe-text)">
                  {rule.crop}
                </p>

                <p className="text-sm text-(--fe-text-muted)">
                  {rule.moisture}
                </p>
              </div>

              <p className="text-sm font-semibold text-(--fe-text)">
                {rule.zone}
              </p>

              <p className="text-sm leading-6 text-(--fe-text-muted)">
                {rule.rule}
              </p>

              <p className="text-sm font-bold text-(--fe-primary-700)">
                {rule.nextRun}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        <div className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-4 shadow-sm">
          <h2 className="flex items-center gap-2 text-xl font-bold text-(--fe-text)">
            <CloudRain className="h-5 w-5 text-(--fe-accent-sky)" />
            Weather-Aware Irrigation
          </h2>

          <div className="mt-3 rounded-lg bg-sky-50 p-4">
            <p className="text-sm font-semibold text-sky-800">
              Rain chance: 68% this evening
            </p>

            <p className="mt-2 text-sm leading-6 text-sky-900">
              Paddy watering is paused and vegetable drip is reduced to
              prevent excess water usage.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-4 shadow-sm">
          <h2 className="flex items-center gap-2 text-xl font-bold text-(--fe-text)">
            <MapPin className="h-5 w-5 text-(--fe-wheat)" />
            Zone-Based Watering
          </h2>

          <div className="mt-5 grid gap-3">
            {irrigationZones.map((zone) => (
              <div
                key={zone.name}
                className="flex items-center justify-between gap-3 rounded-lg border border-(--fe-border) bg-(--fe-surface-muted) p-4"
              >
                <div>
                  <p className="font-bold text-(--fe-text)">
                    {zone.name}
                  </p>

                  <p className="text-sm text-(--fe-text-muted)">
                    {zone.detail}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-(--fe-primary-700)">
                    {zone.status}
                  </p>

                  <p className="text-sm text-(--fe-text-muted)">
                    {zone.flow}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-4 shadow-sm xl:col-span-2">
        <h2 className="flex items-center gap-2 text-xl font-bold text-(--fe-text)">
          <Sprout className="h-5 w-5 text-(--fe-primary-700)" />
          Multiple Motor Support
        </h2>

        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {motorFleet.map((motor) => (
            <article
              key={motor.name}
              className="rounded-lg border border-(--fe-border) bg-(--fe-surface-muted) p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-bold text-(--fe-text)">
                  {motor.name}
                </p>

                <Timer className="h-5 w-5 text-(--fe-primary-700)" />
              </div>

              <p className="mt-2 text-sm text-(--fe-text-muted)">
                {motor.tank}
              </p>

              <div className="mt-4 flex items-center justify-between text-sm font-bold">
                <span className="text-(--fe-primary-700)">
                  {motor.status}
                </span>

                <span className="text-(--fe-text)">
                  {motor.level}%
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IrrigationPlanningPanels;