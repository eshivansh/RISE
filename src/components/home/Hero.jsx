import { Link } from "react-router-dom";

export default function Hero() {
  return (
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
  );
}
