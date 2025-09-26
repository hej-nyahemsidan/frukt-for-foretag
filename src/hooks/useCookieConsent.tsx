import { useState, useEffect } from 'react';

// Cookie categories
export type CookieCategory = 'necessary' | 'analytics' | 'marketing';

interface CookieSettings {
  necessary: boolean; // Always true, can't be disabled
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_SETTINGS: CookieSettings = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const CONSENT_COOKIE_NAME = 'cookie-consent';
const SETTINGS_COOKIE_NAME = 'cookie-settings';
const COOKIE_EXPIRY_DAYS = 365;

export const useCookieConsent = () => {
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>(DEFAULT_SETTINGS);
  const [showBanner, setShowBanner] = useState(false);

  // Cookie utility functions
  const setCookie = (name: string, value: string, days: number = COOKIE_EXPIRY_DAYS) => {
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

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  };

  // Set cookie only if consent allows it
  const setConsentCookie = (name: string, value: string, category: CookieCategory = 'necessary', days?: number) => {
    if (category === 'necessary' || cookieSettings[category]) {
      setCookie(name, value, days);
      return true;
    }
    return false;
  };

  // Initialize consent status on mount
  useEffect(() => {
    const consentStatus = getCookie(CONSENT_COOKIE_NAME);
    const savedSettings = getCookie(SETTINGS_COOKIE_NAME);

    if (consentStatus !== null) {
      setHasConsented(consentStatus === 'true');
      setShowBanner(false);
      
      if (savedSettings) {
        try {
          const settings = JSON.parse(savedSettings);
          setCookieSettings({ ...DEFAULT_SETTINGS, ...settings });
        } catch (e) {
          console.error('Failed to parse cookie settings:', e);
          setCookieSettings(DEFAULT_SETTINGS);
        }
      }
    } else {
      setHasConsented(null);
      setShowBanner(true);
    }
  }, []);

  // Accept all cookies
  const acceptAll = () => {
    const newSettings: CookieSettings = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    
    setCookie(CONSENT_COOKIE_NAME, 'true');
    setCookie(SETTINGS_COOKIE_NAME, JSON.stringify(newSettings));
    
    setHasConsented(true);
    setCookieSettings(newSettings);
    setShowBanner(false);
  };

  // Accept only necessary cookies
  const acceptNecessaryOnly = () => {
    const newSettings: CookieSettings = DEFAULT_SETTINGS;
    
    setCookie(CONSENT_COOKIE_NAME, 'true');
    setCookie(SETTINGS_COOKIE_NAME, JSON.stringify(newSettings));
    
    setHasConsented(true);
    setCookieSettings(newSettings);
    setShowBanner(false);

    // Remove any non-necessary cookies that might have been set
    cleanupNonNecessaryCookies();
  };

  // Update specific cookie settings
  const updateSettings = (newSettings: Partial<CookieSettings>) => {
    const updatedSettings = { ...cookieSettings, ...newSettings, necessary: true };
    
    setCookie(SETTINGS_COOKIE_NAME, JSON.stringify(updatedSettings));
    setCookieSettings(updatedSettings);
    
    // If disabling categories, clean up those cookies
    if (newSettings.analytics === false || newSettings.marketing === false) {
      cleanupNonNecessaryCookies();
    }
  };

  // Clean up non-necessary cookies when consent is withdrawn
  const cleanupNonNecessaryCookies = () => {
    // Remove Google Analytics cookies if present
    const gaCookies = ['_ga', '_ga_*', '_gid', '_gat_*'];
    gaCookies.forEach(pattern => {
      if (pattern.includes('*')) {
        // Handle wildcard patterns
        const prefix = pattern.replace('*', '');
        const cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
          const cookieName = cookie.split('=')[0].trim();
          if (cookieName.startsWith(prefix)) {
            deleteCookie(cookieName);
          }
        });
      } else {
        deleteCookie(pattern);
      }
    });
  };

  // Reset all consent (for testing or user request)
  const resetConsent = () => {
    deleteCookie(CONSENT_COOKIE_NAME);
    deleteCookie(SETTINGS_COOKIE_NAME);
    setHasConsented(null);
    setCookieSettings(DEFAULT_SETTINGS);
    setShowBanner(true);
  };

  return {
    hasConsented,
    cookieSettings,
    showBanner,
    acceptAll,
    acceptNecessaryOnly,
    updateSettings,
    resetConsent,
    setConsentCookie,
    getCookie,
    setCookie: (name: string, value: string, category: CookieCategory = 'necessary', days?: number) => 
      setConsentCookie(name, value, category, days),
  };
};