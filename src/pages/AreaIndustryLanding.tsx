import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Check, Truck, Star, Leaf, ShieldCheck, Phone, MapPin, Briefcase } from 'lucide-react';
import { getAreaBySlug, areas } from '@/data/areas';
import { getIndustryBySlug, industries, priorityAreaSlugs } from '@/data/industries';
import fruktkorgPremium from '@/assets/fruktkorg-premium-new.jpg';
import fruktkorgStandard from '@/assets/fruktkorg-standard-new.jpg';
import fruktkorgBanan from '@/assets/fruktkorg-banan-new.jpg';
import officeWorkers from '@/assets/medarbetare-fruktkorgar-kontor.jpg';

const AreaIndustryLanding = () => {
  const { area, industry } = useParams<{ area: string; industry: string }>();
  const areaInfo = area ? getAreaBySlug(area) : undefined;
  const industryInfo = industry ? getIndustryBySlug(industry) : undefined;

  // Fallbacks: if either is missing, send to the area page or pillar.
  if (!areaInfo) return <Navigate to="/fruktkorg-stockholm" replace />;
  if (!industryInfo) return <Navigate to={`/fruktkorg/${areaInfo.slug}`} replace />;

  // Only render full programmatic pages for priority areas — guard against
  // accidental indexing of low-priority combinations.
  if (!priorityAreaSlugs.includes(areaInfo.slug)) {
    return <Navigate to={`/fruktkorg/${areaInfo.slug}`} replace />;
  }

  const { name: areaName, highlights } = areaInfo;
  const { name: industryName, shortLabel, metaDescription, intro, recommendation, benefits, faqs } = industryInfo;
  const description = metaDescription.replace('{area}', areaName);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://vitaminkorgen.se/' },
      { '@type': 'ListItem', position: 2, name: `Fruktkorg ${areaName}`, item: `https://vitaminkorgen.se/fruktkorg/${areaInfo.slug}` },
      { '@type': 'ListItem', position: 3, name: `${industryName} ${areaName}`, item: `https://vitaminkorgen.se/fruktkorg/${areaInfo.slug}/${industryInfo.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`Fruktkorg ${industryName} ${areaName} – ${areaName} | Vitaminkorgen`}
        description={description.slice(0, 155)}
        keywords={`fruktkorg ${industryInfo.slug} ${areaName.toLowerCase()}, fruktkorg ${areaName.toLowerCase()}, ${shortLabel} fruktkorg, fruktleverans ${areaName.toLowerCase()}, frukt till ${shortLabel}`}
        type="minimal"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-green-900" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <Link to={`/fruktkorg/${areaInfo.slug}`} className="inline-block bg-white/15 text-white font-medium px-3 py-1 rounded-full text-sm hover:bg-white/25 transition-colors">
                  <MapPin className="inline h-3 w-3 mr-1" /> {areaName}
                </Link>
                <span className="inline-block bg-yellow-400 text-green-900 font-semibold px-3 py-1 rounded-full text-sm">
                  <Briefcase className="inline h-3 w-3 mr-1" /> {industryName}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Fruktkorg till {industryName.toLowerCase()} i {areaName}
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
                {description}
              </p>
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

        {/* Trust signals */}
        <section className="py-12 bg-green-50 border-b">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: Truck, text: `Fri leverans i ${areaName}` },
                { icon: Star, text: '150+ nöjda företag' },
                { icon: Leaf, text: 'Färsk säsongsfrukt' },
                { icon: ShieldCheck, text: '100% nöjdhetsgaranti' },
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

        {/* Industry intro */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-8">
              Därför funkar fruktkorgen för {shortLabel} i {areaName}
            </h2>
            <div className="space-y-5 text-gray-700 leading-relaxed text-lg">
              {intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {highlights && highlights.length > 0 && (
              <div className="mt-10 p-6 bg-green-50 rounded-2xl">
                <h3 className="font-bold text-green-900 mb-3">Vi levererar till {shortLabel} bland annat vid:</h3>
                <div className="flex flex-wrap gap-2">
                  {highlights.map((h, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-full text-sm text-green-800 shadow-sm">
                      <MapPin className="h-3 w-3" /> {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-2xl">
              <h3 className="font-bold text-green-900 mb-2">Vår rekommendation</h3>
              <p className="text-gray-700">{recommendation}</p>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-16 md:py-24 bg-green-50/40">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-4">
              Fruktkorgar vi levererar till {shortLabel} i {areaName}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Alla korgar levereras med fri frakt i {areaName} – välj den som passar ert team bäst.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { img: fruktkorgStandard, name: 'Fruktkorg Original', desc: 'Brett urval av säsongens bästa frukter – perfekt veckobas för kontoret.', features: ['8-10 frukter', 'Säsongsanpassad', 'Fri leverans'] },
                { img: fruktkorgPremium, name: 'Fruktkorg Premium', desc: 'Handplockade premiumfrukter – passar bra i reception och klientmöten.', features: ['12-15 frukter', 'Premiumkvalitet', 'Exotiska frukter'] },
                { img: fruktkorgBanan, name: 'Fruktkorg Banan', desc: 'Bananer i fokus – snabb energi mellan möten och under fokuserade arbetspass.', features: ['Bananer i fokus', 'Energiboost', 'Populärt val'] },
              ].map((product, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img src={product.img} alt={`${product.name} levererad till ${industryName.toLowerCase()} i ${areaName}`} className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-green-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.desc}</p>
                    <ul className="space-y-2">
                      {product.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                          <Check className="h-4 w-4 text-green-600" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits tailored to industry */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
                  Anpassat för {shortLabel} i {areaName}
                </h2>
                <div className="space-y-3">
                  {benefits.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link to="/kontakt">
                    <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white font-bold">
                      Beställ provkorg
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={officeWorkers} alt={`Medarbetare på ${industryName.toLowerCase()} i ${areaName} njuter av fruktkorg`} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-green-50/40">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">
              Vanliga frågor – {industryName} i {areaName}
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

        {/* Cross-link: other industries in same area */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center text-green-900 mb-6">
              Fruktkorgar för andra branscher i {areaName}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {industries
                .filter(i => i.slug !== industryInfo.slug)
                .map((i) => (
                  <Link
                    key={i.slug}
                    to={`/fruktkorg/${areaInfo.slug}/${i.slug}`}
                    className="inline-flex items-center gap-1 bg-green-50 px-4 py-2 rounded-full text-sm font-medium text-green-800 hover:bg-green-100 transition-colors shadow-sm"
                  >
                    <Briefcase className="h-3 w-3" /> {i.name} {areaName}
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Cross-link: same industry in other priority areas */}
        <section className="py-12 bg-green-50">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center text-green-900 mb-6">
              {industryName} i andra Stockholmsområden
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {priorityAreaSlugs
                .filter(s => s !== areaInfo.slug)
                .map(s => {
                  const a = areas.find(x => x.slug === s);
                  if (!a) return null;
                  return (
                    <Link
                      key={s}
                      to={`/fruktkorg/${a.slug}/${industryInfo.slug}`}
                      className="inline-flex items-center gap-1 bg-white px-4 py-2 rounded-full text-sm font-medium text-green-800 hover:bg-green-100 transition-colors shadow-sm"
                    >
                      <MapPin className="h-3 w-3" /> {industryName} {a.name}
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-green-800 to-green-900">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Beställ fruktkorg till er {industryName.toLowerCase()} i {areaName}
            </h2>
            <p className="text-gray-200 mb-8 max-w-xl mx-auto">
              Testa gratis – vi bjuder på den första fruktkorgen. Fri leverans i {areaName}.
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

export default AreaIndustryLanding;