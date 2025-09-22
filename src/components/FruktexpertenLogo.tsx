import React from 'react';

interface FruktexpertenLogoProps {
  className?: string;
}

const FruktexpertenLogo: React.FC<FruktexpertenLogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Image */}
      <div className="relative">
        <img 
          src="/fruktexperten-logo.png" 
          alt="Fruktexperten Logo" 
          className="w-10 h-10 md:w-12 md:h-12 object-contain"
        />
      </div>
      
      {/* Text */}
      <div className="flex-shrink-0">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground tracking-tight leading-none">
          Frukt<span className="text-primary">experten</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5 font-medium hidden md:block">
          Professionella fruktleveranser
        </p>
      </div>
    </div>
  );
};

export default FruktexpertenLogo;