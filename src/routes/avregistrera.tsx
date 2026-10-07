import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import Avregistrera from "@/pages/Avregistrera";

export const Route = createFileRoute("/avregistrera")({
  head: () => staticHead("/avregistrera"),
  component: Avregistrera,
});
