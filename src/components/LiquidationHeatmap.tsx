import { useState } from "react";

export default function LiquidationHeatmap() {
  const [activeTab, setActiveTab] = useState<"xau" | "btc">("xau");

  const coinglassUrl = activeTab === "xau"
    ? "https://www.coinglass.com/pro/futures/LiquidationHeatMap?exchange=Binance&symbol=XAUUSDT"
    : "https://www.coinglass.com/pro/futures/LiquidationHeatMap?exchange=Binance&symbol=BTCUSDT";

  return (
    <section id="heatmap" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      <div className="relative max-w-[1400px] mx-auto px-4 lg:px-10">
        <div className="mb-10">
          <SectionLabel>04 — Liquidation Heatmap</SectionLabel>
          <h2 className="mt-4 text-4xl lg:text-5xl font-bold leading-tight">
            Peta likuidasi <span className="text-gradient">real-time</span> — CoinGlass.
          </h2>
          <p className="mt-3 text-gray-400 max-w-2xl">
            Visualisasi konsentrasi likuidasi langsung dari CoinGlass. Area merah menunjukkan
            zona dimana market maker cenderung "hunting liquidity" sebelum reversal.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("xau")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === "xau"
                ? "bg-gradient-to-r from-[#f0b90b] to-[#fcd535] text-black shadow-[0_0_30px_-10px_rgba(240,185,11,0.5)]"
                : "glass text-gray-400 hover:text-white"
            }`}
          >
            🥇 XAU/USDT Liquidation
          </button>
          <button
            onClick={() => setActiveTab("btc")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === "btc"
                ? "bg-gradient-to-r from-[#f7931a] to-[#ffb347] text-black shadow-[0_0_30px_-10px_rgba(247,147,26,0.5)]"
                : "glass text-gray-400 hover:text-white"
            }`}
          >
            ₿ BTC/USDT Liquidation
          </button>
        </div>

        {/* CoinGlass Embed */}
        <div className="glass rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl grid place-items-center text-xl ${
                activeTab === "xau" ? "bg-[#f0b90b]/15" : "bg-[#f7931a]/15"
              }`}>
                {activeTab === "xau" ? "🥇" : "₿"}
              </div>
              <div>
                <div className="font-bold text-white">
                  {activeTab === "xau" ? "XAU/USDT" : "BTC/USDT"} — Liquidation Heatmap
                </div>
                <div className="text-xs text-gray-500 font-mono">
                  Binance Futures · Real-time · Powered by CoinGlass
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="relative inline-block w-2 h-2 rounded-full bg-red-500 text-red-500 pulse-dot" />
              <span className="text-xs text-red-400 font-mono">LIVE DATA</span>
            </div>
          </div>

          {/* CoinGlass iframe */}
          <div className="relative w-full bg-[#0a0d12]" style={{ height: "560px" }}>
            <iframe
              key={activeTab}
              src={coinglassUrl}
              className="w-full h-full border-0"
              title={`${activeTab === "xau" ? "XAU/USDT" : "BTC/USDT"} Liquidation Heatmap`}
              allow="fullscreen"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-gray-400">Data real-time dari CoinGlass</span>
              </div>
              <span className="text-gray-600">|</span>
              <span className="text-gray-500">Exchange: Binance Futures</span>
            </div>
            <a
              href={coinglassUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#00e6a8] hover:underline font-mono"
            >
              Buka di CoinGlass →
            </a>
          </div>
        </div>

        {/* How to Read Section */}
        <div className="mt-6 grid md:grid-cols-3 gap-5">
          <div className="glass rounded-xl p-6">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 grid place-items-center text-red-400 mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 3v18" />
              </svg>
            </div>
            <h4 className="font-semibold text-white text-sm">Cara Baca Heatmap</h4>
            <p className="mt-2 text-xs text-gray-400 leading-relaxed">
              <span className="text-red-400">Merah terang</span> = konsentrasi likuidasi tinggi.
              <span className="text-yellow-400"> Kuning</span> = rendah.
              Harga cenderung bergerak ke zona merah untuk "mengambil" likuiditas.
            </p>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 grid place-items-center text-orange-400 mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h4 className="font-semibold text-white text-sm">Liquidity Hunting</h4>
            <p className="mt-2 text-xs text-gray-400 leading-relaxed">
              Market maker sering mendorong harga ke zona likuidasi tinggi untuk trigger
              stop loss sebelum reversal. Ini adalah <span className="text-white">edge</span> utama.
            </p>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="w-10 h-10 rounded-lg bg-[#00e6a8]/10 grid place-items-center text-[#00e6a8] mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18M7 14l4-4 4 4 5-5" />
              </svg>
            </div>
            <h4 className="font-semibold text-white text-sm">Strategi Entry</h4>
            <p className="mt-2 text-xs text-gray-400 leading-relaxed">
              Tunggu harga sweep zona merah, lalu entry saat ada konfirmasi rejection
              (pin bar, engulfing) di timeframe M15/H1. Target: zona likuidasi berlawanan.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { l: "Exchange", v: "Binance", sub: "Futures Market" },
            { l: "Symbol", v: activeTab === "xau" ? "XAUUSDT" : "BTCUSDT", sub: "Perpetual" },
            { l: "Data Source", v: "CoinGlass", sub: "Real-time API" },
            { l: "Update", v: "Live", sub: "Auto refresh" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-xl p-5 text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wider">{s.l}</div>
              <div className="mt-1 text-xl font-bold font-mono text-white">{s.v}</div>
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
