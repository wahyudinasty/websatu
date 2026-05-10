export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionLabel>01 — Tentang</SectionLabel>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold leading-tight">
              Founder WahyudiFX — membaca pasar, bukan menebak.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-gray-400 leading-relaxed">
            <p>
              Saya <span className="text-white font-medium">Wahyudi</span>, founder dari{" "}
              <span className="text-[#00e6a8] font-semibold">WahyudiFX</span> — platform trading & edukasi
              yang dibangun dengan filosofi: <span className="text-white">disiplin, data, dan konsistensi</span>.
              Karir trading saya dimulai tahun 2024, dari retail trader hingga mengelola portofolio
              institusional dan membangun komunitas trader profitable.
            </p>
            <p>
              WahyudiFX menyediakan layanan <span className="text-white">managed account, live signals,
              mentoring 1-on-1, dan analisis teknikal harian</span>. Setiap setup divalidasi dengan
              multi-timeframe confluence, on-chain data (untuk crypto), dan analisis makroekonomi.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {credentials.map((c) => (
                <div key={c.title} className="glass rounded-xl p-5 hover:border-white/20 transition">
                  <div className="w-10 h-10 rounded-lg bg-[#00e6a8]/10 grid place-items-center text-[#00e6a8] mb-3">
                    {c.icon}
                  </div>
                  <div className="font-semibold text-white">{c.title}</div>
                  <div className="text-sm text-gray-500 mt-1">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
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

const credentials = [
  {
    title: "Founder WahyudiFX",
    desc: "Membangun ekosistem trading profesional sejak 2019.",
    icon: <Icon path="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
  },
  {
    title: "8+ Tahun Aktif",
    desc: "Pengalaman live trading di siklus bull, bear, dan sideways.",
    icon: <Icon path="M12 8v4l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  },
  {
    title: "Multi-Asset",
    desc: "Forex major, indeks, komoditas (Gold), dan crypto top cap.",
    icon: <Icon path="M3 3v18h18M7 14l4-4 4 4 5-5" />,
  },
  {
    title: "Risk First",
    desc: "Max risiko per trade 1%, drawdown bulanan dijaga < 8%.",
    icon: <Icon path="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />,
  },
];

function Icon({ path }: { path: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}
