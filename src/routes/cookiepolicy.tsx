import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import CookiePolicy from "@/pages/CookiePolicy";

export const Route = createFileRoute("/cookiepolicy")({
  head: () => staticHead("/cookiepolicy"),
  component: CookiePolicy,
});
