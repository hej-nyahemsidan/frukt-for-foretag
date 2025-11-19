import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePublicCart } from '@/contexts/PublicCartContext';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface PublicAddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  category: string;
  image?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  className?: string;
  selectedDay?: string;
}

const PublicAddToCartButton = ({
  productId,
  productName,
  price,
  category,
  image,
  variant = 'default',
  className = '',
  selectedDay,
}: PublicAddToCartButtonProps) => {
  const { addItem } = usePublicCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!selectedDay) {
      toast({
        title: "Välj leveransdag",
        description: "Du måste välja minst en leveransdag innan du kan lägga till produkter.",
        variant: "destructive",
      });
      return;
    }
    
    addItem({
      id: productId,
      name: productName,
      price,
      category,
      image,
      day: selectedDay,
      quantity: quantity,
    });

    toast({
      title: "Tillagt i varukorgen",
      description: `${quantity}x ${productName} har lagts till för ${selectedDay}.`,
    });
    
    setQuantity(1);
  };

  return (
    <div className="space-y-3">
      {/* Quantity Selector */}
      <div>
        <label className="block text-xs sm:text-sm font-medium mb-2">Antal:</label>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuantity(Math.max(1, quantity - 1));
            }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-input bg-background flex items-center justify-center hover:bg-accent hover:text-accent-foreground text-xs sm:text-sm transition-colors"
            type="button"
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
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-input bg-background flex items-center justify-center hover:bg-accent hover:text-accent-foreground text-xs sm:text-sm transition-colors"
            type="button"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        variant={variant}
        className={className}
      >
        <ShoppingCart className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline">Lägg till i varukorgen</span>
        <span className="inline sm:hidden">Lägg till</span>
      </Button>
    </div>
  );
};

export default PublicAddToCartButton;
