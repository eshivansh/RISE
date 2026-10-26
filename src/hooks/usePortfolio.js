import useLocalStorage from "./useLocalStorage.js";
import { findStock } from "../data/stocks.js";

export const START_CASH = 100000;

export default function usePortfolio() {
  const [cash, setCash] = useLocalStorage("rise_cash", START_CASH);
  const [holdings, setHoldings] = useLocalStorage("rise_holdings", {});

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

  function reset() {
    setCash(START_CASH);
    setHoldings({});
  }

  return { cash, holdings, equity, profit, positions: symbols.length, reset };
}
