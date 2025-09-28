import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VitaminKorgenLogo from '@/components/VitaminKorgenLogo';
import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const KistaFruktkorgar = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Fruktkorgar Kista - Tech Hub Kontorsfrukt Stockholm"
        description="Fruktkorgar till Kista tech-området. Vi levererar energigivande kontorsfrukt till IT-företag, startups och utvecklingsteam i Kista Science City."
        keywords="fruktkorgar kista, tech företag frukt, kista science city fruktleverans, it företag kontorsfrukt"
      />
      <StructuredData type="products" />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-secondary/15 via-background to-primary/20">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-primary/5"></div>
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6">
                  <VitaminKorgenLogo 
                    size="medium" 
                    variant="horizontal"
                    animated={true}
                    className="h-16 w-auto"
                  />
                </div>
                
                <div className="flex items-center mb-4">
                  <Zap className="w-8 h-8 text-secondary mr-3" />
                  <span className="text-secondary font-semibold">TECH HUB SPECIALIST</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
                  Fruktkorgar till
                  <span className="text-secondary block">Kista Tech-området</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Energigivande fruktkorgar för Stockholms tech-huvudstad. Vi levererar 
                  brainfood och näringsrikt bränsle till utvecklare, designers och 
                  innovatörer i Kista Science City.
                </p>
                
                <div className="flex items-center space-x-4 mb-8">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1 text-secondary" />
                    Leverans: Onsdag
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1 text-secondary" />
                    Tid: 08:00-16:00
                  </div>
                </div>
                
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
                  <Link to="/offertforfragan">
                    Boosta teamet - begär offert
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="bg-gradient-to-br from-white to-secondary/5 rounded-lg shadow-lg border border-secondary/20 p-8">
              <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">
                Leveransservice för Kista
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <MapPin className="w-5 h-5 text-secondary mr-2" />
                    Områden vi täcker
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Kista Science Tower</li>
                    <li>• Electrum & KTH Kista</li>
                    <li>• Kista Galleria kontorsområde</li>
                    <li>• Akalla Business Park</li>
                    <li>• Hjulsta industriområde</li>
                    <li>• Rinkeby företagspark</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <Zap className="w-5 h-5 text-secondary mr-2" />
                    Service & Fördelar
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Näringsrika fruktval</li>
                    <li>• Flexibla leveranstider (08:00-16:00)</li>
                    <li>• Anpassade avtal efter behov</li>
                    <li>• Enkel orderhantering</li>
                    <li>• Pålitliga leveranser</li>
                    <li>• Konkurrenskraftiga priser</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-secondary/10 rounded-lg border border-secondary/30">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-charcoal mb-2">Lokal kunskap</h4>
                    <p className="text-sm text-gray-600">
                      Vi känner Kista-området väl och anpassar våra leveranser efter områdets 
                      behov och företagens önskemål för bästa möjliga service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Innovation Stats Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/5">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
              Kista i siffror
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-secondary mb-2">1000+</div>
                <p className="text-gray-600">Tech-företag i området</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-secondary mb-2">50+</div>
                <p className="text-gray-600">Startup-kunder</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-secondary mb-2">20%</div>
                <p className="text-gray-600">Startup-rabatt tillgänglig</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary text-white">
          <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fuel your innovation
            </h2>
            <p className="text-xl mb-8 text-secondary-foreground/90">
              Ge ert tech-team i Kista den energi som krävs för att bygga framtidens lösningar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white text-secondary hover:bg-gray-50">
                <Link to="/offertforfragan">
                  Starta tech-leverans
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/kontakt">
                  Diskutera startup-rabatt
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default KistaFruktkorgar;