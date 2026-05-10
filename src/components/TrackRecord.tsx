const trades = [
  { pair: "XAU/USD", dir: "LONG", entry: "2,318.40", exit: "2,341.20", pnl: "+$4,560", pct: "+1.97%", date: "12 Mar 2026", up: true },
  { pair: "BTC/USD", dir: "LONG", entry: "62,140", exit: "67,820", pnl: "+$11,360", pct: "+9.14%", date: "08 Mar 2026", up: true },
  { pair: "EUR/USD", dir: "SHORT", entry: "1.0912", exit: "1.0876", pnl: "+$2,160", pct: "+0.33%", date: "05 Mar 2026", up: true },
  { pair: "US100", dir: "LONG", entry: "19,420", exit: "19,872", pnl: "+$6,780", pct: "+2.33%", date: "01 Mar 2026", up: true },
  { pair: "GBP/JPY", dir: "SHORT", entry: "199.20", exit: "199.85", pnl: "-$1,300", pct: "-0.32%", date: "26 Feb 2026", up: false },
  { pair: "ETH/USDT", dir: "LONG", entry: "3,180", exit: "3,512", pnl: "+$8,300", pct: "+10.44%", date: "20 Feb 2026", up: true },
  { pair: "XAU/USD", dir: "SHORT", entry: "2,358.80", exit: "2,340.00", pnl: "+$3,760", pct: "+0.80%", date: "18 Feb 2026", up: true },
  { pair: "BTC/USD", dir: "LONG", entry: "58,200", exit: "62,140", pnl: "+$7,880", pct: "+6.77%", date: "14 Feb 2026", up: true },
];

export default function TrackRecord() {
  return (
    <section id="track" className="py-24 relative">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00e6a8] uppercase tracking-[0.2em]">
              <span className="w-8 h-px bg-[#00e6a8]" /> 08 — Track Record
            </div>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold leading-tight">
              Closed trades terbaru WahyudiFX.
            </h2>
          </div>
          <a href="#kontak" className="text-sm text-[#00e6a8] hover:underline inline-flex items-center gap-1">
            Minta full statement →
          </a>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-xs uppercase tracking-wider text-gray-500 font-mono">
            <div className="col-span-2">Pair</div>
            <div className="col-span-1">Arah</div>
            <div className="col-span-2">Entry</div>
            <div className="col-span-2">Exit</div>
            <div className="col-span-2 text-right">P&L</div>
            <div className="col-span-1 text-right">%</div>
            <div className="col-span-2 text-right">Tanggal</div>
          </div>

          {trades.map((t, i) => (
            <div
              key={i}
              className="grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-4 px-6 py-5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition items-center"
            >
              <div className="md:col-span-2 font-semibold flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${t.up ? "bg-[#00e6a8]" : "bg-[#ff4d6d]"}`} />
                {t.pair}
              </div>
              <div className="md:col-span-1">
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                  t.dir === "LONG" ? "bg-[#00e6a8]/10 text-[#00e6a8]" : "bg-[#ff4d6d]/10 text-[#ff4d6d]"
                }`}>
                  {t.dir}
                </span>
              </div>
              <div className="md:col-span-2 font-mono text-sm text-gray-400">{t.entry}</div>
              <div className="md:col-span-2 font-mono text-sm text-gray-400">{t.exit}</div>
              <div className={`md:col-span-2 font-mono font-semibold md:text-right ${t.up ? "text-[#00e6a8]" : "text-[#ff4d6d]"}`}>
                {t.pnl}
              </div>
              <div className={`md:col-span-1 font-mono text-sm md:text-right ${t.up ? "text-[#00e6a8]" : "text-[#ff4d6d]"}`}>
                {t.pct}
              </div>
              <div className="md:col-span-2 text-xs text-gray-500 md:text-right font-mono">{t.date}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { l: "Total Trades", v: "1,247" },
            { l: "Win Rate", v: "73.4%" },
            { l: "Avg RR", v: "1 : 2.9" },
            { l: "Profit Factor", v: "3.18" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wider">{s.l}</div>
              <div className="mt-1 text-xl font-bold font-mono">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
