import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Customer {
  id: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string | null;
  address: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  customer: Customer | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  refreshCustomerData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCustomerData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (error) {
        return null;
      }
      
      return data;
    } catch (error) {
      return null;
    }
  };

  const refreshCustomerData = async () => {
    if (user?.id) {
      const customerData = await fetchCustomerData(user.id);
      setCustomer(customerData);
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Set up auth state listener FIRST (no async callback to avoid deadlocks)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!isMounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer data fetch to avoid blocking auth callback
          setTimeout(() => {
            if (!isMounted) return;
            fetchCustomerData(session.user.id).then((customerData) => {
              if (isMounted) {
                setCustomer(customerData);
                setLoading(false);
              }
            });
          }, 0);
        } else {
          setCustomer(null);
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!isMounted) return;
      
      if (error) {
        console.error('Error getting session:', error);
        setLoading(false);
        return;
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchCustomerData(session.user.id).then((customerData) => {
          if (isMounted) {
            setCustomer(customerData);
            setLoading(false);
          }
        });
      } else {
        setLoading(false);
      }
    }).catch((error) => {
      console.error('Session fetch failed:', error);
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setCustomer(null);
  };

  const value = {
    user,
    session,
    customer,
    loading,
    login,
    logout,
    refreshCustomerData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};