import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VitaminKorgenLogo from '@/components/VitaminKorgenLogo';
import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Truck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const AlvsjoFruktleverans = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Fruktleverans Älvsjö - Färska Fruktkorgar till Kontoret"
        description="Fruktleverans till Älvsjö. Handplockade fruktkorgar levererade direkt till ert kontor varje vecka. Beställ idag!"
        keywords="fruktleverans älvsjö, fruktkorgar älvsjö, kontorsfrukt älvsjö"
      />
      <StructuredData type="products" />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-12 md:py-20 bg-gradient-to-br from-lightgreen/20 via-background to-secondary/15">
          <div className="absolute inset-0 bg-gradient-to-r from-lightgreen/5 via-transparent to-secondary/5"></div>
          
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
                
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal mb-4 md:mb-6">
                  Fruktleverans till
                  <span className="text-secondary block">Älvsjö</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
                  Vi levererar färska fruktkorgar till företag i hela Älvsjö. Välj bland vårt 
                  kompletta sortiment av handplockade frukter och få leverans direkt till ert kontor.
                </p>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 mb-6 md:mb-8">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1 text-secondary flex-shrink-0" />
                    <span>Leverans: Torsdag</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1 text-secondary flex-shrink-0" />
                    <span>Tid: 08:00-16:00</span>
                  </div>
                </div>
                
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white w-full sm:w-auto">
                  <Link to="/offertforfragan">
                    Begär offert
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="bg-gradient-to-br from-white to-lightgreen/5 rounded-lg shadow-lg border border-secondary/20 p-8">
              <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">
                Leveransservice för Älvsjö
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <MapPin className="w-5 h-5 text-secondary mr-2" />
                    Områden vi täcker
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Älvsjö Centrum & Stationsområdet</li>
                    <li>• Sturebyvägen & företagsområden</li>
                    <li>• Älvsjö Industriområde</li>
                    <li>• Årstaberg & närområdet</li>
                    <li>• Långholmen Business Park</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <Heart className="w-5 h-5 text-secondary mr-2" />
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
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary text-white">
          <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Redo att beställa?
            </h2>
            <p className="text-xl mb-8 text-secondary-foreground/90">
              Få färska fruktkorgar levererade till ert kontor i Älvsjö varje vecka.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white text-secondary hover:bg-gray-50">
                <Link to="/offertforfragan">
                  Begär offert
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/kontakt">
                  Kontakta oss
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

export default AlvsjoFruktleverans;