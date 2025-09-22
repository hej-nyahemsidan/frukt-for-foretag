import React from 'react';
import { Link } from 'react-router-dom';

interface FruktPortalenLogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'full' | 'icon' | 'horizontal';
  animated?: boolean;
  monochrome?: boolean;
  link?: string;
  className?: string;
}

const FruktPortalenLogo: React.FC<FruktPortalenLogoProps> = ({
  size = 'medium',
  variant = 'full',
  animated = false,
  monochrome = false,
  link = '/',
  className = ''
}) => {
  const sizeClasses = {
    small: variant === 'horizontal' ? 'w-32 h-auto' : 'w-24 h-auto',
    medium: variant === 'horizontal' ? 'w-48 h-auto md:w-56' : 'w-40 h-auto md:w-48',
    large: variant === 'horizontal' ? 'w-56 h-auto md:w-64' : 'w-56 h-auto md:w-72'
  };

  const logoIcon = (
    <svg 
      viewBox="0 0 100 100" 
      className={`${animated ? 'animate-fade-in' : ''} transition-transform duration-300 hover:scale-105`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="FruktPortalen portal icon"
    >
      <defs>
        <linearGradient id={`portalGradient-${size}-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={monochrome ? "#52C234" : "#52C234"} />
          <stop offset="50%" stopColor={monochrome ? "#52C234" : "#FF7043"} />
          <stop offset="100%" stopColor={monochrome ? "#52C234" : "#6B46C1"} />
        </linearGradient>
        <linearGradient id={`portalGlow-${size}-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#52C234" opacity="0.3" />
          <stop offset="50%" stopColor="#FF7043" opacity="0.5" />
          <stop offset="100%" stopColor="#6B46C1" opacity="0.3" />
        </linearGradient>
        <linearGradient id={`textGradient-${size}-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2D5016" />
          <stop offset="30%" stopColor="#52C234" />
          <stop offset="70%" stopColor="#7ED321" />
          <stop offset="100%" stopColor="#A4E635" />
        </linearGradient>
        <filter id={`glow-${size}-${variant}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer portal ring */}
      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        fill="none" 
        stroke={`url(#portalGradient-${size}-${variant})`} 
        strokeWidth="3"
        opacity="0.6"
      />
      
      {/* Portal gateway - geometric shapes */}
      <g transform="translate(50, 50)">
        {/* Left portal pillar */}
        <rect 
          x="-35" 
          y="-25" 
          width="8" 
          height="50" 
          fill={monochrome ? "#52C234" : `url(#portalGradient-${size}-${variant})`}
          opacity="0.8"
          className={animated ? "animate-pulse" : ""}
        />
        
        {/* Right portal pillar */}
        <rect 
          x="27" 
          y="-25" 
          width="8" 
          height="50" 
          fill={monochrome ? "#52C234" : `url(#portalGradient-${size}-${variant})`}
          opacity="0.8"
          className={animated ? "animate-pulse" : ""}
        />
        
        {/* Top arch - geometric */}
        <path 
          d="M -27 -25 L 27 -25 L 20 -35 L -20 -35 Z" 
          fill={monochrome ? "#52C234" : `url(#portalGradient-${size}-${variant})`}
          opacity="0.9"
        />
        
        {/* Central portal energy - hexagon */}
        <polygon 
          points="0,-15 13,-7.5 13,7.5 0,15 -13,7.5 -13,-7.5" 
          fill={monochrome ? "#52C234" : "#FF7043"}
          opacity="0.7"
          className={animated ? "animate-pulse" : ""}
          filter={animated ? `url(#glow-${size}-${variant})` : ""}
        />
        
        {/* Inner energy rings */}
        <circle 
          cx="0" 
          cy="0" 
          r="20" 
          fill="none" 
          stroke={monochrome ? "#52C234" : "#6B46C1"} 
          strokeWidth="2" 
          opacity="0.4"
          strokeDasharray="5,3"
          className={animated ? "animate-spin" : ""}
          style={animated ? { animationDuration: '4s' } : {}}
        />
        
        <circle 
          cx="0" 
          cy="0" 
          r="30" 
          fill="none" 
          stroke={`url(#portalGlow-${size}-${variant})`}
          strokeWidth="1" 
          opacity="0.3"
        />
      </g>
    </svg>
  );

  const logoText = (
    <div className="text-center">
      <div className="font-bold tracking-wide">
        <span 
          className="font-extrabold"
          style={{ 
            background: `url(#textGradient-${size}-${variant})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Frukt
        </span>
        <span 
          className="font-semibold"
          style={{ 
            background: `url(#textGradient-${size}-${variant})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Portalen
        </span>
      </div>
    </div>
  );

  const logoHorizontal = (
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0" style={{ width: '40px', height: '40px' }}>
        {logoIcon}
      </div>
      <div className="font-bold tracking-wide text-lg">
        <span 
          className="font-extrabold"
          style={{ 
            background: `url(#textGradient-${size}-${variant})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Frukt
        </span>
        <span 
          className="font-semibold"
          style={{ 
            background: `url(#textGradient-${size}-${variant})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Portalen
        </span>
      </div>
    </div>
  );

  const renderLogo = () => {
    if (variant === 'icon') {
      return logoIcon;
    } else if (variant === 'horizontal') {
      return logoHorizontal;
    } else {
      // Full version (stacked)
      return (
        <div className="flex flex-col items-center space-y-2">
          <div style={{ width: size === 'small' ? '60px' : size === 'medium' ? '80px' : '100px' }}>
            {logoIcon}
          </div>
          <svg width="0" height="0">
            <defs>
              <linearGradient id={`textGradient-${size}-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2D5016" />
                <stop offset="30%" stopColor="#52C234" />
                <stop offset="70%" stopColor="#7ED321" />
                <stop offset="100%" stopColor="#A4E635" />
              </linearGradient>
            </defs>
          </svg>
          {logoText}
        </div>
      );
    }
  };

  const logoElement = (
    <div className={`${sizeClasses[size]} transition-all duration-300 hover:opacity-90 cursor-pointer ${className}`}>
      {renderLogo()}
    </div>
  );

  if (link) {
    return (
      <Link 
        to={link} 
        className="inline-block p-3 hover:opacity-90 transition-opacity duration-200"
        aria-label="Gå till startsidan - FruktPortalen"
      >
        {logoElement}
      </Link>
    );
  }

  return <div className="inline-block p-3">{logoElement}</div>;
};

export default FruktPortalenLogo;