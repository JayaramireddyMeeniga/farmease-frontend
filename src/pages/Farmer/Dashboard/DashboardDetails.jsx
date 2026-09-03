import { Link } from "react-router-dom";
import {
  AlertTriangle, Brain, ChevronDown, ChevronUp, CloudSun,
  Droplets, IndianRupee, Lightbulb, Loader, MapPin, Search,
  Sprout, Thermometer, TrendingUp, Truck, User2, Wind,
} from "lucide-react";
import {
  aiRecommendations, cropStatusStyles, crops, dailyTips, dealers,
  financialSummary, marketPrices, orders, statusStyles,
} from "./dashboardData";

const DashboardDetails = ({
  weatherData, location, loading, error, showTransactions,
  onLocationChange, onWeatherSubmit, onCurrentLocationWeather, onToggleTransactions,
}) => (
  <>
    <section className="grid gap-3 xl:grid-cols-[1.1fr_0.9fr]">
      <article className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-4 shadow-(--fe-shadow-sm)">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase text-(--fe-text-muted)">
              Live weather
            </p>
            <h2 className="mt-1 text-xl font-semibold text-(--fe-wheat)">
              Field Conditions
            </h2>
          </div>
          <button
            onClick={onCurrentLocationWeather}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-(--fe-text) px-4 py-2.5 text-sm font-extrabold text-(--fe-surface) transition hover:bg-(--fe-primary-900) disabled:opacity-60"
          >
            <MapPin size={16} />
            Current Location
          </button>
        </div>

        <form onSubmit={onWeatherSubmit} className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Search city..."
            value={location}
            onChange={(event) => onLocationChange(event.target.value)}
            className="min-w-0 flex-1 rounded-md border border-(--fe-border) bg-(--fe-surface-muted) px-4 py-2 text-sm font-semibold text-(--fe-text) outline-none transition placeholder:text-(--fe-text-muted) focus:border-(--fe-primary-600) focus:bg-(--fe-surface)"
          />
          <button
            type="submit"
            disabled={loading || !location.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-(--fe-wheat) text-(--fe-text) transition hover:-translate-y-0.5 disabled:opacity-60"
            aria-label="Search weather"
          >
            <Search size={17} />
          </button>
        </form>

        {loading && (
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-(--fe-primary-50) p-3 text-sm font-bold text-(--fe-accent-sky)">
            <Loader className="animate-spin" size={16} />
            Fetching weather data...
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-(--fe-primary-100) p-3 text-sm font-semibold text-(--fe-primary-800)">
            <AlertTriangle className="mt-0.5 shrink-0" size={16} />
            <span>{error}</span>
          </div>
        )}

        {weatherData && !loading && (
          <div className="mt-3 grid gap-3 sm:grid-cols-4">
            {[
              { label: "Temperature", value: weatherData.temperature, icon: Thermometer },
              { label: "Condition", value: weatherData.condition, icon: CloudSun },
              { label: "Humidity", value: weatherData.humidity, icon: Droplets },
              { label: "Wind", value: weatherData.wind, icon: Wind },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="rounded-lg bg-(--fe-surface-muted) p-3">
                  <Icon className="text-(--fe-primary-600)" size={18} />
                  <p className="mt-3 text-xs font-bold text-(--fe-text-muted)">
                    {item.label}
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold capitalize text-(--fe-text)">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </article>

      <article className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-4 shadow-(--fe-shadow-sm)">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase text-(--fe-text-muted)">
              AI notes
            </p>
            <h2 className="mt-0.5 text-xl font-semibold text-(--fe-wheat)">
              Recommended Next Moves
            </h2>
          </div>
          <Brain className="text-(--fe-primary-600)" size={22} />
        </div>
        <div className="mt-2 space-y-2">
          {aiRecommendations.map((recommendation, index) => (
            <div
              key={recommendation}
              className="grid grid-cols-[2rem_1fr] gap-3 rounded-lg bg-(--fe-surface-muted) p-2"
            >
              <span className="flex p-1.5 items-center justify-center rounded-lg bg-(--fe-text) text-xs font-semibold text-(--fe-wheat)">
                {index + 1}
              </span>
              <p className="text-sm font-semibold leading-6 text-(--fe-text-muted)">
                {recommendation}
              </p>
            </div>
          ))}
        </div>
      </article>
    </section>

    <section className="grid gap-3 xl:grid-cols-3">
      <article className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-4 shadow-(--fe-shadow-sm)">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-(--fe-wheat)">Crop Health</h2>
          <Sprout className="text-(--fe-primary-600)" size={22} />
        </div>
        <div className="space-y-3">
          {crops.map((crop) => (
            <div key={crop.id} className="rounded-lg bg-(--fe-surface-muted) p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-(--fe-text)">{crop.name}</p>
                  <p className="text-xs font-semibold text-(--fe-text-muted)">
                    {crop.area}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${cropStatusStyles[crop.status]}`}>
                  {crop.status}
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-(--fe-surface)">
                <div className="h-full rounded-full bg-(--fe-primary-600)" style={{ width: `${crop.health}%` }} />
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-4 shadow-(--fe-shadow-sm)">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-(--fe-wheat)">Market Prices</h2>
          <TrendingUp className="text-(--fe-primary-600)" size={22} />
        </div>
        <div className="space-y-3">
          {marketPrices.map((item) => (
            <div key={item.crop} className="flex items-center justify-between rounded-lg bg-(--fe-surface-muted) p-3">
              <div>
                <p className="font-semibold text-(--fe-text)">{item.crop}</p>
                <p className="text-xs font-semibold text-(--fe-text-muted)">{item.market}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-(--fe-text)">{item.price}</p>
                <p className={`text-xs font-semibold ${item.trend.startsWith("-") ? "text-(--fe-danger)" : "text-(--fe-primary-600)"}`}>
                  {item.trend}
                </p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-4 shadow-(--fe-shadow-sm)">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-(--fe-wheat)">Daily Tips</h2>
          <Lightbulb className="text-(--fe-wheat)" size={22} />
        </div>
        <div className="space-y-3">
          {dailyTips.map((tip) => (
            <p key={tip} className="rounded-lg bg-(--fe-primary-50) p-3 text-sm font-semibold leading-6 text-(--fe-primary-800)">
              {tip}
            </p>
          ))}
        </div>
      </article>
    </section>

    <section className="grid gap-3 xl:grid-cols-[0.85fr_1.15fr]">
      <article className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-4 shadow-(--fe-shadow-sm)">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-(--fe-wheat)">Financial Summary</h2>
          <IndianRupee className="text-(--fe-primary-600)" size={22} />
        </div>
        <div className="grid gap-3">
          <div className="rounded-lg bg-(--fe-bg-soft) p-3">
            <p className="text-xs font-bold text-(--fe-text-muted)">Total Income</p>
            <p className="text-lg font-semibold text-(--fe-primary-700)">{financialSummary.totalIncome}</p>
          </div>
          <div className="rounded-lg bg-red-100 p-3">
            <p className="text-xs font-bold text-(--fe-text-muted)">Total Expenses</p>
            <p className="text-lg font-semibold text-(--fe-danger)">{financialSummary.totalExpenses}</p>
          </div>
          <div className="rounded-lg bg-(--fe-text) p-3 text-(--fe-surface)">
            <p className="text-xs font-bold text-(--fe-primary-200)">Net Balance</p>
            <p className="text-lg font-semibold text-(--fe-wheat)">{financialSummary.netBalance}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleTransactions}
          className="mt-4 flex w-full items-center justify-between rounded-lg bg-(--fe-surface-muted) px-4 py-3 text-sm font-semibold text-(--fe-text)"
        >
          Recent Transactions
          {showTransactions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showTransactions && (
          <div className="mt-3 space-y-2">
            {financialSummary.recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between rounded-sm border border-gray-200 bg-(--fe-surface-muted) px-2.5 py-2">
                <div>
                  <p className="text-sm font-semibold text-(--fe-text)">{transaction.description}</p>
                  <p className="text-xs font-semibold text-(--fe-text-muted)">{transaction.date}</p>
                </div>
                <p className={`text-sm font-semibold ${transaction.type === "expense" ? "text-(--fe-danger)" : "text-(--fe-primary-700)"}`}>
                  {transaction.type === "expense" ? "-" : "+"}
                  {transaction.amount}
                </p>
              </div>
            ))}
          </div>
        )}
      </article>

      <article className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-4 shadow-(--fe-shadow-sm)">
        <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-(--fe-wheat)">Recent Orders</h2>
            <p className="text-xs font-semibold text-(--fe-text-muted)">Supply movement and order status</p>
          </div>
          <Link
            to="/delivery#orders"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#13231a] px-4 py-2 text-sm font-semibold transition hover:bg-[#1d3a28]"
            style={{ color: "#ffffff" }}
          >
            <span className="text-white">View all</span>
            <Truck className="text-white" size={16} />
          </Link>
        </div>
        <div className="overflow-hidden rounded-lg border border-(--fe-border)">
          <table className="w-full text-left text-sm">
            <thead className="bg-(--fe-surface-muted) text-xs uppercase text-(--fe-text-muted)">
              <tr>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--fe-border)">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 font-semibold text-(--fe-text)">{order.product}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-(--fe-text-muted)">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>

    <section className="rounded-lg border border-(--fe-border) bg-(--fe-surface) p-4 shadow-(--fe-shadow-sm)">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-(--fe-wheat)">Connected Suppliers</h2>
        <User2 className="text-(--fe-primary-600)" size={22} />
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {dealers.map((dealer) => (
          <div key={dealer.id} className="rounded-lg bg-(--fe-surface-muted) p-4">
            <p className="font-semibold text-(--fe-text)">{dealer.name}</p>
            <p className="mt-1 truncate text-xs font-semibold text-(--fe-text-muted)">{dealer.contact}</p>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default DashboardDetails;
