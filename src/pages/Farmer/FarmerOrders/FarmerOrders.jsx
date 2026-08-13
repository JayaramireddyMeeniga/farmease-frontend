import React from "react";
import RoleModulePage from "../../_shared/RoleModulePage";
import { farmerStats, farmerTimeline } from "../../_shared/moduleConfigs";

const FarmerOrders = () => (
  <RoleModulePage
    eyebrow="Farmer Module"
    title="Orders To Accept"
    description="Review customer orders, accept or reject requests, prepare pickup notes, and monitor delivery partner assignment."
    accent="green"
    stats={farmerStats}
    actions={["Accept Order", "Reject Order", "Print Pickup Note", "Message Customer"]}
    timeline={farmerTimeline}
  />
);

export default FarmerOrders;
