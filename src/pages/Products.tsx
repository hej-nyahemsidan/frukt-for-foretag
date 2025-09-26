import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Phone, Mail, Plus, Info, LogIn, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import fruktkorgrSupremeImg from '@/assets/fruktkorg-standard-new.jpg';
import fruktkorgrPremiumImg from '@/assets/fruktkorg-premium-new.jpg';
import fruktkorgrOriginalImg from '@/assets/fruktkorg-eko-new.jpg';
import fruktkorgrBananImg from '@/assets/fruktkorg-banan-new.jpg';
import fruktladaImg from '@/assets/fruktlada-new.jpg';
import fruktpaserImage from '@/assets/fruktpase-new.jpg';
import premiumCoffeeImg from '@/assets/premium-coffee.jpg';
import colaOriginalImg from '@/assets/coca-cola-original.png';
import colaZeroImg from '@/assets/coca-cola-zero-new.png';
import fantaOrangeImg from '@/assets/fanta-orange-new.png';
import fantaExoticImg from '@/assets/fanta-exotic.png';
import prilLemonImg from '@/assets/pril-lemon-lime.png';
import prilZeroImg from '@/assets/pril-zero-sugar.png';
import bonaquaCitronImg from '@/assets/bonaqua-citron-new.png';
import bonaquaHallonImg from '@/assets/bonaqua-hallon-new.png';
import merParonImg from '@/assets/mer-paron-new.png';
import mellanmjolkEkoLaktosfriImg from '@/assets/mellanmjolk-eko-laktosfri.png';
import latteArtMjolkEkoImg from '@/assets/latte-art-mjolk-eko.png';
import mellanmjolkLaktosfriImg from '@/assets/mellanmjolk-laktosfri.png';
import mellanmjolkPortImg from '@/assets/mellanmjolk-port.png';
import kaffemjolkLaktosfriImg from '@/assets/kaffemjolk-laktosfri.png';
import gevaliaImg from '@/assets/gevalia-mellanrost-new.png';
import arvidNordquistImg from '@/assets/arvid-nordquist-mellanrost-new.png';
import nescafeImg from '@/assets/nescafe-lyx-new.png';
import dairyProductsImg from '@/assets/dairy-products-collection.jpg';
import softDrinksImg from '@/assets/soft-drinks-collection.jpg';
import coffeeTeaImg from '@/assets/coffee-tea-collection.jpg';
import seasonalFruitsImg from '@/assets/seasonal-fruits.jpg';

const Products = () => {
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({
    'frukt-standard': '4kg',
    'frukt-premium': '4kg',
    'frukt-eko': '4kg',
    'frukt-banan': '4kg'
  });

  const [activeTab, setActiveTab] = useState('fruktkorgar');

  const fruktkorgar = [
    {
      id: 'frukt-standard',
      name: 'Fruktkorg Standard',
      image: fruktkorgrSupremeImg,
      description: 'Vår klassiska fruktkorg med säsongens bästa frukter',
      prices: {
        '4kg': 230,
        '6kg': 345,
        '9kg': 518,
        '11kg': 633
      }
    },
    {
      id: 'frukt-premium',
      name: 'Fruktkorg Premium',
      image: fruktkorgrPremiumImg,
      description: 'Exklusivt urval med premiumfrukter och exotiska inslag',
      prices: {
        '4kg': 263,
        '6kg': 395,
        '9kg': 592,
        '11kg': 724
      },
      popular: true
    },
    {
      id: 'frukt-eko',
      name: 'Fruktkorg Säsong',
      image: fruktkorgrOriginalImg,
      description: 'Säsongsanpassade frukter av högsta kvalitet',
      prices: {
        '4kg': 289,
        '6kg': 434,
        '9kg': 651,
        '11kg': 796
      }
    },
    {
      id: 'frukt-banan',
      name: 'Fruktkorg Banan+',
      image: fruktkorgrBananImg,
      description: 'Extra mycket bananer plus säsongens övriga frukter',
      prices: {
        '4kg': 249,
        '6kg': 374,
        '9kg': 560,
        '11kg': 686
      }
    },
    {
      id: 'fruktlada',
      name: 'Fruktlåda',
      image: fruktladaImg,
      description: 'Anpassad lösning för större kontor',
      isCustom: true
    }
  ];

  const otherProducts = {
    fruktpasar: [
      {
        id: 'fruktpase-extra',
        name: 'Fruktpåse Extra',
        image: fruktpaserImage,
        description: 'Varierad mix av säsongens frukter'
      },
      {
        id: 'bananpase-extra',
        name: 'Bananpåse Extra',
        image: fruktpaserImage,
        description: 'Fokus på bananer med kompletterande frukter'
      }
    ],
    mjolk: [
      {
        id: 'mellanmjolk-eko-laktosfri',
        name: 'Mellanmjölk Eko Laktosfri 1,5%',
        image: mellanmjolkEkoLaktosfriImg
      },
      {
        id: 'latte-art-mjolk-eko',
        name: 'Latte Art Mjölk Eko 2,6%',
        image: latteArtMjolkEkoImg
      },
      {
        id: 'mellanmjolk-laktosfri',
        name: 'Mellanmjölk Laktosfri 1,5%',
        image: mellanmjolkLaktosfriImg
      },
      {
        id: 'mellanmjolk-port',
        name: 'Mellanmjölk Port 1,5%',
        image: mellanmjolkPortImg
      },
      {
        id: 'kaffemjolk-laktosfri',
        name: 'Kaffemjölk Laktosfri 1,5%',
        image: kaffemjolkLaktosfriImg
      }
    ],
    lask: [
      {
        id: 'coca-cola',
        name: 'Coca Cola Original',
        image: colaOriginalImg
      },
      {
        id: 'coca-cola-zero',
        name: 'Coca Cola Zero Sugar',
        image: colaZeroImg
      },
      {
        id: 'pril-lemon',
        name: 'Pril Lemon-Lime',
        image: prilLemonImg
      },
      {
        id: 'pril-zero',
        name: 'Pril Zero Sugar',
        image: prilZeroImg
      },
      {
        id: 'fanta-orange',
        name: 'Fanta Orange',
        image: fantaOrangeImg
      },
      {
        id: 'fanta-exotic',
        name: 'Fanta Exotic',
        image: fantaExoticImg
      },
      {
        id: 'bonaqua-citron',
        name: 'Bonaqua Citron/Lime',
        image: bonaquaCitronImg
      },
      {
        id: 'bonaqua-hallon',
        name: 'Bonaqua Hallon/Lime',
        image: bonaquaHallonImg
      },
      {
        id: 'mer-paron',
        name: 'MER Päron',
        image: merParonImg
      }
    ],
    kaffe: [
      {
        id: 'gevalia',
        name: 'Gevalia Mellanrost',
        image: gevaliaImg
      },
      {
        id: 'arvid-nordkvist',
        name: 'Arvid Nordquist Mellan',
        image: arvidNordquistImg
      },
      {
        id: 'nescafe-lyx',
        name: 'Nescafe Lyx',
        image: nescafeImg
      }
    ]
  };

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const getPrice = (product: any) => {
    if (product.isCustom) return null;
    return product.prices[selectedSizes[product.id]];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Unified Product Section */}
        <section id="alla-produkter" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Några av Våra Produkter</h2>
              <p className="text-lg text-muted-foreground mb-2">
                Blädda genom vårt sortiment organiserat i kategorier
              </p>
              <p className="text-sm text-muted-foreground">
                Fler Produkter hittar du på Mina Sidor när du blir kund
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 max-w-4xl mx-auto mb-8 bg-white shadow-md">
                <TabsTrigger 
                  value="fruktkorgar" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-primary/10 transition-colors"
                >
                  Fruktkorgar
                </TabsTrigger>
                <TabsTrigger 
                  value="fruktpasar"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-primary/10 transition-colors"
                >
                  Fruktpåsar
                </TabsTrigger>
                <TabsTrigger 
                  value="mjolk"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-primary/10 transition-colors"
                >
                  Mjölk
                </TabsTrigger>
                <TabsTrigger 
                  value="lask"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-primary/10 transition-colors"
                >
                  Läsk
                </TabsTrigger>
                <TabsTrigger 
                  value="kaffe"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-primary/10 transition-colors"
                >
                  Kaffe
                </TabsTrigger>
              </TabsList>

              {/* Fruktkorgar Tab */}
              <TabsContent value="fruktkorgar" className="animate-fade-in">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Fruktkorgar - Anpassade efter ditt behov</h3>
                  <p className="text-muted-foreground">
                    Välj mellan våra populära fruktkorgar i olika storlekar och varianter. 
                    Alla korgar innehåller noga utvalda färska frukter.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {fruktkorgar.map((product) => (
                    <Card 
                      key={product.id} 
                      className="group hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] relative bg-white flex flex-col h-full"
                    >
                       {product.popular && (
                         <Badge className="absolute top-2 right-2 z-10 bg-primary text-white text-xs">
                           Populär
                         </Badge>
                       )}
                      
                      <CardHeader className="p-0">
                        <div className="aspect-square bg-gradient-subtle overflow-hidden rounded-t-lg">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-4 flex-1 flex flex-col">
                        <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground text-xs mb-3 line-clamp-2 flex-1">
                          {product.description}
                        </p>
                        
                        {!product.isCustom ? (
                          <div className="mt-auto">
                            <Link to="/offertforfragan" className="w-full">
                              <Button size="sm" className="w-full h-8 text-xs" title="Klicka för att begära offert">
                                <FileText className="w-3 h-3 mr-1" />
                                Begär offert
                              </Button>
                            </Link>
                          </div>
                        ) : (
                          <div className="mt-auto">
                            <Link to="/offertforfragan" className="w-full">
                              <Button size="sm" className="w-full h-8 text-xs" title="Klicka för att begära offert">
                                <FileText className="w-3 h-3 mr-1" />
                                Begär offert
                              </Button>
                            </Link>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Fruktpåsar Tab */}
              <TabsContent value="fruktpasar" className="animate-fade-in">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Fruktpåsar - Perfekt för mindre kontor</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {otherProducts.fruktpasar.map((product) => (
                    <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white flex flex-col h-full">
                      <CardHeader className="p-0">
                         <div className="aspect-[3/4] bg-gradient-subtle overflow-hidden rounded-t-lg">
                           <img
                             src={product.image}
                             alt={product.name}
                             className="w-full h-full object-contain"
                           />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 flex-1 flex flex-col">
                        <h3 className="font-semibold text-base mb-2 line-clamp-2">{product.name}</h3>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2 flex-1">{product.description}</p>
                        <Link to="/offertforfragan" className="w-full mt-auto">
                          <Button size="sm" className="w-full h-8 text-xs" title="Klicka för att begära offert">
                            <FileText className="w-3 h-3 mr-1" />
                            Begär offert
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Mjölk Tab */}
              <TabsContent value="mjolk" className="animate-fade-in">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Mjölk & Laktosfria alternativ</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {otherProducts.mjolk.map((product) => (
                    <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white flex flex-col h-full">
                      <CardHeader className="p-0">
                        <div className="aspect-[3/4] bg-gradient-subtle overflow-hidden rounded-t-lg p-2">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 flex-1 flex flex-col">
                        <h3 className="font-semibold text-base mb-3 line-clamp-2 flex-1">{product.name}</h3>
                        <Link to="/offertforfragan" className="w-full mt-auto">
                          <Button size="sm" className="w-full h-8 text-xs" title="Klicka för att begära offert">
                            <FileText className="w-3 h-3 mr-1" />
                            Begär offert
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Läsk Tab */}
              <TabsContent value="lask" className="animate-fade-in">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Läsk & Kolsyrat vatten</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {otherProducts.lask.map((product) => (
                    <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white flex flex-col h-full">
                      <CardHeader className="p-0">
                        <div className="aspect-[3/4] bg-gradient-subtle overflow-hidden rounded-t-lg p-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 flex-1 flex flex-col">
                        <h3 className="font-semibold text-base mb-3 line-clamp-2 flex-1">{product.name}</h3>
                        <Link to="/offertforfragan" className="w-full mt-auto">
                          <Button size="sm" className="w-full h-8 text-xs" title="Klicka för att begära offert">
                            <FileText className="w-3 h-3 mr-1" />
                            Begär offert
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Kaffe Tab */}
              <TabsContent value="kaffe" className="animate-fade-in">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Kaffe - För alla smaker</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {otherProducts.kaffe.map((product) => (
                    <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white flex flex-col h-full">
                      <CardHeader className="p-0">
                        <div className="aspect-[3/4] bg-gradient-subtle overflow-hidden rounded-t-lg p-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 flex-1 flex flex-col">
                        <h3 className="font-semibold text-base mb-3 line-clamp-2 flex-1">{product.name}</h3>
                        <Link to="/offertforfragan" className="w-full mt-auto">
                          <Button size="sm" className="w-full h-8 text-xs" title="Klicka för att begära offert">
                            <FileText className="w-3 h-3 mr-1" />
                            Begär offert
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Redo att beställa?
                </h2>
                <p className="text-gray-700 mb-6">
                  Logga in på ditt företagskonto för att se dina priser och lägga beställningar, 
                  eller kontakta oss för att få en skräddarsydd offert för din arbetsplats.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link to="/kundportal">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      <LogIn className="w-4 h-4 mr-2" />
                      🔐 Logga in för att beställa
                    </Button>
                  </Link>
                  <Link to="/offertforfragan">
                    <Button variant="outline" size="lg">
                      <FileText className="w-4 h-4 mr-2" />
                      📝 Begär offert
                    </Button>
                  </Link>
                </div>
                
                <div className="p-4 bg-white/50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-semibold">Ny kund?</span> 
                    Kontakta oss för att skapa ett företagskonto och få tillgång till vårt fullständiga sortiment med företagspriser.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
                    <a 
                      href="tel:08-123456" 
                      className="flex items-center gap-2 hover:text-green-600 transition-colors"
                    >
                      📞 08-123 456 78
                    </a>
                    <a 
                      href="mailto:info@vitaminkorgen.se" 
                      className="flex items-center gap-2 hover:text-green-600 transition-colors"
                    >
                      ✉️ info@vitaminkorgen.se
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Floating CTA */}
        <div className="fixed bottom-4 right-4 sm:hidden z-50">
          <Link to="/offertforfragan">
            <Button className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90">
              <FileText className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;