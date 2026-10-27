import { createSlice } from "@reduxjs/toolkit";

const startSymbols = ["AAPL", "GOOGL", "NVDA", "TSLA", "MSFT", "BA"];

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { symbols: startSymbols },
  reducers: {
    addToWatchlist(state, action) {
      if (!state.symbols.includes(action.payload)) {
        state.symbols.push(action.payload);
      }
    },

    removeFromWatchlist(state, action) {
      state.symbols = state.symbols.filter((s) => s !== action.payload);
    },

    resetWatchlist() {
      return { symbols: startSymbols };
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, resetWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
