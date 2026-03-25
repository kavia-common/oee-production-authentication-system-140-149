import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { loginRequest, meRequest } from "../api/auth";

const AuthContext = createContext(null);

function normalizeRole(user) {
  if (!user) return null;
  if (typeof user.role === "string") return user.role;
  if (Array.isArray(user.roles) && user.roles.length > 0) return String(user.roles[0]);
  if (typeof user.userRole === "string") return user.userRole;
  return null;
}

/**
 * PUBLIC_INTERFACE
 * Provides authentication state and actions to the app.
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("auth_token") || "");
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("auth_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(true);

  const role = useMemo(() => normalizeRole(user), [user]);

  const persist = useCallback((nextToken, nextUser) => {
    if (nextToken) localStorage.setItem("auth_token", nextToken);
    else localStorage.removeItem("auth_token");

    if (nextUser) localStorage.setItem("auth_user", JSON.stringify(nextUser));
    else localStorage.removeItem("auth_user");
  }, []);

  const logout = useCallback(() => {
    setToken("");
    setUser(null);
    persist("", null);
  }, [persist]);

  const login = useCallback(
    async ({ email, password }) => {
      const data = await loginRequest({ email, password });

      const nextToken = data?.token || data?.access_token || data?.accessToken || "";
      const nextUser =
        data?.user ||
        data?.profile ||
        data?.data?.user ||
        // fallback minimal identity
        { email, role: "operator" };

      if (!nextToken) {
        // If backend does not return a token, treat as failure.
        throw new Error("Login succeeded but no token returned by backend.");
      }

      setToken(nextToken);
      setUser(nextUser);
      persist(nextToken, nextUser);

      return { token: nextToken, user: nextUser };
    },
    [persist]
  );

  // Bootstrap: if token exists, attempt /me; otherwise stop loading.
  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      try {
        if (!token) return;
        const data = await meRequest();
        const nextUser = data?.user || data || user;
        if (!cancelled && nextUser) {
          setUser(nextUser);
          persist(token, nextUser);
        }
      } catch {
        // Token invalid or endpoint not available
        if (!cancelled) logout();
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    bootstrap();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!token) setLoading(false);
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      role,
      loading,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, user, role, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * Hook to access authentication context.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
