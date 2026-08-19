import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import logo from "../assets/image.png";

export default function Login() {
  const goTo = useNavigate();
  const [tab, setTab] = useState("login");

  useEffect(function () {
    if (!localStorage.getItem("rise_user")) {
      localStorage.setItem("rise_user", JSON.stringify({ name: "Demo Trader", email: "demo@rise.com", pass: "demo1234" }));
    }
  }, []);

  const [login, setLogin] = useState({ email: "", pass: "" });
  const [signup, setSignup] = useState({ name: "", email: "", pass: "", confirm: "" });

  const [loginError, setLoginError] = useState({ email: "", pass: "" });
  const [signupError, setSignupError] = useState({ name: "", email: "", pass: "", confirm: "" });

  const [show, setShow] = useState({ lPass: false, rPass: false, rConfirm: false });

  function flip(key) {
    let copy = { ...show };
    copy[key] = !show[key];
    setShow(copy);
  }

  function tabClass(name) {
    if (tab === name) {
      return "auth-tab active";
    }
    return "auth-tab";
  }

  function errorClass(msg) {
    if (msg) {
      return "field-error visible";
    }
    return "field-error";
  }

  function eyeClass(on) {
    if (on) {
      return "bi bi-eye-slash field-icon-right";
    }
    return "bi bi-eye field-icon-right";
  }

  function boxType(on) {
    if (on) {
      return "text";
    }
    return "password";
  }

  function doLogin() {
    let email = login.email.trim();
    let pass = login.pass.trim();

    if (!email) {
      setLoginError({ email: "Email is required", pass: "" });
      return;
    }
    if (!pass) {
      setLoginError({ email: "", pass: "Password is required" });
      return;
    }

    let saved = JSON.parse(localStorage.getItem("rise_user"));
    if (!saved || saved.email !== email || saved.pass !== pass) {
      setLoginError({ email: "", pass: "Invalid email or password" });
      return;
    }

    setLoginError({ email: "", pass: "" });
    localStorage.setItem("rise_loggedIn", "true");
    goTo("/welcome");
  }

  function doSignup() {
    let name = signup.name.trim();
    let email = signup.email.trim();
    let pass = signup.pass;
    let confirm = signup.confirm;

    if (!name) {
      setSignupError({ name: "Full name is required", email: "", pass: "", confirm: "" });
      return;
    }
    if (!email) {
      setSignupError({ name: "", email: "Email is required", pass: "", confirm: "" });
      return;
    }
    if (!pass) {
      setSignupError({ name: "", email: "", pass: "Password is required", confirm: "" });
      return;
    }
    if (pass.length < 8) {
      setSignupError({ name: "", email: "", pass: "At least 8 characters", confirm: "" });
      return;
    }
    if (pass !== confirm) {
      setSignupError({ name: "", email: "", pass: "", confirm: "Passwords do not match" });
      return;
    }

    setSignupError({ name: "", email: "", pass: "", confirm: "" });
    localStorage.setItem("rise_user", JSON.stringify({ name: name, email: email, pass: pass }));
    localStorage.setItem("rise_loggedIn", "true");
    goTo("/welcome");
  }

  function onEnter(e, action) {
    if (e.key === "Enter") {
      action();
    }
  }

  function demoLogin() {
    localStorage.setItem("rise_user", JSON.stringify({ name: "Demo Trader", email: "demo@rise.com", pass: "demo1234" }));
    localStorage.setItem("rise_loggedIn", "true");
    goTo("/welcome");
  }

  return (
    <div className="login-page">
      <div className="bg-glow"></div>
      <div className="grid-lines"></div>

      <header className="header-blur">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
          <span>RISE</span>
        </Link>
        <Link to="/" className="back-link">
          <i className="bi bi-arrow-left"></i> Back to Home
        </Link>
      </header>

      <main>
        <div className="left-panel">
          <span className="eyebrow">Smart Trading Platform</span>
          <h1>Your wealth<br /><span>starts here.</span></h1>
          <p>Access real-time market data, AI-driven insights, and powerful trading tools — all from a single, seamless platform.</p>
          <div className="features">
            <div className="feature">
              <div className="feature-icon"><i className="bi bi-graph-up-arrow"></i></div>
              <div className="feature-text"><strong>Live Market Data</strong><span>Real-time prices, charts and portfolio tracking</span></div>
            </div>
            <div className="feature">
              <div className="feature-icon"><i className="bi bi-lightbulb"></i></div>
              <div className="feature-text"><strong>AI Smart Advisor</strong><span>Personalized insights powered by machine learning</span></div>
            </div>
            <div className="feature">
              <div className="feature-icon"><i className="bi bi-shield-check"></i></div>
              <div className="feature-text"><strong>Bank-Grade Security</strong><span>256-bit encryption with multi-factor authentication</span></div>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="form-card">
            <div className="auth-tabs">
              <button className={tabClass("login")} onClick={() => setTab("login")}>Sign In</button>
              <button className={tabClass("register")} onClick={() => setTab("register")}>Create Account</button>
            </div>

            {tab === "login" && (
              <div>
                <h2>Welcome back</h2>
                <p className="sub">Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setTab("register"); }}>Sign up free</a></p>

                <div className="field-group">
                  <label htmlFor="l-email">Email Address</label>
                  <div className="input-wrap">
                    <i className="bi bi-envelope field-icon"></i>
                    <input
                      type="email"
                      id="l-email"
                      placeholder="you@example.com"
                      maxLength={100}
                      value={login.email}
                      onChange={(e) => setLogin({ ...login, email: e.target.value })}
                      onKeyDown={(e) => onEnter(e, doLogin)}
                    />
                  </div>
                  <div className={errorClass(loginError.email)}><i className="bi bi-exclamation-circle"></i><span>{loginError.email}</span></div>
                </div>

                <div className="field-group">
                  <label htmlFor="l-pass">Password</label>
                  <div className="input-wrap">
                    <i className="bi bi-lock field-icon"></i>
                    <input
                      type={boxType(show.lPass)}
                      id="l-pass"
                      placeholder="Enter your password"
                      maxLength={100}
                      value={login.pass}
                      onChange={(e) => setLogin({ ...login, pass: e.target.value })}
                      onKeyDown={(e) => onEnter(e, doLogin)}
                    />
                    <i className={eyeClass(show.lPass)} onClick={() => flip("lPass")}></i>
                  </div>
                  <div className={errorClass(loginError.pass)}><i className="bi bi-exclamation-circle"></i><span>{loginError.pass}</span></div>
                </div>

                <div className="options-row">
                  <label className="remember-label"><input type="checkbox" /> Remember me</label>
                  <a href="#" className="forgot-link" onClick={(e) => e.preventDefault()}>Forgot password?</a>
                </div>

                <button className="submit-btn" onClick={doLogin}>
                  <span className="btn-text">Login to RISE</span>
                </button>

                <div className="demo-hint">Demo login → <strong>demo@rise.com</strong> / <strong>demo1234</strong></div>

                <div className="divider">or continue with</div>
                <div className="social-row">
                  <button className="social-btn" onClick={demoLogin}><i className="bi bi-google"></i> Google</button>
                  <button className="social-btn" onClick={demoLogin}><i className="bi bi-apple"></i> Apple</button>
                </div>
              </div>
            )}

            {tab === "register" && (
              <div>
                <h2>Create account</h2>
                <p className="sub">Already have one? <a href="#" onClick={(e) => { e.preventDefault(); setTab("login"); }}>Sign in</a></p>

                <div className="field-group">
                  <label htmlFor="r-name">Full Name</label>
                  <div className="input-wrap">
                    <i className="bi bi-person field-icon"></i>
                    <input
                      type="text"
                      id="r-name"
                      placeholder="John Doe"
                      maxLength={80}
                      value={signup.name}
                      onChange={(e) => setSignup({ ...signup, name: e.target.value })}
                      onKeyDown={(e) => onEnter(e, doSignup)}
                    />
                  </div>
                  <div className={errorClass(signupError.name)}><i className="bi bi-exclamation-circle"></i><span>{signupError.name}</span></div>
                </div>

                <div className="field-group">
                  <label htmlFor="r-email">Email Address</label>
                  <div className="input-wrap">
                    <i className="bi bi-envelope field-icon"></i>
                    <input
                      type="email"
                      id="r-email"
                      placeholder="you@example.com"
                      maxLength={100}
                      value={signup.email}
                      onChange={(e) => setSignup({ ...signup, email: e.target.value })}
                      onKeyDown={(e) => onEnter(e, doSignup)}
                    />
                  </div>
                  <div className={errorClass(signupError.email)}><i className="bi bi-exclamation-circle"></i><span>{signupError.email}</span></div>
                </div>

                <div className="field-group">
                  <label htmlFor="r-pass">Password</label>
                  <div className="input-wrap">
                    <i className="bi bi-lock field-icon"></i>
                    <input
                      type={boxType(show.rPass)}
                      id="r-pass"
                      placeholder="Create a strong password"
                      maxLength={100}
                      value={signup.pass}
                      onChange={(e) => setSignup({ ...signup, pass: e.target.value })}
                      onKeyDown={(e) => onEnter(e, doSignup)}
                    />
                    <i className={eyeClass(show.rPass)} onClick={() => flip("rPass")}></i>
                  </div>
                  <div className={errorClass(signupError.pass)}><i className="bi bi-exclamation-circle"></i><span>{signupError.pass}</span></div>
                </div>

                <div className="field-group">
                  <label htmlFor="r-confirm">Confirm Password</label>
                  <div className="input-wrap">
                    <i className="bi bi-lock-fill field-icon"></i>
                    <input
                      type={boxType(show.rConfirm)}
                      id="r-confirm"
                      placeholder="Repeat your password"
                      maxLength={100}
                      value={signup.confirm}
                      onChange={(e) => setSignup({ ...signup, confirm: e.target.value })}
                      onKeyDown={(e) => onEnter(e, doSignup)}
                    />
                    <i className={eyeClass(show.rConfirm)} onClick={() => flip("rConfirm")}></i>
                  </div>
                  <div className={errorClass(signupError.confirm)}><i className="bi bi-exclamation-circle"></i><span>{signupError.confirm}</span></div>
                </div>

                <button className="submit-btn" onClick={doSignup}>
                  <span className="btn-text">Create Account</span>
                </button>

                <div className="divider">or continue with</div>
                <div className="social-row">
                  <button className="social-btn" onClick={demoLogin}><i className="bi bi-google"></i> Google</button>
                  <button className="social-btn" onClick={demoLogin}><i className="bi bi-apple"></i> Apple</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer>Developed by <span>Team CodeGeass®</span> | &copy; 2026 RISE. All rights reserved.</footer>
    </div>
  );
}
