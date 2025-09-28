import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VitaminKorgenLogo from '@/components/VitaminKorgenLogo';
import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Shield, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const KungsholmenKontorsfrukt = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Kontorsfrukt Kungsholmen - Fruktleverans Myndigheter & Företag"
        description="Kontorsfrukt till Kungsholmen. Vi levererar fruktkorgar till myndigheter, offentlig sektor och privata företag på Kungsholmen. Upphandlingsanpassad service."
        keywords="kontorsfrukt kungsholmen, fruktleverans myndigheter, kungsholmen frukt, offentlig sektor fruktkorgar"
      />
      <StructuredData type="products" />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-secondary/15 via-background to-primary/10">
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
                  <Shield className="w-8 h-8 text-secondary mr-3" />
                  <span className="text-secondary font-semibold">MYNDIGHETS-ANPASSAD</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
                  Kontorsfrukt till
                  <span className="text-secondary block">Kungsholmen</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Professionell fruktleverans till Kungsholmens myndigheter och företag. 
                  Vi erbjuder upphandlingsanpassad service för offentlig sektor och 
                  flexibla lösningar för privata företag.
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
                    Begär myndighetoffert
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Government Service Details */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="bg-gradient-to-br from-white to-secondary/5 rounded-lg shadow-lg border border-secondary/20 p-8">
              <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">
                Specialiserad Service för Kungsholmen
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <MapPin className="w-5 h-5 text-secondary mr-2" />
                    Leveransområden
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Polhemsgatan & myndighetshus</li>
                    <li>• Fleminggatan & Kungsholms torg</li>
                    <li>• Stadshagen & Kristineberg</li>
                    <li>• Bergsgatan & Scheelegatan</li>
                    <li>• Hantverkargatan</li>
                    <li>• Fridhemsgatan & Sankt Eriksgatan</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <Shield className="w-5 h-5 text-secondary mr-2" />
                    Myndighetsservice
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Upphandlingsanpassade avtal</li>
                    <li>• Miljöcertifierade produkter</li>
                    <li>• Leverans under kontorstid</li>
                    <li>• Säkerhetsanpassad leverans</li>
                    <li>• Långsiktiga avtalsperioder</li>
                    <li>• Transparenta kostnader</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-secondary/10 rounded-lg border border-secondary/30">
                <div className="flex items-start">
                  <Landmark className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-charcoal mb-2">Offentlig Sektor Specialisering</h4>
                    <p className="text-sm text-gray-600">
                      Vi har lång erfarenhet av att arbeta med myndigheter och offentlig sektor. 
                      Vi förstår era krav på transparens, miljöhänsyn och upphandlingsprocesser.
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
              Professionell service för alla sektorer
            </h2>
            <p className="text-xl mb-8 text-secondary-foreground/90">
              Oavsett om ni är en myndighet eller privat företag på Kungsholmen - vi har rätt lösning för er.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white text-secondary hover:bg-gray-50">
                <Link to="/offertforfragan">
                  Begär skräddarsydd offert
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/kontakt">
                  Diskutera era krav
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

export default KungsholmenKontorsfrukt;