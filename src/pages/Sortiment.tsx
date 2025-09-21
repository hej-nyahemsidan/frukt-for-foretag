import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Sortiment = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Alla Kategorier', count: 18 },
    { id: 'fruktkorgar', name: 'Fruktkorgar', count: 3 },
    { id: 'fruktsafter', name: 'Fruktsafter', count: 3 },
    { id: 'fruktbitar', name: 'Fruktbitar', count: 2 },
    { id: 'tillbehor', name: 'Tillbehör', count: 3 },
    { id: 'mejeri', name: 'Mejeri & Nötkött', count: 2 },
    { id: 'kaffe', name: 'Kaffe & Te', count: 2 },
    { id: 'dryck', name: 'Dryck', count: 2 },
    { id: 'snacks', name: 'Snacks & Nötter', count: 1 },
    { id: 'alkohol', name: 'Öl, Vin & Fruktsaft', count: 0 }
  ];

  const products = [
    // Fruktkorgar
    {
      id: 1,
      name: 'Eko Mellanmjölk',
      price: 29,
      originalPrice: null,
      image: '/src/assets/fruktkorg-eko.jpg',
      category: 'fruktkorgar'
    },
    {
      id: 2,
      name: 'Laktosfri mellanmjölk',
      price: 30,
      originalPrice: 35,
      image: '/src/assets/fruktkorg-standard.jpg',
      category: 'fruktkorgar'
    },
    {
      id: 3,
      name: 'Eko Standardmjölk',
      price: 29,
      originalPrice: null,
      image: '/src/assets/fruktkorg-premium.jpg',
      category: 'fruktkorgar'
    },
    
    // Fruktsafter
    {
      id: 4,
      name: 'Laktosfri mjölk (Lång hållbarhet)',
      price: 26,
      originalPrice: null,
      image: '/src/assets/seasonal-fruits.jpg',
      category: 'fruktsafter'
    },
    {
      id: 5,
      name: 'Laktosfri Kaffemjölk',
      price: 140,
      originalPrice: 165,
      image: '/src/assets/fresh-fruit-arrangements.jpg',
      category: 'fruktsafter'
    },
    {
      id: 6,
      name: 'Lätte Art (Latte)',
      price: 30,
      originalPrice: null,
      image: '/src/assets/fruktlada.jpg',
      category: 'fruktsafter'
    },

    // Tillbehör
    {
      id: 7,
      name: 'iKaffe',
      price: 36,
      originalPrice: null,
      image: '/src/assets/office-wellness.jpg',
      category: 'tillbehor'
    },
    {
      id: 8,
      name: 'Good Oddly Banana',
      price: 35,
      originalPrice: 42,
      image: '/src/assets/fruktkorg-banan.jpg',
      category: 'tillbehor'
    },
    {
      id: 9,
      name: 'Lättmjölk (standard)',
      price: 28,
      originalPrice: null,
      image: '/src/assets/fruit-box.jpg',
      category: 'tillbehor'
    },

    // Fruktbitar
    {
      id: 10,
      name: 'Färska Fruktbitar Mix',
      price: 45,
      originalPrice: null,
      image: '/src/assets/picnic-basket-fruits.jpg',
      category: 'fruktbitar'
    },
    {
      id: 11,
      name: 'Exotiska Fruktbitar',
      price: 52,
      originalPrice: 58,
      image: '/src/assets/hero-fruits.jpg',
      category: 'fruktbitar'
    },

    // Mejeri & Nötkött
    {
      id: 12,
      name: 'Ekologisk Yoghurt',
      price: 38,
      originalPrice: null,
      image: '/src/assets/office-workers-fruit.jpg',
      category: 'mejeri'
    },
    {
      id: 13,
      name: 'Blandade Nötter Premium',
      price: 65,
      originalPrice: 75,
      image: '/src/assets/fruit-delivery-boxes.jpg',
      category: 'mejeri'
    },

    // Kaffe & Te
    {
      id: 14,
      name: 'Premium Kaffe Blend',
      price: 89,
      originalPrice: null,
      image: '/src/assets/happy-employees.jpg',
      category: 'kaffe'
    },
    {
      id: 15,
      name: 'Ekologiskt Te Selection',
      price: 55,
      originalPrice: 62,
      image: '/src/assets/professional-fruit-display.jpg',
      category: 'kaffe'
    },

    // Dryck
    {
      id: 16,
      name: 'Naturlig Mineralvatten',
      price: 22,
      originalPrice: null,
      image: '/src/assets/citrus-background.jpg',
      category: 'dryck'
    },
    {
      id: 17,
      name: 'Bubbelvatten Med Smak',
      price: 28,
      originalPrice: 32,
      image: '/src/assets/customer-portal-dashboard.jpg',
      category: 'dryck'
    },

    // Snacks & Nötter
    {
      id: 18,
      name: 'Hälsosamma Snacks Mix',
      price: 48,
      originalPrice: null,
      image: '/src/assets/fruit-box.jpg',
      category: 'snacks'
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors">
            Hem
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Sortiment</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Sortiment
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Upptäck vårt kompletta utbud av premium frukt, drycker och tillbehör för ditt företag.
          </p>
        </div>

        {/* Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Category Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-sm border p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Kategorier
              </h2>
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                      selectedCategory === category.id
                        ? 'bg-green-100 text-green-800 font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-xs bg-muted-foreground/10 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content - Product Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Visar {filteredProducts.length} av {products.length} produkter
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-green-50 rounded-lg shadow-sm p-4 hover:shadow-md transition-all duration-200 group"
                >
                  {/* Product Image */}
                  <div className="aspect-square rounded-md overflow-hidden mb-4 bg-white">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-red-600 font-bold text-lg">
                        {product.price} kr
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">
                          {product.originalPrice} kr
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Visa
                      </Button>
                      <Button 
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        Beställ Nu
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Inga produkter hittades i denna kategori.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sortiment;