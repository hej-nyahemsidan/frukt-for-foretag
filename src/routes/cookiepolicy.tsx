import { createFileRoute } from "@tanstack/react-router";
import CookiePolicy from "@/pages/CookiePolicy";

export const Route = createFileRoute("/cookiepolicy")({
  component: CookiePolicy,
});
