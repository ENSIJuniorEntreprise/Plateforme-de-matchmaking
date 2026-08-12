const API_URL = "http://localhost:5000/api";

async function parseResponse(res) {
  let data = null;
  try {
    data = await res.json();
  } catch {
    // réponse non-JSON (ex: serveur injoignable)
  }
  if (!res.ok || !data?.success) {
    throw new Error(data?.message || "Une erreur est survenue. Veuillez réessayer.");
  }
  return data;
}

export async function login({ email, password }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return parseResponse(res);
}

export async function register(form) {
  const formData = new FormData();
  formData.append("role", form.role || "");
  formData.append("Nom", form.Nom || "");
  formData.append("Prenom", form.Prenom || "");
  formData.append("Email", form.Email || "");
  formData.append("Mot_de_passe", form.Mot_de_passe || "");
  formData.append("Entreprise", form.Entreprise || "");
  formData.append("Localisation", form.Localisation || "");
  formData.append("Lien", form.Lien || "");
  formData.append("Description", form.Description || "");
  formData.append("interests", JSON.stringify(form.interests || []));
  if (form.CV) formData.append("CV", form.CV);

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    body: formData,
  });
  return parseResponse(res);
}

export async function forgotPassword(email) {
  const res = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return parseResponse(res);
}

export async function resetPassword(token, password) {
  const res = await fetch(`${API_URL}/auth/reset-password/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  return parseResponse(res);
}
