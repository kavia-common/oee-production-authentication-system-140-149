import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { LogoutPage } from "./pages/LogoutPage";
import { UnauthorizedPage } from "./pages/UnauthorizedPage";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { AdminDashboard } from "./pages/dashboards/AdminDashboard";
import { SupervisorDashboard } from "./pages/dashboards/SupervisorDashboard";
import { OperatorDashboard } from "./pages/dashboards/OperatorDashboard";
import { useAuth } from "./auth/AuthContext";

function DefaultAuthedRedirect() {
  const { role } = useAuth();
  if (role === "admin") return <Navigate to="/dashboard/admin" replace />;
  if (role === "supervisor") return <Navigate to="/dashboard/supervisor" replace />;
  return <Navigate to="/dashboard/operator" replace />;
}

// PUBLIC_INTERFACE
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Any authenticated user */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DefaultAuthedRedirect />} />
      </Route>

      {/* Role dashboards */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["supervisor"]} />}>
        <Route path="/dashboard/supervisor" element={<SupervisorDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["operator"]} />}>
        <Route path="/dashboard/operator" element={<OperatorDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
