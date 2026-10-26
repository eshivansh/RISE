import { useState } from "react";

export default function useLocalStorage(key, startValue) {
  const [value, setValue] = useState(function () {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return startValue;
  });

  function save(newValue) {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  return [value, save];
}
