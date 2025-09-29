import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VitaminKorgenLogo from '@/components/VitaminKorgenLogo';
import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';

const SolnaSundbybergFrukt = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Kontorsfrukt Solna Sundbyberg - Företagsparker Fruktleverans"
        description="Kontorsfrukt till Solna och Sundbyberg. Vi levererar fruktkorgar till företagsparker, industriområden och kontorskomplex i norra Stockholm."
        keywords="kontorsfrukt solna, sundbyberg fruktleverans, företagspark frukt, solna business park fruktkorgar"
      />
      <StructuredData type="products" />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-12 md:py-20 bg-gradient-to-br from-primary/10 via-background to-lightgreen/15">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-lightgreen/5"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="mb-4 md:mb-6">
                  <VitaminKorgenLogo 
                    size="medium" 
                    variant="horizontal"
                    animated={true}
                    className="h-12 md:h-16 w-auto"
                  />
                </div>
                
                <div className="flex items-center mb-4">
                  <Factory className="w-6 md:w-8 h-6 md:h-8 text-primary mr-2 md:mr-3" />
                  <span className="text-primary font-semibold text-sm md:text-base">FÖRETAGSPARK SPECIALIST</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal mb-4 md:mb-6">
                  Kontorsfrukt till
                  <span className="text-primary block">Solna & Sundbyberg</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
                  Specialiserad fruktleverans till företagsparker och industriområden i 
                  Solna och Sundbyberg. Vi levererar stora volymer till kontorskomplex, 
                  företagsparker och industrianläggningar i norra Stockholm.
                </p>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 mb-6 md:mb-8">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1 text-primary flex-shrink-0" />
                    <span>Leverans: Onsdag</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1 text-primary flex-shrink-0" />
                    <span>Tid: 07:00-15:00</span>
                  </div>
                </div>
                
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto">
                  <Link to="/offertforfragan">
                    Begär företagspark offert
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="bg-gradient-to-br from-white to-primary/5 rounded-lg shadow-lg border border-primary/20 p-8">
              <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">
                Leveransservice för Solna & Sundbyberg
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <MapPin className="w-5 h-5 text-primary mr-2" />
                    Områden vi täcker
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Solna Business Park</li>
                    <li>• Solna Centrum & stationsområdet</li>
                    <li>• Sundbyberg Centrum</li>
                    <li>• Industriområden Sundbyberg</li>
                    <li>• Rissne & Hallonbergen</li>
                    <li>• Västra Skogen</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <Factory className="w-5 h-5 text-primary mr-2" />
                    Service & Fördelar
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Enkel orderhantering</li>
                    <li>• Pålitliga leveranser</li>
                    <li>• Konkurrenskraftiga priser</li>
                    <li>• Professionell presentation</li>
                    <li>• Flexibla avtal</li>
                    <li>• Säsongsanpassade urval</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/30">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-charcoal mb-2">Lokal kunskap</h4>
                    <p className="text-sm text-gray-600">
                      Vi har omfattande erfarenhet av leveranser till Solna och Sundbyberg och 
                      förstår områdenas behov av effektiva och pålitliga leveranser.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Volume Benefits Section */}
        <section className="py-16 bg-gradient-to-br from-lightgreen/10 to-primary/5">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
              Fördelar för stora företag
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <p className="text-gray-600">Medarbetare per leverans</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">15%</div>
                <p className="text-gray-600">Volymrabatt från 10 korgar</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">1 dag</div>
                <p className="text-gray-600">Leveranstid för hela området</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Skalbar fruktleverans för stora företag
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Oavsett storleken på ert företag i Solna eller Sundbyberg - vi har lösningen för er.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-50">
                <Link to="/offertforfragan">
                  Begär volymoffert
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/kontakt">
                  Diskutera stora leveranser
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

export default SolnaSundbybergFrukt;