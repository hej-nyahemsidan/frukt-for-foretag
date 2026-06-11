import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Check, X, Phone } from 'lucide-react';
import { getComparisonBySlug, comparisons } from '@/data/comparisons';

const Comparison = () => {
  const { type } = useParams<{ type: string }>();
  const info = type ? getComparisonBySlug(type) : undefined;

  if (!info) return <Navigate to="/produkter" replace />;

  const { alternativeName, metaTitle, metaDescription, hero, intro, rows, conclusion, faqs } = info;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${metaTitle} | Vitaminkorgen`}
        description={metaDescription}
        keywords={`fruktkorg jämförelse, ${alternativeName.toLowerCase()} vs fruktkorg, fruktleverans företag jämförelse`}
        type="minimal"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-green-900" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block bg-yellow-400 text-green-900 font-semibold px-4 py-1 rounded-full text-sm mb-6">
                Jämförelse
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Fruktkorg vs {alternativeName.toLowerCase()}
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">{hero}</p>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="space-y-5 text-gray-700 leading-relaxed text-lg">
              {intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-16 md:py-20 bg-green-50/40">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">
              Punkt för punkt-jämförelse
            </h2>
            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-800 text-white">
                    <th className="text-left p-4 font-semibold">Egenskap</th>
                    <th className="text-left p-4 font-semibold">{alternativeName}</th>
                    <th className="text-left p-4 font-semibold bg-yellow-400 text-green-900">Vitaminkorgen</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-green-50/30'}>
                      <td className="p-4 font-semibold text-green-900 align-top">{row.feature}</td>
                      <td className="p-4 text-gray-600 align-top">
                        <div className="flex items-start gap-2">
                          <X className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                          <span>{row.alternative}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-700 align-top bg-yellow-50/40">
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span className="font-medium">{row.vitaminkorgen}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">Vår slutsats</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{conclusion}</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-green-50/40">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">
              Vanliga frågor
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-green-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other comparisons */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center text-green-900 mb-6">
              Fler jämförelser
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {comparisons.filter(c => c.slug !== info.slug).map(c => (
                <Link
                  key={c.slug}
                  to={`/jamfor/${c.slug}`}
                  className="inline-flex items-center gap-1 bg-green-50 px-4 py-2 rounded-full text-sm font-medium text-green-800 hover:bg-green-100 transition-colors shadow-sm"
                >
                  Fruktkorg vs {c.alternativeName.toLowerCase()}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-green-800 to-green-900">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Prova själv – första korgen bjuder vi på
            </h2>
            <p className="text-gray-200 mb-8 max-w-xl mx-auto">
              Boka gratis provkorg så ser ni skillnaden direkt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold shadow-lg border-2 border-black/10 text-lg px-8">
                  Beställ gratis provkorg
                </Button>
              </Link>
              <a href="tel:010-1839836">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                  <Phone className="h-5 w-5 mr-2" /> Ring 010-183 98 36
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Comparison;