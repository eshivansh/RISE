import { useNavigate } from "react-router-dom";
import "../styles/welcomepage.css";

export default function Welcome() {
  const goTo = useNavigate();

  function exitToHome() {
    goTo("/");
  }

  function signOut() {
    localStorage.removeItem("rise_loggedIn");
    goTo("/login", { replace: true });
  }

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <img src="/assets/image.png" alt="RISE" />
            <span>RISE</span>
          </div>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar"></div>
          <div className="user-info">
            <div className="user-name">Demo Trader</div>
            <div className="user-status">
              <span className="status-dot"></span> Active session
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-item active"><i className="bi bi-house"></i> Home</div>
          <div className="nav-item"><i className="bi bi-graph-up"></i> Trade</div>
          <div className="nav-item"><i className="bi bi-fire"></i> Missions</div>
          <div className="nav-item"><i className="bi bi-robot"></i> AI Trader</div>
          <div className="nav-item" onClick={exitToHome}>
            <i className="bi bi-arrow-left"></i> Exit to Home
          </div>
        </nav>

        <div className="btn-logout" onClick={signOut}>
          <i className="bi bi-box-arrow-left"></i> Sign Out
        </div>
      </aside>

      <main className="main-content">
        {/* TODO: welcome hero, account stats, market movers, trading tips */}
      </main>
    </>
  );
}
