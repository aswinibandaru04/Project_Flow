import axios from "axios";

const API_URL = "https://project-flow-backend-fsex.onrender.com/api/projects";

export const createProject = async (projectData, token) => {
  const response = await axios.post(
    API_URL,
    projectData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getProjects = async (workspaceId, token) => {
  const response = await axios.get(
    `${API_URL}/workspace/${workspaceId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getProjectById = async (id, token) => {
  const response = await axios.get(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};