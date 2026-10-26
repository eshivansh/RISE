import { findStock } from "../../data/stocks.js";
import { money } from "../../utils/format.js";
import usePortfolio from "../../hooks/usePortfolio.js";

export default function Portfolio() {
  const { cash, holdings, equity, profit } = usePortfolio();
  const symbols = Object.keys(holdings);

  return (
    <section className="surface portfolio-panel">
      <div className="section-title">
        <h2>Demo Portfolio</h2>
      </div>

      <div className="stats-row">
        <div><span>Cash</span><strong>{money(cash)}</strong></div>
        <div><span>Equity</span><strong>{money(equity)}</strong></div>
        <div>
          <span>Profit / Loss</span>
          <strong className={profit < 0 ? "pl-down" : "pl-up"}>{money(profit)}</strong>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Symbol</th><th>Qty</th><th>Avg price</th><th>Price</th><th>P/L</th></tr>
          </thead>
          <tbody>
            {symbols.map((symbol) => {
              const h = holdings[symbol];
              const price = findStock(symbol).price;
              const pl = (price - h.avg) * h.qty;
              return (
                <tr key={symbol}>
                  <td>{symbol}</td>
                  <td>{h.qty}</td>
                  <td>{money(h.avg)}</td>
                  <td>{money(price)}</td>
                  <td className={pl < 0 ? "pl-down" : "pl-up"}>{money(pl)}</td>
                </tr>
              );
            })}
            {symbols.length === 0 && (
              <tr className="empty-row">
                <td colSpan={5}>No positions yet. Buying stocks will be added soon.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
