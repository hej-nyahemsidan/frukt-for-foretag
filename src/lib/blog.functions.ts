import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { z } from "zod";

// Only published editorial content is returned; no admin client or session is used.
export const getPublicBlog = createServerFn({ method: "GET" })
  .inputValidator(z.object({ category: z.string().max(80).optional(), slug: z.string().max(250).optional() }))
  .handler(async ({ data }) => {
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) throw new Error("Bloggen kan inte laddas just nu.");
    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      } },
    });
    const summaries = [];
    for (let offset = 0; ; offset += 500) {
      let query = client.from("blog_posts")
        .select("id,title,slug,excerpt,image_url,category,author,published_at,updated_at")
        .eq("published", true).in("category", ["tips", "recept"])
        .order("published_at", { ascending: false }).order("id").range(offset, offset + 499);
      if (data.category) query = query.eq("category", data.category);
      const { data: rows, error } = await query;
      if (error) { console.error("Public blog list failed", error.code, error.message); throw new Error("Bloggen kan inte laddas just nu."); }
      summaries.push(...(rows ?? []));
      if (!rows || rows.length < 500) break;
    }
    if (!data.slug) return { posts: summaries, post: null };
    const { data: post, error } = await client.from("blog_posts")
      .select("id,title,slug,content,excerpt,image_url,category,author,published_at,created_at,updated_at")
      .eq("published", true).eq("category", data.category ?? "tips").eq("slug", data.slug).maybeSingle();
    if (error) { console.error("Public blog article failed", error.code, error.message); throw new Error("Artikeln kan inte laddas just nu."); }
    return { posts: summaries.filter(p => p.slug !== data.slug).slice(0, 3), post };
  });