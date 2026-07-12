/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import PestIdentifier from '../components/PestIdentifier';
import CoverageChecker from '../components/CoverageChecker';
import CountyDirectory from '../components/CountyDirectory';
import MultilingualSupport from '../components/MultilingualSupport';
import CostCalculator from '../components/Calculator';
import BookingForm from '../components/BookingForm';
import Reviews from '../components/Reviews';
import FAQs from '../components/FAQs';
import { CostEstimate } from '../types';
import { Home as HomeIcon, Building2, Timer, CheckCircle2, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HomeProps {
  onCheckPostcode: (postcode: string) => void;
  prefilledPostcode: string;
  prefilledEstimates: any;
  setPrefilledEstimates: React.Dispatch<React.SetStateAction<any>>;
}

export default function Home({
  onCheckPostcode,
  prefilledPostcode,
  prefilledEstimates,
  setPrefilledEstimates
}: HomeProps) {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [selectedPest, setSelectedPest] = useState<'wasp' | 'hornet' | 'unidentified'>('wasp');

  useEffect(() => {
    const section = searchParams.get('section') || location.hash.replace('#', '');
    if (section) {
      // Small timeout to ensure page content has rendered
      const timer = setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          const navbarOffset = 110; // offset for the sticky nav + top bar
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [searchParams, location.hash]);

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

  const handleEstimateChange = (est: CostEstimate & { propertyType: 'residential' | 'commercial'; nestCount: number; urgency: 'standard' | 'emergency'; location: 'low' | 'high' }) => {
    setPrefilledEstimates({
      propertyType: est.propertyType,
      nestCount: est.nestCount,
      urgency: est.urgency,
      location: est.location,
      total: est.total
    });
  };

  return (
    <>
      {/* Hero Section with Quick Lookup */}
      <Hero onCheckPostcode={onCheckPostcode} onNavigate={handleNavigateLocal} />

      {/* Services Cards Section (Commercial & Residential) */}
      <section id="services" className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">
              Elite Pest Extermination Standards
            </h2>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Tailored Residential & Commercial Solutions
            </h3>
            <p className="mt-4 text-base text-slate-600 font-medium">
              We understand that wasp infestations in a suburban garden attic require different protocols than hornets swarming a busy restaurant patio or a school playground. 
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Residential Solutions */}
            <div className="bg-slate-50 border border-slate-200/60 p-8 rounded-2xl flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 text-amber-600">
                    <HomeIcon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-black text-slate-950">Residential Wasp Control</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                  Complete peace-of-mind service for homeowners and landlords. We eliminate wasps safely and discreetly, protecting your children, pets, and structural assets.
                </p>
                
                <ul className="space-y-2.5 text-xs text-slate-700 font-bold">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                    Garden trees, shrubs, sheds and garages
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                    Loft space, attic vents, and cavity walls
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                    Discreet unmarked vehicles available upon request
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                    100% money-back eradication guarantee
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleNavigateLocal('estimator')}
                className="w-full bg-slate-950 hover:bg-slate-800 text-amber-500 font-extrabold py-3 rounded-xl text-xs transition-colors cursor-pointer text-center"
              >
                Estimate Home Treatment
              </button>
            </div>

            {/* Commercial Solutions */}
            <div className="bg-slate-950 text-white border border-slate-800 p-8 rounded-2xl flex flex-col justify-between space-y-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 text-amber-500">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-black text-white">Commercial Wasp Control</h4>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed font-semibold">
                  Compliant SLA-backed services for hotels, bars, schools, food processing plants, and commercial warehouses. Full COSHH reporting and RAMS logs delivered on-site.
                </p>
                
                <ul className="space-y-2.5 text-xs text-slate-300 font-bold">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                    Multi-site support and immediate emergency dispatch
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                    Comprehensive digital RAMS & treatment reports
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                    BPCA / RSPH Level 2 certified field technicians
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                    Scheduled inspections & preventive wasp shielding
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setPrefilledEstimates((prev: any) => prev ? { ...prev, propertyType: 'commercial' } : { propertyType: 'commercial', nestCount: 1, urgency: 'standard', location: 'low', total: 110 });
                  handleNavigateLocal('estimator');
                }}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl text-xs transition-colors cursor-pointer text-center"
              >
                Request Commercial Quote
              </button>
            </div>

          </div>

          {/* Quick SLA Banner */}
          <div className="mt-12 bg-slate-900 text-white max-w-5xl mx-auto rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-amber-500 hidden sm:block">
                <Timer className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-extrabold text-sm uppercase tracking-wider text-amber-500">Urgent Out-of-Hours? 24/7/365 Emergency Dispatch</h5>
                <p className="text-xs text-slate-400 mt-1 font-semibold leading-relaxed">
                  We maintain fully loaded regional response vehicles en route around London M25. Evening, weekend, or bank holiday call-outs completed within 1 hour.
                </p>
              </div>
            </div>
            <a
              href="tel:02088198627"
              className="bg-red-600 hover:bg-red-500 text-white font-black px-6 py-3.5 rounded-xl text-sm shadow-md shadow-red-900/30 shrink-0 flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              Call 020 8819 8627
            </a>
          </div>

        </div>
      </section>

      {/* Interactive Insect Diagnostic Portal */}
      <PestIdentifier onSelectPest={setSelectedPest} onNavigate={handleNavigateLocal} />

      {/* Interactive Live Postcode Coverage Monitor */}
      <CoverageChecker initialPostcode={prefilledPostcode} onNavigate={handleNavigateLocal} />

      {/* Interactive Local Postcode Area Coverage Directories */}
      <CountyDirectory />

      {/* London's Top 10 Multilingual Support and Interpreter Guide */}
      <MultilingualSupport />

      {/* Interactive Cost Estimator Calculator */}
      <CostCalculator onEstimateChange={handleEstimateChange} onNavigate={handleNavigateLocal} />

      {/* Client Intake Booking Form */}
      <BookingForm prefilledPest={selectedPest} prefilledEstimates={prefilledEstimates} />

      {/* Trust Signal Testimonials */}
      <Reviews />

      {/* Dynamic Frequently Asked Questions Accordions */}
      <FAQs />
    </>
  );
}
