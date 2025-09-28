import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VitaminKorgenLogo from '@/components/VitaminKorgenLogo';
import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Crown, Building, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const OstermalmKontorsfrukt = () => {
  const clientAreas = [
    {
      icon: <Building className="w-6 h-6" />,
      area: 'Stureplan',
      description: 'Lyxbutiker, banker och advokatbyråer'
    },
    {
      icon: <Crown className="w-6 h-6" />,
      area: 'Karlaplan',
      description: 'Ambassader och internationella företag'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      area: 'Östermalms torg',
      description: 'Finansrådgivare och fastighetsbolag'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Kontorsfrukt Östermalm - Premium Fruktkorgar Stockholm"
        description="Exklusiv kontorsfrukt till Östermalm. Vi levererar premium fruktkorgar till företag på Stureplan, Karlaplan och Östermalms torg. Kvalitetsfrukt för krävande kunder."
        keywords="kontorsfrukt östermalm, fruktkorgar östermalm, premium fruktleverans stockholm, östermalm frukt"
      />
      <StructuredData type="products" />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
          
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
                  <Crown className="w-8 h-8 text-primary mr-3" />
                  <span className="text-primary font-semibold">PREMIUM LEVERANS</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
                  Kontorsfrukt till
                  <span className="text-primary block">Östermalm</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Exklusiva fruktkorgar för Stockholms mest prestigefulla affärsdistrikt. 
                  Vi levererar premium kvalitet till företag på Stureplan, Karlaplan 
                  och hela Östermalm.
                </p>
                
                <div className="flex items-center space-x-4 mb-8">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1 text-primary" />
                    Leverans: Måndag
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1 text-primary" />
                    Tid: 07:00-11:00
                  </div>
                </div>
                
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  <Link to="/offertforfragan">
                    Begär premium offert
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Client Areas */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Vi levererar till hela Östermalm
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Från Stureplan till Karlaplan - vi känner Östermalms unika behov och 
                levererar efter de högsta standarderna.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {clientAreas.map((area, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm border border-primary/10">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-4">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-2">
                    {area.area}
                  </h3>
                  <p className="text-gray-600">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Service Details */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="bg-gradient-to-br from-white to-primary/5 rounded-lg shadow-lg border border-primary/20 p-8">
              <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">
                Premium Service för Östermalm
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <MapPin className="w-5 h-5 text-primary mr-2" />
                    Exklusiva Leveransområden
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Stureplan & Sturegatan</li>
                    <li>• Karlaplan & Karlavägen</li>
                    <li>• Östermalms torg</li>
                    <li>• Humlegården området</li>
                    <li>• Biblioteksgatan</li>
                    <li>• Ambassadområdet</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 text-primary mr-2" />
                    Premium Service
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Diskret morgonleverans (07:00-11:00)</li>
                    <li>• Personlig leveranstjänst</li>
                    <li>• Anpassade presentkorgar</li>
                    <li>• Kvalitetsgaranti 100%</li>
                    <li>• Flexibel fakturering</li>
                    <li>• Dedikerad kundansvarig</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/30">
                <div className="flex items-start">
                  <Crown className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-charcoal mb-2">VIP-behandling</h4>
                    <p className="text-sm text-gray-600">
                      Alla våra kunder på Östermalm får VIP-behandling med personlig service, 
                      flexibla leveranstider och möjlighet till specialbeställningar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upplev premium fruktleverans
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Ge era medarbetare på Östermalm den kvalitet de förtjänar med våra exklusiva fruktkorgar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-50">
                <Link to="/offertforfragan">
                  Begär premium offert
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/kontakt">
                  Diskutera era behov
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

export default OstermalmKontorsfrukt;