import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AddToCartButton from '@/components/AddToCartButton';
import PublicAddToCartButton from '@/components/PublicAddToCartButton';
import { ShoppingCart, Info } from 'lucide-react';

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
      {/* February campaign banner */}
      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-center">
        <span className="text-red-600 font-semibold text-sm">🎉 Februarierbjudande – 8% rabatt på alla fruktkorgar!</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {fruktkorgar.map((product) => {
          const sizes = ['4kg', '6kg', '9kg', '11kg'];
          const currentSize = selectedSizes[product.id] || '4kg';
          const originalPrice = product.prices[currentSize] || 0;
          const discountedPrice = Math.round(originalPrice * 0.92);
          
          return (
            <div 
              key={product.id} 
              className="group relative bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              {/* Discount badge */}
              <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -8%
              </div>
              <div className="relative aspect-square bg-white overflow-hidden rounded-lg">
                <img 
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/product-placeholder.jpg';
                  }}
                />
                <div className="absolute bottom-2 right-2 z-10 bg-primary/90 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Info className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="p-3 space-y-3">
                <h3 className="font-bold text-charcoal text-sm text-center line-clamp-2">
                  {product.name}
                </h3>
                
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
                    <div className="text-right">
                      <span className="text-xs text-gray-400 line-through block">{originalPrice} kr</span>
                      <span className="text-lg font-bold text-red-600">{discountedPrice} kr</span>
                    </div>
                  </div>
                  
                  {isPublicPage ? (
                    <PublicAddToCartButton
                      productId={product.id}
                      productName={`${product.name} (${currentSize})`}
                      price={discountedPrice}
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
                      price: discountedPrice,
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
                  <span className="text-lg text-gray-400 line-through">
                    {selectedProduct?.prices['4kg'] || 0} kr
                  </span>
                  <span className="text-3xl font-bold text-red-600">
                    {Math.round((selectedProduct?.prices['4kg'] || 0) * 0.92)} kr
                  </span>
                  <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">-8%</span>
                </div>
                
                <div className="pt-2 border-t">
                  <h4 className="font-semibold text-foreground mb-2">Alla storlekar:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['4kg', '6kg', '9kg', '11kg'].map(size => {
                      const orig = selectedProduct?.prices[size] || 0;
                      const disc = Math.round(orig * 0.92);
                      return (
                        <div key={size} className="text-sm">
                          <span className="font-medium">{size}:</span>{' '}
                          <span className="line-through text-gray-400">{orig} kr</span>{' '}
                          <span className="font-bold text-red-600">{disc} kr</span>
                        </div>
                      );
                    })}
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