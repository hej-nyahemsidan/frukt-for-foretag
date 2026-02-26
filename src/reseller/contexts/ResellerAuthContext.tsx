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

interface ResellerAuthContextType {
  user: User | null;
  session: Session | null;
  reseller: ResellerInfo | null;
  loading: boolean;
  isReseller: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
}

const ResellerAuthContext = createContext<ResellerAuthContextType | undefined>(undefined);

export const useResellerAuth = () => {
  const context = useContext(ResellerAuthContext);
  if (!context) {
    throw new Error('useResellerAuth must be used within a ResellerAuthProvider');
  }
  return context;
};

export const ResellerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [reseller, setReseller] = useState<ResellerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReseller, setIsReseller] = useState(false);

  const checkResellerRole = async (userId: string): Promise<ResellerInfo | null> => {
    try {
      const { data, error } = await supabase
        .from('reseller_users')
        .select('reseller_id')
        .eq('user_id', userId)
        .maybeSingle();

      if (error || !data) return null;

      const { data: resellerData, error: resellerError } = await supabase
        .from('resellers')
        .select('id, name, logo_url, domain, contact_email, contact_phone')
        .eq('id', data.reseller_id)
        .single();

      if (resellerError || !resellerData) return null;
      return resellerData;
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
            checkResellerRole(session.user.id).then((resellerInfo) => {
              if (isMounted) {
                setReseller(resellerInfo);
                setIsReseller(!!resellerInfo);
                setLoading(false);
              }
            });
          }, 0);
        } else {
          setReseller(null);
          setIsReseller(false);
          setLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!isMounted) return;

      if (error) {
        setLoading(false);
        return;
      }

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        checkResellerRole(session.user.id).then((resellerInfo) => {
          if (isMounted) {
            setReseller(resellerInfo);
            setIsReseller(!!resellerInfo);
            setLoading(false);
          }
        });
      } else {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return { error };

    // Check if user is a reseller
    if (data.user) {
      const resellerInfo = await checkResellerRole(data.user.id);
      if (!resellerInfo) {
        await supabase.auth.signOut();
        return { error: { message: 'Unauthorized: Not a reseller' } };
      }
    }

    return { error: null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setReseller(null);
    setIsReseller(false);
  };

  return (
    <ResellerAuthContext.Provider value={{ user, session, reseller, loading, isReseller, login, logout }}>
      {children}
    </ResellerAuthContext.Provider>
  );
};
