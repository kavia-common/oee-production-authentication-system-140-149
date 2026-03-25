import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Logs the user out and redirects to /login.
 */
export function LogoutPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  return (
    <div className="min-h-screen grid place-items-center bg-ocean-background">
      <div className="text-sm text-slate-600">Signing out…</div>
    </div>
  );
}
