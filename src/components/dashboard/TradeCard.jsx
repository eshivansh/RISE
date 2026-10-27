import { useState } from "react";
import { useDispatch } from "react-redux";
import useStock from "../../hooks/useStock.js";
import usePortfolio from "../../hooks/usePortfolio.js";
import { money } from "../../utils/format.js";
import { buy, sell } from "../../store/portfolioSlice.js";
import { addTip } from "../../store/coachSlice.js";
import { completeStep } from "../../store/lessonSlice.js";
import { tipAfterBuy, tipAfterSell } from "../../data/coachTips.js";
import PriceChange from "../ui/PriceChange.jsx";
import StockChart from "../StockChart.jsx";
import TermHelp from "./TermHelp.jsx";

// Chart and order form in one card, for the selected stock.
export default function TradeCard({ symbol }) {
  const dispatch = useDispatch();
  const stock = useStock(symbol);
  const { cash, holdings } = usePortfolio();
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

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

  function lessQty() {
    if (qty > 1) {
      setQty(qty - 1);
    }
  }

  function handleBuy() {
    if (cost > cash) {
      setNote("Not enough cash for this order.");
      return;
    }
    dispatch(buy({ symbol: symbol, qty: qty, price: stock.price }));
    dispatch(addTip(tipAfterBuy(symbol, qty, stock.price, cash)));
    dispatch(completeStep("trade"));
    setNote("Bought " + qty + " " + symbol + " at " + money(stock.price) + ".");
  }

  function handleSell() {
    if (qty > owned) {
      setNote("You only own " + owned + " " + symbol + ".");
      return;
    }
    const avg = holdings[symbol].avg;
    dispatch(sell({ symbol: symbol, qty: qty, price: stock.price }));
    dispatch(addTip(tipAfterSell(symbol, qty, stock.price, avg)));
    dispatch(completeStep("trade"));
    setNote("Sold " + qty + " " + symbol + " at " + money(stock.price) + ".");
  }

  return (
    <section className="trade-card">
      <div className="trade-head">
        <div>
          <h2>{symbol}</h2>
          <span className="trade-name">{stock.name}</span>
        </div>
        <div className="trade-quote">
          <span className="trade-price">{money(stock.price)}</span>
          <PriceChange value={stock.change} />
          <span className="price-source">{stock.isLive ? "Market price" : "Sample price"}</span>
        </div>
      </div>

      <StockChart symbol={symbol} />

      <div className="order-strip">
        <div className="qty-stepper">
          <span className="order-label" id="qty-label">Quantity</span>
          <button type="button" aria-label="One less" onClick={lessQty}>−</button>
          <input type="number" min="1" aria-labelledby="qty-label" value={qty} onChange={handleQty} />
          <button type="button" aria-label="One more" onClick={() => setQty(qty + 1)}>+</button>
        </div>

        <div className="order-cost">
          <span className="order-label">Cost</span>
          <strong>{money(cost)}</strong>
        </div>

        <div className="buy-sell">
          <button type="button" className="btn-buy" onClick={handleBuy}>Buy</button>
          <button type="button" className="btn-sell" onClick={handleSell}>Sell</button>
        </div>
      </div>

      <p className="order-meta">
        You own <strong>{owned}</strong> {symbol} · Cash <strong>{money(cash)}</strong>
        <TermHelp term="buying power" />
        {note && <span className="order-note" role="status">{note}</span>}
      </p>
    </section>
  );
}
