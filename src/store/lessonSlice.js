import { createSlice } from "@reduxjs/toolkit";

// The four steps of today's lesson. Each one ticks when the learner really does it.
export const lessonSteps = [
  { id: "pick", label: "Pick a stock" },
  { id: "term", label: "Learn a term" },
  { id: "trade", label: "Place a trade" },
  { id: "ask", label: "Ask the coach why" },
];

const lessonSlice = createSlice({
  name: "lesson",
  initialState: { done: {} },
  reducers: {
    completeStep(state, action) {
      state.done[action.payload] = true;
    },

    resetLesson() {
      return { done: {} };
    },
  },
});

export const { completeStep, resetLesson } = lessonSlice.actions;
export default lessonSlice.reducer;
