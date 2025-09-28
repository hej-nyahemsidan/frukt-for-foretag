import { useState, useEffect, MouseEvent } from 'react';
import { Check, Plus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import DaySelectionDialog from '@/components/DaySelectionDialog';

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
  selectedDays: string[];
}

const AddToCartButton = ({ 
  product, 
  className = "", 
  showQuantitySelector = true,
  showSizeSelector = false,
  selectedDays
}: AddToCartButtonProps) => {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [showDayDialog, setShowDayDialog] = useState(false);
  const { addItem } = useCart();

  // Initialize selected size for fruit baskets
  useEffect(() => {
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
    
    // Handle products with prices object but no size selection
    if (product.prices && !selectedSize) {
      // First try to get default price
      if (product.prices.default !== undefined) {
        return product.prices.default;
      }
      // If no default, use the first available price
      const firstPrice = Object.values(product.prices)[0];
      if (firstPrice !== undefined) {
        return firstPrice;
      }
    }
    
    return product.price || 0;
  };

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const currentPrice = getCurrentPrice();
    if (currentPrice === 0) return;

    // If multiple days are selected, show day selection dialog
    if (selectedDays.length > 1) {
      setShowDayDialog(true);
      return;
    }

    // If only one day or no days selected, add directly
    const assignedDays = selectedDays.length === 1 ? [selectedDays[0]] : [];
    addProductToCart(assignedDays);
  };

  const addProductToCart = (assignedDays: string[]) => {
    const currentPrice = getCurrentPrice();
    
    assignedDays.forEach(day => {
      const itemToAdd = {
        id: product.id,
        name: product.name,
        price: currentPrice,
        category: product.category,
        image: product.image,
        quantity: quantity,
        assignedDay: day,
        ...(selectedSize && { size: selectedSize })
      };

      addItem(itemToAdd);
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleDayConfirm = (chosenDays: string[]) => {
    addProductToCart(chosenDays);
  };

  const availableSizes = product.prices ? Object.keys(product.prices) : [];

  return (
    <div className="space-y-3">
      {/* Size Selector for Fruit Baskets */}
      {showSizeSelector && availableSizes.length > 0 && (
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-2">Välj storlek:</label>
          <div className="grid grid-cols-2 gap-1 sm:gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`p-1.5 sm:p-2 text-xs sm:text-sm rounded border transition-colors ${
                  selectedSize === size
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background hover:bg-muted border-border'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="text-xs text-center mt-1 text-muted-foreground">
            {getCurrentPrice()} kr
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      {showQuantitySelector && (
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-2">Antal:</label>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuantity(Math.max(1, quantity - 1));
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-xs sm:text-sm"
            >
              -
            </button>
            <span className="text-xs sm:text-sm font-medium w-8 text-center">{quantity}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuantity(quantity + 1);
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-xs sm:text-sm"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Price Display */}
      {!showSizeSelector && (
        <div className="text-sm text-center text-muted-foreground mb-2">
          {getCurrentPrice()} kr
        </div>
      )}

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
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
      
      {/* Day Selection Dialog */}
      <DaySelectionDialog
        isOpen={showDayDialog}
        onClose={() => setShowDayDialog(false)}
        availableDays={selectedDays}
        onConfirm={handleDayConfirm}
        productName={product.name}
      />
    </div>
  );
};

export default AddToCartButton;