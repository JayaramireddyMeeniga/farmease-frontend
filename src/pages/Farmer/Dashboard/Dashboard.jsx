import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Brain,
  ChevronDown,
  ChevronUp,
  CloudSun,
  Droplets,
  IndianRupee,
  Lightbulb,
  Loader,
  MapPin,
  PackageCheck,
  Search,
  Sprout,
  Thermometer,
  TrendingUp,
  Truck,
  User,
  Wind,
} from "lucide-react";

const API_KEY = "67db61b81ac836498e2a916253fcb7c6";

const crops = [
  { id: 1, name: "Wheat", area: "10 acres", status: "Growing", health: 88 },
  { id: 2, name: "Corn", area: "5 acres", status: "Harvested", health: 94 },
  { id: 3, name: "Rice", area: "8 acres", status: "Planted", health: 76 },
  { id: 4, name: "Soybean", area: "3 acres", status: "Growing", health: 82 },
];

const orders = [
  { id: 1, product: "Organic Seeds", status: "Delivered", date: "2024-10-01" },
  { id: 2, product: "Fertilizer Pack", status: "In Transit", date: "2024-09-28" },
  { id: 3, product: "Harvester Machine", status: "Processing", date: "2024-09-25" },
  { id: 4, product: "Irrigation System", status: "Delivered", date: "2024-09-20" },
];

const dealers = [
  { id: 1, name: "Green Farms", contact: "greenfarms@example.com" },
  { id: 2, name: "Agri Solutions", contact: "agrisolutions@example.com" },
  { id: 3, name: "Farm Connect", contact: "farmconnect@example.com" },
  { id: 4, name: "Crop Masters", contact: "cropmasters@example.com" },
];

const financialSummary = {
  totalIncome: "Rs. 15,000",
  totalExpenses: "Rs. 7,500",
  netBalance: "Rs. 7,500",
  recentTransactions: [
    { id: 1, description: "Sold Wheat", amount: "Rs. 5,000", date: "2024-10-10", type: "income" },
    { id: 2, description: "Purchased Fertilizer", amount: "Rs. 1,000", date: "2024-10-05", type: "expense" },
    { id: 3, description: "Sold Corn", amount: "Rs. 3,000", date: "2024-10-01", type: "income" },
  ],
};

const dailyTips = [
  "Irrigate tomato beds before 9 AM to reduce heat stress.",
  "Check mirchi leaves for thrips after humid nights.",
  "Move leafy greens into cold transport quickly after harvest.",
];

const marketPrices = [
  { crop: "Tomato", price: "Rs. 45/kg", trend: "+12%", market: "Hyderabad" },
  { crop: "Green Mirchi", price: "Rs. 72/kg", trend: "+6%", market: "Vijayawada" },
  { crop: "Mango", price: "Rs. 160/kg", trend: "+18%", market: "Rajahmundry" },
  { crop: "Rice", price: "Rs. 68/kg", trend: "-2%", market: "Warangal" },
];

const aiRecommendations = [
  "List tomatoes today: nearby marketplace demand is high.",
  "Use cold storage for mangoes during afternoon heat.",
  "Increase mirchi price by 4% if stock stays below 50 kg.",
];

const statusStyles = {
  Delivered: "bg-[var(--fe-bg-soft)] text-[var(--fe-primary-700)]",
  "In Transit": "bg-[var(--fe-primary-50)] text-[var(--fe-accent-sky)]",
  Processing: "bg-[var(--fe-primary-100)] text-[var(--fe-primary-800)]",
  Cancelled: "bg-[var(--color-red-100)] text-[var(--fe-danger)]",
};

const cropStatusStyles = {
  Growing: "bg-[var(--fe-bg-soft)] text-[var(--fe-primary-700)]",
  Harvested: "bg-[var(--fe-primary-50)] text-[var(--fe-accent-sky)]",
  Planted: "bg-[var(--fe-primary-100)] text-[var(--fe-primary-800)]",
};

const Dashboard = () => {
  const routeLocation = useLocation();
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [defaultCityLoaded, setDefaultCityLoaded] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showArrivalNotice, setShowArrivalNotice] = useState(
    Boolean(routeLocation.state?.justLoggedIn),
  );

  const fetchWeatherByCity = async (city) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
      );
      const data = await response.json();

      if (!response.ok) {
        setError(`City not found: ${data.message}`);
        return;
      }

      setWeatherData({
        city: data.name,
        country: data.sys.country,
        temperature: `${Math.round(data.main.temp)} C`,
        condition: data.weather[0].description,
        humidity: `${data.main.humidity}%`,
        wind: `${data.wind.speed} m/s`,
        isCurrentLocation: false,
      });
      setLocation("");
    } catch (weatherError) {
      setError(`Network error: ${weatherError.message}`);
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

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
      );
      const data = await response.json();

      if (!response.ok) {
        setError(`Error: ${data.message}`);
        loadDefaultCity();
        return;
      }

      setWeatherData({
        city: data.name,
        country: data.sys.country,
        temperature: `${Math.round(data.main.temp)} C`,
        condition: data.weather[0].description,
        humidity: `${data.main.humidity}%`,
        wind: `${data.wind.speed} m/s`,
        isCurrentLocation: true,
      });
    } catch (weatherError) {
      setError(`Network error: ${weatherError.message}`);
      loadDefaultCity();
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocationWeather = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported. Search by city instead.");
      loadDefaultCity();
      return;
    }

    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByCoords(
          position.coords.latitude,
          position.coords.longitude,
        );
      },
      (geoError) => {
        setError(
          geoError.code === 1
            ? "Location access denied. Search for a city manually."
            : "Location is unavailable. Search for a city manually.",
        );
        setLoading(false);
        loadDefaultCity();
      },
      { timeout: 10000, enableHighAccuracy: true, maximumAge: 300000 },
    );
  };

  useEffect(() => {
    getCurrentLocationWeather();

    const timer = setTimeout(() => {
      if (!weatherData && !defaultCityLoaded && !loading) loadDefaultCity();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const dashboardMetrics = useMemo(
    () => [
      { label: "Crop Health", value: "85%", detail: "Across active fields", icon: Sprout },
      { label: "Net Balance", value: financialSummary.netBalance, detail: "This season", icon: IndianRupee },
      { label: "Active Orders", value: "12", detail: "4 moving today", icon: PackageCheck },
      { label: "Market Trend", value: "+8%", detail: "Top crops average", icon: TrendingUp },
    ],
    [],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherByCity(location);
  };

  return (
    <div className="min-h-screen bg-[var(--fe-bg)] px-4 py-5 text-[var(--fe-text)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        {showArrivalNotice && (
          <section className="flex flex-col gap-3 rounded-[1.5rem] border border-[var(--fe-border)] bg-[var(--fe-bg-soft)] px-4 py-3 shadow-[var(--fe-shadow-sm)] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--fe-primary-600)] text-[var(--fe-surface)]">
                <BarChart3 size={18} />
              </span>
              <div>
                <p className="text-sm font-extrabold text-[var(--fe-text)]">
                  You are now on the Farmer Dashboard
                </p>
                <p className="text-xs font-semibold text-[var(--fe-text-muted)]">
                  Weather, crop health, orders, and market actions are ready.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowArrivalNotice(false)}
              className="rounded-full bg-[var(--fe-surface)] px-4 py-2 text-xs font-extrabold text-[var(--fe-primary-600)] ring-1 ring-[var(--fe-border)] transition hover:bg-[var(--fe-surface-muted)]"
            >
              Got it
            </button>
          </section>
        )}

        <section className="overflow-hidden rounded-[2rem] bg-[var(--fe-primary-900)] text-[var(--fe-surface)] shadow-[var(--fe-shadow-md)]">
          <div className="grid gap-6 p-5 lg:grid-cols-[1.35fr_0.65fr] lg:p-7">
            <div className="flex flex-col justify-between gap-6">
              <div>
                <p className="inline-flex rounded-full bg-[var(--fe-primary-800)] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-[var(--fe-wheat)]">
                  Farmer command center
                </p>
                <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
                  Dashboard
                </h1>
                <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-[var(--fe-primary-100)]">
                  A focused workspace for today&apos;s farm decisions, field health,
                  market movement, orders, and AI-backed action notes.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/farmer/products"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[var(--fe-wheat)] px-4 py-2.5 text-sm font-extrabold text-[var(--fe-text)] transition hover:-translate-y-0.5"
                >
                  Manage Products
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/farmer/analytics"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[var(--fe-primary-800)] px-4 py-2.5 text-sm font-extrabold text-[var(--fe-surface)] ring-1 ring-[var(--fe-primary-500)] transition hover:bg-[var(--fe-soil)]"
                >
                  Open Analytics
                  <BarChart3 size={16} />
                </Link>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[var(--fe-primary-500)] bg-[var(--fe-primary-800)] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase text-[var(--fe-primary-200)]">
                    Priority action
                  </p>
                  <p className="mt-1 text-lg font-black">Sell high-demand stock</p>
                </div>
                <Brain className="text-[var(--fe-wheat)]" size={24} />
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--fe-primary-100)]">
                Tomato and mango demand are trending up. Review inventory and
                publish fresh stock before the afternoon pickup window.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardMetrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <article
                key={metric.label}
                className="rounded-[1.5rem] border border-[var(--fe-border)] bg-[var(--fe-surface)] p-4 shadow-[var(--fe-shadow-sm)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-extrabold uppercase text-[var(--fe-text-muted)]">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-2xl font-black text-[var(--fe-text)]">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-[var(--fe-text-muted)]">
                      {metric.detail}
                    </p>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--fe-bg-soft)] text-[var(--fe-primary-600)]">
                    <Icon size={20} />
                  </span>
                </div>
              </article>
            );
          })}
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[1.75rem] border border-[var(--fe-border)] bg-[var(--fe-surface)] p-5 shadow-[var(--fe-shadow-sm)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase text-[var(--fe-text-muted)]">
                  Live weather
                </p>
                <h2 className="mt-1 text-xl font-black text-[var(--fe-text)]">
                  Field Conditions
                </h2>
              </div>
              <button
                onClick={getCurrentLocationWeather}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--fe-text)] px-4 py-2.5 text-sm font-extrabold text-[var(--fe-surface)] transition hover:bg-[var(--fe-primary-900)] disabled:opacity-60"
              >
                <MapPin size={16} />
                Current Location
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Search city..."
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="min-w-0 flex-1 rounded-2xl border border-[var(--fe-border)] bg-[var(--fe-surface-muted)] px-4 py-2.5 text-sm font-semibold text-[var(--fe-text)] outline-none transition placeholder:text-[var(--fe-text-muted)] focus:border-[var(--fe-primary-600)] focus:bg-[var(--fe-surface)]"
              />
              <button
                type="submit"
                disabled={loading || !location.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--fe-wheat)] text-[var(--fe-text)] transition hover:-translate-y-0.5 disabled:opacity-60"
                aria-label="Search weather"
              >
                <Search size={17} />
              </button>
            </form>

            {loading && (
              <div className="mt-4 flex items-center gap-2 rounded-2xl bg-[var(--fe-primary-50)] p-3 text-sm font-bold text-[var(--fe-accent-sky)]">
                <Loader className="animate-spin" size={16} />
                Fetching weather data...
              </div>
            )}

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-2xl bg-[var(--fe-primary-100)] p-3 text-sm font-semibold text-[var(--fe-primary-800)]">
                <AlertTriangle className="mt-0.5 shrink-0" size={16} />
                <span>{error}</span>
              </div>
            )}

            {weatherData && !loading && (
              <div className="mt-5 grid gap-3 sm:grid-cols-4">
                {[
                  { label: "Temperature", value: weatherData.temperature, icon: Thermometer },
                  { label: "Condition", value: weatherData.condition, icon: CloudSun },
                  { label: "Humidity", value: weatherData.humidity, icon: Droplets },
                  { label: "Wind", value: weatherData.wind, icon: Wind },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-2xl bg-[var(--fe-surface-muted)] p-3">
                      <Icon className="text-[var(--fe-primary-600)]" size={18} />
                      <p className="mt-3 text-xs font-bold text-[var(--fe-text-muted)]">
                        {item.label}
                      </p>
                      <p className="mt-1 truncate text-sm font-black capitalize text-[var(--fe-text)]">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </article>

          <article className="rounded-[1.75rem] border border-[var(--fe-border)] bg-[var(--fe-surface)] p-5 shadow-[var(--fe-shadow-sm)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase text-[var(--fe-text-muted)]">
                  AI notes
                </p>
                <h2 className="mt-1 text-xl font-black text-[var(--fe-text)]">
                  Recommended Next Moves
                </h2>
              </div>
              <Brain className="text-[var(--fe-primary-600)]" size={22} />
            </div>
            <div className="mt-4 space-y-3">
              {aiRecommendations.map((recommendation, index) => (
                <div
                  key={recommendation}
                  className="grid grid-cols-[2rem_1fr] gap-3 rounded-2xl bg-[var(--fe-surface-muted)] p-3"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--fe-text)] text-xs font-black text-[var(--fe-wheat)]">
                    {index + 1}
                  </span>
                  <p className="text-sm font-semibold leading-6 text-[var(--fe-text-muted)]">
                    {recommendation}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-5 xl:grid-cols-3">
          <article className="rounded-[1.75rem] border border-[var(--fe-border)] bg-[var(--fe-surface)] p-5 shadow-[var(--fe-shadow-sm)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-black text-[var(--fe-text)]">Crop Health</h2>
              <Sprout className="text-[var(--fe-primary-600)]" size={22} />
            </div>
            <div className="space-y-3">
              {crops.map((crop) => (
                <div key={crop.id} className="rounded-2xl bg-[var(--fe-surface-muted)] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-black text-[var(--fe-text)]">{crop.name}</p>
                      <p className="text-xs font-semibold text-[var(--fe-text-muted)]">
                        {crop.area}
                      </p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${cropStatusStyles[crop.status]}`}>
                      {crop.status}
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--fe-surface)]">
                    <div className="h-full rounded-full bg-[var(--fe-primary-600)]" style={{ width: `${crop.health}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[var(--fe-border)] bg-[var(--fe-surface)] p-5 shadow-[var(--fe-shadow-sm)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-black text-[var(--fe-text)]">Market Prices</h2>
              <TrendingUp className="text-[var(--fe-primary-600)]" size={22} />
            </div>
            <div className="space-y-3">
              {marketPrices.map((item) => (
                <div key={item.crop} className="flex items-center justify-between rounded-2xl bg-[var(--fe-surface-muted)] p-3">
                  <div>
                    <p className="font-black text-[var(--fe-text)]">{item.crop}</p>
                    <p className="text-xs font-semibold text-[var(--fe-text-muted)]">{item.market}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[var(--fe-text)]">{item.price}</p>
                    <p className={`text-xs font-black ${item.trend.startsWith("-") ? "text-[var(--fe-danger)]" : "text-[var(--fe-primary-600)]"}`}>
                      {item.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[var(--fe-border)] bg-[var(--fe-surface)] p-5 shadow-[var(--fe-shadow-sm)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-black text-[var(--fe-text)]">Daily Tips</h2>
              <Lightbulb className="text-[var(--fe-wheat)]" size={22} />
            </div>
            <div className="space-y-3">
              {dailyTips.map((tip) => (
                <p key={tip} className="rounded-2xl bg-[var(--fe-primary-50)] p-3 text-sm font-semibold leading-6 text-[var(--fe-primary-800)]">
                  {tip}
                </p>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
          <article className="rounded-[1.75rem] border border-[var(--fe-border)] bg-[var(--fe-surface)] p-5 shadow-[var(--fe-shadow-sm)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-black text-[var(--fe-text)]">Financial Summary</h2>
              <IndianRupee className="text-[var(--fe-primary-600)]" size={22} />
            </div>
            <div className="grid gap-3">
              <div className="rounded-2xl bg-[var(--fe-bg-soft)] p-3">
                <p className="text-xs font-bold text-[var(--fe-text-muted)]">Total Income</p>
                <p className="text-lg font-black text-[var(--fe-primary-700)]">{financialSummary.totalIncome}</p>
              </div>
              <div className="rounded-2xl bg-[var(--color-red-100)] p-3">
                <p className="text-xs font-bold text-[var(--fe-text-muted)]">Total Expenses</p>
                <p className="text-lg font-black text-[var(--fe-danger)]">{financialSummary.totalExpenses}</p>
              </div>
              <div className="rounded-2xl bg-[var(--fe-text)] p-3 text-[var(--fe-surface)]">
                <p className="text-xs font-bold text-[var(--fe-primary-200)]">Net Balance</p>
                <p className="text-lg font-black text-[var(--fe-wheat)]">{financialSummary.netBalance}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowTransactions((value) => !value)}
              className="mt-4 flex w-full items-center justify-between rounded-2xl bg-[var(--fe-surface-muted)] px-4 py-3 text-sm font-black text-[var(--fe-text)]"
            >
              Recent Transactions
              {showTransactions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showTransactions && (
              <div className="mt-3 space-y-2">
                {financialSummary.recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex justify-between rounded-2xl bg-[var(--fe-surface-muted)] p-3">
                    <div>
                      <p className="text-sm font-black text-[var(--fe-text)]">{transaction.description}</p>
                      <p className="text-xs font-semibold text-[var(--fe-text-muted)]">{transaction.date}</p>
                    </div>
                    <p className={`text-sm font-black ${transaction.type === "expense" ? "text-[var(--fe-danger)]" : "text-[var(--fe-primary-700)]"}`}>
                      {transaction.type === "expense" ? "-" : "+"}
                      {transaction.amount}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </article>

          <article className="rounded-[1.75rem] border border-[var(--fe-border)] bg-[var(--fe-surface)] p-5 shadow-[var(--fe-shadow-sm)]">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-black text-[var(--fe-text)]">Recent Orders</h2>
                <p className="text-xs font-semibold text-[var(--fe-text-muted)]">Supply movement and order status</p>
              </div>
              <Link to="/delivery#orders" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--fe-text)] px-4 py-2 text-sm font-black text-[var(--fe-surface)]">
                View all
                <Truck size={16} />
              </Link>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[var(--fe-border)]">
              <table className="w-full text-left text-sm">
                <thead className="bg-[var(--fe-surface-muted)] text-xs uppercase text-[var(--fe-text-muted)]">
                  <tr>
                    <th className="px-4 py-3 font-black">Product</th>
                    <th className="px-4 py-3 font-black">Status</th>
                    <th className="px-4 py-3 font-black">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--fe-border)]">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-4 py-3 font-black text-[var(--fe-text)]">{order.product}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-3 py-1 text-xs font-black ${statusStyles[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-[var(--fe-text-muted)]">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </section>

        <section className="rounded-[1.75rem] border border-[var(--fe-border)] bg-[var(--fe-surface)] p-5 shadow-[var(--fe-shadow-sm)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-black text-[var(--fe-text)]">Connected Suppliers</h2>
            <User className="text-[var(--fe-primary-600)]" size={22} />
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {dealers.map((dealer) => (
              <div key={dealer.id} className="rounded-2xl bg-[var(--fe-surface-muted)] p-4">
                <p className="font-black text-[var(--fe-text)]">{dealer.name}</p>
                <p className="mt-1 truncate text-xs font-semibold text-[var(--fe-text-muted)]">{dealer.contact}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
