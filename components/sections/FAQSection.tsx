'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { faqList, FAQItem } from '../../lib/content/faq';

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  showSearch?: boolean;
  showCategoryBadge?: boolean;
  limit?: number;
  className?: string;
  items?: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  title = "Frequently Asked Questions",
  subtitle = "Find clear answers regarding our commercial operations, commodity sourcing, quality standards, and trade processes.",
  badge = "KNOWLEDGE BASE & FAQS",
  showSearch = false,
  showCategoryBadge = true,
  limit,
  className = "py-20 bg-slate-50 border-t border-slate-200",
  items = faqList,
}) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredItems = items.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query) ||
      (item.category && item.category.toLowerCase().includes(query))
    );
  });

  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Title Section */}
        <div className="max-w-3xl space-y-4 mb-12">
          {badge && (
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              <span className="w-8 h-[1px] bg-emerald-500"></span>
              <span>{badge}</span>
            </div>
          )}
          <h2 className="text-3xl sm:text-5xl font-light text-slate-900 leading-tight">
            {title.includes('&') ? (
              title
            ) : (
              <>
                {title.split(' ')[0]} <span className="font-serif-italic font-normal">{title.split(' ').slice(1).join(' ')}</span>
              </>
            )}
          </h2>
          {subtitle && (
            <p className="text-base text-slate-600 font-light leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Optional Search Bar */}
        {showSearch && (
          <div className="max-w-2xl mb-10">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions by keyword or topic..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Accordion List */}
        {displayedItems.length > 0 ? (
          <div className="divide-y divide-slate-200 border-t border-b border-slate-200 bg-white rounded-2xl shadow-sm overflow-hidden">
            {displayedItems.map((item, index) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id || index} className="transition-colors hover:bg-slate-50/50">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full text-left py-6 px-6 sm:px-8 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4 text-left">
                      <span className="font-mono text-xs font-semibold text-emerald-600 tracking-wider">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-lg sm:text-xl font-medium text-slate-900 leading-snug">
                        {item.question}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {showCategoryBadge && item.category && (
                        <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wider uppercase bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">
                          {item.category}
                        </span>
                      )}
                      <div
                        className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 transition-transform duration-200 ${
                          isOpen ? 'bg-emerald-50 text-emerald-600 border-emerald-300 rotate-180' : 'bg-white'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 sm:px-8 pb-6 pl-14 sm:pl-16 text-slate-600 font-light text-base leading-relaxed animate-fadeIn space-y-3">
                      <p>{item.answer}</p>
                      {item.id === 'inquiries' || item.id === 'quotation-process' ? (
                        <div className="pt-2">
                          <Link href="/contact" className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-emerald-600 hover:text-emerald-700 gap-1">
                            <span>Submit a commercial inquiry</span>
                            <span className="font-mono">→</span>
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
            <p className="text-slate-600">No questions found matching &quot;{searchQuery}&quot;.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-semibold text-emerald-600 hover:underline uppercase tracking-wider"
            >
              Reset Search Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
