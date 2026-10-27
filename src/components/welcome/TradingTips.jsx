const tips = [
  {
    title: "Start with focus.",
    text: "Pick one stock and open its chart before you trade.",
    icon: "bi-graph-up",
  },
  {
    title: "Risk first.",
    text: "Never buy more shares than your cash allows.",
    icon: "bi-shield-check",
  },
  {
    title: "Demo mode.",
    text: "You have a virtual $100,000 to practice with.",
    icon: "bi-wallet2",
  },
];

export default function TradingTips() {
  return (
    <div className="welcome-panel">
      <div className="panel-header">
        <h2 className="panel-title">Daily Trading Tips</h2>
      </div>
      <div className="tips-list">
        {tips.map((tip) => (
          <div className="tip-card" key={tip.title}>
            <i className={"bi " + tip.icon}></i>
            <div className="tip-content">
              <h3 className="tip-title">{tip.title}</h3>
              <p className="tip-text">{tip.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
