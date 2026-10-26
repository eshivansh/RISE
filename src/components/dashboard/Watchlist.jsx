import { useDispatch, useSelector } from "react-redux";
import { findStock } from "../../data/stocks.js";
import { money } from "../../utils/format.js";
import { removeFromWatchlist } from "../../store/watchlistSlice.js";
import PriceChange from "../ui/PriceChange.jsx";

export default function Watchlist({ picked, onPick }) {
  const dispatch = useDispatch();
  const symbols = useSelector((state) => state.watchlist.symbols);

  return (
    <section className="surface watchlist-panel">
      <div className="section-title">
        <h2>Watchlist</h2>
        <span>{symbols.length} stocks</span>
      </div>
      <div className="watchlist">
        {symbols.map((symbol) => {
          const stock = findStock(symbol);
          return (
            <div className="watch-item" key={symbol}>
              <button
                type="button"
                className={symbol === picked ? "watch-row is-active" : "watch-row"}
                onClick={() => onPick(symbol)}
              >
                <span>
                  <span className="watch-symbol">{symbol}</span>
                  <span className="watch-name">{stock.name}</span>
                </span>
                <span className="watch-quote">
                  <strong>{money(stock.price)}</strong>
                  <PriceChange value={stock.change} />
                </span>
              </button>
              <button
                type="button"
                className="watch-remove"
                aria-label={"Remove " + symbol + " from watchlist"}
                onClick={() => dispatch(removeFromWatchlist(symbol))}
              >
                ×
              </button>
            </div>
          );
        })}
        {symbols.length === 0 && (
          <p className="watch-empty">Add stocks with + in the table below.</p>
        )}
      </div>
    </section>
  );
}
