'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../ui/Logo';
import { Icon } from '../ui/Icons';
import { mainNavLinks } from '../../lib/content/company';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent py-5">
      {/* Veritase Top Utility Bar */}
      <div className="border-b border-white/15 pb-2 mb-3 hidden md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-end gap-8 text-[11px] font-medium tracking-[0.18em] text-slate-300 uppercase">
          <Link href="/who-we-are" className="hover:text-white transition-colors">
            Company Profile
          </Link>
          <a href="#" className="hover:text-white transition-colors">
            LinkedIn
          </a>
          <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
            <span>EN</span>
            <span className="text-[9px]">▼</span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo variant="light" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-10">
            {mainNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`veritase-nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Button: GET QUOTE */}
          <div className="hidden md:flex items-center">
            <Link href="/contact" className="btn-veritase-outline">
              GET QUOTE
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 rounded-lg p-2.5 text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay & Slide-Down Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-navy-950/98 backdrop-blur-xl flex flex-col justify-between p-6 pt-24 animate-in fade-in-0 duration-200">
          <div className="flex flex-col space-y-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400 border-b border-white/10 pb-2">
              Navigation Menu
            </div>
            {mainNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-semibold uppercase tracking-[0.15em] transition-colors ${
                    isActive ? 'text-emerald-400 pl-2 border-l-2 border-emerald-400' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-veritase-outline w-full text-center justify-center py-3 text-xs"
            >
              GET QUOTE
            </Link>
            <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-widest pt-2">
              <span>Lixbor Auron LLP</span>
              <span>2026</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
