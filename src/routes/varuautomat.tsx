import { createFileRoute } from "@tanstack/react-router";
import Varuautomat from "@/pages/Varuautomat";

export const Route = createFileRoute("/varuautomat")({
  component: Varuautomat,
});
