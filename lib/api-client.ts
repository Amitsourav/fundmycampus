const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 401) {
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    const msg = error.error || error.detail || error.message || JSON.stringify(error);
    throw new Error(msg || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  async get<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<T> {
    const url = new URL(`${API_URL}${path}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          url.searchParams.set(key, String(value));
        }
      });
    }
    const response = await fetch(url.toString(), {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    return handleResponse<T>(response);
  },

  async post<T>(path: string, body?: unknown): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  },

  async patch<T>(path: string, body?: unknown): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  },

  async upload<T>(path: string, formData: FormData): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    return handleResponse<T>(response);
  },
};
