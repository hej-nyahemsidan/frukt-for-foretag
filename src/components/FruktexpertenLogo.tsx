import React from 'react';

interface FruktexpertenLogoProps {
  className?: string;
}

const FruktexpertenLogo: React.FC<FruktexpertenLogoProps> = ({ className = '' }) => {
  return (
    <div className={`${className}`}>
      <img 
        src="/fruktexperten-logo.png"
        srcSet="/fruktexperten-logo.png 1024w, /fruktexperten-logo.png 2048w"
        sizes="(max-width: 600px) 160px, 260px"
        alt="FruktExperten — Fresh fruit export"
        className="h-12 md:h-16 w-auto object-contain site-logo"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default FruktexpertenLogo;