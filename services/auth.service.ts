const API_URL = "http://localhost:8000"; // ajusta si tu backend usa otro puerto

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Credenciales incorrectas");
  }

  return response.json();
}
