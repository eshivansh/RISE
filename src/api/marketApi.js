import { CONFIG } from "../config.js";

const BASE_URL = "https://www.alphavantage.co/query";

// Alpha Vantage answers with a "Note" or "Information" message when the
// free daily limit is used up, instead of an error status.
function limitMessage(data) {
  return data.Note || data.Information || "";
}

export async function fetchQuote(symbol) {
  if (!CONFIG.marketApiKey) {
    return null;
  }
  const url = BASE_URL + "?function=GLOBAL_QUOTE&symbol=" + encodeURIComponent(symbol) + "&apikey=" + CONFIG.marketApiKey;
  const res = await fetch(url);
  const data = await res.json();
  const quote = data["Global Quote"];
  if (!quote || !quote["05. price"]) {
    return null;
  }
  return {
    price: parseFloat(quote["05. price"]),
    change: parseFloat(quote["10. change percent"].replace("%", "")),
  };
}

export async function searchSymbols(query) {
  if (!CONFIG.marketApiKey) {
    return { results: [], error: "Add VITE_MARKET_API_KEY to .env to search stocks." };
  }
  const url = BASE_URL + "?function=SYMBOL_SEARCH&keywords=" + encodeURIComponent(query) + "&apikey=" + CONFIG.marketApiKey;
  const res = await fetch(url);
  const data = await res.json();
  if (limitMessage(data)) {
    return { results: [], error: "Search limit reached for today. Try again later." };
  }
  const matches = data.bestMatches || [];
  const results = matches.map((m) => ({ symbol: m["1. symbol"], name: m["2. name"] }));
  return { results: results, error: "" };
}
