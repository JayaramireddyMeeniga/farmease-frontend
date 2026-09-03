import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Brain,
  IndianRupee,
  PackageCheck,
  Sprout,
  TrendingUp,
} from "lucide-react";
import ModuleHeader from "../../../components/ui/ModuleHeader";
import { financialSummary } from "./dashboardData";

const dashboardMetrics = [
  { label: "Crop Health", value: "85%", detail: "Across active fields", icon: Sprout },
  { label: "Net Balance", value: financialSummary.netBalance, detail: "This season", icon: IndianRupee },
  { label: "Active Orders", value: "12", detail: "4 moving today", icon: PackageCheck },
  { label: "Market Trend", value: "+8%", detail: "Top crops average", icon: TrendingUp },
];

const DashboardOverview = ({ showArrivalNotice, onDismissArrivalNotice }) => (
  <>
    {/* {showArrivalNotice && (
      <section className="flex flex-col gap-3 rounded-3xl border border-(--fe-border) bg-(--fe-bg-soft) px-4 py-3 shadow-(--fe-shadow-sm) sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-(--fe-primary-600) text-(--fe-surface)">
            <BarChart3 size={18} />
          </span>
          <div>
            <p className="text-sm font-extrabold text-(--fe-text)">
              You are now on the Farmer Dashboard
            </p>
            <p className="text-xs font-semibold text-(--fe-text-muted)">
              Weather, crop health, orders, and market actions are ready.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onDismissArrivalNotice}
          className="rounded-full bg-(--fe-surface) px-4 py-2 text-xs font-extrabold text-(--fe-primary-600) ring-1 ring-(--fe-border) transition hover:bg-(--fe-surface-muted)"
        >
          Got it
        </button>
      </section>
    )} */}

    {/* <ModuleHeader
      title="Dashboard"
      description="A focused workspace for today's farm decisions, field health, market movement, orders, and AI-backed action notes."
      badge="Farmer command center"
      badgeIcon={Sprout}
      className="shadow-(--fe-shadow-md)"
      contentClassName="lg:items-stretch"
      sideContent={
        <div className="rounded-lg border border-(--fe-primary-500) bg-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-(--fe-primary-200)">
                Priority action
              </p>
              <p className="mt-1 text-lg font-semibold">Sell high-demand stock</p>
            </div>
            <Brain className="text-(--fe-wheat)" size={24} />
          </div>
          <p className="mt-4 text-sm leading-6 text-(--fe-primary-100)">
            Tomato and mango demand are trending up. Review inventory and
            publish fresh stock before the afternoon pickup window.
          </p>
        </div>
      }
    >
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/farmer/products"
          className="inline-flex items-center gap-2 rounded-md bg-(--fe-wheat) px-4 py-2.5 text-sm font-extrabold text-(--fe-text) transition hover:-translate-y-0.5"
        >
          Manage Products
          <ArrowRight size={16} />
        </Link>
        <Link
          to="/farmer/analytics"
          className="inline-flex items-center gap-2 rounded-md bg-(--fe-primary-800) px-4 py-2.5 text-sm font-extrabold text-(--fe-surface) ring-1 ring-(--fe-primary-500) transition hover:bg-(--fe-soil)"
        >
          Open Analytics
          <BarChart3 size={16} />
        </Link>
      </div>
    </ModuleHeader> */}

    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardMetrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <article
            key={metric.label}
            className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-4 shadow-(--fe-shadow-sm)"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase text-(--fe-wheat)">
                  {metric.label}
                </p>
                <p className="mt-1 text-xl font-semibold text-(--fe-text)">
                  {metric.value}
                </p>
                <p className="mt-0.5 text-xs font-semibold text-(--fe-text-muted)">
                  {metric.detail}
                </p>
              </div>
              <span className="flex p-2.5 items-center justify-center rounded-sm bg-(--fe-bg-soft) text-(--fe-primary-600)">
                <Icon size={18} />
              </span>
            </div>
          </article>
        );
      })}
    </section>
  </>
);

export default DashboardOverview;
