import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Ticker from "./components/Ticker";
import Hero from "./components/Hero";
import About from "./components/About";
import Signals from "./components/Signals";
import TrackRecord from "./components/TrackRecord";
import Charts from "./components/Charts";
import LiquidationHeatmap from "./components/LiquidationHeatmap";
import EconomicCalendar from "./components/EconomicCalendar";
import Performance from "./components/Performance";
import Strategy from "./components/Strategy";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Admin from "./components/Admin";

export default function App() {
  const [route, setRoute] = useState(window.location.hash === "#admin" ? "admin" : "home");

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash === "#admin" ? "admin" : "home");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (route === "admin") {
    return <Admin />;
  }

  return (
    <div className="min-h-screen bg-[#07090d] text-white selection:bg-[#00e6a8]/30">
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Signals />
        <TrackRecord />
        <Charts />
        <LiquidationHeatmap />
        <EconomicCalendar />
        <Performance />
        <Strategy />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
