import React from "react";
import {
  AlertTriangle,
  BatteryLow,
  Gauge,
  Radio,
  ShieldCheck,
  Thermometer,
  Wrench,
  Zap,
} from "lucide-react";

import {
  FULL_TANK_LEVEL,
  MIN_TANK_LEVEL,
} from "./tankMotorData";

const safetyItems = [
  {
    title: "Overflow Protection",
    description: `Motor stops before overflow when the tank reaches ${FULL_TANK_LEVEL}%.`,
    icon: ShieldCheck,
    tone: "text-(--fe-primary-700) bg-(--fe-bg-soft)",
  },
  {
    title: "Dry Run Protection",
    description:
      "Stops the motor when the well or bore has insufficient water.",
    icon: AlertTriangle,
    tone: "text-(--fe-danger) bg-(--color-red-50)",
  },
  {
    title: "Overheat Watch",
    description:
      "Tracks temperature, abnormal current, and runtime load.",
    icon: Thermometer,
    tone: "text-amber-700 bg-amber-100",
  },
  {
    title: "Maintenance Status",
    description:
      "Flags service needs before small motor issues become failures.",
    icon: Wrench,
    tone: "text-(--fe-accent-sky) bg-sky-100",
  },
];

const sensorStates = [
  {
    label: "Connected",
    value: "Online",
    color: "bg-emerald-500",
  },
  {
    label: "Signal",
    value: "Strong",
    color: "bg-(--fe-wheat)",
  },
  {
    label: "Battery",
    value: "82%",
    color: "bg-sky-500",
  },
  {
    label: "Sensor Error",
    value: "None",
    color: "bg-(--fe-primary-700)",
  },
];

const AutomationSafetyPanels = ({
  tankLevel,
  autoMode,
  motorHealth,
}) => {
  const autoOnReady =
    autoMode && tankLevel <= MIN_TANK_LEVEL;

  return (
    <section className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-(--fe-text)">
              <Gauge className="h-5 w-5 text-(--fe-primary-700)" />
              Auto / Manual Rules
            </h2>

            <p className="mt-2 text-sm leading-6 text-(--fe-text-muted)">
              Automatic control protects the tank at full level and can
              refill when the level drops below the minimum.
            </p>
          </div>

          <span className="rounded-md bg-(--fe-bg-soft) px-3 py-2 text-sm font-bold text-(--fe-primary-700)">
            {autoMode ? "Automatic" : "Manual"}
          </span>
        </div>

        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-(--fe-border) bg-(--fe-surface-muted) p-4">
            <p className="text-sm font-semibold text-(--fe-text-muted)">
              Automatic Tank Motor OFF
            </p>

            <p className="mt-2 text-2xl font-bold text-(--fe-text)">
              {FULL_TANK_LEVEL}%
            </p>

            <p className="mt-2 text-sm leading-6 text-(--fe-text-muted)">
              Pumping stops before overflow and records water saved.
            </p>
          </div>

          <div className="rounded-lg border border-(--fe-border) bg-(--fe-surface-muted) p-4">
            <p className="text-sm font-semibold text-(--fe-text-muted)">
              Automatic Motor ON
            </p>

            <p className="mt-2 text-2xl font-bold text-(--fe-text)">
              {MIN_TANK_LEVEL}%
            </p>

            <p className="mt-2 text-sm leading-6 text-(--fe-text-muted)">
              {autoOnReady
                ? "Tank is low enough for automatic refill."
                : "Ready to refill when the tank falls below the limit."}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-4 shadow-sm">
        <h2 className="flex items-center gap-2 text-xl font-bold text-(--fe-text)">
          <Radio className="h-5 w-5 text-(--fe-accent-sky)" />
          Sensor Health
        </h2>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {sensorStates.map((sensor) => (
            <div
              key={sensor.label}
              className="rounded-lg border border-(--fe-border) bg-(--fe-surface-muted) p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-(--fe-text-muted)">
                  {sensor.label}
                </p>

                <span
                  className={`h-3 w-3 rounded-full ${sensor.color}`}
                />
              </div>

              <p className="mt-2 text-lg font-bold text-(--fe-text)">
                {sensor.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-lg bg-(--fe-primary-50) p-4 text-sm font-semibold text-(--fe-primary-800)">
          <BatteryLow className="h-5 w-5" />
          Low battery and weak signal alerts are enabled.
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
        {safetyItems.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-5 shadow-sm"
            >
              <div
                className={`inline-flex rounded-lg p-3 ${item.tone}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-bold text-(--fe-text)">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-(--fe-text-muted)">
                {item.description}
              </p>
            </article>
          );
        })}
      </div>

      <div className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-5 shadow-sm lg:col-span-2">
        <h2 className="flex items-center gap-2 text-xl font-bold text-(--fe-text)">
          <Zap className="h-5 w-5 text-(--fe-wheat)" />
          Motor Health Monitoring
        </h2>

        <div className="mt-3 grid gap-4 md:grid-cols-4">
          {[
            ["Health score", `${motorHealth}%`],
            ["Current load", "Normal"],
            ["Temperature", "42 C"],
            ["Runtime today", "2h 15m"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg border border-(--fe-border) bg-(--fe-surface-muted) p-4"
            >
              <p className="text-sm font-semibold text-(--fe-text-muted)">
                {label}
              </p>

              <p className="mt-2 text-xl font-bold text-(--fe-text)">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutomationSafetyPanels;