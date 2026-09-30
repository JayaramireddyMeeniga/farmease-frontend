export const FULL_TANK_LEVEL = 95;
export const MIN_TANK_LEVEL = 20;

export const cropRules = [
  {
    crop: "Cotton",
    zone: "North drip line",
    rule: "45 minutes before sunrise",
    nextRun: "Tomorrow, 6:00 AM",
    moisture: "Good",
  },
  {
    crop: "Mirchi",
    zone: "Rows 4-8",
    rule: "25 minutes when soil is dry",
    nextRun: "Today, 5:30 PM",
    moisture: "Needs water",
  },
  {
    crop: "Paddy",
    zone: "Low field",
    rule: "Keep shallow standing water",
    nextRun: "Paused for rain check",
    moisture: "Wet",
  },
  {
    crop: "Vegetables",
    zone: "Kitchen plot",
    rule: "15 minutes by plant row",
    nextRun: "Tomorrow, 7:15 AM",
    moisture: "Good",
  },
];

export const irrigationZones = [
  { name: "Field 1", detail: "Cotton block", status: "Ready", flow: "22 L/min" },
  { name: "Field 2", detail: "Mirchi rows", status: "Watering", flow: "16 L/min" },
  { name: "Row 7", detail: "Single row drip", status: "Queued", flow: "5 L/min" },
  { name: "Borewell B", detail: "Backup source", status: "Standby", flow: "0 L/min" },
];

export const motorFleet = [
  { name: "Main Bore Motor", tank: "House tank", status: "Online", level: 72 },
  { name: "Field Pump", tank: "Drip storage", status: "Manual", level: 44 },
  { name: "Backup Motor", tank: "Well line", status: "Offline", level: 0 },
];

export const reportRows = [
  { period: "Today", water: "3,420 L", runtime: "2h 15m", savings: "18 kWh" },
  { period: "This week", water: "18,900 L", runtime: "12h 40m", savings: "74 kWh" },
  { period: "This month", water: "81,300 L", runtime: "48h 20m", savings: "296 kWh" },
];
