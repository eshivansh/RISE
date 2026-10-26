import { Link } from "react-router-dom";

export default function HomeFooter() {
  return (
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
  );
}
