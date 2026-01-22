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
    <section id="products" className="py-20 sm:py-24 px-4 sm:px-8 bg-gradient-to-br from-[hsl(40_30%_97%)] via-[hsl(140_25%_96%)] to-[hsl(45_40%_96%)]">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Fruktkorgar till jobbet i olika format
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-6">
            Upptäck vårt kompletta utbud av fruktkorgar och hälsosamma mellanmål. 
            Vi har flera artiklar och lösningar anpassade för alla typer av arbetsplatser. Frukt på jobbet Stockholm levererat direkt till kontoret.
          </p>
          <Link 
            to="/produkter" 
            className="inline-flex items-center text-primary hover:text-primary-dark font-semibold transition-colors group"
          >
            Se hela vårt produktutbud
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
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
                className="bg-gradient-to-br from-card via-white to-[hsl(140_30%_98%)] rounded-3xl shadow-[0_8px_32px_-12px_hsl(142_30%_30%/0.1)] p-6 flex flex-col h-full transition-all duration-400 hover:shadow-[0_16px_48px_-12px_hsl(142_30%_30%/0.18)] hover:-translate-y-2 hover:scale-[1.02] relative overflow-hidden animate-fade-in border border-border/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Decorative organic shape */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/10 rounded-full blur-2xl"></div>
                
                {/* Popular Badge */}
                {product.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-br from-[hsl(28_85%_58%)] to-[hsl(28_85%_48%)] text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold z-10 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Bästsäljare
                  </div>
                )}

                {/* Product Image */}
                <div className="mb-5 relative overflow-hidden rounded-2xl">
                  <img
                    src={product.image_url}
                    alt={`${product.name} - premium fruit basket from Fruktexperten`}
                    className="w-full aspect-square object-cover bg-gradient-to-br from-[hsl(40_30%_96%)] to-[hsl(140_30%_95%)] transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/product-placeholder.jpg';
                    }}
                  />
                  {/* Info indicator */}
                  <div className="absolute bottom-3 right-3 z-10 bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                    <Info className="w-4 h-4" />
                  </div>
                </div>

                {/* Product Content */}
                <div className="flex-1 flex flex-col relative z-10">
                  {/* Weight */}
                  <p className="text-muted-foreground text-sm mb-2 font-medium">
                    Från 4kg och uppåt
                  </p>

                  {/* Product Name */}
                  <h3 className="font-bold text-foreground mb-5 text-base group-hover:text-primary transition-colors min-h-[3rem]">
                    {product.name}
                  </h3>

                  {/* CTA Button */}
                  <Button 
                    className="w-full bg-gradient-to-br from-primary to-[hsl(142_45%_28%)] hover:from-primary-dark hover:to-primary text-white transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_16px_-4px_hsl(145_40%_45%/0.4)] rounded-xl"
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