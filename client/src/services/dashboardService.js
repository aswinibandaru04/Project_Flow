import axios from "axios";

export const getDashboardStats = async (token) => {

  const res = await axios.get(
    "https://project-flow-backend-fsex.onrender.com/dashboard",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};