// src/services/apiClient.ts

const BASE_URL = "https://llm-compare-backend-0b16218aa15f.herokuapp.com/api";
const excludedRoutes = ["/login", "/signup"];

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  timeoutMs: number = 29000 // Default 35s timeout
): Promise<T> {
  const accessToken = localStorage.getItem("access_token");
  const isExcluded = excludedRoutes.some((route) => endpoint.includes(route));

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (!isExcluded && accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Something went wrong");
    }

    return response.json();
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw err;
  }
}
