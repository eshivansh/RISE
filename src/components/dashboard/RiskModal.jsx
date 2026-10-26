import { useEffect, useState } from "react";
import Modal from "../ui/Modal.jsx";

const risks = [
  "RISE is an educational demo. All money here is virtual and prices are sample data.",
  "Do not trade real money based on anything you see in this app.",
  "Stock prices can fall quickly and you can lose more than you expect.",
  "Past performance and predictions never guarantee future results.",
  "Real trading involves taxes, fees and sometimes leverage. Understand them first.",
  "Talk to a licensed financial adviser before investing real money.",
];

export default function RiskModal({ onAccept }) {
  const [agreed, setAgreed] = useState(false);

  function handleContinue() {
    localStorage.setItem("rise_risk_accepted", "true");
    onAccept();
  }

  // Escape also closes the notice, but only after the box is ticked.
  useEffect(function () {
    function onKey(e) {
      if (e.key === "Escape" && agreed) {
        localStorage.setItem("rise_risk_accepted", "true");
        onAccept();
      }
    }
    document.addEventListener("keydown", onKey);
    return function () {
      document.removeEventListener("keydown", onKey);
    };
  }, [agreed, onAccept]);

  return (
    <Modal title="Before you start trading">
      <ul className="risk-list">
        {risks.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>

      <label className="risk-check">
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
        I understand this is a demo and not financial advice.
      </label>

      <button type="button" className="btn-continue" disabled={!agreed} onClick={handleContinue}>
        Continue
      </button>
    </Modal>
  );
}
