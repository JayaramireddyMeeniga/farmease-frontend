import React from "react";
import {
  AlertTriangle, CloudRain, Droplets, Eye, Leaf,
  MapPin, Sprout, Sun, ThermometerSun, Umbrella, Wind,
} from "lucide-react";
import ModuleHeader from "../../../components/ui/ModuleHeader";

const currentWeather = {
  temperature: "25 deg C",
  condition: "Sunny",
  place: "Your farm area",
  feelsLike: "28 deg C",
  humidity: "60%",
  wind: "10 km/h",
  rainChance: "15%",
};

const farmActions = [
  {
    label: "Water crops",
    value: "Morning",
    helper: "Best before strong sun",
    icon: Droplets,
    tone: "bg-sky-50 text-sky-800",
    iconTone: "bg-sky-100 text-sky-700",
  },
  {
    label: "Spray medicine",
    value: "Safe",
    helper: "Low wind today",
    icon: Sprout,
    tone: "bg-emerald-50 text-emerald-800",
    iconTone: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "Rain protection",
    value: "Not needed",
    helper: "Small rain chance",
    icon: Umbrella,
    tone: "bg-amber-50 text-amber-800",
    iconTone: "bg-amber-100 text-amber-700",
  },
];

const dayForecast = [
  {
    day: "Today",
    icon: Sun,
    temp: "25 deg C",
    rain: "15%",
    advice: "Good for field work",
    iconTone: "bg-amber-100 text-amber-700",
  },
  {
    day: "Tomorrow",
    icon: CloudRain,
    temp: "23 deg C",
    rain: "70%",
    advice: "Keep crop covered",
    iconTone: "bg-sky-100 text-sky-700",
  },
  {
    day: "Wed",
    icon: Sun,
    temp: "27 deg C",
    rain: "20%",
    advice: "Irrigate early",
    iconTone: "bg-lime-100 text-lime-700",
  },
  {
    day: "Thu",
    icon: Wind,
    temp: "26 deg C",
    rain: "35%",
    advice: "Avoid spraying",
    iconTone: "bg-violet-100 text-violet-700",
  },
];

const quickStats = [
  { label: "Feels like", value: currentWeather.feelsLike, icon: ThermometerSun },
  { label: "Humidity", value: currentWeather.humidity, icon: Droplets },
  { label: "Wind", value: currentWeather.wind, icon: Wind },
  { label: "Rain chance", value: currentWeather.rainChance, icon: CloudRain },
];

const WeatherForeCast = () => {
  return (
    <div className="min-h-screen bg-[#f6f7f4] px-4 py-5 text-[#17251e] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-5 pb-24">
        <ModuleHeader
          title="Weather"
          description="Clear farm weather with big signs for water, rain, wind, and daily field work."
          badge="Farmer friendly"
          badgeIcon={Leaf}
          className="border-gray-300 bg-[#2b5145]"
          sideContent={
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-[#17251e] shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-amber-50 text-amber-700">
                  <Sun size={30} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-gray-500">
                    Today&apos;s farm signal
                  </p>
                  <p className="text-xl font-semibold text-gray-950">
                    Work outside
                  </p>
                </div>
              </div>
              <p className="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                Good weather for field work today.
              </p>
            </div>
          }
        >
          <div className="mt-4 grid gap-2 sm:grid-cols-4">
            {quickStats.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-lg border border-white/20 bg-white/8 p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-green-50/80">
                    {label}
                  </p>
                  <Icon size={17} className="text-[#f0c766]" />
                </div>
                <p className="mt-1 text-lg font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </ModuleHeader>

        <section className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 bg-linear-to-br from-white via-[#fffaf0] to-[#eef7f0] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                    <MapPin size={16} />
                    {currentWeather.place}
                  </div>
                  <p className="mt-4 text-6xl font-semibold tracking-normal text-gray-950 sm:text-7xl">
                    {currentWeather.temperature}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-amber-700">
                    {currentWeather.condition}
                  </p>
                </div>
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-amber-100 text-amber-700 shadow-inner sm:h-28 sm:w-28">
                  <Sun size={64} strokeWidth={2.4} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-5">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm font-semibold text-gray-500">Rain</p>
                <p className="mt-1 text-2xl font-semibold text-sky-700">Low</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm font-semibold text-gray-500">Heat</p>
                <p className="mt-1 text-2xl font-semibold text-orange-700">
                  Normal
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-gray-200 pb-4">
              <div>
                <p className="text-lg font-semibold text-gray-950">
                  What to do today
                </p>
                <p className="text-sm font-semibold text-gray-500">
                  Big signs, simple decisions.
                </p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-emerald-700">
                <Eye size={22} />
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {farmActions.map(({ label, value, helper, icon: Icon, tone, iconTone }) => (
                <div
                  key={label}
                  className={`rounded-lg border border-gray-200 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] ${tone}`}
                >
                  <span className={`flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 ${iconTone}`}>
                    <Icon size={28} />
                  </span>
                  <p className="mt-4 text-sm font-semibold">{label}</p>
                  <p className="mt-1 text-xl font-semibold">{value}</p>
                  <p className="mt-2 text-xs font-semibold opacity-75">
                    {helper}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-lg border border-gray-200 bg-amber-50 p-4 text-amber-800">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">Tomorrow rain may come</p>
                <p className="text-sm font-semibold">
                  Finish drying work today and keep seeds inside.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-950">Next days</h2>
              <p className="text-sm font-semibold text-gray-500">
                Look at the picture first, then the short advice.
              </p>
            </div>
            <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-sky-50 text-sky-700">
              <CloudRain className="h-6 w-6" />
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {dayForecast.map(({ day, icon: Icon, temp, rain, advice, iconTone }) => (
              <div
                key={day}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-base font-semibold text-gray-950">{day}</p>
                  <span className={`flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 ${iconTone}`}>
                    <Icon className="h-7 w-7" />
                  </span>
                </div>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <p className="text-2xl font-semibold text-gray-950">{temp}</p>
                  <p className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-semibold text-sky-700">
                    {rain} rain
                  </p>
                </div>
                <p className="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700">
                  {advice}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default WeatherForeCast;
