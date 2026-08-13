import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, BarChart3, Brain, Search, MapPin, Thermometer, Cloud, Droplets,
  Wind, AlertTriangle, Sprout, User, ChevronDown, ChevronUp, IndianRupee, Lightbulb,
  Loader, PackageCheck, TrendingUp, Truck,
} from "lucide-react";

const Dashboard = () => {
  const API_KEY = "67db61b81ac836498e2a916253fcb7c6";
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [defaultCityLoaded, setDefaultCityLoaded] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [locationPermissionDenied, setLocationPermissionDenied] =
    useState(false);

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData({
          city: data.name,
          country: data.sys.country,
          temperature: `${Math.round(data.main.temp)}°C`,
          condition: data.weather[0].description,
          humidity: `${data.main.humidity}%`,
          wind: `${data.wind.speed} m/s`,
          isCurrentLocation: true,
        });
        setError(null);
      } else {
        setError(`Error: ${data.message}`);
        console.error("Error fetching weather:", data.message);
        loadDefaultCity();
      }
    } catch (error) {
      setError(`Network error: ${error.message}`);
      console.error("Error fetching weather:", error);
      loadDefaultCity();
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData({
          city: data.name,
          country: data.sys.country,
          temperature: `${Math.round(data.main.temp)}°C`,
          condition: data.weather[0].description,
          humidity: `${data.main.humidity}%`,
          wind: `${data.wind.speed} m/s`,
          isCurrentLocation: false,
        });
        setError(null);
        setLocation("");
      } else {
        setError(`City not found: ${data.message}`);
        console.error("Error fetching weather:", data.message);
      }
    } catch (error) {
      setError(`Network error: ${error.message}`);
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadDefaultCity = () => {
    if (!defaultCityLoaded) {
      fetchWeatherByCity("Hyderabad");
      setDefaultCityLoaded(true);
    }
  };

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationPermissionDenied(false);
          fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude,
          );
        },
        (error) => {
          console.error("Error getting location:", error);
          if (error.code === 1) {
            setError(
              "Location access denied. Please enable location services or search for a city manually.",
            );
            setLocationPermissionDenied(true);
          } else if (error.code === 2) {
            setError(
              "Location not available. Please try again or search for a city manually.",
            );
          } else if (error.code === 3) {
            setError(
              "Location request timed out. Please try again or search for a city manually.",
            );
          } else {
            setError(`Location error: ${error.message}`);
          }
          setLoading(false);
          loadDefaultCity();
        },
        {
          timeout: 10000,
          enableHighAccuracy: true,
          maximumAge: 300000, // 5 minutes
        },
      );
    } else {
      setError(
        "Geolocation is not supported by this browser. Please search for a city manually.",
      );
      loadDefaultCity();
    }
  };

  useEffect(() => {
    getCurrentLocationWeather();

    // Fallback timer
    const timer = setTimeout(() => {
      if (!weatherData && !defaultCityLoaded && !loading) {
        loadDefaultCity();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const crops = [
    { id: 1, name: "Wheat", area: "10 acres", status: "Growing" },
    { id: 2, name: "Corn", area: "5 acres", status: "Harvested" },
    { id: 3, name: "Rice", area: "8 acres", status: "Planted" },
    { id: 4, name: "Soybean", area: "3 acres", status: "Growing" },
  ];

  const financialSummary = {
    totalIncome: "Rs. 15,000",
    totalExpenses: "Rs. 7,500",
    netBalance: "Rs. 7,500",
    recentTransactions: [
      {
        id: 1,
        description: "Sold Wheat",
        amount: "Rs. 5,000",
        date: "2024-10-10",
        type: "income",
      },
      {
        id: 2,
        description: "Purchased Fertilizer",
        amount: "Rs. 1,000",
        date: "2024-10-05",
        type: "expense",
      },
      {
        id: 3,
        description: "Sold Corn",
        amount: "Rs. 3,000",
        date: "2024-10-01",
        type: "income",
      },
      {
        id: 4,
        description: "Purchased Seeds",
        amount: "Rs. 500",
        date: "2024-09-28",
        type: "expense",
      },
    ],
  };

  const orders = [
    {
      id: 1,
      product: "Organic Seeds",
      status: "Delivered",
      date: "2024-10-01",
    },
    {
      id: 2,
      product: "Fertilizer Pack",
      status: "In Transit",
      date: "2024-09-28",
    },
    {
      id: 3,
      product: "Harvester Machine",
      status: "Processing",
      date: "2024-09-25",
    },
    {
      id: 4,
      product: "Irrigation System",
      status: "Delivered",
      date: "2024-09-20",
    },
    { id: 5, product: "Pesticides", status: "Cancelled", date: "2024-09-15" },
  ];

  const dealers = [
    { id: 1, name: "Green Farms", contact: "greenfarms@example.com" },
    { id: 2, name: "Agri Solutions", contact: "agrisolutions@example.com" },
    { id: 3, name: "Farm Connect", contact: "farmconnect@example.com" },
    { id: 4, name: "Crop Masters", contact: "cropmasters@example.com" },
    { id: 5, name: "Seed Suppliers Co", contact: "seedsuppliers@example.com" },
    { id: 6, name: "Harvest Equipment", contact: "harvestequip@example.com" },
  ];

  const dashboardHighlights = [
    {
      label: "Weather",
      value: weatherData?.temperature || "Live",
      icon: Cloud,
      tone: "bg-sky-50 text-sky-700",
      link: "#weather",
    },
    {
      label: "Daily Tips",
      value: "4 new",
      icon: Lightbulb,
      tone: "bg-amber-50 text-amber-700",
      link: "#daily-tips",
    },
    {
      label: "Market Prices",
      value: "+8%",
      icon: IndianRupee,
      tone: "bg-emerald-50 text-emerald-700",
      link: "#market-prices",
    },
    {
      label: "Orders",
      value: "12 active",
      icon: PackageCheck,
      tone: "bg-orange-50 text-orange-700",
      link: "#recent-orders",
    },
    {
      label: "Crop Analytics",
      value: "86%",
      icon: BarChart3,
      tone: "bg-lime-50 text-lime-700",
      link: "#crop-analytics",
    },
    {
      label: "AI Recommendations",
      value: "5 alerts",
      icon: Brain,
      tone: "bg-violet-50 text-violet-700",
      link: "#ai-recommendations",
    },
  ];

  const dailyTips = [
    "Irrigate tomato beds before 9 AM to reduce heat stress.",
    "Check mirchi leaves for thrips after humid nights.",
    "Apply mulch around mango saplings to retain soil moisture.",
    "Move harvested milk and leafy greens into cold transport quickly.",
  ];

  const marketPrices = [
    { crop: "Tomato", price: "Rs. 45/kg", trend: "+12%", market: "Hyderabad" },
    {
      crop: "Green Mirchi",
      price: "Rs. 72/kg",
      trend: "+6%",
      market: "Vijayawada",
    },
    {
      crop: "Mango",
      price: "Rs. 160/kg",
      trend: "+18%",
      market: "Rajahmundry",
    },
    { crop: "Rice", price: "Rs. 68/kg", trend: "-2%", market: "Warangal" },
  ];

  const cropAnalytics = [
    { crop: "Tomato", health: 88, note: "Ready for two harvest batches" },
    { crop: "Rice", health: 76, note: "Monitor water level this week" },
    { crop: "Mirchi", health: 82, note: "High demand in nearby market" },
  ];

  const aiRecommendations = [
    "List tomatoes today: nearby marketplace demand is high.",
    "Bundle milk with apartment subscriptions for morning delivery.",
    "Use cold storage for mangoes due to higher afternoon temperature.",
    "Increase mirchi price by 4% if stock stays below 50 kg.",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      fetchWeatherByCity(location);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCropStatusColor = (status) => {
    switch (status) {
      case "Growing":
        return "text-green-600";
      case "Harvested":
        return "text-blue-600";
      case "Planted":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 bg-green-50">
      {/* <div className="mb-6 overflow-hidden rounded-lg bg-gradient-to-br from-green-800 via-emerald-700 to-lime-600 px-5 py-7 text-white shadow-xl shadow-green-900/15">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-green-100">
              Future Farmer Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Farm decisions in one smart workspace
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-green-50">
              Weather, tips, mandi prices, orders, crop analytics, and AI
              recommendations are organized so you can act quickly every
              morning.
            </p>
          </div>
          <Link
            to="/farmer/products"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-green-800 transition hover:-translate-y-0.5 hover:bg-green-50"
          >
            Manage Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div> */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {dashboardHighlights.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.link}
              className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-green-100 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.tone}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-xl font-bold text-gray-950">
                {item.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-600">
                {item.label}
              </p>
            </a>
          );
        })}
      </div>

      {/* Weather Section */}
      <div
        id="weather"
        className="scroll-mt-6 bg-white px-5 pt-3 pb-5 rounded-lg shadow-lg mb-6"
      >
        <h2 className="text-xl font-bold text-green-800 mb-4">
          Weather Update
        </h2>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <div className="flex space-x-2 flex-grow">
            <input
              type="text"
              placeholder="Enter city name..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
              className="flex-grow border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSubmit}
              disabled={loading || !location.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </button>
          </div>

          <button
            onClick={getCurrentLocationWeather}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 flex items-center whitespace-nowrap"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Use Current Location
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md flex items-center">
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            <p>Fetching weather data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 rounded-md flex items-start">
            <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Weather data couldn't be loaded:</p>
              <p>{error}</p>
              {error.includes("denied") && (
                <p className="mt-2 text-sm">
                  Please enable location access in your browser settings or use
                  the search box to enter a city name manually.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Weather Data Display */}
        {!loading && weatherData && (
          <div className="mt-4 px-5 pt-3 pb-5 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
              {weatherData.isCurrentLocation && (
                <MapPin className="w-4 h-4 mr-2" />
              )}
              Weather for {weatherData.city}, {weatherData.country}
              {weatherData.isCurrentLocation && (
                <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Current Location
                </span>
              )}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <Thermometer className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-sm font-medium">Temperature</p>
                  <p className="text-lg font-bold">{weatherData.temperature}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Cloud className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Condition</p>
                  <p className="capitalize">{weatherData.condition}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Droplets className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Humidity</p>
                  <p>{weatherData.humidity}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Wind className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium">Wind</p>
                  <p>{weatherData.wind}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div
          id="daily-tips"
          className="scroll-mt-6 rounded-lg bg-white px-5 pt-3 pb-5 shadow-lg"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-green-800">Daily Tips</h2>
            <Lightbulb className="h-5 w-5 text-amber-500" />
          </div>
          <div className="space-y-3">
            {dailyTips.map((tip, index) => (
              <div
                key={tip}
                className="rounded-lg border border-amber-100 bg-amber-50 p-3"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
                  Tip {index + 1}
                </p>
                <p className="mt-1 text-sm leading-6 text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          id="market-prices"
          className="scroll-mt-6 rounded-lg bg-white px-5 pt-3 pb-5 shadow-lg"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-green-800">Market Prices</h2>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div className="space-y-3">
            {marketPrices.map((item) => (
              <div
                key={item.crop}
                className="flex items-center justify-between rounded-lg border border-green-100 bg-green-50 p-3"
              >
                <div>
                  <p className="font-semibold text-gray-900">{item.crop}</p>
                  <p className="text-xs text-gray-500">{item.market}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-800">{item.price}</p>
                  <p
                    className={`text-xs font-bold ${item.trend.startsWith("-") ? "text-red-600" : "text-green-600"}`}
                  >
                    {item.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          id="ai-recommendations"
          className="scroll-mt-6 rounded-lg bg-white px-5 pt-3 pb-5 text-gray-900 shadow-lg"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">AI Recommendations</h2>
            <Brain className="h-5 w-5 text-violet-300" />
          </div>
          <div className="space-y-3">
            {aiRecommendations.map((recommendation) => (
              <div
                key={recommendation}
                className="rounded-lg bg-gray-50 p-3 text-sm leading-6 text-gray-900"
              >
                {recommendation}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Crop Summary */}
        <div className="bg-white px-5 pt-3 pb-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-green-800 mb-4">
            Crop Summary
          </h2>
          <div className="space-y-3">
            {crops.map((crop) => (
              <div
                key={crop.id}
                className="p-3 border border-gray-300 rounded-lg hover:bg-green-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Sprout className="w-6 h-6 text-green-600" />
                  <div className="flex-grow">
                    <p className="text-gray-800 font-medium">{crop.name}</p>
                    <p className="text-sm text-gray-600">
                      {crop.area} -{" "}
                      <span className={getCropStatusColor(crop.status)}>
                        {crop.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-white px-5 pt-3 pb-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-green-800 mb-4">
            Financial Summary
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-gray-600">
                <span className="font-medium">Total Income:</span>{" "}
                {financialSummary.totalIncome}
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-gray-600">
                <span className="font-medium">Total Expenses:</span>{" "}
                {financialSummary.totalExpenses}
              </p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg">
              <p className="font-bold text-green-800">
                <span>Net Balance:</span> {financialSummary.netBalance}
              </p>
            </div>
          </div>

          {/* Recent Transactions Toggle */}
          <div className="mt-6">
            <button
              onClick={() => setShowTransactions(!showTransactions)}
              className="flex items-center text-green-800 font-semibold hover:text-green-700 w-full justify-between"
            >
              <span>Recent Transactions</span>
              {showTransactions ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {showTransactions && (
              <div className="mt-4 space-y-2">
                {financialSummary.recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="p-3 border-b hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-700 font-medium">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {transaction.date}
                        </p>
                      </div>
                      <p
                        className={`font-bold ${transaction.type === "expense" ? "text-red-600" : "text-green-600"}`}
                      >
                        {transaction.type === "expense" ? "-" : "+"}
                        {transaction.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        id="crop-analytics"
        className="scroll-mt-6 bg-white px-5 pt-3 pb-5 rounded-lg shadow-lg mb-8"
      >
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-green-800">
              Crop Analytics
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Health score, harvest readiness, and action notes for active
              crops.
            </p>
          </div>
          <Link
            to="/farmer/analytics"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            Open Analytics
            <BarChart3 className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cropAnalytics.map((crop) => (
            <div
              key={crop.crop}
              className="rounded-lg border border-green-100 bg-green-50 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="font-bold text-gray-900">{crop.crop}</p>
                <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-green-800">
                  {crop.health}%
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-green-600"
                  style={{ width: `${crop.health}%` }}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {crop.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div
        id="recent-orders"
        className="scroll-mt-6 bg-white px-5 pt-3 pb-5 rounded-lg shadow-lg mb-8"
      >
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-green-800">Recent Orders</h2>
          <Link
            to="/delivery#orders"
            className="inline-flex items-center justify-center rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition"
          >
            View all orders
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-green-100">
                <th className="p-3 font-semibold">Product</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 font-medium">{order.product}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Connected Suppliers */}
      <div className="bg-white px-5 pt-3 pb-5 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          Connected Suppliers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dealers.map((dealer) => (
            <div
              key={dealer.id}
              className="p-4 border-gray-300 border rounded-lg hover:bg-green-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <User className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-gray-800 font-medium">{dealer.name}</p>
                  <p className="text-sm text-gray-600">{dealer.contact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
