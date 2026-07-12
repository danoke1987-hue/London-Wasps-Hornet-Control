/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BookingDetails, CostEstimate } from '../types';
import { MapPin, Calendar, Clock, AlertCircle, Phone, Sparkles, CheckCircle2, ShieldAlert, ArrowRight, Loader2, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BookingFormProps {
  prefilledPest?: 'wasp' | 'hornet' | 'unidentified';
  prefilledEstimates?: {
    propertyType: 'residential' | 'commercial';
    nestCount: number;
    urgency: 'standard' | 'emergency';
    location: 'low' | 'high';
    total: number;
  };
  defaultPostcode?: string;
}

export default function BookingForm({ prefilledPest, prefilledEstimates, defaultPostcode = '' }: BookingFormProps) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [postcode, setPostcode] = useState(defaultPostcode);

  useEffect(() => {
    if (defaultPostcode) {
      setPostcode(defaultPostcode);
    }
  }, [defaultPostcode]);
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');
  const [pestType, setPestType] = useState<'wasp' | 'hornet' | 'unidentified'>('wasp');
  const [nestCount, setNestCount] = useState<number>(1);
  const [urgency, setUrgency] = useState<'standard' | 'emergency'>('standard');
  const [nestLocation, setNestLocation] = useState('loft');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('AM (08:00 - 12:00)');
  const [languageSupport, setLanguageSupport] = useState('English');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Submit and loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [trackerStep, setTrackerStep] = useState(0);

  // Prefill when variables change from calculator
  useEffect(() => {
    if (prefilledPest) {
      setPestType(prefilledPest);
    }
  }, [prefilledPest]);

  useEffect(() => {
    if (prefilledEstimates) {
      setPropertyType(prefilledEstimates.propertyType);
      setNestCount(prefilledEstimates.nestCount);
      setUrgency(prefilledEstimates.urgency);
    }
  }, [prefilledEstimates]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate database write & API trigger
    setTimeout(() => {
      setIsSubmitting(false);
      setIsBooked(true);
      setTrackerStep(1);
    }, 1500);
  };

  // Dispatch Tracker Steps loop
  useEffect(() => {
    if (isBooked && trackerStep > 0 && trackerStep < 4) {
      const timer = setTimeout(() => {
        setTrackerStep((prev) => prev + 1);
      }, 4000); // Progress tracker state every 4 seconds for maximum visual premium experience
      return () => clearTimeout(timer);
    }
  }, [isBooked, trackerStep]);

  const timeSlots = [
    'AM (08:00 - 12:00)',
    'Midday (12:00 - 16:00)',
    'PM (16:00 - 20:00)',
    'Emergency Out of Hours (20:00 - 08:00)'
  ];

  return (
    <section id="book" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!isBooked ? (
          <>
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">
                {t('book.title')}
              </h2>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                Schedule Nest Eradication
              </h3>
              <p className="mt-3 text-sm text-slate-600 font-medium">
                {t('book.subtitle')}
              </p>
            </div>

            {/* Booking Form Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50">
              <form onSubmit={handleSubmit} className="space-y-6" id="pest-booking-form">
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="book-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t('book.fullName')}
                    </label>
                    <input
                      type="text"
                      id="book-name"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="book-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t('book.phone')}
                    </label>
                    <input
                      type="text"
                      id="book-phone"
                      required
                      placeholder="e.g. 07700 900077"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="book-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t('book.email')}
                    </label>
                    <input
                      type="email"
                      id="book-email"
                      required
                      placeholder="e.g. sarah@example.co.uk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  {/* Postcode */}
                  <div>
                    <label htmlFor="book-postcode" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t('book.postcode')}
                    </label>
                    <input
                      type="text"
                      id="book-postcode"
                      required
                      placeholder="e.g. SW19 1AA"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-bold tracking-widest uppercase outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Grid 3: Pest Config */}
                <div className="grid sm:grid-cols-3 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  
                  {/* Pest Type */}
                  <div>
                    <label htmlFor="book-pest" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Identified Pest
                    </label>
                    <select
                      id="book-pest"
                      value={pestType}
                      onChange={(e) => setPestType(e.target.value as any)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 outline-none"
                    >
                      <option value="wasp">Common Wasp Nest</option>
                      <option value="hornet">European Hornet Nest</option>
                      <option value="unidentified">Unidentified Insect (Fuzzy/Bees)</option>
                    </select>
                  </div>

                  {/* Nest Count */}
                  <div>
                    <label htmlFor="book-nest-count" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Nest Quantity
                    </label>
                    <select
                      id="book-nest-count"
                      value={nestCount}
                      onChange={(e) => setNestCount(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 outline-none"
                    >
                      <option value={1}>1 Nest</option>
                      <option value={2}>2 Nests (Discounted)</option>
                      <option value={3}>3 Nests (Discounted)</option>
                      <option value={4}>4+ Nests</option>
                    </select>
                  </div>

                  {/* Urgency */}
                  <div>
                    <label htmlFor="book-urgency" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Priority Urgency
                    </label>
                    <select
                      id="book-urgency"
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value as any)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 outline-none"
                    >
                      <option value="standard">Standard Dispatch</option>
                      <option value="emergency">Emergency (1h Callout)</option>
                    </select>
                  </div>

                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Preferred Date */}
                  <div>
                    <label htmlFor="book-date" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t('book.date')}
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="book-date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none"
                      />
                    </div>
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label htmlFor="book-timeslot" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t('book.time')}
                    </label>
                    <select
                      id="book-timeslot"
                      value={preferredTimeSlot}
                      onChange={(e) => setPreferredTimeSlot(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Nest Location Detail */}
                  <div>
                    <label htmlFor="book-location" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t('book.nestLoc')}
                    </label>
                    <input
                      type="text"
                      id="book-location"
                      required
                      placeholder="e.g. Inside the attic / roof tiles"
                      value={nestLocation}
                      onChange={(e) => setNestLocation(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  {/* Language Support Selection */}
                  <div>
                    <label htmlFor="book-language" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t('book.lang')}
                    </label>
                    <select
                      id="book-language"
                      name="languageSupport"
                      value={languageSupport}
                      onChange={(e) => setLanguageSupport(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="English">English Support (Default)</option>
                      <option value="Polish">Polski (Polish)</option>
                      <option value="Spanish">Español (Spanish)</option>
                      <option value="Bengali">বাংলা (Bengali)</option>
                      <option value="Gujarati">ગુજરાતી (Gujarati)</option>
                      <option value="French">Français (French)</option>
                      <option value="Italian">Italiano (Italian)</option>
                      <option value="Portuguese">Português (Portuguese)</option>
                      <option value="Romanian">Română (Romanian)</option>
                      <option value="Turkish">Türkçe (Turkish)</option>
                      <option value="Arabic">العربية (Arabic)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label htmlFor="book-notes" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t('book.notes')}
                  </label>
                  <textarea
                    id="book-notes"
                    rows={3}
                    placeholder="e.g. Gate code is #5021. Please knock loudly. We have a small dog."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none resize-none"
                  ></textarea>
                </div>

                <div className="bg-amber-500/5 p-4 rounded-xl border border-amber-500/10 flex items-start gap-3 text-xs text-slate-600">
                  <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="leading-normal">
                    <strong>Payment Terms:</strong> No payment is taken online today. You only pay after our BPCA-certified technician successfully neutralises the wasp nest and issues your official guarantee certificate. We accept all major Credit/Debit cards, contactless, or cash.
                  </p>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-4 px-6 rounded-xl text-base transition-all active:scale-95 text-center flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  id="btn-submit-booking"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Securing Dispatch Slot...
                    </>
                  ) : (
                    <>
                      {t('book.btnSubmit')}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

              </form>
            </div>
          </>
        ) : (
          /* Live Technician Dispatch Tracker */
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl space-y-8 animate-scale-up" id="booking-tracker-card">
            
            {/* Tracker Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                Active Service Dispatch Monitor
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">Booking Locked! Team Routing</h3>
              <p className="text-slate-400 text-xs">
                Ref ID: <span className="font-mono text-amber-500">LWC-{Math.floor(100000 + Math.random() * 900000)}</span> • Location: {postcode.toUpperCase() || 'SW11'}
              </p>
            </div>

            {/* Tracker Visual Map Pipeline */}
            <div className="space-y-6">
              
              <div className="relative">
                {/* Connector line */}
                <div className="absolute left-[26px] top-6 bottom-6 w-0.5 bg-slate-800"></div>

                {/* Milestone 1: Registered */}
                <div className="flex items-start gap-4 relative z-10 py-3">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 shrink-0 ${
                    trackerStep >= 1 ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-600'
                  }`}>
                    {trackerStep >= 1 ? <CheckCircle2 className="w-6 h-6" /> : <Loader2 className="w-6 h-6 animate-spin" />}
                  </div>
                  <div>
                    <h5 className={`font-bold text-sm ${trackerStep >= 1 ? 'text-white' : 'text-slate-500'}`}>
                      Booking Registered
                    </h5>
                    <p className="text-xs text-slate-400 mt-1 leading-normal font-medium">
                      Pest control reservation recorded successfully inside our London dispatch system. Quoted price secured.
                    </p>
                  </div>
                </div>

                {/* Milestone 2: Assigning Crew */}
                <div className="flex items-start gap-4 relative z-10 py-3">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 shrink-0 ${
                    trackerStep >= 2 ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-600'
                  }`}>
                    {trackerStep >= 2 ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : trackerStep === 1 ? (
                      <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                    ) : (
                      <span className="text-xs font-bold">02</span>
                    )}
                  </div>
                  <div>
                    <h5 className={`font-bold text-sm ${trackerStep >= 2 ? 'text-white' : trackerStep === 1 ? 'text-amber-500' : 'text-slate-500'}`}>
                      Pest Control Officer Assigned
                    </h5>
                    <p className="text-xs text-slate-400 mt-1 leading-normal font-medium">
                      {trackerStep >= 2 
                        ? 'Technician assigned: David Jenkins (Officer License BPCA-#9412). Specially certified for high-reach hornet & wasp extermination.'
                        : 'Querying GPS nodes for closest available local service vehicle...'}
                    </p>
                  </div>
                </div>

                {/* Milestone 3: Materials packing */}
                <div className="flex items-start gap-4 relative z-10 py-3">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 shrink-0 ${
                    trackerStep >= 3 ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-600'
                  }`}>
                    {trackerStep >= 3 ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : trackerStep === 2 ? (
                      <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                    ) : (
                      <span className="text-xs font-bold">03</span>
                    )}
                  </div>
                  <div>
                    <h5 className={`font-bold text-sm ${trackerStep >= 3 ? 'text-white' : trackerStep === 2 ? 'text-amber-500' : 'text-slate-500'}`}>
                      Vehicle Preparing & Dispatch
                    </h5>
                    <p className="text-xs text-slate-400 mt-1 leading-normal font-medium">
                      {trackerStep >= 3 
                        ? 'Vehicle dispatched from our nearest London depot with premium safety apparatus, extendable lances, and insecticide dust triggers.'
                        : 'Loading high-altitude respirator equipment, RAMS logs, and specific dust compounds.'}
                    </p>
                  </div>
                </div>

                {/* Milestone 4: En Route */}
                <div className="flex items-start gap-4 relative z-10 py-3">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 shrink-0 ${
                    trackerStep >= 4 ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-600'
                  }`}>
                    {trackerStep >= 4 ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : trackerStep === 3 ? (
                      <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                    ) : (
                      <span className="text-xs font-bold">04</span>
                    )}
                  </div>
                  <div>
                    <h5 className={`font-bold text-sm ${trackerStep >= 4 ? 'text-white' : trackerStep === 3 ? 'text-amber-500' : 'text-slate-500'}`}>
                      En Route (GPS Verified)
                    </h5>
                    <p className="text-xs text-slate-400 mt-1 leading-normal font-medium">
                      {trackerStep >= 4 
                        ? 'Technician has bypassed traffic and is en route. Expected arrival is approximately 35 minutes. An SMS has been sent to your phone with live map link.'
                        : 'Calculating optimal M25/London bypass route for rapid response...'}
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Emergency instructions */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-3">
              <span className="text-red-500 text-xs font-black uppercase tracking-widest block flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Urgent Pre-Arrival Safety Guidelines:
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed font-semibold">
                <li>• Keep all children and pets indoors with windows shut.</li>
                <li>• Do NOT attempt to poke, poke or spray aerosol cans at the nest. This will aggravate the wasps and cause them to swarm.</li>
                <li>• Clear a 2-meter parameter around the nest if reachable safely, otherwise leave entirely alone.</li>
              </ul>
            </div>

            {/* Back action */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-500 text-center sm:text-left font-medium">
                Need to cancel or reschedule? No penalty fee applies. Call us directly below.
              </p>
              <button
                onClick={() => setIsBooked(false)}
                className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
              >
                Go Back to Booking Form
              </button>
            </div>

            {/* Directly Call trigger */}
            <a
              href="tel:02088198627"
              className="block text-center bg-red-600 hover:bg-red-500 text-white font-black py-4 rounded-xl text-base transition-colors"
            >
              <Phone className="w-5 h-5 inline mr-2 align-middle animate-pulse" />
              Direct Emergency Hotline: 020 8819 8627
            </a>

          </div>
        )}

      </div>
    </section>
  );
}
