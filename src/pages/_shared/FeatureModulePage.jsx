import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  MapPinned,
  Radio,
  Search,
  Snowflake,
  Truck,
  Users,
} from "lucide-react";

const iconMap = {
  apartment: Building2,
  calendar: CalendarDays,
  cold: Snowflake,
  live: Radio,
  map: MapPinned,
  search: Search,
  truck: Truck,
  users: Users,
};

const FeatureModulePage = ({
  eyebrow,
  title,
  description,
  theme = "emerald",
  primaryAction,
  secondaryAction,
  stats = [],
  cards = [],
  listTitle,
  listItems = [],
}) => {
  const themeClasses = {
    emerald: {
      hero: "from-emerald-700 via-green-700 to-lime-600",
      button: "bg-emerald-700 hover:bg-emerald-800",
      chip: "bg-emerald-100 text-emerald-800",
      soft: "bg-emerald-50 text-emerald-800",
    },
    blue: {
      hero: "from-sky-700 via-cyan-700 to-teal-600",
      button: "bg-sky-700 hover:bg-sky-800",
      chip: "bg-sky-100 text-sky-800",
      soft: "bg-sky-50 text-sky-800",
    },
    rose: {
      hero: "from-rose-700 via-orange-600 to-amber-500",
      button: "bg-rose-700 hover:bg-rose-800",
      chip: "bg-rose-100 text-rose-800",
      soft: "bg-rose-50 text-rose-800",
    },
    violet: {
      hero: "from-violet-700 via-indigo-700 to-sky-600",
      button: "bg-violet-700 hover:bg-violet-800",
      chip: "bg-violet-100 text-violet-800",
      soft: "bg-violet-50 text-violet-800",
    },
  }[theme];

  return (
    <section className="min-h-screen bg-[#f5f8f1] px-4 py-5 text-slate-900 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className={`overflow-hidden rounded-lg bg-gradient-to-br ${themeClasses.hero} text-white shadow-xl shadow-slate-900/10`}
      >
        <div className="grid gap-8 px-5 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <span className="inline-flex rounded-full bg-white/18 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              {eyebrow}
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/88 sm:text-base">{description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5">
                {primaryAction}
                <ArrowRight size={16} />
              </button>
              <button className="rounded-lg border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/12">
                {secondaryAction}
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {stats.map((stat) => {
              const Icon = iconMap[stat.icon] || CheckCircle2;
              return (
                <div key={stat.label} className="rounded-lg border border-white/15 bg-white/12 p-4">
                  <Icon size={22} className="text-white" />
                  <p className="mt-3 text-2xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/70">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = iconMap[card.icon] || CheckCircle2;
          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${themeClasses.soft}`}>
                <Icon size={22} />
              </span>
              <h2 className="mt-4 text-lg font-bold text-slate-950">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
              <span className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${themeClasses.chip}`}>
                {card.badge}
              </span>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-6 rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-bold text-slate-950">{listTitle}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {listItems.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
              <CheckCircle2 size={17} className="text-green-600" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureModulePage;
