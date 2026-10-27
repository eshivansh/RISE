import { useNavigate } from "react-router-dom";
import { stocks } from "../../data/stocks.js";
import { money } from "../../utils/format.js";
import PriceChange from "../ui/PriceChange.jsx";

export default function MarketMovers() {
  const navigate = useNavigate();

  // Router state tells the Dashboard which stock to open.
  function openStock(symbol) {
    navigate("/dashboard", { state: { symbol: symbol } });
  }

  return (
    <div className="welcome-panel">
      <div className="panel-header">
        <h2 className="panel-title">Market Movers</h2>
        <button type="button" className="btn-open-trading" onClick={() => navigate("/dashboard")}>
          Open Trading
        </button>
      </div>
      <div className="movers-list">
        {stocks.map((s) => (
          <button
            type="button"
            className="mover-row"
            key={s.symbol}
            onClick={() => openStock(s.symbol)}
          >
            <div className="mover-info">
              <span className="mover-sym">{s.symbol}</span>
              <span className="mover-name">{s.name}</span>
            </div>
            <div className="mover-prices">
              <span className="mover-price">{money(s.price)}</span>
              <PriceChange value={s.change} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
