// Demo prices for the practice account, not live market data.
export const stocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 189.42, change: 1.24, exchange: "NASDAQ", category: "Tech" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 174.15, change: 0.87, exchange: "NASDAQ", category: "Tech" },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 924.73, change: 3.12, exchange: "NASDAQ", category: "Tech" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 415.32, change: 0.56, exchange: "NASDAQ", category: "Tech" },
  { symbol: "META", name: "Meta Platforms", price: 502.77, change: 2.01, exchange: "NASDAQ", category: "Tech" },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 186.13, change: 0.15, exchange: "NASDAQ", category: "Retail" },
  { symbol: "WMT", name: "Walmart Inc.", price: 68.2, change: -0.32, exchange: "NYSE", category: "Retail" },
  { symbol: "TSLA", name: "Tesla, Inc.", price: 177.58, change: -1.45, exchange: "NASDAQ", category: "Auto" },
  { symbol: "F", name: "Ford Motor Co.", price: 12.35, change: -0.6, exchange: "NYSE", category: "Auto" },
  { symbol: "BA", name: "Boeing Co.", price: 210.4, change: -0.8, exchange: "NYSE", category: "Aerospace" },
  { symbol: "LMT", name: "Lockheed Martin", price: 462.1, change: 0.42, exchange: "NYSE", category: "Aerospace" },
  { symbol: "JPM", name: "JPMorgan Chase", price: 198.6, change: 0.95, exchange: "NYSE", category: "Finance" },
  { symbol: "V", name: "Visa Inc.", price: 276.3, change: -0.21, exchange: "NYSE", category: "Finance" },
];

export const categories = ["All", "Tech", "Retail", "Auto", "Aerospace", "Finance"];

export function findStock(symbol) {
  return stocks.find((s) => s.symbol === symbol);
}
