/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CostEstimate } from '../types';
import { HelpCircle, ShieldCheck, CheckSquare, Sparkles, BookOpen, Calculator, Info } from 'lucide-react';

interface CalculatorProps {
  onEstimateChange: (estimate: CostEstimate & { propertyType: 'residential' | 'commercial'; nestCount: number; urgency: 'standard' | 'emergency'; location: 'low' | 'high' }) => void;
  onNavigate: (sectionId: string) => void;
}

export default function CostCalculator({ onEstimateChange, onNavigate }: CalculatorProps) {
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');
  const [nestCount, setNestCount] = useState<number>(1);
  const [locationHeight, setLocationHeight] = useState<'low' | 'high'>('low');
  const [urgency, setUrgency] = useState<'standard' | 'emergency'>('standard');

  const [estimate, setEstimate] = useState<CostEstimate>({
    basePrice: 80,
    additionalNestCharge: 0,
    urgencySurcharge: 0,
    commercialSurcharge: 0,
    total: 80,
    isGuaranteed: true
  });

  // Calculate pricing
  useEffect(() => {
    const base = propertyType === 'residential' ? 80 : 110;
    const additionalCharge = (nestCount - 1) * 30;
    const heightSurcharge = locationHeight === 'high' ? 40 : 0;
    const urgencyCharge = urgency === 'emergency' ? 45 : 0;
    const total = base + additionalCharge + heightSurcharge + urgencyCharge;

    const newEstimate = {
      basePrice: base,
      additionalNestCharge: additionalCharge,
      urgencySurcharge: urgencyCharge + heightSurcharge, // grouped for simplicity in the type
      commercialSurcharge: propertyType === 'commercial' ? 35 : 0, // already integrated in base
      total,
      isGuaranteed: true
    };

    setEstimate(newEstimate);
    onEstimateChange({
      ...newEstimate,
      propertyType,
      nestCount,
      urgency,
      location: locationHeight
    });
  }, [propertyType, nestCount, locationHeight, urgency]);

  return (
    <section id="estimator" className="py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3">
            Instant Quote & Rate Calculator
          </h2>
          <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Transparent Pricing, No Hidden Extras
          </h3>
          <p className="mt-4 text-base text-slate-400 font-medium">
            We believe in honest, upfront pricing. Use our interactive estimator to compute an accurate quote for your specific situation. Lock in this rate by booking directly.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch max-w-5xl mx-auto">
          
          {/* Controls - Left side */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800/80 p-6 sm:p-8 rounded-2xl space-y-8">
            
            {/* Control 1: Property Type */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-widest block">
                1. Select Property Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPropertyType('residential')}
                  className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all text-center cursor-pointer ${
                    propertyType === 'residential'
                      ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                  id="calc-prop-residential"
                >
                  Residential
                </button>
                <button
                  onClick={() => setPropertyType('commercial')}
                  className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all text-center cursor-pointer ${
                    propertyType === 'commercial'
                      ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                  id="calc-prop-commercial"
                >
                  Commercial
                </button>
              </div>
            </div>

            {/* Control 2: Number of Nests */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                  2. Number of Wasp/Hornet Nests
                </label>
                <span className="text-xs text-amber-500 font-bold bg-amber-500/10 px-2.5 py-1 rounded">
                  Each Extra Nest Only +£30
                </span>
              </div>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => setNestCount(num)}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm border transition-all cursor-pointer ${
                      nestCount === num
                        ? 'bg-slate-100 border-slate-100 text-slate-950'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                    id={`calc-nest-${num}`}
                  >
                    {num === 4 ? '4+ Nests' : `${num} ${num === 1 ? 'Nest' : 'Nests'}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Altitude/Location */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-widest block">
                3. Nest Location & Altitude
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setLocationHeight('low')}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    locationHeight === 'low'
                      ? 'bg-slate-100 border-slate-100 text-slate-900'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                  id="calc-height-low"
                >
                  <span className="block font-bold text-sm leading-none">Reachable / Standard</span>
                  <span className={`block text-[11px] mt-1 font-medium ${locationHeight === 'low' ? 'text-slate-500' : 'text-slate-400'}`}>
                    Ground/1st Floor, reachable with standard tools (e.g. Garden, Loft with ladders, shed)
                  </span>
                </button>
                <button
                  onClick={() => setLocationHeight('high')}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    locationHeight === 'high'
                      ? 'bg-slate-100 border-slate-100 text-slate-900'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                  id="calc-height-high"
                >
                  <span className="block font-bold text-sm leading-none flex items-center justify-between">
                    High Reach (+£40)
                  </span>
                  <span className={`block text-[11px] mt-1 font-medium ${locationHeight === 'high' ? 'text-slate-500' : 'text-slate-400'}`}>
                    Roof height, requires high-reach extendable lances, chimney pots, high guttering or scaffolding.
                  </span>
                </button>
              </div>
            </div>

            {/* Control 4: Dispatch Urgency */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-widest block">
                4. Select Urgency Status
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setUrgency('standard')}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    urgency === 'standard'
                      ? 'bg-slate-100 border-slate-100 text-slate-900'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                  id="calc-urgency-standard"
                >
                  <span className="block font-bold text-sm leading-none">Standard Dispatch (+£0)</span>
                  <span className={`block text-[11px] mt-1 font-medium ${urgency === 'standard' ? 'text-slate-500' : 'text-slate-400'}`}>
                    Same-day or next-day flexible slot. Standard business hours response.
                  </span>
                </button>
                <button
                  onClick={() => setUrgency('emergency')}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    urgency === 'emergency'
                      ? 'bg-slate-100 border-slate-100 text-slate-900'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                  id="calc-urgency-emergency"
                >
                  <span className="block font-bold text-sm leading-none flex items-center justify-between text-red-600 font-extrabold">
                    Emergency 24/7 (+£45)
                  </span>
                  <span className={`block text-[11px] mt-1 font-medium ${urgency === 'emergency' ? 'text-slate-500' : 'text-slate-400'}`}>
                    Rapid 1-hour dispatch. Guaranteed late night, weekend, or bank holiday call-out.
                  </span>
                </button>
              </div>
            </div>

          </div>

          {/* Receipt Summary Card - Right side */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
                <Calculator className="w-5 h-5 text-amber-500" />
                <h4 className="font-extrabold text-sm uppercase tracking-widest text-white">Quotation Receipt</h4>
              </div>

              {/* Receipt Breakdown */}
              <div className="space-y-4 font-semibold text-sm">
                
                {/* Line 1: Base */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">
                    Base {propertyType === 'residential' ? 'Residential' : 'Commercial'} Fee:
                  </span>
                  <span className="text-white font-mono">
                    £{propertyType === 'residential' ? 80 : 110}.00
                  </span>
                </div>

                {/* Line 2: Additional Nests */}
                {nestCount > 1 && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">
                      Additional Nests ({nestCount - 1} × £30):
                    </span>
                    <span className="text-white font-mono">
                      +£{(nestCount - 1) * 30}.00
                    </span>
                  </div>
                )}

                {/* Line 3: Location High-Reach */}
                {locationHeight === 'high' && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Roof / High-Reach Access:</span>
                    <span className="text-white font-mono">+£40.00</span>
                  </div>
                )}

                {/* Line 4: Urgency Emergency */}
                {urgency === 'emergency' && (
                  <div className="flex items-center justify-between">
                    <span className="text-red-400">Emergency Call-Out:</span>
                    <span className="text-red-400 font-mono">+£45.00</span>
                  </div>
                )}

                <div className="border-t border-dashed border-slate-800 my-4"></div>

                {/* Total Line */}
                <div className="flex items-end justify-between">
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Estimated Total Price
                    </span>
                    <span className="text-slate-300 text-xs mt-1 block">Includes UK VAT & RAMS</span>
                  </div>
                  <span className="text-3xl font-black text-amber-500 font-mono leading-none">
                    £{estimate.total}.00
                  </span>
                </div>

              </div>

              {/* Guarantees Box */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Eradication Guarantee Included</span>
                </div>
                <p className="text-slate-400 leading-normal">
                  If any wasps survive the treated nest 48 hours post-treatment, we will return and re-treat the area completely free of charge.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => onNavigate('book')}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-4 rounded-xl text-base transition-all active:scale-95 text-center block cursor-pointer"
                id="btn-calc-proceed"
              >
                Book This Rate Online
              </button>
              <div className="text-center">
                <span className="text-[11px] text-slate-500 font-semibold flex items-center justify-center gap-1">
                  <Info className="w-3.5 h-3.5" />
                  Your quoted rate is locked for the next 48 hours
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
