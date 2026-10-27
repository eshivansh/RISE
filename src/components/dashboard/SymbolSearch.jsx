import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useDebounce from "../../hooks/useDebounce.js";
import { searchSymbols } from "../../api/marketApi.js";
import { addStockName } from "../../store/marketSlice.js";
import { addToWatchlist } from "../../store/watchlistSlice.js";

export default function SymbolSearch({ onPick }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [answeredFor, setAnsweredFor] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  // Ask the API only after the user stops typing for 500 ms.
  const query = useDebounce(search.trim(), 500);

  // Still waiting while the text on screen has no answer yet.
  const loading = search.trim() !== "" && search.trim() !== answeredFor;

  useEffect(function () {
    if (query === "") {
      return;
    }
    let stillWanted = true;
    searchSymbols(query)
      .then(function (answer) {
        if (stillWanted) {
          setAnsweredFor(query);
          setResults(answer.results);
          if (answer.error) {
            setMessage(answer.error);
          } else if (answer.results.length === 0) {
            setMessage("No results found.");
          } else {
            setMessage("");
          }
        }
      })
      .catch(function () {
        if (stillWanted) {
          setAnsweredFor(query);
          setResults([]);
          setMessage("Search failed. Check your internet connection.");
        }
      });

    // A newer search started, so ignore this answer.
    return function () {
      stillWanted = false;
    };
  }, [query]);

  // Close the dropdown when clicking anywhere else on the page.
  useEffect(function () {
    function onClick(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    return function () {
      document.removeEventListener("click", onClick);
    };
  }, []);

  function handleChange(e) {
    setSearch(e.target.value);
    setOpen(e.target.value.trim() !== "");
  }

  function pickResult(result) {
    dispatch(addStockName({ symbol: result.symbol, name: result.name }));
    dispatch(addToWatchlist(result.symbol));
    onPick(result.symbol);
    setSearch("");
    setOpen(false);
  }

  return (
    <div className="header-center" ref={boxRef}>
      <label className="search-wrap" htmlFor="symbol-search">
        <i className="bi bi-search"></i>
        <input
          id="symbol-search"
          type="search"
          autoComplete="off"
          placeholder="Search a stock: Apple, Tesla, Microsoft..."
          value={search}
          onChange={handleChange}
        />
      </label>

      <div className={open ? "search-results is-open" : "search-results"}>
        {loading && <div className="search-result">Searching...</div>}
        {!loading && message && <div className="search-result">{message}</div>}
        {!loading &&
          results.map((r) => (
            <button type="button" className="search-result" key={r.symbol} onClick={() => pickResult(r)}>
              <strong>{r.symbol}</strong>
              <span>{r.name}</span>
            </button>
          ))}
      </div>
    </div>
  );
}
