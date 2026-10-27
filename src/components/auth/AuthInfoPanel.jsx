const features = [
  { icon: "bi-bar-chart-line", title: "Live Market Data" },
  { icon: "bi-wallet2", title: "Virtual $100,000 Portfolio" },
  { icon: "bi-shield-lock", title: "Bank-Grade Security" },
];

export default function AuthInfoPanel() {
  return (
    <div className="leftSide">
      <h1>
        Your wealth
        <br />
        <span>starts here.</span>
      </h1>

      <div className="features">
        {features.map(function (f) {
          return (
            <div className="feature" key={f.title}>
              <i className={"bi " + f.icon}></i>
              <div className="featureText">
                <strong>{f.title}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
