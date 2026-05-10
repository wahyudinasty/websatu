import { useState } from "react";

const xauUrl = `https://s.tradingview.com/widgetembed/?hideideas=1&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=id#%7B%22symbol%22%3A%22OANDA%3AXAUUSD%22%2C%22interval%22%3A%2215%22%2C%22hide_side_toolbar%22%3A%220%22%2C%22allow_symbol_change%22%3A%221%22%2C%22save_image%22%3A%221%22%2C%22studies%22%3A%22%5B%5D%22%2C%22theme%22%3A%22dark%22%2C%22style%22%3A%221%22%2C%22timezone%22%3A%22Asia%2FJakarta%22%2C%22studies_overrides%22%3A%22%7B%7D%22%7D`;

const btcUrl = `https://s.tradingview.com/widgetembed/?hideideas=1&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=id#%7B%22symbol%22%3A%22BINANCE%3ABTCUSDT%22%2C%22interval%22%3A%2215%22%2C%22hide_side_toolbar%22%3A%220%22%2C%22allow_symbol_change%22%3A%221%22%2C%22save_image%22%3A%221%22%2C%22studies%22%3A%22%5B%5D%22%2C%22theme%22%3A%22dark%22%2C%22style%22%3A%221%22%2C%22timezone%22%3A%22Asia%2FJakarta%22%2C%22studies_overrides%22%3A%22%7B%7D%22%7D`;

export default function Charts() {
  const [activeChart, setActiveChart] = useState<"xau" | "btc">("xau");

  return (
    <section id="charts" className="py-24 relative">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
        <div className="mb-10">
          <SectionLabel>03 — Live Charts</SectionLabel>
          <h2 className="mt-4 text-4xl lg:text-5xl font-bold leading-tight">
            Analisis teknikal <span className="text-gradient">real-time</span>.
          </h2>
          <p className="mt-3 text-gray-400 max-w-xl">
            Chart TradingView real-time dengan indikator teknikal lengkap.
            Multi-timeframe analysis untuk konfirmasi setup.
          </p>
        </div>

        {/* Chart Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveChart("xau")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
              activeChart === "xau"
                ? "bg-gradient-to-r from-[#f0b90b] to-[#fcd535] text-black shadow-[0_0_30px_-10px_rgba(240,185,11,0.5)]"
                : "glass text-gray-400 hover:text-white"
            }`}
          >
            🥇 XAU/USD Live Chart
          </button>
          <button
            onClick={() => setActiveChart("btc")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
              activeChart === "btc"
                ? "bg-gradient-to-r from-[#f7931a] to-[#ffb347] text-black shadow-[0_0_30px_-10px_rgba(247,147,26,0.5)]"
                : "glass text-gray-400 hover:text-white"
            }`}
          >
            ₿ BTC/USD Live Chart
          </button>
        </div>

        {/* TradingView Widget */}
        <div className="glass rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl grid place-items-center text-xl ${
                activeChart === "xau" ? "bg-[#f0b90b]/15" : "bg-[#f7931a]/15"
              }`}>
                {activeChart === "xau" ? "🥇" : "₿"}
              </div>
              <div>
                <div className="font-bold text-white">
                  {activeChart === "xau" ? "XAU/USD" : "BTC/USD"} — TradingView Real-time
                </div>
                <div className="text-xs text-gray-500 font-mono">
                  {activeChart === "xau" ? "OANDA:XAUUSD · M15 · Asia/Jakarta" : "BINANCE:BTCUSDT · M15 · Asia/Jakarta"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative inline-block w-2 h-2 rounded-full bg-[#00e6a8] text-[#00e6a8] pulse-dot" />
              <span className="text-xs text-[#00e6a8] font-mono">LIVE</span>
            </div>
          </div>

          {/* TradingView iframe */}
          <div className="relative w-full" style={{ height: "520px" }}>
            <iframe
              key={activeChart}
              src={activeChart === "xau" ? xauUrl : btcUrl}
              className="w-full h-full border-0"
              title={`${activeChart === "xau" ? "XAU/USD" : "BTC/USD"} TradingView Chart`}
              allow="fullscreen"
              loading="lazy"
            />
          </div>

          {/* Footer info */}
          <div className="px-6 py-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00e6a8]" />
                <span className="text-gray-400">Powered by TradingView</span>
              </div>
              <span className="text-gray-600">|</span>
              <span className="text-gray-500">Interval: 15 min</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-500">Timezone: Asia/Jakarta (WIB)</span>
            </div>
            <div className="text-xs text-gray-500">
              Chart style: Candles · Theme: Dark
            </div>
          </div>
        </div>

        {/* Key Levels & Technical Summary */}
        <div className="mt-6 grid md:grid-cols-2 gap-5">
          <div className="glass rounded-xl p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00e6a8]" />
              Key Levels — {activeChart === "xau" ? "XAU/USD" : "BTC/USD"}
            </h3>
            <div className="space-y-3">
              {activeChart === "xau" ? (
                <>
                  <Level label="Resistance 3" price="2,380.00" type="res" />
                  <Level label="Resistance 2" price="2,368.00" type="res" />
                  <Level label="Resistance 1" price="2,355.00" type="res" />
                  <Level label="Current Price" price="2,342.50" type="cur" />
                  <Level label="Support 1" price="2,335.00" type="sup" />
                  <Level label="Support 2" price="2,320.00" type="sup" />
                  <Level label="Support 3" price="2,305.00" type="sup" />
                </>
              ) : (
                <>
                  <Level label="Resistance 3" price="75,000" type="res" />
                  <Level label="Resistance 2" price="72,800" type="res" />
                  <Level label="Resistance 1" price="70,500" type="res" />
                  <Level label="Current Price" price="68,420" type="cur" />
                  <Level label="Support 1" price="66,800" type="sup" />
                  <Level label="Support 2" price="65,000" type="sup" />
                  <Level label="Support 3" price="62,140" type="sup" />
                </>
              )}
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Technical Summary — WahyudiFX Analysis
            </h3>
            <div className="space-y-3">
              <TechInd name="RSI (14)" value="62.4" signal="Neutral-Bullish" color="text-[#00e6a8]" />
              <TechInd name="MACD (12,26)" value="+3.18" signal="Bullish Cross" color="text-[#00e6a8]" />
              <TechInd name="EMA 20" value={activeChart === "xau" ? "2,338.2" : "67,850"} signal="Above — Bullish" color="text-[#00e6a8]" />
              <TechInd name="EMA 50" value={activeChart === "xau" ? "2,325.6" : "66,200"} signal="Above — Bullish" color="text-[#00e6a8]" />
              <TechInd name="Bollinger Bands" value="Mid" signal="Expanding" color="text-yellow-400" />
              <TechInd name="ATR (14)" value={activeChart === "xau" ? "12.4" : "1,240"} signal="Normal Vol" color="text-gray-400" />
              <TechInd name="Volume" value="Above Avg" signal="Confirming" color="text-[#00e6a8]" />
            </div>
            <div className="mt-5 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Overall Signal</span>
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-[#00e6a8]/15 text-[#00e6a8] border border-[#00e6a8]/30">
                  STRONG BUY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Level({ label, price, type }: { label: string; price: string; type: "res" | "sup" | "cur" }) {
  return (
    <div className={`flex items-center justify-between py-2 px-3 rounded-lg ${
      type === "cur" ? "bg-[#00e6a8]/10 border border-[#00e6a8]/20" : ""
    }`}>
      <span className={`text-xs ${type === "cur" ? "text-[#00e6a8] font-semibold" : "text-gray-400"}`}>{label}</span>
      <span className={`font-mono text-sm ${
        type === "res" ? "text-[#ff4d6d]" : type === "sup" ? "text-[#00e6a8]" : "text-white font-bold"
      }`}>
        {price}
      </span>
    </div>
  );
}

function TechInd({ name, value, signal, color }: { name: string; value: string; signal: string; color: string }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs text-gray-400">{name}</span>
      <div className="flex items-center gap-3">
        <span className={`font-mono text-xs font-semibold ${color}`}>{value}</span>
        <span className="text-[10px] text-gray-500">{signal}</span>
      </div>
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
