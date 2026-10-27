import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { askCoachAbout, clearChat } from "../../store/coachSlice.js";
import { completeStep } from "../../store/lessonSlice.js";
import LearningPlan from "./LearningPlan.jsx";

const chips = [
  { label: "Explain this stock", prompt: "Explain this stock in simple terms." },
  { label: "Is it a good buy?", prompt: "Based on the recent move, is this a good beginner buy? Explain your reasoning." },
  { label: "Risk check", prompt: "What risks should I watch before buying this stock, and how big should my position be?" },
  { label: "Review my plan", prompt: "Review my plan and suggest one improvement." },
];

export default function CoachPanel({ symbol }) {
  const dispatch = useDispatch();
  const { messages, loading, plan } = useSelector((state) => state.coach);
  const [text, setText] = useState("");
  const [editingPlan, setEditingPlan] = useState(false);
  const logRef = useRef(null);

  function ask(question) {
    dispatch(askCoachAbout({ question: question, symbol: symbol }));
    dispatch(completeStep("ask"));
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
    <section className="coach" aria-label="Trading coach">
      <div className="coach-head">
        <div className="coach-avatar" aria-hidden="true">
          <i className="bi bi-mortarboard"></i>
        </div>
        <div className="coach-title">
          <h2>Your coach</h2>
          <span>Talking about {symbol} · Plan: {plan.risk}, {plan.horizon}</span>
        </div>
        <button type="button" className="btn-quiet" aria-expanded={editingPlan} onClick={() => setEditingPlan(!editingPlan)}>
          {editingPlan ? "Close plan" : "Edit plan"}
        </button>
      </div>

      {editingPlan && <LearningPlan onDone={() => setEditingPlan(false)} />}

      <div className="chat-log" ref={logRef} aria-live="polite">
        <div className="chat-message assistant">
          Hi! I am your trading coach. Pick a stock, try a small trade and ask me anything.
          Everything here uses virtual money, so mistakes are free lessons.
        </div>
        {messages.map((m, i) => (
          <div className={"chat-message " + m.role} key={i}>
            {m.role === "tip" && <strong className="tip-label">Coach tip</strong>}
            {m.text}
          </div>
        ))}
        {loading && (
          <div className="chat-typing">
            <span className="dot-flashing" aria-hidden="true"></span> Coach is thinking...
          </div>
        )}
      </div>

      <div className="prompt-chips">
        {chips.map((c) => (
          <button type="button" key={c.label} disabled={loading} onClick={() => ask(c.prompt)}>
            {c.label}
          </button>
        ))}
      </div>

      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          aria-label="Message the coach"
          placeholder="Ask anything about trading..."
          autoComplete="off"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn-send" type="submit" disabled={loading}>Send</button>
      </form>

      {messages.length > 0 && (
        <button type="button" className="btn-link" onClick={() => dispatch(clearChat())}>
          Clear chat
        </button>
      )}
    </section>
  );
}
