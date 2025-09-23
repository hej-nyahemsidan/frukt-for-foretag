import { useState, useEffect } from 'react';

export const usePromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forcePromo = params.get('showPromo') === '1';

    // Force show via ?showPromo=1 (ignores hidden state)
    if (forcePromo) {
      setIsOpen(true);
      return;
    }

    // Check if popup should be hidden (skip if forced)
    const hiddenUntil = localStorage.getItem('promoPopupHidden');
    if (hiddenUntil) {
      const hiddenDate = new Date(parseInt(hiddenUntil));
      if (new Date() < hiddenDate) {
        return; // Still in hiding period
      }
    }

    let hasShown = false;

    // Show on 25% scroll
    const handleScroll = () => {
      if (hasShown) return;
      
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const denom = documentHeight - windowHeight;
      if (denom <= 0) return; // no scrollable area => do not show
      const scrollPercent = scrollTop / denom;
      
      if (scrollPercent >= 0.25) {
        setIsOpen(true);
        hasShown = true;
        window.removeEventListener('scroll', handleScroll);
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  return { isOpen, closePopup };
};