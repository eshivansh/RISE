import { findStock } from "../../data/stocks.js";
import { money } from "../../utils/format.js";
import PriceChange from "../ui/PriceChange.jsx";
import StockChart from "../StockChart.jsx";

export default function ChartPanel({ symbol }) {
  const stock = findStock(symbol);

  return (
    <section className="surface chart-panel">
      <div className="chart-head">
        <div className="chart-title">
          <h2>{symbol}</h2>
          <span className="chart-name">{stock.name}</span>
        </div>
        <div className="chart-quote">
          <span className="chart-price">{money(stock.price)}</span>
          <PriceChange value={stock.change} />
        </div>
      </div>
      <StockChart symbol={symbol} />
    </section>
  );
}
