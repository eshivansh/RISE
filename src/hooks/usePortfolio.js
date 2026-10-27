import { useSelector } from "react-redux";
import { findStock } from "../data/stocks.js";
import { START_CASH } from "../store/portfolioSlice.js";

export default function usePortfolio() {
  const { cash, holdings } = useSelector((state) => state.portfolio);
  const quotes = useSelector((state) => state.market.quotes);

  const symbols = Object.keys(holdings);

  // Value each position at the live price if we have one, else the sample or buy price.
  let invested = 0;
  for (const symbol of symbols) {
    let price = holdings[symbol].avg;
    const sample = findStock(symbol);
    if (sample) {
      price = sample.price;
    }
    if (quotes[symbol]) {
      price = quotes[symbol].price;
    }
    invested = invested + holdings[symbol].qty * price;
  }

  const equity = cash + invested;
  const profit = equity - START_CASH;

  return { cash, holdings, equity, profit, positions: symbols.length };
}
