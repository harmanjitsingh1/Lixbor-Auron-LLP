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

  // Close mobile menu whenever pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent py-5">
      {/* Top Utility Bar (Desktop only) */}
      <div className="border-b border-white/15 pb-2 mb-3 hidden md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-end gap-8 text-[11px] font-medium tracking-[0.18em] text-slate-300 uppercase">
          <Link href="/who-we-are" className="hover:text-white transition-colors">
            Company Profile
          </Link>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="shrink min-w-0">
            <Logo variant="light" />
          </div>

          {/* Desktop Nav & Action Button (Grouped on the right side) */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
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

            <Link href="/contact" className="btn-veritase-outline">
              GET QUOTE
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden shrink-0 relative z-50 rounded-lg p-2.5 text-white hover:bg-white/10 active:bg-white/20 transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle Mobile Navigation"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#070e17] text-white flex flex-col justify-between p-6 pt-24 min-h-screen overflow-y-auto">
          <div className="flex flex-col space-y-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400 border-b border-white/10 pb-3">
              Navigation Menu
            </div>
            {mainNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xl font-semibold uppercase tracking-[0.15em] py-1 transition-colors ${
                    isActive ? 'text-emerald-400 pl-3 border-l-2 border-emerald-400' : 'text-slate-200 hover:text-white'
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
              className="btn-veritase-outline w-full text-center justify-center py-3.5 text-xs font-semibold tracking-[0.2em]"
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
