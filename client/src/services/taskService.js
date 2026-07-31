import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

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
    `http://localhost:5000/api/tasks/${taskId}/assign`,
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
    "http://localhost:5000/api/tasks/my-tasks",
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
    `http://localhost:5000/api/tasks/${taskId}/status`,
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
    "http://localhost:5000/api/tasks/member-dashboard",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

