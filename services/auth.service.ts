const API_URL = "http://localhost:8000"; // ajusta si tu backend usa otro puerto

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Error en el login");
  }

  localStorage.setItem("access_token", data.access_token);

  return data;
}
