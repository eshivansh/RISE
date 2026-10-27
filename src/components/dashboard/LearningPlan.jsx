import { useDispatch, useSelector } from "react-redux";
import { setPlan } from "../../store/coachSlice.js";

// The learner's trading plan. The coach reads it with every question.
export default function LearningPlan({ onDone }) {
  const dispatch = useDispatch();
  const plan = useSelector((state) => state.coach.plan);

  // One handler for every field: the input's name says which key to update.
  function handleChange(e) {
    dispatch(setPlan({ ...plan, [e.target.name]: e.target.value }));
  }

  return (
    <div className="plan-editor">
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

      <button type="button" className="btn-quiet" onClick={onDone}>Done</button>
    </div>
  );
}
