import React from "react";

const CropStatCard = ({ label, value }) => (
  <div className="rounded-lg bg-white/12 p-3 ring-1 ring-white/15">
    <p className="text-sm text-green-50/80">{label}</p>
    <p className="mt-1 text-xl font-semibold">{value}</p>
  </div>
);

const CropStats = ({ cropCount, totalArea, growingCount, harvestedCount }) => (
  <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
    <CropStatCard label="Total crops" value={cropCount} />
    <CropStatCard label="Cultivated area" value={`${totalArea} acres`} />
    <CropStatCard label="Growing now" value={growingCount} />
    <CropStatCard label="Harvested" value={harvestedCount} />
  </div>
);

export default CropStats;
