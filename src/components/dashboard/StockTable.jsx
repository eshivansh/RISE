import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stocks, categories } from "../../data/stocks.js";
import { money } from "../../utils/format.js";
import useDebounce from "../../hooks/useDebounce.js";
import { addToWatchlist } from "../../store/watchlistSlice.js";
import PriceChange from "../ui/PriceChange.jsx";
import Pagination from "../ui/Pagination.jsx";

const PAGE_SIZE = 5;

export default function StockTable({ onPick }) {
  const dispatch = useDispatch();
  const watched = useSelector((state) => state.watchlist.symbols);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("none");
  const [page, setPage] = useState(1);
  const query = useDebounce(search).toLowerCase();

  // 1. search by name or symbol
  let list = stocks.filter(
    (s) => s.name.toLowerCase().includes(query) || s.symbol.toLowerCase().includes(query)
  );

  // 2. category
  if (category !== "All") {
    list = list.filter((s) => s.category === category);
  }

  // 3. sort (slice() makes a copy, because sort() changes the array)
  if (sort === "high") {
    list = list.slice().sort((a, b) => b.price - a.price);
  }
  if (sort === "low") {
    list = list.slice().sort((a, b) => a.price - b.price);
  }
  if (sort === "gainers") {
    list = list.slice().sort((a, b) => b.change - a.change);
  }
  if (sort === "losers") {
    list = list.slice().sort((a, b) => a.change - b.change);
  }

  // 4. one page
  let totalPages = Math.ceil(list.length / PAGE_SIZE);
  if (totalPages === 0) {
    totalPages = 1;
  }
  const start = (page - 1) * PAGE_SIZE;
  const rows = list.slice(start, start + PAGE_SIZE);

  // every filter change goes back to page 1
  function handleSearch(e) {
    setSearch(e.target.value);
    setPage(1);
  }
  function handleCategory(e) {
    setCategory(e.target.value);
    setPage(1);
  }
  function handleSort(e) {
    setSort(e.target.value);
    setPage(1);
  }

  return (
    <div className="stock-table">
      <div className="table-filters">
        <input
          type="search"
          placeholder="Search by name or symbol..."
          aria-label="Search stocks"
          value={search}
          onChange={handleSearch}
        />
        <select aria-label="Category" value={category} onChange={handleCategory}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select aria-label="Sort" value={sort} onChange={handleSort}>
          <option value="none">Sort by</option>
          <option value="high">Price: High to Low</option>
          <option value="low">Price: Low to High</option>
          <option value="gainers">Change: Top gainers</option>
          <option value="losers">Change: Top losers</option>
        </select>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Symbol</th><th>Name</th><th>Category</th><th>Price</th><th>Change</th><th>Watch</th></tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.symbol}>
                <td>
                  <button type="button" className="symbol-link" onClick={() => onPick(s.symbol)}>
                    {s.symbol}
                  </button>
                </td>
                <td>{s.name}</td>
                <td>{s.category}</td>
                <td>{money(s.price)}</td>
                <td><PriceChange value={s.change} /></td>
                <td>
                  <button
                    type="button"
                    className="watch-add"
                    disabled={watched.includes(s.symbol)}
                    aria-label={"Add " + s.symbol + " to watchlist"}
                    onClick={() => dispatch(addToWatchlist(s.symbol))}
                  >
                    {watched.includes(s.symbol) ? "✓" : "+"}
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr className="empty-row">
                <td colSpan={6}>
                  {search ? 'No stocks match "' + search + '".' : "No stocks in this category."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="table-count">{list.length} stocks found</p>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
