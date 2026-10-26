import TradingViewWidget from "../TradingViewWidget.jsx";
import { charts } from "../../data/homeContent.js";

export default function MarketCharts() {
  return (
    <div className="stocks" id="graphs">
      <div className="container">
        <p className="section-label reveal">Live Markets</p>
        <h2 className="section-heading reveal">Today's <em>top movers</em></h2>
        <div className="grid">
          {charts.map((c) => (
            <div className="card" key={c.symbol}>
              <div className="card-top">{c.name} <span>{c.label}</span></div>
              <TradingViewWidget symbol={c.symbol} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
