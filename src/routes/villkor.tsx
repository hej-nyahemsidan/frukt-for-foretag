import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import Terms from "@/pages/Terms";

export const Route = createFileRoute("/villkor")({
  head: () => staticHead("/villkor"),
  component: Terms,
});
