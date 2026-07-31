import "./Navbar.css";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const role =
    user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1).toLowerCase();

  return (
    <div className="navbar">
      <h2>{role} Dashboard</h2>

      <div className="navbar-right">

  <NotificationBell />

  <div className="admin-profile">
    👤 {user?.name}
  </div>

</div>
    </div>

    
  );
};

export default Navbar;