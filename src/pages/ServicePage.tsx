/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CostCalculator from '../components/Calculator';
import BookingForm from '../components/BookingForm';
import { CostEstimate } from '../types';
import { 
  ShieldCheck, Phone, ArrowLeft, CheckCircle2, 
  ChevronRight, Timer, Home, Building2, Flame, Sparkles, AlertTriangle 
} from 'lucide-react';

// @ts-ignore
import waspNestRemovalImg from '../assets/images/service_wasp_nest_removal_1784131144223.jpg';
// @ts-ignore
import hornetControlImg from '../assets/images/service_hornet_control_1784131156559.jpg';
// @ts-ignore
import emergencyRemovalImg from '../assets/images/branded_emergency_van_1784133677559.jpg';
// @ts-ignore
import residentialControlImg from '../assets/images/service_residential_control_1784131182296.jpg';
// @ts-ignore
import commercialControlImg from '../assets/images/service_commercial_control_1784131196150.jpg';

const serviceImages: Record<string, string> = {
  'wasp-nest-removal': waspNestRemovalImg,
  'hornet-control': hornetControlImg,
  'emergency-removal': emergencyRemovalImg,
  'residential-control': residentialControlImg,
  'commercial-control': commercialControlImg,
};

interface ServiceData {
  title: string;
  tagline: string;
  description: string;
  importance: string;
  pricingNote: string;
  propertyType: 'residential' | 'commercial';
  urgency: 'standard' | 'emergency';
  icon: any;
  steps: string[];
  features: string[];
}

const servicesDataRecord: Record<string, ServiceData> = {
  'wasp-nest-removal': {
    title: 'Professional Wasp Nest Removal & Eradication',
    tagline: 'Safe, complete nest neutralisation within 24 hours — Guaranteed.',
    description: 'Our core service utilizes professional-grade, high-performance chemical formulations delivered directly into the nest entrance by certified specialists. This ensures the rapid and complete neutralisation of the entire colony (including the Queen) without risking structural damage to your property or gardens.',
    importance: 'Wasps build protective, aggressive paper nests in lofts, fascia boards, air bricks, wall cavities, and garden shrubbery. Attempting to spray nests with consumer aerosols or block nest entrances usually triggers swarming attacks, which can be life-threatening.',
    pricingNote: 'Residential treatments start from a flat rate of just £95. Additional nests treated during the same session are heavily discounted at only £30 each.',
    propertyType: 'residential',
    urgency: 'standard',
    icon: Home,
    steps: [
      'Site Hazard Assessment & Species Identification',
      'Targeted High-Reach Insecticide Application (No scaffolding needed)',
      'Queen & Colony Neutralisation (usually completed in under 2 hours)',
      'Post-Treatment Safe Ventilation & Cleanup Advice',
      'Full 48-Hour Eradication Warranty Activation'
    ],
    features: [
      'BPCA Standard-Compliant Insecticides',
      'Extendable High-Altitude Delivery Lances (up to 10m)',
      '100% Money-Back Eradication Guarantee',
      'Safe for pets and children once dried'
    ]
  },
  'hornet-control': {
    title: 'European & Asian Hornet Eradication Services',
    tagline: 'Specialised high-hazard hornet treatment with maximum safety protocols.',
    description: 'European Hornets (Vespa crabro) and invasive Asian Hornets are significantly larger, louder, and deliver a more substantial volume of venom than common wasps. Hornet control requires specialized heavy-duty safety suits, specialized high-strength insecticides, and fast exclusion measures to prevent swarm reactions.',
    importance: 'Hornet nests built in attics, chimneys, wall vents, or outbuildings pose high medical hazards. Hornet stings are deeply painful and can cause severe allergic reactions (anaphylaxis) in children, elderly residents, or pets with minimal exposure.',
    pricingNote: 'Hornet nest eradication treatments start from a flat rate of £160, subject to altitude and reach complexity which can be estimated in our pricing calculator.',
    propertyType: 'residential',
    urgency: 'standard',
    icon: ShieldCheck,
    steps: [
      'High-Risk Perimeter Scouting & Hazard Briefing',
      'Specialised Hornet PPE Suit Deployment (Ultra-Heavy Weight)',
      'Rapid-action knockdown insecticide injection',
      'Nest removal and chemical residue barrier application',
      'Exclusion check-up to prevent surrounding hornets from resettling'
    ],
    features: [
      'Heavy-duty puncture-proof PPE suits',
      'Invasive hornet containment reporting protocols',
      'SLA-backed 100% complete elimination guarantee',
      'Aggressive swarm containment chemicals'
    ]
  },
  'emergency-removal': {
    title: '24/7 Urgent Out-of-Hours Wasp Nest Removal',
    tagline: 'Immediate, rapid-response wasp control whenever you need it most.',
    description: 'For clients dealing with wasps inside bedrooms, classrooms, hospitals, or restaurants, waiting is not an option. We operate fully equipped, responsive emergency vehicles across London 24 hours a day, 365 days a year, including nights, weekends, and public bank holidays.',
    importance: 'Nests that have ruptured into living rooms, high-traffic commercial spaces, or schools represent immediate safety hazards. Our 1-hour dispatch protocol gets a certified technician to your door immediately to resolve the hazard.',
    pricingNote: 'Emergency call-outs are available across London with a £45 urgency surcharge on top of the base fee (starting from £95 for wasps, £160 for hornets). Rates are fully transparent and shown instantly.',
    propertyType: 'residential',
    urgency: 'emergency',
    icon: Flame,
    steps: [
      'Immediate 1-hour dispatch from closest London depot',
      'On-site area evacuation and immediate hazard control',
      'Instant knockdown aerosol and dust treatment of active nest',
      'Extraction of primary active nests to clear the indoor space',
      'Immediate safety clearance and ventilation monitoring'
    ],
    features: [
      'Guaranteed 1-Hour Arrival across Greater London M25',
      '24/7/365 Dedicated Phone Line & Dispatch Desk',
      'Full out-of-hours coverage including Christmas & Bank Holidays',
      'Discreet service with unmarked response vehicles'
    ]
  },
  'residential-control': {
    title: 'Residential Wasp Control for Homeowners & Landlords',
    tagline: 'Discreet, safe, and family-friendly wasp nest removal for London homes.',
    description: 'Our residential service is custom-built to restore safety and peace of mind to homeowners, tenants, and landlords. We use child- and pet-safe protocols, and we can operate discreetly with unmarked vehicles upon request to preserve privacy in residential streets.',
    importance: 'Wasps nested in loft areas, garden play equipment, garages, or cavity walls prevent you from using your gardens and risk entering children\'s bedrooms. Prompt treatment preserves structural insulation from wasp chewing.',
    pricingNote: 'Standard home treatment starts at £95 for wasps and £160 for hornets. Backed by our 100% money-back guarantee: if any survive, we return and re-treat completely free.',
    propertyType: 'residential',
    urgency: 'standard',
    icon: Home,
    steps: [
      'Friendly diagnostic walkthrough with the homeowner',
      'Family & pet safety briefing and secure positioning',
      'Accurate attic/garden nest target treatment',
      'Verification check of ventilation and entry cavities',
      'Handover of safety guidelines and official treatment certificate'
    ],
    features: [
      'Child & Pet-Friendly targeted application',
      'Unmarked vehicles available for discreet treatment',
      'SLA guarantee: free second visits if wasps return',
      'Special tenant/landlord key pickup coordination'
    ]
  },
  'commercial-control': {
    title: 'Commercial Wasp Control & SLA Compliance',
    tagline: 'Compliant, rapid SLA pest contracts for London businesses.',
    description: 'We partner with hotels, food manufacturers, bars, restaurants, warehouses, and schools to deliver SLA-backed wasp control. We provide legally compliant paperwork, including full RAMS (Risk Assessments and Method Statements), COSHH logs, and treatment records required for audits.',
    importance: 'A swarm of wasps on a restaurant patio or pub garden ruins revenue, and a wasp infestation in a food storage plant triggers immediate health code violations. Professional compliance protects your reputation and assets.',
    pricingNote: 'Commercial assessments and same-day commercial treatments start from a flat rate of £110, including comprehensive RAMS logs delivered digitally.',
    propertyType: 'commercial',
    urgency: 'standard',
    icon: Building2,
    steps: [
      'Digital RAMS logs and COSHH compliance check',
      'Safe, off-hours treatment of commercial property',
      'Installation of outdoor pheromone-free wasp screens',
      'Delivery of on-site digital treatment report for audits',
      'Staff safety training briefing for restaurant/bar operators'
    ],
    features: [
      'BPCA/RSPH Level 2 certified field operators',
      'Full compliance with health & safety audits',
      'Priority same-day commercial SLAs',
      'Multi-site discount packages available'
    ]
  }
};

export default function ServicePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const serviceId = id || 'wasp-nest-removal';
  const service = servicesDataRecord[serviceId];

  // State for prefilling estimates
  const [prefilledEstimates, setPrefilledEstimates] = useState<{
    propertyType: 'residential' | 'commercial';
    nestCount: number;
    urgency: 'standard' | 'emergency';
    location: 'low' | 'high';
    total: number;
  } | undefined>(undefined);

  useEffect(() => {
    // Scroll to top when service page mounts or changes
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md text-center shadow-lg space-y-6">
          <div className="bg-red-50 p-3 rounded-full w-14 h-14 mx-auto flex items-center justify-center text-red-500 border border-red-100">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900">Service Not Found</h1>
            <p className="text-sm text-slate-600 font-semibold">
              We couldn't find a service matching "{serviceId}". We offer specialized wasp, hornet, residential, and commercial eradication services.
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

  const IconComponent = service.icon;

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

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 pt-28">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-400">Services</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-black">{service.title}</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16 relative overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        <div className="absolute bottom-5 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full filter blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-slate-900 border border-amber-500/30 px-3 py-1.5 rounded-full text-amber-500 text-xs sm:text-sm font-semibold tracking-wide uppercase">
                <IconComponent className="w-4 h-4 text-amber-500" />
                Specialist Service Channel
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                {service.title}
              </h1>

              <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-medium">
                {service.tagline}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <span className="bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  24/7 Service Available
                </span>
                <span className="bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  From £{
                    serviceId === 'hornet-control'
                      ? (service.propertyType === 'residential' ? 160 : 190)
                      : (service.propertyType === 'residential' ? 95 : 125)
                  }.00 Flat Base
                </span>
                <span className="bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  Full BPCA Compliance Guarantee
                </span>
              </div>
            </div>

            {/* Direct Line Callout */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 shadow-xl">
              <h3 className="font-extrabold text-white text-base">Book This Service Directly</h3>
              <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                Connect directly with our central London intake desk. We provide on-the-spot bookings and immediate dispatch.
              </p>
              <a
                href="tel:02088198627"
                className="block text-center bg-red-600 hover:bg-red-500 text-white rounded-xl p-4 transition-all shadow-lg"
              >
                <span className="block text-[9px] font-bold text-slate-100 uppercase tracking-widest leading-none mb-1">
                  24/7 Service Desk Line
                </span>
                <span className="text-xl font-black flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5 animate-pulse" />
                  020 8819 8627
                </span>
              </a>
              <span className="text-[10px] text-slate-500 font-bold block">
                Average technician arrival in {service.urgency === 'emergency' ? '45' : '90'} minutes.
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Left side detail */}
            <div className="md:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Our Advanced Treatment Protocol
              </h2>
              <p className="text-sm text-slate-600 font-semibold leading-relaxed">
                {service.description}
              </p>

              <div className="bg-amber-50/50 border border-amber-200/60 p-5 rounded-xl space-y-2">
                <h4 className="font-black text-slate-950 text-sm flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                  Safety First & Why Professional Treatment is Required
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  {service.importance}
                </p>
              </div>

              {/* Treatment Steps list */}
              <div className="space-y-4">
                <h3 className="font-black text-slate-900 text-base">Step-By-Step Operational Process:</h3>
                <div className="space-y-3">
                  {service.steps.map((step, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <span className="bg-amber-500 text-slate-950 font-black rounded-lg w-6 h-6 flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-sm">
                        {index + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 font-bold leading-normal mt-0.5">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side highlights card & Photo */}
            <div className="md:col-span-5 flex flex-col gap-6">
              {/* Service Action Showcase Image */}
              <div className="bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm relative h-56 sm:h-64">
                <img 
                  src={serviceImages[serviceId]} 
                  alt={service.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-slate-950/70 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] text-white font-bold tracking-wide uppercase">
                  Service Reference Photo
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-6">
                <h3 className="font-black text-slate-950 text-base">Service Standards & Guarantees</h3>
                
                <ul className="space-y-4 text-xs text-slate-700 font-semibold">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 block font-bold">Standard {index + 1}</strong>
                        {feature}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-slate-200 pt-4 text-xs">
                  <span className="block font-bold text-slate-400 uppercase tracking-widest text-[10px]">Pricing Outline:</span>
                  <p className="text-slate-600 mt-1 font-semibold leading-relaxed">
                    {service.pricingNote}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Embedded cost estimator calculator */}
      <CostCalculator onEstimateChange={handleEstimateChange} onNavigate={handleNavigateLocal} />

      {/* Localized Booking Intake Form */}
      <div id="book" className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">
              Booking Intake
            </h2>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">
              Secure This Rate Online
            </h3>
            <p className="mt-2 text-sm text-slate-600 font-medium">
              Ready to lock in this treatment? Please fill out the intake form below to book your appointment.
            </p>
          </div>
          <BookingForm 
            prefilledPest={serviceId === 'hornet-control' ? 'hornet' : 'wasp'} 
            prefilledEstimates={prefilledEstimates} 
          />
        </div>
      </div>

      {/* Interlinking Navigation for other services */}
      <section className="py-12 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-lg font-black text-slate-900">Explore Other Eradication Channels</h3>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
            {Object.entries(servicesDataRecord).map(([key, item]) => {
              const ItemIcon = item.icon;
              return (
                <Link
                  key={key}
                  to={`/service/${key}`}
                  className={`p-4 rounded-xl border text-center transition-all flex flex-col justify-between items-center ${
                    key === serviceId 
                      ? 'bg-amber-500 border-amber-500 text-slate-950 font-black' 
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 font-bold hover:shadow-sm'
                  }`}
                >
                  <ItemIcon className={`w-5 h-5 mb-2 ${key === serviceId ? 'text-slate-950' : 'text-amber-500'}`} />
                  <span className="text-xs leading-tight font-black block">{item.title.replace(' & Eradication', '').replace(' Services', '').replace(' Eradication Services', '')}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
