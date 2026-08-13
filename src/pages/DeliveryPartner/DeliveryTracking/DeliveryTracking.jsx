import React from "react";
import RoleModulePage from "../../_shared/RoleModulePage";
import { deliveryStats, deliveryTimeline } from "../../_shared/moduleConfigs";

const DeliveryTracking = () => (
  <RoleModulePage
    eyebrow="Delivery Partner Module"
    title="Route Tracking"
    description="Navigate from farm pickup to customer doorstep with route checkpoints, proof of delivery, and delay updates."
    accent="sky"
    stats={deliveryStats}
    actions={["Open Route", "Update ETA", "Add Proof", "Report Delay"]}
    timeline={deliveryTimeline}
  />
);

export default DeliveryTracking;
