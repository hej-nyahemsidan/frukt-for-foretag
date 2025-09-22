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
  isAdmin: boolean;
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCustomerData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching customer data:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching customer data:', error);
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
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check if user is admin
        if (session?.user?.email === 'admin@fruktexperten.se') {
          setIsAdmin(true);
          setCustomer(null); // Admin doesn't need customer data
          setLoading(false);
        } else {
          setIsAdmin(false);
          if (session?.user) {
            // Fetch customer data when regular user logs in
            setTimeout(async () => {
              const customerData = await fetchCustomerData(session.user.id);
              setCustomer(customerData);
              setLoading(false);
            }, 0);
          } else {
            setCustomer(null);
            setLoading(false);
          }
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user?.email === 'admin@fruktexperten.se') {
        setIsAdmin(true);
        setCustomer(null);
        setLoading(false);
      } else {
        setIsAdmin(false);
        if (session?.user) {
          fetchCustomerData(session.user.id).then((customerData) => {
            setCustomer(customerData);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      }
    });

    return () => subscription.unsubscribe();
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
    setIsAdmin(false);
  };

  const value = {
    user,
    session,
    customer,
    isAdmin,
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