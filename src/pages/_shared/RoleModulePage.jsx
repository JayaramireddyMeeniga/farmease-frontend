import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bike,
  Boxes,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  CreditCard,
  IndianRupee,
  Leaf,
  MapPin,
  PackageCheck,
  Route,
  ShoppingCart,
  Sprout,
  Truck,
  Users,
  Wallet,
} from "lucide-react";

const iconMap = {
  analytics: BarChart3,
  basket: ShoppingCart,
  bike: Bike,
  calendar: CalendarCheck,
  crops: Sprout,
  delivery: Truck,
  earnings: IndianRupee,
  inventory: Boxes,
  location: MapPin,
  orders: PackageCheck,
  payment: CreditCard,
  route: Route,
  stock: Boxes,
  subscription: CalendarCheck,
  users: Users,
  wallet: Wallet,
};

const RoleModulePage = ({
  eyebrow,
  title,
  description,
  accent = "green",
  stats = [],
  actions = [],
  timeline = [],
}) => {
  const accentClasses = {
    green: {
      bg: "from-emerald-600 via-green-600 to-lime-500",
      chip: "bg-emerald-100 text-emerald-800",
      icon: "bg-emerald-600 text-white",
      ring: "ring-emerald-100",
      button: "bg-emerald-700 hover:bg-emerald-800",
    },
    amber: {
      bg: "from-amber-500 via-orange-500 to-rose-500",
      chip: "bg-amber-100 text-amber-800",
      icon: "bg-amber-500 text-white",
      ring: "ring-amber-100",
      button: "bg-amber-600 hover:bg-amber-700",
    },
    sky: {
      bg: "from-sky-600 via-cyan-600 to-teal-500",
      chip: "bg-sky-100 text-sky-800",
      icon: "bg-sky-600 text-white",
      ring: "ring-sky-100",
      button: "bg-sky-700 hover:bg-sky-800",
    },
  }[accent];

  const sidePanels = {
    green: {
      title: "Farmer Control Room",
      subtitle: "Crop, order, and payout work for today.",
      rows: [
        ["Tomato harvest", "Ready stock", "120 kg"],
        ["Mirchi orders", "Needs approval", "8"],
        ["Milk route", "Morning slot", "32 L"],
      ],
    },
    amber: {
      title: "Customer Fresh Picks",
      subtitle: "Nearby farm items ready for basket planning.",
      rows: [
        ["Organic basket", "Weekly plan", "Rs. 220"],
        ["Fresh mango", "Cold delivery", "Rs. 160"],
        ["Cow milk", "Today 7 PM", "Rs. 64"],
      ],
    },
    sky: {
      title: "Delivery Route Board",
      subtitle: "Pickup and drop work sorted by route urgency.",
      rows: [
        ["Farm pickup", "Ramesh Farms", "10:30 AM"],
        ["Cold box", "Village Dairy", "Active"],
        ["Apartment drop", "Block C", "4 orders"],
      ],
    },
  };

  const sidePanel = sidePanels[accent] || sidePanels.green;

  return (
    <section className="min-h-screen bg-[#f5f8f1] px-4 py-5 text-slate-900 sm:px-6 lg:px-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className={`overflow-hidden rounded-lg bg-gradient-to-br ${accentClasses.bg} text-white shadow-xl shadow-slate-900/10`}
      >
        <div className="grid gap-8 px-5 py-8 md:grid-cols-[1.4fr_0.8fr] md:px-8">
          <div>
            <span className="inline-flex rounded-full bg-white/18 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              {eyebrow}
            </span>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/88 sm:text-base">
              {description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {actions.slice(0, 2).map((action) => (
                <button
                  key={action}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  {action}
                  <ArrowRight size={16} />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/20 bg-white/14 p-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-green-700">
                <Leaf size={22} />
              </span>
              <div>
                <p className="text-sm font-semibold">Today&apos;s Flow</p>
                <p className="text-xs text-white/75">Direct farm to doorstep</p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {timeline.map((item, index) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = iconMap[stat.icon] || CheckCircle2;
          return (
            <motion.article
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`rounded-lg bg-white p-5 shadow-sm ring-1 ${accentClasses.ring}`}
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-lg ${accentClasses.icon}`}
              >
                <Icon size={22} />
              </span>
              <p className="mt-4 text-2xl font-bold text-slate-950">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">
                {stat.label}
              </p>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                Workspace Actions
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Core tools prepared for this module.
              </p>
            </div>
            <Clock3 className="text-slate-400" size={22} />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {actions.map((action) => (
              <button
                key={action}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-800 transition duration-300 hover:-translate-y-0.5 hover:border-green-300 hover:bg-white hover:shadow-md"
              >
                {action}
                <ArrowRight size={16} className="text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-slate-950 p-5 text-white shadow-sm">
          <h2 className="text-xl font-bold">{sidePanel.title}</h2>
          <p className="mt-1 text-sm text-slate-400">{sidePanel.subtitle}</p>
          <div className="mt-5 space-y-3">
            {sidePanel.rows.map(([name, status, value]) => (
              <div key={name} className="rounded-lg bg-white/8 p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold">{name}</span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${accentClasses.chip}`}
                  >
                    {value}
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full w-2/3 rounded-full bg-gradient-to-r ${accentClasses.bg}`}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-400">{status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleModulePage;
