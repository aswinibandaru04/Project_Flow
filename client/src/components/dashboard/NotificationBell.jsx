import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import {
  getNotifications,
  markNotificationRead,
} from "../../services/notificationService";

import "./NotificationBell.css";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications(token);
      setNotifications(data.notifications);
    } catch (err) {
      console.log(err);
    }
  };

  const unread = notifications.filter((n) => !n.isRead).length;

  const handleRead = async (id) => {
    await markNotificationRead(id, token);

    setNotifications(
      notifications.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      )
    );
  };

  return (
    <div className="notification-container">

      <div
        className="bell"
        onClick={() => setShow(!show)}
      >
        <FaBell />

        {unread > 0 && (
          <span className="badge">{unread}</span>
        )}
      </div>

      {show && (
        <div className="notification-dropdown">

          <h4>Notifications</h4>

          {notifications.length === 0 ? (
            <p>No Notifications</p>
          ) : (
            notifications.map((item) => (
              <div
                key={item._id}
                className={`notification-item ${
                  item.isRead ? "read" : ""
                }`}
                onClick={() => handleRead(item._id)}
              >
                <h5>{item.title}</h5>

                <p>{item.message}</p>
              </div>
            ))
          )}

        </div>
      )}
    </div>
  );
};

export default NotificationBell;