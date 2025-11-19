import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AddToCartButton from '@/components/AddToCartButton';
import PublicAddToCartButton from '@/components/PublicAddToCartButton';
import { ShoppingCart } from 'lucide-react';

interface FruktkorgarTabProps {
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
  prices: Record<string, number>;
  description?: string;
}

const FruktkorgarTab: React.FC<FruktkorgarTabProps> = ({ selectedDays, currentDay, orderType, isPublicPage = false }) => {
  const [fruktkorgar, setFruktkorgar] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

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
      
      // Initialize selected sizes for all products
      const initialSizes: Record<string, string> = {};
      typedProducts.forEach(product => {
        initialSizes[product.id] = '4kg';
      });
      setSelectedSizes(initialSizes);
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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {fruktkorgar.map((product) => {
          const sizes = ['4kg', '6kg', '9kg', '11kg'];
          const currentSize = selectedSizes[product.id] || '4kg';
          
          return (
            <div 
              key={product.id} 
              className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="aspect-square bg-white overflow-hidden rounded-lg">
                <img 
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/product-placeholder.jpg';
                  }}
                />
              </div>
              <div className="p-3 space-y-3">
                <h3 className="font-bold text-charcoal text-sm text-center line-clamp-2">
                  {product.name}
                </h3>
                
                {/* Single size selector */}
                <div className="space-y-3 p-3 bg-white rounded border border-gray-200" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between gap-2">
                    <Select 
                      value={currentSize} 
                      onValueChange={(value) => setSelectedSizes(prev => ({ ...prev, [product.id]: value }))}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className="text-lg font-bold text-green-600">
                      {product.prices[currentSize] || 0} kr
                    </span>
                  </div>
                  
                  {isPublicPage ? (
                    <PublicAddToCartButton
                      productId={product.id}
                      productName={`${product.name} (${currentSize})`}
                      price={product.prices[currentSize] || 0}
                      category={product.category}
                      image={product.image_url}
                      selectedDay={currentDay}
                      size={currentSize}
                      className="w-full"
                    />
                  ) : (
                  <AddToCartButton
                    product={{
                      id: product.id,
                      name: `${product.name} (${currentSize})`,
                      price: product.prices[currentSize] || 0,
                      category: product.category,
                      image: product.image_url
                    }}
                    size={currentSize}
                    selectedDays={selectedDays}
                    currentDay={currentDay}
                    orderType={orderType}
                    className="w-full"
                  />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {fruktkorgar.length === 0 && !loading && (
          <div className="col-span-3 text-center py-8">
            <p className="text-gray-500">Inga fruktkorgar hittades.</p>
          </div>
        )}
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
                <p className="text-sm text-muted-foreground">Från 4kg</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                  {selectedProduct?.name}
                </h2>
              </div>
              
              {selectedProduct?.description && (
                <p className="text-base text-muted-foreground leading-relaxed">
                  {selectedProduct.description}
                </p>
              )}
              
              <div className="space-y-3 pt-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-red-600">
                    SEK {selectedProduct?.prices['4kg'] || 0}.00
                  </span>
                </div>
                
                <div className="pt-2 border-t">
                  <h4 className="font-semibold text-foreground mb-2">Alla storlekar:</h4>
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
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FruktkorgarTab;