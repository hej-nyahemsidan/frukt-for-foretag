import { createFileRoute } from "@tanstack/react-router";
import ResellerLogin from "@/reseller/pages/ResellerLogin";

export const Route = createFileRoute("/af/login")({
  component: ResellerLogin,
});
