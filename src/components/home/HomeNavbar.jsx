import { Link } from "react-router-dom";

export default function HomeNavbar() {
  return (
    <header className="header-blur">
      <section className="flex">
        <Link to="/" className="brand">
          <img src="/assets/image.png" alt="logo" />
          <span className="brand-title">RISE</span>
        </Link>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#reviews">Reviews</a>
          <a href="#graphs">Markets</a>
        </nav>
        <Link to="/login" className="btn-cta">Get started</Link>
      </section>
    </header>
  );
}
