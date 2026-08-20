import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/homepage.css";


const boxes = [
  { icon: "bi-graph-up-arrow", title: "Grow Your Wealth", text: "Invest in high-growth markets with smart strategies designed to maximize your long-term returns." },
  { icon: "bi-lightbulb", title: "AI Smart Advisor", text: "Get AI driven insights and expert guidance to make confident financial suggestions." },
  { icon: "bi-shield-check", title: "Secure Platform", text: "Advanced encryption and multi-layer protection keep your investments completely safe." },
  { icon: "bi-credit-card", title: "Instant Payments", text: "Deposit and invest instantly with seamless and secure payment integrations." },
  { icon: "bi-wallet2", title: "Fast Withdrawals", text: "Access your funds anytime with quick and hassle-free withdrawal processes." },
  { icon: "bi-headset", title: "24/7 Support", text: "Our support team is always available to help you whenever you need assistance." },
];



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

  let boxRows = [];
  for (let i = 0; i < boxes.length; i++) {
    let b = boxes[i];
    boxRows.push(
      <div className="box" key={b.title}>
        <i className={"bi " + b.icon}></i>
        <h3>{b.title}</h3>
        <p>{b.text}</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <header className="header-blur">
        <section className="flex">
          <Link to="/" className="brand">
            <img src="/assets/image.png" alt="logo" />
            <span className="brand-title">RISE</span>
          </Link>
          <nav className="nav">
            <a href="#home">Home</a>
            <a href="#about">About</a>
          </nav>
          <Link to="/login" className="btn-cta">Get started</Link>
        </section>
      </header>

      <div className="home" id="home">
        <video id="bg-video" autoPlay loop muted playsInline>
          <source src="/assets/Video2.mp4" type="video/mp4" />
        </video>

        <div className="hero-new reveal">
          <h1 className="hero-title-new">TRADE THE <br /><span className="accent">FUTURE</span></h1>
          <p className="hero-sub-new">Master the markets with institutional-grade AI, lightning-fast execution, and a community of elite traders.</p>
          <div className="hero-btns">
            <Link to="/login" className="cta-primary">Launch Terminal</Link>
          </div>
        </div>
      </div>

      <section className="services reveal">
        <p className="section-label">Platform Features</p>
        <h2 className="section-heading">Everything you need to <em>grow</em></h2>
        <div className="box-container">{boxRows}</div>
      </section>

      <div className="about-new" id="about">
        <div className="container">
          <p className="section-label reveal">Our Mission</p>
          <div className="about-grid">
            <div className="about-text reveal">
              <h2 className="section-heading">Built by traders, <br /><em>for traders</em></h2>
              <p>RISE was built from the ground up with one belief: that sophisticated market tools shouldn't be reserved for Wall Street. We've democratized access to institutional-grade intelligence.</p>
              <p>From AI-driven trade coaching to real-time market feeds, every feature is engineered to give you an edge — whether you're making your first trade or your ten-thousandth.</p>
              <p>Our platform adapts to you. The more you use RISE, the smarter it gets at anticipating your needs, flagging your opportunities, and protecting your positions.</p>
              <Link to="/login" className="btn-cta" style={{ display: "inline-block", marginTop: "24px" }}>Join RISE Today</Link>
            </div>
            <div className="about-visual reveal">
              <img src="/assets/image2.jpeg" alt="Trading platform" />
            </div>
          </div>
        </div>
      </div>

      <div className="numbers-section reveal">
        <div className="numbers-inner">
          <div className="num-box"><div className="num-val">500K+</div><div className="num-label">Active Traders</div></div>
          <div className="num-box"><div className="num-val">$2.4B</div><div className="num-label">Volume Traded</div></div>
          <div className="num-box"><div className="num-val">99.9%</div><div className="num-label">Uptime</div></div>
        </div>
      </div>

      <div className="cta-banner">
        <div className="cta-banner-inner reveal">
          <h2 className="cta-banner-title">READY TO <span>RISE?</span></h2>
          <p>Join thousands of traders who have already upgraded their intelligence. No credit card required to start your journey.</p>
          <Link to="/login" className="cta-primary">Create Free Account</Link>
        </div>
      </div>
    </div>
  );
}