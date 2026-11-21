import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import AdminDashboard from "@/admin/pages/AdminDashboard";
import AdminProtectedRoute from "@/admin/components/AdminProtectedRoute";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => pageHead("/admin/dashboard", { title: "Administrationsöversikt | Vitaminkorgen", description: "Översikt för Vitaminkorgens administratörer.", noindex: true }),
  component: () => (
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  ),
});
