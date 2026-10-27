import { useEffect, useRef, useState } from "react";
import useStock from "../../hooks/useStock.js";
import { money, percent } from "../../utils/format.js";
import { askCoach } from "../../api/coachApi.js";

const chips = [
  { label: "Explain stock", prompt: "Explain this stock in simple terms." },
  { label: "Is it a buy?", prompt: "Based on the recent move, is this a good beginner buy?" },
  { label: "Risk check", prompt: "What risks should I watch before buying this stock?" },
  { label: "Review my plan", prompt: "Review my learning plan and suggest one improvement." },
];

export default function CoachPanel({ symbol, plan }) {
  const stock = useStock(symbol);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const logRef = useRef(null);

  function ask(prompt) {
    setMessages((old) => old.concat({ role: "user", text: prompt }));
    setLoading(true);

    const full =
      "Stock: " + symbol + " (" + stock.name + "), price " + money(stock.price) +
      ", change " + percent(stock.change) +
      ". Plan: " + plan.risk + ", " + plan.horizon + ", " + plan.style +
      ". Entry: " + plan.trigger + ". Stop: " + plan.stop +
      ". Question: " + prompt;

    askCoach(full)
      .then((reply) => setMessages((old) => old.concat({ role: "assistant", text: reply })))
      .catch(() =>
        setMessages((old) =>
          old.concat({ role: "assistant", text: "Could not reach the coach. Check your internet connection." })
        )
      )
      .finally(() => setLoading(false));
  }

  // Keep the newest message in view.
  useEffect(function () {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, loading]);

  function handleSubmit(e) {
    e.preventDefault();
    const msg = text.trim();
    if (msg === "") {
      return;
    }
    setText("");
    ask(msg);
  }

  return (
    <section className="surface coach-panel">
      <div className="section-title">
        <h2>AI Trading Coach</h2>
        <span>{loading ? "Thinking..." : "Ready"}</span>
      </div>

      <div className="prompt-chips">
        {chips.map((c) => (
          <button type="button" key={c.label} disabled={loading} onClick={() => ask(c.prompt)}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="chat-log" ref={logRef}>
        {messages.length === 0 && (
          <p className="chat-empty">Ask about {symbol}, risk, or your plan. Answers are for learning only.</p>
        )}
        {messages.map((m, i) => (
          <div className={"chat-message " + m.role} key={i}>{m.text}</div>
        ))}
      </div>

      <div className={loading ? "ai-typing active" : "ai-typing"}>
        <div className="dot-flashing"></div>
        <span>Coach is thinking...</span>
      </div>

      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          aria-label="Message the coach"
          placeholder="Ask about this stock, risk, or strategy..."
          autoComplete="off"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn-send" type="submit" disabled={loading}>Send</button>
      </form>
    </section>
  );
}
