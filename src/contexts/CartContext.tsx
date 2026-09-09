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

const CART_STORAGE_PREFIX = 'shopping-cart:';
const storageKeyFor = (userId: string | null) => `${CART_STORAGE_PREFIX}${userId ?? 'guest'}`;

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // Remove any legacy shared cart cookie (was visible across accounts on the same device)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.cookie = 'shopping-cart=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax';
    }
  }, []);

  // Track which user the cart belongs to
  useEffect(() => {
    let active = true;

    const load = (uid: string | null) => {
      setUserId(uid);
      try {
        const saved = localStorage.getItem(storageKeyFor(uid));
        const parsed = saved ? JSON.parse(saved) : [];
        setItems(Array.isArray(parsed) ? parsed : []);
      } catch {
        setItems([]);
      }
      setReady(true);
    };

    supabase.auth.getSession().then(({ data }) => {
      if (active) load(data.session?.user?.id ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const uid = session?.user?.id ?? null;
      setUserId((prev) => {
        if (prev === uid) return prev;
        load(uid);
        return uid;
      });
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Persist the cart under the current user's own key
  useEffect(() => {
    if (!ready) return;
    const key = storageKeyFor(userId);
    if (items.length > 0) {
      localStorage.setItem(key, JSON.stringify(items));
    } else {
      localStorage.removeItem(key);
    }
  }, [items, userId, ready]);

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