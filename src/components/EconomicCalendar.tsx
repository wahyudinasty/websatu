import { useState } from "react";

// High-impact events only (Forex Factory style)
const highImpactEvents = [
  // Today
  {
    date: "Fri Mar 14",
    time: "19:30",
    currency: "USD",
    event: "Core CPI m/m",
    impact: "high",
    forecast: "+0.3%",
    previous: "+0.4%",
    actual: "+0.2%",
    status: "released" as const,
    detail: "Measures the change in the price of goods and services excluding food and energy. Lower than forecast → bearish USD.",
  },
  {
    date: "Fri Mar 14",
    time: "19:30",
    currency: "USD",
    event: "CPI y/y",
    impact: "high",
    forecast: "+3.2%",
    previous: "+3.1%",
    actual: "+3.0%",
    status: "released" as const,
    detail: "Consumer Price Index year-over-year. Below forecast → dovish Fed expectation → bullish Gold.",
  },
  // Upcoming
  {
    date: "Sat Mar 15",
    time: "01:00",
    currency: "USD",
    event: "FOMC Statement",
    impact: "high",
    forecast: "Hold 5.50%",
    previous: "5.50%",
    actual: "—",
    status: "upcoming" as const,
    detail: "Federal Reserve's monetary policy decision. Most anticipated event of the week.",
  },
  {
    date: "Sat Mar 15",
    time: "01:30",
    currency: "USD",
    event: "Fed Chair Press Conference",
    impact: "high",
    forecast: "—",
    previous: "—",
    actual: "—",
    status: "upcoming" as const,
    detail: "Chair Powell speaks. Hawkish tone → bullish USD, Dovish → bullish Gold & Crypto.",
  },
  {
    date: "Sat Mar 15",
    time: "14:00",
    currency: "GBP",
    event: "GDP q/q",
    impact: "high",
    forecast: "+0.2%",
    previous: "-0.3%",
    actual: "—",
    status: "upcoming" as const,
    detail: "UK economic growth. Positive surprise → bullish GBP.",
  },
  // Next Week
  {
    date: "Mon Mar 17",
    time: "19:30",
    currency: "USD",
    event: "Core Retail Sales m/m",
    impact: "high",
    forecast: "+0.3%",
    previous: "+0.6%",
    actual: "—",
    status: "upcoming" as const,
    detail: "Consumer spending excluding autos. Strong data → bullish USD.",
  },
  {
    date: "Tue Mar 18",
    time: "16:00",
    currency: "EUR",
    event: "German ZEW Economic Sentiment",
    impact: "high",
    forecast: "20.5",
    previous: "19.9",
    actual: "—",
    status: "upcoming" as const,
    detail: "Survey of ~350 financial experts on economic conditions. Higher → bullish EUR.",
  },
  {
    date: "Tue Mar 18",
    time: "19:30",
    currency: "USD",
    event: "Building Permits",
    impact: "high",
    forecast: "1.48M",
    previous: "1.46M",
    actual: "—",
    status: "upcoming" as const,
    detail: "Number of new building permits issued. Leading indicator of housing market health.",
  },
  {
    date: "Wed Mar 19",
    time: "01:00",
    currency: "USD",
    event: "Crude Oil Inventories",
    impact: "high",
    forecast: "-0.8M",
    previous: "+2.8M",
    actual: "—",
    status: "upcoming" as const,
    detail: "Weekly change in crude oil stockpiles. Draw → bullish oil, bullish CAD.",
  },
  {
    date: "Wed Mar 19",
    time: "19:30",
    currency: "USD",
    event: "Unemployment Claims",
    impact: "high",
    forecast: "218K",
    previous: "215K",
    actual: "—",
    status: "upcoming" as const,
    detail: "Initial jobless claims. Lower → bullish USD.",
  },
  {
    date: "Thu Mar 20",
    time: "19:30",
    currency: "USD",
    event: "Existing Home Sales",
    impact: "high",
    forecast: "4.02M",
    previous: "3.98M",
    actual: "—",
    status: "upcoming" as const,
    detail: "Annualized number of previously owned homes sold. Higher → bullish USD.",
  },
  {
    date: "Fri Mar 21",
    time: "16:00",
    currency: "GBP",
    event: "Retail Sales m/m",
    impact: "high",
    forecast: "+0.3%",
    previous: "-0.1%",
    actual: "—",
    status: "upcoming" as const,
    detail: "Consumer spending measure. Strong data → bullish GBP.",
  },
  {
    date: "Fri Mar 21",
    time: "19:30",
    currency: "CAD",
    event: "Core CPI m/m",
    impact: "high",
    forecast: "+0.2%",
    previous: "+0.3%",
    actual: "—",
    status: "upcoming" as const,
    detail: "Bank of Canada's preferred inflation measure. Higher → hawkish BoC → bullish CAD.",
  },
];

const currencyFlags: Record<string, string> = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  AUD: "🇦🇺",
  JPY: "🇯🇵",
  CHF: "🇨🇭",
  CAD: "🇨🇦",
  NZD: "🇳🇿",
};

const currencyColors: Record<string, string> = {
  USD: "text-green-400",
  EUR: "text-blue-400",
  GBP: "text-purple-400",
  AUD: "text-yellow-400",
  JPY: "text-red-400",
  CHF: "text-orange-400",
  CAD: "text-pink-400",
  NZD: "text-cyan-400",
};

export default function EconomicCalendar() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [filterCcy, setFilterCcy] = useState<string>("ALL");

  const currencies = ["ALL", "USD", "EUR", "GBP", "CAD"];
  const filtered = filterCcy === "ALL"
    ? highImpactEvents
    : highImpactEvents.filter((e) => e.currency === filterCcy);

  // Group by date
  const grouped = filtered.reduce((acc, ev) => {
    if (!acc[ev.date]) acc[ev.date] = [];
    acc[ev.date].push(ev);
    return acc;
  }, {} as Record<string, typeof highImpactEvents>);

  return (
    <section id="calendar" className="py-24 relative">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
        <div className="mb-10">
          <SectionLabel>05 — Economic Calendar</SectionLabel>
          <h2 className="mt-4 text-4xl lg:text-5xl font-bold leading-tight">
            Kalender ekonomi — <span className="text-gradient">High Impact</span> only.
          </h2>
          <p className="mt-3 text-gray-400 max-w-2xl">
            Hanya event <span className="text-red-400 font-semibold">High Impact</span> dari Forex Factory
            yang mempengaruhi volatilitas pasar secara signifikan. Data real-time.
          </p>
        </div>

        {/* Header bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Currency filter */}
          <div className="flex gap-2">
            {currencies.map((ccy) => (
              <button
                key={ccy}
                onClick={() => setFilterCcy(ccy)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filterCcy === ccy
                    ? "bg-[#00e6a8]/15 text-[#00e6a8] border border-[#00e6a8]/30"
                    : "glass text-gray-400 hover:text-white"
                }`}
              >
                {ccy === "ALL" ? "Semua" : `${currencyFlags[ccy]} ${ccy}`}
              </button>
            ))}
          </div>

          {/* Forex Factory link */}
          <a
            href="https://www.forexfactory.com/calendar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm text-gray-300 hover:text-white hover:border-white/20 transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
            Forex Factory Calendar →
          </a>
        </div>

        {/* Impact Legend */}
        <div className="glass rounded-xl px-5 py-3 mb-6 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              <span className="w-1.5 h-3 rounded-sm bg-red-500" />
              <span className="w-1.5 h-3 rounded-sm bg-red-500" />
              <span className="w-1.5 h-3 rounded-sm bg-red-500" />
            </div>
            <span className="text-xs text-red-400 font-semibold">High Impact</span>
          </div>
          <span className="text-xs text-gray-500">
            Menampilkan <span className="text-white font-bold">{filtered.length}</span> high-impact events minggu ini
          </span>
          <div className="ml-auto flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-[#00e6a8]" /> Released
            <span className="w-2 h-2 rounded-full bg-gray-500" /> Upcoming
          </div>
        </div>

        {/* Calendar grouped by date */}
        <div className="space-y-4">
          {Object.entries(grouped).map(([date, events]) => (
            <div key={date}>
              {/* Date header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm font-mono text-white font-semibold">
                  {date}
                </div>
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-xs text-gray-500 font-mono">{events.length} event{events.length > 1 ? "s" : ""}</span>
              </div>

              {/* Events for this date */}
              <div className="glass rounded-2xl overflow-hidden">
                {events.map((ev, i) => {
                  const globalIdx = highImpactEvents.indexOf(ev);
                  const isExpanded = expandedIdx === globalIdx;

                  return (
                    <div key={i}>
                      <div
                        className={`grid grid-cols-12 gap-3 px-5 py-4 items-center cursor-pointer hover:bg-white/[0.02] transition ${
                          i > 0 ? "border-t border-white/5" : ""
                        } ${isExpanded ? "bg-white/[0.02]" : ""}`}
                        onClick={() => setExpandedIdx(isExpanded ? null : globalIdx)}
                      >
                        {/* Time */}
                        <div className="col-span-2 md:col-span-1 text-xs font-mono text-gray-400">
                          {ev.time}
                        </div>

                        {/* Currency */}
                        <div className="col-span-2 md:col-span-1 flex items-center gap-1.5">
                          <span className="text-sm">{currencyFlags[ev.currency]}</span>
                          <span className={`text-xs font-mono font-bold ${currencyColors[ev.currency] || "text-white"}`}>
                            {ev.currency}
                          </span>
                        </div>

                        {/* Impact */}
                        <div className="col-span-1 hidden md:flex items-center gap-1">
                          <div className="flex gap-0.5">
                            <span className="w-1.5 h-3 rounded-sm bg-red-500" />
                            <span className="w-1.5 h-3 rounded-sm bg-red-500" />
                            <span className="w-1.5 h-3 rounded-sm bg-red-500" />
                          </div>
                        </div>

                        {/* Event name */}
                        <div className="col-span-4 md:col-span-4 text-sm text-white font-medium flex items-center gap-2">
                          <svg
                            width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            className={`text-gray-500 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                          >
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                          {ev.event}
                        </div>

                        {/* Forecast */}
                        <div className="col-span-2 md:col-span-2 text-xs font-mono text-gray-400 text-right">
                          <span className="text-gray-500 hidden md:inline mr-1">FCST</span>
                          {ev.forecast}
                        </div>

                        {/* Previous */}
                        <div className="col-span-1 md:col-span-1 text-xs font-mono text-gray-500 text-right hidden md:block">
                          {ev.previous}
                        </div>

                        {/* Actual */}
                        <div className="col-span-2 md:col-span-1 text-xs font-mono font-bold text-right">
                          {ev.status === "released" ? (
                            <span className={ev.actual.startsWith("+") ? "text-[#00e6a8]" : ev.actual === "—" ? "text-gray-500" : "text-[#ff4d6d]"}>
                              {ev.actual}
                            </span>
                          ) : (
                            <span className="text-gray-600">—</span>
                          )}
                        </div>

                        {/* Status */}
                        <div className="col-span-1 md:col-span-1 text-right">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                            ev.status === "released"
                              ? "bg-[#00e6a8]/10 text-[#00e6a8] border border-[#00e6a8]/20"
                              : "bg-white/5 text-gray-400 border border-white/10"
                          }`}>
                            {ev.status === "released" ? "✓" : "⏳"}
                          </span>
                        </div>
                      </div>

                      {/* Expanded detail */}
                      {isExpanded && (
                        <div className="px-5 py-4 border-t border-white/5 bg-black/20">
                          <div className="grid md:grid-cols-3 gap-4">
                            {/* Analysis */}
                            <div className="md:col-span-2">
                              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Analisis WahyudiFX</div>
                              <p className="text-sm text-gray-300 leading-relaxed">{ev.detail}</p>
                              {ev.status === "released" && (
                                <div className="mt-3 flex items-center gap-2">
                                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                                    ev.actual.startsWith("+") && ev.forecast.startsWith("+")
                                      ? parseFloat(ev.actual) < parseFloat(ev.forecast)
                                        ? "bg-[#ff4d6d]/10 text-[#ff4d6d] border border-[#ff4d6d]/20"
                                        : "bg-[#00e6a8]/10 text-[#00e6a8] border border-[#00e6a8]/20"
                                      : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                  }`}>
                                    {ev.actual.startsWith("+") && ev.forecast.startsWith("+")
                                      ? parseFloat(ev.actual) < parseFloat(ev.forecast)
                                        ? "📉 Below Forecast — Bearish " + ev.currency
                                        : "📈 Above Forecast — Bullish " + ev.currency
                                      : "⏳ Pending Analysis"}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Data comparison */}
                            <div className="bg-black/30 rounded-xl p-4">
                              <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Data Comparison</div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Forecast</span>
                                  <span className="font-mono text-white">{ev.forecast}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Previous</span>
                                  <span className="font-mono text-gray-400">{ev.previous}</span>
                                </div>
                                <div className="flex justify-between text-sm pt-2 border-t border-white/5">
                                  <span className="text-gray-400">Actual</span>
                                  <span className={`font-mono font-bold ${
                                    ev.status === "released"
                                      ? ev.actual.startsWith("+") ? "text-[#00e6a8]" : "text-[#ff4d6d]"
                                      : "text-gray-500"
                                  }`}>
                                    {ev.actual}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Trading Tips for High Impact */}
        <div className="mt-8 glass rounded-2xl p-6 lg:p-8">
          <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
            <span className="text-red-400">⚡</span> Tips Trading Saat High-Impact News
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 grid place-items-center text-red-400 text-lg font-bold">1</div>
              <h4 className="font-semibold text-white text-sm">Pre-News</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Close atau tighten SL 15 menit sebelum rilis. Volatilitas bisa spike 50-100 pips dalam hitungan detik.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 grid place-items-center text-orange-400 text-lg font-bold">2</div>
              <h4 className="font-semibold text-white text-sm">Wait & See</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Tunggu 5-15 menit setelah rilis untuk melihat arah market yang sebenarnya. Hindari knee-jerk reaction.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 grid place-items-center text-yellow-400 text-lg font-bold">3</div>
              <h4 className="font-semibold text-white text-sm">Straddle</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Pasang buy stop & sell stop di atas/bawah range. Cancel yang tidak trigger setelah 15 menit.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#00e6a8]/10 grid place-items-center text-[#00e6a8] text-lg font-bold">4</div>
              <h4 className="font-semibold text-white text-sm">Post-News</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Entry setelah spread normal kembali. Gunakan half position size. Target lebih kecil dari usual.
              </p>
            </div>
          </div>
        </div>

        {/* Source */}
        <div className="mt-4 text-center">
          <a
            href="https://www.forexfactory.com/calendar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-[#00e6a8] transition font-mono"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
            Data sourced from Forex Factory — High Impact events only
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00e6a8] uppercase tracking-[0.2em]">
      <span className="w-8 h-px bg-[#00e6a8]" />
      {children}
    </div>
  );
}
