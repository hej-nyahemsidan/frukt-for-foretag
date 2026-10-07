import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Contact";

export const Route = createFileRoute("/kontakt")({
  head: () => staticHead("/kontakt"),
  component: Contact,
});
