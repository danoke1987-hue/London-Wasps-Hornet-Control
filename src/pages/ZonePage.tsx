/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { coverageData } from '../data/postcodes';
import CostCalculator from '../components/Calculator';
import BookingForm from '../components/BookingForm';
import { CostEstimate } from '../types';
import { 
  ShieldCheck, MapPin, Truck, Timer, Users, Phone, 
  ArrowLeft, CheckCircle2, ChevronRight, MessageSquare, AlertTriangle 
} from 'lucide-react';

export default function ZonePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const zoneId = (id || '').toUpperCase();
  const zone = coverageData[zoneId];

  // State for prefilling estimates
  const [prefilledEstimates, setPrefilledEstimates] = useState<{
    propertyType: 'residential' | 'commercial';
    nestCount: number;
    urgency: 'standard' | 'emergency';
    location: 'low' | 'high';
    total: number;
  } | undefined>(undefined);

  useEffect(() => {
    // Scroll to top when zone changes
    window.scrollTo(0, 0);
  }, [zoneId]);

  if (!zone) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md text-center shadow-lg space-y-6">
          <div className="bg-red-50 p-3 rounded-full w-14 h-14 mx-auto flex items-center justify-center text-red-500 border border-red-100">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900">Area Not Found</h1>
            <p className="text-sm text-slate-600 font-semibold">
              We couldn't find a coverage zone with prefix "{zoneId}". We cover all of London and surrounding M25 counties.
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

  const handleEstimateChange = (est: CostEstimate & { propertyType: 'residential' | 'commercial'; nestCount: number; urgency: 'standard' | 'emergency'; location: 'low' | 'high' }) => {
    setPrefilledEstimates({
      propertyType: est.propertyType,
      nestCount: est.nestCount,
      urgency: est.urgency,
      location: est.location,
      total: est.total
    });
  };

  const handleNavigateLocal = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarOffset = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Generate some representative postcodes for this region to show local relevance
  const samplePostcodes = [
    `${zoneId}1`, `${zoneId}2`, `${zoneId}3`, `${zoneId}4`, `${zoneId}5`, `${zoneId}12`
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 pt-28">
      {/* Localized Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-400">Coverage Areas</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-black">{zone.region}</span>
        </div>
      </div>

      {/* Localized Hero Header */}
      <section className="bg-slate-950 text-white py-16 relative overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full filter blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-slate-900 border border-amber-500/30 px-3 py-1.5 rounded-full text-amber-500 text-xs sm:text-sm font-semibold tracking-wide uppercase select-none">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Local Regional Dispatch Active in {zoneId}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                Wasp & Hornet Nest Removal in <span className="text-amber-500">{zone.region}</span> ({zoneId})
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-medium">
                Fast, professional, and fully guaranteed wasp nest treatments for residential and commercial spaces across the {zone.region} sector. Operating 24/7 with emergency 1-hour response times.
              </p>

              {/* Quick Regional Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center lg:text-left">
                  <div className="text-amber-500 mb-1 flex justify-center lg:justify-start">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500">Local Hub</span>
                  <span className="block text-xs font-black text-white mt-0.5 leading-tight">{zone.hub}</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center lg:text-left">
                  <div className="text-amber-500 mb-1 flex justify-center lg:justify-start">
                    <Timer className="w-5 h-5" />
                  </div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500">Avg Response</span>
                  <span className="block text-xs font-black text-white mt-0.5">{zone.responseTime} Minutes</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center lg:text-left">
                  <div className="text-amber-500 mb-1 flex justify-center lg:justify-start">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500">Local Techs</span>
                  <span className="block text-xs font-black text-white mt-0.5">{zone.techs} On Call 24/7</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center lg:text-left">
                  <div className="text-amber-500 mb-1 flex justify-center lg:justify-start">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500">Rates From</span>
                  <span className="block text-xs font-black text-amber-500 mt-0.5">£80.00 Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Quick Call Out Widget */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 shadow-xl">
              <h3 className="font-extrabold text-white text-base">Speak To Your Local Dispatcher</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Connect directly with our {zoneId} regional control room to book an immediate same-day technician visit.
              </p>
              <a
                href="tel:02088198627"
                className="block text-center bg-red-600 hover:bg-red-500 text-white rounded-xl p-4 transition-all"
              >
                <span className="block text-[9px] font-bold text-slate-100 uppercase tracking-widest leading-none mb-1">
                  {zone.region} 24h Line
                </span>
                <span className="text-xl font-black flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  020 8819 8627
                </span>
              </a>
              <span className="text-[10px] text-slate-500 font-bold block">
                • 100% Secure Free Callback • Standard Rates Apply •
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Localized Details Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Local Context Content */}
            <div className="md:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Premium Wasp Eradication For Residential & Commercial Premises in {zone.region}
              </h2>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                With a dedicated regional hub at the <strong>{zone.hub}</strong>, we are positioned to address emergency wasp or hornet nests within the M25 ring in under {zone.responseTime} minutes. Whether you are dealing with a wasp swarm in a residential attic, wall cavities, bird boxes, commercial restaurant terraces, or warehouse rafters, our BPCA certified specialists are fully equipped to neutralize the risk instantly.
              </p>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-3">
                <h4 className="font-black text-slate-900 text-sm">Full Postcode Coverage in this Sector:</h4>
                <p className="text-xs text-slate-600 leading-normal font-semibold">
                  We provide continuous coverage across all <strong>{zoneId}</strong> outcode zones. Our technicians are regularly dispatched directly to the following local neighborhoods:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {samplePostcodes.map((pc) => (
                    <span key={pc} className="bg-white border border-slate-200 text-slate-700 font-bold text-xs px-2.5 py-1 rounded">
                      {pc} area
                    </span>
                  ))}
                  <span className="bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs px-2.5 py-1 rounded">
                    + All {zoneId} Areas
                  </span>
                </div>
              </div>
            </div>

            {/* Quality Seals */}
            <div className="md:col-span-5 bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
              <h3 className="font-black text-slate-950 text-base">Our Service Standards in {zoneId}</h3>
              
              <ul className="space-y-3.5 text-xs text-slate-700 font-semibold">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">£80.00 Base Rate</strong>
                    Flat, transparent pricing for basic residential nest treatment. No hidden M25 surcharges.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">100% Eradication Guarantee</strong>
                    If wasps or hornets survive the treated nest 48 hours post-visit, we return and re-treat completely free.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">Eco-Safe Conservation</strong>
                    We do not kill honeybees or bumblebees. Safe live honeybee extraction and relocation to apiaries is standard.
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Integrated Cost Estimator Calculator for Zone */}
      <CostCalculator onEstimateChange={handleEstimateChange} onNavigate={handleNavigateLocal} />

      {/* Localized Booking Intake Form */}
      <div id="book" className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">
              Intake Desk — {zone.region}
            </h2>
            <h3 className="text-3xl font-black text-slate-950 tracking-tight">
              Request Your Treatment Booking
            </h3>
            <p className="mt-2 text-sm text-slate-600 font-medium">
              Ready to clear your wasp hazard? Please complete the intake details below. Your request will go directly to the {zone.hub} dispatch desk.
            </p>
          </div>
          <BookingForm 
            prefilledPest="wasp" 
            prefilledEstimates={prefilledEstimates} 
            defaultPostcode={`${zoneId}1 1AA`}
          />
        </div>
      </div>

      {/* Directory of Other Coverage Zones to enable inter-linking */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h3 className="text-xl font-black text-slate-950">Other London Coverage Zones</h3>
            <p className="text-xs text-slate-500 font-semibold mt-2">
              We operate emergency dispatch vehicles continuously throughout all Greater London areas and home county borders.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-w-5xl mx-auto">
            {Object.entries(coverageData).map(([key, info]) => (
              <Link
                key={key}
                to={`/zone/${key.toLowerCase()}`}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  key === zoneId 
                    ? 'bg-amber-50 border-amber-500 text-slate-950 font-black' 
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 font-bold hover:shadow-sm text-xs'
                }`}
              >
                <span className="block text-xs uppercase tracking-widest leading-none font-bold">{key}</span>
                <span className="block text-[9px] truncate text-opacity-80 mt-1 leading-none">{info.region.replace(' London', '')}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
