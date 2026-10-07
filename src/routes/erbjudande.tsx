import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import Erbjudande from "@/pages/Erbjudande";

export const Route = createFileRoute("/erbjudande")({
  head: () => staticHead("/erbjudande"),
  component: Erbjudande,
});
