import { useEffect, useRef } from "react";
import { findStock } from "../data/stocks.js";

// TradingView needs "EXCHANGE:SYMBOL", e.g. "NASDAQ:AAPL".
function chartSymbol(symbol) {
  const stock = findStock(symbol);
  if (stock) {
    return stock.exchange + ":" + symbol;
  }
  return symbol;
}

export default function StockChart({ symbol }) {
  const box = useRef(null);

  useEffect(function () {
    box.current.innerHTML = "";

    const holder = document.createElement("div");
    holder.className = "tradingview-widget-container__widget";
    holder.style.height = "100%";
    holder.style.width = "100%";
    box.current.appendChild(holder);

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: chartSymbol(symbol),
      interval: "D",
      timezone: "Asia/Kolkata",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: false,
      hide_side_toolbar: true,
      width: "100%",
      height: "100%",
    });
    box.current.appendChild(script);
  }, [symbol]);

  return <div className="tradingview-widget-container stock-chart" ref={box} />;
}
