import { Link } from "react-router-dom";

export default function About() {
  return (
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
  );
}
