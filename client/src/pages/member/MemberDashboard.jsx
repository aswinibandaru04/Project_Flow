import { useState,useEffect } from "react";
import "./MemberDashboard.css";
import Navbar from "../../components/dashboard/Navbar";
import MemberSidebar from "../../components/dashboard/MemberSidebar";
import { getMemberDashboardStats } from "../../services/taskService";

const MemberDashboard = () => {

  const [collapsed, setCollapsed] = useState(false);

  const [stats, setStats] = useState({
  assignedTasks: 0,
  completedTasks: 0,
  pendingTasks: 0,
});

useEffect(() => {
  fetchStats();
}, []);

const fetchStats = async () => {
  try {
    const token = localStorage.getItem("token");

    const data = await getMemberDashboardStats(token);

    setStats(data);

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="member-container">

      <MemberSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`member-content ${
          collapsed ? "collapsed" : ""
        }`}
      >

        <Navbar />

        <div className="member-body">

          <h2>Welcome 👋</h2>

          <p>Manage your assigned tasks efficiently.</p>

          <div className="stats">

            <div className="stat-card">
              <h3>Assigned Tasks</h3>
              <span>{stats.assignedTasks}</span>
            </div>

            <div className="stat-card">
              <h3>Completed</h3>
              <span>{stats.completedTasks}</span>
            </div>

            <div className="stat-card">
              <h3>Pending</h3>
              <span>{stats.pendingTasks}</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MemberDashboard;