import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

export const Route = createFileRoute("/integritetspolicy")({
  head: () => staticHead("/integritetspolicy"),
  component: PrivacyPolicy,
});
