import axios from "axios";

const API_URL = "https://project-flow-backend-fsex.onrender.com/api/users";


export const getUsers = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};



export const getProfile = async (token) => {
  const res = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


export const updateProfile = async (data, token) => {
  const res = await axios.put(`${API_URL}/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};