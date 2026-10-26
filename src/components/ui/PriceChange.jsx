import { percent } from "../../utils/format.js";

export default function PriceChange({ value }) {
  return <span className={value < 0 ? "dn" : "up"}>{percent(value)}</span>;
}
