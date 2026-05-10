export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00e6a8] to-[#19f0c0] grid place-items-center text-black font-bold text-sm">
            W
          </div>
          <span className="font-semibold">
            Wahyudi<span className="text-[#00e6a8]">FX</span>
          </span>
        </div>
        <p className="text-sm text-gray-500">
          © 2026 WahyudiFX. Built with discipline & data.
        </p>
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#admin" onClick={() => window.location.hash = "admin"} className="hover:text-[#00e6a8] transition">Admin</a>
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
          <a href="#" className="hover:text-white transition">Risk Disclosure</a>
        </div>
      </div>
    </footer>
  );
}
