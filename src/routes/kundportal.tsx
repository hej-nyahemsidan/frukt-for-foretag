import { createFileRoute } from "@tanstack/react-router";
import CustomerPortal from "@/pages/CustomerPortal";

export const Route = createFileRoute("/kundportal")({
  component: CustomerPortal,
});
