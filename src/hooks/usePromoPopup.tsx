import { useState, useEffect } from 'react';

export const usePromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup should be hidden
    const hiddenUntil = localStorage.getItem('promoPopupHidden');
    if (hiddenUntil) {
      const hiddenDate = new Date(parseInt(hiddenUntil));
      if (new Date() < hiddenDate) {
        return; // Still in hiding period
      }
    }

    let hasShown = false;
    let timeoutId: NodeJS.Timeout;

    // Show after 5 seconds
    const showAfterTime = () => {
      if (!hasShown) {
        setIsOpen(true);
        hasShown = true;
      }
    };

    // Show on 50% scroll
    const handleScroll = () => {
      if (hasShown) return;
      
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercent = scrollTop / (documentHeight - windowHeight);
      
      if (scrollPercent >= 0.5) {
        setIsOpen(true);
        hasShown = true;
        window.removeEventListener('scroll', handleScroll);
      }
    };

    // Set timeout for 5 seconds
    timeoutId = setTimeout(showAfterTime, 5000);

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  return { isOpen, closePopup };
};