/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { pestsData } from '../data/pests';
import { Bug, AlertTriangle, ShieldCheck, HeartHandshake, Phone, ArrowRight } from 'lucide-react';
import { PestInfo } from '../types';

interface PestIdentifierProps {
  onSelectPest: (pestId: 'wasp' | 'hornet' | 'unidentified') => void;
  onNavigate: (sectionId: string) => void;
}

export default function PestIdentifier({ onSelectPest, onNavigate }: PestIdentifierProps) {
  const [selectedId, setSelectedId] = useState('wasp');

  const activePest = pestsData.find((p) => p.id === selectedId) || pestsData[0];

  const handleSelectPestAction = (pest: PestInfo) => {
    if (pest.id === 'wasp') {
      onSelectPest('wasp');
      onNavigate('book');
    } else if (pest.id === 'hornet') {
      onSelectPest('hornet');
      onNavigate('book');
    } else {
      // Re-homing or conservation inquiry
      onSelectPest('unidentified');
      onNavigate('book');
    }
  };

  const getDangerBadge = (danger: string) => {
    switch (danger) {
      case 'Critical':
        return 'bg-red-500/10 text-red-500 border-red-500/30';
      case 'High':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/30';
      case 'Medium':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      default:
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30';
    }
  };

  return (
    <section id="pest-id" className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">
            Pest Diagnostics & Conservation Guide
          </h2>
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Is it a Wasp, Hornet, or Bee?
          </h3>
          <p className="mt-4 text-base text-slate-600 font-medium leading-relaxed">
            Many home and business owners struggle to identify black-and-yellow striped insects. Use our interactive guide to ensure you request the right service and protect vital pollinators.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-2xl mx-auto">
          {pestsData.map((pest) => (
            <button
              key={pest.id}
              onClick={() => setSelectedId(pest.id)}
              className={`flex-1 min-w-[140px] py-3 px-4 text-sm font-bold rounded-xl border text-center transition-all cursor-pointer ${
                selectedId === pest.id
                  ? 'bg-slate-900 border-slate-900 text-amber-500 shadow-md scale-[1.02]'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
              id={`tab-pest-${pest.id}`}
            >
              {pest.name}
            </button>
          ))}
        </div>

        {/* Diagnostic Panel */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Pest Summary Graphic */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-2xl flex flex-col justify-between border border-slate-800 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full filter blur-xl"></div>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${getDangerBadge(activePest.dangerLevel)}`}>
                  Danger level: {activePest.dangerLevel}
                </span>
                <Bug className="w-8 h-8 text-amber-500" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-white leading-none">{activePest.name}</h4>
                <p className="text-xs text-amber-500/80 font-mono italic mt-1.5">{activePest.scientificName}</p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                {activePest.description}
              </p>

              {/* Physical Accentuation Box */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Core Visual Tell:</span>
                <p className="text-xs text-slate-300 leading-normal font-medium">{activePest.appearance}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-3">
              {activePest.id === 'wasp' || activePest.id === 'hornet' ? (
                <div className="bg-red-500/10 p-2 rounded-lg text-red-500 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              ) : (
                <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-500 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              )}
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider leading-none">Status Recommendation</p>
                <p className="text-sm font-bold text-white mt-1">
                  {activePest.id === 'wasp' || activePest.id === 'hornet' ? 'Requires Eradication' : 'Requires Conservation'}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Behavior & Actions */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-8 rounded-2xl flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Row 1: Behavior */}
              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Behavioral Profile</h5>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {activePest.behavior}
                </p>
              </div>

              {/* Row 2: Crucial Advice */}
              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Safety Action Advice</h5>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {activePest.actionRequired}
                </p>
              </div>

              {/* Row 3: How We Handle */}
              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">How We Handle This</h5>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
                  <span className="bg-slate-200 text-slate-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded mt-0.5">
                    Our Method
                  </span>
                  <p className="text-xs text-slate-600 leading-normal font-medium">
                    {activePest.treatmentType}
                  </p>
                </div>
              </div>

            </div>

            {/* Actions Footer */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
              {activePest.id === 'wasp' || activePest.id === 'hornet' ? (
                <>
                  <button
                    onClick={() => handleSelectPestAction(activePest)}
                    className="w-full sm:flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                    id={`btn-diagnose-${activePest.id}`}
                  >
                    Request Professional Removal
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="tel:02088198627"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 border border-red-600 hover:bg-red-50 text-red-600 font-extrabold py-3.5 px-6 rounded-xl text-sm transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    Call Emergency Call-Out
                  </a>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleSelectPestAction(activePest)}
                    className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                    id={`btn-diagnose-${activePest.id}`}
                  >
                    <HeartHandshake className="w-4 h-4 shrink-0" />
                    Request Live Bee Relocation Survey
                  </button>
                  <div className="text-slate-500 text-xs font-semibold flex items-center gap-1.5 shrink-0">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>No Harm Guarantee</span>
                  </div>
                </>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
