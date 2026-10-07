import { createFileRoute } from "@tanstack/react-router";
import ResellerCustomerShop from "@/reseller/pages/ResellerCustomerShop";
import ResellerCustomerProtectedRoute from "@/reseller/components/ResellerCustomerProtectedRoute";

export const Route = createFileRoute("/af/kund/dashboard")({
  component: () => (
    <ResellerCustomerProtectedRoute>
      <ResellerCustomerShop />
    </ResellerCustomerProtectedRoute>
  ),
});
