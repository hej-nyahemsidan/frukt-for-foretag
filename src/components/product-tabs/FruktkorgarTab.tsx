import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface FruktkorgarTabProps {
  selectedDays: string[];
}

interface Product {
  id: string;
  name: string;
  category: string;
  image_url: string;
  prices: Record<string, number>;
  description?: string;
}

const FruktkorgarTab: React.FC<FruktkorgarTabProps> = ({ selectedDays }) => {
  const [fruktkorgar, setFruktkorgar] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchFruktkorgar();
  }, []);

  const fetchFruktkorgar = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'fruktkorgar')
        .order('name');

      if (error) throw error;

      // Type assertion to handle Json type from Supabase
      const typedProducts: Product[] = (data || []).map(product => ({
        ...product,
        prices: product.prices as Record<string, number>
      }));

      setFruktkorgar(typedProducts);
    } catch (error) {
      console.error('Error fetching fruktkorgar:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-lg">Laddar produkter...</div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {fruktkorgar.map((product) => (
          <div key={product.id} className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-square bg-white overflow-hidden rounded-lg">
              <img 
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/assets/product-placeholder.jpg';
                }}
              />
            </div>
            <div className="p-3 sm:p-4 space-y-3">
              <h3 
                className="font-bold text-charcoal text-base sm:text-lg text-center cursor-pointer hover:text-primary hover:underline transition-all"
                onClick={() => setSelectedProduct(product)}
              >
                {product.name}
              </h3>
              <div className="space-y-1 text-center">
                <div className="text-base sm:text-lg font-bold text-charcoal">
                  4kg: {product.prices['4kg'] || 0} kr
                </div>
                <div className="text-base sm:text-lg text-charcoal space-y-0.5 font-bold">
                  <div>6kg: {product.prices['6kg'] || 0} kr</div>
                  <div>9kg: {product.prices['9kg'] || 0} kr</div>
                  <div>11kg: {product.prices['11kg'] || 0} kr</div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {fruktkorgar.length === 0 && !loading && (
          <div className="col-span-3 text-center py-8">
            <p className="text-gray-500">Inga fruktkorgar hittades.</p>
          </div>
        )}
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

export default FruktkorgarTab;