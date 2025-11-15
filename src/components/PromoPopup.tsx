import React, { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';

interface PromoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromoPopup: React.FC<PromoPopupProps> = ({ isOpen, onClose }) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldShow(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setShouldShow(false);
    setTimeout(() => {
      onClose();
      // Store in localStorage to not show again for 7 days
      const hideUntil = new Date();
      hideUntil.setDate(hideUntil.getDate() + 7);
      localStorage.setItem('promoPopupHidden', hideUntil.getTime().toString());
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div 
        className={`bg-white rounded-[20px] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transition-all duration-700 ease-out ${
          shouldShow ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Desktop Layout */}
        <div className="hidden md:flex">
          {/* Left Content Section */}
          <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
            {/* Welcome Icon */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary to-primary-light rounded-full shadow-lg">
                <Gift className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
              Beställ en gratis provkorg
            </h2>

            {/* Body Text */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Upplev skillnaden med våra premiumprodukter utan någon som helst förpliktelse! 
              Vi erbjuder dig möjligheten att prova vårt kompletta sortiment med en gratis provkorg. 
              Vi är så övertygade om att du kommer att älska vår kvalitet och service att vi ger dig 
              denna riskfria chans att upptäcka det själv. Inga dolda avgifter, inga bindningstider—bara 
              en fantastisk upplevelse. Ta chansen idag och låt oss överträffa dina förväntningar!
            </p>

            {/* CTA Button */}
            <a
              href="/offertforfragan"
              onClick={handleClose}
              className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-xl shadow-[var(--shadow-button)] transition-all duration-300 hover:bg-[hsl(122_39%_44%)] hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Beställ Provperiod
            </a>
          </div>

          {/* Right Visual Section */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(120_60%_85%)] to-[hsl(120_50%_90%)] rounded-r-[20px]">
              {/* Decorative Elements */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Floating Circles */}
                <div className="absolute top-8 right-8 w-20 h-20 bg-white/30 rounded-full animate-float-enhanced-1"></div>
                <div className="absolute top-1/3 left-8 w-12 h-12 bg-white/20 rounded-full animate-float-enhanced-2"></div>
                <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-white/25 rounded-full animate-float-enhanced-3"></div>
                <div className="absolute bottom-8 left-12 w-8 h-8 bg-white/40 rounded-full animate-float-enhanced-4"></div>
                
                {/* Central Visual Element */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-float">
                    <Gift className="w-16 h-16 text-secondary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Visual Header */}
          <div className="relative h-32 bg-gradient-to-br from-[hsl(120_60%_85%)] to-[hsl(120_50%_90%)]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Gift className="w-8 h-8 text-secondary" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Headline */}
            <h2 className="text-2xl font-bold text-foreground mb-4 text-center">
              Beställ en gratis provkorg
            </h2>

            {/* Body Text */}
            <p className="text-muted-foreground leading-relaxed mb-6 text-center">
              Upplev skillnaden med våra premiumprodukter utan någon förpliktelse! 
              Vi erbjuder dig möjligheten att prova vårt kompletta sortiment med en gratis provkorg. 
              Inga dolda avgifter, inga bindningstider—bara en fantastisk upplevelse.
            </p>

            {/* CTA Button */}
            <a
              href="/offertforfragan"
              onClick={handleClose}
              className="block w-full text-center px-6 py-4 bg-secondary text-secondary-foreground font-semibold rounded-xl shadow-[var(--shadow-button)] transition-all duration-300 hover:bg-[hsl(122_39%_44%)] hover:shadow-lg active:scale-95"
            >
              Beställ Provperiod
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;