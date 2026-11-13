import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { getProductRecommendations } from "@/lib/product-recommendations.functions";

export default function YouMayAlsoLike({ name, description }: { name: string; description: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["product-recommendations", name],
    queryFn: () => getProductRecommendations({ data: { name, description } }),
    staleTime: 1000 * 60 * 60,
  });

  if (!isLoading && (!data || data.length === 0)) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/60" aria-labelledby="you-may-also-like">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Utvalt för er
          </span>
          <h2 id="you-may-also-like" className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Du kanske också gillar
          </h2>
          <p className="mt-2 text-muted-foreground">Gott att beställa tillsammans med {name}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-72 rounded-2xl bg-card border border-border animate-pulse" />
              ))
            : data!.map((p) => (
                <Link
                  key={p.id}
                  to="/produkter"
                  className="group bg-card rounded-2xl border border-border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40"
                >
                  <div className="h-48 bg-muted/50 flex items-center justify-center p-5">
                    <img
                      src={p.image_url}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-foreground leading-snug line-clamp-2">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 flex-1">{p.reason}</p>
                    <div className="mt-4 flex items-center justify-between">
                      {p.fromPrice !== null && (
                        <span className="text-lg font-bold text-foreground">{p.fromPrice} kr</span>
                      )}
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        Se mer <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
