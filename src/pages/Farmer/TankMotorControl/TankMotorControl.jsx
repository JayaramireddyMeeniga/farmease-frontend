import React from "react";
import {
  Activity,
  Droplets,
  Gauge,
  Leaf,
  Power,
  ShieldCheck,
  Sparkles,
  Waves,
  Zap,
} from "lucide-react";
import { useTankMotorStore } from "../../../store/useTankMotorStore";

const FULL_TANK_LEVEL = 95;

const StatCard = ({ icon, label, value, tone }) => (
  <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-stone-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-stone-900">{value}</p>
      </div>
      <div className={`rounded-lg p-3 ${tone}`}>{icon}</div>
    </div>
  </div>
);

const TankMotorControl = () => {
  const {
    tankLevel,
    motorRunning,
    autoMode,
    electricitySaved,
    waterSaved,
    motorHealth,
    lastChecked,
    activityLog,
    setTankLevel,
    toggleAutoMode,
    toggleMotor,
  } = useTankMotorStore();

  const tankIsFull = tankLevel >= FULL_TANK_LEVEL;
  const waterHeight = `${tankLevel}%`;
  const statusText = tankIsFull
    ? "Tank full. Motor automatically OFF."
    : motorRunning
      ? "Motor running. Tank is filling."
      : "Motor OFF. Tank level is safe.";

  return (
    <div className="min-h-screen bg-[#f7f5ef] px-4 py-6 text-stone-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
                  <Sparkles className="h-4 w-4" />
                  Smart irrigation control
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-800">
                  <Activity className="h-4 w-4" />
                  Sensor checked {lastChecked}
                </span>
              </div>

              <div className="mt-8 max-w-3xl">
                <h1 className="text-4xl font-semibold tracking-normal text-stone-950 sm:text-5xl">
                  Automatic Tank Motor OFF
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
                  The water level sensor keeps checking the tank. When the tank
                  becomes full, the motor switches OFF automatically to save
                  electricity, save water, and protect the motor from damage.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <StatCard
                  icon={<Zap className="h-5 w-5" />}
                  label="Electricity saved"
                  value={`${electricitySaved} kWh`}
                  tone="bg-amber-100 text-amber-700"
                />
                <StatCard
                  icon={<Droplets className="h-5 w-5" />}
                  label="Water saved"
                  value={`${waterSaved} L`}
                  tone="bg-sky-100 text-sky-700"
                />
                <StatCard
                  icon={<ShieldCheck className="h-5 w-5" />}
                  label="Motor health"
                  value={`${motorHealth}%`}
                  tone="bg-emerald-100 text-emerald-700"
                />
              </div>
            </div>

            <div className="border-t border-stone-200 bg-stone-950 p-6 text-white sm:p-8 lg:border-l lg:border-t-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-emerald-300">
                    Live Status
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">{statusText}</h2>
                </div>
                <div
                  className={`rounded-lg px-3 py-2 text-sm font-bold ${motorRunning
                    ? "bg-emerald-400 text-stone-950"
                    : "bg-red-400 text-stone-950"
                    }`}
                >
                  {motorRunning ? "ON" : "OFF"}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-[120px_1fr] items-center gap-6 sm:grid-cols-[150px_1fr]">
                <div className="relative h-64 rounded-4xl border-4 border-sky-200 bg-white/10 p-2">
                  <div className="absolute inset-x-8 -top-4 h-5 rounded-t-lg bg-sky-200" />
                  <div className="relative h-full overflow-hidden rounded-[1.45rem] bg-stone-900">
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-sky-500 via-cyan-400 to-emerald-300 transition-all duration-500"
                      style={{ height: waterHeight }}
                    >
                      <Waves className="absolute left-1/2 top-3 h-8 w-8 -translate-x-1/2 text-white/80" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="rounded-lg bg-stone-950/70 px-3 py-2 text-3xl font-semibold">
                        {tankLevel}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between text-sm font-semibold text-stone-300">
                      <span>Sensor level</span>
                      <span>Full at {FULL_TANK_LEVEL}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={tankLevel}
                      onChange={(event) => setTankLevel(event.target.value)}
                      className="mt-3 h-2 w-full accent-emerald-400"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <button
                      type="button"
                      onClick={toggleAutoMode}
                      className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition ${autoMode
                        ? "bg-emerald-400 text-stone-950 hover:bg-emerald-300"
                        : "bg-white/10 text-white hover:bg-white/15"
                        }`}
                    >
                      <Gauge className="h-5 w-5" />
                      Auto mode {autoMode ? "ON" : "OFF"}
                    </button>
                    <button
                      type="button"
                      onClick={toggleMotor}
                      className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition ${motorRunning
                        ? "bg-red-400 text-stone-950 hover:bg-red-300"
                        : "bg-white text-stone-950 hover:bg-stone-100"
                        }`}
                    >
                      <Power className="h-5 w-5" />
                      {motorRunning ? "Stop motor" : "Start motor"}
                    </button>
                  </div>

                  <p className="rounded-lg border border-white/10 bg-white/10 p-4 text-sm leading-6 text-stone-200">
                    {tankIsFull && autoMode
                      ? "Safety lock is active. The motor will stay OFF while the tank is full."
                      : "Automatic mode will stop the motor as soon as the tank reaches full level."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-bold text-stone-950">
              <Leaf className="h-5 w-5 text-emerald-600" />
              Protection Benefits
            </h2>
            <div className="mt-5 grid gap-3">
              {[
                ["Electricity", "Stops unnecessary motor running after full tank."],
                ["Water", "Prevents overflow and keeps stored water usable."],
                ["Motor damage", "Reduces dry stress, overheating, and extra wear."],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-lg border border-stone-200 bg-[#fbfaf6] p-4"
                >
                  <p className="font-bold text-stone-950">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-stone-600">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-bold text-stone-950">
              <Activity className="h-5 w-5 text-sky-600" />
              Recent Sensor Activity
            </h2>
            <div className="mt-5 overflow-hidden rounded-lg border border-stone-200">
              {activityLog.map((entry) => (
                <div
                  key={entry.id}
                  className="grid gap-3 border-b border-stone-200 p-4 last:border-b-0 sm:grid-cols-[90px_1fr_90px]"
                >
                  <span className="text-sm font-semibold text-stone-500">
                    {entry.time}
                  </span>
                  <div>
                    <p className="font-bold text-stone-950">{entry.status}</p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">
                      {entry.reason}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-sky-700">
                    {entry.level}% full
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TankMotorControl;
