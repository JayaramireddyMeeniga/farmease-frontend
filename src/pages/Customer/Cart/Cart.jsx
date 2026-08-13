import React from "react";
import RoleModulePage from "../../_shared/RoleModulePage";
import { customerStats, customerTimeline } from "../../_shared/moduleConfigs";

const Cart = () => (
  <RoleModulePage
    eyebrow="Customer Module"
    title="Fresh Cart"
    description="Review farm-direct products, check organic labels, confirm delivery options, and move to checkout."
    accent="amber"
    stats={customerStats}
    actions={["Update Quantity", "Apply Basket Plan", "Check Delivery Fee", "Proceed Checkout"]}
    timeline={customerTimeline}
  />
);

export default Cart;
