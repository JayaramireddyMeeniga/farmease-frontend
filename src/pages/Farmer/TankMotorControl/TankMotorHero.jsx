import React from "react";
import {
  Activity, Droplets, Gauge, Power, ShieldCheck, Sparkles, Waves, Zap,
} from "lucide-react";
import { FULL_TANK_LEVEL, MIN_TANK_LEVEL } from "./tankMotorData";

const statusForMotor = ({ tankLevel, motorRunning, autoMode }) => {
  if (autoMode && tankLevel >= FULL_TANK_LEVEL) return "Stopped Automatically";
  if (!autoMode && motorRunning) return "Manual Override";
  if (motorRunning && tankLevel <= MIN_TANK_LEVEL + 3) return "Starting";
  return motorRunning ? "ON" : "OFF";
};

const StatCard = ({ icon, label, value, tone }) => (
  <div className="rounded-md border border-(--fe-border) bg-(--fe-surface) p-4 shadow-sm">
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-(--fe-text-muted)">{label}</p>
        <p className="mt-1 text-2xl font-bold text-(--fe-text)">{value}</p>
      </div>
      <div className={`rounded-lg p-3 ${tone}`}>{icon}</div>
    </div>
  </div>
);

const TankMotorHero = ({
  tankLevel, motorRunning, autoMode, electricitySaved, waterSaved, motorHealth,
  lastChecked, onTankLevelChange, onAutoModeToggle, onMotorToggle,
}) => {
  const tankIsFull = tankLevel >= FULL_TANK_LEVEL;
  const tankIsLow = tankLevel <= MIN_TANK_LEVEL;
  const motorStatus = statusForMotor({ tankLevel, motorRunning, autoMode });
  const statusText = tankIsFull
    ? "Tank reached target level. Motor is protected from overflow."
    : tankIsLow && autoMode
      ? "Low level detected. Auto start can refill the tank."
      : motorRunning
        ? "Motor running. Tank is filling with live sensor updates."
        : "Motor OFF. Tank level is being watched.";

  return (
    <section className="overflow-hidden rounded-lg border border-(--fe-border) bg-(--fe-surface) shadow-sm">
      <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-(--fe-bg-soft) px-3 py-1 text-sm font-semibold text-(--fe-primary-700)">
              <Sparkles className="h-4 w-4" />
              Smart tank motor control
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-800">
              <Activity className="h-4 w-4" />
              Sensor checked {lastChecked}
            </span>
          </div>

          <div className="mt-4 max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-normal text-(--fe-text) sm:text-5xl">
              Automatic Tank Motor OFF
            </h1>
            <p className="mt-3 max-w-2xl text-md leading-7 text-(--fe-text-muted)">
              Farmers can monitor tank level, run the motor manually, or let
              automatic mode stop pumping at {FULL_TANK_LEVEL}% and start again
              near {MIN_TANK_LEVEL}% when refill rules are enabled.
            </p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <StatCard icon={<Zap className="h-5 w-5" />}
              label="Electricity saved" value={`${electricitySaved} kWh`}
              tone="bg-amber-100 text-amber-700"
            />
            <StatCard icon={<Droplets className="h-5 w-5" />}
              label="Water saved" value={`${waterSaved} L`}
              tone="bg-sky-100 text-sky-700"
            />
            <StatCard icon={<ShieldCheck className="h-5 w-5" />}
              label="Motor health" value={`${motorHealth}%`}
              tone="bg-emerald-100 text-emerald-700"
            />
          </div>
        </div>

        <div className="border-t border-(--fe-border) bg-(--fe-primary-900) p-6 text-white lg:border-l lg:border-t-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-200">
                Live Tank Level
              </p>
              <h2 className="mt-2 text-2xl font-bold">{statusText}</h2>
            </div>
            <div className="rounded-lg bg-white px-3 py-2 text-sm font-bold text-(--fe-primary-900)">
              {motorStatus}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-[120px_1fr] items-center gap-6 sm:grid-cols-[150px_1fr]">
            <div className="relative h-64 rounded-4xl border-4 border-sky-200 bg-white/10 p-2">
              <div className="absolute inset-x-8 -top-4 h-5 rounded-t-lg bg-sky-200" />
              <div className="relative h-full overflow-hidden rounded-[1.45rem] bg-[rgba(20,27,21,0.85)]">
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-sky-600 via-cyan-400 to-emerald-300 transition-all duration-500"
                  style={{ height: `${tankLevel}%` }}>
                  <Waves className="absolute left-1/2 top-3 h-8 w-8 -translate-x-1/2 text-white/80" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="rounded-lg bg-[rgba(20,27,21,0.72)] px-3 py-2 text-3xl font-semibold">
                    {tankLevel}%
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between text-sm font-semibold text-stone-200">
                  <span>Sensor level</span>
                  <span>Auto OFF at {FULL_TANK_LEVEL}%</span>
                </div>
                <input
                  type="range" min="0" max="100" value={tankLevel}
                  onChange={(event) => onTankLevelChange(event.target.value)}
                  className="mt-3 h-2 w-full accent-(--fe-wheat)"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <button type="button" onClick={onAutoModeToggle}
                  className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition ${autoMode
                    ? "bg-(--fe-wheat) text-(--fe-primary-900) hover:bg-amber-300"
                    : "bg-white/10 text-white hover:bg-white/15"
                    }`}
                >
                  <Gauge className="h-5 w-5" />
                  {autoMode ? "Auto Mode" : "Manual Mode"}
                </button>
                <button type="button" onClick={onMotorToggle}
                  className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition ${motorRunning
                    ? "bg-(--fe-danger) text-white hover:bg-red-700"
                    : "bg-white text-(--fe-primary-900) hover:bg-stone-100"
                    }`}
                >
                  <Power className="h-5 w-5" />
                  {motorRunning ? "Emergency Stop" : "Start Motor"}
                </button>
              </div>

              <p className="rounded-lg border border-white/10 bg-white/10 p-4 text-sm leading-6 text-stone-100">
                {tankIsFull && autoMode
                  ? "Overflow protection is active. The motor stays OFF while the tank is full."
                  : tankIsLow && autoMode
                    ? "Automatic Motor ON can start refill because the tank is below the minimum level."
                    : "Manual control remains available, while safety checks watch overflow and dry run risk."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TankMotorHero;
