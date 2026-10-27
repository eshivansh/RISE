import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findStock } from "../../data/stocks.js";
import { money } from "../../utils/format.js";

export default function MyWatchlist() {
  const symbols = useSelector((state) => state.watchlist.symbols);
  const navigate = useNavigate();

  function goToDashboard() {
    navigate("/dashboard");
  }

  return (
    <div className="welcome-panel">
      <div className="panel-header">
        <h2 className="panel-title">My Watchlist</h2>
      </div>
      {symbols.length === 0 ? (
        <p className="empty-message">Your watchlist is empty. Add stocks on the Dashboard.</p>
      ) : (
        <div className="watchlist-list">
          {symbols.map((sym) => {
            const stock = findStock(sym);
            if (!stock) {
              return null;
            }
            return (
              <div
                className="watchlist-row"
                key={sym}
                onClick={goToDashboard}
              >
                <div className="watchlist-info">
                  <span className="watchlist-sym">{stock.symbol}</span>
                  <span className="watchlist-name">{stock.name}</span>
                </div>
                <div className="watchlist-prices">
                  <span className="watchlist-price">{money(stock.price)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
