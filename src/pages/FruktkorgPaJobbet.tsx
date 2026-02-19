
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Check, Truck, Star, Apple, Coffee, Zap, Heart, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import fruktkorgBanan from '@/assets/fruktkorg-banan-new.jpg';
import premiumCoffee from '@/assets/premium-coffee.jpg';
import professionalFruit from '@/assets/professional-fruit-display.jpg';
import officeWorkers from '@/assets/office-workers-fruit.jpg';

const FruktkorgPaJobbet = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Fruktkorg på jobbet – Färsk frukt till arbetsplatsen | Vitaminkorgen Stockholm"
        description="Fruktkorg på jobbet ✓ Leverans av färska fruktkorgar till arbetsplatsen i Stockholm. Öka välmåendet, minska sjukfrånvaron. Fri leverans & gratis provkorg."
        keywords="fruktkorg på jobbet, frukt på jobbet, fruktkorg arbetsplats, frukt till jobbet, fruktkorg kontor, fruktkorgar på jobbet, fruktkorg på arbetsplatsen"
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
                🍎 Frukt på jobbet
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Fruktkorg på jobbet – Så enkelt
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
                Ge era medarbetare energi och glädje med en fruktkorg på jobbet. 
                Vi levererar handplockad, färsk frukt direkt till arbetsplatsen – varje vecka.
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

        {/* Why Fruit at Work */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-4">
              Varför fruktkorg på jobbet?
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Forskning visar att fruktkorg på jobbet är en av de mest kostnadseffektiva hälsoinsatserna ett företag kan göra.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: Heart, 
                  title: 'Minskad sjukfrånvaro', 
                  desc: 'Företag med frukt på jobbet rapporterar upp till 20% lägre sjukfrånvaro. Fruktens vitaminer och antioxidanter stärker immunförsvaret.',
                  stat: '-20%',
                  statLabel: 'sjukfrånvaro'
                },
                { 
                  icon: Zap, 
                  title: 'Ökad energi & fokus', 
                  desc: 'Fruktkorg på jobbet ger naturlig energi utan sockerdippar. Medarbetare presterar bättre med jämn blodsockernivå.',
                  stat: '+30%',
                  statLabel: 'produktivitet'
                },
                { 
                  icon: Star, 
                  title: 'Trivsel & engagemang', 
                  desc: 'En fruktkorg på jobbet visar att arbetsgivaren bryr sig. Det ökar trivseln och gör er till en attraktivare arbetsplats.',
                  stat: '95%',
                  statLabel: 'uppskattning'
                },
              ].map(({ icon: Icon, title, desc, stat, statLabel }, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow text-center">
                  <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-4">
                    <Icon className="h-8 w-8 text-green-700" />
                  </div>
                  <div className="text-3xl font-bold text-yellow-500 mb-1">{stat}</div>
                  <div className="text-sm text-gray-500 mb-3">{statLabel}</div>
                  <h3 className="text-xl font-bold text-green-900 mb-3">{title}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Image + Text Section */}
        <section className="py-16 md:py-24 bg-green-50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
                  Så får du fruktkorg på jobbet
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Att starta med fruktkorg på jobbet är enkelt. Vi tar hand om allt – 
                  från val av frukt till leverans direkt till ert kontor. Ingen administration, 
                  inga krångliga avtal.
                </p>
                <div className="space-y-6">
                  {[
                    { step: '1', title: 'Välj storlek', desc: 'Berätta hur många ni är på kontoret så föreslår vi rätt fruktkorg.' },
                    { step: '2', title: 'Välj leveransdag', desc: 'Bestäm vilken dag i veckan ni vill ha er fruktkorg på jobbet.' },
                    { step: '3', title: 'Vi levererar', desc: 'Varje vecka levererar vi färsk frukt till ert kontor – helt gratis leverans.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-lg font-bold text-green-900 flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-bold text-green-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/offertforfragan" className="inline-block mt-8">
                  <Button className="bg-green-700 hover:bg-green-800 text-white font-bold px-8">
                    Kom igång <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={professionalFruit} alt="Fruktkorg på jobbet – professionell fruktkorg på ett kontor" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Popular Choices */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">
              Populära fruktkorgar på jobbet
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img src={fruktkorgBanan} alt="Fruktkorg med bananer för kontoret" className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-2">Fruktkorg Banan</h3>
                  <p className="text-gray-600 mb-4">Vår mest beställda fruktkorg på jobbet. Perfekt mix av bananer och säsongens frukter.</p>
                  <Link to="/produkter" className="text-green-700 font-semibold hover:underline inline-flex items-center gap-1">
                    Se detaljer <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img src={officeWorkers} alt="Medarbetare med frukt på kontoret" className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-2">Kombinera med kaffe & snacks</h3>
                  <p className="text-gray-600 mb-4">Komplettera fruktkorg på jobbet med kaffe, te och hälsosamma snacks.</p>
                  <Link to="/produkter" className="text-green-700 font-semibold hover:underline inline-flex items-center gap-1">
                    Se utbudet <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-green-50">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">
              Vanliga frågor om fruktkorg på jobbet
            </h2>
            <div className="space-y-6">
              {[
                { q: 'Hur mycket kostar en fruktkorg på jobbet?', a: 'Priset beror på storlek och antal medarbetare. Våra fruktkorgar börjar från ca 200 kr/vecka. Kontakta oss för en skräddarsydd offert.' },
                { q: 'Hur ofta levereras fruktkorg på jobbet?', a: 'Vi levererar vanligtvis en gång i veckan, men ni kan välja varannan vecka eller flera gånger per vecka beroende på behov.' },
                { q: 'Kan vi byta leveransdag?', a: 'Absolut! Ni kan enkelt ändra leveransdag via vår kundportal eller genom att kontakta oss.' },
                { q: 'Erbjuder ni ekologisk frukt på jobbet?', a: 'Ja, vi erbjuder KRAV-certifierade ekologiska fruktkorgar för företag som vill göra ett hållbart val.' },
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-green-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-green-800 to-green-900">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Börja med fruktkorg på jobbet idag
            </h2>
            <p className="text-gray-200 mb-8 max-w-xl mx-auto">
              Testa gratis – vi bjuder på den första fruktkorg på jobbet. Ingen bindningstid.
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

export default FruktkorgPaJobbet;
