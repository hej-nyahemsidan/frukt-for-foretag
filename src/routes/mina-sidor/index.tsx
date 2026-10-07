import { createFileRoute } from "@tanstack/react-router";
import CustomerDashboard from "@/pages/CustomerDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";

export const Route = createFileRoute("/mina-sidor/")({
  component: () => (
    <ProtectedRoute>
      <CustomerDashboard />
    </ProtectedRoute>
  ),
});
