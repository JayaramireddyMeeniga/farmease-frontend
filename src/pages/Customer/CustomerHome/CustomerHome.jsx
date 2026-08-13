import React from "react";
import RoleModulePage from "../../_shared/RoleModulePage";
import { customerStats, customerTimeline } from "../../_shared/moduleConfigs";

const CustomerHome = () => (
  <RoleModulePage
    eyebrow="Customer Module"
    title="Nearby Fresh Farm Market"
    description="Search local farmers, browse fresh vegetables and fruits, view farm updates, and start a doorstep order."
    accent="amber"
    stats={customerStats}
    actions={["Search Farmers", "Browse Vegetables", "View Farm Updates", "Start Weekly Basket"]}
    timeline={customerTimeline}
  />
);

export default CustomerHome;
