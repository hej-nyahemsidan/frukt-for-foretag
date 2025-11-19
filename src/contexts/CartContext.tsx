import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
  size?: string; // For fruit baskets
  assignedDay?: string; // For day-specific deliveries
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (itemKey: string) => void;
  updateQuantity: (itemKey: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { setCookie, getCookie } = useCookieConsent();
  
  const CART_COOKIE_NAME = 'shopping-cart';

  // Load cart from cookie on mount
  useEffect(() => {
    const savedCart = getCookie(CART_COOKIE_NAME);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        }
      } catch (error) {
        console.error('Failed to parse cart from cookie:', error);
      }
    }
  }, []);

  // Save cart to cookie whenever items change
  useEffect(() => {
    if (items.length > 0) {
      setCookie(CART_COOKIE_NAME, JSON.stringify(items), 'necessary', 30); // 30 days expiry
    } else {
      // Clear cookie when cart is empty
      setCookie(CART_COOKIE_NAME, '', 'necessary', -1);
    }
  }, [items, setCookie]);

  const addItem = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems(prev => {
      // Create a unique identifier including size and assigned day
      const itemKey = [
        newItem.id,
        newItem.size || '',
        newItem.assignedDay || ''
      ].join('-');
      
      const existingItem = prev.find(item => {
        const existingKey = [
          item.id,
          item.size || '',
          item.assignedDay || ''
        ].join('-');
        return existingKey === itemKey;
      });
      
      const quantityToAdd = newItem.quantity || 1;
      
      if (existingItem) {
        return prev.map(item => {
          const existingKey = [
            item.id,
            item.size || '',
            item.assignedDay || ''
          ].join('-');
          return existingKey === itemKey
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item;
        });
      }
      return [...prev, { ...newItem, quantity: quantityToAdd }];
    });
  };

  const removeItem = (itemKey: string) => {
    setItems(prev => prev.filter(item => {
      const currentKey = [
        item.id,
        item.size || '',
        item.assignedDay || ''
      ].join('-');
      return currentKey !== itemKey;
    }));
  };

  const updateQuantity = (itemKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemKey);
      return;
    }
    setItems(prev =>
      prev.map(item => {
        const currentKey = [
          item.id,
          item.size || '',
          item.assignedDay || ''
        ].join('-');
        return currentKey === itemKey ? { ...item, quantity } : item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};