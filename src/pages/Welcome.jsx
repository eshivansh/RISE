import "../styles/welcomepage.css";
import WelcomeHero from "../components/welcome/WelcomeHero.jsx";
import WelcomeStats from "../components/welcome/WelcomeStats.jsx";

export default function Welcome() {
  return (
    <div className="welcome-page">
      <WelcomeHero />
      <WelcomeStats />
    </div>
  );
}
