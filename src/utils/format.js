export function money(amount) {
  return "$" + amount.toFixed(2);
}

export function percent(value) {
  if (value >= 0) {
    return "+" + value.toFixed(2) + "%";
  }
  return value.toFixed(2) + "%";
}
