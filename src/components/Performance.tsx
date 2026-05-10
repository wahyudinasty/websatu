export default function Performance() {
  const monthly = [
    { m: "Jan", v: 4.2 }, { m: "Feb", v: 2.8 }, { m: "Mar", v: -1.4 },
    { m: "Apr", v: 5.6 }, { m: "Mei", v: 3.1 }, { m: "Jun", v: 6.8 },
    { m: "Jul", v: 2.3 }, { m: "Agu", v: -2.1 }, { m: "Sep", v: 4.9 },
    { m: "Okt", v: 3.7 }, { m: "Nov", v: 5.2 }, { m: "Des", v: 4.4 },
  ];
  const max = Math.max(...monthly.map((m) => Math.abs(m.v)));

  return (
    <section id="performance" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      <div className="relative max-w-[1400px] mx-auto px-4 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <SectionLabel>06 — Performa</SectionLabel>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold leading-tight max-w-2xl">
              Konsistensi WahyudiFX yang teraudit.
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 rounded-full bg-[#00e6a8]" /> Verified by MyFxBook
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <KPI label="Total Return (3Y)" value="+187.4%" trend="up" sub="vs S&P500 +42%" />
          <KPI label="Avg. Monthly" value="+3.62%" trend="up" sub="Compounded" />
          <KPI label="Max Drawdown" value="-6.20%" trend="down" sub="Selama 36 bulan" />
        </div>

        <div className="mt-6 glass rounded-2xl p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-sm text-gray-500">Performance Bulanan — 2025</div>
              <div className="text-2xl font-bold mt-1 font-mono">+39.5% YTD</div>
            </div>
          </div>

          <div className="flex items-end gap-2 h-64">
            {monthly.map((mo) => {
              const h = (Math.abs(mo.v) / max) * 100;
              const positive = mo.v >= 0;
              return (
                <div key={mo.m} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-xs font-mono text-gray-600 group-hover:text-white transition">
                    {mo.v > 0 ? "+" : ""}{mo.v}%
                  </div>
                  <div className="w-full flex-1 flex items-end">
                    <div
                      className={`w-full rounded-t-md transition-all group-hover:opacity-100 opacity-80 ${
                        positive
                          ? "bg-gradient-to-t from-[#00e6a8]/80 to-[#19f0c0]"
                          : "bg-gradient-to-t from-[#ff4d6d]/80 to-[#ff7d96]"
                      }`}
                      style={{ height: `${h}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 font-mono">{mo.m}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {assetMix.map((a) => (
            <div key={a.name} className="glass rounded-xl p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{a.name}</span>
                <span className="text-xs font-mono text-[#00e6a8]">{a.ret}</span>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00e6a8] to-[#19f0c0]"
                  style={{ width: a.alloc }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-500 font-mono">Alokasi {a.alloc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const assetMix = [
  { name: "XAU/USD (Gold)", alloc: "35%", ret: "+18.4%" },
  { name: "BTC/USD", alloc: "25%", ret: "+22.7%" },
  { name: "Forex Majors", alloc: "25%", ret: "+8.2%" },
  { name: "Indeks (US100)", alloc: "15%", ret: "+6.2%" },
];

function KPI({ label, value, trend, sub }: { label: string; value: string; trend: "up" | "down"; sub: string }) {
  return (
    <div className="glass rounded-2xl p-6 hover:border-[#00e6a8]/30 transition group">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">{label}</div>
        <div className={`w-8 h-8 rounded-lg grid place-items-center ${
          trend === "up" ? "bg-[#00e6a8]/10 text-[#00e6a8]" : "bg-[#ff4d6d]/10 text-[#ff4d6d]"
        }`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d={trend === "up" ? "M5 12l7-7 7 7M12 5v14" : "M19 12l-7 7-7-7M12 19V5"} />
          </svg>
        </div>
      </div>
      <div className={`mt-4 text-4xl font-bold font-mono ${trend === "up" ? "text-white" : "text-[#ff4d6d]"}`}>
        {value}
      </div>
      <div className="mt-1 text-xs text-gray-500">{sub}</div>
    </div>
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
