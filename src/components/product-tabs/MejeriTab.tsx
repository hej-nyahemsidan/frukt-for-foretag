import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
}

const MejeriTab: React.FC<MejeriTabProps> = ({ selectedDays }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-[3/4] bg-white overflow-hidden p-2">
            <img 
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-3 space-y-3">
            <h3 className="font-medium text-charcoal text-xs text-center">{product.name}</h3>
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: product.prices?.default,
                prices: product.prices,
                category: 'mejeri',
                image: product.image_url
              }}
              className="w-full text-xs px-1 py-1"
              showQuantitySelector={true}
              showSizeSelector={false}
              selectedDays={selectedDays}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MejeriTab;