import React from "react";
import RoleModulePage from "../../_shared/RoleModulePage";
import { deliveryStats, deliveryTimeline } from "../../_shared/moduleConfigs";

const DeliveryWallet = () => (
  <RoleModulePage
    eyebrow="Delivery Partner Module"
    title="Delivery Wallet"
    description="Track trip earnings, cold storage bonuses, apartment delivery incentives, and settlement history."
    accent="sky"
    stats={deliveryStats}
    actions={["View Earnings", "Withdraw Amount", "Check Incentives", "Download Statement"]}
    timeline={deliveryTimeline}
  />
);

export default DeliveryWallet;
