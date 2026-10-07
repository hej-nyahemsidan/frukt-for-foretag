import { createFileRoute } from "@tanstack/react-router";
import CustomerOrders from "@/pages/CustomerOrders";
import ProtectedRoute from "@/components/ProtectedRoute";

export const Route = createFileRoute("/mina-sidor/ordrar")({
  component: () => (
    <ProtectedRoute>
      <CustomerOrders />
    </ProtectedRoute>
  ),
});
