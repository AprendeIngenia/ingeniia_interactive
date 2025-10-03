import apiClient from "./apiClient";

const AUTH_BASE =
  import.meta.env.VITE_API_AUTH_SERVICE_URL ||
  `${import.meta.env.VITE_API_GATEWAY_URL}/auth`;

export type RegisterResponse = { message: string };
export type TokenResponse = {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  expires_in?: number;
};
export type RefreshTokenResponse = { access_token: string; token_type: "bearer"; expires_in?: number };

export type UserResponse = {
  id: string;
  email: string;
  username?: string;
  is_verified?: boolean;
};

const devCaptcha = "dev"; // Backend en dev puede ignorarlo

export const authService = {
  register(email: string, password: string, username?: string) {
    return apiClient<RegisterResponse>(`${AUTH_BASE}/register`, {
      method: "POST",
      body: { email, password, username: username ?? email.split("@")[0], captcha_token: devCaptcha },
    });
  },
  verifyEmail(token: string) {
    return apiClient<TokenResponse>(`${AUTH_BASE}/verify-email`, {
      method: "POST",
      body: { token },
    });
  },
  login(email: string, password: string) {
    return apiClient<TokenResponse>(`${AUTH_BASE}/login`, {
      method: "POST",
      body: { email, password, captcha_token: devCaptcha },
    });
  },
  me() {
    return apiClient<UserResponse>(`${AUTH_BASE}/me`, { method: "GET" });
  },
  logout() {
    return apiClient<{ message: string }>(`${AUTH_BASE}/logout`, { method: "POST" });
  },
};
