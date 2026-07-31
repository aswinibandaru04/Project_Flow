import axios from "axios";

const API_URL = "http://localhost:5000/api/notifications";

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