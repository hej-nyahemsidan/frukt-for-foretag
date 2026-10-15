import { createFileRoute } from "@tanstack/react-router";
import ResellerDashboard from "@/reseller/pages/ResellerDashboard";
import ResellerProtectedRoute from "@/reseller/components/ResellerProtectedRoute";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/af/dashboard")({
  head: () => pageHead('/af/dashboard', { title: 'Återförsäljare – kunder och beställningar', description: 'Översikt över kunder, produktpriser och beställningar i återförsäljarportalen.', noindex: true }),
  component: () => (
    <ResellerProtectedRoute>
      <ResellerDashboard />
    </ResellerProtectedRoute>
  ),
});
