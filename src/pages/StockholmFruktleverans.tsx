import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VitaminKorgenLogo from '@/components/VitaminKorgenLogo';
import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Star, Users, Building2, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const StockholmFruktleverans = () => {
  const popularProducts = [
    {
      name: 'Fruktkorg Premium',
      description: 'Perfekt för större kontor med 15+ medarbetare',
      price: 'Från 450 kr/vecka'
    },
    {
      name: 'Fruktkorg Standard',
      description: 'Idealisk för mindre team med 5-15 personer',
      price: 'Från 275 kr/vecka'
    },
    {
      name: 'Säsongsfrukt Extra',
      description: 'Exklusiva säsongsfrukter för speciella tillfällen',
      price: 'Från 320 kr/vecka'
    }
  ];

  const clientTypes = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Banker & Finans',
      description: 'Swedbank, SEB, Nordea och många andra finansföretag'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Konsultbolag',
      description: 'McKinsey, BCG, Deloitte och lokala konsultfirmor'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Tech-företag',
      description: 'Startup-hubbar och etablerade teknologiföretag'
    }
  ];

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

        {/* Popular Products */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Populärast i Stockholm Centrum
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Dessa fruktkorgar är mest uppskattade av företag i centrala Stockholm
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {popularProducts.map((product, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-secondary/30">
                  <CardHeader>
                    <CardTitle className="text-xl text-charcoal">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-secondary mb-4">{product.price}</div>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/produkter">
                        Se detaljer
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Client Types */}
        <section className="py-16 bg-gradient-to-br from-lightgreen/10 to-primary/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Vi levererar till Stockholms största företag
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Från finansgiganter till innovativa startups - vi hjälper alla typer av 
                företag i Stockholm att hålla sina medarbetare friska och nöjda.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {clientTypes.map((type, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 text-secondary rounded-full mb-4">
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-2">
                    {type.title}
                  </h3>
                  <p className="text-gray-600">
                    {type.description}
                  </p>
                </div>
              ))}
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
                    Leveranstider
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Måndag: 07:00-12:00</li>
                    <li>• Tisdag: 08:00-15:00</li>
                    <li>• Expressleverans: Samma dag</li>
                    <li>• SMS-notifiering 30 min innan</li>
                    <li>• Kontaktlös leverans tillgänglig</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
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