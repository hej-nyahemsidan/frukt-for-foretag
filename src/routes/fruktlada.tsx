import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import Fruktlada from "@/pages/Fruktlada";

export const Route = createFileRoute("/fruktlada")({
  head: () => staticHead("/fruktlada"),
  component: Fruktlada,
});
