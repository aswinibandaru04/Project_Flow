import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import "./AdminDashboard.css";
import { getDashboardStats } from "../../services/dashboardService";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
  users: 0,
  projects: 0,
  tasks: 0,
  workspaces: 0,
});

useEffect(() => {

  fetchStats();

}, []);

const fetchStats = async () => {
  try {
    const token = localStorage.getItem("token");

    const data = await getDashboardStats(token);

    setStats(data);

  } catch (err) {
    console.log(err);
  }
};
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="dashboard-body">
          <h2>Welcome, Admin 👋</h2>

          <div className="cards">
            <div className="card">
              <h3>Total Users</h3>
              <p>{stats.users}</p>
            </div>

            <div className="card">
              <h3>Total Projects</h3>
              <p>{stats.projects}</p>
             </div>

            <div className="card">
              <h3>Tasks</h3>
              <p>{stats.tasks}</p>
              </div>

            <div className="card">
              <h3>Workspaces</h3>
              <p>{stats.workspaces}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;