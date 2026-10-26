import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { symbols: ["AAPL", "GOOGL", "NVDA", "TSLA", "MSFT", "BA"] },
  reducers: {
    addToWatchlist(state, action) {
      if (!state.symbols.includes(action.payload)) {
        state.symbols.push(action.payload);
      }
    },

    removeFromWatchlist(state, action) {
      state.symbols = state.symbols.filter((s) => s !== action.payload);
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
