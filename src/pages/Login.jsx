import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";



export default function Login() {

  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regError, setRegError] = useState("");

  useEffect(function () {
    if (!localStorage.getItem("rise_user")) {
      localStorage.setItem("rise_user", JSON.stringify({ name: "Demo Trader", email: "demo@rise.com", pass: "demo1234" }));
    }
  }, []);

  return (
    <div className="login-page">
      <div className="bg-glow"></div>
      <div className="grid-lines"></div>

      <header className="header-blur">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="logo" />
          <span>RISE</span>
        </Link>

        <Link to="/" className="back-link">
          <i className="bi bi-arrow-left"></i>
          Back to Home
        </Link>
      </header>

      <main>
        <div className="left-panel">
          <h1>
            Your wealth
            <br />
            <span>starts here.</span>
          </h1>

          <div className="features">
            <div className="feature">
              {/* <div className="feature-icon">
                <i className="bi bi-graph-up-arrow"></i>
              </div> */}

              <div className="feature-text">
                <strong>Live Market Data</strong>
              </div>
            </div>

            <div className="feature">
              {/* <div className="feature-icon">
                <i className="bi bi-lightbulb"></i>
              </div> */}

              <div className="feature-text">
                <strong>AI Smart Advisor</strong>
              </div>
            </div>

            <div className="feature">
              {/* <div className="feature-icon">
                <i className="bi bi-shield-check"></i>
              </div> */}

              <div className="feature-text">
                <strong>Bank-Grade Security</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="form-card">

            <div className="auth-tabs">
              <button className="active">
                Sign In
              </button>

              <button>
                Create Account
              </button>
            </div>

            <div className="login-form">
              <h2>Welcome back</h2>

              <p className="sub">
                Don't have an account?
                <a href="#"> Sign up free</a>
              </p>

              <div className="field-group">
                <label htmlFor="l-email">
                  Email Address
                </label>

                <div className="input-wrap">
                  <i className="bi bi-envelope field-icon"></i>

                  <input
                    type="email"
                    id="l-email"
                    placeholder="you@example.com"
                    maxLength={100}
                  />
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="l-pass">
                  Password
                </label>

                <div className="input-wrap">
                  <i className="bi bi-lock field-icon"></i>

                  <input
                    type="password"
                    id="l-pass"
                    placeholder="Enter your password"
                    maxLength={100}
                  />
                </div>
              </div>

              <div className="options-row">
                <label className="remember-label">
                  <input type="checkbox" />
                  Remember me
                </label>

                <a href="#" className="forgot-link">
                  Forgot password?
                </a>
              </div>

              <button className="submit-btn">
                <span className="btn-text">
                  Login to RISE
                </span>
              </button>

              <div className="demo-hint">
                Demo login → <strong>demo@rise.com</strong> /{" "}
                <strong>demo1234</strong>
              </div>

              <div className="divider">
                or continue with
              </div>

              <div className="social-row">
                <button className="social-btn">
                  <i className="bi bi-google"></i>
                  Google
                </button>

                <button className="social-btn">
                  <i className="bi bi-apple"></i>
                  Apple
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <footer>
        Developed by <span>Team RISE®</span> | &copy; 2026 RISE.
        All rights reserved.
      </footer>
    </div>
  );
}

