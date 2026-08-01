import axios from "axios";

const API_URL = "https://project-flow-backend-fsex.onrender.com/tasks";

export const createTask = async (taskData, token) => {
  const response = await axios.post(
    API_URL,
    taskData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getTasks = async (projectId, token) => {
  const response = await axios.get(
    `${API_URL}/project/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const assignTask = async (taskId, userId, token) => {
  const response = await axios.put(
    `https://project-flow-backend-fsex.onrender.com/api/tasks/${taskId}/assign`,
    {
      assignedTo: userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMyTasks = async (token) => {

  const response = await axios.get(
    "https://project-flow-backend-fsex.onrender.com/api/tasks/my-tasks",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const changeTaskStatus = async (
  taskId,
  status,
  token
) => {

  const response = await axios.patch(
    `https://project-flow-backend-fsex.onrender.com/api/tasks/${taskId}/status`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMemberDashboardStats = async (token) => {
  const res = await axios.get(
    "https://project-flow-backend-fsex.onrender.com/api/tasks/member-dashboard",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

