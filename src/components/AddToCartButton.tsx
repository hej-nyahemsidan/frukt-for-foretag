import React, { useState } from 'react';
import { Check, Plus, Calendar } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price?: number;
    prices?: { [key: string]: number }; // For fruit baskets with different sizes
    category: string;
    image?: string;
  };
  className?: string;
  showQuantitySelector?: boolean;
  showSizeSelector?: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  product, 
  className = "", 
  showQuantitySelector = true,
  showSizeSelector = false 
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addItem } = useCart();

  const daysOfWeek = [
    { id: 'monday', label: 'Måndag', short: 'Mån' },
    { id: 'tuesday', label: 'Tisdag', short: 'Tis' },
    { id: 'wednesday', label: 'Onsdag', short: 'Ons' },
    { id: 'thursday', label: 'Torsdag', short: 'Tor' },
    { id: 'friday', label: 'Fredag', short: 'Fre' },
    { id: 'saturday', label: 'Lördag', short: 'Lör' },
    { id: 'sunday', label: 'Söndag', short: 'Sön' }
  ];

  // Initialize selected size for fruit baskets
  React.useEffect(() => {
    if (showSizeSelector && product.prices && !selectedSize) {
      const sizes = Object.keys(product.prices);
      if (sizes.length > 0) {
        setSelectedSize(sizes[0]); // Default to first size
      }
    }
  }, [showSizeSelector, product.prices, selectedSize]);

  const getCurrentPrice = () => {
    if (product.prices && selectedSize) {
      return product.prices[selectedSize];
    }
    return product.price || 0;
  };

  const toggleDay = (dayId: string) => {
    setSelectedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    );
  };

  const handleAddToCart = () => {
    const currentPrice = getCurrentPrice();
    if (currentPrice === 0 || selectedDays.length === 0) return;

    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: currentPrice,
      category: product.category,
      image: product.image,
      quantity: quantity,
      days: selectedDays,
      ...(selectedSize && { size: selectedSize })
    };

    addItem(itemToAdd);

    setIsAdded(true);
    setIsDialogOpen(false);
    setSelectedDays([]);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleOpenDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  const availableSizes = product.prices ? Object.keys(product.prices) : [];

  return (
    <div className="space-y-3">
      {/* Size Selector for Fruit Baskets */}
      {showSizeSelector && availableSizes.length > 0 && (
        <div>
          <label className="block text-xs font-medium mb-2">Välj storlek:</label>
          <div className="grid grid-cols-2 gap-1">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`p-1.5 text-xs rounded border transition-colors ${
                  selectedSize === size
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background hover:bg-muted border-border'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="text-xs text-center mt-1 font-semibold text-primary">
            {getCurrentPrice()} kr
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      {showQuantitySelector && (
        <div>
          <label className="block text-xs font-medium mb-2">Antal:</label>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuantity(Math.max(1, quantity - 1));
              }}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-sm"
            >
              -
            </button>
            <span className="text-sm font-medium w-8 text-center">{quantity}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuantity(quantity + 1);
              }}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-sm"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Add to Cart Button with Day Selection Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={handleOpenDialog}
            className={`transition-all duration-200 ${className} ${
              isAdded 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-[#4CAF50] hover:bg-[#45a049] text-white'
            }`}
            disabled={isAdded || (showSizeSelector && !selectedSize)}
          >
            {isAdded ? (
              <>
                <Check size={16} className="mr-2" />
                Tillagd!
              </>
            ) : (
              <>
                <Plus size={16} className="mr-2" />
                Lägg till
              </>
            )}
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md bg-white z-50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar size={20} />
              Välj leveransdagar
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">{product.name}</h4>
              {selectedSize && (
                <p className="text-sm text-muted-foreground">Storlek: {selectedSize}</p>
              )}
              <p className="text-sm text-muted-foreground">
                Antal: {quantity} st × {getCurrentPrice()} kr = {quantity * getCurrentPrice()} kr
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-3">
                Välj vilka dagar du vill ha leverans:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {daysOfWeek.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => toggleDay(day.id)}
                    className={`p-3 text-sm rounded-lg border transition-colors ${
                      selectedDays.includes(day.id)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background hover:bg-muted border-border'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
              
              {selectedDays.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-2">Valda dagar:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedDays.map(dayId => {
                      const day = daysOfWeek.find(d => d.id === dayId);
                      return (
                        <Badge key={dayId} variant="secondary" className="text-xs">
                          {day?.short}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="flex-1"
              >
                Avbryt
              </Button>
              <Button
                onClick={handleAddToCart}
                disabled={selectedDays.length === 0}
                className="flex-1 bg-[#4CAF50] hover:bg-[#45a049]"
              >
                Lägg till i varukorg
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddToCartButton;