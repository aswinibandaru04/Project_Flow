import axios from "axios";

export const getDashboardStats = async (token) => {

  const res = await axios.get(
    "http://localhost:5000/api/dashboard",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};