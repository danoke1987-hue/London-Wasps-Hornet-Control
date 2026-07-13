/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { testimonials } from '../data/testimonials';
import { Star, ShieldCheck, Quote, CheckCircle2, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Reviews() {
  const { t } = useLanguage();
  const [filterType, setFilterType] = useState<'All' | 'Residential' | 'Commercial'>('All');

  const filteredReviews = filterType === 'All'
    ? testimonials
    : testimonials.filter((t) => t.clientType === filterType);

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trustpilot & Rating Highlights */}
        <div className="grid lg:grid-cols-3 gap-8 items-center mb-16 border-b border-slate-100 pb-12">
          
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              {t('reviews.title')}
            </h2>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">
              Loved by Londoners
            </h3>
            <p className="text-sm text-slate-500 font-medium">
              {t('reviews.subtitle')}
            </p>
          </div>

          {/* Trust gauges */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center justify-around text-center">
            <div>
              <span className="block text-3xl font-extrabold text-slate-900">4.9</span>
              <div className="flex justify-center my-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4.5 h-4.5 fill-current" />
                ))}
              </div>
              <span className="block text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                Trustpilot Score
              </span>
            </div>
            <div className="h-10 w-px bg-slate-200"></div>
            <div>
              <span className="block text-3xl font-extrabold text-slate-900">100%</span>
              <div className="flex justify-center my-1 text-emerald-500">
                <CheckCircle2 className="w-4.5 h-4.5" />
              </div>
              <span className="block text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                Eradication Guarantee
              </span>
            </div>
          </div>

          {/* Industry certs */}
          <div className="flex items-center justify-center lg:justify-end gap-6 text-slate-400">
            <div className="text-center space-y-1">
              <ShieldCheck className="w-8 h-8 text-slate-400 mx-auto" />
              <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500">
                £5M Liability
              </span>
            </div>
            <div className="text-center space-y-1">
              <Award className="w-8 h-8 text-slate-400 mx-auto" />
              <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500">
                BPCA Standard
              </span>
            </div>
          </div>

        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-1.5 scrollbar-none">
          {['All', 'Residential', 'Commercial'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type as any)}
              className={`py-2 px-5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                filterType === type
                  ? 'bg-slate-900 border-slate-900 text-amber-500 font-extrabold'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
              id={`filter-review-${type.toLowerCase()}`}
            >
              {type} Clients
            </button>
          ))}
        </div>

        {/* Reviews Carousel Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
              id={`review-card-${testimonial.id}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-white text-slate-600 font-bold px-2.5 py-1 rounded-md border border-slate-200/60 shadow-inner">
                    {testimonial.clientType}
                  </span>
                  <div className="flex text-amber-500">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-3 -left-3 w-8 h-8 text-slate-200/60 pointer-events-none -z-0" />
                  <p className="text-sm text-slate-600 leading-relaxed font-semibold relative z-10 italic">
                    "{testimonial.comment}"
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-extrabold text-slate-950">{testimonial.name}</h4>
                  <p className="text-slate-400 mt-0.5 font-medium">{testimonial.location}</p>
                </div>
                <span className="text-slate-400 font-mono font-bold">{testimonial.pestType}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
