// src/services/apiClient.ts
/**
 * Cliente API centralizado para manejar todas las solicitudes fetch.
 * Abstrae la lógica de construcción de URLs, manejo de headers,
 * parseo de JSON y gestión de errores de red.
 */

import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "@/state/authTokens";
interface ApiClientOptions extends RequestInit {}

class ApiError extends Error {
  status: number;
  data: any;
  constructor(message: string, status: number, data: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

const AUTH_BASE =
  import.meta.env.VITE_API_AUTH_SERVICE_URL ||
  `${import.meta.env.VITE_API_GATEWAY_URL}/auth`;

async function tryRefresh(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  const res = await fetch(`${AUTH_BASE}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refresh }),
  });

  if (!res.ok) {
    clearTokens();
    return null;
  }
  const data = await res.json().catch(() => ({}));
  const newAccess = data?.access_token as string | undefined;
  if (newAccess) {
    setTokens(newAccess, refresh);
    return newAccess;
  }
  clearTokens();
  return null;
}

async function doFetch<T>(endpoint: string, options: ApiClientOptions, attempt = 0): Promise<T> {
  const { headers, body, ...customConfig } = options;

  const token = getAccessToken();
  const config: RequestInit = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    ...customConfig,
  };
  if (body) config.body = typeof body === "string" ? body : JSON.stringify(body);

  const response = await fetch(endpoint, config);

  if (response.status === 401 && attempt === 0) {
    const newAccess = await tryRefresh();
    if (newAccess) {
      return doFetch<T>(endpoint, options, 1);
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: response.statusText }));
    throw new ApiError(
      `Error ${response.status}: ${errorData.detail || "Ocurrió un error en la solicitud"}`,
      response.status,
      errorData
    );
  }

  if (response.status === 204) return null as T;
  return (await response.json()) as T;
}

export default async function apiClient<T>(endpoint: string, options: ApiClientOptions = {}): Promise<T> {
  try {
    return await doFetch<T>(endpoint, options, 0);
  } catch (error) {
    console.error("ApiClient Error:", error);
    if (error instanceof ApiError) throw error;
    throw new Error(error instanceof Error ? error.message : "Error de red o de configuración de la petición.");
  }
}

export { ApiError };
