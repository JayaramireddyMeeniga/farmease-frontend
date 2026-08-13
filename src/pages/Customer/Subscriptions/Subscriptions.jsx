import React from "react";
import RoleModulePage from "../../_shared/RoleModulePage";
import { customerStats, customerTimeline } from "../../_shared/moduleConfigs";

const Subscriptions = () => (
  <RoleModulePage
    eyebrow="Customer Module"
    title="Weekly Basket Plans"
    description="Subscribe to weekly vegetable, fruit, milk, and organic produce baskets from trusted nearby farmers."
    accent="amber"
    stats={customerStats}
    actions={["Create Plan", "Change Basket", "Pause Week", "View Farm Updates"]}
    timeline={customerTimeline}
  />
);

export default Subscriptions;
