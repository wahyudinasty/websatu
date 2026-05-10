const items = [
  { sym: "EUR/USD", price: "1.0876", change: "+0.42%", up: true },
  { sym: "BTC/USDT", price: "68,420", change: "+2.18%", up: true },
  { sym: "XAU/USD", price: "2,341.55", change: "+0.91%", up: true },
  { sym: "US100", price: "19,872", change: "-0.34%", up: false },
  { sym: "ETH/USDT", price: "3,512", change: "+1.74%", up: true },
  { sym: "GBP/JPY", price: "198.42", change: "-0.18%", up: false },
  { sym: "USD/JPY", price: "151.22", change: "+0.21%", up: true },
  { sym: "SOL/USDT", price: "172.40", change: "+4.62%", up: true },
  { sym: "DXY", price: "104.35", change: "-0.12%", up: false },
  { sym: "S&P500", price: "5,287", change: "+0.55%", up: true },
];

export default function Ticker() {
  const loop = [...items, ...items];
  return (
    <div className="border-y border-white/5 bg-[#0a0d12] overflow-hidden">
      <div className="flex ticker-track whitespace-nowrap py-3">
        {loop.map((it, i) => (
          <div key={i} className="flex items-center gap-3 px-6 text-sm font-mono">
            <span className="text-gray-400">{it.sym}</span>
            <span className="text-white">{it.price}</span>
            <span className={it.up ? "text-[#00e6a8]" : "text-[#ff4d6d]"}>
              {it.up ? "▲" : "▼"} {it.change}
            </span>
            <span className="text-white/10">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
