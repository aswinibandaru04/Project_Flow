import axios from "axios";

const API = axios.create({
  baseURL: "https://project-flow-backend-fsex.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;