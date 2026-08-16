export const languages = ["English", "Telugu", "Hindi", "Tamil", "Kannada"];

export const dailyTips = [
  {
    _id: "tip_001",
    title: "Best Time for Irrigation",
    description: "Irrigate tomato crops early morning to reduce evaporation loss.",
    category: "Water Management",
    crop: "Tomato",
    season: "Summer",
    language: "English",
    videoUrl: "",
    image: "",
    createdAt: "2026-05-24",
  },
  {
    _id: "tip_002",
    title: "Protect Tomato Crops",
    description: "Use neem oil spray to prevent leaf curl disease and check the underside of leaves twice a week.",
    category: "Disease Prevention",
    crop: "Tomato",
    season: "Summer",
    language: "English",
    videoUrl: "",
    image: "",
    createdAt: "2026-05-24",
  },
  {
    _id: "tip_003",
    title: "Delay Fertilizer Before Rain",
    description: "Heavy rain can wash away fertilizer. Apply after the rain when the soil is moist but not flooded.",
    category: "Weather Advisory",
    crop: "Rice",
    season: "Kharif",
    language: "English",
    videoUrl: "",
    image: "",
    createdAt: "2026-05-24",
  },
];

export const cropGuidance = [
  {
    crop: "Rice",
    temperature: "25-35 C",
    waterLevel: "High",
    soilType: "Clay",
    recommendedSeason: "Kharif",
    fertilizer: "Use nitrogen in split doses after transplanting.",
    irrigation: "Maintain shallow standing water during early growth.",
    disease: "Watch for blast disease after cloudy humid days.",
    harvest: "Harvest when 80-85% grains turn golden.",
  },
  {
    crop: "Tomato",
    temperature: "20-30 C",
    waterLevel: "Medium",
    soilType: "Well-drained loam",
    recommendedSeason: "Rabi and Summer",
    fertilizer: "Apply compost every 15 days and add potash at flowering.",
    irrigation: "Use drip irrigation to keep soil moisture steady.",
    disease: "Use neem oil and remove infected leaf curl plants early.",
    harvest: "Harvest at breaker stage for transport.",
  },
  {
    crop: "Mirchi",
    temperature: "20-32 C",
    waterLevel: "Medium",
    soilType: "Sandy loam",
    recommendedSeason: "Kharif",
    fertilizer: "Add organic manure before transplanting.",
    irrigation: "Avoid waterlogging near roots.",
    disease: "Monitor thrips and mites in dry weather.",
    harvest: "Pick mature green pods every 7-10 days.",
  },
  {
    crop: "Mango",
    temperature: "24-36 C",
    waterLevel: "Low to medium",
    soilType: "Deep well-drained soil",
    recommendedSeason: "Summer harvest",
    fertilizer: "Apply farmyard manure after harvest.",
    irrigation: "Irrigate during fruit development, avoid excess water at flowering.",
    disease: "Prevent powdery mildew with timely organic spray.",
    harvest: "Harvest mature fruits with stalk attached.",
  },
  {
    crop: "Cotton",
    temperature: "21-35 C",
    waterLevel: "Medium",
    soilType: "Black cotton soil",
    recommendedSeason: "Kharif",
    fertilizer: "Balance nitrogen with phosphorus and potassium.",
    irrigation: "Critical irrigation needed during flowering and boll formation.",
    disease: "Use pheromone traps for bollworm monitoring.",
    harvest: "Pick clean opened bolls in dry weather.",
  },
];

export const weatherTips = [
  "Heavy rain expected tomorrow. Avoid pesticide spraying today.",
  "High afternoon temperature. Irrigate early morning or evening.",
  "Cloudy weather may increase fungal risk. Improve airflow around crops.",
  "Strong wind alert. Support young banana, tomato, and cotton plants.",
];

export const organicTips = [
  "Use compost and farmyard manure to build soil carbon.",
  "Neem oil spray can reduce sucking pests in vegetables.",
  "Mulching saves water and suppresses weeds naturally.",
  "Rotate legumes with cereals to improve nitrogen availability.",
];

export const governmentSchemes = [
  { name: "PM-KISAN", benefit: "Direct income support for eligible farmers" },
  { name: "PMFBY Crop Insurance", benefit: "Insurance support against crop loss" },
  { name: "Soil Health Card", benefit: "Soil nutrient advice and fertilizer planning" },
  { name: "Micro Irrigation Subsidy", benefit: "Support for drip and sprinkler systems" },
];

export const videoTips = [
  { title: "Drip irrigation basics", topic: "Water saving", duration: "8 min" },
  { title: "Organic tomato farming", topic: "Organic farming", duration: "12 min" },
  { title: "Pest control with neem", topic: "Pest control", duration: "6 min" },
  { title: "Rice nursery preparation", topic: "Crop guidance", duration: "10 min" },
];

export const aiRecommendations = [
  "Based on your soil and weather, tomato crop is recommended this season.",
  "Delay fertilizer application if rain probability is high tomorrow.",
  "Market trend is strong for mirchi. List fresh stock today.",
  "Upload leaf images for future AI disease detection workflow.",
];

export const expertAdvice = [
  {
    question: "Why are my tomato leaves turning yellow?",
    answer: "Possible nitrogen deficiency, water stress, or early disease. Check soil moisture and apply compost or balanced fertilizer.",
  },
  {
    question: "When should I spray pesticide?",
    answer: "Avoid spraying before rain or during strong wind. Early morning is usually safer for crops and workers.",
  },
  {
    question: "Which crop is better in clay soil?",
    answer: "Rice performs well in clay soil where water retention is high.",
  },
];
