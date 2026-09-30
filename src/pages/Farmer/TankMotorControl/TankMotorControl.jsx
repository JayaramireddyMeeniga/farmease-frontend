import { useTankMotorStore } from "../../../store/useTankMotorStore";
import AlertsActivityPanels from "./AlertsActivityPanels";
import AutomationSafetyPanels from "./AutomationSafetyPanels";
import IrrigationPlanningPanels from "./IrrigationPlanningPanels";
import SavingsReportsPanels from "./SavingsReportsPanels";
import TankMotorHero from "./TankMotorHero";

const TankMotorControl = () => {
  const {
    tankLevel, motorRunning, autoMode, electricitySaved, waterSaved,
    motorHealth, lastChecked, activityLog, setTankLevel, toggleAutoMode, toggleMotor,
  } = useTankMotorStore();

  const tankData = {
    tankLevel, motorRunning, autoMode, electricitySaved, waterSaved, motorHealth, lastChecked, activityLog,
  };

  return (
    <main className="min-h-screen bg-(--fe-bg) p-4 text-(--fe-text)">
      <div className="mx-auto space-y-3">
        <TankMotorHero
          {...tankData} onTankLevelChange={setTankLevel} onAutoModeToggle={toggleAutoMode} onMotorToggle={toggleMotor}
        />

        <AutomationSafetyPanels {...tankData} />
        <IrrigationPlanningPanels />

        <AlertsActivityPanels
          tankLevel={tankLevel} motorRunning={motorRunning} autoMode={autoMode}
          activityLog={activityLog} lastChecked={lastChecked}
        />
        <SavingsReportsPanels
          electricitySaved={electricitySaved} waterSaved={waterSaved} motorHealth={motorHealth}
        />
      </div>
    </main>
  );
};

export default TankMotorControl;
