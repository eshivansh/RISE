export function money(amount) {
  const text = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (amount < 0) {
    return "-$" + text;
  }
  return "$" + text;
}

export function percent(value) {
  if (value >= 0) {
    return "+" + value.toFixed(2) + "%";
  }
  return value.toFixed(2) + "%";
}
