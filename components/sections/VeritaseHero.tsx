'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Slide {
  number: string;
  kicker: string;
  headlineTitle: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  localImage: string;
  fallbackImage: string;
}

const slides: Slide[] = [
  {
    number: '01',
    kicker: 'GLOBAL ALLIANCES',
    headlineTitle: 'Global Sourcing & Industrial Expertise',
    subtitle:
      'Long-term relationships founded on transparency, reliability, and mutual success with partners across the globe.',
    buttonText: 'EXPLORE',
    buttonLink: '/products',
    localImage: '/images/hero/hero-1.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=80',
  },
  {
    number: '02',
    kicker: 'CORE PRODUCTS',
    headlineTitle: 'Magnesium Oxide & Specialty Chemicals',
    subtitle:
      'Agricultural, feed, technical, and refractory grades sourced directly from verified international producers.',
    buttonText: 'EXPLORE PRODUCTS',
    buttonLink: '/products#mgo-focus',
    localImage: '/images/hero/hero-2.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1616886307848-7f6635699c43?auto=format&fit=crop&w=2000&q=80',
  },
  {
    number: '03',
    kicker: 'POLYMER SOLUTIONS',
    headlineTitle: 'High-Performance Polymers & Resins',
    subtitle:
      'XLPE compounds, semiconductive compounds, ABS, and LDPE engineered for electrical cable & industrial applications.',
    buttonText: 'OUR BUSINESS',
    buttonLink: '/products#polymers',
    localImage: '/images/hero/hero-1.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80',
  },
  {
    number: '04',
    kicker: 'INDUSTRY PIONEERS',
    headlineTitle: 'Excellence Through Industrial Expertise',
    subtitle:
      'A diverse team of industry leaders united by a shared commitment to operational excellence and sustainable growth.',
    buttonText: 'WHO WE ARE',
    buttonLink: '/who-we-are',
    localImage: '/images/hero/hero-2.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80',
  },
];

export const VeritaseHero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

  // Helper to handle image load errors and try alternative local extensions (.jpeg, .jpg, .png)
  const handleImageError = (basePath: string) => {
    if (basePath.endsWith('.jpeg')) {
      const altPath = basePath.replace('.jpeg', '.jpg');
      setFailedImages((prev) => ({ ...prev, [basePath]: true, [altPath]: false }));
    } else {
      setFailedImages((prev) => ({ ...prev, [basePath]: true }));
    }
  };

  return (
    <section className="relative h-screen min-h-screen w-full overflow-hidden bg-navy-950 text-white flex items-center">
      {/* Background Image Carousel with Vibrant Natural Overlay (Matching Reference Image 1) */}
      {slides.map((s, idx) => {
        const imageSrc = failedImages[s.localImage] ? s.fallbackImage : s.localImage;

        return (
          <div
            key={s.number}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image element with slow zoom animation */}
            <img
              src={imageSrc}
              alt={s.headlineTitle}
              onError={() => handleImageError(s.localImage)}
              className="absolute inset-0 h-full w-full object-cover object-center animate-hero-zoom scale-105"
            />
            {/* Reduced Vignette Overlay (Vibrant images matching reference image 1) */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-navy-950/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-transparent to-navy-950/20" />
          </div>
        );
      })}

      {/* Main Content Container with Retriggered Slide-Up Text Animation */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-20 sm:pt-28">
        <div key={currentSlide} className="max-w-4xl space-y-6 hero-text-shadow">
          {/* Veritase Line Kicker: ─── 01 / GLOBAL ALLIANCES */}
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200 animate-text-slide-up">
            <span className="w-8 h-[1px] bg-slate-300"></span>
            <span>{slide.number} / {slide.kicker}</span>
          </div>

          {/* Single-Line Display Headline (Clean Sans-Serif Typography matching Image 1) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight font-sans whitespace-nowrap max-w-full overflow-hidden text-ellipsis animate-text-slide-up animate-delay-1">
            {slide.headlineTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-200 font-light leading-relaxed max-w-2xl animate-text-slide-up animate-delay-2">
            {slide.subtitle}
          </p>

          {/* Veritase Circular Arrow Button: EXPLORE ( ↗ ) */}
          <div className="pt-4 flex items-center gap-4 animate-text-slide-up animate-delay-3">
            <Link href={slide.buttonLink} className="group inline-flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white group-hover:text-emerald-400 transition-colors">
                {slide.buttonText}
              </span>
              <span className="btn-circle-arrow group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-white">
                <span className="text-lg font-mono leading-none">↗</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Right Slide Progress Bar (── ── ── ──) */}
      <div className="absolute bottom-10 right-8 sm:right-16 z-20 flex items-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-[2px] transition-all duration-500 cursor-pointer ${
              idx === currentSlide ? 'w-12 bg-white' : 'w-6 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
