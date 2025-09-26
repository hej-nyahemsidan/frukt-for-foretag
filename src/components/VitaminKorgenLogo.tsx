import React from 'react';
import { Link } from 'react-router-dom';
import vitaminKorgenLogo from '@/assets/vitamin-korgen-logo.jpg';

interface VitaminKorgenLogoProps {
  size?: 'small' | 'medium' | 'large';
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
    small: 'h-8 w-8',
    medium: 'h-12 w-12', 
    large: 'h-16 w-16'
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