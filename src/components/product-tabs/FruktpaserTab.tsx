import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AddToCartButton from '@/components/AddToCartButton';

interface FruktpaserTabProps {
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

const FruktpaserTab: React.FC<FruktpaserTabProps> = ({ selectedDays }) => {
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
        .eq('category', 'fruktpasar')
        .order('name');

      if (error) {
        console.error('Error fetching fruktpasar products:', error);
        return;
      }

      const typedProducts = data?.map(product => ({
        ...product,
        prices: product.prices as { [key: string]: number }
      })) as Product[];

      setProducts(typedProducts || []);
    } catch (error) {
      console.error('Error fetching fruktpasar products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Laddar produkter...</div>;
  }
  if (products.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Inga fruktpåsar hittades.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow max-w-[280px]">
            <div className="aspect-square bg-white overflow-hidden rounded-lg">
              <img 
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-2 sm:p-2.5 space-y-2">
              <h3 
                className="font-bold text-charcoal text-sm text-center cursor-pointer hover:text-primary hover:underline transition-all line-clamp-2"
                onClick={() => setSelectedProduct(product)}
              >
                {product.name}
              </h3>
              <div className="text-sm font-bold text-green-600 text-center">
                {product.prices?.default || 0} kr
              </div>
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

export default FruktpaserTab;