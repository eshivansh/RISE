import { createSlice } from "@reduxjs/toolkit";

// Live prices fetched from the market API, and names of stocks found by search.
const marketSlice = createSlice({
  name: "market",
  initialState: { quotes: {}, names: {} },
  reducers: {
    setQuote(state, action) {
      const { symbol, price, change } = action.payload;
      state.quotes[symbol] = { price: price, change: change };
    },

    addStockName(state, action) {
      const { symbol, name } = action.payload;
      state.names[symbol] = name;
    },
  },
});

export const { setQuote, addStockName } = marketSlice.actions;
export default marketSlice.reducer;
