import { CompanyDetails } from '../types';

export const companyData: CompanyDetails = {
  name: 'Lixbor Auron LLP',
  legalName: 'LIXBOR AURON LLP',
  tagline: 'Global Sourcing. Industrial Expertise. Reliable Supply.',
  subTagline: 'Import • Export • Trading • Sourcing • Supply',
  incorporatedYear: '2026',
  foundationYear: '1989',
  country: 'India',
  journeyTagline: '1989 Foundations · 2026 Platform · Global Ambition',
  visionTagline: 'Build → Expand → Globalize',
  placeholders: {
    registeredOffice: '[Registered Office Address]',
    llpin: '[LLPIN]',
    email: '[Email Address]',
    iec: '[IEC Code]',
    phone: '[Phone Number]',
    gstin: '[GSTIN]',
    website: '[Website URL]',
  },
};

export const mainNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'Who We Are', href: '/who-we-are' },
  { name: 'Our Products', href: '/products' },
];

export const footerLegalLinks = [
  { name: 'Terms & Conditions', href: '/terms-and-conditions' },
  { name: 'Privacy Notice', href: '/privacy-notice' },
];
