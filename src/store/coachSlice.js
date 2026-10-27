import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { askCoach } from "../api/coachApi.js";
import { findStock } from "../data/stocks.js";

const startPlan = {
  risk: "Conservative",
  horizon: "Intraday",
  style: "Trend following",
  trigger: "Wait for a clean setup before entering",
  stop: "Step out if the idea is invalidated",
};

// Sends a question to the coach with the learner's plan (and stock, if given) as context.
export const askCoachAbout = createAsyncThunk("coach/ask", async function (arg, { getState }) {
  const state = getState();
  const plan = state.coach.plan;

  let context = "";
  if (arg.symbol) {
    const sample = findStock(arg.symbol);
    const quote = state.market.quotes[arg.symbol];
    let name = state.market.names[arg.symbol] || arg.symbol;
    let price = null;
    if (sample) {
      name = sample.name;
      price = sample.price;
    }
    if (quote) {
      price = quote.price;
    }
    context = "Stock: " + arg.symbol + " (" + name + ")";
    if (price !== null) {
      context = context + ", price $" + price.toFixed(2);
    }
    context = context + ". ";
  }

  const full =
    context +
    "Learner's plan: " + plan.risk + ", " + plan.horizon + ", " + plan.style +
    ". Entry: " + plan.trigger + ". Stop: " + plan.stop +
    ". Question: " + arg.question;

  return askCoach(full);
});

const coachSlice = createSlice({
  name: "coach",
  initialState: { messages: [], loading: false, plan: startPlan },
  reducers: {
    // Messages written by the app itself, e.g. a tip after a trade.
    addTip(state, action) {
      state.messages.push({ role: "tip", text: action.payload });
    },

    setPlan(state, action) {
      state.plan = action.payload;
    },

    clearChat(state) {
      state.messages = [];
    },
  },
  extraReducers: function (builder) {
    builder
      .addCase(askCoachAbout.pending, function (state, action) {
        state.loading = true;
        state.messages.push({ role: "user", text: action.meta.arg.question });
      })
      .addCase(askCoachAbout.fulfilled, function (state, action) {
        state.loading = false;
        state.messages.push({ role: "assistant", text: action.payload });
      })
      .addCase(askCoachAbout.rejected, function (state) {
        state.loading = false;
        state.messages.push({ role: "assistant", text: "Could not reach the coach. Check your internet connection." });
      });
  },
});

export const { addTip, setPlan, clearChat } = coachSlice.actions;
export default coachSlice.reducer;
