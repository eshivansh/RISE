import { useNavigate } from "react-router-dom";
import { stocks } from "../../data/stocks.js";
import { money } from "../../utils/format.js";
import PriceChange from "../ui/PriceChange.jsx";

export default function MarketMovers() {
  const navigate = useNavigate();

  function goToDashboard() {
    navigate("/dashboard");
  }

  return (
    <div className="welcome-panel">
      <div className="panel-header">
        <h2 className="panel-title">Market Movers</h2>
        <button className="btn-open-trading" onClick={goToDashboard}>
          Open Trading
        </button>
      </div>
      <div className="movers-list">
        {stocks.map((s) => (
          <div
            className="mover-row"
            key={s.symbol}
            onClick={goToDashboard}
          >
            <div className="mover-info">
              <span className="mover-sym">{s.symbol}</span>
              <span className="mover-name">{s.name}</span>
            </div>
            <div className="mover-prices">
              <span className="mover-price">{money(s.price)}</span>
              <PriceChange value={s.change} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
