import { money } from "../../utils/format.js";
import { useDispatch } from "react-redux";
import usePortfolio from "../../hooks/usePortfolio.js";
import useStock from "../../hooks/useStock.js";
import { reset } from "../../store/portfolioSlice.js";
import TermHelp from "./TermHelp.jsx";

function PortfolioRow({ symbol, holding, onPick }) {
  const stock = useStock(symbol);
  const pl = (stock.price - holding.avg) * holding.qty;
  return (
    <tr>
      <td>
        <button type="button" className="symbol-link" onClick={() => onPick(symbol)}>{symbol}</button>
      </td>
      <td>{holding.qty}</td>
      <td>{money(holding.avg)}</td>
      <td>{money(stock.price)}</td>
      <td className={pl < 0 ? "pl-down" : "pl-up"}>{money(pl)}</td>
    </tr>
  );
}

export default function Portfolio({ onPick }) {
  const dispatch = useDispatch();
  const { cash, holdings, equity, profit } = usePortfolio();
  const symbols = Object.keys(holdings);

  return (
    <div className="portfolio">
      <div className="stats-row">
        <div className="stat">
          <span>Cash</span>
          <strong>{money(cash)}</strong>
        </div>
        <div className="stat">
          <span>Equity <TermHelp term="equity" /></span>
          <strong>{money(equity)}</strong>
        </div>
        <div className="stat">
          <span>Profit / Loss <TermHelp term="profit and loss (P/L)" /></span>
          <strong className={profit < 0 ? "pl-down" : "pl-up"}>{money(profit)}</strong>
        </div>
        <button type="button" className="btn-quiet" onClick={() => dispatch(reset())}>
          Reset account
        </button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Qty</th>
              <th>Avg price <TermHelp term="average price" /></th>
              <th>Price</th>
              <th>P/L</th>
            </tr>
          </thead>
          <tbody>
            {symbols.map((symbol) => (
              <PortfolioRow key={symbol} symbol={symbol} holding={holdings[symbol]} onPick={onPick} />
            ))}
            {symbols.length === 0 && (
              <tr className="empty-row">
                <td colSpan={5}>No positions yet. Buy 1 share of any stock above to start your first lesson.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
