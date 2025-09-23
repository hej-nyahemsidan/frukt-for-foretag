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

    // Show after 10 seconds as fallback
    const showAfterTime = () => {
      if (!hasShown) {
        console.log('Popup showing after timeout');
        setIsOpen(true);
        hasShown = true;
      }
    };

    // Show on 15% scroll (reduced from 25%)
    const handleScroll = () => {
      if (hasShown) return;
      
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercent = scrollTop / (documentHeight - windowHeight);
      
      console.log('Scroll percent:', scrollPercent);
      
      if (scrollPercent >= 0.15) {
        console.log('Popup showing after scroll');
        setIsOpen(true);
        hasShown = true;
        window.removeEventListener('scroll', handleScroll);
      }
    };

    // Set timeout for 10 seconds as fallback
    timeoutId = setTimeout(showAfterTime, 10000);

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