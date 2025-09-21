import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    category: string;
    image?: string;
  };
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, className = "" }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      className={`transition-all duration-200 ${className} ${
        isAdded 
          ? 'bg-green-500 hover:bg-green-600 text-white' 
          : 'bg-[#4CAF50] hover:bg-[#45a049] text-white'
      }`}
      disabled={isAdded}
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
  );
};

export default AddToCartButton;