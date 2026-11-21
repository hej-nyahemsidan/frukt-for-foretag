import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import BlogHome from "@/pages/BlogHome";
import { blogQueryOptions } from "@/lib/blog-query";
import { BlogLoadError, BlogNotFound } from "@/components/BlogRouteState";

export const Route = createFileRoute("/blogg/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(blogQueryOptions()),
  head: () => staticHead("/blogg"),
  errorComponent: BlogLoadError,
  notFoundComponent: BlogNotFound,
  component: () => <BlogHome initialData={Route.useLoaderData()} />,
});
