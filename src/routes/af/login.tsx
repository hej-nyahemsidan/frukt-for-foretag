import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import ResellerLogin from "@/reseller/pages/ResellerLogin";

export const Route = createFileRoute("/af/login")({
  head: () => pageHead("/af/login", { title: "Återförsäljarinloggning | Vitaminkorgen", description: "Logga in som återförsäljare.", noindex: true }),
  component: ResellerLogin,
});
