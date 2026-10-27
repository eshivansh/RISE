import { useState } from "react";
import { useDispatch } from "react-redux";
import useStock from "../../hooks/useStock.js";
import { money } from "../../utils/format.js";
import usePortfolio from "../../hooks/usePortfolio.js";
import { buy, sell } from "../../store/portfolioSlice.js";

export default function OrderPanel({ symbol }) {
  const dispatch = useDispatch();
  const { cash, holdings } = usePortfolio();
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("Pick a stock, set a quantity, then Buy or Sell.");

  const stock = useStock(symbol);
  const cost = stock.price * qty;
  let owned = 0;
  if (holdings[symbol]) {
    owned = holdings[symbol].qty;
  }

  function handleQty(e) {
    const value = Number(e.target.value);
    if (value >= 1) {
      setQty(value);
    }
  }

  function handleBuy() {
    if (cost > cash) {
      setNote("Not enough cash for this order.");
      return;
    }
    dispatch(buy({ symbol: symbol, qty: qty, price: stock.price }));
    setNote("Bought " + qty + " " + symbol + " at " + money(stock.price) + ".");
  }

  function handleSell() {
    if (qty > owned) {
      setNote("You only own " + owned + " " + symbol + ".");
      return;
    }
    dispatch(sell({ symbol: symbol, qty: qty, price: stock.price }));
    setNote("Sold " + qty + " " + symbol + " at " + money(stock.price) + ".");
  }

  return (
    <section className="surface order-panel">
      <div className="section-title">
        <h2>Place Order</h2>
      </div>
      <div className="order-body">
        <div className="order-row"><span>Stock</span><strong>{symbol}</strong></div>
        <div className="order-row"><span>Price</span><strong>{money(stock.price)}</strong></div>
        <div className="order-row"><span>You own</span><strong>{owned}</strong></div>

        <label className="field">
          <span>Quantity</span>
          <input type="number" min="1" value={qty} onChange={handleQty} />
        </label>

        <div className="order-row"><span>Estimated cost</span><strong>{money(cost)}</strong></div>
        <div className="order-row"><span>Cash available</span><strong>{money(cash)}</strong></div>

        <div className="buy-sell">
          <button type="button" className="btn-buy" onClick={handleBuy}>Buy</button>
          <button type="button" className="btn-sell" onClick={handleSell}>Sell</button>
        </div>

        <div className="order-note">{note}</div>
      </div>
    </section>
  );
}
