import React from "react";
import { AppShell } from "../../components/AppShell";

/**
 * PUBLIC_INTERFACE
 * Operator dashboard (role: operator).
 */
export function OperatorDashboard() {
  const navItems = [
    { to: "/dashboard/operator", label: "My Station" },
    { to: "/logout", label: "Logout" },
  ];

  return (
    <AppShell title="Operator Dashboard" navItems={navItems}>
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Station Status</h2>
          <p className="mt-1 text-sm text-slate-600">
            Quick view of throughput, quality, and tasks for your current station.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Kpi label="Parts This Hour" value="146" />
          <Kpi label="Cycle Time" value="24.3s" tone="secondary" />
          <Kpi label="Quality Checks" value="OK" tone="success" />
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <div className="text-sm font-semibold text-slate-900">Next Actions</div>
          <ol className="mt-2 list-decimal pl-5 text-sm text-slate-700 space-y-1">
            <li>Verify material lot ID before next batch.</li>
            <li>Perform 5-part dimensional check every 30 minutes.</li>
            <li>Escalate if cycle time exceeds 28s for 3 consecutive cycles.</li>
          </ol>
        </div>
      </div>
    </AppShell>
  );
}

function Kpi({ label, value, tone }) {
  const badge =
    tone === "success"
      ? "bg-amber-50 text-amber-800 border-amber-200"
      : tone === "secondary"
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{label}</div>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-2xl font-semibold text-slate-900">{value}</div>
        <span className={`rounded-full border px-2 py-1 text-xs font-semibold ${badge}`}>Now</span>
      </div>
    </div>
  );
}
