import axios from "axios";

const API_URL = "https://project-flow-backend-fsex.onrender.com/notifications";

// ==============================
// GET NOTIFICATIONS
// ==============================
export const getNotifications = async (token) => {
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// ==============================
// MARK AS READ
// ==============================
export const markNotificationRead = async (id, token) => {
  const res = await axios.patch(
    `${API_URL}/${id}/read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};