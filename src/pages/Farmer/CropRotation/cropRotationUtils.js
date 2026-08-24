export const cropColors = [
  "bg-[#e8f6ec] text-[#227341] ring-[#bfe2cc]",
  "bg-[#fff5da] text-[#8a5a00] ring-[#f4d27a]",
  "bg-[#edf4ff] text-[#236299] ring-[#bdd8f2]",
  "bg-[#f1ecff] text-[#6250a7] ring-[#d5c9ff]",
  "bg-[#fff0ed] text-[#bd412d] ring-[#f1c2b8]",
];

export const parseCropInput = (value) =>
  value
    .split(",")
    .map((crop) => crop.trim())
    .filter(Boolean);

export const getCropTone = (index) => cropColors[index % cropColors.length];

export const getRotationSummary = (rotations) => {
  const crops = rotations.flatMap((rotation) => rotation.crops);
  const uniqueCrops = new Set(crops);

  return {
    totalYears: rotations.length,
    totalCrops: crops.length,
    uniqueCrops: uniqueCrops.size,
  };
};
