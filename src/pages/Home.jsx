import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/homepage.css";
import TradingViewWidget from "../components/TradingViewWidget.jsx";

import { charts } from "../data/homeContent.js";
import HomeNavbar from "../components/home/HomeNavbar.jsx";
import Hero from "../components/home/Hero.jsx";
import Ticker from "../components/home/Ticker.jsx";
import Features from "../components/home/Features.jsx";
import About from "../components/home/About.jsx";
import Reviews from "../components/home/Reviews.jsx";
import Stats from "../components/home/Stats.jsx";

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

  let chartRows = [];
  for (let i = 0; i < charts.length; i++) {
    let c = charts[i];
    chartRows.push(
      <div className="card" key={c.symbol}>
        <div className="card-top">{c.name} <span>{c.label}</span></div>
        <TradingViewWidget symbol={c.symbol} />
      </div>
    );
  }

  return (
    <div className="home-page">
      <HomeNavbar />
      <Hero />
      <Ticker />
      <Features />
      <About />
      <Reviews />
      <Stats />

      <div className="stocks" id="graphs">
        <div className="container">
          <p className="section-label reveal">Live Markets</p>
          <h2 className="section-heading reveal">Today's <em>top movers</em></h2>
          <div className="grid">{chartRows}</div>
        </div>
      </div>

      <div className="cta-banner">
        <div className="cta-banner-inner reveal">
          <h2 className="cta-banner-title">READY TO <span>RISE?</span></h2>
          <p>Join thousands of traders who have already upgraded their intelligence. No credit card required to start your journey.</p>
          <Link to="/login" className="cta-primary">Create Free Account</Link>
        </div>
      </div>

      <footer className="footer-new">
        <div className="footer-grid">
          <div>
            <Link to="/" className="footer-brand">
              <img src="/assets/image.png" alt="logo" />
              <span>RISE</span>
            </Link>
            <p className="footer-desc">The next-generation trading platform built on AI, speed, and unwavering security. Your wealth starts here.</p>
          </div>
          <div>
            <div className="footer-heading">Navigate</div>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#reviews">Reviews</a>
              <a href="#graphs">Markets</a>
            </div>
          </div>
          <div>
            <div className="footer-heading">Account</div>
            <div className="footer-links">
              <Link to="/login">Sign In</Link>
              <Link to="/login">Register</Link>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms</a>
            </div>
          </div>
          <div>
            <div className="footer-heading">Contact</div>
            <div className="footer-links">
              <a href="mailto:info@rise.com">info@rise.com</a>
              <a href="tel:+91 9XXXX XXXXX">+91 9XXXX XXXXX</a>
              <a href="#">GitHub</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Developed by Team RISE&reg; | All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}