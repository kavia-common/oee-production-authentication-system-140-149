import React from "react";
import { AppShell } from "../../components/AppShell";

/**
 * PUBLIC_INTERFACE
 * Admin dashboard (role: admin).
 */
export function AdminDashboard() {
  const navItems = [
    { to: "/dashboard/admin", label: "Overview" },
    { to: "/logout", label: "Logout" },
  ];

  return (
    <AppShell title="Admin Dashboard" navItems={navItems}>
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">System Overview</h2>
          <p className="mt-1 text-sm text-slate-600">
            Manage users, roles, and access policies for production monitoring.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Kpi label="Active Users" value="128" />
          <Kpi label="Auth Errors (24h)" value="3" tone="error" />
          <Kpi label="Policies" value="14" tone="secondary" />
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <div className="text-sm font-semibold text-slate-900">Administrative Actions</div>
          <ul className="mt-2 text-sm text-slate-700 list-disc pl-5 space-y-1">
            <li>Create and assign roles (admin/supervisor/operator).</li>
            <li>Review audit logs and access attempts.</li>
            <li>Configure feature flags via REACT_APP_FEATURE_FLAGS (frontend display only).</li>
          </ul>
        </div>
      </div>
    </AppShell>
  );
}

function Kpi({ label, value, tone }) {
  const accent =
    tone === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : tone === "secondary"
      ? "border-amber-200 bg-amber-50 text-amber-800"
      : "border-blue-200 bg-blue-50 text-blue-700";

  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{label}</div>
      <div className="mt-2 flex items-baseline justify-between">
        <div className="text-2xl font-semibold text-slate-900">{value}</div>
        <div className={`rounded-full px-2 py-1 text-xs font-semibold border ${accent}`}>
          Status
        </div>
      </div>
    </div>
  );
}
