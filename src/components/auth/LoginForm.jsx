import { useState, useEffect } from "react";
import { useAuth } from "../../context/useAuth.js";
import { validateLogin } from "../../utils/validate.js";
import FormField from "../ui/FormField.jsx";

export default function LoginForm({ onSwitchTab }) {
  const { loginUser } = useAuth();

  const [form, setForm] = useState({ email: "", pass: "" });
  const [errors, setErrors] = useState({});

  useEffect(function () {
    if (!localStorage.getItem("rise_user")) {
      localStorage.setItem(
        "rise_user",
        JSON.stringify({ name: "Demo Trader", email: "demo@rise.com", pass: "demo1234" })
      );
    }
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validateLogin(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const saved = JSON.parse(localStorage.getItem("rise_user"));
    if (!saved || saved.email !== form.email.trim() || saved.pass !== form.pass) {
      setErrors({ pass: "Invalid email or password" });
      return;
    }

    loginUser(saved);
  }

  return (
    <div>
      <h2>Welcome back</h2>
      <p className="sub">
        Don't have an account?{" "}
        <a href="#" onClick={(e) => { e.preventDefault(); onSwitchTab(); }}>
          Sign up free
        </a>
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <FormField
          label="Email Address"
          icon="bi-envelope"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
        />

        <FormField
          label="Password"
          icon="bi-lock"
          name="pass"
          type="password"
          value={form.pass}
          onChange={handleChange}
          error={errors.pass}
          placeholder="Enter your password"
        />

        <div className="options">
          <label className="remember">
            <input type="checkbox" /> Remember me
          </label>
          <a href="#" className="forgot" onClick={(e) => e.preventDefault()}>
            Forgot password?
          </a>
        </div>

        <button type="submit" className="submitButton">
          <span className="textButton">Login to RISE</span>
        </button>
      </form>

      <div className="demo">
        Demo login → <strong>demo@rise.com</strong> / <strong>demo1234</strong>
      </div>

      <div className="divider">or continue with</div>
      <div className="socials">
        <button type="button" className="socialButton">Google</button>
        <button type="button" className="socialButton">Apple</button>
      </div>
    </div>
  );
}
