import React from 'react';

interface FruktexpertenLogoProps {
  className?: string;
}

const FruktexpertenLogo: React.FC<FruktexpertenLogoProps> = ({ className = '' }) => {
  return (
    <div className={`${className}`}>
      <img 
        src="/fruktexperten-logo.png?v=2"
        srcSet="/fruktexperten-logo.png?v=2 1024w, /fruktexperten-logo.png?v=2 2048w"
        sizes="(max-width: 600px) 200px, 320px"
        alt="FruktExperten — Fresh fruit export"
        className="h-16 md:h-20 lg:h-24 w-auto object-contain site-logo"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default FruktexpertenLogo;