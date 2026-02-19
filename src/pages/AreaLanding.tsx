
import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Check, Truck, Star, Leaf, ShieldCheck, Phone, ArrowRight, MapPin } from 'lucide-react';
import { getAreaBySlug, areas } from '@/data/areas';
import fruktkorgPremium from '@/assets/fruktkorg-premium-new.jpg';
import fruktkorgStandard from '@/assets/fruktkorg-standard-new.jpg';
import fruktkorgEko from '@/assets/fruktkorg-eko-new.jpg';
import officeWorkers from '@/assets/office-workers-fruit.jpg';

const AreaLanding = () => {
  const { area } = useParams<{ area: string }>();
  const areaInfo = area ? getAreaBySlug(area) : undefined;

  if (!areaInfo) {
    return <Navigate to="/fruktkorg-stockholm" replace />;
  }

  const { name, description, nearbyAreas } = areaInfo;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`Fruktkorg ${name} – Fruktkorgar till kontor i ${name} | Vitaminkorgen`}
        description={`Fruktkorg ${name} ✓ ${description} Fri leverans, ingen bindningstid. Beställ idag!`}
        keywords={`fruktkorg ${name.toLowerCase()}, fruktkorgar ${name.toLowerCase()}, frukt kontor ${name.toLowerCase()}, fruktleverans ${name.toLowerCase()}, fruktkorg på jobbet ${name.toLowerCase()}`}
        type="products"
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-green-900" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block bg-yellow-400 text-green-900 font-semibold px-4 py-1 rounded-full text-sm mb-6">
                📍 {name}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Fruktkorg {name} – Frukt till kontoret
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/offertforfragan">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold text-lg px-8">
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

        {/* Trust Signals */}
        <section className="py-12 bg-green-50 border-b">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: Truck, text: `Fri leverans i ${name}` },
                { icon: Star, text: '150+ nöjda företag' },
                { icon: Leaf, text: 'Ekologiska alternativ' },
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

        {/* Products */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-4">
              Fruktkorgar vi levererar till {name}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Välj bland våra populära fruktkorgar – alla med fri leverans till {name}.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { img: fruktkorgStandard, name: 'Fruktkorg Standard', desc: 'Perfekt för det mindre kontoret med ett varierat urval av säsongens bästa frukter.', features: ['8-10 frukter', 'Säsongsanpassad', 'Fri leverans'] },
                { img: fruktkorgPremium, name: 'Fruktkorg Premium', desc: 'Vår mest populära fruktkorg med handplockade premiumfrukter.', features: ['12-15 frukter', 'Premiumkvalitet', 'Exotiska frukter'] },
                { img: fruktkorgEko, name: 'Fruktkorg Ekologisk', desc: 'Certifierad ekologisk frukt för miljömedvetna företag.', features: ['100% ekologisk', 'KRAV-certifierad', 'Hållbart val'] },
              ].map((product, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img src={product.img} alt={`${product.name} levererad till ${name}`} className="w-full h-56 object-cover" />
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

        {/* Why us in this area */}
        <section className="py-16 md:py-24 bg-green-50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
                  Varför välja Vitaminkorgen i {name}?
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Vi har levererat fruktkorgar till företag i Stockholmsområdet sedan 2021. 
                  Vi känner till {name} och ser till att er fruktkorg alltid levereras i tid och i perfekt skick.
                </p>
                <div className="space-y-3">
                  {[
                    `Gratis leverans till alla adresser i ${name}`,
                    'Handplockad, färsk säsongsfrukt av högsta kvalitet',
                    'Flexibla leveransdagar – välj vad som passar er',
                    'Ingen bindningstid – avsluta när som helst',
                    'Kostnadsfri provleverans för nya kunder',
                    'Fakturering – smidigt för företag',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={officeWorkers} alt={`Medarbetare njuter av fruktkorgar på kontoret i ${name}`} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">
              Vanliga frågor om fruktkorgar i {name}
            </h2>
            <div className="space-y-6">
              {[
                { q: `Levererar ni fruktkorgar till ${name}?`, a: `Ja! Vi levererar fruktkorgar till alla adresser i ${name} med gratis frakt. Leverans sker den dag ni väljer.` },
                { q: 'Hur mycket kostar en fruktkorg?', a: 'Våra fruktkorgar börjar från ca 200 kr/vecka. Kontakta oss för en skräddarsydd offert baserat på antal medarbetare.' },
                { q: 'Kan vi testa innan vi bestämmer oss?', a: 'Absolut! Vi erbjuder en kostnadsfri provkorg så ni kan uppleva kvaliteten själva innan ni bestämmer er.' },
                { q: 'Har ni ekologiska alternativ?', a: 'Ja, vi erbjuder KRAV-certifierade ekologiska fruktkorgar för företag som vill göra ett hållbart val.' },
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-green-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby areas */}
        <section className="py-12 bg-green-50">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center text-green-900 mb-6">
              Vi levererar även till närliggande områden
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {nearbyAreas.map((nearby, i) => {
                const nearbyArea = areas.find(a => a.name === nearby);
                return nearbyArea ? (
                  <Link key={i} to={`/fruktkorg/${nearbyArea.slug}`} className="inline-flex items-center gap-1 bg-white px-4 py-2 rounded-full text-sm font-medium text-green-800 hover:bg-green-100 transition-colors shadow-sm">
                    <MapPin className="h-3 w-3" /> Fruktkorg {nearby}
                  </Link>
                ) : (
                  <span key={i} className="inline-flex items-center gap-1 bg-white px-4 py-2 rounded-full text-sm font-medium text-green-800 shadow-sm">
                    <MapPin className="h-3 w-3" /> {nearby}
                  </span>
                );
              })}
              {areas.filter(a => a.slug !== areaInfo.slug && !nearbyAreas.includes(a.name)).slice(0, 6).map((a, i) => (
                <Link key={`other-${i}`} to={`/fruktkorg/${a.slug}`} className="inline-flex items-center gap-1 bg-white px-4 py-2 rounded-full text-sm font-medium text-green-800 hover:bg-green-100 transition-colors shadow-sm">
                  <MapPin className="h-3 w-3" /> Fruktkorg {a.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-green-800 to-green-900">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Beställ fruktkorg till {name} idag
            </h2>
            <p className="text-gray-200 mb-8 max-w-xl mx-auto">
              Testa gratis – vi bjuder på den första fruktkorgen. Ingen bindningstid, fri leverans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/offertforfragan">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold text-lg px-8">
                  Beställ gratis provkorg
                </Button>
              </Link>
              <a href="tel:010-18398 36">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                  <Phone className="h-5 w-5 mr-2" /> Ring oss
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

export default AreaLanding;
