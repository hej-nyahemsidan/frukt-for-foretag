import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePublicCart } from '@/contexts/PublicCartContext';
import { useToast } from '@/hooks/use-toast';

interface PublicAddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  category: string;
  image?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  className?: string;
}

const PublicAddToCartButton = ({
  productId,
  productName,
  price,
  category,
  image,
  variant = 'default',
  className = '',
}: PublicAddToCartButtonProps) => {
  const { addItem } = usePublicCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    addItem({
      id: productId,
      name: productName,
      price,
      category,
      image,
    });

    toast({
      title: "Tillagt i varukorgen",
      description: `${productName} har lagts till i din varukorg.`,
    });
  };

  return (
    <Button
      onClick={handleAddToCart}
      variant={variant}
      className={className}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      Lägg till i varukorgen
    </Button>
  );
};

export default PublicAddToCartButton;
