import { useDispatch, useSelector } from "react-redux";
import useStock from "../../hooks/useStock.js";
import { money } from "../../utils/format.js";
import { removeFromWatchlist } from "../../store/watchlistSlice.js";
import PriceChange from "../ui/PriceChange.jsx";

function WatchRow({ symbol, active, onPick, onRemove }) {
  const stock = useStock(symbol);
  return (
    <li className={active ? "watch-item is-active" : "watch-item"}>
      <button type="button" className="watch-row" aria-current={active} onClick={() => onPick(symbol)}>
        <span className="watch-left">
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
        <i className="bi bi-x" aria-hidden="true"></i>
      </button>
    </li>
  );
}

export default function Watchlist({ picked, onPick }) {
  const dispatch = useDispatch();
  const symbols = useSelector((state) => state.watchlist.symbols);

  function focusSearch() {
    const box = document.getElementById("symbol-search");
    if (box) {
      box.focus();
    }
  }

  return (
    <section className="watchlist-panel" aria-label="Watchlist">
      <h2 className="col-title">Watchlist</h2>
      <ul className="watchlist">
        {symbols.map((symbol) => (
          <WatchRow
            key={symbol}
            symbol={symbol}
            active={symbol === picked}
            onPick={onPick}
            onRemove={(s) => dispatch(removeFromWatchlist(s))}
          />
        ))}
      </ul>
      {symbols.length === 0 && <p className="watch-empty">Your watchlist is empty.</p>}
      <button type="button" className="btn-add" onClick={focusSearch}>
        <i className="bi bi-plus" aria-hidden="true"></i> Add stock
      </button>
    </section>
  );
}
