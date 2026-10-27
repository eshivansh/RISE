import "../styles/welcomepage.css";
import WelcomeHero from "../components/welcome/WelcomeHero.jsx";
import WelcomeStats from "../components/welcome/WelcomeStats.jsx";
import MarketMovers from "../components/welcome/MarketMovers.jsx";
import MyWatchlist from "../components/welcome/MyWatchlist.jsx";

export default function Welcome() {
  return (
    <div className="welcome-page">
      <WelcomeHero />
      <WelcomeStats />
      <div className="welcome-grid">
        <MarketMovers />
        <MyWatchlist />
      </div>
    </div>
  );
}
