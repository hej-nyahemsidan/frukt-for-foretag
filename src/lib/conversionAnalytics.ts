import { supabase } from '@/integrations/supabase/client';

export type ConversionEventName =
  | 'basket_selector_viewed'
  | 'basket_selected'
  | 'employee_count_selected'
  | 'price_viewed'
  | 'quote_started'
  | 'quote_submitted';

interface ConversionEventData {
  basketType?: string | null;
  employeeCount?: number | null;
  price?: number | null;
  metadata?: Record<string, string | number | boolean | null>;
}

const SESSION_KEY = 'vk-analytics-session';

const analyticsAllowed = () => {
  if (typeof document === 'undefined') return false;
  const settingsCookie = document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith('cookie-settings='));
  if (!settingsCookie) return false;

  try {
    const value = decodeURIComponent(settingsCookie.split('=').slice(1).join('='));
    return JSON.parse(value).analytics === true;
  } catch {
    return false;
  }
};

const getSessionId = () => {
  const existing = sessionStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const sessionId = crypto.randomUUID();
  sessionStorage.setItem(SESSION_KEY, sessionId);
  return sessionId;
};

export const trackConversionEvent = async (eventName: ConversionEventName, data: ConversionEventData = {}) => {
  if (!analyticsAllowed()) return;

  const { error } = await supabase.from('conversion_events').insert({
    session_id: getSessionId(),
    event_name: eventName,
    basket_type: data.basketType ?? null,
    employee_count: data.employeeCount ?? null,
    price: data.price ?? null,
    page_path: window.location.pathname,
    metadata: data.metadata ?? {},
  });

  if (error) console.error('Kunde inte registrera anonym konverteringshändelse:', error);
};
