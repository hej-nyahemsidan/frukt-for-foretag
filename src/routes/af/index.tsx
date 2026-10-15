import { createFileRoute } from "@tanstack/react-router";
import ResellerDashboard from "@/reseller/pages/ResellerDashboard";
import ResellerProtectedRoute from "@/reseller/components/ResellerProtectedRoute";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/af/")({
  head: () => pageHead('/af', { title: 'Återförsäljarportal – översikt', description: 'Hantera återförsäljarens kunder, produkter, priser och beställningar.', noindex: true }),
  component: () => (
    <ResellerProtectedRoute>
      <ResellerDashboard />
    </ResellerProtectedRoute>
  ),
});
