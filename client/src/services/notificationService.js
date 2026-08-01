import axios from "axios";

const API_URL = "https://project-flow-backend-fsex.onrender.com/api/notifications";


export const getNotifications = async (token) => {
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


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