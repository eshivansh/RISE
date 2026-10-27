import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useStock from "../../hooks/useStock.js";
import { money } from "../../utils/format.js";

function WatchlistRow({ symbol, onOpen }) {
  const stock = useStock(symbol);
  return (
    <button type="button" className="watchlist-row" onClick={() => onOpen(symbol)}>
      <div className="watchlist-info">
        <span className="watchlist-sym">{stock.symbol}</span>
        <span className="watchlist-name">{stock.name}</span>
      </div>
      <div className="watchlist-prices">
        <span className="watchlist-price">{money(stock.price)}</span>
      </div>
    </button>
  );
}

export default function MyWatchlist() {
  const symbols = useSelector((state) => state.watchlist.symbols);
  const navigate = useNavigate();

  function openStock(symbol) {
    navigate("/dashboard", { state: { symbol: symbol } });
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
          {symbols.map((sym) => (
            <WatchlistRow key={sym} symbol={sym} onOpen={openStock} />
          ))}
        </div>
      )}
    </div>
  );
}
