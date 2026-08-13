import { create } from "zustand";

const FULL_TANK_LEVEL = 95;

const buildLogEntry = (level, motorRunning, reason) => ({
  id: crypto.randomUUID(),
  time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  level,
  status: motorRunning ? "Motor ON" : "Motor OFF",
  reason,
});

export const useTankMotorStore = create((set) => ({
  tankLevel: 72,
  motorRunning: true,
  autoMode: true,
  electricitySaved: 18,
  waterSaved: 420,
  motorHealth: 94,
  lastChecked: "Just now",
  activityLog: [
    {
      id: "initial-check",
      time: "09:20 AM",
      level: 72,
      status: "Motor ON",
      reason: "Tank filling under safe limit",
    },
  ],

  setTankLevel: (level) =>
    set((state) => {
      const nextLevel = Number(level);
      const isFull = nextLevel >= FULL_TANK_LEVEL;
      const shouldStopMotor = state.autoMode && isFull;
      const nextMotorRunning = shouldStopMotor ? false : state.motorRunning;
      const reason = shouldStopMotor
        ? "Tank full detected. Automatic OFF activated."
        : "Water level sensor updated the tank reading.";

      return {
        tankLevel: nextLevel,
        motorRunning: nextMotorRunning,
        lastChecked: "Just now",
        electricitySaved: shouldStopMotor
          ? state.electricitySaved + 2
          : state.electricitySaved,
        waterSaved: shouldStopMotor ? state.waterSaved + 35 : state.waterSaved,
        motorHealth: shouldStopMotor
          ? Math.min(100, state.motorHealth + 1)
          : state.motorHealth,
        activityLog: [
          buildLogEntry(nextLevel, nextMotorRunning, reason),
          ...state.activityLog,
        ].slice(0, 4),
      };
    }),

  toggleAutoMode: () =>
    set((state) => {
      const nextAutoMode = !state.autoMode;
      const shouldStopMotor = nextAutoMode && state.tankLevel >= FULL_TANK_LEVEL;

      return {
        autoMode: nextAutoMode,
        motorRunning: shouldStopMotor ? false : state.motorRunning,
        activityLog: [
          buildLogEntry(
            state.tankLevel,
            shouldStopMotor ? false : state.motorRunning,
            nextAutoMode
              ? "Automatic control enabled."
              : "Manual control enabled."
          ),
          ...state.activityLog,
        ].slice(0, 4),
      };
    }),

  toggleMotor: () =>
    set((state) => {
      const canStart = state.tankLevel < FULL_TANK_LEVEL || !state.autoMode;
      const nextMotorRunning = state.motorRunning ? false : canStart;
      const reason =
        !state.motorRunning && !canStart
          ? "Start blocked because tank is full."
          : nextMotorRunning
            ? "Motor started manually."
            : "Motor stopped manually.";

      return {
        motorRunning: nextMotorRunning,
        activityLog: [
          buildLogEntry(state.tankLevel, nextMotorRunning, reason),
          ...state.activityLog,
        ].slice(0, 4),
      };
    }),
}));

