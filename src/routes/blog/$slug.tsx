import { createFileRoute } from "@tanstack/react-router";
import LegacyBlogRedirect from "@/pages/LegacyBlogRedirect";

export const Route = createFileRoute("/blog/$slug")({
  component: LegacyBlogRedirect,
});
