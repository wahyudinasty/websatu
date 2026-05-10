import { useState } from "react";

const xauSignals = [
  {
    id: 1,
    type: "BUY",
    pair: "XAU/USD",
    entry: "2,342.50",
    sl: "2,335.00",
    tp1: "2,355.00",
    tp2: "2,368.00",
    tp3: "2,380.00",
    rr: "1 : 5.1",
    status: "ACTIVE",
    time: "14 Mar 2026 — 09:30 WIB",
    reason: "Bounce dari demand zone H4, bullish divergence RSI M15, DXY weakening.",
    pnl: "+$1,240",
    progress: 65,
  },
  {
    id: 2,
    type: "SELL",
    pair: "XAU/USD",
    entry: "2,358.80",
    sl: "2,365.00",
    tp1: "2,348.00",
    tp2: "2,340.00",
    tp3: "2,330.00",
    rr: "1 : 4.6",
    status: "TP1 HIT",
    time: "12 Mar 2026 — 14:15 WIB",
    reason: "Rejection di supply zone daily, bearish engulfing H1, funding rate extreme.",
    pnl: "+$960",
    progress: 100,
  },
  {
    id: 3,
    type: "BUY",
    pair: "XAU/USD",
    entry: "2,318.40",
    sl: "2,310.00",
    tp1: "2,330.00",
    tp2: "2,342.00",
    tp3: "2,355.00",
    rr: "1 : 4.4",
    status: "TP2 HIT",
    time: "10 Mar 2026 — 20:00 WIB",
    reason: "NFP miss → safe-haven flow, break di atas order block H4, volume surge.",
    pnl: "+$2,360",
    progress: 100,
  },
];

const btcSignals = [
  {
    id: 4,
    type: "BUY",
    pair: "BTC/USD",
    entry: "68,420",
    sl: "66,800",
    tp1: "70,500",
    tp2: "72,800",
    tp3: "75,000",
    rr: "1 : 4.1",
    status: "ACTIVE",
    time: "14 Mar 2026 — 08:00 WIB",
    reason: "Reclaim di atas weekly level $68K, positive funding, whale accumulation on-chain.",
    pnl: "+$2,180",
    progress: 45,
  },
  {
    id: 5,
    type: "SELL",
    pair: "BTC/USD",
    entry: "71,200",
    sl: "72,500",
    tp1: "69,000",
    tp2: "67,500",
    tp3: "65,000",
    rr: "1 : 4.8",
    status: "TP2 HIT",
    time: "11 Mar 2026 — 22:30 WIB",
    reason: "Double top daily, exchange inflow spike +12K BTC, RSI overbought H4.",
    pnl: "+$3,700",
    progress: 100,
  },
  {
    id: 6,
    type: "BUY",
    pair: "BTC/USD",
    entry: "62,140",
    sl: "60,500",
    tp1: "65,000",
    tp2: "67,800",
    tp3: "70,000",
    rr: "1 : 4.8",
    status: "TP3 HIT",
    time: "08 Mar 2026 — 16:00 WIB",
    reason: "Bullish order block H4, ETF inflow $420M, CME gap fill target.",
    pnl: "+$7,860",
    progress: 100,
  },
];

export default function Signals() {
  const [tab, setTab] = useState<"xau" | "btc">("xau");
  const signals = tab === "xau" ? xauSignals : btcSignals;

  return (
    <section id="signals" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      <div className="relative max-w-[1400px] mx-auto px-4 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <SectionLabel>02 — Live Signals</SectionLabel>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold leading-tight">
              Signal trading <span className="text-gradient">real-time</span> dari WahyudiFX.
            </h2>
            <p className="mt-3 text-gray-400 max-w-xl">
              Setiap signal dilengkapi entry, SL, 3 TP, risk-to-reward ratio, dan alasan konfluensi.
              Validasi multi-timeframe sebelum eksekusi.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="relative inline-block w-2 h-2 rounded-full bg-[#00e6a8] text-[#00e6a8] pulse-dot" />
            <span className="text-gray-400">Live — Updated setiap setup baru</span>
          </div>
        </div>

        {/* Tab */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab("xau")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
              tab === "xau"
                ? "bg-gradient-to-r from-[#f0b90b] to-[#fcd535] text-black shadow-[0_0_30px_-10px_rgba(240,185,11,0.5)]"
                : "glass text-gray-400 hover:text-white"
            }`}
          >
            <span className="text-lg">🥇</span> XAU/USD Signals
          </button>
          <button
            onClick={() => setTab("btc")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
              tab === "btc"
                ? "bg-gradient-to-r from-[#f7931a] to-[#ffb347] text-black shadow-[0_0_30px_-10px_rgba(247,147,26,0.5)]"
                : "glass text-gray-400 hover:text-white"
            }`}
          >
            <span className="text-lg">₿</span> BTC/USD Signals
          </button>
        </div>

        {/* Signal Cards */}
        <div className="grid lg:grid-cols-3 gap-5">
          {signals.map((s) => (
            <div key={s.id} className="glass rounded-2xl overflow-hidden hover:border-white/15 transition group">
              {/* Header */}
              <div className={`px-6 py-4 flex items-center justify-between ${
                s.type === "BUY"
                  ? "bg-gradient-to-r from-[#00e6a8]/10 to-transparent"
                  : "bg-gradient-to-r from-[#ff4d6d]/10 to-transparent"
              }`}>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-md text-xs font-bold font-mono ${
                    s.type === "BUY" ? "bg-[#00e6a8]/20 text-[#00e6a8]" : "bg-[#ff4d6d]/20 text-[#ff4d6d]"
                  }`}>
                    {s.type}
                  </span>
                  <span className="font-bold text-white">{s.pair}</span>
                </div>
                <span className={`text-xs font-mono px-2.5 py-1 rounded-md ${
                  s.status === "ACTIVE"
                    ? "bg-[#00e6a8]/15 text-[#00e6a8] border border-[#00e6a8]/30"
                    : s.status.includes("TP")
                    ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                    : "bg-[#ff4d6d]/15 text-[#ff4d6d] border border-[#ff4d6d]/30"
                }`}>
                  {s.status}
                </span>
              </div>

              <div className="p-6 space-y-4">
                {/* Entry & RR */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">Entry</div>
                    <div className="font-mono font-bold text-white mt-0.5">{s.entry}</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">Risk : Reward</div>
                    <div className="font-mono font-bold text-[#00e6a8] mt-0.5">{s.rr}</div>
                  </div>
                </div>

                {/* SL & TPs */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">SL</span>
                    <span className="font-mono text-[#ff4d6d]">{s.sl}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">TP 1</span>
                    <span className="font-mono text-[#00e6a8]">{s.tp1}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">TP 2</span>
                    <span className="font-mono text-[#00e6a8]">{s.tp2}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">TP 3</span>
                    <span className="font-mono text-[#00e6a8]">{s.tp3}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        s.status === "ACTIVE"
                          ? "bg-gradient-to-r from-[#00e6a8] to-[#19f0c0]"
                          : "bg-gradient-to-r from-blue-500 to-[#00e6a8]"
                      }`}
                      style={{ width: `${s.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-[10px] text-gray-600 font-mono">
                    <span>Entry</span>
                    <span>TP1</span>
                    <span>TP2</span>
                    <span>TP3</span>
                  </div>
                </div>

                {/* PnL */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-xs text-gray-500">{s.time}</span>
                  <span className={`font-mono font-bold ${
                    s.pnl.startsWith("+") ? "text-[#00e6a8]" : "text-[#ff4d6d]"
                  }`}>
                    {s.pnl}
                  </span>
                </div>

                {/* Reason */}
                <div className="bg-black/20 rounded-lg p-3 text-xs text-gray-400 leading-relaxed">
                  <span className="text-gray-500 font-semibold">Analisis: </span>
                  {s.reason}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { l: "Signal Minggu Ini", v: "6", sub: "4 Active · 2 Closed" },
            { l: "Win Rate Signal", v: "78%", sub: "Last 50 signals" },
            { l: "Avg RR", v: "1 : 4.6", sub: "Risk to Reward" },
            { l: "Total P&L", v: "+$18,300", sub: "This month" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-xl p-5 text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wider">{s.l}</div>
              <div className="mt-1 text-2xl font-bold font-mono text-white">{s.v}</div>
              <div className="text-xs text-gray-600 mt-1">{s.sub}</div>
            </div>
          ))}
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
