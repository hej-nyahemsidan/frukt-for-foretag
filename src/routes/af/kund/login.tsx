import { createFileRoute } from "@tanstack/react-router";
import ResellerCustomerLogin from "@/reseller/pages/ResellerCustomerLogin";

export const Route = createFileRoute("/af/kund/login")({
  component: ResellerCustomerLogin,
});
