export default function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#fc3705]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ff4d6d]/5 rounded-full blur-3xl" />

      <div className="relative max-w-[1400px] mx-auto px-4 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#fc3705]/30 bg-[#fc3705]/5 text-xs text-[#fc3705] mb-6">
            <span className="relative inline-block w-2 h-2 rounded-full bg-[#fc3705] text-[#fc3705] pulse-dot" />
            Founder WahyudiFX — Trading Berakhir Tragis
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Trading dengan <span className="text-gradient-red">hancur total</span>, bukan profit.
          </h1>

          <p className="mt-6 text-lg text-gray-400 max-w-2xl leading-relaxed">
            Saya <span className="text-white font-medium">Wahyudi</span> — Founder & Lead Trader di{" "}
            <span className="text-[#fc3705] font-semibold">WahyudiFX</span>. Mengelola portofolio multi-asset
            dengan pendekatan yang salah, no risk management, dan emosi yang berantakan.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#signals"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#fc3705] hover:bg-[#ff4d6d] text-white font-semibold transition shadow-[0_0_40px_-10px_rgba(252,55,5,0.6)]"
            >
              Lihat Live Signals
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#charts"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 text-white font-medium transition"
            >
              Analisis Chart
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
            <Stat value="2+" label="Tahun Pengalaman" />
            <Stat value="$-2500" label="AUM Yang Hilang" />
            <Stat value="3%" label="Win Rate" />
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <PortfolioCard />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-[#fc3705] font-mono">{value}</div>
      <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function PortfolioCard() {
  // Chart turun dari kiri ke kanan
  const points = [
    [0, 20],
    [10, 28],
    [20, 35],
    [30, 42],
    [40, 50],
    [50, 58],
    [60, 65],
    [70, 72],
    [80, 80],
    [90, 88],
    [100, 95]
  ];

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`)
    .join(" ");

  const area = `${path} L 100 100 L 0 100 Z`;

  return (
    <div className="glass rounded-2xl p-6 relative">
      <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#fc3705] to-transparent" />

      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">Portfolio Performance</div>
          <div className="text-2xl font-bold font-mono text-[#fc3705] mt-1">$-2,500</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 uppercase tracking-wider">YTD Return</div>
          <div className="text-2xl font-bold font-mono text-[#fc3705] mt-1">-99%</div>
        </div>
      </div>

      <div className="relative h-44 my-2">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fc3705" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#fc3705" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#g1)" />
          <path d={path} fill="none" stroke="#fc3705" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
          <circle cx="100" cy="95" r="1.2" fill="#ff4d6d" />
        </svg>
        <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-gray-600 font-mono pointer-events-none">
          <div className="flex justify-between"><span>$10K</span></div>
          <div className="flex justify-between"><span>$7.5K</span></div>
          <div className="flex justify-between"><span>$5K</span></div>
          <div className="flex justify-between"><span>$2.5K</span></div>
          <div className="flex justify-between"><span>$0</span></div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((r) => (
          <button
            key={r}
            className={`flex-1 py-1.5 rounded-md text-xs font-mono transition ${
              r === "1Y"
                ? "bg-[#fc3705]/15 text-[#fc3705] border border-[#fc3705]/30"
                : "text-gray-500 hover:text-gray-300 border border-transparent"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="mt-5 pt-5 border-t border-white/5 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-xs text-gray-500">Mentality</div>
          <div className="font-mono font-semibold mt-1 text-[#fc3705]">-10</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Max DD</div>
          <div className="font-mono font-semibold mt-1 text-[#fc3705]">-99%</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Profit Factor</div>
          <div className="font-mono font-semibold mt-1 text-[#fc3705]">0.31</div>
        </div>
      </div>
    </div>
  );
}
