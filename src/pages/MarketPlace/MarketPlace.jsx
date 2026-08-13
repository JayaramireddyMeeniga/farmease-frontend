import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Leaf,
  MapPin,
  Package,
  Search,
  ShieldCheck,
  ShoppingBasket,
  SlidersHorizontal,
  Snowflake,
  Truck,
} from "lucide-react";

const farmerProducts = [
  {
    id: 1,
    farmerId: "farmer_001",
    farmerName: "Ramesh Farms",
    productName: "Fresh Tomato",
    category: "Vegetables",
    price: 45,
    quantity: "5 KG",
    city: "Hyderabad",
    organic: true,
    image: "",
    deliveryAvailable: true,
    apartmentDelivery: true,
    coldStorage: false,
    freshToday: true,
    distanceKm: 8,
    deliveryMinutes: 35,
  },
  {
    id: 2,
    farmerId: "farmer_002",
    farmerName: "Anitha Agro",
    productName: "Green Mirchi",
    category: "Vegetables",
    price: 72,
    quantity: "2 KG",
    city: "Vijayawada",
    organic: true,
    image: "",
    deliveryAvailable: true,
    apartmentDelivery: true,
    coldStorage: false,
    freshToday: true,
    distanceKm: 18,
    deliveryMinutes: 45,
  },
  {
    id: 3,
    farmerId: "farmer_003",
    farmerName: "Godavari Mango Yard",
    productName: "Banganapalli Mango",
    category: "Fruits",
    price: 160,
    quantity: "3 KG",
    city: "Rajahmundry",
    organic: false,
    image: "",
    deliveryAvailable: true,
    apartmentDelivery: true,
    coldStorage: true,
    freshToday: true,
    distanceKm: 42,
    deliveryMinutes: 95,
  },
  {
    id: 4,
    farmerId: "farmer_004",
    farmerName: "Lakshmi Paddy Farm",
    productName: "Sona Masoori Rice",
    category: "Grains",
    price: 68,
    quantity: "10 KG",
    city: "Warangal",
    organic: false,
    image: "",
    deliveryAvailable: true,
    apartmentDelivery: false,
    coldStorage: false,
    freshToday: false,
    distanceKm: 55,
    deliveryMinutes: 120,
  },
  {
    id: 5,
    farmerId: "farmer_005",
    farmerName: "Village Dairy Co-op",
    productName: "Fresh Cow Milk",
    category: "Dairy",
    price: 64,
    quantity: "1 Litre",
    city: "Hyderabad",
    organic: true,
    image: "",
    deliveryAvailable: true,
    apartmentDelivery: true,
    coldStorage: true,
    freshToday: true,
    distanceKm: 6,
    deliveryMinutes: 25,
  },
  {
    id: 6,
    farmerId: "farmer_006",
    farmerName: "Green Basket Farms",
    productName: "Organic Vegetables",
    category: "Vegetables",
    price: 220,
    quantity: "Weekly Basket",
    city: "Secunderabad",
    organic: true,
    image: "",
    deliveryAvailable: true,
    apartmentDelivery: true,
    coldStorage: false,
    freshToday: true,
    distanceKm: 12,
    deliveryMinutes: 40,
  },
  {
    id: 7,
    farmerId: "farmer_007",
    farmerName: "Bloom Valley Farm",
    productName: "Fresh Marigold Flowers",
    category: "Flowers",
    price: 90,
    quantity: "100 Stems",
    city: "Hyderabad",
    organic: false,
    image: "",
    deliveryAvailable: true,
    apartmentDelivery: true,
    coldStorage: true,
    freshToday: true,
    distanceKm: 14,
    deliveryMinutes: 50,
  },
  {
    id: 8,
    farmerId: "farmer_008",
    farmerName: "Pure Roots Organics",
    productName: "Organic Family Basket",
    category: "Organic",
    price: 320,
    quantity: "Family Pack",
    city: "Kompally",
    organic: true,
    image: "",
    deliveryAvailable: true,
    apartmentDelivery: true,
    coldStorage: false,
    freshToday: true,
    distanceKm: 20,
    deliveryMinutes: 55,
  },
];

const productVisuals = {
  Vegetables: "from-emerald-200 via-lime-100 to-white",
  Fruits: "from-amber-200 via-orange-100 to-white",
  Grains: "from-yellow-200 via-stone-100 to-white",
  Dairy: "from-sky-100 via-white to-cyan-100",
  Flowers: "from-rose-200 via-pink-100 to-white",
  Organic: "from-green-200 via-emerald-100 to-white",
};

const smartFilters = [
  { id: "organic", label: "Organic" },
  { id: "nearby", label: "Nearby farms" },
  { id: "freshToday", label: "Fresh today" },
  { id: "lowPrice", label: "Low price" },
  { id: "fastDelivery", label: "Fast delivery" },
];

const Marketplace = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFilters, setActiveFilters] = useState([]);

  const categories = useMemo(
    () => [
      "All",
      ...new Set(farmerProducts.map((product) => product.category)),
    ],
    [],
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return farmerProducts.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;
      const matchesQuery =
        !normalizedQuery ||
        [
          product.productName,
          product.farmerName,
          product.city,
          product.category,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesSmartFilters = activeFilters.every((filter) => {
        if (filter === "organic") return product.organic;
        if (filter === "nearby") return product.distanceKm <= 25;
        if (filter === "freshToday") return product.freshToday;
        if (filter === "lowPrice") return product.price <= 90;
        if (filter === "fastDelivery") return product.deliveryMinutes <= 60;
        return true;
      });

      return matchesCategory && matchesQuery && matchesSmartFilters;
    });
  }, [activeCategory, activeFilters, query]);

  const toggleSmartFilter = (filterId) => {
    setActiveFilters((current) =>
      current.includes(filterId)
        ? current.filter((item) => item !== filterId)
        : [...current, filterId],
    );
  };

  return (
    <section className="min-h-screen bg-[#f4f7ef] px-4 py-5 text-slate-900 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="overflow-hidden rounded-lg bg-slate-950 text-white shadow-2xl shadow-green-950/20"
      >
        <div className="grid gap-8 px-5 py-8 md:grid-cols-[1.15fr_0.85fr] md:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-green-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-100">
              <Leaf size={14} />
              Smart marketplace
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
              Buy fresh produce straight from nearby farms
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Filter by organic produce, fresh-today stock, nearby farms, low
              price, and fast delivery across vegetables, fruits, dairy, grains,
              flowers, and organic baskets.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Farmers live", value: "42+" },
                { label: "Fresh listings", value: farmerProducts.length },
                { label: "Fast delivery", value: "25 min" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-white/10 bg-white/8 p-4"
                >
                  <p className="text-2xl font-bold text-white">{item.value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/8 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-400 text-green-950">
                <SlidersHorizontal size={21} />
              </span>
              <div>
                <h2 className="font-bold">Smart Filters</h2>
                <p className="text-xs text-slate-400">
                  Distance, freshness, price, and delivery speed
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {smartFilters.map((filter, index) => (
                <motion.div
                  key={filter.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * index, duration: 0.3 }}
                  className="rounded-lg bg-white/8 px-3 py-3 text-sm font-semibold"
                >
                  {filter.label}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="relative block">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tomato, farmer, city, organic basket..."
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition duration-300 ${
                  activeCategory === category
                    ? "bg-green-700 text-white shadow-md shadow-green-900/15"
                    : "bg-slate-100 text-slate-700 hover:bg-green-50 hover:text-green-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          {smartFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => toggleSmartFilter(filter.id)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition duration-300 ${
                activeFilters.includes(filter.id)
                  ? "bg-slate-950 text-white"
                  : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product, index) => (
          <motion.article
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200"
          >
            <div
              className={`relative h-40 bg-gradient-to-br ${productVisuals[product.category] || productVisuals.Vegetables}`}
            >
              <div className="absolute left-4 top-4 flex gap-2">
                {product.organic && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-700 px-3 py-1 text-xs font-semibold text-white">
                    <Leaf size={13} />
                    Organic
                  </span>
                )}
                {product.coldStorage && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-700 px-3 py-1 text-xs font-semibold text-white">
                    <Snowflake size={13} />
                    Cold
                  </span>
                )}
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {product.category}
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-950">
                    {product.productName}
                  </h2>
                </div>
                <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/85 text-green-800 shadow-sm">
                  <Package size={28} />
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-950">
                    {product.farmerName}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                    <MapPin size={15} />
                    {product.city}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-800">
                    Rs. {product.price}
                  </p>
                  <p className="text-xs font-semibold text-slate-500">
                    {product.quantity}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold">
                <span className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-3 py-2 text-green-800">
                  <Truck size={14} />
                  {product.deliveryAvailable ? "Delivery ready" : "Pickup only"}
                </span>
                <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-2 text-slate-700">
                  <ShieldCheck size={14} />
                  {product.apartmentDelivery ? "Apartment OK" : "Home route"}
                </span>
                <span className="rounded-lg bg-amber-50 px-3 py-2 text-amber-800">
                  {product.freshToday ? "Fresh today" : "Stored stock"}
                </span>
                <span className="rounded-lg bg-sky-50 px-3 py-2 text-sky-800">
                  {product.distanceKm} km / {product.deliveryMinutes} min
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <CheckCircle2 size={15} className="text-green-600" />
                  Farmer ID: {product.farmerId}
                </span>
                <button className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-green-800">
                  <ShoppingBasket size={17} />
                  Buy Now
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Marketplace;
