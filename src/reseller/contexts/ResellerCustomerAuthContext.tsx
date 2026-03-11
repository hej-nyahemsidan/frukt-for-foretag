import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface ResellerInfo {
  id: string;
  name: string;
  logo_url: string | null;
  domain: string | null;
  contact_email: string | null;
  contact_phone: string | null;
}

interface ResellerCustomerProfile {
  id: string;
  company_name: string;
  contact_person: string | null;
  email: string;
  phone: string | null;
  address: string | null;
  reseller_id: string;
}

interface ResellerCustomerAuthContextType {
  user: User | null;
  session: Session | null;
  customerProfile: ResellerCustomerProfile | null;
  reseller: ResellerInfo | null;
  loading: boolean;
  isResellerCustomer: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
}

const ResellerCustomerAuthContext = createContext<ResellerCustomerAuthContextType | undefined>(undefined);

export const useResellerCustomerAuth = () => {
  const context = useContext(ResellerCustomerAuthContext);
  if (!context) {
    throw new Error('useResellerCustomerAuth must be used within a ResellerCustomerAuthProvider');
  }
  return context;
};

export const ResellerCustomerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [customerProfile, setCustomerProfile] = useState<ResellerCustomerProfile | null>(null);
  const [reseller, setReseller] = useState<ResellerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isResellerCustomer, setIsResellerCustomer] = useState(false);

  const checkResellerCustomerRole = async (userId: string): Promise<{ profile: ResellerCustomerProfile; reseller: ResellerInfo } | null> => {
    try {
      // Check if user is a reseller customer
      const { data: rc, error: rcError } = await supabase
        .from('reseller_customers')
        .select('id, company_name, contact_person, email, phone, address, reseller_id')
        .eq('user_id', userId)
        .eq('active', true)
        .maybeSingle();

      if (rcError || !rc) return null;

      // Fetch reseller info for branding
      const { data: resellerData, error: rError } = await supabase
        .from('resellers')
        .select('id, name, logo_url, domain, contact_email, contact_phone')
        .eq('id', rc.reseller_id)
        .eq('active', true)
        .maybeSingle();

      if (rError || !resellerData) return null;

      return { profile: rc, reseller: resellerData };
    } catch {
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!isMounted) return;
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          setTimeout(() => {
            if (!isMounted) return;
            checkResellerCustomerRole(session.user.id).then((result) => {
              if (!isMounted) return;
              if (result) {
                setCustomerProfile(result.profile);
                setReseller(result.reseller);
                setIsResellerCustomer(true);
              } else {
                setCustomerProfile(null);
                setReseller(null);
                setIsResellerCustomer(false);
              }
              setLoading(false);
            });
          }, 0);
        } else {
          setCustomerProfile(null);
          setReseller(null);
          setIsResellerCustomer(false);
          setLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!isMounted) return;
      if (error) { setLoading(false); return; }

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        checkResellerCustomerRole(session.user.id).then((result) => {
          if (!isMounted) return;
          if (result) {
            setCustomerProfile(result.profile);
            setReseller(result.reseller);
            setIsResellerCustomer(true);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => { isMounted = false; subscription.unsubscribe(); };
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error };

    // Verify user is a reseller customer
    const { data: { user: loggedInUser } } = await supabase.auth.getUser();
    if (loggedInUser) {
      const result = await checkResellerCustomerRole(loggedInUser.id);
      if (!result) {
        await supabase.auth.signOut();
        return { error: { message: 'Du har inte tillgång till denna portal.' } };
      }
    }
    return { error: null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setCustomerProfile(null);
    setReseller(null);
    setIsResellerCustomer(false);
  };

  return (
    <ResellerCustomerAuthContext.Provider value={{
      user, session, customerProfile, reseller, loading, isResellerCustomer, login, logout,
    }}>
      {children}
    </ResellerCustomerAuthContext.Provider>
  );
};
