import React from "react";
import RoleModulePage from "../../_shared/RoleModulePage";
import { customerStats, customerTimeline } from "../../_shared/moduleConfigs";

const Orders = () => (
  <RoleModulePage
    eyebrow="Customer Module"
    title="Customer Orders"
    description="Track current and previous farm orders, reorder favorites, and check delivery partner progress."
    accent="amber"
    stats={customerStats}
    actions={["Track Order", "Reorder Basket", "Rate Farmer", "Contact Support"]}
    timeline={customerTimeline}
  />
);

export default Orders;
