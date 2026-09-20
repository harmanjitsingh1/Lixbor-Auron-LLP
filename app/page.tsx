import React from 'react';
import Link from 'next/link';
import { VeritaseHero } from '../components/sections/VeritaseHero';
import { VeritaseCards } from '../components/sections/VeritaseCards';
import { FAQSection } from '../components/sections/FAQSection';
import { getHomePageData, getFaqData } from '../lib/sanity/data';

export default async function HomePage() {
  const [homeData, faqs] = await Promise.all([
    getHomePageData(),
    getFaqData(),
  ]);

  const { essenceSection, peopleSection } = homeData;

  return (
    <div className="space-y-0">
      {/* 1. Veritase Fullscreen Hero Carousel */}
      <VeritaseHero slides={homeData.heroSlides} />

      {/* 2. "The Essence of Who We Are" (Veritase Screenshot 3 exact layout) */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Title & Story Paragraphs */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 block">
                {essenceSection.kicker}
              </span>
              <h2 className="text-4xl sm:text-5xl font-light text-slate-900 leading-tight">
                {essenceSection.title.includes('Who We Are') ? (
                  <>
                    {essenceSection.title.replace('Who We Are', '').trim()}{' '}
                    <span className="font-serif-italic font-normal">Who We Are</span>
                  </>
                ) : (
                  essenceSection.title
                )}
              </h2>
              <div className="space-y-4 text-base text-slate-600 font-light leading-relaxed">
                <p>{essenceSection.paragraph1}</p>
                <p>{essenceSection.paragraph2}</p>
              </div>
            </div>

            {/* Right Column: Interactive Link Rows with Arrows (Veritase Screenshot 3) */}
            <div className="lg:col-span-6 border-t border-slate-200 lg:border-t-0">
              <div className="divide-y divide-slate-200">
                {essenceSection.rowLinks.map((link, idx) => (
                  <Link key={idx} href={link.href} className="veritase-row-link group">
                    <span>{link.title}</span>
                    <span className="text-slate-400 group-hover:text-emerald-500 font-mono transition-colors">↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "Driving Value Across Markets" (4 Tall Cards Grid - Veritase Screenshot 3) */}
      <VeritaseCards cards={homeData.valueCards} />

      {/* 4. "Our People & Leadership" (Veritase Screenshot 3 exact layout) */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 block">
                {peopleSection.kicker}
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-slate-900 leading-tight">
                {peopleSection.title.includes('&') ? (
                  <>
                    {peopleSection.title.split('&')[0].trim()}{' '}
                    <span className="font-serif-italic font-normal">& {peopleSection.title.split('&')[1].trim()}</span>
                  </>
                ) : (
                  peopleSection.title
                )}
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-base text-slate-600 font-light leading-relaxed">
              <p className="text-slate-900 font-normal">
                {peopleSection.paragraph1}
              </p>
              <p>{peopleSection.paragraph2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions Section */}
      <FAQSection
        badge="FAQS & INFORMATION"
        title="Any questions?"
        subtitle="Key insights into our commodities, commercial process, quality standards, and sourcing foundation."
        items={faqs}
      />
    </div>
  );
}
