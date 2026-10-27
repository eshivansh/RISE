import { money } from "../utils/format.js";

// Short lessons the coach shows right after a trade. Written here, so no API call is needed.

export function tipAfterBuy(symbol, qty, price, cashBefore) {
  const cost = qty * price;
  const share = (cost / cashBefore) * 100;

  let size = "a small position, a careful way to start.";
  if (share > 25) {
    size = "a big part of your cash. Most traders risk much less on one stock.";
  }

  return (
    "You bought " + qty + " " + symbol + " for " + money(cost) + ". That is " +
    share.toFixed(1) + "% of your cash, " + size +
    " Tap Risk check to learn how position size protects you."
  );
}

export function tipAfterSell(symbol, qty, price, avg) {
  const pl = (price - avg) * qty;

  if (pl >= 0) {
    return (
      "You sold " + qty + " " + symbol + " with a profit of " + money(pl) +
      ". Ask me how traders decide when to take profit."
    );
  }
  return (
    "You sold " + qty + " " + symbol + " at a loss of " + money(-pl) +
    ". Losses are part of learning. Ask me what a stop rule is and how it limits losses."
  );
}
