import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePublicCart } from '@/contexts/PublicCartContext';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PublicAddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  category: string;
  image?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  className?: string;
}

const WEEKDAYS = [
  { value: 'Måndag', label: 'Måndag' },
  { value: 'Tisdag', label: 'Tisdag' },
  { value: 'Onsdag', label: 'Onsdag' },
  { value: 'Torsdag', label: 'Torsdag' },
  { value: 'Fredag', label: 'Fredag' },
  { value: 'Lördag', label: 'Lördag' },
  { value: 'Söndag', label: 'Söndag' },
];

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
  const [selectedDay, setSelectedDay] = useState<string>('Måndag');

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    addItem({
      id: productId,
      name: productName,
      price,
      category,
      image,
      deliveryDay: selectedDay,
    });

    toast({
      title: "Tillagt i varukorgen",
      description: `${productName} har lagts till för ${selectedDay}.`,
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Select value={selectedDay} onValueChange={setSelectedDay}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Välj leveransdag" />
        </SelectTrigger>
        <SelectContent>
          {WEEKDAYS.map((day) => (
            <SelectItem key={day.value} value={day.value}>
              {day.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        onClick={handleAddToCart}
        variant={variant}
        className={className}
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        Lägg till i varukorgen
      </Button>
    </div>
  );
};

export default PublicAddToCartButton;
