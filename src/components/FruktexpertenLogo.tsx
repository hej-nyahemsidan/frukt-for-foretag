import React from 'react';

interface FruktexpertenLogoProps {
  className?: string;
}

const FruktexpertenLogo: React.FC<FruktexpertenLogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Image with responsive srcset */}
      <div className="relative">
        <img 
          src="/fruktexperten-logo.png"
          srcSet="/fruktexperten-logo.png 1024w, /fruktexperten-logo.png 2048w"
          sizes="(max-width: 600px) 160px, 260px"
          alt="FruktExperten — Fresh fruit export"
          className="w-10 h-10 md:w-12 md:h-12 object-contain site-logo"
          loading="eager"
          decoding="async"
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