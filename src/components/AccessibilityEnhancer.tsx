import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Type, Minus, Plus } from 'lucide-react';

const AccessibilityEnhancer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(100);

  useEffect(() => {
    // Load saved preferences
    const savedContrast = localStorage.getItem('high-contrast') === 'true';
    const savedFontSize = parseInt(localStorage.getItem('font-size') || '100');
    
    setHighContrast(savedContrast);
    setFontSize(savedFontSize);
    
    // Apply saved settings
    if (savedContrast) {
      document.documentElement.classList.add('high-contrast');
    }
    document.documentElement.style.fontSize = `${savedFontSize}%`;
  }, []);

  const toggleHighContrast = () => {
    const newContrast = !highContrast;
    setHighContrast(newContrast);
    
    if (newContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    localStorage.setItem('high-contrast', newContrast.toString());
  };

  const adjustFontSize = (direction: 'increase' | 'decrease') => {
    const step = 10;
    const min = 80;
    const max = 150;
    
    let newSize = fontSize;
    if (direction === 'increase' && fontSize < max) {
      newSize = fontSize + step;
    } else if (direction === 'decrease' && fontSize > min) {
      newSize = fontSize - step;
    }
    
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
    localStorage.setItem('font-size', newSize.toString());
  };

  return (
    <>
      {/* Accessibility Toggle Button */}
      <Button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 bg-primary hover:bg-primary/90 text-white shadow-lg"
        aria-label="Tillgänglighetsverktyg"
        title="Tillgänglighetsverktyg"
      >
        <Eye className="w-5 h-5" />
      </Button>

      {/* Accessibility Panel */}
      {isVisible && (
        <div className="fixed bottom-20 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-64">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Tillgänglighet</h3>
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
              aria-label="Stäng tillgänglighetsverktyg"
            >
              <EyeOff className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {/* High Contrast Toggle */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Hög kontrast</span>
              <Button
                onClick={toggleHighContrast}
                variant={highContrast ? "default" : "outline"}
                size="sm"
                className="h-8"
              >
                <Type className="w-3 h-3" />
              </Button>
            </div>
            
            {/* Font Size Adjustment */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Textstorlek</span>
              <div className="flex gap-1">
                <Button
                  onClick={() => adjustFontSize('decrease')}
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled={fontSize <= 80}
                  aria-label="Minska textstorlek"
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="text-xs self-center w-8 text-center">{fontSize}%</span>
                <Button
                  onClick={() => adjustFontSize('increase')}
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled={fontSize >= 150}
                  aria-label="Öka textstorlek"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* High Contrast Styles */}
      <style>{`
        .high-contrast {
          filter: contrast(150%) brightness(100%);
        }
        
        .high-contrast * {
          background-color: white !important;
          color: black !important;
          border-color: black !important;
        }
        
        .high-contrast img {
          filter: contrast(120%);
        }
      `}</style>
    </>
  );
};

export default AccessibilityEnhancer;