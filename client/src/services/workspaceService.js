import axios from "axios";

const API_URL = "http://localhost:5000/api/workspaces";

export const createWorkspace = async (workspaceData, token) => {

    const response = await axios.post(
        API_URL,
        workspaceData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const getWorkspaces = async (token) => {

    const response = await axios.get(
        API_URL,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const getWorkspaceById = async (id, token) => {
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


export const inviteMember = async (workspaceId, userId, token) => {
  const res = await axios.put(
    `${API_URL}/${workspaceId}/invite`,
    { userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};