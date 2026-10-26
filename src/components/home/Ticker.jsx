import { tickers } from "../../data/homeContent.js";

export default function Ticker() {
  return (
    <div className="ticker-wrap">
      <div className="ticker-track" id="ticker">
        {tickers.concat(tickers).map((t, i) => {
          let color = "dn";
          if (t.up) {
            color = "up";
          }
          return (
            <div className="ticker-item" key={i}>
              <span className="ticker-sym">{t.sym}</span>
              <span className="ticker-price">₹{t.price}</span>
              <span className={"ticker-chg " + color}>{t.chg}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
