import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Check, Truck, Star, ShieldCheck, Phone, Users, Package } from 'lucide-react';
import { getCompanySizeBySlug, companySizes } from '@/data/companySizes';
import fruktkorgPremium from '@/assets/fruktkorg-premium-new.jpg';
import fruktkorgStandard from '@/assets/fruktkorg-standard-new.jpg';
import fruktkorgBanan from '@/assets/fruktkorg-banan-new.jpg';

const productImages: Record<string, string> = {
  Original: fruktkorgStandard,
  Premium: fruktkorgPremium,
  Banan: fruktkorgBanan,
};

const FruktkorgSize = () => {
  const { size } = useParams<{ size: string }>();
  const info = size ? getCompanySizeBySlug(size) : undefined;

  if (!info) return <Navigate to="/produkter" replace />;

  const { label, metaTitle, metaDescription, hero, intro, recommendation, tips, faqs } = info;

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
        keywords={`fruktkorg ${label.toLowerCase()}, fruktkorg företag ${info.size} anställda, fruktleverans ${info.size} personer kontor, fruktkorg storlek`}
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
                <Users className="inline h-3 w-3 mr-1" /> {label}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Fruktkorg för {label}
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">{hero}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/kontakt">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold shadow-lg border-2 border-black/10 text-lg px-8">
                    Beställ gratis provkorg
                  </Button>
                </Link>
                <Link to="/produkter">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                    Se alla fruktkorgar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="py-12 bg-green-50 border-b">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: Truck, text: 'Fri leverans i Stockholm' },
                { icon: Star, text: '150+ nöjda företag' },
                { icon: Package, text: 'Färdigt paket – inga gissningar' },
                { icon: ShieldCheck, text: 'Pausa när som helst' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Icon className="h-6 w-6 text-green-700" />
                  </div>
                  <span className="text-sm font-medium text-green-900">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-8">
              Vad passar för {label}?
            </h2>
            <div className="space-y-5 text-gray-700 leading-relaxed text-lg">
              {intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Recommendation */}
        <section className="py-16 md:py-20 bg-green-50/40">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-4">
              Vårt rekommenderade veckopaket
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{recommendation.rationale}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {recommendation.items.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <img src={productImages[item.product]} alt={`Fruktkorg ${item.product}`} className="w-full h-44 object-cover" />
                  <div className="p-5">
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="text-lg font-bold text-green-900">Fruktkorg {item.product}</h3>
                      <span className="text-sm font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded">x{item.qty}</span>
                    </div>
                    <p className="text-sm text-gray-600">Storlek: {item.size}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="text-sm font-medium text-green-900 mb-1">Uppskattad volym per vecka</p>
              <p className="text-2xl font-bold text-green-900">{recommendation.estimatedPerWeek}</p>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-8">
              Tips för {label}
            </h2>
            <div className="space-y-3">
              {tips.map((t, i) => (
                <div key={i} className="flex items-start gap-3 bg-green-50/60 p-4 rounded-xl">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-green-50/40">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">
              Vanliga frågor – fruktkorg för {label}
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

        {/* Other sizes */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center text-green-900 mb-6">
              Andra kontorsstorlekar
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {companySizes.filter(s => s.slug !== info.slug).map(s => (
                <Link
                  key={s.slug}
                  to={`/fruktkorg/anstallda/${s.slug}`}
                  className="inline-flex items-center gap-1 bg-green-50 px-4 py-2 rounded-full text-sm font-medium text-green-800 hover:bg-green-100 transition-colors shadow-sm"
                >
                  <Users className="h-3 w-3" /> Fruktkorg för {s.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-green-800 to-green-900">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Klar att börja? Vi bjuder på första korgen
            </h2>
            <p className="text-gray-200 mb-8 max-w-xl mx-auto">
              Boka en gratis provkorg så provar ni innan ni bestämmer er.
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

export default FruktkorgSize;