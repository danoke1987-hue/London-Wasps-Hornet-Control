/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FloatingCallButton() {
  const { t } = useLanguage();

  return (
    <a
      href="tel:02088198627"
      id="floating-mobile-call-button"
      className="lg:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-3.5 rounded-full font-black text-sm tracking-wide shadow-2xl active:scale-95 transition-all duration-200 border border-red-500/30 group"
      aria-label="Call Emergency Dispatcher 24/7"
    >
      {/* Pulse Outer Ring */}
      <span className="absolute -inset-0.5 rounded-full bg-red-500/40 animate-ping pointer-events-none" />
      
      {/* Local Live Status Indicator */}
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
      </span>

      {/* Phone Icon */}
      <Phone className="w-4 h-4 text-white animate-wiggle group-hover:rotate-12 transition-transform duration-200 shrink-0" />
      
      {/* Label */}
      <span className="uppercase tracking-wider select-none leading-none whitespace-nowrap">
        {t('nav.callNow')}
      </span>
    </a>
  );
}
