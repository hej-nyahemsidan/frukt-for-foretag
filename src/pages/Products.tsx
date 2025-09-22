import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Filter, ShoppingCart, Star, Phone, Mail } from 'lucide-react';
import fruktkorgrSupremeImg from '@/assets/fruktkorg-supreme-new.jpg';
import fruktkorgrPremiumImg from '@/assets/fruktkorg-premium-new.jpg';
import fruktkorgrOriginalImg from '@/assets/fruktkorg-original-new.jpg';
import fruktkorgrBananImg from '@/assets/fruktkorg-banan-new.jpg';
import fruktladaImg from '@/assets/fruktlada.jpg';
import seasonalFruitsImg from '@/assets/seasonal-fruits.jpg';
import freshFruitImg from '@/assets/fresh-fruit-arrangements.jpg';
import premiumCoffeeImg from '@/assets/premium-coffee.jpg';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('alla');
  const [sortBy, setSortBy] = useState('popularitet');

  const products = [
    // Fruktkorgar
    {
      id: 'frukt-standard',
      name: 'Fruktkorg Standard',
      category: 'fruktkorgar',
      image: fruktkorgrSupremeImg,
      description: 'Perfekt basutbud med säsongens bästa frukter.',
      price: 230,
      originalPrice: 271,
      weight: '4kg',
      popular: false,
      eco: false
    },
    {
      id: 'frukt-premium',
      name: 'Fruktkorg Premium',
      category: 'fruktkorgar',
      image: fruktkorgrPremiumImg,
      description: 'Exklusivt urval med premium frukter och exotiska inslag.',
      price: 263,
      originalPrice: 310,
      weight: '4kg',
      popular: true,
      eco: false
    },
    {
      id: 'frukt-eko',
      name: 'Fruktkorg Eko',
      category: 'fruktkorgar',
      image: fruktkorgrOriginalImg,
      description: 'Ekologiskt certifierade frukter för den miljömedvetna arbetsplatsen.',
      price: 289,
      originalPrice: 340,
      weight: '4kg',
      popular: false,
      eco: true
    },
    {
      id: 'frukt-banan',
      name: 'Fruktkorg Banan+',
      category: 'fruktkorgar',
      image: fruktkorgrBananImg,
      description: 'Extra hög andel bananer - perfekt för den aktiva arbetsplatsen.',
      price: 249,
      originalPrice: 295,
      weight: '4kg',
      popular: true,
      eco: false
    },
    {
      id: 'fruktlada-stor',
      name: 'Fruktlåda Stor',
      category: 'fruktkorgar',
      image: fruktladaImg,
      description: 'Stor fruktlåda för större kontor och event.',
      price: 450,
      originalPrice: null,
      weight: '8kg',
      popular: false,
      eco: false
    },
    {
      id: 'fruktlada-xl',
      name: 'Fruktlåda XL',
      category: 'fruktkorgar',
      image: fruktladaImg,
      description: 'Vår största fruktlåda för stora kontor och arrangemang.',
      price: 650,
      originalPrice: null,
      weight: '12kg',
      popular: false,
      eco: false
    },
    // Specialkorgar
    {
      id: 'sasong-favoriter',
      name: 'Säsongens Favoriter',
      category: 'specialkorgar',
      image: seasonalFruitsImg,
      description: 'Handplockat urval av säsongens absolut bästa frukter.',
      price: 299,
      originalPrice: null,
      weight: '4kg',
      popular: false,
      eco: false
    },
    {
      id: 'exotisk-mix',
      name: 'Exotisk Mix',
      category: 'specialkorgar',
      image: freshFruitImg,
      description: 'Spännande tropiska frukter som ger variation på kontoret.',
      price: 349,
      originalPrice: null,
      weight: '4kg',
      popular: false,
      eco: false
    },
    {
      id: 'citrus-korg',
      name: 'Citruskorgen',
      category: 'specialkorgar',
      image: freshFruitImg,
      description: 'Vitaminrika citrusfrukter för extra energi.',
      price: 229,
      originalPrice: null,
      weight: '4kg',
      popular: false,
      eco: false
    },
    // Tillval
    {
      id: 'notmix',
      name: 'Nötmix',
      category: 'snacks',
      image: premiumCoffeeImg,
      description: 'Näringsrikt och mättande nötmix som komplement.',
      price: 89,
      originalPrice: null,
      weight: '500g',
      popular: false,
      eco: false
    },
    {
      id: 'torkad-frukt',
      name: 'Torkad frukt',
      category: 'snacks',
      image: premiumCoffeeImg,
      description: 'Naturligt söta torkade frukter utan tillsatser.',
      price: 79,
      originalPrice: null,
      weight: '400g',
      popular: false,
      eco: false
    },
    {
      id: 'smoothie-paket',
      name: 'Smoothiepaket',
      category: 'drycker',
      image: premiumCoffeeImg,
      description: 'Färdiga smoothies för den snabba mellanmålet.',
      price: 149,
      originalPrice: null,
      weight: '10-pack',
      popular: false,
      eco: false
    }
  ];

  const categories = [
    { value: 'alla', label: 'Alla produkter' },
    { value: 'fruktkorgar', label: 'Fruktkorgar' },
    { value: 'specialkorgar', label: 'Specialkorgar' },
    { value: 'snacks', label: 'Snacks' },
    { value: 'drycker', label: 'Drycker' },
    { value: 'eko', label: 'Ekologiskt' }
  ];

  const sortOptions = [
    { value: 'popularitet', label: 'Popularitet' },
    { value: 'pris-lag-hog', label: 'Pris: Låg till Hög' },
    { value: 'pris-hog-lag', label: 'Pris: Hög till Låg' },
    { value: 'namn', label: 'Namn A-Ö' }
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'alla' || 
                             product.category === selectedCategory ||
                             (selectedCategory === 'eko' && product.eco);
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'pris-lag-hog':
          return a.price - b.price;
        case 'pris-hog-lag':
          return b.price - a.price;
        case 'namn':
          return a.name.localeCompare(b.name);
        case 'popularitet':
        default:
          return b.popular ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Vårt Produktutbud</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Färska frukter och hälsosamma mellanmål levererade direkt till din arbetsplats
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-muted/50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Sök produkter..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Visar {filteredAndSortedProducts.length} av {products.length} produkter
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader className="p-0 relative">
                  {product.popular && (
                    <Badge className="absolute top-3 right-3 z-10 bg-primary text-white">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Populär
                    </Badge>
                  )}
                  {product.eco && (
                    <Badge className="absolute top-3 left-3 z-10 bg-green-600 text-white">
                      Eko
                    </Badge>
                  )}
                  <div className="aspect-square bg-gradient-subtle p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-sm mb-3">
                    {product.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary">
                        från {product.price} kr
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          {product.originalPrice} kr
                        </span>
                      )}
                    </div>
                    <Badge variant="outline">{product.weight}</Badge>
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0 space-y-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full" size="sm">
                        Snabbvy
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{product.name}</DialogTitle>
                        <DialogDescription>
                          Detaljerad information om {product.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="aspect-square bg-gradient-subtle p-4 rounded-lg">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="space-y-4">
                          <p className="text-muted-foreground">{product.description}</p>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Vikt:</span>
                              <span className="font-semibold">{product.weight}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Pris:</span>
                              <span className="font-bold text-primary text-lg">
                                från {product.price} kr
                              </span>
                            </div>
                          </div>
                          <Button className="w-full" size="lg">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Lägg till förfrågan
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    size="sm"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Läs mer
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Inga produkter hittades som matchar dina sökkriterier.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('alla');
                }}
                className="mt-4"
              >
                Rensa filter
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Hittar du inte vad du söker?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Vi kan skräddarsy fruktkorgar efter dina önskemål och företagets behov. 
            Kontakta oss så hjälper vi dig hitta den perfekta lösningen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Phone className="w-4 h-4 mr-2" />
              Ring oss: 08-123 456 78
            </Button>
            <Button variant="outline" size="lg">
              <Mail className="w-4 h-4 mr-2" />
              Skicka förfrågan
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;