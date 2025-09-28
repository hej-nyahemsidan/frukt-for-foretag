import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VitaminKorgenLogo from '@/components/VitaminKorgenLogo';
import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Zap, Code, Smartphone, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const KistaFruktkorgar = () => {
  const techProducts = [
    {
      name: 'Tech Hub Fruktkorg',
      description: 'Energigivande frukter för utvecklare och tech-arbetare',
      features: ['Brainfood-fokus', 'Energirika frukter', 'Tech-anpassad storlek'],
      price: 'Från 445 kr/vecka'
    },
    {
      name: 'Innovation Boost',
      description: 'Premium fruktkorg för kreativa tech-team',
      features: ['Superfood-tillägg', 'Exotiska smaker', 'Startup-rabatter'],
      price: 'Från 595 kr/vecka'
    }
  ];

  const techAreas = [
    {
      icon: <Code className="w-6 h-6" />,
      area: 'Kista Science Tower',
      description: 'IT-företag och utvecklingsteam'
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      area: 'Electrum & KTH',
      description: 'Forskningsföretag och universitet'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      area: 'Kista Galleria området',
      description: 'Startup-hubbar och tech-inkubatorer'
    }
  ];

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
              
              <div className="lg:text-right">
                <img 
                  src="/assets/modern-almanac-26th.jpg" 
                  alt="Tech företag fruktkorgar Kista"
                  className="rounded-lg shadow-xl w-full max-w-md ml-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tech Products */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Brainfood för Tech-Teams
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Våra fruktkorgar är specialdesignade för att ge tech-arbetare den energi 
                och de näringsämnen som krävs för kreativitet och fokus.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              {techProducts.map((product, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-secondary/30 bg-gradient-to-br from-white to-secondary/5">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Code className="w-5 h-5 text-secondary mr-2" />
                      <span className="text-xs font-semibold text-secondary uppercase tracking-wide">Tech-Optimized</span>
                    </div>
                    <CardTitle className="text-xl text-charcoal">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="text-2xl font-bold text-secondary mb-4">{product.price}</div>
                    <Button asChild className="w-full bg-secondary hover:bg-secondary/90">
                      <Link to="/offertforfragan">
                        Boosta kreativiteten
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Areas */}
        <section className="py-16 bg-gradient-to-br from-secondary/5 to-primary/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Vi levererar till hela Kista Science City
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Från Science Tower till Electrum - vi täcker alla tech-områden i 
                Stockholms innovationscentrum.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {techAreas.map((area, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm border border-secondary/10">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 text-secondary rounded-full mb-4">
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

        {/* Tech Service Details */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="bg-gradient-to-br from-white to-secondary/5 rounded-lg shadow-lg border border-secondary/20 p-8">
              <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">
                Tech-Anpassad Service för Kista
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <MapPin className="w-5 h-5 text-secondary mr-2" />
                    Tech-Områden vi täcker
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
                    Tech-Fokuserad Service
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Brainfood-optimerade val</li>
                    <li>• Flexibla leveranstider (08:00-16:00)</li>
                    <li>• Startup-vänliga avtal</li>
                    <li>• Digital orderhantering</li>
                    <li>• Scrum-anpassade leveranser</li>
                    <li>• Innovation-rabatter</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-secondary/10 rounded-lg border border-secondary/30">
                <div className="flex items-start">
                  <Code className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-charcoal mb-2">Tech-Community Partnership</h4>
                    <p className="text-sm text-gray-600">
                      Vi förstår tech-kulturens behov av snabb energi, flexibilitet och innovation. 
                      Våra leveranser är anpassade efter agila arbetsmetoder och startup-tempo.
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