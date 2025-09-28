import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VitaminKorgenLogo from '@/components/VitaminKorgenLogo';
import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Truck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Leveransomraden = () => {
  const deliveryAreas = [
    {
      name: 'Stockholm Centrum',
      href: '/stockholm-fruktleverans',
      description: 'Centrala Stockholm med alla viktiga affärsdistrikt',
      keywords: 'Stockholm fruktleverans, kontorsfrukt stockholm'
    },
    {
      name: 'Östermalm',
      href: '/ostermalm-kontorsfrukt',
      description: 'Exklusiva Östermalm med många företag och kontor',
      keywords: 'Östermalm kontorsfrukt, fruktkorgar östermalm'
    },
    {
      name: 'Södermalm',
      href: '/sodermalm-fruktkorgar',
      description: 'Kreativa Södermalm med moderna kontor och startups',
      keywords: 'Södermalm fruktkorgar, kontorsfrukt södermalm'
    },
    {
      name: 'Norrmalm',
      href: '/norrmalm-frukt',
      description: 'Affärsdistriktet Norrmalm med många företag',
      keywords: 'Norrmalm frukt, kontorsfrukt city stockholm'
    },
    {
      name: 'Kungsholmen',
      href: '/kungsholmen-kontorsfrukt',
      description: 'Kungsholmen med många kontor och myndigheter',
      keywords: 'Kungsholmen kontorsfrukt, fruktleverans kungsholmen'
    },
    {
      name: 'Älvsjö',
      href: '/alvsjo-fruktleverans',
      description: 'Älvsjö - vårt huvudkontor och närområde',
      keywords: 'Älvsjö fruktleverans, kontorsfrukt älvsjö'
    },
    {
      name: 'Solna & Sundbyberg',
      href: '/solna-sundbyberg-frukt',
      description: 'Solna och Sundbyberg med många företagsparker',
      keywords: 'Solna frukt, Sundbyberg kontorsfrukt'
    },
    {
      name: 'Kista',
      href: '/kista-fruktkorgar',
      description: 'Tech-hubben Kista med IT-företag och kontor',
      keywords: 'Kista fruktkorgar, tech företag frukt'
    }
  ];

  const deliveryInfo = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Leverans varje vecka',
      description: 'Vi levererar färska fruktkorgar varje måndag till fredag'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Flexibla tider',
      description: 'Leverans mellan 07:00-16:00, anpassat efter era behov'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Kvalitetsgaranti',
      description: 'Alla frukter är handplockade och kvalitetskontrollerade'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Leveransområden Stockholm - Vitaminkorgen Fruktleverans"
        description="Vi levererar färska fruktkorgar till hela Stockholmsområdet. Se våra leveransområden: Östermalm, Södermalm, Norrmalm, Kungsholmen, Kista, Solna och mer."
        keywords="leveransområden stockholm, fruktleverans stockholm, kontorsfrukt leverans, fruktkorgar stockholm områden"
      />
      <StructuredData type="contact" />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-lightgreen/20 via-background to-secondary/10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="mb-8">
                <VitaminKorgenLogo 
                  size="large" 
                  variant="horizontal"
                  animated={true}
                  className="mx-auto h-24 w-auto"
                />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6">
                Vi levererar frukt till hela
                <span className="text-secondary block">Stockholmsområdet</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Från centrala Stockholm till förorterna - vi ser till att era medarbetare får färska, 
                näringsrika fruktkorgar levererade direkt till kontoret varje vecka.
              </p>
              
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3">
                <Link to="/offertforfragan">
                  Begär offert för ert område
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Delivery Areas Grid */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Våra leveransområden
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Klicka på ert område för att se specifik information om leveranser, 
                tider och våra populäraste produkter för just er stadsdel.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
              {deliveryAreas.map((area) => (
                <Card key={area.name} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary/30 bg-white">
                  <CardHeader className="pb-4">
                    <div className="flex items-center mb-2">
                      <MapPin className="w-5 h-5 text-secondary mr-2" />
                      <CardTitle className="text-lg group-hover:text-secondary transition-colors">
                        {area.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-600">
                      {area.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button asChild variant="outline" className="w-full group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all">
                      <Link to={area.href}>
                        Se leveransinfo
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Information */}
        <section className="py-16 bg-gradient-to-br from-lightgreen/10 to-secondary/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Så fungerar våra leveranser
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Vi har utvecklat ett effektivt leveranssystem som säkerställer att ni alltid 
                får era fruktkorgar i perfekt skick och vid rätt tid.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {deliveryInfo.map((info, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 text-secondary rounded-full mb-4">
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-2">
                    {info.title}
                  </h3>
                  <p className="text-gray-600">
                    {info.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-secondary text-white">
          <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Redo att börja?
            </h2>
            <p className="text-xl mb-8 text-secondary-foreground/90">
              Kontakta oss idag för en kostnadsfri offert anpassad för ert område och era behov.
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

export default Leveransomraden;