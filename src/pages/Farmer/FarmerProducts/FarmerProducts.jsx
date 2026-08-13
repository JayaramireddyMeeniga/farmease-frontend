import React from "react";
import RoleModulePage from "../../_shared/RoleModulePage";
import { farmerStats, farmerTimeline } from "../../_shared/moduleConfigs";

const FarmerProducts = () => (
  <RoleModulePage
    eyebrow="Farmer Module"
    title="Product Upload & Stock"
    description="Add tomatoes, mirchi, mangoes, rice, milk, and organic vegetables with live stock, farm location, and delivery availability."
    accent="green"
    stats={farmerStats}
    actions={["Upload Product", "Manage Stock", "Set Organic Tag", "Update Price"]}
    timeline={farmerTimeline}
  />
);

export default FarmerProducts;
