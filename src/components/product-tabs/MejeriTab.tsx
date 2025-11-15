import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-[3/4] bg-white overflow-hidden p-2">
              <img 
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-3 sm:p-4 space-y-3">
              <h3 
                className="font-medium text-charcoal text-xs sm:text-sm text-center cursor-pointer hover:text-primary transition-colors"
                onClick={() => setSelectedProduct(product)}
              >
                {product.name}
              </h3>
              <div className="text-xl sm:text-2xl font-semibold text-charcoal text-center">
                {product.prices?.default || 0} kr
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedProduct?.image_url && (
              <img 
                src={selectedProduct.image_url} 
                alt={selectedProduct.name}
                className="w-full rounded-lg"
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