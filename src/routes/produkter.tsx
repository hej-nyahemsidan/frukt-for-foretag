import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import Products from "@/pages/Products";

export const Route = createFileRoute("/produkter")({
  head: () => staticHead("/produkter"),
  component: Products,
});
