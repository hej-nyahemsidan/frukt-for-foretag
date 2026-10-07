import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import Checkout from "@/pages/Checkout";

export const Route = createFileRoute("/checkout")({
  head: () => staticHead("/checkout"),
  component: Checkout,
});
