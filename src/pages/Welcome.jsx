import "../styles/welcomepage.css";
import WelcomeHero from "../components/welcome/WelcomeHero.jsx";
import WelcomeStats from "../components/welcome/WelcomeStats.jsx";
import MarketMovers from "../components/welcome/MarketMovers.jsx";
import MyWatchlist from "../components/welcome/MyWatchlist.jsx";
import TradingTips from "../components/welcome/TradingTips.jsx";

export default function Welcome() {
  return (
    <div className="welcome-page">
      <WelcomeHero />
      <WelcomeStats />
      <div className="welcome-grid">
        <MarketMovers />
        <div className="welcome-column">
          <MyWatchlist />
          <TradingTips />
        </div>
      </div>
    </div>
  );
}
