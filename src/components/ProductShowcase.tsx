import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Info } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  image_url: string;
  popular?: boolean;
}

const ProductShowcase = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Define which products should have the popular badge
  const popularProductNames = ['Fruktkorg Premium', 'Fruktkorg Banan Plus'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, image_url')
        .eq('category', 'fruktkorgar')
        .order('display_order', { ascending: true });

      if (error) throw error;

      // Mark popular products
      const productsWithPopular = (data || []).map(product => ({
        ...product,
        popular: popularProductNames.includes(product.name)
      }));

      setProducts(productsWithPopular);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="products" className="py-20 sm:py-24 px-4 sm:px-8 bg-gray-100">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-charcoal mb-4">
            Fruktkorgar till jobbet i olika format
          </h2>
          <p className="text-lg text-mediumgray max-w-4xl mx-auto leading-relaxed mb-6">
            Upptäck vårt kompletta utbud av fruktkorgar och hälsosamma mellanmål. 
            Vi har flera artiklar och lösningar anpassade för alla typer av arbetsplatser. Frukt på jobbet Stockholm levererat direkt till kontoret.
          </p>
          <Link 
            to="/produkter" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            Se hela vårt produktutbud
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Laddar produkter...</p>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
              {products.map((product, index) => (
            <Link 
              to="/produkter"
              key={product.id}
              className="group block"
            >
              <div 
                className="bg-white rounded-xl shadow-soft p-6 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden animate-fade-in"
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
                    src={product.image_url}
                    alt={`${product.name} - premium fruit basket from Fruktexperten`}
                    className="w-full aspect-square object-cover rounded-lg bg-gradient-subtle shadow-soft"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/product-placeholder.jpg';
                    }}
                  />
                  {/* Info indicator */}
                  <div className="absolute bottom-2 right-2 z-10 bg-primary/90 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Info className="w-4 h-4" />
                  </div>
                </div>

                {/* Product Content */}
                <div className="flex-1 flex flex-col">
                  {/* Weight */}
                  <p className="text-muted-foreground text-sm mb-2">
                    Från 4kg och uppåt
                  </p>

                  {/* Product Name */}
                  <h3 className="font-semibold text-foreground mb-4 text-base group-hover:text-primary transition-colors min-h-[3rem]">
                    {product.name}
                  </h3>

                  {/* Price removed */}

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
        </>
        )}
      </div>
    </section>
  );
};

export default ProductShowcase;