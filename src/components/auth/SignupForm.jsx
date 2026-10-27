import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../context/useAuth.js";
import { validateSignup } from "../../utils/validate.js";
import FormField from "../ui/FormField.jsx";
import { reset } from "../../store/portfolioSlice.js";
import { resetWatchlist } from "../../store/watchlistSlice.js";

export default function SignupForm({ onSwitchTab }) {
  const { loginUser } = useAuth();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ name: "", email: "", pass: "", confirm: "" });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validateSignup(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    // A new account starts with a fresh demo portfolio and watchlist.
    dispatch(reset());
    dispatch(resetWatchlist());
    loginUser({ name: form.name.trim(), email: form.email.trim(), pass: form.pass });
  }

  return (
    <div>
      <h2>Create account</h2>
      <p className="sub">
        Already have one?{" "}
        <a href="#" onClick={(e) => { e.preventDefault(); onSwitchTab(); }}>
          Sign in
        </a>
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <FormField
          label="Full Name"
          icon="bi-person"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="John Doe"
        />

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
          placeholder="Create a strong password"
        />

        <FormField
          label="Confirm Password"
          icon="bi-lock"
          name="confirm"
          type="password"
          value={form.confirm}
          onChange={handleChange}
          error={errors.confirm}
          placeholder="Repeat your password"
        />

        <button type="submit" className="submitButton">
          <span className="textButton">Create Account</span>
        </button>
      </form>

      <div className="divider">or continue with</div>
      <div className="socials">
        <button type="button" className="socialButton">Google</button>
        <button type="button" className="socialButton">Apple</button>
      </div>
    </div>
  );
}
