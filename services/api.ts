const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function handleResponse(res: Response) {
  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.detail || "API Error");
  }
  return res.json();
}

export async function apiGet(endpoint: string) {
    const token = localStorage.getItem("access_token");
    
    const res = await fetch(`${API_URL}${endpoint}`,{
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    });
    return handleResponse(res);
}

export async function apiPost(endpoint: string, body: unknown) {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", 
        Authorization: token ? `Bearer ${token}` : "" 
        },
      body: JSON.stringify(body),
    });
    return handleResponse(res);
}

export async function apiPut(endpoint: string, body: unknown) {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", 
        Authorization: token ? `Bearer ${token}` : "" 
        },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}