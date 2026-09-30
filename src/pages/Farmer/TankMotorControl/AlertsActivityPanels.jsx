import React from "react";
import {
  Activity,
  Bell,
  Droplets,
  Power,
  ShieldCheck,
} from "lucide-react";

import {
  FULL_TANK_LEVEL,
  MIN_TANK_LEVEL,
} from "./tankMotorData";

const AlertsActivityPanels = ({
  tankLevel,
  motorRunning,
  autoMode,
  activityLog,
  lastChecked,
}) => {
  const alerts = [
    {
      title: "Low Water Alert",
      message:
        tankLevel <= MIN_TANK_LEVEL
          ? "Tank is below minimum level. Refill should start soon."
          : `Alert will trigger below ${MIN_TANK_LEVEL}%.`,
      icon: Droplets,
      tone: "text-sky-700 bg-sky-100",
    },
    {
      title: "Tank Full Notification",
      message:
        tankLevel >= FULL_TANK_LEVEL
          ? "Tank is full. Farmer notification sent."
          : `Notification ready at ${FULL_TANK_LEVEL}%.`,
      icon: ShieldCheck,
      tone: "text-(--fe-primary-700) bg-(--fe-bg-soft)",
    },
    {
      title: "Motor Failure Alert",
      message: motorRunning
        ? "Motor start confirmed with normal current."
        : "Motor is stopped. Failure watch remains active.",
      icon: Power,
      tone: "text-(--fe-danger) bg-(--color-red-50)",
    },
  ];

  return (
    <section className="grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-4 shadow-sm">
        <h2 className="flex items-center gap-2 text-xl font-bold text-(--fe-text)">
          <Bell className="h-5 w-5 text-(--fe-danger)" />
          Farmer Alerts
        </h2>

        <div className="mt-5 grid gap-3">
          {alerts.map((alert) => {
            const Icon = alert.icon;

            return (
              <div
                key={alert.title}
                className="rounded-lg border border-(--fe-border) bg-(--fe-surface-muted) p-4"
              >
                <div className="flex items-start gap-3">
                  <span className={`rounded-lg p-2 ${alert.tone}`}>
                    <Icon className="h-5 w-5" />
                  </span>

                  <div>
                    <p className="font-bold text-(--fe-text)">
                      {alert.title}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-(--fe-text-muted)">
                      {alert.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-4 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-(--fe-text)">
              <Activity className="h-5 w-5 text-(--fe-accent-sky)" />
              Recent Sensor Activity
            </h2>

            <p className="mt-2 text-sm text-(--fe-text-muted)">
              Last checked {lastChecked}. Mode is{" "}
              {autoMode ? "auto" : "manual"}.
            </p>
          </div>

          <span className="rounded-lg bg-(--fe-primary-50) px-3 py-2 text-sm font-bold text-(--fe-primary-800)">
            {motorRunning ? "Motor ON" : "Motor OFF"}
          </span>
        </div>

        <div className="mt-5 overflow-hidden rounded-lg border border-(--fe-border)">
          {activityLog.map((entry) => (
            <div
              key={entry.id}
              className="grid gap-3 border-b border-(--fe-border) p-4 last:border-b-0 sm:grid-cols-[90px_1fr_90px]"
            >
              <span className="text-sm font-semibold text-(--fe-text-muted)">
                {entry.time}
              </span>

              <div>
                <p className="font-bold text-(--fe-text)">
                  {entry.status}
                </p>

                <p className="mt-1 text-sm leading-6 text-(--fe-text-muted)">
                  {entry.reason}
                </p>
              </div>

              <span className="text-sm font-bold text-(--fe-accent-sky)">
                {entry.level}% full
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlertsActivityPanels;