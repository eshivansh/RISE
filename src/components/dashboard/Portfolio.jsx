import { money } from "../../utils/format.js";
import { useDispatch } from "react-redux";
import usePortfolio from "../../hooks/usePortfolio.js";
import useStock from "../../hooks/useStock.js";
import { reset } from "../../store/portfolioSlice.js";

function PortfolioRow({ symbol, holding }) {
  const stock = useStock(symbol);
  const pl = (stock.price - holding.avg) * holding.qty;
  return (
    <tr>
      <td>{symbol}</td>
      <td>{holding.qty}</td>
      <td>{money(holding.avg)}</td>
      <td>{money(stock.price)}</td>
      <td className={pl < 0 ? "pl-down" : "pl-up"}>{money(pl)}</td>
    </tr>
  );
}

export default function Portfolio() {
  const dispatch = useDispatch();
  const { cash, holdings, equity, profit } = usePortfolio();
  const symbols = Object.keys(holdings);

  return (
    <section className="surface portfolio-panel">
      <div className="section-title">
        <h2>Demo Portfolio</h2>
        <button type="button" className="btn-reset" onClick={() => dispatch(reset())}>
          Reset account
        </button>
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
            {symbols.map((symbol) => (
              <PortfolioRow key={symbol} symbol={symbol} holding={holdings[symbol]} />
            ))}
            {symbols.length === 0 && (
              <tr className="empty-row">
                <td colSpan={5}>No positions yet. Buy a stock in the order panel to start.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
