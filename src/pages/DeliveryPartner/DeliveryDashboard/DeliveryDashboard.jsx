import React from "react";
import RoleModulePage from "../../_shared/RoleModulePage";
import { deliveryStats, deliveryTimeline } from "../../_shared/moduleConfigs";

const DeliveryDashboard = () => (
  <RoleModulePage
    eyebrow="Delivery Partner Module"
    title="Delivery Partner Dashboard"
    description="Accept farm pickups, handle apartment deliveries, manage cold storage transport, and track route workload."
    accent="sky"
    stats={deliveryStats}
    actions={["Accept Delivery", "View Pickup Queue", "Start Route", "Mark Delivered"]}
    timeline={deliveryTimeline}
  />
);

export default DeliveryDashboard;
