import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import "../styles/login.css";
import AuthInfoPanel from "../components/auth/AuthInfoPanel.jsx";
import LoginForm from "../components/auth/LoginForm.jsx";
import SignupForm from "../components/auth/SignupForm.jsx";

export default function Login() {
  const { user } = useAuth();
  const location = useLocation();
  const [tab, setTab] = useState("login");

  // Signed in (or just logged in): go to the page the user wanted, or Welcome.
  if (user) {
    return <Navigate to={location.state?.from || "/welcome"} replace />;
  }

  function tabClass(name) {
    if (tab === name) {
      return "auth-tab active";
    }
    return "auth-tab";
  }

  return (
    <div className="loginPage">
      <header className="header">
        <Link to="/" className="logo">
          <img src="/assets/image.png" alt="logo" />
          <span>RISE</span>
        </Link>
        <Link to="/" className="backLink">Back to Home</Link>
      </header>

      <main>
        <AuthInfoPanel />

        <div className="rightPanel">
          <div className="formCard">
            <div className="tabs">
              <button className={tabClass("login")} onClick={() => setTab("login")}>Sign In</button>
              <button className={tabClass("register")} onClick={() => setTab("register")}>Create Account</button>
            </div>

            {tab === "login"
              ? <LoginForm onSwitchTab={() => setTab("register")} />
              : <SignupForm onSwitchTab={() => setTab("login")} />
            }
          </div>
        </div>
      </main>

      <footer>Developed by <span>Team RISE®</span> | &copy; 2026 RISE. All rights reserved.</footer>
    </div>
  );
}
