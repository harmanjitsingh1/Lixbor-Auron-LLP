import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HashScrollHandler } from '../components/ui/HashScrollHandler';
import { JsonLd } from '../components/seo/JsonLd';
import { getSiteSettings } from '../lib/sanity/data';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['italic', 'normal'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lixborauron.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Lixbor Auron LLP | Global Commodities & Industrial Trading',
    template: '%s | Lixbor Auron LLP',
  },
  description:
    'Premier international trading platform connecting industrial markets with essential raw materials: Magnesium Oxide (MgO Agri, Feed & Tech grades), fertilizers, industrial chemicals, and engineering polymers.',
  keywords: [
    'Lixbor Auron LLP',
    'Magnesium Oxide supplier',
    'MgO supplier India',
    'MgO Agricultural Grade',
    'MgO Feed Grade',
    'MgO Technical Grade',
    'Urea trading India',
    'Technical Grade Urea',
    'Automotive DEF AdBlue Urea',
    'Granular Sulphur supplier',
    'Melamine supplier India',
    'XLPE compounds',
    'LDPE trading',
    'HDPE supplier',
    'ABS polymer',
    'international commodity trading India',
    'industrial chemical sourcing',
    'B2B physical commodities trading',
    'Khanna Punjab commodities trader',
  ],
  authors: [{ name: 'Lixbor Auron LLP', url: siteUrl }],
  creator: 'Lixbor Auron LLP',
  publisher: 'Lixbor Auron LLP',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Lixbor Auron LLP | Global Sourcing. Industrial Expertise. Reliable Supply.',
    description:
      'Premier international trading house supplying Magnesium Oxide (MgO), fertilizers, chemicals, and engineering polymers.',
    url: siteUrl,
    siteName: 'Lixbor Auron LLP',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/hero/hero-1.webp',
        width: 1920,
        height: 1080,
        alt: 'Lixbor Auron LLP — Global Commodities & Industrial Trading',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lixbor Auron LLP | Global Commodities & Industrial Trading',
    description:
      'International sourcing and supply of Magnesium Oxide (MgO), fertilizers, chemicals, and polymers.',
    images: ['/images/hero/hero-1.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logo/logo-svg.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/logo/logo-svg.svg',
    apple: '/images/logo/logo-png.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { companyData, mainNavLinks, footerLegalLinks } = await getSiteSettings();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: companyData.name,
    legalName: companyData.legalName,
    url: siteUrl,
    logo: `${siteUrl}/images/logo/logo-png.png`,
    description:
      'Global independent commodities trading house specializing in Magnesium Oxide (MgO), fertilizers, industrial chemicals, and polymers.',
    foundingDate: companyData.foundationYear,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyData.placeholders.registeredOffice,
      addressLocality: 'Khanna',
      addressRegion: 'Punjab',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: companyData.placeholders.phone,
      contactType: 'sales',
      email: companyData.placeholders.email,
      availableLanguage: ['English', 'Hindi', 'Punjabi'],
    },
    sameAs: [
      'https://www.linkedin.com',
    ],
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: companyData.name,
    description: companyData.tagline,
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
  };

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <JsonLd data={[organizationSchema, webSiteSchema]} />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-slate-900 font-sans antialiased">
        <HashScrollHandler />
        <Header navLinks={mainNavLinks} />
        <main className="flex-1">{children}</main>
        <Footer company={companyData} navLinks={mainNavLinks} legalLinks={footerLegalLinks} />
      </body>
    </html>
  );
}
