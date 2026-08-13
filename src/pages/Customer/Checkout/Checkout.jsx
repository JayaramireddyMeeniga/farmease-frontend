import React from "react";
import RoleModulePage from "../../_shared/RoleModulePage";
import { customerStats, customerTimeline } from "../../_shared/moduleConfigs";

const Checkout = () => (
  <RoleModulePage
    eyebrow="Customer Module"
    title="Checkout & Delivery"
    description="Choose apartment or home delivery, confirm cold storage items, and place the order with secure payment."
    accent="amber"
    stats={customerStats}
    actions={["Select Address", "Choose Time Slot", "Pay Securely", "Place Order"]}
    timeline={customerTimeline}
  />
);

export default Checkout;
