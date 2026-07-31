import "./MemberSidebar.css";
import { useNavigate } from "react-router-dom";

import {
  FaBars,
  FaHome,
  FaTasks,
  FaColumns,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const MemberSidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
  // Remove authentication data
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Redirect to login page
  navigate("/login", { replace: true });
};

  return (

    <div
      className={`member-sidebar ${
        collapsed ? "collapsed" : ""
      }`}
    >

      <button
        className="menu-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        <FaBars />
      </button>

      <div className="logo">

        <div className="logo-icon">
          PF
        </div>

        {!collapsed && <span>ProjectFlow</span>}

      </div>

      <ul>

        
        <NavLink to="/member-dashboard" className="nav-link">
          <li>
            <FaHome />
            {!collapsed && <span>Dashboard</span>}
          </li>
        </NavLink>

        <NavLink to="/my-tasks" className="nav-link">
          <li>
            <FaTasks />
            {!collapsed && <span>My Tasks</span>}
          </li>
        </NavLink>

        <NavLink to="/my-board" className="nav-link">
          <li>
            <FaColumns />
            {!collapsed && <span>My Board</span>}
          </li>
        </NavLink>

        <NavLink to="/profile" className="nav-link">
          <li>
            <FaUser />
            {!collapsed && <span>Profile</span>}
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

export default MemberSidebar;