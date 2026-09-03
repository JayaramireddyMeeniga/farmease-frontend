import React from "react";
import { Users } from "lucide-react";
import ModuleHeader from "../../../components/ui/ModuleHeader";
import { formatCurrency } from "./workforceCalculations";

const WorkforceHeader = ({
  selectedCrop, marketPrice, cropUnit, workTime, recommendedDailyCoolie, bookingTotal,
}) => (
  <ModuleHeader
    title="Agri Workforce"
    description="Book farm workers with a recommended daily coolie amount based on crop, task, current market price, and shift time."
    badge="Labor rate planner"
    badgeIcon={Users}
  >
    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/15">
        <p className="text-xs font-semibold uppercase text-green-50/75">Crop</p>
        <p className="mt-2 text-xl font-semibold">{selectedCrop}</p>
      </div>
      <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/15">
        <p className="text-xs font-semibold uppercase text-green-50/75">
          Market price
        </p>
        <p className="mt-2 text-xl font-semibold">
          {formatCurrency(marketPrice)} / {cropUnit}
        </p>
      </div>
      <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/15">
        <p className="text-xs font-semibold uppercase text-green-50/75">
          Shift time
        </p>
        <p className="mt-2 text-xl font-semibold">
          {workTime.fromTime} - {workTime.toTime}
        </p>
      </div>
      <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/15">
        <p className="text-xs font-semibold uppercase text-green-50/75">
          Daily coolie
        </p>
        <p className="mt-2 text-xl font-semibold">
          {formatCurrency(recommendedDailyCoolie)}
        </p>
      </div>
      <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/15">
        <p className="text-xs font-semibold uppercase text-green-50/75">
          Booking total
        </p>
        <p className="mt-2 text-xl font-semibold">
          {formatCurrency(bookingTotal)}
        </p>
      </div>
    </div>
  </ModuleHeader>
);

export default WorkforceHeader;
