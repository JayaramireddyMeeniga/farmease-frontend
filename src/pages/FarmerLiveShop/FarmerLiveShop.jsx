import React from "react";
import FeatureModulePage from "../_shared/FeatureModulePage";

const FarmerLiveShop = () => (
  <FeatureModulePage
    eyebrow="Farmer Live Shop"
    title="Go live during harvest and accept instant fresh orders"
    description="A live commerce screen for farmers to show fresh vegetables, explain harvest quality, and receive live customer orders."
    theme="rose"
    primaryAction="Start Live Harvest"
    secondaryAction="View Live Orders"
    stats={[
      { label: "Live viewers", value: "1.2k", icon: "live" },
      { label: "Fresh orders", value: "86", icon: "users" },
      { label: "Harvest lots", value: "7", icon: "calendar" },
      { label: "Fast dispatch", value: "45m", icon: "truck" },
    ]}
    cards={[
      { title: "Harvest Live Stream", description: "Farmers can present tomatoes, mirchi, leafy greens, mangoes, and dairy in real time.", badge: "Live now", icon: "live" },
      { title: "Live Order Capture", description: "Customers can reserve produce while watching the harvest and choose delivery slots.", badge: "Instant order", icon: "users" },
      { title: "Fresh Today Dispatch", description: "Connect live orders to nearby delivery partners for rapid pickup from the farm.", badge: "Fast delivery", icon: "truck" },
    ]}
    listTitle="Live Shop Capabilities"
    listItems={["Go live during harvest", "Show fresh vegetables", "Accept live orders", "Pin product offers", "Display stock countdown", "Assign delivery after stream"]}
  />
);

export default FarmerLiveShop;
