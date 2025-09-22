import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Phone, Mail, Plus, Info } from 'lucide-react';
import fruktkorgrSupremeImg from '@/assets/fruktkorg-supreme-new.jpg';
import fruktkorgrPremiumImg from '@/assets/fruktkorg-premium-new.jpg';
import fruktkorgrOriginalImg from '@/assets/fruktkorg-original-new.jpg';
import fruktkorgrBananImg from '@/assets/fruktkorg-banan-new.jpg';
import fruktladaImg from '@/assets/fruktlada.jpg';
import freshFruitImg from '@/assets/fresh-fruit-arrangements.jpg';
import premiumCoffeeImg from '@/assets/premium-coffee.jpg';
import cocaColaImg from '@/assets/coca-cola.jpg';
import cocaColaZeroImg from '@/assets/coca-cola-zero.jpg';
import spriteImg from '@/assets/sprite.jpg';
import fantaOrangeImg from '@/assets/fanta-orange.jpg';
import bonaquaImg from '@/assets/bonaqua.jpg';
import oatlyImg from '@/assets/oatly.jpg';
import ecoMilkImg from '@/assets/eco-milk.jpg';
import gevaliaImg from '@/assets/gevalia-coffee.jpg';
import nescafeImg from '@/assets/nescafe.jpg';
import dairyProductsImg from '@/assets/dairy-products-collection.jpg';
import softDrinksImg from '@/assets/soft-drinks-collection.jpg';
import coffeeTeaImg from '@/assets/coffee-tea-collection.jpg';

const Products = () => {
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({
    'frukt-standard': '4kg',
    'frukt-premium': '4kg',
    'frukt-eko': '4kg',
    'frukt-banan': '4kg'
  });

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
      name: 'Fruktkorg Eko',
      image: fruktkorgrOriginalImg,
      description: '100% ekologiska och KRAV-märkta frukter',
      prices: {
        '4kg': 289,
        '6kg': 434,
        '9kg': 651,
        '11kg': 796
      },
      eco: true
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
        image: freshFruitImg,
        description: 'Varierad mix av säsongens frukter'
      },
      {
        id: 'bananpase-extra',
        name: 'Bananpåse Extra',
        image: freshFruitImg,
        description: 'Fokus på bananer med kompletterande frukter'
      }
    ],
    mjolk: [
      {
        id: 'eko-standard',
        name: 'Eko Standardmjölk',
        image: ecoMilkImg
      },
      {
        id: 'eko-latt',
        name: 'Eko Lättmjölk',
        image: ecoMilkImg
      },
      {
        id: 'eko-laktosfri',
        name: 'Eko Laktosfri Mellanmjölk',
        image: ecoMilkImg
      },
      {
        id: 'eko-mellan',
        name: 'Eko Mellanmjölk',
        image: ecoMilkImg
      },
      {
        id: 'oatly-kaffe',
        name: 'Oatly iKaffe',
        image: oatlyImg
      },
      {
        id: 'oatly-original',
        name: 'Oatly (Original)',
        image: oatlyImg
      },
      {
        id: 'latte-art',
        name: 'Latte Art (Barista mjölk)',
        image: dairyProductsImg
      },
      {
        id: 'alpro',
        name: 'Alpro (Sojadryck)',
        image: dairyProductsImg
      }
    ],
    lask: [
      {
        id: 'coca-cola',
        name: 'Coca Cola',
        image: cocaColaImg
      },
      {
        id: 'coca-cola-zero',
        name: 'Coca Cola Zero',
        image: cocaColaZeroImg
      },
      {
        id: 'sprite',
        name: 'Sprite',
        image: spriteImg
      },
      {
        id: 'sprite-zero',
        name: 'Sprite Zero',
        image: spriteImg
      },
      {
        id: 'fanta-orange',
        name: 'Fanta Orange',
        image: fantaOrangeImg
      },
      {
        id: 'fanta-exotic',
        name: 'Fanta Exotic',
        image: fantaOrangeImg
      },
      {
        id: 'bonaqua-citron',
        name: 'Bonaqua Citron',
        image: bonaquaImg
      },
      {
        id: 'bonaqua-hallon',
        name: 'Bonaqua Hallon/Lime',
        image: bonaquaImg
      },
      {
        id: 'mer-paron',
        name: 'Mer Päron',
        image: softDrinksImg
      }
    ],
    kaffe: [
      {
        id: 'gevalia',
        name: 'Gevalia (Mellanrost)',
        image: gevaliaImg
      },
      {
        id: 'arvid-nordkvist',
        name: 'Arvid Nordkvist (Premium)',
        image: premiumCoffeeImg
      },
      {
        id: 'nescafe-lyx',
        name: 'Nescafe Lyx (Instant)',
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
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Vårt Sortiment</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Färska frukter och kvalitetsprodukter för din arbetsplats
            </p>
          </div>
        </section>

        {/* Important Note */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <Alert className="border-primary/20 bg-primary/5">
              <Info className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm">
                📍 Detta är vår produktkatalog för visning. För att beställa, vänligen kontakta oss för offert eller logga in på ert företagskonto.
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" className="h-8">
                    Kontakta oss
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    Logga in
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Fruktkorgar Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Fruktkorgar - Anpassade efter ditt behov</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Välj mellan våra populära fruktkorgar i olika storlekar och varianter. 
                Alla korgar innehåller noga utvalda färska frukter.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fruktkorgar.map((product) => (
                <Card 
                  key={product.id} 
                  className="group hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] relative"
                >
                  {product.popular && (
                    <Badge className="absolute top-4 right-4 z-10 bg-primary text-white">
                      Populär
                    </Badge>
                  )}
                  {product.eco && (
                    <Badge className="absolute top-4 left-4 z-10 bg-green-600 text-white">
                      Eko
                    </Badge>
                  )}
                  
                  <CardHeader className="p-0">
                    <div className="aspect-square bg-gradient-subtle p-6 rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="mb-4">
                      {product.description}
                    </CardDescription>
                    
                    {!product.isCustom ? (
                      <>
                        {/* Size Selector */}
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Välj storlek:</p>
                          <div className="flex gap-2 flex-wrap">
                            {Object.keys(product.prices).map((size) => (
                              <Button
                                key={size}
                                variant={selectedSizes[product.id] === size ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleSizeChange(product.id, size)}
                                className="h-8 px-3"
                              >
                                {size}
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="mb-4">
                          <span className="text-2xl font-bold text-primary">
                            {getPrice(product)} kr
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="mb-4">
                        <p className="text-lg font-semibold text-muted-foreground">
                          Begär offert
                        </p>
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="p-6 pt-0">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Lägg till förfrågan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Other Products Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Övriga produkter</h2>
              <p className="text-lg text-muted-foreground">
                Komplettera med våra övriga produkter för en komplett lösning
              </p>
            </div>

            <Tabs defaultValue="fruktpasar" className="w-full">
              <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8">
                <TabsTrigger value="fruktpasar">Fruktpåsar</TabsTrigger>
                <TabsTrigger value="mjolk">Mjölk</TabsTrigger>
                <TabsTrigger value="lask">Läsk</TabsTrigger>
                <TabsTrigger value="kaffe">Kaffe</TabsTrigger>
              </TabsList>

              {/* Fruktpåsar Tab */}
              <TabsContent value="fruktpasar">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Fruktpåsar - Perfekt för mindre kontor</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {otherProducts.fruktpasar.map((product) => (
                    <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                      <CardHeader className="p-3">
                        <div className="aspect-square bg-gradient-subtle p-2 rounded">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-3">
                        <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
                        <p className="text-xs text-muted-foreground mb-3">{product.description}</p>
                        <Button size="sm" className="w-full h-8 text-xs">
                          <Plus className="w-3 h-3 mr-1" />
                          Lägg till
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Mjölk Tab */}
              <TabsContent value="mjolk">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Mjölk & Laktosfria alternativ</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {otherProducts.mjolk.map((product) => (
                    <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                      <CardHeader className="p-3">
                        <div className="aspect-square bg-gradient-subtle p-2 rounded">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-3">
                        <h4 className="font-semibold text-sm mb-3">{product.name}</h4>
                        <Button size="sm" className="w-full h-8 text-xs">
                          <Plus className="w-3 h-3 mr-1" />
                          Lägg till
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Läsk Tab */}
              <TabsContent value="lask">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Läsk & Kolsyrat vatten</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {otherProducts.lask.map((product) => (
                    <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                      <CardHeader className="p-3">
                        <div className="aspect-square bg-gradient-subtle p-2 rounded">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-3">
                        <h4 className="font-semibold text-sm mb-3">{product.name}</h4>
                        <Button size="sm" className="w-full h-8 text-xs">
                          <Plus className="w-3 h-3 mr-1" />
                          Lägg till
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Kaffe Tab */}
              <TabsContent value="kaffe">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Kaffe - För alla smaker</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {otherProducts.kaffe.map((product) => (
                    <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                      <CardHeader className="p-3">
                        <div className="aspect-square bg-gradient-subtle p-2 rounded">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-3">
                        <h4 className="font-semibold text-sm mb-3">{product.name}</h4>
                        <Button size="sm" className="w-full h-8 text-xs">
                          <Plus className="w-3 h-3 mr-1" />
                          Lägg till
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ser du inte produkten du söker?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Vi kan skräddarsy lösningar efter era behov. Kontakta oss så hjälper vi er hitta den perfekta lösningen för er arbetsplats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Phone className="w-4 h-4 mr-2" />
                Ring oss: 08-123 456 78
              </Button>
              <Button variant="outline" size="lg">
                <Mail className="w-4 h-4 mr-2" />
                Kontakta oss för specialbeställning
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
