import { describe, expect, it } from "vitest";
import { isIndexableBlogPost } from "./blog-policy";
import { supabase } from "@/integrations/supabase/client";

describe("public blog indexability", () => {
  it("includes ordinary public tips and recipes", () => {
    expect(isIndexableBlogPost({ category: "tips", slug: "hur-manga-racker-en-fruktkorg" })).toBe(true);
    expect(isIndexableBlogPost({ category: "recept", slug: "smoothie-recept-kontoret-fruktkorg" })).toBe(true);
  });
  it("excludes articles redirected to the service hub", () => {
    expect(isIndexableBlogPost({ category: "tips", slug: "fruktbud-stockholm-leverans-till-kontoret" })).toBe(false);
    expect(isIndexableBlogPost({ category: "tips", slug: "fruktbud-stockholm-breda-leveranser-nojda-kunder" })).toBe(false);
  });
  it("excludes the intentional noindex article and unsupported categories", () => {
    expect(isIndexableBlogPost({ category: "tips", slug: "solcell-arbetsbilar-energibesparingsprojekt" })).toBe(false);
    expect(isIndexableBlogPost({ category: "private", slug: "internal" })).toBe(false);
  });
});

// Public data regression: verify the numeric business rule, not presentation/copy.
describe("published fruit amount guideline", () => {
  for (const slug of ["hur-manga-racker-en-fruktkorg", "fruktlada-till-kontoret-storlekar-priser", "hur-mycket-frukt-behovs-till-kontor"]) {
    it(`${slug}: recommends 6–7 kg for 5–12 people`, async () => {
      const { data, error } = await supabase.from("blog_posts").select("content")
        .eq("published", true).eq("category", "tips").eq("slug", slug).single();
      expect(error).toBeNull();
      const row = data?.content.split("\n").find(line => /^\|\s*5[–-]12\s*\|/.test(line));
      const cells = row?.split("|");
      const people = cells?.[1]?.match(/\d+/g)?.map(Number);
      const kilograms = cells?.[2]?.match(/\d+/g)?.map(Number);
      expect(people).toEqual([5, 12]);
      expect(kilograms).toEqual([6, 7]);
    });
  }
});