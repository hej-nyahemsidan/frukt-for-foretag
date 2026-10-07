import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import CustomerPortal from "@/pages/CustomerPortal";

export const Route = createFileRoute("/kundportal")({
  head: () => staticHead("/kundportal"),
  component: CustomerPortal,
});
