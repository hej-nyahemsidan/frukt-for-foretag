import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
  size?: string; // For fruit baskets
  assignedDay?: string; // For day-specific deliveries
  orderType?: string; // 'subscription' or 'onetime'
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (itemKey: string) => void;
  updateQuantity: (itemKey: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemsByOrderType: (orderType: string) => CartItem[];
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
  
  const CART_COOKIE_NAME = 'shopping-cart';
  
  // Simple cookie utilities for cart storage (necessary cookies)
  const setCookie = (name: string, value: string, days: number = 30) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  };
  
  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

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
      setCookie(CART_COOKIE_NAME, JSON.stringify(items), 30); // 30 days expiry
    } else {
      // Clear cookie when cart is empty
      setCookie(CART_COOKIE_NAME, '', -1);
    }
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems(prev => {
      // Create a unique identifier including size, assigned day, and order type
      const itemKey = [
        newItem.id,
        newItem.size || '',
        newItem.assignedDay || '',
        newItem.orderType || ''
      ].join('-');
      
      const existingItem = prev.find(item => {
        const existingKey = [
          item.id,
          item.size || '',
          item.assignedDay || '',
          item.orderType || ''
        ].join('-');
        return existingKey === itemKey;
      });
      
      const quantityToAdd = newItem.quantity || 1;
      
      if (existingItem) {
        return prev.map(item => {
          const existingKey = [
            item.id,
            item.size || '',
            item.assignedDay || '',
            item.orderType || ''
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
        item.assignedDay || '',
        item.orderType || ''
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
          item.assignedDay || '',
          item.orderType || ''
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

  const getItemsByOrderType = (orderType: string) => {
    return items.filter(item => item.orderType === orderType);
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
        getItemsByOrderType,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};