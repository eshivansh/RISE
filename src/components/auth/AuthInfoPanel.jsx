const features = [
  { icon: "bi-bar-chart-line", title: "Live Market Data", text: "Real-time prices, charts and portfolio tracking" },
  { icon: "bi-robot", title: "AI Trading Coach", text: "Ask questions about any stock and your plan" },
  { icon: "bi-wallet2", title: "Virtual $100,000", text: "Practice trading with no real money at risk" },
];

export default function AuthInfoPanel() {
  return (
    <div className="leftSide">
      <h1>
        Your wealth
        <br />
        <span>starts here.</span>
      </h1>
      <p>
        Access market data, a trading coach and a practice portfolio, all from one simple platform.
      </p>

      <div className="features">
        {features.map(function (f) {
          return (
            <div className="feature" key={f.title}>
              <i className={"bi " + f.icon}></i>
              <div className="featureText">
                <strong>{f.title}</strong>
                <span>{f.text}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
