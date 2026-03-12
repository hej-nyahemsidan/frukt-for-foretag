
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Check, Truck, Star, Leaf, Clock, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import fruktkorgPremium from '@/assets/fruktkorg-premium-new.jpg';
import fruktkorgStandard from '@/assets/fruktkorg-standard-new.jpg';
import fruktkorgBanan from '@/assets/fruktkorg-banan-new.jpg';
import officeWorkers from '@/assets/medarbetare-fruktkorgar-kontor.jpg';

const FruktkorgStockholm = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Fruktkorg Stockholm – Fruktleverans till kontoret | Vitaminkorgen"
        description="Beställ fruktkorg Stockholm ✓ Färska fruktkorgar levererade till kontoret varje vecka. Fri leverans. 150+ nöjda företag. Prova gratis!"
        keywords="fruktkorg stockholm, fruktkorgar stockholm, fruktleverans stockholm, fruktbud stockholm, färsk frukt stockholm, fruktkorg leverans stockholm, beställa fruktkorg stockholm"
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
                📍 Stockholm & Södertälje & Uppsala
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Fruktkorg Stockholm – Färska fruktkorgar levererade till dig
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
                Som ert lokala fruktbud levererar vi handplockade fruktkorgar i hela Stockholmsområdet. 
                Färsk, säsongsanpassad frukt direkt till ditt kontor eller hem – med gratis leverans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/offertforfragan">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold text-lg px-8">
                    Beställ fruktkorg
                  </Button>
                </Link>
                <Link to="/produkter">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                    Se vårt sortiment
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
                { icon: Truck, text: 'Fri leverans i Stockholm' },
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

        {/* What We Offer */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-4">
              Fruktkorgar i Stockholm – Vårt sortiment
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Vi erbjuder ett brett utbud av fruktkorgar anpassade för alla behov i Stockholmsområdet.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  img: fruktkorgStandard, 
                  name: 'Fruktkorg Original', 
                  desc: 'Perfekt för det mindre kontoret. Innehåller ett varierat urval av säsongens bästa frukter.',
                  features: ['8-10 frukter', 'Säsongsanpassad', 'Fri leverans']
                },
                { 
                  img: fruktkorgPremium, 
                  name: 'Fruktkorg Premium', 
                  desc: 'Vår mest populära fruktkorg med handplockade premiumfrukter för det kräsna kontoret.',
                  features: ['12-15 frukter', 'Premiumkvalitet', 'Exotiska frukter']
                },
                { 
                  img: fruktkorgBanan, 
                  name: 'Fruktkorg Banan', 
                  desc: 'En fruktkorg med extra fokus på bananer – perfekt som snabb energikick.',
                  features: ['Bananer i fokus', 'Energiboost', 'Populärt val']
                },
              ].map((product, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img src={product.img} alt={product.name} className="w-full h-56 object-cover" />
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

        {/* How It Works */}
        <section className="py-16 md:py-24 bg-green-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">
              Så fungerar det – Fruktkorg i Stockholm
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: '1', title: 'Välj fruktkorg', desc: 'Bläddra i vårt sortiment och välj den fruktkorg som passar ert kontor i Stockholm.' },
                { step: '2', title: 'Vi levererar', desc: 'Vi levererar färska fruktkorgar direkt till er adress i Stockholmsområdet – helt gratis.' },
                { step: '3', title: 'Njut av färsk frukt', desc: 'Era medarbetare njuter av handplockad, färsk frukt varje vecka.' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-green-900 mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Stockholm Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
                  Ert lokala fruktbud i Stockholm sedan 2021
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Vitaminkorgen har levererat färska fruktkorgar till företag i Stockholm sedan 2021. 
                  Vi känner till Stockholms alla stadsdelar och ser till att er fruktkorg alltid levereras 
                  i tid och i perfekt skick.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Vi levererar fruktkorgar i hela Stockholmsområdet inklusive Södermalm, Kungsholmen, 
                  Östermalm, Vasastan, Gamla Stan, Solna, Sundbyberg, Bromma och mer.
                </p>
                <div className="space-y-3">
                  {[
                    'Leverans till hela Stockholmsområdet, Södertälje och Uppsala',
                    'Samma dag-leverans vid beställning innan kl. 12',
                    'Flexibla leveransdagar – välj vad som passar er',
                    'Personlig kontakt med er leverantör',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={officeWorkers} alt="Medarbetare njuter av fruktkorgar på kontoret i Stockholm" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-green-800 to-green-900">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Beställ din fruktkorg i Stockholm idag
            </h2>
            <p className="text-gray-200 mb-8 max-w-xl mx-auto">
              Gör som 150+ andra Stockholmsföretag – ge era medarbetare färsk frukt varje vecka.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/offertforfragan">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold text-lg px-8">
                  Beställ nu
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

export default FruktkorgStockholm;
