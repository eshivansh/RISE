import { useState } from "react";
import { findStock } from "../../data/stocks.js";
import { money } from "../../utils/format.js";
import usePortfolio from "../../hooks/usePortfolio.js";

export default function OrderPanel({ symbol }) {
  const { cash } = usePortfolio();
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("Pick a stock and set a quantity.");

  const stock = findStock(symbol);
  const cost = stock.price * qty;

  function handleQty(e) {
    const value = Number(e.target.value);
    if (value >= 1) {
      setQty(value);
    }
  }

  // Order panel is display only for now; real orders come later.
  function showComingSoon() {
    setNote("Placing orders is coming soon. Nothing was bought or sold.");
  }

  return (
    <section className="surface order-panel">
      <div className="section-title">
        <h2>Place Order</h2>
      </div>
      <div className="order-body">
        <div className="order-row"><span>Stock</span><strong>{symbol}</strong></div>
        <div className="order-row"><span>Price</span><strong>{money(stock.price)}</strong></div>

        <label className="field">
          <span>Quantity</span>
          <input type="number" min="1" value={qty} onChange={handleQty} />
        </label>

        <div className="order-row"><span>Estimated cost</span><strong>{money(cost)}</strong></div>
        <div className="order-row"><span>Cash available</span><strong>{money(cash)}</strong></div>

        <div className="buy-sell">
          <button type="button" className="btn-buy" onClick={showComingSoon}>Buy</button>
          <button type="button" className="btn-sell" onClick={showComingSoon}>Sell</button>
        </div>

        <div className="order-note">{note}</div>
      </div>
    </section>
  );
}
