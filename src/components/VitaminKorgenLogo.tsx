import React from 'react';
import { Link } from 'react-router-dom';
import vitaminKorgenLogo from '@/assets/vitamin-korgen-logo.jpg';

interface VitaminKorgenLogoProps {
  size?: 'small' | 'medium' | 'large' | 'xl' | '2xl' | 'mega' | 'ultra';
  variant?: 'full' | 'icon' | 'horizontal';
  animated?: boolean;
  monochrome?: boolean;
  link?: string;
  className?: string;
}

const VitaminKorgenLogo: React.FC<VitaminKorgenLogoProps> = ({ 
  size = 'medium',
  variant = 'full',
  animated = false,
  monochrome = false,
  link,
  className = ""
}) => {
  const sizeClasses = {
    small: variant === 'horizontal' ? 'h-10 w-auto' : 'h-10 w-10',
    medium: variant === 'horizontal' ? 'h-16 w-auto' : 'h-16 w-16', 
    large: variant === 'horizontal' ? 'h-20 w-auto' : 'h-20 w-20',
    xl: variant === 'horizontal' ? 'h-32 w-auto' : 'h-32 w-32',
    '2xl': variant === 'horizontal' ? 'h-40 w-auto' : 'h-40 w-40',
    mega: variant === 'horizontal' ? 'h-24 w-auto md:h-32 lg:h-36' : 'h-24 w-24 md:h-32 md:w-32 lg:h-36 lg:w-36',
    ultra: variant === 'horizontal' ? 'h-56 w-auto md:h-64' : 'h-56 w-56 md:h-64 md:w-64'
  };

  const animationClasses = animated ? 'hover:scale-105 transition-transform duration-200' : '';
  const monochromeClasses = monochrome ? 'filter grayscale' : '';

  const logoElement = (
    <img
      src={vitaminKorgenLogo}
      alt="Vitamin Korgen - Fresh fruit delivery service"
      className={`${sizeClasses[size]} object-contain ${animationClasses} ${monochromeClasses} ${className}`}
    />
  );

  if (link) {
    return (
      <Link to={link} className="inline-block">
        {logoElement}
      </Link>
    );
  }

  return logoElement;
};

export default VitaminKorgenLogo;