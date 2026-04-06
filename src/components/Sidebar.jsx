import { useApp } from "../context/AppContext";

const NAV = [
  { id: "dashboard", label: "Overview", icon: "◈" },
  { id: "transactions", label: "Transactions", icon: "⇄" },
  { id: "insights", label: "Insights", icon: "◎" },
];

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const { activeView, role, theme } = state;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-mark">◈</span>
        <span className="logo-text">Finio</span>
      </div>

      <div className="role-switcher">
        <label className="role-label">Role</label>
        <div className="role-tabs">
          {["viewer", "admin"].map(r => (
            <button
              key={r}
              className={`role-tab ${role === r ? "active" : ""}`}
              onClick={() => dispatch({ type: "SET_ROLE", payload: r })}
            >
              {r === "admin" ? "⚡ Admin" : "👁 Viewer"}
            </button>
          ))}
        </div>
        {role === "admin" && (
          <div className="role-badge">Full access enabled</div>
        )}
      </div>

      <nav className="sidebar-nav">
        {NAV.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? "active" : ""}`}
            onClick={() => dispatch({ type: "SET_VIEW", payload: item.id })}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {activeView === item.id && <span className="nav-dot" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          className="theme-toggle"
          onClick={() => dispatch({ type: "TOGGLE_THEME" })}
          title="Toggle theme"
        >
          {theme === "dark" ? "☀ Light" : "◑ Dark"}
        </button>
        <p className="sidebar-version">v1.0.0 · 2026</p>
      </div>
    </aside>
  );
}
