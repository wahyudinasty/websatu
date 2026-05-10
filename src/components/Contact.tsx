import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="kontak" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="relative max-w-[1400px] mx-auto px-4 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00e6a8] uppercase tracking-[0.2em]">
              <span className="w-8 h-px bg-[#00e6a8]" /> 10 — Kontak
            </div>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold leading-tight">
              Mari diskusikan tujuan investasi Anda.
            </h2>
            <p className="mt-5 text-gray-400 leading-relaxed">
              Konsultasi awal 30 menit gratis. Saya akan memetakan profil risiko Anda dan
              menentukan apakah pendekatan WahyudiFX cocok dengan tujuan finansial Anda.
            </p>

            <div className="mt-10 space-y-5">
              <ContactItem
                icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                label="Email"
                value="wahyudi@wahyudifx.com"
              />
              <ContactItem
                icon="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z"
                label="Telepon / WhatsApp"
                value="+62 812-9988-7766"
              />
              <ContactItem
                icon="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 7a3 3 0 100 6 3 3 0 000-6z"
                label="Lokasi"
                value="Jakarta, Indonesia · Singapore"
              />
            </div>

            <div className="mt-10 flex gap-3">
              {["X", "in", "TG", "TV"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-11 h-11 rounded-xl border border-white/10 hover:border-[#00e6a8] hover:text-[#00e6a8] grid place-items-center text-sm font-semibold transition"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                setTimeout(() => setSent(false), 4000);
              }}
              className="glass rounded-2xl p-7 lg:p-9"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Nama Lengkap" placeholder="John Doe" />
                <Field label="Email" type="email" placeholder="john@email.com" />
                <Field label="Telepon" placeholder="+62 ..." />
                <Field label="Modal Investasi (USD)" placeholder="50,000+" />
              </div>

              <div className="mt-5">
                <label className="text-sm text-gray-400">Tertarik dengan layanan</label>
                <div className="mt-2 grid sm:grid-cols-3 gap-2">
                  {["Managed Account", "Signal WahyudiFX", "Mentoring 1-on-1"].map((s) => (
                    <label key={s} className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-white/10 hover:border-white/30 cursor-pointer transition">
                      <input type="radio" name="svc" className="accent-[#00e6a8]" />
                      <span className="text-sm">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <label className="text-sm text-gray-400">Pesan</label>
                <textarea
                  rows={4}
                  placeholder="Ceritakan tujuan dan ekspektasi Anda..."
                  className="mt-2 w-full bg-black/30 border border-white/10 focus:border-[#00e6a8] outline-none rounded-lg px-4 py-3 text-sm transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-7 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#00e6a8] hover:bg-[#19f0c0] text-black font-semibold transition shadow-[0_0_40px_-10px_rgba(0,230,168,0.6)]"
              >
                {sent ? "✓ Pesan terkirim — Wahyudi akan menghubungi dalam 24 jam" : "Kirim Permintaan Konsultasi"}
              </button>

              <p className="mt-4 text-xs text-gray-500 text-center">
                Disclaimer: Trading memiliki risiko kehilangan modal. Performa masa lalu
                tidak menjamin hasil di masa depan.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <input
        {...props}
        className="mt-2 w-full bg-black/30 border border-white/10 focus:border-[#00e6a8] outline-none rounded-lg px-4 py-3 text-sm transition"
      />
    </div>
  );
}

function ContactItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl bg-[#00e6a8]/10 grid place-items-center text-[#00e6a8] flex-shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d={icon} />
        </svg>
      </div>
      <div>
        <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
        <div className="text-white font-medium mt-0.5">{value}</div>
      </div>
    </div>
  );
}
