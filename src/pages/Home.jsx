import { useEffect } from "react";
import "../styles/homepage.css";
import HomeNavbar from "../components/home/HomeNavbar.jsx";
import Hero from "../components/home/Hero.jsx";
import Ticker from "../components/home/Ticker.jsx";
import Features from "../components/home/Features.jsx";
import About from "../components/home/About.jsx";
import Reviews from "../components/home/Reviews.jsx";
import Stats from "../components/home/Stats.jsx";
import MarketCharts from "../components/home/MarketCharts.jsx";
import CtaBanner from "../components/home/CtaBanner.jsx";
import HomeFooter from "../components/home/HomeFooter.jsx";

export default function Home() {
  useEffect(function () {
    const items = document.querySelectorAll(".reveal");
    const watcher = new IntersectionObserver(function (entries) {
      for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add("visible");
        }
      }
    }, { threshold: 0.1 });

    for (let i = 0; i < items.length; i++) {
      watcher.observe(items[i]);
    }
    return function () {
      watcher.disconnect();
    };
  }, []);

  return (
    <div className="home-page">
      <HomeNavbar />
      <Hero />
      <Ticker />
      <Features />
      <About />
      <Reviews />
      <Stats />
      <MarketCharts />
      <CtaBanner />
      <HomeFooter />
    </div>
  );
}