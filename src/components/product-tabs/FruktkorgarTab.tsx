import React, { useState, useEffect } from 'react';
import AddToCartButton from '@/components/AddToCartButton';
import { supabase } from '@/integrations/supabase/client';

interface FruktkorgarTabProps {
  selectedDays: string[];
}

interface Product {
  id: string;
  name: string;
  category: string;
  image_url: string;
  prices: Record<string, number>;
}

const FruktkorgarTab: React.FC<FruktkorgarTabProps> = ({ selectedDays }) => {
  const [fruktkorgar, setFruktkorgar] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
            <h3 className="font-medium text-charcoal text-sm sm:text-base text-center">{product.name}</h3>
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                prices: product.prices,
                category: 'fruktkorgar',
                image: product.image_url
              }}
              className="w-full text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
              showQuantitySelector={true}
              showSizeSelector={true}
              selectedDays={selectedDays}
            />
          </div>
        </div>
      ))}
      
      {fruktkorgar.length === 0 && !loading && (
        <div className="col-span-3 text-center py-8">
          <p className="text-gray-500">Inga fruktkorgar hittades.</p>
        </div>
      )}
    </div>
  );
};

export default FruktkorgarTab;