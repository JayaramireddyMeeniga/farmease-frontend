import React from "react";
import RoleModulePage from "../../_shared/RoleModulePage";
import { farmerStats, farmerTimeline } from "../../_shared/moduleConfigs";

const FarmerSubscription = () => (
  <RoleModulePage
    eyebrow="Farmer Module"
    title="Weekly Basket Subscriptions"
    description="Create recurring vegetable, fruit, milk, and rice bundles for customers who want reliable weekly freshness."
    accent="green"
    stats={farmerStats}
    actions={["Create Basket", "Manage Subscribers", "Schedule Harvest", "Pause Subscription"]}
    timeline={farmerTimeline}
  />
);

export default FarmerSubscription;
