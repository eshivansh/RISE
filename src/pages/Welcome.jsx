import "../styles/welcomepage.css";
import WelcomeHero from "../components/welcome/WelcomeHero.jsx";
import WelcomeStats from "../components/welcome/WelcomeStats.jsx";
import MarketMovers from "../components/welcome/MarketMovers.jsx";

export default function Welcome() {
  return (
    <div className="welcome-page">
      <WelcomeHero />
      <WelcomeStats />
      <MarketMovers />
    </div>
  );
}
