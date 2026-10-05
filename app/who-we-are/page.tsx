import React from 'react';
import type { Metadata } from 'next';
import { Timeline } from '../../components/sections/TimelineItem';
import { ProcessFlow } from '../../components/sections/ProcessFlow';
import { getWhoWeAreData } from '../../lib/sanity/data';
import { JsonLd } from '../../components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Who We Are | 1989 Foundations & Global Trading Platform',
  description:
    'Discover Lixbor Auron LLP: rooted in 1989 industrial manufacturing foundations and incorporated in 2026 as an agile physical commodity sourcing and supply platform.',
  keywords: [
    'Lixbor Auron LLP history',
    'Khanna Punjab commodity trading',
    'iron and steel heritage 1989',
    'physical trading model',
    'industrial sourcing process',
    'international trade compliance',
    'B2B commodities distributor India',
  ],
  alternates: {
    canonical: '/who-we-are',
  },
  openGraph: {
    title: 'Who We Are — Heritage & Sourcing Platform | Lixbor Auron LLP',
    description:
      'Rooted in 1989 industrial manufacturing foundations, Lixbor Auron LLP operates an agile, integrity-first international physical trading model.',
    url: '/who-we-are',
  },
};

export default async function WhoWeArePage() {
  const {
    hero,
    story,
    coreValues,
    vision,
    milestones,
    physicalTradingModel,
    sourcingProcess,
  } = await getWhoWeAreData();

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Who We Are — Lixbor Auron LLP',
    description:
      'Corporate heritage, core values, physical commodity trading methodology, and 5-step sourcing process of Lixbor Auron LLP.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Lixbor Auron LLP',
      foundingDate: '1989',
      description: story.paragraph1,
    },
  };

  return (
    <div className="space-y-0">
      <JsonLd data={aboutPageSchema} />

      {/* 1. Page Hero Banner (Extends to top: 0 behind transparent header) */}
      <section className="relative pt-36 sm:pt-44 pb-24 bg-[#070e17] text-white overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#070e17] to-[#070e17] opacity-90" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
            <span className="w-8 h-[1px] bg-emerald-500"></span>
            <span>{hero.kicker}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-tight font-sans">
            {hero.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl leading-relaxed">
            {hero.description}
          </p>
        </div>
      </section>

      {/* 2. Full Story */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 block">
                {story.kicker}
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-slate-900 leading-tight font-sans">
                {story.title.includes('2026') ? (
                  <>
                    {story.title.replace('2026 Platform', '').trim()} <br />
                    <span className="font-semibold">2026 Platform</span>
                  </>
                ) : (
                  story.title
                )}
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-base text-slate-600 font-light leading-relaxed">
              <p className="text-slate-900 font-normal">
                {story.paragraph1}
              </p>
              <p>{story.paragraph2}</p>
              <p>{story.paragraph3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 block">
              CORE VALUES
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold text-slate-900 leading-tight font-sans">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((val) => (
              <div key={val.id || val.title} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4 hover:border-emerald-500 transition-colors">
                <span className="text-xs font-mono text-emerald-600 font-bold uppercase tracking-widest block">
                  {val.title}
                </span>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Vision & Pillars */}
      <section className="py-24 bg-[#070e17] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 block">
              {vision.kicker}
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold text-white leading-tight font-sans">
              {vision.title}
            </h2>
            <p className="text-base text-slate-300 font-light">
              {vision.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {vision.pillars.map((pillar, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-3">
                <span className="text-xs font-mono text-emerald-400 font-bold">0{i + 1}</span>
                <h3 className="text-base font-bold text-white">{pillar.title}</h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Physical Trading Model & 5-Step Sourcing Process (from Sanity CMS) */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProcessFlow tradingModel={physicalTradingModel} sourcingSteps={sourcingProcess} />
        </div>
      </section>

      {/* 6. Journey Milestones */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 block">
              OUR JOURNEY
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold text-slate-900 leading-tight font-sans">
              Milestones & Growth
            </h2>
          </div>

          <Timeline milestones={milestones} />
        </div>
      </section>
    </div>
  );
}
