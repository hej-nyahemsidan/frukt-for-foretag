import { Star } from "lucide-react";
import { trust } from "@/data/trust";

const TrustProofSection = () => {
  const google = trust.googleProfileUrl;
  return (
    <section className="py-12 md:py-16 bg-white" aria-labelledby="trust-heading">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 id="trust-heading" className="text-2xl md:text-3xl font-bold text-center text-green-900 mb-8">
          Företag i Stockholm litar på Vitaminkorgen
        </h2>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {trust.stats.map((s) => {
            const isGoogle = s.label.includes("Google");
            const body = (
              <>
                <div className="text-3xl font-bold text-green-900 flex items-center justify-center gap-1">
                  {s.value}
                  {isGoogle && <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" aria-hidden="true" />}
                </div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </>
            );
            return isGoogle && google ? (
              <a key={s.label} href={google} target="_blank" rel="noopener noreferrer" className="bg-green-50 rounded-xl px-8 py-4 text-center hover:shadow-md transition-shadow">
                {body}
              </a>
            ) : (
              <div key={s.label} className="bg-green-50 rounded-xl px-8 py-4 text-center">{body}</div>
            );
          })}
        </div>
        {trust.logos.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            {trust.logos.map((l) => (
              <img key={l.name} src={l.src} alt={`${l.name} logotyp`} loading="lazy" className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            ))}
          </div>
        )}
        {trust.reviews.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {trust.reviews.map((r) => (
              <figure key={r.name + r.company} className="bg-green-50 p-6 rounded-2xl">
                <blockquote className="text-gray-700 italic mb-3">"{r.quote}"</blockquote>
                <figcaption className="text-sm font-semibold text-green-900">{r.name}, {r.company}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrustProofSection;
