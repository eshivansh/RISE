import { Link } from "react-router-dom";
import SymbolSearch from "./SymbolSearch.jsx";

export default function DashHeader({ onPick, onRiskInfo }) {
  return (
    <header className="app-header header-blur">
      <div className="header-container">
        <Link to="/" className="brand">
          <img src="/assets/image.png" alt="logo" />
          <span className="brand-title">RISE</span>
        </Link>

        <SymbolSearch onPick={onPick} />

        <div className="header-actions">
          <button type="button" className="risk-link" onClick={onRiskInfo}>
            <i className="bi bi-exclamation-triangle"></i> Risk info
          </button>
          <Link to="/welcome" className="header-back">
            <i className="bi bi-grid-1x2"></i> Home
          </Link>
        </div>
      </div>
    </header>
  );
}
