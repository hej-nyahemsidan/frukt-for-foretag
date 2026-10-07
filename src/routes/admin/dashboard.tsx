import { createFileRoute } from "@tanstack/react-router";
import AdminDashboard from "@/admin/pages/AdminDashboard";
import AdminProtectedRoute from "@/admin/components/AdminProtectedRoute";

export const Route = createFileRoute("/admin/dashboard")({
  component: () => (
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  ),
});
