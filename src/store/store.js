import { configureStore } from "@reduxjs/toolkit";
import portfolioReducer from "./portfolioSlice.js";
import watchlistReducer from "./watchlistSlice.js";
import marketReducer from "./marketSlice.js";

function loadSavedState() {
  const saved = localStorage.getItem("rise_store");
  if (saved === null) {
    return undefined;
  }
  return JSON.parse(saved);
}

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
    watchlist: watchlistReducer,
    market: marketReducer,
  },
  preloadedState: loadSavedState(),
});

// Save after every change so a page refresh keeps the demo account.
store.subscribe(function () {
  localStorage.setItem("rise_store", JSON.stringify(store.getState()));
});
