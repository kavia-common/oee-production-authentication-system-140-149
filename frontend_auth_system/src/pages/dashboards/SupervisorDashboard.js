import React from "react";
import { AppShell } from "../../components/AppShell";

/**
 * PUBLIC_INTERFACE
 * Supervisor dashboard (role: supervisor).
 */
export function SupervisorDashboard() {
  const navItems = [
    { to: "/dashboard/supervisor", label: "Live Line" },
    { to: "/logout", label: "Logout" },
  ];

  return (
    <AppShell title="Supervisor Dashboard" navItems={navItems}>
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Shift Performance</h2>
          <p className="mt-1 text-sm text-slate-600">
            Monitor OEE signals and intervene when thresholds are breached.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Panel title="Line A - OEE" value="82%" hint="Target 85%" />
          <Panel title="Downtime (Shift)" value="17 min" hint="Top cause: Material wait" tone="secondary" />
          <Panel title="Scrap Rate" value="1.4%" hint="Within spec" />
          <Panel title="Alerts" value="2 open" hint="1 critical" tone="error" />
        </div>
      </div>
    </AppShell>
  );
}

function Panel({ title, value, hint, tone }) {
  const badge =
    tone === "error"
      ? "bg-red-50 text-red-700 border-red-200"
      : tone === "secondary"
      ? "bg-amber-50 text-amber-800 border-amber-200"
      : "bg-blue-50 text-blue-700 border-blue-200";

  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          <div className="mt-1 text-xs text-slate-500">{hint}</div>
        </div>
        <span className={`rounded-full border px-2 py-1 text-xs font-semibold ${badge}`}>Live</span>
      </div>
      <div className="mt-3 text-3xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}
