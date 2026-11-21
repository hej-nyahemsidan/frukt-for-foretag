import { queryOptions } from "@tanstack/react-query";
import { getPublicBlog } from "./blog.functions";

export type BlogData = Awaited<ReturnType<typeof getPublicBlog>>;
export type BlogSummary = BlogData["posts"][number];
export const blogQueryOptions = (category?: string, slug?: string) => queryOptions({
  queryKey: ["public-blog", category ?? "all", slug ?? "list"],
  queryFn: () => getPublicBlog({ data: { ...(category ? { category } : {}), ...(slug ? { slug } : {}) } }),
  staleTime: 60_000,
});