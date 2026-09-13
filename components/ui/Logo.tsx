import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'light', className = '' }) => {
  const isLight = variant === 'light';

  return (
    <Link href="/" className={`group inline-flex items-center gap-3 transition-opacity ${className}`}>
      {/* Veritase Geometric Polygon Gem Icon (Teal/Emerald Green) */}
      <div className="relative flex h-8 w-8 items-center justify-center">
        <svg viewBox="0 0 100 100" className="h-full w-full fill-emerald-500 transition-transform duration-300 group-hover:scale-105">
          <polygon points="50,5 95,30 95,70 50,95 5,70 5,30" fill="none" stroke="#10b981" strokeWidth="6" />
          <polygon points="50,15 80,35 50,55 20,35" fill="#10b981" opacity="0.85" />
          <polygon points="50,55 80,35 80,75 50,90" fill="#059669" />
          <polygon points="50,55 20,35 20,75 50,90" fill="#047857" />
        </svg>
      </div>

      {/* Styled Wordmark (Veritase exact aesthetic) */}
      <div className="flex flex-col">
        <span className={`text-lg sm:text-xl font-bold tracking-[0.18em] leading-none font-sans uppercase ${isLight ? 'text-white' : 'text-slate-900'}`}>
          LIXBOR AURON <span className="text-emerald-500 font-extrabold">LLP</span>
        </span>
      </div>
    </Link>
  );
};
