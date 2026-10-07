import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import Blommor from "@/pages/Blommor";

export const Route = createFileRoute("/blommor")({
  head: () => staticHead("/blommor"),
  component: Blommor,
});
