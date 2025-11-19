import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface PublicCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
  deliveryDay: string;
}

interface PublicCartContextType {
  items: PublicCartItem[];
  addItem: (item: Omit<PublicCartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (itemId: string, deliveryDay: string) => void;
  updateQuantity: (itemId: string, deliveryDay: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const PublicCartContext = createContext<PublicCartContextType | undefined>(undefined);

export const usePublicCart = () => {
  const context = useContext(PublicCartContext);
  if (!context) {
    throw new Error('usePublicCart must be used within a PublicCartProvider');
  }
  return context;
};

interface PublicCartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = 'public-shopping-cart';

export const PublicCartProvider: React.FC<PublicCartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<PublicCartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        }
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items]);

  const addItem = (newItem: Omit<PublicCartItem, 'quantity'> & { quantity?: number }) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.id === newItem.id && item.deliveryDay === newItem.deliveryDay);
      const quantityToAdd = newItem.quantity || 1;
      
      if (existingItem) {
        return prev.map(item =>
          item.id === newItem.id && item.deliveryDay === newItem.deliveryDay
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: quantityToAdd }];
    });
  };

  const removeItem = (itemId: string, deliveryDay: string) => {
    setItems(prev => prev.filter(item => !(item.id === itemId && item.deliveryDay === deliveryDay)));
  };

  const updateQuantity = (itemId: string, deliveryDay: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId, deliveryDay);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === itemId && item.deliveryDay === deliveryDay ? { ...item, quantity } : item
      )
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
    <PublicCartContext.Provider
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
    </PublicCartContext.Provider>
  );
};
