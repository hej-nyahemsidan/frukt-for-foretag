import React, { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CartIndicator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, getTotalItems, getTotalPrice, updateQuantity, removeItem, clearCart } = useCart();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const formatPrice = (price: number) => `${price} kr`;

  return (
    <div className="relative">
      {/* Cart Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-2 px-4 py-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white"
      >
        <ShoppingCart size={20} />
        <span className="font-medium">
          Varukorg {totalItems > 0 && `(${totalItems})`}
        </span>
        {totalPrice > 0 && (
          <span className="font-bold">{formatPrice(totalPrice)}</span>
        )}
        {totalItems > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {totalItems}
          </Badge>
        )}
      </Button>

      {/* Cart Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-charcoal">Varukorg ({totalItems})</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X size={16} />
              </Button>
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {items.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                Varukorgen är tom
              </div>
            ) : (
              <div className="p-2 space-y-2">
                 {items.map((item) => {
                   // Create unique identifier for cart operations
                   const itemKey = `${item.id}${item.size ? `-${item.size}` : ''}${item.days ? `-${item.days.join(',')}` : ''}`;
                   
                   return (
                     <div key={itemKey} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                       <div className="flex-1">
                         <h4 className="font-medium text-sm text-charcoal">{item.name}</h4>
                         {item.size && (
                           <p className="text-xs text-muted-foreground">Storlek: {item.size}</p>
                         )}
                         {item.days && item.days.length > 0 && (
                           <div className="text-xs text-muted-foreground">
                             Dagar: {item.days.map(dayId => {
                               const dayMap: { [key: string]: string } = {
                                 'monday': 'Mån', 'tuesday': 'Tis', 'wednesday': 'Ons',
                                 'thursday': 'Tor', 'friday': 'Fre', 'saturday': 'Lör', 'sunday': 'Sön'
                               };
                               return dayMap[dayId] || dayId;
                             }).join(', ')}
                           </div>
                         )}
                         <p className="text-xs text-muted-foreground">{formatPrice(item.price)}/st</p>
                       </div>
                       
                       <div className="flex items-center gap-2">
                         <Button
                           variant="outline"
                           size="sm"
                           onClick={() => updateQuantity(itemKey, item.quantity - 1)}
                           className="h-6 w-6 p-0"
                         >
                           <Minus size={12} />
                         </Button>
                         <span className="font-medium text-sm w-6 text-center">{item.quantity}</span>
                         <Button
                           variant="outline"
                           size="sm"
                           onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                           className="h-6 w-6 p-0"
                         >
                           <Plus size={12} />
                         </Button>
                         <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => removeItem(itemKey)}
                           className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                         >
                           <Trash2 size={12} />
                         </Button>
                       </div>
                     </div>
                   );
                 })}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-4 border-t border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-charcoal">Totalt:</span>
                <span className="font-bold text-lg text-charcoal">{formatPrice(totalPrice)}</span>
              </div>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full text-sm"
                  onClick={clearCart}
                >
                  Rensa varukorg
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartIndicator;