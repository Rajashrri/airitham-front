// src/api/clientApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ✅ Get all clients
export const getClients = async () => {
  const response = await fetch(`${BASE_URL}/api/client/getdataclient`);
  if (!response.ok) throw new Error("Failed to fetch clients");
  return response.json();
};

// ✅ Add client (used in AddClient)
export const addClient = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/client/addclient`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

// ✅ Update client (used in Edit page)
export const updateClient = async (id, formData) => {
  const response = await fetch(`${BASE_URL}/api/client/updateclient/${id}`, {
    method: "PATCH",
    body: formData,
  });
  return response.json();
};

// ✅ Delete client
export const deleteClient = async (id) => {
  const response = await fetch(`${BASE_URL}/api/client/deleteclient/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

// ✅ Update client status
export const updateClientStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/client/update-statusclient`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};

// ✅ Get client by ID (for edit form)
export const getClientById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/client/getclientByid/${id}`);
  if (!response.ok) throw new Error("Failed to fetch client");
  return response.json();
};
