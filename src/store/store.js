import { configureStore } from "@reduxjs/toolkit";
import portfolioReducer from "./portfolioSlice.js";
import watchlistReducer from "./watchlistSlice.js";
import marketReducer from "./marketSlice.js";
import lessonReducer from "./lessonSlice.js";
import coachReducer from "./coachSlice.js";

function loadSavedState() {
  const saved = localStorage.getItem("rise_store");
  if (saved === null) {
    return undefined;
  }
  const state = JSON.parse(saved);
  // A refresh in the middle of a coach answer must not leave it "thinking" forever.
  if (state.coach) {
    state.coach.loading = false;
  }
  return state;
}

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
    watchlist: watchlistReducer,
    market: marketReducer,
    lesson: lessonReducer,
    coach: coachReducer,
  },
  preloadedState: loadSavedState(),
});

// Save after every change so a page refresh keeps the demo account.
store.subscribe(function () {
  localStorage.setItem("rise_store", JSON.stringify(store.getState()));
});
