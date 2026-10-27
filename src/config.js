// Keys come from the .env file (see .env.example).
// Note: VITE_ values end up in the browser bundle, so use free demo keys only.
export const CONFIG = {
  marketApiKey: import.meta.env.VITE_MARKET_API_KEY || "",
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || "",
  geminiModel: "gemini-3.1-flash-lite-preview",
  autoRefreshSeconds: 60,
};
