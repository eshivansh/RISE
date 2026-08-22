import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/loginpage.css";


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


    return (
    <div className="loginPage">
      <div className="backgroundGlow"></div>
      <div className="grid"></div>

      <header className="header">
        <Link to="/" className="logo">
          <img src="/assets/image.png" alt="logo" />
          <span>RISE</span>
        </Link>
        <Link to="/" className="backLink">
          <i className="bi bi-arrow-left"></i> Back to Home
        </Link>
      </header>

      <main>
        <div className="leftSide">
          <span className="eyebrow">Smart Trading Platform</span>
          <h1>Your wealth<br /><span>starts here.</span></h1>
          
          <div className="features">
            <div className="feature">
             {/*  <div className="featureIcon"><i className="bi bi-graph-up-arrow"></i></div> */}
              <div className="featureText"><strong>Live Market Data</strong></div>
            </div>
            <div className="feature">
             {/*  <div className="featureIcon"><i className="bi bi-lightbulb"></i></div> */}
              <div className="featureText"><strong>AI Smart Advisor</strong></div>
            </div>
            <div className="feature">
            {/*   <div className="featureIcon"><i className="bi bi-shield-check"></i></div> */}
              <div className="featureText"><strong>Bank-Grade Security</strong></div>
            </div>
          </div>
        </div>

        <div className="rightPanel">
          <div className="formCard">
            <div className="tabs">
              <button className={tabClass("login")} onClick={() => setTab("login")}>Sign In</button>
              <button className={tabClass("register")} onClick={() => setTab("register")}>Create Account</button>
            </div>

            {tab === "login" && (
              <div>
                <h2>Welcome back</h2>
                <p className="sub">Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setTab("register"); }}>Sign up free</a></p>

                <div className="fGroup">
                  <label htmlFor="lEmail">Email Address</label>
                  <div className="inputWrap">
                    <i className="bi bi-envelope field-icon"></i>
                    <input
                      type="email"
                      id="lEmail"
                      placeholder="you@example.com"
                      maxLength={100}
                      value={login.email}
                      onChange={(e) => setLogin({ ...login, email: e.target.value })}
                      onKeyDown={(e) => onEnter(e, doLogin)}
                    />
                  </div>
                  <div className={errorClass(loginError.email)}><i className="bi bi-exclamation-circle"></i><span>{loginError.email}</span></div>
                </div>

                <div className="fGroup">
                  <label htmlFor="lPass">Password</label>
                  <div className="inputWrap">
                    <i className="bi bi-lock field-icon"></i>
                    <input
                      type={boxType(show.lPass)}
                      id="lPass"
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

                <div className="options">
                  <label className="remember"><input type="checkbox" /> Remember me</label>
                  <a href="#" className="forgot" onClick={(e) => e.preventDefault()}>Forgot password?</a>
                </div>

                <button className="submitButton" onClick={doLogin}>
                  <span className="textButton">Login to RISE</span>
                </button>

                <div className="demo">Demo login → <strong>demo@rise.com</strong> / <strong>demo1234</strong></div>

                <div className="divider">or continue with</div>
                <div className="socials">
                  <button className="socialButton" onClick={demoLogin}><i className="bi bi-google"></i> Google</button>
                  <button className="socialButton" onClick={demoLogin}><i className="bi bi-apple"></i> Apple</button>
                </div>
              </div>
            )}

            {tab === "register" && (
              <div>
                <h2>Create account</h2>
                <p className="sub">Already have one? <a href="#" onClick={(e) => { e.preventDefault(); setTab("login"); }}>Sign in</a></p>

                <div className="fGroup">
                  <label htmlFor="rName">Full Name</label>
                  <div className="inputWrap">
                    <i className="bi bi-person field-icon"></i>
                    <input
                      type="text"
                      id="rName"
                      placeholder="John Doe"
                      maxLength={80}
                      value={signup.name}
                      onChange={(e) => setSignup({ ...signup, name: e.target.value })}
                      onKeyDown={(e) => onEnter(e, doSignup)}
                    />
                  </div>
                  <div className={errorClass(signupError.name)}><i className="bi bi-exclamation-circle"></i><span>{signupError.name}</span></div>
                </div>

                <div className="fGroup">
                  <label htmlFor="rEmail">Email Address</label>
                  <div className="inputWrap">
                    <i className="bi bi-envelope field-icon"></i>
                    <input
                      type="email"
                      id="rEmail"
                      placeholder="you@example.com"
                      maxLength={100}
                      value={signup.email}
                      onChange={(e) => setSignup({ ...signup, email: e.target.value })}
                      onKeyDown={(e) => onEnter(e, doSignup)}
                    />
                  </div>
                  <div className={errorClass(signupError.email)}><i className="bi bi-exclamation-circle"></i><span>{signupError.email}</span></div>
                </div>

                <div className="fGroup">
                  <label htmlFor="rPass">Password</label>
                  <div className="inputWrap">
                    <i className="bi bi-lock field-icon"></i>
                    <input
                      type={boxType(show.rPass)}
                      id="rPass"
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

                <div className="fGroup">
                  <label htmlFor="rConfirm">Confirm Password</label>
                  <div className="inputWrap">
                    <i className="bi bi-lock-fill field-icon"></i>
                    <input
                      type={boxType(show.rConfirm)}
                      id="rConfirm"
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

                <button className="submitButton" onClick={doSignup}>
                  <span className="textButton">Create Account</span>
                </button>

                <div className="divider">or continue with</div>
                <div className="socials">
                  <button className="socialButton" onClick={demoLogin}><i className="bi bi-google"></i> Google</button>
                  <button className="socialButton" onClick={demoLogin}><i className="bi bi-apple"></i> Apple</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer>Developed by <span>Team RISE®</span> | &copy; 2026 RISE. All rights reserved.</footer>
    </div>
  );
}
  
