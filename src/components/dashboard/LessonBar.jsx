import { useDispatch, useSelector } from "react-redux";
import { lessonSteps, resetLesson } from "../../store/lessonSlice.js";

export default function LessonBar() {
  const dispatch = useDispatch();
  const done = useSelector((state) => state.lesson.done);

  let doneCount = 0;
  for (const step of lessonSteps) {
    if (done[step.id]) {
      doneCount = doneCount + 1;
    }
  }
  const finished = doneCount === lessonSteps.length;

  return (
    <section className="lesson-bar" aria-label="Today's lesson">
      <div className="lesson-title">
        <strong>{finished ? "Lesson complete" : "Today's lesson"}</strong>
        <span>{doneCount} of {lessonSteps.length}</span>
      </div>

      <ol className="lesson-steps">
        {lessonSteps.map((step) => (
          <li key={step.id} className={done[step.id] ? "lesson-step is-done" : "lesson-step"}>
            <i className={done[step.id] ? "bi bi-check-circle-fill" : "bi bi-circle"} aria-hidden="true"></i>
            {step.label}
            <span className="visually-hidden">{done[step.id] ? " (done)" : " (not done yet)"}</span>
          </li>
        ))}
      </ol>

      {finished && (
        <button type="button" className="btn-quiet" onClick={() => dispatch(resetLesson())}>
          Start again
        </button>
      )}
    </section>
  );
}
