import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function roleLanding(role) {
  if (role === "admin") return "/dashboard/admin";
  if (role === "supervisor") return "/dashboard/supervisor";
  return "/dashboard/operator";
}

/**
 * PUBLIC_INTERFACE
 * Login page for OEE Monitor.
 */
export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = useMemo(() => location.state?.from?.pathname, [location.state]);

  const [email, setEmail] = useState("operator@example.com");
  const [password, setPassword] = useState("password");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const { user } = await login({ email, password });
      const dest = from || roleLanding(user?.role || (user?.roles?.[0] ?? "operator"));
      navigate(dest, { replace: true });
    } catch (err) {
      setError(err?.message || "Unable to sign in. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-ocean-background">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-500/10 to-slate-50" />
      <div className="relative mx-auto max-w-6xl px-4 py-10 grid place-items-center min-h-screen">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-white shadow-card border border-slate-200 grid place-items-center">
              <span className="text-sm font-bold text-ocean-primary">OEE</span>
            </div>
            <div>
              <div className="text-base font-semibold text-slate-900">Production Performance Monitor</div>
              <div className="text-sm text-slate-500">Secure sign-in</div>
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-card border border-slate-200/70 p-6">
            <h1 className="text-lg font-semibold text-slate-900">Sign in</h1>
            <p className="mt-1 text-sm text-slate-600">
              Use your assigned account to access role-based dashboards.
            </p>

            {error ? (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <form className="mt-5 space-y-4" onSubmit={onSubmit}>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-ocean-primary"
                  type="email"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Password</span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-ocean-primary"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </label>

              <button
                disabled={submitting}
                className="w-full rounded-lg bg-ocean-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:bg-blue-800 transition disabled:opacity-60"
                type="submit"
              >
                {submitting ? "Signing in…" : "Sign in"}
              </button>

              <div className="text-xs text-slate-500">
                Environment:
                <span className="ml-1 font-mono text-slate-700">
                  {process.env.REACT_APP_NODE_ENV || "development"}
                </span>
              </div>
            </form>
          </div>

          <div className="mt-4 text-xs text-slate-500">
            API base:
            <span className="ml-1 font-mono text-slate-700">
              {process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || "(not set)"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
