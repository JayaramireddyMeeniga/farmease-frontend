import React from "react";
import RoleModulePage from "../../_shared/RoleModulePage";
import { customerStats, customerTimeline } from "../../_shared/moduleConfigs";

const LiveTracking = () => (
  <RoleModulePage
    eyebrow="Customer Module"
    title="Live Farm-To-Home Tracking"
    description="Follow the delivery from farm pickup to apartment gate with live route status and freshness handling notes."
    accent="amber"
    stats={customerStats}
    actions={["View Route", "Call Partner", "Share Location", "Confirm Delivery"]}
    timeline={customerTimeline}
  />
);

export default LiveTracking;
