export const FULL_DAY_HOURS = 8;

export const defaultWorkTime = {
  fromTime: "08:00",
  toTime: "16:00",
};

export const cropMarketRates = [
  { crop: "Cotton", marketPrice: 8000, unit: "100 kg", laborShare: 0.06 },
  { crop: "Mirchi", marketPrice: 12000, unit: "100 kg", laborShare: 0.075 },
  { crop: "Corn", marketPrice: 2200, unit: "100 kg", laborShare: 0.06 },
  { crop: "Paddy", marketPrice: 2800, unit: "100 kg", laborShare: 0.058 },
  { crop: "Wheat", marketPrice: 2600, unit: "100 kg", laborShare: 0.055 },
  { crop: "Soybean", marketPrice: 4600, unit: "100 kg", laborShare: 0.06 },
  { crop: "Tomato", marketPrice: 3200, unit: "100 kg", laborShare: 0.08 },
  { crop: "Onion", marketPrice: 3000, unit: "100 kg", laborShare: 0.065 },
  { crop: "Turmeric", marketPrice: 14500, unit: "100 kg", laborShare: 0.07 },
  { crop: "Sugarcane", marketPrice: 360, unit: "ton", laborShare: 0.12 },
];

export const taskTypes = [
  { name: "Harvesting", multiplier: 1.1 },
  { name: "Planting", multiplier: 0.95 },
  { name: "Weeding", multiplier: 0.9 },
  { name: "Irrigation", multiplier: 0.82 },
  { name: "Cotton Picking", multiplier: 1.2 },
  { name: "Crop Monitoring", multiplier: 0.75 },
  { name: "Fertilizer Application", multiplier: 1 },
];

export const availableLocations = [
  "North Field District",
  "South Agricultural Zone",
  "East Farming Region",
  "West Cultivation Area",
  "Central Plantation District",
];

export const mockLaborers = [
  {
    id: 1,
    name: "John Doe",
    phone: "1234567890",
    rating: 4.8,
    expertise: ["Harvesting", "Planting", "Cotton Picking"],
    availability: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "2345678901",
    rating: 4.5,
    expertise: ["Weeding", "Harvesting"],
    availability: true,
  },
  {
    id: 3,
    name: "Robert Brown",
    phone: "3456789012",
    rating: 4.9,
    expertise: ["Cotton Picking", "Irrigation"],
    availability: true,
  },
  {
    id: 4,
    name: "Mary Johnson",
    phone: "4567890123",
    rating: 4.2,
    expertise: ["Planting", "Fertilizer Application"],
    availability: true,
  },
  {
    id: 5,
    name: "David Wilson",
    phone: "5678901234",
    rating: 4.7,
    expertise: ["Crop Monitoring", "Harvesting"],
    availability: true,
  },
];
