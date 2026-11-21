import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import ResellerCustomerShop from "@/reseller/pages/ResellerCustomerShop";
import ResellerCustomerProtectedRoute from "@/reseller/components/ResellerCustomerProtectedRoute";

export const Route = createFileRoute("/af/kund/dashboard")({
  head: () => pageHead("/af/kund/dashboard", { title: "Kundshop | Vitaminkorgen", description: "Din skyddade kundshop och beställningar.", noindex: true }),
  component: () => (
    <ResellerCustomerProtectedRoute>
      <ResellerCustomerShop />
    </ResellerCustomerProtectedRoute>
  ),
});
