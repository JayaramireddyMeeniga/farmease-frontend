import React from "react";
import FeatureModulePage from "../_shared/FeatureModulePage";

const ColdStorageSearch = () => (
  <FeatureModulePage
    eyebrow="Cold Storage Search"
    title="Find nearby cold storage, warehouse slots, and refrigerated transport"
    description="Use GeoLocation-ready search for nearby cold rooms, OpenStreetMap or Google Maps API integration points, warehouse booking, and chilled delivery routes."
    theme="blue"
    primaryAction="Search Nearby Storage"
    secondaryAction="Book Warehouse"
    stats={[
      { label: "Nearby stores", value: "9", icon: "map" },
      { label: "Cold vehicles", value: "14", icon: "truck" },
      { label: "Open slots", value: "62", icon: "cold" },
      { label: "Map search", value: "Live", icon: "search" },
    ]}
    cards={[
      { title: "Nearby Cold Storage", description: "Search by location, crop type, distance, capacity, and temperature range.", badge: "Geo ready", icon: "map" },
      { title: "Warehouse Booking", description: "Reserve short-term or monthly warehouse space for mangoes, milk, flowers, and vegetables.", badge: "Slot booking", icon: "cold" },
      { title: "Refrigerated Transport", description: "Assign cold-chain vehicles for dairy, fruit, flowers, and leafy vegetables.", badge: "Chilled route", icon: "truck" },
    ]}
    listTitle="Map Integration Points"
    listItems={["Browser GeoLocation", "OpenStreetMap location search", "Google Maps API compatible data model", "Warehouse capacity booking", "Cold vehicle assignment", "Temperature range filters"]}
  />
);

export default ColdStorageSearch;
