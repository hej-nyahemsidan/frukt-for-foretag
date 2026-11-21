export const MERGED_BLOG_POSTS: Record<string, "/fruktbud-stockholm" | "/fruktkorg-stockholm"> = {
  "fruktbud-stockholm-leverans-till-kontoret": "/fruktbud-stockholm",
  "fruktbud-stockholm-breda-leveranser-nojda-kunder": "/fruktbud-stockholm",
};

export const NOINDEX_BLOG_SLUGS = new Set(["solcell-arbetsbilar-energibesparingsprojekt"]);
export const BLOG_CATEGORIES = ["tips", "recept"];

export function isIndexableBlogPost(post: { slug: string; category: string }) {
  return BLOG_CATEGORIES.includes(post.category) && !NOINDEX_BLOG_SLUGS.has(post.slug) && !MERGED_BLOG_POSTS[post.slug];
}