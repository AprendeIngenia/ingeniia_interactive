// src/state/authTokens.ts
const ACCESS_KEY = "ingeniia.access_token";
const REFRESH_KEY = "ingeniia.refresh_token";

export function getAccessToken(): string | null {
  try { return localStorage.getItem(ACCESS_KEY); } catch { return null; }
}
export function getRefreshToken(): string | null {
  try { return localStorage.getItem(REFRESH_KEY); } catch { return null; }
}
export function setTokens(access?: string | null, refresh?: string | null) {
  try {
    if (access == null) localStorage.removeItem(ACCESS_KEY);
    else localStorage.setItem(ACCESS_KEY, access);
    if (refresh == null) localStorage.removeItem(REFRESH_KEY);
    else localStorage.setItem(REFRESH_KEY, refresh);
  } catch {}
}
export function clearTokens() { setTokens(null, null); }
