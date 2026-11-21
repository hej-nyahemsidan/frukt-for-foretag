import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import AdminLogin from "@/admin/pages/AdminLogin";

export const Route = createFileRoute("/admin/login")({
  head: () => pageHead("/admin/login", { title: "Administratörsinloggning | Vitaminkorgen", description: "Logga in för att administrera Vitaminkorgen.", noindex: true }),
  component: AdminLogin,
});
