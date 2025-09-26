import React from 'react';
import { Link } from 'react-router-dom';
import vitaminKorgenLogo from '@/assets/vitamin-korgen-logo.jpg';

interface VitaminKorgenLogoProps {
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  link?: string;
  className?: string;
}

const VitaminKorgenLogo: React.FC<VitaminKorgenLogoProps> = ({
  size = 'medium',
  animated = false,
  link = '/',
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-32 h-auto', // 128px - for footer
    medium: 'w-48 h-auto md:w-56', // 192px mobile, 224px desktop
    large: 'w-56 h-auto md:w-64' // 224px mobile, 256px desktop
  };

  const logoImg = (
    <img 
      src={vitaminKorgenLogo}
      alt="Vitamin Korgen - Din fruktexpert"
      className={`${sizeClasses[size]} transition-transform duration-300 hover:scale-105 cursor-pointer ${animated ? 'animate-fade-in' : ''} ${className}`}
    />
  );

  if (link) {
    return (
      <Link 
        to={link} 
        className="inline-block p-3 hover:opacity-90 transition-opacity duration-200"
        aria-label="Gå till startsidan"
      >
        {logoImg}
      </Link>
    );
  }

  return <div className="inline-block p-3">{logoImg}</div>;
};

export default VitaminKorgenLogo;