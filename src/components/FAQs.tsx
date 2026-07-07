/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { faqs } from '../data/faqs';
import { ChevronDown, ChevronUp, ShieldCheck, Heart, Sparkles, PhoneCall } from 'lucide-react';

export default function FAQs() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'safety' | 'pricing' | 'process' | 'commercial'>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter((faq) => faq.category === activeCategory);

  const categories = [
    { label: 'All FAQs', value: 'all' },
    { label: 'Safety & Pets', value: 'safety' },
    { label: 'Rates & Guarantees', value: 'pricing' },
    { label: 'Removal Process', value: 'process' },
    { label: 'Commercial SLAs', value: 'commercial' }
  ];

  return (
    <section id="faqs" className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">
            Safety & Information Portal
          </h2>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h3>
          <p className="mt-3 text-sm text-slate-500 font-medium">
            Learn more about wasp nest lifecycle behaviours, our safe eco-certified insecticides, pet control parameters, and commercial response terms.
          </p>
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setActiveCategory(cat.value as any);
                setOpenFaqId(null);
              }}
              className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                activeCategory === cat.value
                  ? 'bg-slate-900 border-slate-900 text-amber-500 font-extrabold shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
              id={`tab-faq-${cat.value}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQs Accordion Block */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300"
                id={`faq-item-${faq.id}`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:bg-slate-50/50 transition-colors cursor-pointer"
                  id={`btn-faq-toggle-${faq.id}`}
                >
                  <span className="text-sm sm:text-base leading-tight font-black">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-amber-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold border-t border-slate-50 animate-slide-down">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Out of hours box */}
        <div className="mt-12 bg-amber-500/5 border border-amber-500/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-extrabold text-slate-900 text-sm">Have a different question or specific safety concern?</h4>
            <p className="text-xs text-slate-500 mt-1 font-semibold leading-relaxed">
              Our 24/7 central desk handlers can consult you on hive status, swarm dangers, and safe parameters.
            </p>
          </div>
          <a
            href="tel:02079460852"
            className="bg-slate-900 hover:bg-slate-800 text-amber-500 font-extrabold py-3 px-5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm shadow-slate-950/10 shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            Call Desk: 020 7946 0852
          </a>
        </div>

      </div>
    </section>
  );
}
