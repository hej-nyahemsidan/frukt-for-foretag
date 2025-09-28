import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VitaminKorgenLogo from '@/components/VitaminKorgenLogo';
import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const StockholmFruktleverans = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Fruktleverans Stockholm Centrum - Kontorsfrukt & Fruktkorgar"
        description="Fruktleverans till Stockholm centrum. Vi levererar färska fruktkorgar till företag i city, finansdistriktet och centrala Stockholm. Beställ idag!"
        keywords="fruktleverans stockholm, kontorsfrukt stockholm centrum, fruktkorgar city stockholm, stockholm frukt leverans"
      />
      <StructuredData type="products" />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-lightgreen/20 via-background to-primary/10">
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
                
                <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
                  Fruktleverans till
                  <span className="text-secondary block">Stockholm Centrum</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Vi levererar färska fruktkorgar till företag i hela centrala Stockholm. 
                  Från Gamla Stan till T-Centralen - vi täcker hela city med kvalitetsfrukt 
                  varje vecka.
                </p>
                
                <div className="flex items-center space-x-4 mb-8">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1 text-secondary" />
                    Leverans: Måndag & Tisdag
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1 text-secondary" />
                    Tid: 07:00-15:00
                  </div>
                </div>
                
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
                  <Link to="/offertforfragan">
                    Begär offert för Stockholm
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery Details */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">
                Leveransdetaljer Stockholm Centrum
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <MapPin className="w-5 h-5 text-secondary mr-2" />
                    Täckta Områden
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Gamla Stan</li>
                    <li>• Norrmalm (T-Centralen området)</li>
                    <li>• Sergels torg & Drottninggatan</li>
                    <li>• Finansdistriktet</li>
                    <li>• Regeringsgatan & Hamngatan</li>
                    <li>• Stureplan område</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <Clock className="w-5 h-5 text-secondary mr-2" />
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
              
              <div className="mt-8 p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-charcoal mb-2">Specialleverans City</h4>
                    <p className="text-sm text-gray-600">
                      På grund av trafikbegränsningar i city levererar vi till portvakter 
                      eller receptioner. Vi samordnar alltid med er för smidig mottagning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary text-white">
          <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Börja med fruktleverans idag
            </h2>
            <p className="text-xl mb-8 text-secondary-foreground/90">
              Gör era medarbetare i Stockholm gladare och friskare med våra färska fruktkorgar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white text-secondary hover:bg-gray-50">
                <Link to="/offertforfragan">
                  Begär offert
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/produkter">
                  Se alla produkter
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

export default StockholmFruktleverans;