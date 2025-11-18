import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePublicCart } from '@/contexts/PublicCartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

const PublicCartIndicator = () => {
  const { items, getTotalItems, updateQuantity, removeItem, getTotalPrice } = usePublicCart();
  const navigate = useNavigate();
  const totalItems = getTotalItems();

  const handleGoToCheckout = () => {
    navigate('/offertforfragan');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-[500px] overflow-auto">
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-4">Varukorg</h3>
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Din varukorg är tom</p>
          ) : (
            <>
              <div className="space-y-4 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-sm text-primary font-semibold">{item.price} kr</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 ml-auto text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Totalt:</span>
                  <span className="text-lg font-bold text-primary">{getTotalPrice()} kr</span>
                </div>
                <Button 
                  onClick={handleGoToCheckout}
                  className="w-full"
                >
                  Gå till offertförfrågan
                </Button>
              </div>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PublicCartIndicator;
