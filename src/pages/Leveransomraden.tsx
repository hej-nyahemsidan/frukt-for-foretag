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
      name: 'Vasastan',
      href: '/vasastan-fruktleverans',
      description: 'Vasastan med företag och kontor',
      keywords: 'Vasastan fruktleverans, kontorsfrukt vasastan'
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
      icon: <Truck className="w-12 h-12" />,
      title: 'Leverans varje vecka',
      description: 'Vi levererar färska fruktkorgar varje måndag till fredag'
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: 'Flexibla tider',
      description: 'Leverans mellan 07:00-16:00, anpassat efter era behov'
    },
    {
      icon: <CheckCircle className="w-12 h-12" />,
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
        <section className="relative py-12 md:py-20 bg-gradient-to-br from-lightgreen/20 via-background to-secondary/10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <div className="mb-6 md:mb-8">
                <VitaminKorgenLogo 
                  size="large" 
                  variant="horizontal"
                  animated={true}
                  className="mx-auto h-16 md:h-24 w-auto"
                />
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-4 md:mb-6">
                Vi levererar frukt till hela
                <span className="text-secondary block">Stockholmsområdet</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8">
                Från centrala Stockholm till förorterna - vi ser till att era medarbetare får färska, 
                näringsrika fruktkorgar levererade direkt till kontoret varje vecka.
              </p>
              
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white px-6 md:px-8 py-3 w-full sm:w-auto">
                <Link to="/offertforfragan">
                  Begär offert för ert område
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Delivery Areas Grid */}
        <section className="py-12 md:py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Våra leveransområden
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                Klicka på ert område för att se specifik information om leveranser, 
                tider och våra populäraste produkter för just er stadsdel.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
              {deliveryAreas.map((area) => (
                <Card key={area.name} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary/30 bg-white">
                  <CardHeader className="pb-4">
                    <div className="flex items-center mb-2">
                      <MapPin className="w-4 md:w-5 h-4 md:h-5 text-secondary mr-2 flex-shrink-0" />
                      <CardTitle className="text-base md:text-lg group-hover:text-secondary transition-colors leading-tight">
                        {area.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-600 text-sm md:text-base">
                      {area.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button asChild variant="outline" className="w-full group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all text-sm md:text-base">
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
        <section className="py-20 bg-gradient-to-br from-gray-50 via-lightgreen/5 to-secondary/5 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-secondary/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-lightgreen/5 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-secondary/20 rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-lightgreen/30 rounded-full"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal mb-4 md:mb-6 tracking-tight">
                Så fungerar våra leveranser
              </h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Vi har utvecklat ett effektivt leveranssystem som säkerställer att ni alltid 
                får era fruktkorgar i perfekt skick och vid rätt tid.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
              {deliveryInfo.map((info, index) => (
                <div 
                  key={index} 
                  className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-secondary/20 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                >
                  {/* Card background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-secondary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Icon with enhanced styling */}
                  <div className="relative mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-secondary/10 to-lightgreen/10 text-secondary rounded-2xl mb-4 group-hover:scale-110 transition-all duration-500 group-hover:shadow-lg relative">
                      {/* Icon background glow */}
                      <div className="absolute inset-0 bg-secondary/5 rounded-2xl blur-md group-hover:bg-secondary/10 transition-colors duration-500"></div>
                      <div className="relative">
                        {info.icon}
                      </div>
                    </div>
                    
                    {/* Floating accent */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-secondary to-lightgreen rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                  </div>
                  
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-charcoal mb-4 group-hover:text-secondary transition-colors duration-300">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300">
                      {info.description}
                    </p>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-secondary to-lightgreen group-hover:w-full transition-all duration-500 rounded-t-full"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-secondary text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Redo att börja?
            </h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-secondary-foreground/90">
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