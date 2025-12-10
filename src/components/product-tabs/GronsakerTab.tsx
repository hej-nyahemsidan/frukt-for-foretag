import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AddToCartButton from '@/components/AddToCartButton';
import PublicAddToCartButton from '@/components/PublicAddToCartButton';
import { Info } from 'lucide-react';

interface GronsakerTabProps {
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

const GronsakerTab: React.FC<GronsakerTabProps> = ({ selectedDays, currentDay, orderType, isPublicPage = false }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'gronsaker')
        .order('name');

      if (error) throw error;

      const typedProducts: Product[] = (data || []).map(product => ({
        ...product,
        prices: product.prices as Record<string, number>
      }));

      setProducts(typedProducts);
      
      // Initialize selected sizes
      const initialSizes: Record<string, string> = {};
      typedProducts.forEach(p => {
        const availableSizes = Object.keys(p.prices || {});
        initialSizes[p.id] = availableSizes.includes('styck') ? 'styck' : (availableSizes[0] || 'styck');
      });
      setSelectedSizes(initialSizes);
    } catch (error) {
      console.error('Error fetching gronsaker products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSizeLabel = (size: string) => {
    switch (size) {
      case 'styck': return 'Styck';
      case 'pase': return 'Påse';
      default: return size;
    }
  };

  const getAvailableSizes = (product: Product) => {
    const sizes = Object.keys(product.prices || {});
    if (sizes.length === 0) return ['styck'];
    return sizes.filter(s => s === 'styck' || s === 'pase');
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
        {products.map((product) => {
          const availableSizes = getAvailableSizes(product);
          const currentSize = selectedSizes[product.id] || availableSizes[0] || 'styck';
          const currentPrice = product.prices?.[currentSize] || 0;

          return (
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
                  onError={(e) => {
                    e.currentTarget.src = '/assets/product-placeholder.jpg';
                  }}
                />
                <div className="absolute bottom-2 right-2 z-10 bg-primary/90 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Info className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="p-2 sm:p-2.5 space-y-2">
                <h3 className="font-bold text-charcoal text-sm text-center line-clamp-2">
                  {product.name}
                </h3>
                
                {availableSizes.length > 1 && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <Select
                      value={currentSize}
                      onValueChange={(value) => setSelectedSizes(prev => ({ ...prev, [product.id]: value }))}
                    >
                      <SelectTrigger className="w-full h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSizes.map(size => (
                          <SelectItem key={size} value={size}>
                            {getSizeLabel(size)} - {product.prices?.[size] || 0} kr
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="text-sm font-bold text-green-600 text-center">
                  {currentPrice} kr / {getSizeLabel(currentSize).toLowerCase()}
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  {isPublicPage ? (
                    <PublicAddToCartButton 
                      productId={product.id} 
                      productName={`${product.name} (${getSizeLabel(currentSize)})`} 
                      price={currentPrice} 
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
                        name: `${product.name} (${getSizeLabel(currentSize)})`, 
                        price: currentPrice, 
                        category: product.category, 
                        image: product.image_url
                      }} 
                      selectedDays={selectedDays} 
                      currentDay={currentDay} 
                      orderType={orderType} 
                      size={currentSize}
                      className="w-full" 
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {products.length === 0 && !loading && (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-8">
            <p className="text-gray-500">Inga produkter hittades.</p>
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
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                  {selectedProduct?.name}
                </h2>
              </div>
              
              <p className="text-base text-muted-foreground leading-relaxed">
                {selectedProduct?.description || 'Ingen beskrivning tillgänglig.'}
              </p>
              
              <div className="pt-2 space-y-1">
                {selectedProduct && Object.entries(selectedProduct.prices || {}).map(([size, price]) => (
                  <div key={size} className="flex justify-between items-center">
                    <span className="text-lg font-medium">{getSizeLabel(size)}:</span>
                    <span className="text-2xl font-bold text-red-600">
                      SEK {price}.00
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GronsakerTab;