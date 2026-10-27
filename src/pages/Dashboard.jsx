import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { CONFIG } from "../config.js";
import { fetchQuote } from "../api/marketApi.js";
import { setQuote } from "../store/marketSlice.js";
import RiskModal from "../components/dashboard/RiskModal.jsx";
import DashHeader from "../components/dashboard/DashHeader.jsx";
import Watchlist from "../components/dashboard/Watchlist.jsx";
import ChartPanel from "../components/dashboard/ChartPanel.jsx";
import OrderPanel from "../components/dashboard/OrderPanel.jsx";
import StockTable from "../components/dashboard/StockTable.jsx";
import Portfolio from "../components/dashboard/Portfolio.jsx";
import LearningPlan from "../components/dashboard/LearningPlan.jsx";
import CoachPanel from "../components/dashboard/CoachPanel.jsx";
import "../styles/dashboardpage.css";

const steps = [
  "Search or pick a stock from the watchlist",
  "Read its chart",
  "Buy or sell in the order panel",
  "Track your portfolio and ask the coach",
];

const startPlan = {
  risk: "Conservative",
  horizon: "Intraday",
  style: "Trend following",
  trigger: "Wait for a clean setup before entering",
  stop: "Step out if the idea is invalidated",
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [picked, setPicked] = useState(location.state?.symbol || "AAPL");
  const [showRisk, setShowRisk] = useState(localStorage.getItem("rise_risk_accepted") !== "true");
  const [plan, setPlan] = useState(startPlan);

  // Live price for the selected stock now and every minute.
  // Only one stock is refreshed to stay inside the free API limit.
  useEffect(function () {
    function refresh() {
      fetchQuote(picked)
        .then(function (quote) {
          if (quote) {
            dispatch(setQuote({ symbol: picked, price: quote.price, change: quote.change }));
          }
        })
        .catch(function () {});
    }
    refresh();
    const timer = setInterval(refresh, CONFIG.autoRefreshSeconds * 1000);
    return function () {
      clearInterval(timer);
    };
  }, [picked, dispatch]);

  function pickStock(symbol) {
    setPicked(symbol);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app-shell dash-page">
      {showRisk && <RiskModal onAccept={() => setShowRisk(false)} />}

      <DashHeader onPick={pickStock} onRiskInfo={() => setShowRisk(true)} />

      <main className="trade-main">
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

        <section className="trade-bottom">
          <LearningPlan plan={plan} onChange={setPlan} />
          <CoachPanel symbol={picked} plan={plan} />
        </section>
      </main>

      <footer className="app-footer">
        Educational demo trading only. No real money is involved and nothing here is financial advice.
      </footer>
    </div>
  );
}
