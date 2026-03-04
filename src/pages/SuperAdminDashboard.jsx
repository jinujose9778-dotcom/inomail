import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SuperAdminDashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [activeTab, setActiveTab] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (role !== "superadmin") navigate("/login");
  }, [role, navigate]);

  /* ================= USERS ================= */
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@mail.com", role: "user", status: "Active" },
    { id: 2, name: "Emma Smith", email: "emma@mail.com", role: "admin", status: "Active" },
  ]);

  const deleteUser = (id) => setUsers(users.filter((u) => u.id !== id));

  const toggleUserStatus = (id) =>
    setUsers(users.map((u) =>
      u.id === id
        ? { ...u, status: u.status === "Active" ? "Locked" : "Active" }
        : u
    ));

  const updateUserRole = (id, newRole) =>
    setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));

  /* ================= ORGANIZATIONS ================= */
  const [orgs, setOrgs] = useState([
    { id: 1, name: "InoTech", users: 12, status: "Active" },
    { id: 2, name: "NextGen", users: 7, status: "Active" },
  ]);

  const deleteOrg = (id) => setOrgs(orgs.filter((o) => o.id !== id));

  /* ================= CAMPAIGNS ================= */
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: "Summer Sale", org: "InoTech", status: "Sent" },
    { id: 2, name: "Winter Offer", org: "NextGen", status: "Draft" },
  ]);

  const deleteCampaign = (id) =>
    setCampaigns(campaigns.filter((c) => c.id !== id));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="super-wrapper">

     {/* ================= ULTRA PREMIUM SIDEBAR ================= */}
<aside className={`super-sidebar ${collapsed ? "collapsed" : ""}`}>

  {/* LOGO */}
  <div className="super-logo">
    <div className="logo-icon">⚡</div>
    {!collapsed && (
      <div className="logo-text">
        <h2>InoMail</h2>
        <span>SuperAdmin</span>
      </div>
    )}
  </div>

  {/* COLLAPSE BUTTON */}
  <button
    className="collapse-btn"
    onClick={() => setCollapsed(!collapsed)}
  >
    {collapsed ? "➡" : "⬅"}
  </button>

  {/* NAVIGATION */}
  <nav className="super-menu">

    <button
      className={activeTab === "overview" ? "menu-item active" : "menu-item"}
      onClick={() => setActiveTab("overview")}
    >
      <span className="menu-icon">📊</span>
      {!collapsed && <span>Overview</span>}
    </button>

    <button
      className={activeTab === "users" ? "menu-item active" : "menu-item"}
      onClick={() => setActiveTab("users")}
    >
      <span className="menu-icon">👥</span>
      {!collapsed && <span>Users</span>}
    </button>

    <button
      className={activeTab === "organizations" ? "menu-item active" : "menu-item"}
      onClick={() => setActiveTab("organizations")}
    >
      <span className="menu-icon">🏢</span>
      {!collapsed && <span>Organizations</span>}
    </button>

    <button
      className={activeTab === "campaigns" ? "menu-item active" : "menu-item"}
      onClick={() => setActiveTab("campaigns")}
    >
      <span className="menu-icon">📧</span>
      {!collapsed && <span>Campaigns</span>}
    </button>

    <button
      className={activeTab === "system" ? "menu-item active" : "menu-item"}
      onClick={() => setActiveTab("system")}
    >
      <span className="menu-icon">⚙</span>
      {!collapsed && <span>System</span>}
    </button>

  </nav>

  {/* LOGOUT */}
  <button className="logout-btn" onClick={logout}>
    🔒 {!collapsed && "Logout"}
  </button>

</aside>

      {/* ================= MAIN ================= */}
      <main className="super-main">

        {/* TOPBAR */}
        <div className="super-topbar">
          <h1>🚀 SuperAdmin Control Center</h1>
          <input
            placeholder="🔍 Global search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ================= OVERVIEW ================= */}
        {activeTab === "overview" && (
          <>
            <div className="super-hero">
              <div>
                <h2>Platform Control Dashboard</h2>
                <p>Monitor the entire system in real-time</p>
              </div>
              <div className="live-status">
                <span className="pulse-dot"></span>
                LIVE SYSTEM
              </div>
            </div>

            <div className="super-grid">
              <div className="super-card blue">
                <div className="card-icon">👥</div>
                <h3>Total Users</h3>
                <p>{users.length}</p>
              </div>

              <div className="super-card green">
                <div className="card-icon">🏢</div>
                <h3>Total Organizations</h3>
                <p>{orgs.length}</p>
              </div>

              <div className="super-card purple">
                <div className="card-icon">📧</div>
                <h3>Total Campaigns</h3>
                <p>{campaigns.length}</p>
              </div>

              <div className="super-card orange">
                <div className="card-icon">💰</div>
                <h3>Revenue</h3>
                <p>$12,480</p>
              </div>
            </div>

            <div className="activity-panel">
              <h3>🕒 Platform Activity</h3>
              <ul>
                <li>✔ New organization registered</li>
                <li>✔ Campaign deleted</li>
                <li>✔ SMTP restarted</li>
                <li>✔ Database backup completed</li>
              </ul>
            </div>
          </>
        )}

        {/* USERS */}
        {activeTab === "users" && (
          <>
            <h2>User Management</h2>
            <table className="super-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((u) =>
                    u.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <select
                          value={u.role}
                          onChange={(e) =>
                            updateUserRole(u.id, e.target.value)
                          }
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                          <option value="superadmin">SuperAdmin</option>
                        </select>
                      </td>
                      <td>
                        <span className={`status ${u.status.toLowerCase()}`}>
                          {u.status}
                        </span>
                      </td>
                      <td>
                        <button onClick={() => toggleUserStatus(u.id)}>
                          {u.status === "Active" ? "Lock" : "Unlock"}
                        </button>
                        <button onClick={() => deleteUser(u.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}

      </main>
    </div>
  );
}

export default SuperAdminDashboard;