import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AddToCartButton from '@/components/AddToCartButton';

interface MejeriTabProps {
  selectedDays: string[];
}

interface Product {
  id: string;
  name: string;
  category: string;
  image_url: string;
  prices: { [key: string]: number };
  description?: string;
}

const MejeriTab: React.FC<MejeriTabProps> = ({ selectedDays }) => {
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
        .eq('category', 'mejeri')
        .order('name');

      if (error) {
        console.error('Error fetching mejeri products:', error);
        return;
      }

      const typedProducts = data?.map(product => ({
        ...product,
        prices: product.prices as { [key: string]: number }
      })) as Product[];

      setProducts(typedProducts || []);
    } catch (error) {
      console.error('Error fetching mejeri products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Laddar produkter...</div>;
  }
  if (products.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Inga mejeriprodukter hittades.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer max-w-[280px]"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="aspect-square bg-white overflow-hidden rounded-lg p-2">
              <img 
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-2 sm:p-2.5 space-y-2">
              <h3 className="font-bold text-charcoal text-sm text-center line-clamp-2">
                {product.name}
              </h3>
              <div className="text-sm font-bold text-green-600 text-center">
                {product.prices?.default || 0} kr
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <AddToCartButton
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.prices?.default || 0,
                    category: product.category,
                    image: product.image_url
                  }}
                  selectedDays={selectedDays}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedProduct?.image_url && (
              <img 
                src={selectedProduct.image_url} 
                alt={selectedProduct.name}
                className="w-full max-h-64 object-contain rounded-lg"
              />
            )}
            <p className="text-sm text-gray-600">
              {selectedProduct?.description || 'Ingen beskrivning tillgänglig.'}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MejeriTab;