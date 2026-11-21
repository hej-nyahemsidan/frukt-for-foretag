import { createFileRoute, notFound } from "@tanstack/react-router";
import BlogList from "@/pages/BlogList";
import { pageHead } from "@/lib/seo";
import { blogQueryOptions } from "@/lib/blog-query";
import { BLOG_CATEGORIES } from "@/lib/blog-policy";
import { BlogLoadError, BlogNotFound } from "@/components/BlogRouteState";

export const Route = createFileRoute("/blogg/$category/")({
  loader: ({ params, context }) => {
    if (!BLOG_CATEGORIES.includes(params.category)) throw notFound();
    return context.queryClient.ensureQueryData(blogQueryOptions(params.category));
  },
  head: ({ params }) => {
    const isTips = params.category === "tips";
    return pageHead(`/blogg/${params.category}`, {
      title: `${isTips ? "Tips" : "Recept"} – Blogg | Vitaminkorgen`,
      description: isTips
        ? "Tips om fruktkorgar, frukt på jobbet och hälsa på arbetsplatsen för företag i Stockholm."
        : "Recept med färsk frukt – inspiration till fikat och mötet på kontoret.",
      noindex: !["tips", "recept"].includes(params.category),
    });
  },
  errorComponent: BlogLoadError,
  notFoundComponent: BlogNotFound,
  component: () => <BlogList initialData={Route.useLoaderData()} />,
});
