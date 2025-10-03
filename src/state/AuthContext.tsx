import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService, type UserResponse } from "@/services/authService";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "./authTokens";

type AuthContextType = {
  user: UserResponse | null;
  isAuthenticated: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isModalOpen: boolean;
  setUser: (u: UserResponse | null) => void;
  setSession: (access: string, refresh: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAuthenticated = !!getAccessToken();

  useEffect(() => {
    // Cargar perfil si hay token al montar
    (async () => {
      if (getAccessToken()) {
        try {
          const me = await authService.me();
          setUser(me);
        } catch {
          // token inválido
          clearTokens();
          setUser(null);
        }
      }
    })();
  }, []);

  const setSession = async (access: string, refresh: string) => {
    setTokens(access, refresh);
    try {
      const me = await authService.me();
      setUser(me);
    } catch {
      clearTokens();
      setUser(null);
    }
  };

  const logout = async () => {
    try { await authService.logout(); } catch {}
    clearTokens();
    setUser(null);
  };

  const value = useMemo<AuthContextType>(() => ({
    user,
    isAuthenticated,
    openAuthModal: () => setIsModalOpen(true),
    closeAuthModal: () => setIsModalOpen(false),
    isModalOpen,
    setUser,
    setSession,
    logout,
  }), [user, isAuthenticated, isModalOpen]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
