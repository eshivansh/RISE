import { useSelector } from "react-redux";
import { findStock } from "../data/stocks.js";

// One stock with the best data we have: live price if fetched, else sample data.
export default function useStock(symbol) {
  const quote = useSelector((state) => state.market.quotes[symbol]);
  const searchedName = useSelector((state) => state.market.names[symbol]);
  const sample = findStock(symbol);

  let name = symbol;
  let price = 100;
  let change = 0;
  let exchange = "";

  if (sample) {
    name = sample.name;
    price = sample.price;
    change = sample.change;
    exchange = sample.exchange;
  } else if (searchedName) {
    name = searchedName;
  }

  if (quote) {
    price = quote.price;
    change = quote.change;
  }

  return { symbol, name, price, change, exchange, isLive: Boolean(quote) };
}
