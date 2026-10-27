import { useAuth } from "../../context/useAuth.js";

export default function WelcomeHero() {
  const { user } = useAuth();
  let firstName = "Trader";
  if (user && user.name) {
    firstName = user.name.split(" ")[0];
  }

  return (
    <div className="welcome-hero">
      <h1 className="welcome-title">Welcome back, {firstName}! 👋</h1>
      <p className="welcome-subtitle">
        Here is what is happening with your portfolio and the markets today.
      </p>
    </div>
  );
}
