// src/services/apiClient.ts

const BASE_URL = "https://llm-compare-backend-0b16218aa15f.herokuapp.com/api";

// Define routes that do NOT require token
const excludedRoutes = ["/login", "/signup"];

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const accessToken = localStorage.getItem("access_token");
  const isExcluded = excludedRoutes.some((route) => endpoint.includes(route));

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  // Attach Authorization token if required
  if (!isExcluded && accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
}
