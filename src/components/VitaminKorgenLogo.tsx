import React from 'react';
import { Link } from 'react-router-dom';
import vitaminKorgenLogo from '@/assets/vitamin-korgen-new-logo.jpg';

interface VitaminKorgenLogoProps {
  size?: 'small' | 'medium' | 'large' | 'header' | 'xl' | '2xl';
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
    small: variant === 'horizontal' ? 'h-10 w-auto max-w-full' : 'h-10 w-auto max-w-full',
    medium: variant === 'horizontal' ? 'h-16 w-auto max-w-full' : 'h-16 w-auto max-w-full', 
    large: variant === 'horizontal' ? 'h-20 w-auto max-w-full' : 'h-20 w-auto max-w-full',
    header: variant === 'horizontal' ? 'h-24 w-auto max-w-full' : 'h-24 w-auto max-w-full',
    xl: variant === 'horizontal' ? 'h-32 w-auto max-w-full' : 'h-32 w-auto max-w-full',
    '2xl': variant === 'horizontal' ? 'h-40 w-auto max-w-full' : 'h-40 w-auto max-w-full'
  };

  const animationClasses = animated ? 'hover:scale-105 transition-transform duration-200' : '';
  const monochromeClasses = monochrome ? 'filter grayscale' : '';

  const logoElement = (
    <img
      src={vitaminKorgenLogo}
      alt="Vitamin Korgen - Fresh fruit delivery service"
      className={`${sizeClasses[size]} object-cover object-center ${animationClasses} ${monochromeClasses} ${className}`}
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