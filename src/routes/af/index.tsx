import { createFileRoute } from "@tanstack/react-router";
import ResellerDashboard from "@/reseller/pages/ResellerDashboard";
import ResellerProtectedRoute from "@/reseller/components/ResellerProtectedRoute";

export const Route = createFileRoute("/af/")({
  component: () => (
    <ResellerProtectedRoute>
      <ResellerDashboard />
    </ResellerProtectedRoute>
  ),
});
