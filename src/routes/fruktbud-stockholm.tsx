import { createFileRoute } from "@tanstack/react-router";
import FruktbudStockholm, { fruktbudFaq } from "@/pages/FruktbudStockholm";
import { faqJsonLd, staticHead } from "@/lib/seo";

export const Route = createFileRoute("/fruktbud-stockholm")({
  head: () => ({
    ...staticHead("/fruktbud-stockholm"),
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(fruktbudFaq)) },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Fruktbud Stockholm",
          serviceType: "Fruktleverans till kontor",
          url: "https://vitaminkorgen.se/fruktbud-stockholm",
          areaServed: ["Stockholm", "Södertälje", "Uppsala"].map((n) => ({ "@type": "City", name: n })),
          provider: { "@id": "https://vitaminkorgen.se/#organization" },
          offers: { "@type": "Offer", priceCurrency: "SEK", price: "220" },
        }),
      },
    ],
  }),
  component: FruktbudStockholm,
});
