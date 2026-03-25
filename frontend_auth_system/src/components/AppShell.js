import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

/**
 * PUBLIC_INTERFACE
 * Standard shell layout for authenticated areas (navbar + side navigation).
 */
export function AppShell({ title, navItems, children }) {
  const { user, role, logout } = useAuth();

  return (
    <div className="min-h-screen bg-ocean-background">
      <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500/15 to-slate-50 border border-slate-200 grid place-items-center">
              <span className="text-sm font-bold text-ocean-primary">OEE</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">{title}</div>
              <div className="text-xs text-slate-500">
                {user?.email || "Signed in"} · <span className="capitalize">{role || "user"}</span>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 active:bg-slate-100 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        <aside className="md:sticky md:top-20 self-start">
          <nav className="rounded-xl bg-white shadow-card border border-slate-200/70 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200/70">
              <div className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Navigation
              </div>
            </div>
            <div className="p-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    classNames(
                      "block rounded-lg px-3 py-2 text-sm font-medium transition",
                      isActive
                        ? "bg-blue-50 text-ocean-primary"
                        : "text-slate-700 hover:bg-slate-50"
                    )
                  }
                  end
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </aside>

        <main className="rounded-xl bg-white shadow-card border border-slate-200/70 p-5 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
