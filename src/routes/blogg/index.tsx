import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import BlogHome from "@/pages/BlogHome";

export const Route = createFileRoute("/blogg/")({
  head: () => staticHead("/blogg"),
  component: BlogHome,
});
