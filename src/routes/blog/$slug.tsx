import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { blogQueryOptions } from "@/lib/blog-query";
import { pageHead } from "@/lib/seo";
import { BlogLoadError, BlogNotFound } from "@/components/BlogRouteState";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ context, params }) => {
    const { posts } = await context.queryClient.ensureQueryData(blogQueryOptions());
    const post = posts.find(p => p.slug === params.slug);
    if (!post) throw notFound();
    throw redirect({ to: "/blogg/$category/$slug", params: { category: post.category, slug: post.slug }, statusCode: 301, replace: true });
  },
  head: ({ params }) => pageHead(`/blog/${params.slug}`, {
    title: "Äldre blogglänk | Vitaminkorgen", description: "Artikeln finns på Vitaminkorgens blogg.", noindex: true,
  }),
  errorComponent: BlogLoadError,
  notFoundComponent: BlogNotFound,
});
