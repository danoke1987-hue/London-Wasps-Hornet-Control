/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Flame, Clock, Bug, CheckCircle2, ChevronRight, Phone, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onCheckPostcode: (postcode: string) => void;
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onCheckPostcode, onNavigate }: HeroProps) {
  const { t } = useLanguage();
  const [postcode, setPostcode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postcode.trim()) {
      onCheckPostcode(postcode);
      onNavigate('coverage');
    }
  };

  const guarantees = [
    t('hero.guarantee'),
    t('hero.certified'),
    t('hero.insurance'),
    t('stats.safetyVal')
  ];

  return (
    <section id="hero" className="relative bg-slate-950 text-white pt-36 pb-20 overflow-hidden">
      {/* Decorative Grid Overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25"></div>

      {/* Decorative Radial Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-red-600/10 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-amber-500/30 px-3 py-1.5 rounded-full text-amber-500 text-xs sm:text-sm font-semibold tracking-wide uppercase select-none shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              {t('hero.tag')}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              {t('hero.title')}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-medium">
              {t('hero.subtitle')}
            </p>

            {/* Core Selling Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0">
              {guarantees.map((g, index) => (
                <div key={index} className="flex items-center gap-2.5 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="text-sm font-semibold">{g}</span>
                </div>
              ))}
            </div>

            {/* Hero CTA Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="tel:02088198627"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white font-black px-8 py-4 rounded-xl text-lg shadow-xl shadow-red-900/30 hover:shadow-red-600/40 transition-all active:scale-95"
                id="hero-call-now"
              >
                <Phone className="w-5 h-5 animate-bounce" />
                {t('hero.btnCall')}
              </a>
              <button
                onClick={() => onNavigate('estimator')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all active:scale-95 cursor-pointer"
                id="hero-get-quote"
              >
                {t('hero.btnBook')}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Accreditation Badges */}
            <div className="pt-4 border-t border-slate-900 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-400 text-xs font-semibold">
              <span className="uppercase tracking-widest text-slate-500">Trusted By Standards:</span>
              <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>BPCA Registered</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                <Award className="w-4 h-4 text-amber-500" />
                <span>CEPA Certified</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-500" />
                <span>£5m Public Liability</span>
              </div>
            </div>
          </div>

          {/* Hero Right Widget - Postcode Check & Quick Callout */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 to-red-600 opacity-20 blur-lg"></div>
            
            <div className="relative bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                  <Clock className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{t('coverage.title')}</h3>
                  <p className="text-xs text-slate-400 font-medium">{t('coverage.subtitle')}</p>
                </div>
              </div>

              {/* Quick Postcode Checker Form */}
              <form onSubmit={handleSubmit} className="space-y-4" id="hero-postcode-form">
                <div>
                  <label htmlFor="hero-postcode-input" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    {t('coverage.placeholder')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="hero-postcode-input"
                      placeholder="e.g. SW11"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      className="w-full bg-slate-950 text-white border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3.5 text-base font-bold tracking-widest placeholder:text-slate-600 focus:ring-1 focus:ring-amber-500 uppercase outline-none"
                      required
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-1.5 rounded-lg text-xs tracking-wider uppercase transition-colors"
                    >
                      {t('coverage.btnCheck')}
                    </button>
                  </div>
                </div>

                <div className="text-center py-2 text-slate-500 text-xs">
                  - OR CALL US IMMEDIATELY FOR DIRECT ASSISTANCE -
                </div>

                <a
                  href="tel:02088198627"
                  className="block text-center bg-slate-950 border border-red-600 hover:border-red-500 rounded-xl p-4 transition-all group"
                >
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Emergency Call Handler Line
                  </span>
                  <span className="text-xl font-black text-red-500 flex items-center justify-center gap-2 group-hover:text-red-400">
                    <Phone className="w-5 h-5 shrink-0" />
                    020 8819 8627
                  </span>
                </a>

                <div className="bg-slate-950 p-3 rounded-lg flex items-start gap-2.5 border border-slate-950">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-400 leading-normal">
                    <strong>Our Strict Promise:</strong> If your insect swarm turns out to be beneficial bees, we provide free relocation counsel and do not charge standard termination fees. We protect your garden ecosystem.
                  </p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
