const strategies = [
  {
    n: "01",
    title: "Smart Money Concept",
    desc: "Mengidentifikasi likuiditas, order block, dan fair value gap untuk entry presisi mengikuti aliran institusi.",
    tags: ["Liquidity Grab", "Order Block", "BOS / CHoCH"],
  },
  {
    n: "02",
    title: "Multi-Timeframe Confluence",
    desc: "Bias ditentukan dari weekly & daily, refinement di H4, eksekusi di M15 untuk risk-to-reward optimal.",
    tags: ["Top-down", "RR ≥ 1:3", "Trend Following"],
  },
  {
    n: "03",
    title: "Macro & On-Chain Data",
    desc: "Validasi setup teknikal dengan data CPI, FOMC, DXY, serta on-chain metrics (whale flow, funding rate).",
    tags: ["Fundamental", "Sentiment", "Risk Event"],
  },
  {
    n: "04",
    title: "Adaptive Risk Management",
    desc: "Position sizing dinamis berdasarkan ATR & volatilitas. Auto cut bila daily DD menyentuh -3%.",
    tags: ["1% Rule", "Trailing Stop", "Hedging"],
  },
];

export default function Strategy() {
  return (
    <section id="strategy" className="py-24 relative">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00e6a8] uppercase tracking-[0.2em]">
            <span className="w-8 h-px bg-[#00e6a8]" />
            07 — Strategi
          </div>
          <h2 className="mt-4 text-4xl lg:text-5xl font-bold leading-tight">
            Empat pilar yang membentuk <span className="text-gradient">edge</span> WahyudiFX.
          </h2>
          <p className="mt-5 text-gray-400 leading-relaxed">
            Setiap strategi disusun, di-backtest minimal 500 sampel data historis, dan
            divalidasi forward test selama 6 bulan sebelum live execution.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {strategies.map((s) => (
            <div
              key={s.n}
              className="group relative glass rounded-2xl p-7 hover:border-[#00e6a8]/30 transition overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00e6a8]/5 rounded-full blur-2xl group-hover:bg-[#00e6a8]/10 transition" />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="text-5xl font-bold font-mono text-white/5 group-hover:text-[#00e6a8]/30 transition">
                    {s.n}
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-[#00e6a8] group-hover:rotate-45 transition"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  >
                    <path d="M7 17L17 7M17 7H8M17 7v9" />
                  </svg>
                </div>
                <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-md border border-white/10 text-gray-400 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
