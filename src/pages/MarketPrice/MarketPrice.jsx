import React from "react";
import {
    ArrowUpRight,
    ArrowDownRight,
    TrendingUp,
    Leaf,
    BarChart3,
    Clock2,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

const MarketPrice = () => {
    const marketRates = [
        {
            crop: "Rice",
            region: "Local Market",
            price: "$38/kg",
            change: "+3.2%",
            trend: "Strong demand from nearby mills",
            positive: true,
        },
        {
            crop: "Wheat",
            region: "Regional Market",
            price: "$31/kg",
            change: "+1.8%",
            trend: "Harvest volume easing prices",
            positive: true,
        },
        {
            crop: "Maize",
            region: "National Average",
            price: "$28/kg",
            change: "-0.5%",
            trend: "Lower feed demand weighs prices",
            positive: false,
        },
        {
            crop: "Tomato",
            region: "City Market",
            price: "$2.10/kg",
            change: "+5.4%",
            trend: "Tight supply after recent rains",
            positive: true,
        },
        {
            crop: "Onion",
            region: "Wholesale Hub",
            price: "$1.60/kg",
            change: "-2.1%",
            trend: "New arrivals easing market pressure",
            positive: false,
        },
        {
            crop: "Potato",
            region: "State Market",
            price: "$0.95/kg",
            change: "+2.5%",
            trend: "Steady retail demand keeps prices firm",
            positive: true,
        },
    ];

    const tips = [
        {
            icon: <Leaf className="h-5 w-5" />,
            title: "Crop Rotation",
            detail: "Rotate cereals and legumes to keep soil fertile and improve market returns.",
        },
        {
            icon: <ShieldCheck className="h-5 w-5" />,
            title: "Quality Harvest",
            detail: "Harvest at peak maturity for better grades and higher buyer prices.",
        },
        {
            icon: <Clock2 className="h-5 w-5" />,
            title: "Sale Timing",
            detail: "Compare weekly rates before selling to capture the strongest market window.",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900">
            <div className="max-w-7xl mx-auto px-6 py-10 lg:px-8">
                <div className="rounded-[32px] bg-gradient-to-r from-emerald-600 via-green-700 to-slate-900 p-8 shadow-2xl shadow-slate-500/10 text-white overflow-hidden">
                    <div className="relative overflow-hidden rounded-[28px] bg-white/10 p-8 backdrop-blur-xl">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-2xl">
                                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100">
                                    <TrendingUp className="h-4 w-4 text-emerald-200" />
                                    Market Price Updates
                                </p>
                                <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
                                    Fresh crop pricing, trends, and farming insights
                                </h1>
                                <p className="mt-4 max-w-xl text-base text-slate-100/90 sm:text-lg">
                                    Monitor the latest rates for core crops, understand market movements, and plan your farming decisions with confidence.
                                </p>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                                <div className="rounded-3xl bg-white/10 p-5 shadow-xl shadow-slate-900/20 ring-1 ring-white/10">
                                    <p className="text-sm uppercase tracking-[0.16em] text-emerald-100/80">Best performing crop</p>
                                    <p className="mt-3 text-2xl font-semibold">Tomato</p>
                                    <p className="mt-1 text-sm text-slate-100/80">City market is up 5.4% this week.</p>
                                </div>
                                <div className="rounded-3xl bg-white/10 p-5 shadow-xl shadow-slate-900/20 ring-1 ring-white/10">
                                    <p className="text-sm uppercase tracking-[0.16em] text-emerald-100/80">Sell smarter</p>
                                    <p className="mt-3 text-2xl font-semibold">Plan next 7 days</p>
                                    <p className="mt-1 text-sm text-slate-100/80">Use price trends and tips to time harvest and sales.</p>
                                </div>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr] mt-10">
                    <section className="space-y-6">
                        <div className="rounded-[28px] bg-white p-6 shadow-lg shadow-slate-400/10 ring-1 ring-slate-200">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-900">Crop market rates</h2>
                                    <p className="mt-2 text-sm text-slate-600">Updated hourly for top crops and regions.</p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <button className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50">
                                        <BarChart3 className="mr-2 h-4 w-4 text-emerald-600" />
                                        24h Trend
                                    </button>
                                    <button className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50">
                                        <Sparkles className="mr-2 h-4 w-4 text-emerald-600" />
                                        Fresh data
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {marketRates.slice(0, 3).map((item) => (
                                    <div key={item.crop} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-500">{item.crop}</p>
                                                <p className="mt-1 text-sm text-slate-600">{item.region}</p>
                                            </div>
                                            <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${item.positive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                                {item.positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                                                {item.change}
                                            </div>
                                        </div>
                                        <div className="mt-6 flex items-end justify-between gap-4">
                                            <p className="text-3xl font-bold text-slate-900">{item.price}</p>
                                            <p className="text-sm text-slate-500">{item.trend}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[28px] bg-white p-6 shadow-lg shadow-slate-400/10 ring-1 ring-slate-200">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-900">Detailed price digest</h2>
                                    <p className="mt-2 text-sm text-slate-600">See change direction and region-level insights for crop pricing.</p>
                                </div>
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">Latest</span>
                            </div>
                            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
                                <table className="w-full min-w-full divide-y divide-slate-200 text-left text-sm">
                                    <thead className="bg-slate-50 text-slate-500">
                                        <tr>
                                            <th className="px-5 py-4">Crop</th>
                                            <th className="px-5 py-4">Region</th>
                                            <th className="px-5 py-4">Price</th>
                                            <th className="px-5 py-4">Change</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 bg-white">
                                        {marketRates.map((item) => (
                                            <tr key={item.crop} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-5 py-4 font-semibold text-slate-900">{item.crop}</td>
                                                <td className="px-5 py-4 text-slate-600">{item.region}</td>
                                                <td className="px-5 py-4 font-bold text-slate-900">{item.price}</td>
                                                <td className={`px-5 py-4 font-semibold ${item.positive ? 'text-emerald-700' : 'text-rose-700'}`}>
                                                    {item.change}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    <aside className="space-y-6">
                        <div className="rounded-[28px] bg-white p-6 shadow-lg shadow-slate-400/10 ring-1 ring-slate-200">
                            <div className="flex items-center gap-3 text-slate-900">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                                    <Leaf className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-600">Farming focus</p>
                                    <h3 className="mt-2 text-xl font-semibold">Smart crop planning</h3>
                                </div>
                            </div>
                            <p className="mt-4 text-sm leading-7 text-slate-600">
                                Follow buyer demand and price signals to choose crops with the strongest margins. Keep production costs low and quality high to maximize earnings.
                            </p>
                            <div className="mt-6 grid gap-3">
                                {tips.map((tip) => (
                                    <div key={tip.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
                                                {tip.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-slate-900">{tip.title}</h4>
                                                <p className="mt-1 text-sm text-slate-600">{tip.detail}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-800 p-6 text-white shadow-2xl shadow-slate-900/20 ring-1 ring-white/10">
                            <div className="flex items-center gap-4">
                                <div className="rounded-2xl bg-white/10 p-3 text-emerald-200">
                                    <Sparkles className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-[0.16em] text-emerald-200/80">Market insights</p>
                                    <h4 className="mt-2 text-xl font-semibold">Stay ahead of the price curve</h4>
                                </div>
                            </div>
                            <ul className="mt-6 space-y-4 text-sm leading-7 text-emerald-100/90">
                                <li className="rounded-3xl bg-white/5 p-4">
                                    <span className="font-semibold text-white">Local demand spikes</span> tend to support prices for tomatoes, onions and leafy greens.
                                </li>
                                <li className="rounded-3xl bg-white/5 p-4">
                                    <span className="font-semibold text-white">Good weather forecasts</span> can raise buyer willingness to pay for fresh produce.
                                </li>
                                <li className="rounded-3xl bg-white/5 p-4">
                                    <span className="font-semibold text-white">Storage-ready crops</span> like rice and wheat keep margins stable through market cycles.
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default MarketPrice;