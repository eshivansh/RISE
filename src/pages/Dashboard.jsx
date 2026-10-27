import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { CONFIG } from "../config.js";
import { fetchQuote } from "../api/marketApi.js";
import { setQuote } from "../store/marketSlice.js";
import { completeStep } from "../store/lessonSlice.js";
import RiskModal from "../components/dashboard/RiskModal.jsx";
import DashHeader from "../components/dashboard/DashHeader.jsx";
import LessonBar from "../components/dashboard/LessonBar.jsx";
import Watchlist from "../components/dashboard/Watchlist.jsx";
import TradeCard from "../components/dashboard/TradeCard.jsx";
import Portfolio from "../components/dashboard/Portfolio.jsx";
import StockTable from "../components/dashboard/StockTable.jsx";
import CoachPanel from "../components/dashboard/CoachPanel.jsx";
import "../styles/dashboardpage.css";

// Tabs in the bottom bar on phones.
const mobileTabs = [
  { id: "trade", label: "Trade", icon: "bi-graph-up-arrow" },
  { id: "coach", label: "Coach", icon: "bi-mortarboard" },
  { id: "portfolio", label: "Portfolio", icon: "bi-wallet2" },
  { id: "explore", label: "Explore", icon: "bi-search" },
];

export default function Dashboard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const messageCount = useSelector((state) => state.coach.messages.length);

  const [picked, setPicked] = useState(location.state?.symbol || "AAPL");
  const [showRisk, setShowRisk] = useState(localStorage.getItem("rise_risk_accepted") !== "true");
  const [lowerTab, setLowerTab] = useState("portfolio");
  const [mobileTab, setMobileTab] = useState("trade");
  const [seenMessages, setSeenMessages] = useState(messageCount);

  // Live price for the selected stock now and every minute.
  // Only one stock is refreshed to stay inside the free API limit.
  useEffect(function () {
    let retryTimer = null;

    // The free API refuses two requests within about a second (e.g. right after a search),
    // so an empty answer is tried once more shortly after.
    function refresh(canRetry) {
      fetchQuote(picked)
        .then(function (quote) {
          if (quote) {
            dispatch(setQuote({ symbol: picked, price: quote.price, change: quote.change }));
          } else if (canRetry) {
            retryTimer = setTimeout(() => refresh(false), 1500);
          }
        })
        .catch(function () {});
    }

    refresh(true);
    const timer = setInterval(() => refresh(true), CONFIG.autoRefreshSeconds * 1000);
    return function () {
      clearInterval(timer);
      clearTimeout(retryTimer);
    };
  }, [picked, dispatch]);

  function pickStock(symbol) {
    setPicked(symbol);
    setMobileTab("trade");
    dispatch(completeStep("pick"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openMobileTab(id) {
    setMobileTab(id);
    if (id === "portfolio" || id === "explore") {
      setLowerTab(id);
    }
    if (id === "coach") {
      setSeenMessages(messageCount);
    }
  }

  // On phones, only the section of the active bottom tab is shown.
  function mobileClass(base, ids) {
    return ids.includes(mobileTab) ? base + " is-mobile-active" : base;
  }

  const coachHasNew = mobileTab !== "coach" && messageCount > seenMessages;

  return (
    <div className="app-shell dash-page">
      {showRisk && <RiskModal onAccept={() => setShowRisk(false)} />}

      <DashHeader onPick={pickStock} onRiskInfo={() => setShowRisk(true)} />

      <main className="dash-grid">
        <aside className={mobileClass("dash-watch", ["trade"])}>
          <Watchlist picked={picked} onPick={pickStock} />
        </aside>

        <div className="dash-center">
          <div className={mobileClass("dash-lesson", ["trade"])}>
            <LessonBar />
          </div>

          <div className={mobileClass("dash-trade", ["trade"])}>
            {/* key: a new stock gives a fresh card, so quantity and note reset */}
            <TradeCard key={picked} symbol={picked} />
          </div>

          <section className={mobileClass("dash-tabs", ["portfolio", "explore"])}>
            <div className="tab-list" role="tablist" aria-label="Portfolio and stocks">
              <button
                type="button"
                role="tab"
                aria-selected={lowerTab === "portfolio"}
                className={lowerTab === "portfolio" ? "tab is-active" : "tab"}
                onClick={() => setLowerTab("portfolio")}
              >
                Your portfolio
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={lowerTab === "explore"}
                className={lowerTab === "explore" ? "tab is-active" : "tab"}
                onClick={() => setLowerTab("explore")}
              >
                Explore stocks
              </button>
            </div>
            <div role="tabpanel">
              {lowerTab === "portfolio" ? <Portfolio onPick={pickStock} /> : <StockTable onPick={pickStock} />}
            </div>
          </section>
        </div>

        <div className={mobileClass("dash-coach", ["coach"])}>
          <CoachPanel symbol={picked} />
        </div>
      </main>

      <footer className="app-footer">
        Educational demo trading only. No real money is involved and nothing here is financial advice.
      </footer>

      <nav className="mobile-tabs" aria-label="Dashboard sections">
        {mobileTabs.map((t) => (
          <button
            type="button"
            key={t.id}
            className={mobileTab === t.id ? "mobile-tab is-active" : "mobile-tab"}
            aria-current={mobileTab === t.id ? "page" : undefined}
            onClick={() => openMobileTab(t.id)}
          >
            <i className={"bi " + t.icon} aria-hidden="true"></i>
            {t.label}
            {t.id === "coach" && coachHasNew && <span className="new-dot" aria-label="new message"></span>}
          </button>
        ))}
      </nav>
    </div>
  );
}
