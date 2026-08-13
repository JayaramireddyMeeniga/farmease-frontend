import React from "react";
import FeatureModulePage from "../_shared/FeatureModulePage";

const SubscriptionDelivery = () => (
  <FeatureModulePage
    eyebrow="Subscription Delivery System"
    title="Monthly fresh baskets for daily vegetables and organic family needs"
    description="Customers can subscribe to Rs. 999 monthly daily vegetables or Rs. 1499 organic family baskets with predictable delivery."
    theme="violet"
    primaryAction="Subscribe Now"
    secondaryAction="Compare Plans"
    stats={[
      { label: "Monthly plans", value: "2", icon: "calendar" },
      { label: "Daily drops", value: "30", icon: "truck" },
      { label: "Family baskets", value: "Rs. 1499", icon: "users" },
      { label: "Veg plan", value: "Rs. 999", icon: "apartment" },
    ]}
    cards={[
      { title: "Rs. 999 Monthly", description: "Daily vegetable basket for small homes with seasonal produce and simple delivery.", badge: "Daily vegetables", icon: "calendar" },
      { title: "Rs. 1499 Organic Family Basket", description: "Organic vegetables, fruits, and farm updates for families needing larger weekly supply.", badge: "Organic family", icon: "users" },
      { title: "Delivery Scheduling", description: "Pause, resume, change quantity, and select morning or evening delivery windows.", badge: "Flexible", icon: "truck" },
    ]}
    listTitle="Subscription Controls"
    listItems={["Rs. 999/month daily vegetables", "Rs. 1499/month organic family basket", "Pause subscription", "Change basket size", "Morning delivery slot", "Apartment delivery support"]}
  />
);

export default SubscriptionDelivery;
