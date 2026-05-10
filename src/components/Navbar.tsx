import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "Tentang" },
  { href: "#signals", label: "Signals" },
  { href: "#charts", label: "Charts" },
  { href: "#heatmap", label: "Heatmap" },
  { href: "#calendar", label: "Kalender" },
  { href: "#performance", label: "Performa" },
  { href: "#strategy", label: "Strategi" },
  { href: "#kontak", label: "Kontak" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled
          ? "backdrop-blur-xl bg-[#07090d]/80 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-[#00e6a8] to-[#19f0c0] grid place-items-center text-black font-bold text-sm shadow-[0_0_20px_-5px_rgba(0,230,168,0.5)]">
            W
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#00e6a8] pulse-dot text-[#00e6a8]" />
          </div>
          <span className="font-semibold tracking-tight text-lg">
            Wahyudi<span className="text-[#00e6a8]">FX</span>
          </span>
        </a>

        <nav className="hidden xl:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-gray-400 hover:text-white transition relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00e6a8] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#admin"
            onClick={() => window.location.hash = "admin"}
            className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:border-[#00e6a8] text-gray-400 hover:text-[#00e6a8] text-xs font-semibold transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Admin
          </a>
          <a
            href="#kontak"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00e6a8] hover:bg-[#19f0c0] text-black text-sm font-semibold transition"
          >
            Konsultasi Gratis
          </a>
          <button
            className="xl:hidden w-10 h-10 grid place-items-center rounded-lg border border-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-label="menu"
          >
            <div className="space-y-1.5">
              <span className={`block h-px w-5 bg-white transition ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-white transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="xl:hidden border-t border-white/5 bg-[#07090d]/95 backdrop-blur-xl">
          <div className="px-6 py-4 flex flex-col gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-gray-300 hover:text-white transition"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
