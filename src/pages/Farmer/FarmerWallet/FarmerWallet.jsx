import React from "react";
import RoleModulePage from "../../_shared/RoleModulePage";
import { farmerStats, farmerTimeline } from "../../_shared/moduleConfigs";

const FarmerWallet = () => (
  <RoleModulePage
    eyebrow="Farmer Module"
    title="Farmer Earnings Wallet"
    description="Track completed settlements, pending payouts, subscription income, and product-wise earning performance."
    accent="green"
    stats={farmerStats}
    actions={["View Payouts", "Download Statement", "Check Pending Amount", "Link Bank Account"]}
    timeline={farmerTimeline}
  />
);

export default FarmerWallet;
