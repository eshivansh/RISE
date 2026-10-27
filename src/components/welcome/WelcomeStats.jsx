import usePortfolio from "../../hooks/usePortfolio.js";
import StatCard from "../ui/StatCard.jsx";
import { money } from "../../utils/format.js";

export default function WelcomeStats() {
  const { cash, equity, positions } = usePortfolio();

  return (
    <div className="welcome-stats">
      <StatCard label="Total Equity" value={money(equity)} />
      <StatCard label="Cash Available" value={money(cash)} />
      <StatCard label="Open Positions" value={positions} />
    </div>
  );
}
