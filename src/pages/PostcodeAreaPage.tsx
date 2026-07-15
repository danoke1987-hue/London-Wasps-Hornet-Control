/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { countiesData } from '../data/counties';
import BookingForm from '../components/BookingForm';
import CostCalculator from '../components/Calculator';
import { CostEstimate } from '../types';
import { 
  ShieldCheck, MapPin, Timer, Users, Phone, 
  ArrowLeft, CheckCircle2, ChevronRight, AlertTriangle, Bug, HelpCircle, ShieldAlert
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// @ts-ignore
import dispatchVehicleImg from '../assets/images/branded_dispatch_van_1784133692868.jpg';

export default function PostcodeAreaPage() {
  const { t } = useLanguage();
  const { areaName, postcode } = useParams<{ areaName: string; postcode: string }>();
  const navigate = useNavigate();
  
  const normArea = (areaName || '').toLowerCase().trim();
  const normPostcode = (postcode || '').toUpperCase().trim();

  const county = countiesData.find(c => c.slug === normArea);
  const isValidPostcode = county?.postcodes.some(pc => pc.toUpperCase() === normPostcode) || false;

  // Prefilled estimates from internal calculator
  const [prefilledEstimates, setPrefilledEstimates] = useState<{
    propertyType: 'residential' | 'commercial';
    nestCount: number;
    urgency: 'standard' | 'emergency';
    location: 'low' | 'high';
    total: number;
  } | undefined>(undefined);

  useEffect(() => {
    // Scroll to top when postcode or area changes
    window.scrollTo(0, 0);
  }, [normArea, normPostcode]);

  if (!county || !isValidPostcode) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 pt-28">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md text-center shadow-lg space-y-6">
          <div className="bg-red-50 p-3 rounded-full w-14 h-14 mx-auto flex items-center justify-center text-red-500 border border-red-100">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900">Coverage Location Unlisted</h1>
            <p className="text-sm text-slate-600 font-semibold">
              The postcode "{normPostcode}" under "{areaName}" was not found in our pre-indexed directory. 
            </p>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              However, we provide emergency cover for all of London and South East England. Please call our 24/7 hotline or check the main directory.
            </p>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <a
              href="tel:02088198627"
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md"
            >
              <Phone className="w-4 h-4" />
              Call Dispatcher: 020 8819 8627
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-amber-500 font-bold px-6 py-3 rounded-xl text-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
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

  // Get other postcodes in this county to display a smart local directory
  const siblingPostcodes = county.postcodes.filter(pc => pc !== normPostcode).slice(0, 16);

  // Generate a realistic, deterministic response time and tech count for this specific postcode prefix
  const codeValue = normPostcode.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const localResponseTime = county.responseTimeMin + (codeValue % 10);
  const localTechs = Math.max(2, (county.activeTechs - (codeValue % 3)));

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 pt-28">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-400">Coverage</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-400 capitalize">{county.name}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-black">{normPostcode} Wasp Control</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16 relative overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full filter blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-slate-900 border border-amber-500/30 px-3 py-1.5 rounded-full text-amber-500 text-xs sm:text-sm font-semibold tracking-wide uppercase">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Emergency Dispatch Active in {normPostcode}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                Wasp & Hornet Nest Removal in <span className="text-amber-500">{normPostcode}</span> ({county.name})
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-medium">
                Surgical-grade, certified wasp nest treatments and hornet colony eradication across the <strong>{normPostcode}</strong> sector. Secured by a 100% elimination warranty and £5M insurance.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center lg:text-left">
                  <div className="text-amber-500 mb-1 flex justify-center lg:justify-start">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500">{t('county.localHub')}</span>
                  <span className="block text-xs font-black text-white mt-0.5 leading-tight">{county.dispatchHub}</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center lg:text-left">
                  <div className="text-amber-500 mb-1 flex justify-center lg:justify-start">
                    <Timer className="w-5 h-5" />
                  </div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500">{t('county.estArrival')}</span>
                  <span className="block text-xs font-black text-white mt-0.5">{localResponseTime} Minutes</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center lg:text-left">
                  <div className="text-amber-500 mb-1 flex justify-center lg:justify-start">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500">{t('county.activeTechs')}</span>
                  <span className="block text-xs font-black text-white mt-0.5">{localTechs} Specialists</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center lg:text-left">
                  <div className="text-amber-500 mb-1 flex justify-center lg:justify-start">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500">{t('county.warranty')}</span>
                  <span className="block text-xs font-black text-amber-500 mt-0.5">{t('county.warrantyVal')}</span>
                </div>
              </div>
            </div>

            {/* Callback Widget */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 shadow-xl">
              <h3 className="font-extrabold text-white text-base">Direct {normPostcode} Dispatch</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Connect directly with our regional controller for a free expert quote and instant booking.
              </p>
              <a
                href="tel:02088198627"
                className="block text-center bg-red-600 hover:bg-red-500 text-white rounded-xl p-4 transition-all"
              >
                <span className="block text-[9px] font-bold text-slate-100 uppercase tracking-widest leading-none mb-1">
                  24/7 Hotline
                </span>
                <span className="text-xl font-black flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  020 8819 8627
                </span>
              </a>
              <span className="text-[10px] text-slate-500 font-bold block">
                • Standard Rates Apply • Free Advice •
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Localized Context */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Swift Wasp Colony Eradication in {normPostcode}
              </h2>
              <p className="text-sm text-slate-600 font-semibold leading-relaxed">
                Wasp and hornet nests constructed in wall cavities, chimney flues, roof soffits, or within the garden ground present immediate dangers to households and employees. Operating directly from our <strong>{county.dispatchHub}</strong>, we are positioned to treat nesting issues in <strong>{normPostcode}</strong> within an average of {localResponseTime} minutes. 
              </p>
              <p className="text-sm text-slate-600 font-semibold leading-relaxed">
                Our certified technicians use professional-grade insecticides and precision lance applicators to safely neutralise the nest. The treatment is fast, low-disruption, and backed by our unconditional 100% re-treatment guarantee.
              </p>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-3">
                <h4 className="font-black text-slate-900 text-sm">Our Local Coverage Commitment:</h4>
                <p className="text-xs text-slate-600 leading-normal font-semibold">
                  We guarantee full priority coverage across all households, estates, and commercial facilities inside the <strong>{normPostcode}</strong> outcode sector and surrounding neighborhoods of <strong>{county.name}</strong>.
                </p>
              </div>
            </div>

            {/* Quality Seals & Photo */}
            <div className="md:col-span-5 flex flex-col gap-6">
              {/* Regional Dispatch Showcase Image */}
              <div className="bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm relative h-56">
                <img 
                  src={dispatchVehicleImg} 
                  alt={`Local regional dispatch vehicle operating in ${normPostcode}`} 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-slate-950/70 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] text-white font-bold tracking-wide uppercase">
                  Active Dispatch Unit
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
                <h3 className="font-black text-slate-950 text-base">Service Protocols for {normPostcode}</h3>
                
                <ul className="space-y-3.5 text-xs text-slate-700 font-bold">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-bold">BPCA Certified Technicians</strong>
                      Every specialist on call is fully qualified, trained in COSHH regulations, and carries £5M liability protection.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-bold">100% Re-treatment Guarantee</strong>
                      If active wasps are still present 48 hours after treatment, we return to re-dose the nest free of charge.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-bold">Ecological Safeguards</strong>
                      We do not exterminate beneficial bee colonies. We offer dynamic rehoming alternatives for Honeybees and Bumblebees.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Cost Estimator Calculator for specific Postcode */}
      <CostCalculator onEstimateChange={handleEstimateChange} onNavigate={handleNavigateLocal} />

      {/* Localized Booking Intake Form */}
      <div id="book" className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">
              Book Treatment Online — {normPostcode} Dispatch
            </h2>
            <h3 className="text-3xl font-black text-slate-950 tracking-tight">
              Request Your Same-Day Service
            </h3>
            <p className="mt-2 text-sm text-slate-600 font-semibold">
              Fill in your details below. Your reservation request will immediately appear on the screen of our nearest {normPostcode} technician.
            </p>
          </div>
          <BookingForm 
            prefilledPest="wasp" 
            prefilledEstimates={prefilledEstimates} 
            defaultPostcode={`${normPostcode} 1AA`}
          />
        </div>
      </div>

      {/* Directory of Neighboring Postcodes in the County */}
      {siblingPostcodes.length > 0 && (
        <section className="py-16 bg-slate-50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h3 className="text-xl font-black text-slate-950">Other {county.name} Coverage Locations</h3>
              <p className="text-xs text-slate-500 font-semibold mt-2">
                We maintain active service routes across all neighboring postcode sectors.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-w-5xl mx-auto">
              {siblingPostcodes.map((pc) => (
                <Link
                  key={pc}
                  to={`/area/${county.slug}/${pc.toLowerCase()}`}
                  className="p-3 rounded-lg border border-slate-200 bg-white hover:border-amber-400 text-center text-xs font-bold text-slate-700 hover:shadow-sm transition-all"
                >
                  {pc} area
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
