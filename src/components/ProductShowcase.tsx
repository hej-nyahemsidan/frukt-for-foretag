
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import fruktkorgrSupremeImg from '@/assets/fruktkorg-standard-new.jpg';
import fruktkorgrPremiumImg from '@/assets/fruktkorg-premium-new.jpg';
import fruktkorgrOriginalImg from '@/assets/fruktkorg-eko-new.jpg';
import fruktkorgrBananImg from '@/assets/fruktkorg-banan-new.jpg';
import fruktladaImg from '@/assets/fruktlada-new.jpg';

const ProductShowcase = () => {
  const products = [
    {
      id: 'standard',
      name: 'Fruktkorg Standard',
      image: fruktkorgrSupremeImg,
    weight: 'Från 4kg och uppåt',
      showPrice: false,
      popular: false
    },
    {
      id: 'premium',
      name: 'Fruktkorg Premium',
      image: fruktkorgrPremiumImg,
      weight: 'Från 4kg och uppåt',
      showPrice: false,
      popular: true
    },
    {
      id: 'sasong',
      name: 'Fruktkorg Säsong',
      image: fruktkorgrOriginalImg,
    weight: 'Från 4kg och uppåt',
      showPrice: false,
      popular: false
    },
    {
      id: 'banan',
      name: 'Fruktkorg Banan+',
      image: fruktkorgrBananImg,
    weight: 'Från 4kg och uppåt',
      showPrice: false,
      popular: true
    },
    {
      id: 'lada',
      name: 'Fruktlåda',
      image: fruktladaImg,
    weight: 'Från 4kg och uppåt',
      showPrice: false,
      popular: false
    }
  ];

  return (
    <section id="products" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent-light-green to-background">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Några av Våra Produkter
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Bläddra genom vårt sortiment organiserat i kategorier
          </p>
          <p className="text-base sm:text-lg text-muted-foreground mt-3">
            Fler Produkter hittar du på Mina Sidor när du blir kund
          </p>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
          {products.map((product, index) => (
            <Link 
              to="/produkter"
              key={product.id}
              className="group block"
            >
              <div 
                className="bg-white rounded-xl shadow-soft p-6 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] relative overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Popular Badge */}
                {product.popular && (
                  <div className="absolute top-3 right-3 bg-gradient-primary text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-semibold z-10">
                    <Star className="w-3 h-3 fill-current" />
                    Bästsäljare
                  </div>
                )}

                {/* Product Image */}
                <div className="mb-4 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={`${product.name} - premium fruit basket from Fruktexperten`}
                    className="w-full aspect-square object-cover rounded-lg bg-gradient-subtle shadow-soft"
                  />
                </div>

                {/* Product Content */}
                <div className="flex-1 flex flex-col">
                  {/* Weight */}
                  <p className="text-muted-foreground text-sm mb-2">
                    {product.weight}
                  </p>

                  {/* Product Name */}
                  <h3 className="font-semibold text-foreground mb-4 text-base group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  {/* CTA Button */}
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-200 hover:scale-[1.02] shadow-sm"
                    size="sm"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Läs mer
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductShowcase;