import { useEffect, useState } from "react";

// Returns the value only after it has stopped changing for `delay` ms.
export default function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(function () {
    const timer = setTimeout(function () {
      setDebounced(value);
    }, delay);

    return function () {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounced;
}
