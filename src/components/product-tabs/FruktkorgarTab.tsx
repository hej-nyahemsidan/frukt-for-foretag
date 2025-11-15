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
        .order('display_order', { ascending: true });

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {fruktkorgar.map((product) => (
          <div key={product.id} className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow max-w-[280px]">
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
            <div className="p-2 sm:p-2.5 space-y-1">
              <p className="text-[10px] text-gray-500 text-center">Från 4kg</p>
              <h3 
                className="font-bold text-charcoal text-sm text-center cursor-pointer hover:text-primary hover:underline transition-all line-clamp-2"
                onClick={() => setSelectedProduct(product)}
              >
                {product.name}
              </h3>
              <div className="text-sm font-bold text-green-600 text-center">
                {product.prices['4kg'] || 0} kr
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
            {selectedProduct?.description && (
              <p className="text-sm text-gray-600">
                {selectedProduct.description}
              </p>
            )}
            <div className="space-y-2 pt-2 border-t">
              <h4 className="font-semibold text-charcoal">Priser:</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm">
                  <span className="font-medium">4kg:</span> {selectedProduct?.prices['4kg'] || 0} kr
                </div>
                <div className="text-sm">
                  <span className="font-medium">6kg:</span> {selectedProduct?.prices['6kg'] || 0} kr
                </div>
                <div className="text-sm">
                  <span className="font-medium">9kg:</span> {selectedProduct?.prices['9kg'] || 0} kr
                </div>
                <div className="text-sm">
                  <span className="font-medium">11kg:</span> {selectedProduct?.prices['11kg'] || 0} kr
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FruktkorgarTab;