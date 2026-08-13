import React from "react";
import FeatureModulePage from "../_shared/FeatureModulePage";

const ApartmentDelivery = () => (
  <FeatureModulePage
    eyebrow="Apartment Delivery System"
    title="Bulk apartment orders with morning delivery slots"
    description="Apartment residents can subscribe to daily milk, weekly vegetables, and fruit combos while farmers deliver directly to apartment blocks."
    theme="emerald"
    primaryAction="Create Apartment Order"
    secondaryAction="Manage Subscription"
    stats={[
      { label: "Apartments", value: "18", icon: "apartment" },
      { label: "Morning slots", value: "42", icon: "calendar" },
      { label: "Bulk baskets", value: "310", icon: "users" },
      { label: "Direct routes", value: "12", icon: "truck" },
    ]}
    cards={[
      { title: "Bulk Apartment Orders", description: "Group customer needs by tower, block, and floor to reduce repeated delivery trips.", badge: "Bulk ready", icon: "apartment" },
      { title: "Morning Delivery Slots", description: "Schedule milk, vegetables, and fruit combos before office and school hours.", badge: "5 AM - 9 AM", icon: "calendar" },
      { title: "Apartment Management", description: "Track residents, subscription plans, delivery notes, and payment status in one module.", badge: "Managed", icon: "users" },
    ]}
    listTitle="Apartment Subscription Products"
    listItems={["Daily milk delivery", "Weekly vegetable basket", "Fruits combo", "Organic family basket", "Bulk society billing", "Floor-wise delivery notes"]}
  />
);

export default ApartmentDelivery;
