export default function LearningPlan({ plan, onChange }) {
  // One handler for every field: the input's name says which key to update.
  function handleChange(e) {
    onChange({ ...plan, [e.target.name]: e.target.value });
  }

  return (
    <section className="surface strategy-builder">
      <div className="section-title">
        <h2>Learning Plan</h2>
        <span>The coach reads this</span>
      </div>

      <label className="field">
        <span>Risk profile</span>
        <select name="risk" value={plan.risk} onChange={handleChange}>
          <option value="Conservative">Conservative</option>
          <option value="Balanced">Balanced</option>
          <option value="Aggressive">Aggressive</option>
        </select>
      </label>

      <label className="field">
        <span>Time horizon</span>
        <select name="horizon" value={plan.horizon} onChange={handleChange}>
          <option value="Intraday">Intraday</option>
          <option value="Swing">Swing</option>
          <option value="Position">Position</option>
        </select>
      </label>

      <label className="field">
        <span>Style</span>
        <select name="style" value={plan.style} onChange={handleChange}>
          <option value="Trend following">Trend following</option>
          <option value="Pullback continuation">Pullback continuation</option>
          <option value="Breakout confirmation">Breakout confirmation</option>
          <option value="Mean reversion">Mean reversion</option>
        </select>
      </label>

      <label className="field">
        <span>Entry trigger</span>
        <input name="trigger" type="text" value={plan.trigger} onChange={handleChange} />
      </label>

      <label className="field">
        <span>Stop rule</span>
        <input name="stop" type="text" value={plan.stop} onChange={handleChange} />
      </label>
    </section>
  );
}
