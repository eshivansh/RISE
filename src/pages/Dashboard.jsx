import { useState } from "react";
import { useLocation } from "react-router-dom";
import RiskModal from "../components/dashboard/RiskModal.jsx";
import Watchlist from "../components/dashboard/Watchlist.jsx";
import ChartPanel from "../components/dashboard/ChartPanel.jsx";
import OrderPanel from "../components/dashboard/OrderPanel.jsx";
import StockTable from "../components/dashboard/StockTable.jsx";
import Portfolio from "../components/dashboard/Portfolio.jsx";
import "../styles/dashboardpage.css";

const steps = [
  "Pick a stock from the watchlist or the table",
  "Read its chart",
  "Buy or sell in the order panel",
  "Track your portfolio below",
];

export default function Dashboard() {
  const location = useLocation();
  const [picked, setPicked] = useState(location.state?.symbol || "AAPL");
  const [showRisk, setShowRisk] = useState(localStorage.getItem("rise_risk_accepted") !== "true");

  function pickStock(symbol) {
    setPicked(symbol);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="dash-page trade-main">
      {showRisk && <RiskModal onAccept={() => setShowRisk(false)} />}

      <div className="dash-head">
        <h1>Trade</h1>
        <button type="button" className="risk-link" onClick={() => setShowRisk(true)}>
          <i className="bi bi-exclamation-triangle"></i> Risk info
        </button>
      </div>

      <div className="guide-bar">
        {steps.map((text, i) => (
          <div className="guide-step" key={text}>
            <span className="step-num">{i + 1}</span> {text}
          </div>
        ))}
      </div>

      <section className="trade-top">
        <Watchlist picked={picked} onPick={setPicked} />
        <ChartPanel symbol={picked} />
        {/* key: a new stock gives a fresh panel, so quantity and note reset */}
        <OrderPanel key={picked} symbol={picked} />
      </section>

      <StockTable onPick={pickStock} />
      <Portfolio />
    </div>
  );
}
