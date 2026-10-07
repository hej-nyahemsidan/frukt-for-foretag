import { createFileRoute } from "@tanstack/react-router";
import FruktleveransForetag from "@/pages/FruktleveransForetag";

export const Route = createFileRoute("/fruktleverans-foretag")({
  component: FruktleveransForetag,
});
