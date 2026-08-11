export const API_URL = "http://localhost:5000/api";
export const SERVER_URL = "http://localhost:5000";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function parseResponse(res) {
  let data = null;
  try {
    data = await res.json();
  } catch {
    // pas de corps JSON (ex: serveur injoignable)
  }
  if (!res.ok || !data?.success) {
    throw new Error(data?.message || "Une erreur est survenue. Veuillez réessayer.");
  }
  return data;
}

export async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { ...authHeaders() },
  });
  return parseResponse(res);
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(body ?? {}),
  });
  return parseResponse(res);
}

export async function apiPatch(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  return parseResponse(res);
}

export async function apiDelete(path) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  return parseResponse(res);
}

// Les chemins renvoyés par le backend (cvUrl, avatarUrl, ...) sont relatifs
// (ex: "/uploads/avatars/xxx.png") et doivent être résolus vers le serveur API.
export function resolveAssetUrl(path) {
  if (!path) return null;
  return path.startsWith("http") ? path : `${SERVER_URL}${path}`;
}
