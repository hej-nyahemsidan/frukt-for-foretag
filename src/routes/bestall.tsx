import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import Bestall from "@/pages/Bestall";

export const Route = createFileRoute("/bestall")({
  head: () => staticHead("/bestall"),
  component: Bestall,
});
