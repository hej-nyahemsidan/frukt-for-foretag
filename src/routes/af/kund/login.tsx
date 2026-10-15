import { createFileRoute } from "@tanstack/react-router";
import ResellerCustomerLogin from "@/reseller/pages/ResellerCustomerLogin";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/af/kund/login")({
  head: () => pageHead('/af/kund/login', { title: 'Beställningsportal – kundinloggning', description: 'Logga in i din leverantörs beställningsportal.', noindex: true }),
  component: ResellerCustomerLogin,
});
