import { useDispatch } from "react-redux";
import { askCoachAbout } from "../../store/coachSlice.js";
import { completeStep } from "../../store/lessonSlice.js";

// A small "?" next to a trading word. Clicking it asks the coach to explain the word.
export default function TermHelp({ term }) {
  const dispatch = useDispatch();

  function explain() {
    dispatch(askCoachAbout({ question: 'What does "' + term + '" mean? Explain it simply for a beginner.' }));
    dispatch(completeStep("term"));
  }

  return (
    <button type="button" className="term-help" aria-label={"Ask the coach what " + term + " means"} onClick={explain}>
      ?
    </button>
  );
}
