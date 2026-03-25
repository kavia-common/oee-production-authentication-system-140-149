import React from "react";
import { Link } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Shown when a user is authenticated but lacks required role.
 */
export function UnauthorizedPage() {
  return (
    <div className="min-h-screen grid place-items-center bg-ocean-background px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-card border border-slate-200/70 p-6">
        <div className="text-lg font-semibold text-slate-900">Access restricted</div>
        <p className="mt-2 text-sm text-slate-600">
          Your account does not have permission to view this page.
        </p>
        <div className="mt-5 flex gap-3">
          <Link
            className="rounded-lg bg-ocean-primary px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
            to="/login"
          >
            Go to Login
          </Link>
          <Link
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            to="/logout"
          >
            Sign out
          </Link>
        </div>
      </div>
    </div>
  );
}
