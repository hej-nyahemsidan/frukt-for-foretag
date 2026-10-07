import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import ResetPassword from "@/pages/ResetPassword";

export const Route = createFileRoute("/reset-password")({
  head: () => staticHead("/reset-password"),
  component: ResetPassword,
});
