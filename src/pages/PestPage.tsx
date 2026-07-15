/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { pestsData } from '../data/pests';
import BookingForm from '../components/BookingForm';
import { 
  ShieldCheck, Phone, ArrowLeft, CheckCircle2, 
  ChevronRight, Bug, AlertOctagon, Heart, HelpCircle, ShieldAlert 
} from 'lucide-react';

// @ts-ignore
import waspImg from '../assets/images/pest_wasp_guide_1784131088366.jpg';
// @ts-ignore
import hornetImg from '../assets/images/pest_hornet_guide_1784131099140.jpg';
// @ts-ignore
import honeybeeImg from '../assets/images/pest_honeybee_guide_1784131111132.jpg';
// @ts-ignore
import bumblebeeImg from '../assets/images/pest_bumblebee_guide_1784131123858.jpg';

const pestImages: Record<string, string> = {
  wasp: waspImg,
  hornet: hornetImg,
  honeybee: honeybeeImg,
  bumblebee: bumblebeeImg,
};

export default function PestPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pestId = id || 'wasp';
  const pest = pestsData.find((p) => p.id === pestId);

  useEffect(() => {
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  }, [pestId]);

  if (!pest) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md text-center shadow-lg space-y-6">
          <div className="bg-red-50 p-3 rounded-full w-14 h-14 mx-auto flex items-center justify-center text-red-500 border border-red-100">
            <AlertOctagon className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900">Pest Profile Not Found</h1>
            <p className="text-sm text-slate-600 font-semibold">
              We couldn't find a pest profile matching "{pestId}".
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-amber-500 font-bold px-6 py-3 rounded-xl text-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const isAggressive = pest.id === 'wasp' || pest.id === 'hornet';
  const isProtected = pest.id === 'honeybee' || pest.id === 'bumblebee';

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 pt-28">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-400">Pest Identifier Guides</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-black">{pest.name}</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16 relative overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full filter blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase">
                <Bug className="w-4 h-4 text-amber-500" />
                <span>Species: <strong className="text-white italic font-bold">{pest.scientificName}</strong></span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                {pest.name} Control & Guide
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-medium">
                {pest.description}
              </p>

              {/* Status Tags */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <span className={`font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 border ${
                  pest.dangerLevel === 'Critical' || pest.dangerLevel === 'High'
                    ? 'bg-red-500/10 border-red-500/20 text-red-500'
                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                }`}>
                  <ShieldAlert className="w-4 h-4" />
                  Danger Rating: {pest.dangerLevel}
                </span>

                {isProtected && (
                  <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5">
                    <Heart className="w-4 h-4" />
                    Eco-Conservation Priority (Beneficial Species)
                  </span>
                )}

                {isAggressive && (
                  <span className="bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Starting Price: £80.00 Eradication Flat Rate
                  </span>
                )}
              </div>
            </div>

            {/* Direct Callback Action Card */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 shadow-xl">
              <h3 className="font-extrabold text-white text-base">
                {isProtected ? 'Free Eco-Relocation Counsel' : 'Emergency Nest Extermination'}
              </h3>
              <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                {isProtected 
                  ? 'Do not harm them. Talk to our certified handlers for a safe relocation survey.' 
                  : 'Contact us for immediate dispatch. We will safely neutralise the colony today.'
                }
              </p>
              <a
                href="tel:02088198627"
                className={`block text-center rounded-xl p-4 transition-all shadow-lg text-white ${
                  isProtected 
                    ? 'bg-emerald-600 hover:bg-emerald-500' 
                    : 'bg-red-600 hover:bg-red-500'
                }`}
              >
                <span className="block text-[9px] font-bold text-slate-100 uppercase tracking-widest leading-none mb-1">
                  24/7 Response Line
                </span>
                <span className="text-xl font-black flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  020 8819 8627
                </span>
              </a>
              <span className="text-[10px] text-slate-500 font-bold block">
                {isProtected 
                  ? 'We support local bee-keeping associations and apiaries.' 
                  : '100% money-back eradication warranty is standard.'
                }
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Main Breakdown Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid md:grid-cols-12 gap-8 items-stretch">
            {/* Left Column Profile Grid */}
            <div className="md:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Identification & Biological Overview
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-xl space-y-2">
                  <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-amber-600">Appearance</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">{pest.appearance}</p>
                </div>

                <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-xl space-y-2">
                  <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-amber-600">Behavior</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">{pest.behavior}</p>
                </div>
              </div>

              <div className="bg-slate-950 text-white p-6 rounded-2xl space-y-3 border border-slate-800">
                <h4 className="font-black text-base text-amber-500 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5" />
                  Crucial Action Required
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
                  {pest.actionRequired}
                </p>
              </div>
            </div>

            {/* Right Column Action Plan Card & Photo */}
            <div className="md:col-span-5 flex flex-col gap-6">
              {/* Species Identification Image */}
              <div className="bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm relative h-56 sm:h-64">
                <img 
                  src={pestImages[pest.id]} 
                  alt={`High-resolution macro shot of a ${pest.name}`} 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-slate-950/70 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] text-white font-bold tracking-wide uppercase">
                  Macro ID Reference
                </div>
              </div>

              <div className={`border p-6 rounded-2xl flex flex-col justify-between flex-grow ${
                isProtected 
                  ? 'bg-emerald-50/40 border-emerald-200 text-emerald-950' 
                  : 'bg-red-50/30 border-red-200/80 text-red-950'
              }`}>
                <div className="space-y-4">
                  <h3 className="font-black text-slate-900 text-base">Treatment & Containment Strategy</h3>
                  <p className="text-xs leading-relaxed text-slate-600 font-semibold">
                    How we process {pest.name} detections in the field:
                  </p>

                  <div className="bg-white/80 p-4 rounded-xl border border-dashed border-slate-300/60 space-y-2 text-xs">
                    <span className="font-extrabold text-slate-900 uppercase text-[10px] tracking-wider block">Method Statement:</span>
                    <p className="text-slate-600 font-semibold leading-relaxed">
                      {pest.treatmentType}
                    </p>
                  </div>
                </div>

                {isProtected && (
                  <div className="bg-emerald-500 text-white p-4 rounded-xl border border-emerald-600 text-xs leading-normal mt-6">
                    <strong>Save The Bees Guarantee:</strong> We do NOT exterminate honeybees or bumblebees. If you request a callout and we identify them as beneficial bees, our certified specialists will provide safe, chemical-free rehoming solutions.
                  </div>
                )}

                {isAggressive && (
                  <div className="bg-amber-500 text-slate-950 p-4 rounded-xl font-bold text-xs leading-normal mt-6 shadow-md shadow-amber-500/10">
                    <strong>Eradication Lock:</strong> Standard treatment of a single wasp/hornet nest begins at only £80.00. We neutralize and apply a localized exclusion barrier to prevent future queen nesting.
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Embedded Booking Widget for Aggressive Pests */}
      {isAggressive && (
        <div className="py-12 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">
                Immediate Extermination Request
              </h2>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                Secure Same-Day Wasp Removal
              </h3>
              <p className="mt-2 text-sm text-slate-600 font-medium">
                Do not risk painful stings. Complete the details below, and our dispatchers will assign the nearest local technician immediately.
              </p>
            </div>
            <BookingForm prefilledPest={pestId === 'hornet' ? 'hornet' : 'wasp'} />
          </div>
        </div>
      )}

      {/* Embedded Booking Widget for Protected Pests (Coordinated as Survey request) */}
      {isProtected && (
        <div className="py-12 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">
                Relocation Coordination
              </h2>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                Request A Relocation Survey
              </h3>
              <p className="mt-2 text-sm text-slate-600 font-medium">
                Submit a request to coordinates a survey with our safe bee extraction specialists. Let's protect the ecosystem together.
              </p>
            </div>
            <BookingForm prefilledPest="unidentified" />
          </div>
        </div>
      )}

      {/* Directory of Pests for Inter-linking */}
      <section className="py-12 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-lg font-black text-slate-900">Check Other Insect Species Profiles</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {pestsData.map((item) => (
              <Link
                key={item.id}
                to={`/pest/${item.id}`}
                className={`p-4 rounded-xl border text-center transition-all flex flex-col justify-center items-center ${
                  item.id === pestId 
                    ? 'bg-amber-500 border-amber-500 text-slate-950 font-black' 
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 font-bold hover:shadow-sm'
                }`}
              >
                <span className="text-xs font-black block leading-tight">{item.name}</span>
                <span className="text-[10px] italic opacity-85 mt-1 leading-none">{item.scientificName}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
