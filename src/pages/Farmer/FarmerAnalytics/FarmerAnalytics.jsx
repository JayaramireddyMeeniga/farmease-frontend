import React from "react";
import RoleModulePage from "../../_shared/RoleModulePage";
import { farmerStats, farmerTimeline } from "../../_shared/moduleConfigs";

const FarmerAnalytics = () => (
  <RoleModulePage
    eyebrow="Farmer Module"
    title="Farm Sales Analytics"
    description="Understand demand by product, city, delivery window, crop season, and repeat customer subscriptions."
    accent="green"
    stats={farmerStats}
    actions={["View Sales Trends", "Compare Products", "Forecast Demand", "Export Report"]}
    timeline={farmerTimeline}
  />
);

export default FarmerAnalytics;
