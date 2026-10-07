import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import Varuautomat from "@/pages/Varuautomat";

export const Route = createFileRoute("/varuautomat")({
  head: () => staticHead("/varuautomat"),
  component: Varuautomat,
});
