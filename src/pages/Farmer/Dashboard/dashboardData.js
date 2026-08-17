export const API_KEY = "67db61b81ac836498e2a916253fcb7c6";

export const crops = [
  { id: 1, name: "Wheat", area: "10 acres", status: "Growing", health: 88 },
  { id: 2, name: "Corn", area: "5 acres", status: "Harvested", health: 94 },
  { id: 3, name: "Rice", area: "8 acres", status: "Planted", health: 76 },
  { id: 4, name: "Soybean", area: "3 acres", status: "Growing", health: 82 },
];

export const orders = [
  { id: 1, product: "Organic Seeds", status: "Delivered", date: "2024-10-01" },
  { id: 2, product: "Fertilizer Pack", status: "In Transit", date: "2024-09-28" },
  { id: 3, product: "Harvester Machine", status: "Processing", date: "2024-09-25" },
  { id: 4, product: "Irrigation System", status: "Delivered", date: "2024-09-20" },
];

export const dealers = [
  { id: 1, name: "Green Farms", contact: "greenfarms@example.com" },
  { id: 2, name: "Agri Solutions", contact: "agrisolutions@example.com" },
  { id: 3, name: "Farm Connect", contact: "farmconnect@example.com" },
  { id: 4, name: "Crop Masters", contact: "cropmasters@example.com" },
];

export const financialSummary = {
  totalIncome: "Rs. 15,000",
  totalExpenses: "Rs. 7,500",
  netBalance: "Rs. 7,500",
  recentTransactions: [
    { id: 1, description: "Sold Wheat", amount: "Rs. 5,000", date: "2024-10-10", type: "income" },
    { id: 2, description: "Purchased Fertilizer", amount: "Rs. 1,000", date: "2024-10-05", type: "expense" },
    { id: 3, description: "Sold Corn", amount: "Rs. 3,000", date: "2024-10-01", type: "income" },
  ],
};

export const dailyTips = [
  "Irrigate tomato beds before 9 AM to reduce heat stress.",
  "Check mirchi leaves for thrips after humid nights.",
  "Move leafy greens into cold transport quickly after harvest.",
];

export const marketPrices = [
  { crop: "Tomato", price: "Rs. 45/kg", trend: "+12%", market: "Hyderabad" },
  { crop: "Green Mirchi", price: "Rs. 72/kg", trend: "+6%", market: "Vijayawada" },
  { crop: "Mango", price: "Rs. 160/kg", trend: "+18%", market: "Rajahmundry" },
  { crop: "Rice", price: "Rs. 68/kg", trend: "-2%", market: "Warangal" },
];

export const aiRecommendations = [
  "List tomatoes today: nearby marketplace demand is high.",
  "Use cold storage for mangoes during afternoon heat.",
  "Increase mirchi price by 4% if stock stays below 50 kg.",
];

export const statusStyles = {
  Delivered: "bg-(--fe-bg-soft) text-(--fe-primary-700)",
  "In Transit": "bg-(--fe-primary-50) text-(--fe-accent-sky)",
  Processing: "bg-(--fe-primary-100) text-(--fe-primary-800)",
  Cancelled: "bg-(--color-red-100) text-(--fe-danger)",
};

export const cropStatusStyles = {
  Growing: "bg-(--fe-bg-soft) text-(--fe-primary-700)",
  Harvested: "bg-(--fe-primary-50) text-(--fe-accent-sky)",
  Planted: "bg-(--fe-primary-100) text-(--fe-primary-800)",
};
