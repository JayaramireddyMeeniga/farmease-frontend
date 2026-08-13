import React from "react";
import RoleModulePage from "../../_shared/RoleModulePage";
import { farmerStats, farmerTimeline } from "../../_shared/moduleConfigs";

const FarmerDelivery = () => (
  <RoleModulePage
    eyebrow="Farmer Module"
    title="Delivery Availability"
    description="Add pickup windows, apartment delivery support, cold storage needs, and farm gate pickup instructions."
    accent="green"
    stats={farmerStats}
    actions={["Add Delivery Slot", "Enable Apartment Delivery", "Request Cold Storage", "Set Pickup Address"]}
    timeline={farmerTimeline}
  />
);

export default FarmerDelivery;
