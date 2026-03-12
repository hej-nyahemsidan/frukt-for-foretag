
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Check, Truck, Star, TrendingUp, Heart, Users, Phone, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import happyEmployees from '@/assets/glada-anstallda-fruktkorg-foretag.jpg';
import fruktkorgPremium from '@/assets/fruktkorg-premium-new.jpg';
import officeWellness from '@/assets/fruktkorg-halsa-kontor-stockholm.jpg';

const FruktkorgForetag = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Fruktkorg företag – Frukt till arbetsplatsen från 299 kr | Vitaminkorgen Stockholm"
        description="Fruktkorg företag ✓ Öka välmåendet med färsk frukt på jobbet. Fri leverans i Stockholm. 150+ företag litar på oss. Boka gratis provkorg!"
        keywords="fruktkorg företag, fruktkorgar företag, frukt till företag, företagsfrukt, fruktbud företag, fruktleverans företag, fruktkorgar arbetsplats, frukt kontor företag"
        type="products"
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-green-900" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block bg-yellow-400 text-green-900 font-semibold px-4 py-1 rounded-full text-sm mb-6">
                🏢 För företag & organisationer
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Fruktkorg företag – Frukt som friskvård
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
                Investera i era medarbetares hälsa med färska fruktkorgar till företaget. 
                Som ert fruktbud sköter vi allt – en enkel åtgärd som minskar sjukfrånvaro och ökar trivseln på arbetsplatsen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/offertforfragan">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold text-lg px-8">
                    Beställ företagsfrukt
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                    Kontakta oss
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits for Companies */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-4">
              Därför väljer företag Vitaminkorgen
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Fruktkorgar till företag är en av de enklaste och mest uppskattade friskvårdsåtgärderna.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Heart, title: 'Bättre hälsa', desc: 'Studier visar att frukt på jobbet minskar sjukfrånvaron med upp till 20%.' },
                { icon: TrendingUp, title: 'Ökad produktivitet', desc: 'Färsk frukt ger stabil energi genom hela arbetsdagen utan sockerdipp.' },
                { icon: Users, title: 'Attraktiv arbetsplats', desc: 'Visa att ni bryr er om era medarbetare – ett uppskattat företagsförmån.' },
                { icon: Building2, title: 'Enkel administration', desc: 'Vi sköter allt – från beställning till leverans. Ingen extra arbetsinsats krävs.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-green-100 rounded-xl w-fit mb-4">
                    <Icon className="h-6 w-6 text-green-700" />
                  </div>
                  <h3 className="text-lg font-bold text-green-900 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works for Companies */}
        <section className="py-16 md:py-24 bg-green-50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={happyEmployees} alt="Glada medarbetare med fruktkorgar på företaget" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
                  Skräddarsydda fruktkorgar för ert företag
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Oavsett om ni är 5 eller 500 anställda anpassar vi fruktkorgen efter ert behov. 
                  Vi tar hänsyn till antal medarbetare, preferenser och leveransfrekvens.
                </p>
                <div className="space-y-4">
                  {[
                    'Anpassat efter antal medarbetare och kontorstorlek',
                    'Flexibla leveransdagar – varje vecka eller varannan vecka',
                    'Möjlighet till ekologisk och KRAV-certifierad frukt',
                    'Fakturering – smidigt för företag',
                    'Ingen bindningstid – avsluta när som helst',
                    'Kostnadsfri provleverans för nya kunder',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">
              Vad företag säger om oss
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { quote: 'Fruktkorgen är det mest uppskattade vi erbjuder på kontoret. Vitaminkorgen levererar alltid i tid med fantastisk kvalitet.', name: 'Anna S.', role: 'Office Manager, Tech-bolag' },
                { quote: 'Vi har testat flera leverantörer men ingen slår Vitaminkorgen. Professionella och pålitliga – vi rekommenderar dem varmt.', name: 'Lars A.', role: 'HR-chef, Konsultfirma' },
                { quote: 'Sedan vi började med fruktkorgar har sjukfrånvaron minskat och trivseln ökat märkbart. En riktigt bra investering.', name: 'Maria J.', role: 'VD, Advokatbyrå' },
              ].map((t, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-md">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(s => <Star key={s} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{t.quote}"</p>
                  <div>
                    <p className="font-bold text-green-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-green-800 to-green-900">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ge ert företag en fruktkorg idag
            </h2>
            <p className="text-gray-200 mb-8 max-w-xl mx-auto">
              Kostnadsfri provleverans. Ingen bindningstid. Fri leverans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/offertforfragan">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold text-lg px-8">
                  Beställ provleverans
                </Button>
              </Link>
              <a href="tel:010-18398 36">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                  <Phone className="h-5 w-5 mr-2" /> 010-183 98 36
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

export default FruktkorgForetag;
