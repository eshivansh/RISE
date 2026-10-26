import { findStock } from "../../data/stocks.js";
import { money } from "../../utils/format.js";
import PriceChange from "../ui/PriceChange.jsx";

const watchSymbols = ["AAPL", "GOOGL", "NVDA", "TSLA", "MSFT", "BA"];

export default function Watchlist({ picked, onPick }) {
  return (
    <section className="surface watchlist-panel">
      <div className="section-title">
        <h2>Watchlist</h2>
      </div>
      <div className="watchlist">
        {watchSymbols.map((symbol) => {
          const stock = findStock(symbol);
          return (
            <button
              type="button"
              key={symbol}
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
          );
        })}
      </div>
    </section>
  );
}
