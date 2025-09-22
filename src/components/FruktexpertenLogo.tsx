import React from 'react';
import { Link } from 'react-router-dom';

interface FruktexpertenLogoProps {
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  link?: string;
  monochrome?: boolean;
  className?: string;
}

const FruktexpertenLogo: React.FC<FruktexpertenLogoProps> = ({
  size = 'medium',
  animated = false,
  link = '/',
  monochrome = false,
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-32 h-auto', // 128px - for footer
    medium: 'w-48 h-auto md:w-56', // 192px mobile, 224px desktop
    large: 'w-56 h-auto md:w-64' // 224px mobile, 256px desktop
  };

  const logoSvg = (
    <svg 
      viewBox="0 0 450 80" 
      className={`${sizeClasses[size]} transition-transform duration-300 hover:scale-105 cursor-pointer ${animated ? 'animate-fade-in' : ''} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="FRUKTEXPERTEN - Din fruktexpert"
    >
      <title>FRUKTEXPERTEN - Din fruktexpert</title>
      <defs>
        <linearGradient id={`logoGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={monochrome ? "#8BC34A" : "#8BC34A"} />
          <stop offset="50%" stopColor={monochrome ? "#8BC34A" : "#AED581"} />
          <stop offset="100%" stopColor={monochrome ? "#8BC34A" : "#DCE775"} />
        </linearGradient>
        <filter id={`shadow-${size}`}>
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2"/>
        </filter>
      </defs>
      
      <g transform="translate(25, 20)">
        {/* Layer 1 - Base */}
        <circle 
          cx="25" 
          cy="20" 
          r="18" 
          fill={monochrome ? "#8BC34A" : "#DCE775"} 
          opacity={monochrome ? "0.3" : "0.4"} 
        />
        
        {/* Layer 2 - Mid circles */}
        <circle 
          cx="20" 
          cy="18" 
          r="12" 
          fill={monochrome ? "#8BC34A" : "#AED581"} 
          opacity={monochrome ? "0.5" : "0.6"} 
          filter={`url(#shadow-${size})`} 
        />
        <circle 
          cx="30" 
          cy="18" 
          r="12" 
          fill={monochrome ? "#8BC34A" : "#AED581"} 
          opacity={monochrome ? "0.5" : "0.6"} 
          filter={`url(#shadow-${size})`} 
        />
        
        {/* Layer 3 - Top circles */}
        <circle 
          cx="18" 
          cy="20" 
          r="8" 
          fill={monochrome ? "#8BC34A" : "#8BC34A"} 
          opacity={monochrome ? "0.7" : "0.8"} 
        />
        <circle 
          cx="25" 
          cy="14" 
          r="8" 
          fill={monochrome ? "#8BC34A" : "#8BC34A"} 
          opacity={monochrome ? "0.7" : "0.8"}
          className={animated ? "animate-pulse" : ""} 
        />
        <circle 
          cx="32" 
          cy="20" 
          r="8" 
          fill={monochrome ? "#8BC34A" : "#8BC34A"} 
          opacity={monochrome ? "0.7" : "0.8"} 
        />
        
        {/* Center highlight */}
        <circle 
          cx="25" 
          cy="18" 
          r="10" 
          fill="none" 
          stroke={`url(#logoGradient-${size})`} 
          strokeWidth="2" 
          opacity="0.7" 
        />
      </g>
      
      <text 
        x="95" 
        y="48" 
        fontFamily="Inter, Arial, sans-serif" 
        fontSize="40" 
        fontWeight="700" 
        fill={monochrome ? "#8BC34A" : `url(#logoGradient-${size})`} 
        letterSpacing="0.5"
      >
        FRUKTEXPERTEN
      </text>
    </svg>
  );

  if (link) {
    return (
      <Link 
        to={link} 
        className="inline-block p-3 hover:opacity-90 transition-opacity duration-200"
        aria-label="Gå till startsidan"
      >
        {logoSvg}
      </Link>
    );
  }

  return <div className="inline-block p-3">{logoSvg}</div>;
};

export default FruktexpertenLogo;