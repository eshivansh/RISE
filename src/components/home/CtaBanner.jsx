import { Link } from "react-router-dom";

export default function CtaBanner() {
  return (
    <div className="cta-banner">
      <div className="cta-banner-inner reveal">
        <h2 className="cta-banner-title">READY TO <span>RISE?</span></h2>
        <p>Join thousands of traders who have already upgraded their intelligence. No credit card required to start your journey.</p>
        <Link to="/login" className="cta-primary">Create Free Account</Link>
      </div>
    </div>
  );
}
