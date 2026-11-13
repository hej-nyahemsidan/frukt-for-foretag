import { createServerFn } from "@tanstack/react-start";

export interface RecommendedProduct {
  id: string;
  name: string;
  image_url: string;
  category: string;
  fromPrice: number | null;
  reason: string;
}

const lowestPrice = (prices: unknown): number | null => {
  if (!prices || typeof prices !== "object") return null;
  const vals = Object.values(prices as Record<string, unknown>).filter(
    (v): v is number => typeof v === "number" && v > 0,
  );
  return vals.length ? Math.min(...vals) : null;
};

// Public: recommends catalog products related to a product page using Lovable AI.
export const getProductRecommendations = createServerFn({ method: "POST" })
  .inputValidator((input: { name: string; description: string }) => ({
    name: String(input.name).slice(0, 200),
    description: String(input.description).slice(0, 1000),
  }))
  .handler(async ({ data }): Promise<RecommendedProduct[]> => {
    const { createClient } = await import("@supabase/supabase-js");
    const sb = createClient(
      "https://ydvnkqqtyvalvxcjhvbs.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkdm5rcXF0eXZhbHZ4Y2podmJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1MzY1OTEsImV4cCI6MjA3NDExMjU5MX0.sNtXvbEVyI9LPGlPYuZ1AzKx5pPCihYosxpxzSeRUqs",
      { auth: { persistSession: false } },
    );
    const { data: rows, error } = await sb
      .from("products")
      .select("id,name,description,category,image_url,prices");
    if (error || !rows) return [];
    const catalog = rows
      .map((r) => ({ ...r, fromPrice: lowestPrice(r.prices) }))
      .filter((r) => r.fromPrice !== null && r.name.toLowerCase() !== data.name.toLowerCase());
    if (!catalog.length) return [];

    const { generateResponse, GatewayError } = await import("@lovable.dev/ai-gateway");
    const list = catalog
      .map((r) => `${r.id} | ${r.name} | ${r.category} | ${(r.description ?? "").slice(0, 120)}`)
      .join("\n");
    try {
      const res = await generateResponse({
        model: "openai/gpt-6-astra",
        reasoning: { effort: "low" },
        instructions:
          "Du är en säljassistent för Vitaminkorgen som levererar fruktkorgar, fika och kontorsvaror till företag. Välj 4 produkter ur katalogen som passar bäst som komplement till produkten kunden tittar på (t.ex. mejeri, fika, dryck, skivad frukt). Välj inte andra fruktkorgar om det finns bra komplement. Ge en kort anledning på svenska (max 8 ord) per produkt. Använd endast id:n från katalogen.",
        input: [
          {
            role: "user",
            content: `Produkt: ${data.name}\n${data.description}\n\nKatalog (id | namn | kategori | beskrivning):\n${list}`,
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "recommendations",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              required: ["items"],
              properties: {
                items: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["id", "reason"],
                    properties: { id: { type: "string" }, reason: { type: "string" } },
                  },
                },
              },
            },
          },
        },
      });
      let text = "";
      for (const item of res.output ?? []) {
        if (item.type === "message") {
          for (const c of item.content) if (c.type === "output_text") text += c.text;
        }
      }
      const parsed = JSON.parse(text) as { items: { id: string; reason: string }[] };
      const byId = new Map(catalog.map((r) => [r.id, r]));
      return parsed.items
        .map((it) => {
          const p = byId.get(it.id);
          return p
            ? { id: p.id, name: p.name, image_url: p.image_url, category: p.category, fromPrice: p.fromPrice, reason: it.reason }
            : null;
        })
        .filter((x): x is RecommendedProduct => x !== null)
        .slice(0, 4);
    } catch (e) {
      if (e instanceof GatewayError) console.error("recommendations failed", e.code, e.ids);
      else console.error("recommendations failed", e);
      return [];
    }
  });
