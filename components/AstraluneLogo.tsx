
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AstraluneLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-24 h-24'
  };

  return (
    <div className={`${sizes[size]} border-4 border-black bg-astral flex items-center justify-center neo-shadow transform transition-transform group-hover:scale-110 ${className}`}>
      <div className="w-3/4 h-3/4 bg-white border-2 border-black flex items-center justify-center">
        <div className="w-1/2 h-1/2 bg-astral rounded-full"></div>
      </div>
    </div>
  );
};
