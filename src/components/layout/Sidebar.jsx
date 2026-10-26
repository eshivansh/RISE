
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./sidebar.css";

export default function Sidebar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/login", { replace: true });
  }

  const userName = user?.name || "User";

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>RISE</h2>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">
          {userName[0].toUpperCase()}
        </div>

        <div className="user-info">
          <p>{userName}</p>
          <span>Trader</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/welcome" end>
          <i className="bi bi-house"></i>
          <span>Home</span>
        </NavLink>

        <NavLink to="/dashboard">
          <i className="bi bi-graph-up-arrow"></i>
          <span>Trade</span>
        </NavLink>

        <NavLink to="/" end>
          <i className="bi bi-box-arrow-up-left"></i>
          <span>Exit to Home</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button type="button" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
