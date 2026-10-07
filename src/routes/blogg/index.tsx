import { createFileRoute } from "@tanstack/react-router";
import BlogHome from "@/pages/BlogHome";

export const Route = createFileRoute("/blogg/")({
  component: BlogHome,
});
