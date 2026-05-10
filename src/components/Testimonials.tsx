const items = [
  {
    quote:
      "Disiplin Wahyudi dalam menjaga risiko luar biasa. Selama 18 bulan kerjasama, drawdown tidak pernah melebihi 5%. Reporting bulanan transparan dan profesional.",
    name: "Reza Hartono",
    role: "Family Office Principal, Jakarta",
    initials: "RH",
  },
  {
    quote:
      "Signal WahyudiFX jauh melampaui sekedar 'sinyal'. Saya belajar membaca struktur market sendiri. Akun saya tumbuh 142% dalam 14 bulan mengikuti signalnya.",
    name: "Stefani Linggar",
    role: "Independent Investor",
    initials: "SL",
  },
  {
    quote:
      "Kami memilih WahyudiFX sebagai external strategist karena pendekatan systematic-nya. Hasil backtest dan live performance konsisten — itu jarang di industri ini.",
    name: "Daniel Kusuma",
    role: "Portfolio Manager, Singapore",
    initials: "DK",
  },
];

export default function Testimonials() {
  return (
    <section id="testimoni" className="py-24 relative">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00e6a8] uppercase tracking-[0.2em]">
            <span className="w-8 h-px bg-[#00e6a8]" /> 09 — Testimoni <span className="w-8 h-px bg-[#00e6a8]" />
          </div>
          <h2 className="mt-4 text-4xl lg:text-5xl font-bold leading-tight">
            Dipercaya oleh klien institusi & retail.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <div key={i} className="glass rounded-2xl p-7 flex flex-col">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#00e6a8" className="opacity-60">
                <path d="M9 7H5a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 01-2 2H4v2h1a4 4 0 004-4V7zm10 0h-4a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 01-2 2h-1v2h1a4 4 0 004-4V7z" />
              </svg>
              <p className="mt-4 text-gray-300 leading-relaxed flex-1">"{t.quote}"</p>
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#00e6a8] to-[#19f0c0] grid place-items-center text-black font-bold">
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-50">
          {["MyFxBook", "TradingView", "Bloomberg", "FXCM Pro", "Binance VIP", "OANDA"].map((b) => (
            <div key={b} className="text-gray-400 font-semibold tracking-widest text-sm">
              {b.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
