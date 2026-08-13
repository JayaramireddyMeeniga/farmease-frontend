import React, { useMemo, useState } from "react";
import {
  Bot,
  CalendarDays,
  CloudRain,
  GraduationCap,
  Leaf,
  MessageCircleQuestion,
  Mic,
  PlayCircle,
  ShieldAlert,
  Sprout,
} from "lucide-react";
import TipCarousel from "./TipCarousel/TipCarousel";
import {
  aiRecommendations,
  cropGuidance,
  dailyTips,
  expertAdvice,
  governmentSchemes,
  languages,
  organicTips,
  videoTips,
  weatherTips,
} from "./tipsData";

const sectionMeta = {
  overview: { title: "Agricultural Tips", icon: Sprout },
  daily: { title: "Daily Tips", icon: CalendarDays },
  seasonal: { title: "Seasonal Tips", icon: Sprout },
  video: { title: "Video Learning", icon: PlayCircle },
  crop: { title: "Crop Guidance", icon: Leaf },
  weather: { title: "Weather Tips", icon: CloudRain },
  organic: { title: "Organic Farming", icon: Leaf },
  schemes: { title: "Government Schemes", icon: ShieldAlert },
  ai: { title: "AI Recommendations", icon: Bot },
  expert: { title: "Expert Advice", icon: MessageCircleQuestion },
  pest: { title: "Pest Control", icon: ShieldAlert },
};

const modeConfig = {
  daily: [
    "Daily irrigation and fertilizer guidance",
    "Voice tips",
    "Multi-language filter",
  ],
  seasonal: ["Sowing dates", "Harvest dates", "Irrigation calendar"],
  video: [
    "YouTube agriculture videos",
    "Farming tutorials",
    "Drip irrigation training",
  ],
  crop: ["Fertilizer tips", "Disease prevention", "Harvest timing"],
  weather: ["Rain alerts", "Spray timing", "Weather API-ready logic"],
  organic: ["Compost", "Neem spray", "Mulching"],
  schemes: ["Subsidies", "Loans", "Insurance"],
  ai: [
    "Best crop suggestion",
    "Market and soil alerts",
    "Future image disease detection",
  ],
  expert: ["Farmer questions", "Expert replies", "Consultation workflow"],
  pest: ["Disease prevention", "Pest traps", "Safe spray timing"],
};

const AgriculturalTipsPage = ({ mode = "overview" }) => {
  const [selectedCrop, setSelectedCrop] = useState("Tomato");
  const [language, setLanguage] = useState("English");
  const meta = sectionMeta[mode] || sectionMeta.overview;
  const Icon = meta.icon;
  const crop = useMemo(
    () =>
      cropGuidance.find((item) => item.crop === selectedCrop) ||
      cropGuidance[0],
    [selectedCrop],
  );

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  };

  return (
    <section className="min-h-screen bg-[#f5f8f1] px-4 py-5 text-slate-900 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-lg bg-gradient-to-br from-green-800 via-emerald-700 to-lime-600 px-5 py-8 text-white shadow-xl shadow-green-900/10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">
              <Icon size={15} />
              Daily Farming Assistant
            </span>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
              {meta.title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-green-50">
              Learn what crop to grow, when to irrigate, which fertilizer to
              use, weather-based actions, disease prevention, and market-aware
              recommendations.
            </p>
          </div>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="h-11 rounded-lg border border-white/20 bg-white px-3 text-sm font-semibold text-green-900 outline-none"
          >
            {languages.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <TipCarousel tips={dailyTips} />
        <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-green-100">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-100 text-green-700">
              <Mic size={22} />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                Voice + Language Ready
              </h2>
              <p className="text-sm text-slate-600">
                Selected language: {language}
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {(
              modeConfig[mode] || [
                "Daily assistant",
                "Smart tips",
                "Farmer support",
              ]
            ).map((item) => (
              <div
                key={item}
                className="rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-800"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200 xl:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                Crop-Based Guidance
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Select a crop to see fertilizer, irrigation, disease, and
                harvest advice.
              </p>
            </div>
            <select
              value={selectedCrop}
              onChange={(event) => setSelectedCrop(event.target.value)}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold outline-none focus:border-green-500"
            >
              {cropGuidance.map((item) => (
                <option key={item.crop}>{item.crop}</option>
              ))}
            </select>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              ["Temperature", crop.temperature],
              ["Water Level", crop.waterLevel],
              ["Soil Type", crop.soilType],
              ["Recommended Season", crop.recommendedSeason],
              ["Fertilizer", crop.fertilizer],
              ["Irrigation", crop.irrigation],
              ["Disease Prevention", crop.disease],
              ["Harvest Timing", crop.harvest],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-slate-200 bg-slate-50 p-3"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  {label}
                </p>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-bold text-slate-950">
            Weather Smart Tips
          </h2>
          <div className="mt-4 space-y-3">
            {weatherTips.map((tip) => (
              <button
                key={tip}
                type="button"
                onClick={() => speak(tip)}
                className="w-full rounded-lg bg-sky-50 p-3 text-left text-sm font-semibold leading-6 text-sky-900 transition hover:bg-sky-100"
              >
                {tip}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <InfoPanel title="Organic Farming" items={organicTips} icon={Leaf} />
        <InfoPanel
          title="Government Schemes"
          items={governmentSchemes.map(
            (item) => `${item.name}: ${item.benefit}`,
          )}
          icon={ShieldAlert}
        />
        <InfoPanel
          title="AI Recommendations"
          items={aiRecommendations}
          icon={Bot}
          dark
        />
        <InfoPanel
          title="Expert Advice"
          items={expertAdvice.map((item) => `${item.question} ${item.answer}`)}
          icon={GraduationCap}
        />
      </div>

      <div className="mt-6 rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-bold text-slate-950">Video Learning</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {videoTips.map((video) => (
            <div
              key={video.title}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <PlayCircle className="h-8 w-8 text-green-700" />
              <h3 className="mt-3 font-bold text-slate-950">{video.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{video.topic}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-green-700">
                {video.duration}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InfoPanel = ({ title, items, icon: Icon, dark = false }) => (
  <div
    className={`rounded-lg p-5 shadow-sm ring-1 ${dark ? "bg-slate-950 text-white ring-slate-900" : "bg-white text-slate-900 ring-slate-200"}`}
  >
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-lg font-bold">{title}</h2>
      <Icon className={dark ? "text-green-300" : "text-green-700"} size={22} />
    </div>
    <div className="mt-4 space-y-3">
      {items.map((item) => (
        <p
          key={item}
          className={`rounded-lg p-3 text-sm leading-6 ${dark ? "bg-white/10 text-slate-100" : "bg-green-50 text-slate-700"}`}
        >
          {item}
        </p>
      ))}
    </div>
  </div>
);

export default AgriculturalTipsPage;
