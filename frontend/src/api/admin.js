import { apiGet, apiPatch, apiDelete } from "./client";

// Construit une query string en ignorant les valeurs vides/undefined.
function buildQuery(params = {}) {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") usp.set(key, value);
  });
  const qs = usp.toString();
  return qs ? `?${qs}` : "";
}

export const getOverview = () => apiGet("/admin/stats");

export const listUsersAdmin = (params) => apiGet(`/admin/users${buildQuery(params)}`);
export const getUserAdmin = (id) => apiGet(`/admin/users/${id}`);
export const updateUserAdmin = (id, updates) => apiPatch(`/admin/users/${id}`, updates);
export const deleteUserAdmin = (id) => apiDelete(`/admin/users/${id}`);

export const listConnectionsAdmin = (params) => apiGet(`/admin/connections${buildQuery(params)}`);
export const deleteConnectionAdmin = (id) => apiDelete(`/admin/connections/${id}`);

export const listMessagesAdmin = (params) => apiGet(`/admin/messages${buildQuery(params)}`);
export const deleteMessageAdmin = (id) => apiDelete(`/admin/messages/${id}`);
