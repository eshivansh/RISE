import { useDispatch, useSelector } from "react-redux";
import useStock from "../../hooks/useStock.js";
import { money } from "../../utils/format.js";
import { removeFromWatchlist } from "../../store/watchlistSlice.js";
import PriceChange from "../ui/PriceChange.jsx";

function WatchRow({ symbol, active, onPick, onRemove }) {
  const stock = useStock(symbol);
  return (
    <div className="watch-item">
      <button
        type="button"
        className={active ? "watch-row is-active" : "watch-row"}
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
        onClick={() => onRemove(symbol)}
      >
        ×
      </button>
    </div>
  );
}

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
        {symbols.map((symbol) => (
          <WatchRow
            key={symbol}
            symbol={symbol}
            active={symbol === picked}
            onPick={onPick}
            onRemove={(s) => dispatch(removeFromWatchlist(s))}
          />
        ))}
        {symbols.length === 0 && (
          <p className="watch-empty">Search above or use + in the table below to add stocks.</p>
        )}
      </div>
    </section>
  );
}
