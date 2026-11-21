import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import AdminDashboard from "@/admin/pages/AdminDashboard";
import AdminProtectedRoute from "@/admin/components/AdminProtectedRoute";

export const Route = createFileRoute("/admin/")({
  head: () => pageHead("/admin", { title: "Administration | Vitaminkorgen", description: "Vitaminkorgens skyddade administration.", noindex: true }),
  component: () => (
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  ),
});
