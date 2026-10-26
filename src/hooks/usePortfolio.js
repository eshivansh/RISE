import { useSelector } from "react-redux";
import { findStock } from "../data/stocks.js";
import { START_CASH } from "../store/portfolioSlice.js";

export default function usePortfolio() {
  const { cash, holdings } = useSelector((state) => state.portfolio);

  const symbols = Object.keys(holdings);

  let invested = 0;
  for (const symbol of symbols) {
    const stock = findStock(symbol);
    if (stock) {
      invested = invested + holdings[symbol].qty * stock.price;
    }
  }

  const equity = cash + invested;
  const profit = equity - START_CASH;

  return { cash, holdings, equity, profit, positions: symbols.length };
}
