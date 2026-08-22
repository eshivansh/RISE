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

 function handleLogin(event) {
    event.preventDefault();
    if (!email.trim()) { setLoginError("Email is required"); return; }
    if (!password.trim()) { setLoginError("Password is required"); return; }
    const user = JSON.parse(localStorage.getItem("rise_user"));
    if (user.email !== email.trim() || user.pass !== password.trim()) { setLoginError("Wrong email or password"); return; }
    localStorage.setItem("rise_loggedIn", "true");
    navigate("/welcome");
  }

  function handleRegister(event) {
    event.preventDefault();
    if (!name.trim()) { setRegError("Name is required"); return; }
    if (!regEmail.trim()) { setRegError("Email is required"); return; }
    if (regPass.length < 8) { setRegError("Password needs 8+ characters"); return; }
    localStorage.setItem("rise_user", JSON.stringify({ name: name.trim(), email: regEmail.trim(), pass: regPass }));
    localStorage.setItem("rise_loggedIn", "true");
    navigate("/welcome");
  }

  function useDemoAccount() {
    localStorage.setItem("rise_user", JSON.stringify({ name: "Demo Trader", email: "demo@rise.com", pass: "demo1234" }));
    localStorage.setItem("rise_loggedIn", "true");
    navigate("/welcome");
  }

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
              <button type = "button" className={tab === "login" ? "active":""}
              onClick={()=> setTab("login")}
              >
                Sign In
              </button>

              <button type = "button" className = {tab === "register"?"active":""}
              onClick = {()=>setTab("register")}
              >
                Create Account
              </button>
            </div>
            

            {tab === "login" && (

              <form
                className="login-form"
                onSubmit={handleLogin}
              >

                <h2>Welcome back</h2>

                <p className="sub">
                  Don't have an account?
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setTab("register");
                    }}
                  >
                    {" "}Sign up free
                  </a>
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
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
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
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                    />

                  </div>

                </div>

                <div className="options-row">

                  <label className="remember-label">
                    <input type="checkbox" />
                    Remember me
                  </label>

                  <a
                    href="#"
                    className="forgot-link"
                  >
                    Forgot password?
                  </a>

                </div>

                {loginError && (
                  <p className="form-error">
                    {loginError}
                  </p>
                )}
                <button type = "submit" className= "submit-btn">
                    <span className="btn-text">
                        Login to RISE
                    </span>
                </button>

                <div className="demo-hint">
                    Demo login →{" "}
                  <strong>demo@rise.com</strong> /{" "}
                  <strong>demo1234</strong>
                  </div>
                  <div className="divider">
                  or continue with
                </div>

                <div className="social-row">

                  <button
                    type="button"
                    className="social-btn"
                  >
                    <i className="bi bi-google"></i>
                    Google
                  </button>

                  <button
                    type="button"
                    className="social-btn"
                  >
                    <i className="bi bi-apple"></i>
                    Apple
                  </button>

                </div>

                <button
                  type="button"
                  className="demo-btn"
                  onClick={useDemoAccount}
                >
                  Use Demo Account
                </button>

              </form>

            )}

           

            {tab === "register" && (

              <form
                className="login-form"
                onSubmit={handleRegister}
              >

                <h2>Create Account</h2>

                <p className="sub">
                  Already have an account?
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setTab("login");
                    }}
                  >
                    {" "}Sign in
                  </a>
                </p>

                <div className="field-group">

                  <label htmlFor="r-name">
                    Full Name
                  </label>

                  <div className="input-wrap">

                    <i className="bi bi-person field-icon"></i>

                    <input
                      type="text"
                      id="r-name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                    />

                  </div>

                </div>

                <div className="field-group">

                  <label htmlFor="r-email">
                    Email Address
                  </label>

                  <div className="input-wrap">

                    <i className="bi bi-envelope field-icon"></i>

                    <input
                      type="email"
                      id="r-email"
                      placeholder="you@example.com"
                      value={regEmail}
                      onChange={(e) =>
                        setRegEmail(e.target.value)
                      }
                    />

                  </div>

                </div>

                <div className="field-group">

                  <label htmlFor="r-pass">
                    Password
                  </label>

                  <div className="input-wrap">

                    <i className="bi bi-lock field-icon"></i>

                    <input
                      type="password"
                      id="r-pass"
                      placeholder="Minimum 8 characters"
                      value={regPass}
                      onChange={(e) =>
                        setRegPass(e.target.value)
                      }
                    />

                  </div>

                </div>

                {regError && (
                  <p className="form-error">
                    {regError}
                  </p>
                )}

                <button
                  type="submit"
                  className="submit-btn"
                >
                  <span className="btn-text">
                    Create Account
                  </span>
                </button>

              </form>

            )}

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

