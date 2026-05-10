import { useState } from "react";

interface Signal {
  id: number;
  pair: string;
  type: "BUY" | "SELL";
  entry: string;
  sl: string;
  tp1: string;
  tp2: string;
  tp3: string;
  rr: string;
  status: "ACTIVE" | "TP1 HIT" | "TP2 HIT" | "TP3 HIT" | "SL HIT" | "CLOSED";
  date: string;
  reason: string;
  pnl: string;
}

interface Trade {
  id: number;
  pair: string;
  dir: "LONG" | "SHORT";
  entry: string;
  exit: string;
  pnl: string;
  pct: string;
  date: string;
  up: boolean;
}

const initialSignals: Signal[] = [
  {
    id: 1, pair: "XAU/USD", type: "BUY", entry: "2,342.50", sl: "2,335.00",
    tp1: "2,355.00", tp2: "2,368.00", tp3: "2,380.00", rr: "1 : 5.1",
    status: "ACTIVE", date: "14 Mar 2026", reason: "Bounce dari demand zone H4, bullish divergence RSI M15.",
    pnl: "+$1,240"
  },
  {
    id: 2, pair: "BTC/USD", type: "BUY", entry: "68,420", sl: "66,800",
    tp1: "70,500", tp2: "72,800", tp3: "75,000", rr: "1 : 4.1",
    status: "ACTIVE", date: "14 Mar 2026", reason: "Reclaim weekly level $68K, positive funding.",
    pnl: "+$2,180"
  },
];

const initialTrades: Trade[] = [
  { id: 1, pair: "XAU/USD", dir: "LONG", entry: "2,318.40", exit: "2,341.20", pnl: "+$4,560", pct: "+1.97%", date: "12 Mar 2026", up: true },
  { id: 2, pair: "BTC/USD", dir: "LONG", entry: "62,140", exit: "67,820", pnl: "+$11,360", pct: "+9.14%", date: "08 Mar 2026", up: true },
  { id: 3, pair: "GBP/JPY", dir: "SHORT", entry: "199.20", exit: "199.85", pnl: "-$1,300", pct: "-0.32%", date: "26 Feb 2026", up: false },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "signals" | "trades" | "calendar">("dashboard");
  const [signals, setSignals] = useState<Signal[]>(initialSignals);
  const [trades, setTrades] = useState<Trade[]>(initialTrades);
  const [showSignalForm, setShowSignalForm] = useState(false);
  const [showTradeForm, setShowTradeForm] = useState(false);
  const [editingSignal, setEditingSignal] = useState<Signal | null>(null);

  const [signalForm, setSignalForm] = useState({
    pair: "XAU/USD", type: "BUY" as "BUY" | "SELL", entry: "", sl: "",
    tp1: "", tp2: "", tp3: "", rr: "", reason: "", status: "ACTIVE" as Signal["status"],
  });

  const [tradeForm, setTradeForm] = useState({
    pair: "XAU/USD", dir: "LONG" as "LONG" | "SHORT", entry: "", exit: "", pnl: "", pct: "", date: "",
  });

  const handleSaveSignal = () => {
    if (editingSignal) {
      setSignals(signals.map(s => s.id === editingSignal.id ? {
        ...editingSignal, ...signalForm,
        pnl: signalForm.status === "ACTIVE" ? "Running" : editingSignal.pnl
      } : s));
      setEditingSignal(null);
    } else {
      const newSignal: Signal = {
        id: Date.now(), ...signalForm,
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        pnl: signalForm.status === "ACTIVE" ? "Running" : "$0"
      };
      setSignals([newSignal, ...signals]);
    }
    setSignalForm({ pair: "XAU/USD", type: "BUY", entry: "", sl: "", tp1: "", tp2: "", tp3: "", rr: "", reason: "", status: "ACTIVE" });
    setShowSignalForm(false);
  };

  const handleEditSignal = (signal: Signal) => {
    setEditingSignal(signal);
    setSignalForm({
      pair: signal.pair, type: signal.type, entry: signal.entry, sl: signal.sl,
      tp1: signal.tp1, tp2: signal.tp2, tp3: signal.tp3, rr: signal.rr,
      reason: signal.reason, status: signal.status,
    });
    setShowSignalForm(true);
  };

  const handleDeleteSignal = (id: number) => {
    setSignals(signals.filter(s => s.id !== id));
  };

  const handleSaveTrade = () => {
    const newTrade: Trade = {
      id: Date.now(), ...tradeForm,
      up: !tradeForm.pnl.startsWith("-"),
    };
    setTrades([newTrade, ...trades]);
    setTradeForm({ pair: "XAU/USD", dir: "LONG", entry: "", exit: "", pnl: "", pct: "", date: "" });
    setShowTradeForm(false);
  };

  const handleDeleteTrade = (id: number) => {
    setTrades(trades.filter(t => t.id !== id));
  };

  const stats = {
    activeSignals: signals.filter(s => s.status === "ACTIVE").length,
    totalSignals: signals.length,
    winSignals: signals.filter(s => s.status.includes("TP")).length,
    totalTrades: trades.length,
    winTrades: trades.filter(t => t.up).length,
    totalPnl: trades.reduce((sum, t) => sum + parseFloat(t.pnl.replace(/[^-\d.]/g, "")), 0),
  };

  return (
    <div className="min-h-screen bg-[#07090d] text-white">
      {/* Admin Header */}
      <header className="border-b border-white/5 bg-[#0a0d12] sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00e6a8] to-[#19f0c0] grid place-items-center text-black font-bold text-sm">
                W
              </div>
              <span className="font-semibold text-lg">
                Wahyudi<span className="text-[#00e6a8]">FX</span>
              </span>
            </a>
            <span className="text-gray-600">/</span>
            <span className="text-sm text-gray-400">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm text-gray-400 hover:text-white transition">← Back to Site</a>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00e6a8] to-[#19f0c0] grid place-items-center text-black font-bold text-sm">
              W
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-10 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { id: "dashboard", label: "Dashboard", icon: "📊" },
            { id: "signals", label: "Manage Signals", icon: "📡" },
            { id: "trades", label: "Closed Trades", icon: "📈" },
            { id: "calendar", label: "Calendar Events", icon: "📅" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#00e6a8] text-black shadow-[0_0_30px_-10px_rgba(0,230,168,0.5)]"
                  : "glass text-gray-400 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Dashboard Overview</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard label="Active Signals" value={stats.activeSignals} color="text-[#00e6a8]" />
              <StatCard label="Total Signals" value={stats.totalSignals} color="text-white" />
              <StatCard label="Win Signals" value={stats.winSignals} color="text-[#00e6a8]" />
              <StatCard label="Total Trades" value={stats.totalTrades} color="text-white" />
              <StatCard label="Win Rate" value={`${((stats.winTrades / stats.totalTrades) * 100).toFixed(0)}%`} color="text-[#00e6a8]" />
              <StatCard label="Total P&L" value={`$${stats.totalPnl.toLocaleString()}`} color={stats.totalPnl >= 0 ? "text-[#00e6a8]" : "text-[#ff4d6d]"} />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Recent Signals</h3>
                <div className="space-y-3">
                  {signals.slice(0, 5).map((s) => (
                    <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          s.type === "BUY" ? "bg-[#00e6a8]/20 text-[#00e6a8]" : "bg-[#ff4d6d]/20 text-[#ff4d6d]"
                        }`}>{s.type}</span>
                        <span className="font-semibold text-sm">{s.pair}</span>
                      </div>
                      <span className={`text-xs font-mono px-2 py-1 rounded ${
                        s.status === "ACTIVE" ? "bg-[#00e6a8]/10 text-[#00e6a8]" : "bg-blue-500/10 text-blue-400"
                      }`}>{s.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Recent Trades</h3>
                <div className="space-y-3">
                  {trades.slice(0, 5).map((t) => (
                    <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${t.up ? "bg-[#00e6a8]" : "bg-[#ff4d6d]"}`} />
                        <span className="font-semibold text-sm">{t.pair}</span>
                      </div>
                      <span className={`font-mono text-sm font-bold ${t.up ? "text-[#00e6a8]" : "text-[#ff4d6d]"}`}>{t.pnl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Manage Signals */}
        {activeTab === "signals" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Manage Signals</h2>
              <button
                onClick={() => {
                  setEditingSignal(null);
                  setSignalForm({ pair: "XAU/USD", type: "BUY", entry: "", sl: "", tp1: "", tp2: "", tp3: "", rr: "", reason: "", status: "ACTIVE" });
                  setShowSignalForm(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#00e6a8] hover:bg-[#19f0c0] text-black font-semibold transition flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                New Signal
              </button>
            </div>

            {/* Signal Form Modal */}
            {showSignalForm && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="glass rounded-2xl p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">{editingSignal ? "Edit Signal" : "Create New Signal"}</h3>
                    <button onClick={() => setShowSignalForm(false)} className="text-gray-400 hover:text-white">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Pair">
                      <select
                        value={signalForm.pair}
                        onChange={(e) => setSignalForm({ ...signalForm, pair: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 focus:border-[#00e6a8] outline-none rounded-lg px-4 py-3 text-sm"
                      >
                        <option>XAU/USD</option>
                        <option>BTC/USD</option>
                        <option>EUR/USD</option>
                        <option>GBP/USD</option>
                        <option>USD/JPY</option>
                      </select>
                    </FormField>

                    <FormField label="Type">
                      <select
                        value={signalForm.type}
                        onChange={(e) => setSignalForm({ ...signalForm, type: e.target.value as "BUY" | "SELL" })}
                        className="w-full bg-black/30 border border-white/10 focus:border-[#00e6a8] outline-none rounded-lg px-4 py-3 text-sm"
                      >
                        <option value="BUY">BUY</option>
                        <option value="SELL">SELL</option>
                      </select>
                    </FormField>

                    <FormField label="Entry Price">
                      <input
                        type="text"
                        value={signalForm.entry}
                        onChange={(e) => setSignalForm({ ...signalForm, entry: e.target.value })}
                        placeholder="2,342.50"
                        className="w-full bg-black/30 border border-white/10 focus:border-[#00e6a8] outline-none rounded-lg px-4 py-3 text-sm"
                      />
                    </FormField>

                    <FormField label="Stop Loss">
                      <input
                        type="text"
                        value={signalForm.sl}
                        onChange={(e) => setSignalForm({ ...signalForm, sl: e.target.value })}
                        placeholder="2,335.00"
                        className="w-full bg-black/30 border border-white/10 focus:border-[#00e6a8] outline-none rounded-lg px-4 py-3 text-sm"
                      />
                    </FormField>

                    <FormField label="TP 1">
                      <input
                        type="text"
                        value={signalForm.tp1}
                        onChange={(e) => setSignalForm({ ...signalForm, tp1: e.target.value })}
                        placeholder="2,355.00"
                        className="w-full bg-black/30 border border-white/10 focus:border-[#00e6a8] outline-none rounded-lg px-4 py-3 text-sm"
                      />
                    </FormField>

                    <FormField label="TP 2">
                      <input
                        type="text"
                        value={signalForm.tp2}
                        onChange={(e) => setSignalForm({ ...signalForm, tp2: e.target.value })}
                        placeholder="2,368.00"
                        className="w-full bg-black/30 border border-white/10 focus:border-[#00e6a8] outline-none rounded-lg px-4 py-3 text-sm"
                      />
                    </FormField>

                    <FormField label="TP 3">
                      <input
                        type="text"
                        value={signalForm.tp3}
                        onChange={(e) => setSignalForm({ ...signalForm, tp3: e.target.value })}
                        placeholder="2,380.00"
                        className="w-full bg-black/30 border border-white/10 focus:border-[#00e6a8] outline-none rounded-lg px-4 py-3 text-sm"
                      />
                    </FormField>

                    <FormField label="Risk : Reward">
                      <input
                        type="text"
                        value={signalForm.rr}
                        onChange={(e) => setSignalForm({ ...signalForm, rr: e.target.value })}
                        placeholder="1 : 5.1"
                        className="w-full bg-black/30 border border-white/10 focus:border-[#00e6a8] outline-none rounded-lg px-4 py-3 text-sm"
                      />
                    </FormField>

                    <FormField label="Status">
                      <select
                        value={signalForm.status}
                        onChange={(e) => setSignalForm({ ...signalForm, status: e.target.value as Signal["status"] })}
                        className="w-full bg-black/30 border border-white/10 focus:border-[#00e6a8] outline-none rounded-lg px-4 py-3 text-sm"
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="TP1 HIT">TP1 HIT</option>
                        <option value="TP2 HIT">TP2 HIT</option>
                        <option value="TP3 HIT">TP3 HIT</option>
                        <option value="SL HIT">SL HIT</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </FormField>
                  </div>

                  <FormField label="Analysis / Reason">
                    <textarea
                      value={signalForm.reason}
                      onChange={(e) => setSignalForm({ ...signalForm, reason: e.target.value })}
                      placeholder="Bounce dari demand zone H4, bullish divergence..."
                      rows={3}
                      className="w-full bg-black/30 border border-white/10 focus:border-[#00e6a8] outline-none rounded-lg px-4 py-3 text-sm resize-none"
                    />
                  </FormField>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleSaveSignal}
                      className="flex-1 px-6 py-3 rounded-xl bg-[#00e6a8] hover:bg-[#19f0c0] text-black font-semibold transition"
                    >
                      {editingSignal ? "Update Signal" : "Create Signal"}
                    </button>
                    <button
                      onClick={() => setShowSignalForm(false)}
                      className="px-6 py-3 rounded-xl border border-white/10 hover:border-white/30 text-white font-semibold transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Signals List */}
            <div className="space-y-4">
              {signals.map((s) => (
                <div key={s.id} className="glass rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-md text-xs font-bold font-mono ${
                        s.type === "BUY" ? "bg-[#00e6a8]/20 text-[#00e6a8]" : "bg-[#ff4d6d]/20 text-[#ff4d6d]"
                      }`}>{s.type}</span>
                      <span className="font-bold text-white text-lg">{s.pair}</span>
                      <span className={`text-xs font-mono px-2.5 py-1 rounded-md ${
                        s.status === "ACTIVE"
                          ? "bg-[#00e6a8]/15 text-[#00e6a8] border border-[#00e6a8]/30"
                          : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                      }`}>{s.status}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSignal(s)}
                        className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteSignal(s.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <div className="text-xs text-gray-500">Entry</div>
                      <div className="font-mono font-semibold">{s.entry}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">SL</div>
                      <div className="font-mono text-[#ff4d6d]">{s.sl}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">TP 1/2/3</div>
                      <div className="font-mono text-[#00e6a8] text-xs">{s.tp1} / {s.tp2} / {s.tp3}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">R:R</div>
                      <div className="font-mono text-[#00e6a8]">{s.rr}</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 text-xs text-gray-400">
                    <span className="text-gray-500">Analysis:</span> {s.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Manage Trades */}
        {activeTab === "trades" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Closed Trades</h2>
              <button
                onClick={() => setShowTradeForm(true)}
                className="px-5 py-2.5 rounded-xl bg-[#00e6a8] hover:bg-[#19f0c0] text-black font-semibold transition flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add Trade
              </button>
            </div>

            {showTradeForm && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="glass rounded-2xl p-6 lg:p-8 max-w-2xl w-full">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Add Closed Trade</h3>
                    <button onClick={() => setShowTradeForm(false)} className="text-gray-400 hover:text-white">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Pair">
                      <select
                        value={tradeForm.pair}
                        onChange={(e) => setTradeForm({ ...tradeForm, pair: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 focus:border-[#00e6a8] outline-none rounded-lg px-4 py-3 text-sm"
                      >
                        <option>XAU/USD</option>
                        <option>BTC/USD</option>
                        <option>EUR/USD</option>
                        <option>GBP/USD</option>
                        <option>USD/JPY</option>
                      </select>
                    </FormField>

                    <FormField label="Direction">
                      <select
                        value={tradeForm.dir}
                        onChange={(e) => setTradeForm({ ...tradeForm, dir: e.target.value as "LONG" | "SHORT" })}
                        className="w-full bg-black/30 border border-white/10 focus:border-[#00e6a8] outline-none rounded-lg px-4 py-3 text-sm"
                      >
                        <option value="LONG">LONG</option>
                        <option value="SHORT">SHORT</option>
                      </select>
                    </FormField>

                    <FormField label="Entry Price">
                      <input
                        type="text"
                        value={tradeForm.entry}
                        onChange={(e) => setTradeForm({ ...tradeForm, entry: e.target.value })}
                        placeholder="2,318.40"
                        className="w-full bg-black/30 border border-white/10 focus:border-[#00e6a8] outline-none rounded-lg px-4 py-3 text-sm"
                      />
                    </FormField>

                    <FormField label="Exit Price">
                      <input
                        type="text"
                        value={tradeForm.exit}
                        onChange={(e) => setTradeForm({ ...tradeForm, exit: e.target.value })}
                        placeholder="2,341.20"
                        className="w-full bg-black/30 border border-white/10 focus:border-[#00e6a8] outline-none rounded-lg px-4 py-3 text-sm"
                      />
                    </FormField>

                    <FormField label="P&L ($)">
                      <input
                        type="text"
                        value={tradeForm.pnl}
                        onChange={(e) => setTradeForm({ ...tradeForm, pnl: e.target.value })}
                        placeholder="+$4,560"
                        className="w-full bg-black/30 border border-white/10 focus:border-[#00e6a8] outline-none rounded-lg px-4 py-3 text-sm"
                      />
                    </FormField>

                    <FormField label="Percentage">
                      <input
                        type="text"
                        value={tradeForm.pct}
                        onChange={(e) => setTradeForm({ ...tradeForm, pct: e.target.value })}
                        placeholder="+1.97%"
                        className="w-full bg-black/30 border border-white/10 focus:border-[#00e6a8] outline-none rounded-lg px-4 py-3 text-sm"
                      />
                    </FormField>

                    <FormField label="Date">
                      <input
                        type="text"
                        value={tradeForm.date}
                        onChange={(e) => setTradeForm({ ...tradeForm, date: e.target.value })}
                        placeholder="12 Mar 2026"
                        className="w-full bg-black/30 border border-white/10 focus:border-[#00e6a8] outline-none rounded-lg px-4 py-3 text-sm"
                      />
                    </FormField>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleSaveTrade}
                      className="flex-1 px-6 py-3 rounded-xl bg-[#00e6a8] hover:bg-[#19f0c0] text-black font-semibold transition"
                    >
                      Add Trade
                    </button>
                    <button
                      onClick={() => setShowTradeForm(false)}
                      className="px-6 py-3 rounded-xl border border-white/10 hover:border-white/30 text-white font-semibold transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="glass rounded-2xl overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-xs uppercase tracking-wider text-gray-500 font-mono">
                <div className="col-span-2">Pair</div>
                <div className="col-span-1">Dir</div>
                <div className="col-span-2">Entry</div>
                <div className="col-span-2">Exit</div>
                <div className="col-span-2 text-right">P&L</div>
                <div className="col-span-1 text-right">%</div>
                <div className="col-span-1 text-right">Date</div>
                <div className="col-span-1 text-right">Action</div>
              </div>

              {trades.map((t) => (
                <div key={t.id} className="grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-4 px-6 py-5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition items-center">
                  <div className="md:col-span-2 font-semibold flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${t.up ? "bg-[#00e6a8]" : "bg-[#ff4d6d]"}`} />
                    {t.pair}
                  </div>
                  <div className="md:col-span-1">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                      t.dir === "LONG" ? "bg-[#00e6a8]/10 text-[#00e6a8]" : "bg-[#ff4d6d]/10 text-[#ff4d6d]"
                    }`}>{t.dir}</span>
                  </div>
                  <div className="md:col-span-2 font-mono text-sm text-gray-400">{t.entry}</div>
                  <div className="md:col-span-2 font-mono text-sm text-gray-400">{t.exit}</div>
                  <div className={`md:col-span-2 font-mono font-semibold md:text-right ${t.up ? "text-[#00e6a8]" : "text-[#ff4d6d]"}`}>{t.pnl}</div>
                  <div className={`md:col-span-1 font-mono text-sm md:text-right ${t.up ? "text-[#00e6a8]" : "text-[#ff4d6d]"}`}>{t.pct}</div>
                  <div className="md:col-span-1 text-xs text-gray-500 md:text-right font-mono">{t.date}</div>
                  <div className="md:col-span-1 md:text-right">
                    <button
                      onClick={() => handleDeleteTrade(t.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calendar Events */}
        {activeTab === "calendar" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Manage Calendar Events</h2>
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2">Calendar Management</h3>
              <p className="text-gray-400 mb-6">Calendar events are synced from Forex Factory (High Impact only)</p>
              <a
                href="https://www.forexfactory.com/calendar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00e6a8] hover:bg-[#19f0c0] text-black font-semibold transition"
              >
                View Forex Factory Calendar
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="glass rounded-xl p-5">
      <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
      <div className={`mt-2 text-2xl font-bold font-mono ${color}`}>{value}</div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="col-span-1">
      <label className="text-sm text-gray-400 mb-2 block">{label}</label>
      {children}
    </div>
  );
}
