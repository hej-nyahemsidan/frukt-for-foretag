import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import About from "@/pages/About";

export const Route = createFileRoute("/om-oss")({
  head: () => staticHead("/om-oss"),
  component: About,
});
