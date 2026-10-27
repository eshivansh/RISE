import { useState } from "react";

export default function FormField({ label, icon, name, type, value, onChange, error, placeholder }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="fGroup">
      <label htmlFor={name}>{label}</label>
      <div className="inputWrap">
        <i className={"bi " + icon + " field-icon"}></i>
        <input
          id={name}
          name={name}
          type={isPassword && show ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {isPassword && (
          <button
            type="button"
            className="field-icon-right"
            aria-label="Show password"
            onClick={() => setShow(!show)}
          >
            <i className={show ? "bi bi-eye-slash" : "bi bi-eye"}></i>
          </button>
        )}
      </div>
      <div className={error ? "field-error visible" : "field-error"}>
        <i className="bi bi-exclamation-circle"></i>
        <span>{error}</span>
      </div>
    </div>
  );
}
