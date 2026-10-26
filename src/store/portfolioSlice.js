import { createSlice } from "@reduxjs/toolkit";

export const START_CASH = 100000;

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: { cash: START_CASH, holdings: {} },
  reducers: {
    // Redux Toolkit lets us "change" state directly; it makes a new copy for us.
    buy(state, action) {
      const { symbol, qty, price } = action.payload;
      const cost = qty * price;
      if (cost > state.cash) {
        return;
      }

      const old = state.holdings[symbol];
      if (old) {
        const totalQty = old.qty + qty;
        old.avg = (old.avg * old.qty + cost) / totalQty;
        old.qty = totalQty;
      } else {
        state.holdings[symbol] = { qty: qty, avg: price };
      }
      state.cash = state.cash - cost;
    },

    sell(state, action) {
      const { symbol, qty, price } = action.payload;
      const old = state.holdings[symbol];
      if (!old || old.qty < qty) {
        return;
      }

      old.qty = old.qty - qty;
      if (old.qty === 0) {
        delete state.holdings[symbol];
      }
      state.cash = state.cash + qty * price;
    },

    reset() {
      return { cash: START_CASH, holdings: {} };
    },
  },
});

export const { buy, sell, reset } = portfolioSlice.actions;
export default portfolioSlice.reducer;
