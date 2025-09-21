import React from 'react';

interface FruktexpertenLogoProps {
  className?: string;
}

const FruktexpertenLogo: React.FC<FruktexpertenLogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <div className="relative">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-accent-green rounded-xl flex items-center justify-center shadow-soft">
          {/* Orange Icon */}
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="md:w-7 md:h-7">
            {/* Gradient definition */}
            <defs>
              <radialGradient id="orangeGradient" cx="0.3" cy="0.3" r="0.8">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="hsl(var(--accent-orange))" />
                <stop offset="100%" stopColor="#e6670a" />
              </radialGradient>
            </defs>
            {/* Orange body - perfect circle */}
            <circle
              cx="14"
              cy="15"
              r="9"
              fill="url(#orangeGradient)"
            />
            {/* Small leaf on top */}
            <ellipse
              cx="14"
              cy="6"
              rx="2"
              ry="1"
              fill="hsl(var(--accent-green))"
            />
            {/* Small stem */}
            <rect
              x="13.7"
              y="5"
              width="0.6"
              height="2"
              fill="#8B4513"
              rx="0.3"
            />
          </svg>
        </div>
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