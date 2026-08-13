const sampleProducts = [
  {
    id: 1,
    title: "Tomato Seed Pack",
    subtitle: "High-yield hybrid variety",
    price: "₹450/packet",
    action: "View Product",
  },
  {
    id: 2,
    title: "Organic Fertilizer",
    subtitle: "NPK 12-32-16, 50 kg",
    price: "₹1,250",
    action: "Add to Cart",
  },
];

const sampleWarehouses = [
  {
    id: 1,
    name: "Green Cold Storage",
    distance: "4 KM Away",
    availability: "Available",
    action: "Book",
  },
  {
    id: 2,
    name: "Harvest Hub",
    distance: "6 KM Away",
    availability: "Limited Space",
    action: "View Details",
  },
];

const sampleTransport = [
  {
    id: 1,
    vehicle: "Mini Truck",
    capacity: "2 Tons",
    eta: "30 min",
    price: "₹1,800",
    action: "Book Now",
  },
  {
    id: 2,
    vehicle: "Pickup Van",
    capacity: "1 Ton",
    eta: "15 min",
    price: "₹1,200",
    action: "Book Now",
  },
];

const sampleWorkers = [
  {
    id: 1,
    name: "Ramesh",
    role: "Harvest Worker",
    experience: "5 Years",
    distance: "2 KM",
    wage: "₹700/day",
    action: "Hire",
  },
  {
    id: 2,
    name: "Mahesh",
    role: "Tractor Driver",
    experience: "4 Years",
    distance: "4 KM",
    wage: "₹850/day",
    action: "Hire",
  },
];

const sampleAnalytics = {
  revenue: 50000,
  expense: 32000,
  profit: 18000,
  bestCrop: "Tomato",
};

const intents = [
  {
    name: "warehouse_search",
    patterns: [/cold storage/i, /warehouse/i, /storage/i, /nearby storage/i],
    handler: () => [
      { type: "text", sender: "ai", text: "Found 2 nearby cold storage facilities for you." },
      { type: "warehouse_card", sender: "ai", cards: sampleWarehouses },
    ],
  },
  {
    name: "transport_search",
    patterns: [/transport/i, /truck/i, /vehicle/i, /pickup/i, /delivery/i],
    handler: () => [
      { type: "text", sender: "ai", text: "Here are transport options that can carry your produce." },
      { type: "transport_card", sender: "ai", cards: sampleTransport },
    ],
  },
  {
    name: "worker_search",
    patterns: [/worker|labor|labour|harvest|hire/i],
    handler: () => [
      { type: "text", sender: "ai", text: "I found nearby workers and equipment helpers for your farm." },
      { type: "worker_card", sender: "ai", cards: sampleWorkers },
    ],
  },
  {
    name: "product_search",
    patterns: [/seed|product|fertilizer|equipment|buy|purchase/i],
    handler: () => [
      { type: "text", sender: "ai", text: "I found products that match your request." },
      { type: "product_card", sender: "ai", cards: sampleProducts },
    ],
  },
  {
    name: "profit_analysis",
    patterns: [/profit|revenue|expense|analytics|report/i],
    handler: () => [
      {
        type: "text",
        sender: "ai",
        text: `This month your profit is ₹${sampleAnalytics.profit}. Your highest revenue came from ${sampleAnalytics.bestCrop} sales.`, 
      },
    ],
  },
  {
    name: "weather_query",
    patterns: [/weather|forecast|rain|temperature/i],
    handler: () => [
      { type: "text", sender: "ai", text: "Today is mostly sunny with a temperature around 30°C. Good conditions for irrigation and harvesting." },
    ],
  },
];

const fallbackResponse = [
  {
    type: "text",
    sender: "ai",
    text: "I can help with warehouse search, transport booking, product recommendations, worker hiring, profit analytics, weather updates, and crop advice. Try asking something like ‘Nearby cold storage’ or ‘What is my profit this month?’",
  },
];

export const samplePrompts = [
  "Show nearby cold storage",
  "Find transport for 3 tons",
  "Recommend fertilizer for tomatoes",
  "How much profit did I make this month?",
  "Find harvest workers near me",
];

export const getAiResponse = async (text) => {
  const normalized = text.trim();
  if (!normalized) {
    return [
      { type: "text", sender: "ai", text: "Please type a request so I can help you." },
    ];
  }

  const matched = intents.find((intent) =>
    intent.patterns.some((pattern) => pattern.test(normalized)),
  );

  return matched ? matched.handler() : fallbackResponse;
};
