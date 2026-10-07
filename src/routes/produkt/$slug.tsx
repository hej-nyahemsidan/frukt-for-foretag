import { createFileRoute } from "@tanstack/react-router";
import FruktkorgProduct from "@/pages/FruktkorgProduct";
import { fruktkorgProducts } from "@/data/fruktkorg-products";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/produkt/$slug")({
  head: ({ params }) => {
    const p = fruktkorgProducts.find((x) => x.slug === params.slug);
    return pageHead(`/produkt/${params.slug}`, {
      title: p?.seoTitle ?? "Fruktkorg | Vitaminkorgen",
      description: (p?.seoDescription ?? "Fruktkorg till kontoret.").slice(0, 155),
      ogType: "product",
      noindex: !p,
    });
  },
  component: FruktkorgProduct,
});
