import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AddToCartButton from '@/components/AddToCartButton';
import PublicAddToCartButton from '@/components/PublicAddToCartButton';
import { Info } from 'lucide-react';

interface KaffeTeTabProps {
  selectedDays: string[];
  currentDay: string;
  orderType: string;
  isPublicPage?: boolean;
}

interface Product {
  id: string;
  name: string;
  category: string;
  image_url: string;
  prices: { [key: string]: number };
  description?: string;
}

const KaffeTeTab: React.FC<KaffeTeTabProps> = ({ selectedDays, currentDay, orderType, isPublicPage = false }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'kaffe')
        .order('name');

      if (error) {
        console.error('Error fetching kaffe products:', error);
        return;
      }

      const typedProducts = data?.map(product => ({
        ...product,
        prices: product.prices as { [key: string]: number }
      })) as Product[];

      setProducts(typedProducts || []);
    } catch (error) {
      console.error('Error fetching kaffe products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Laddar produkter...</div>;
  }
  if (products.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Inga kaffe/te produkter hittades.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="group relative bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer max-w-[280px]"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="relative aspect-square bg-white overflow-hidden rounded-lg p-2 sm:p-3">
              <img 
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              {/* Info indicator */}
              <div className="absolute bottom-2 right-2 z-10 bg-primary/90 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Info className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="p-2 sm:p-2.5 space-y-2">
              <h3 className="font-bold text-charcoal text-sm text-center line-clamp-2">
                {product.name}
              </h3>
              <div className="text-sm font-bold text-green-600 text-center">
                {product.prices?.default || 0} kr
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                {isPublicPage ? (
                  <PublicAddToCartButton productId={product.id} productName={product.name} price={product.prices?.default || 0} category={product.category} image={product.image_url} selectedDay={currentDay} className="w-full" />
                ) : (
                  <AddToCartButton product={{ id: product.id, name: product.name, price: product.prices?.default || 0, category: product.category, image: product.image_url }} selectedDays={selectedDays} currentDay={currentDay} orderType={orderType} className="w-full" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-3xl">
          <div className="flex flex-col sm:flex-row gap-6">
            {selectedProduct?.image_url && (
              <div className="flex-shrink-0 w-full sm:w-2/5 bg-lightgray rounded-lg p-4">
                <img 
                  src={selectedProduct.image_url} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            )}
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                  {selectedProduct?.name}
                </h2>
              </div>
              
              <p className="text-base text-muted-foreground leading-relaxed">
                {selectedProduct?.description || 'Ingen beskrivning tillgänglig.'}
              </p>
              
              <div className="pt-2">
                <span className="text-3xl font-bold text-red-600">
                  SEK {selectedProduct?.prices?.default || 0}.00
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KaffeTeTab;