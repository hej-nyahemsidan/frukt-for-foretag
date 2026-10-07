import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import FruktleveransForetag from "@/pages/FruktleveransForetag";

export const Route = createFileRoute("/fruktleverans-foretag")({
  head: () => staticHead("/fruktleverans-foretag"),
  component: FruktleveransForetag,
});
