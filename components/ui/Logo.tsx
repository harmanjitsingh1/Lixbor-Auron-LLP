import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'light', className = '' }) => {
  const isLight = variant === 'light';

  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 sm:gap-3.5 transition-opacity max-w-full ${className}`}>
      {/* Primary SVG Logo Symbol */}
      <div className="relative flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center shrink-0">
        <img
          src="/logo/logo-svg.svg"
          alt="Lixbor Auron LLP Logo"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Styled Wordmark */}
      <div className="flex flex-col min-w-0">
        <span className={`text-base sm:text-xl md:text-2xl font-bold tracking-[0.12em] sm:tracking-[0.18em] leading-none font-sans uppercase truncate ${isLight ? 'text-white' : 'text-slate-900'}`}>
          LIXBOR AURON <span className="text-emerald-500 font-extrabold">LLP</span>
        </span>
      </div>
    </Link>
  );
};
