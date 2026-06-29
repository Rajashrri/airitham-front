// src/api/clientApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ✅ Get all clients
export const getTeam = async () => {
  const response = await fetch(`${BASE_URL}/api/team/getdatateam`);
  if (!response.ok) throw new Error("Failed to fetch clients");
  return response.json();
};

// ✅ Add client (used in AddClient)
export const addTeam = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/team/addTeam`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

// ✅ Update client (used in Edit page)
export const updateTeam = async (id, formData) => {
  const response = await fetch(`${BASE_URL}/api/team/updateTeam/${id}`, {
    method: "PATCH",
    body: formData,
  });
  return response.json();
};

// ✅ Delete client
export const deleteTeam = async (id) => {
  const response = await fetch(`${BASE_URL}/api/team/deleteteam/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

// ✅ Update client status
export const updateTeamStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/team/update-statusteam`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};

// ✅ Get client by ID (for edit form)
export const getTeamById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/team/getteamByid/${id}`);
  if (!response.ok) throw new Error("Failed to fetch client");
  return response.json();
};
