import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VitaminKorgenLogo from '@/components/VitaminKorgenLogo';
import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Palette, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const SodermalmFruktkorgar = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Fruktkorgar Södermalm - Kreativ Kontorsfrukt Stockholm"
        description="Fruktkorgar till Södermalm. Vi levererar färska fruktkorgar till startups, kreativa byråer och företag på SoFo, Medborgarplatsen och hela Södermalm."
        keywords="fruktkorgar södermalm, kontorsfrukt södermalm, startup fruktleverans, södermalm frukt"
      />
      <StructuredData type="products" />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-secondary/20 via-background to-lightgreen/10">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-lightgreen/5"></div>
          
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
                  <Palette className="w-8 h-8 text-secondary mr-3" />
                  <span className="text-secondary font-semibold">KREATIV LEVERANS</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
                  Fruktkorgar till
                  <span className="text-secondary block">Södermalm</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Kreativa fruktkorgar för Stockholms mest trendiga stadsdel. Vi levererar 
                  inspiration och energi till startups, designstudios och innovativa företag 
                  på hela Södermalm.
                </p>
                
                <div className="flex items-center space-x-4 mb-8">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1 text-secondary" />
                    Leverans: Tisdag
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1 text-secondary" />
                    Tid: 08:00-15:00
                  </div>
                </div>
                
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
                  <Link to="/offertforfragan">
                    Starta kreativ fruktleverans
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
                Leveransservice för Södermalm
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <MapPin className="w-5 h-5 text-secondary mr-2" />
                    Områden vi täcker
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• SoFo (South of Folkungagatan)</li>
                    <li>• Medborgarplatsen & Björns trädgård</li>
                    <li>• Götgatan & Maria Bangata</li>
                    <li>• Slussen & Katarina-området</li>
                    <li>• Hornstull & Långholmen</li>
                    <li>• Mariatorget & Hornsgatan</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <Coffee className="w-5 h-5 text-secondary mr-2" />
                    Service & Fördelar
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Flexibla leveranstider (08:00-15:00)</li>
                    <li>• Rabatter för mindre företag</li>
                    <li>• Skalbar service (växer med er)</li>
                    <li>• Miljövänliga förpackningar</li>
                    <li>• Enkel onlinebokning</li>
                    <li>• Pålitliga leveranser</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-secondary/10 rounded-lg border border-secondary/30">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-charcoal mb-2">Lokal kunskap</h4>
                    <p className="text-sm text-gray-600">
                      Vi förstår Södermalms unika karaktär med många växande företag och 
                      erbjuder därför flexibla lösningar som passar både etablerade och nystartade verksamheter.
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
              Ge kreativiteten näring
            </h2>
            <p className="text-xl mb-8 text-secondary-foreground/90">
              Inspirera era team på Södermalm med färska, kreativa fruktkorgar som matchar er innovativa anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white text-secondary hover:bg-gray-50">
                <Link to="/offertforfragan">
                  Starta leverans idag
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/produkter">
                  Se alla kreativa korgar
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

export default SodermalmFruktkorgar;