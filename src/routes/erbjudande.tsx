import { createFileRoute } from "@tanstack/react-router";
import Erbjudande from "@/pages/Erbjudande";

export const Route = createFileRoute("/erbjudande")({
  component: Erbjudande,
});
