import React from "react";
import RoleModulePage from "../../_shared/RoleModulePage";
import { deliveryStats, deliveryTimeline } from "../../_shared/moduleConfigs";

const DeliveryOrders = () => (
  <RoleModulePage
    eyebrow="Delivery Partner Module"
    title="Delivery Orders"
    description="See assigned orders, pickup addresses, apartment drop points, and cold storage requirements in one queue."
    accent="sky"
    stats={deliveryStats}
    actions={["Accept Batch", "Check Pickup Details", "Scan Package", "Update Status"]}
    timeline={deliveryTimeline}
  />
);

export default DeliveryOrders;
