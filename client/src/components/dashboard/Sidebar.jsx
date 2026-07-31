import "./Sidebar.css";
import { useState } from "react";
import {
  FaHome,
  FaFolder,
  FaProjectDiagram,
  FaUserPlus,
  FaSignOutAlt,
  FaColumns,
  FaBars,
} from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");
};

  return (
    <div className={collapsed ? "sidebar collapsed" : "sidebar"}>

      <div className="sidebar-top">

        <button
          className="menu-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FaBars />
        </button>

        <h2 className="logo">
          <div className="logo-icon">PF</div>

          {!collapsed && <span>ProjectFlow</span>}
        </h2>

      </div>

      <ul>

        <NavLink to="/dashboard" className="nav-link">
          <li>
            <FaHome />
            {!collapsed && <span>Dashboard</span>}
          </li>
        </NavLink>

        <NavLink to="/workspace" className="nav-link">
          <li>
            <FaFolder />
            {!collapsed && <span>Workspaces</span>}
          </li>
        </NavLink>

        <NavLink to="/project" className="nav-link">
          <li>
            <FaProjectDiagram />
            {!collapsed && <span>Projects</span>}
          </li>
        </NavLink>

        <NavLink to="/board" className="nav-link">
          <li>
            <FaColumns />
            {!collapsed && <span>Board</span>}
          </li>
        </NavLink>

        <NavLink to="/invite-members" className="nav-link">
          <li>
            <FaUserPlus />
            {!collapsed && <span>Invite Members</span>}
          </li>
        </NavLink>

        <li className="logout" onClick={handleLogout}>
  <FaSignOutAlt />
  {!collapsed && <span>Logout</span>}
</li>

      </ul>

    </div>
  );
};

export default Sidebar;