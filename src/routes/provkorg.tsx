import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import Provkorg from "@/pages/Provkorg";

export const Route = createFileRoute("/provkorg")({
  head: () => staticHead("/provkorg"),
  component: Provkorg,
});
