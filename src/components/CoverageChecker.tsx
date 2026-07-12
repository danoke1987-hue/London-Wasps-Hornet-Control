/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { checkPostcodeCoverage } from '../data/postcodes';
import { PostcodeResult } from '../types';
import { MapPin, ShieldCheck, Clock, Users, Navigation, AlertCircle, Phone, HelpCircle } from 'lucide-react';

interface CoverageCheckerProps {
  initialPostcode?: string;
  onNavigate: (sectionId: string) => void;
}

export const coreBoroughs = [
  'City of London', 'Westminster', 'Kensington & Chelsea', 'Hammersmith & Fulham', 'Wandsworth',
  'Lambeth', 'Southwark', 'Tower Hamlets', 'Hackney', 'Islington', 'Camden', 'Brent', 'Ealing',
  'Hounslow', 'Richmond', 'Kingston', 'Merton', 'Sutton', 'Croydon', 'Bromley', 'Lewisham',
  'Greenwich', 'Bexley', 'Havering', 'Barking', 'Redbridge', 'Newham', 'Waltham Forest',
  'Haringey', 'Enfield', 'Barnet', 'Harrow', 'Hillingdon'
];

export const homeCounties = [
  'Surrey (Croydon, Kingston, Guildford, Sutton, Surrey Downs)',
  'Kent (Bromley, Dartford, Orpington, Sevenoaks)',
  'Essex (Romford, Ilford, Brentwood, Chigwell, Loughton)',
  'Hertfordshire (Watford, Enfield, Barnet, St Albans, Cheshunt)',
  'Berkshire / Buckinghamshire Borders (Slough, Windsor, Heathrow)'
];

export default function CoverageChecker({ initialPostcode, onNavigate }: CoverageCheckerProps) {
  const [postcode, setPostcode] = useState(initialPostcode || '');
  const [result, setResult] = useState<PostcodeResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (postcode.trim()) {
      const res = checkPostcodeCoverage(postcode);
      setResult(res);
      setHasSearched(true);
    }
  };

  const handleBoroughClick = (borough: string) => {
    // Generate a reasonable mock prefix based on the borough
    let prefix = 'SW11';
    if (borough.includes('Croydon')) prefix = 'CR0';
    if (borough.includes('Richmond')) prefix = 'TW9';
    if (borough.includes('Enfield')) prefix = 'EN1';
    if (borough.includes('Bromley')) prefix = 'BR1';
    if (borough.includes('Kensington')) prefix = 'W8';
    if (borough.includes('Greenwich')) prefix = 'SE10';
    if (borough.includes('Camden')) prefix = 'NW1';
    if (borough.includes('Islington')) prefix = 'N1';

    setPostcode(prefix);
    const res = checkPostcodeCoverage(prefix);
    setResult(res);
    setHasSearched(true);
  };

  return (
    <section id="coverage" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">
            Service Coverage Area
          </h2>
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            London & Surrounding Counties Dispatch Map
          </h3>
          <p className="mt-4 text-base text-slate-600 font-medium">
            With multiple regional pest dispatch depots stationed throughout Greater London and the M25 ring road border, we can guarantee rapid 1-hour response times to critical infestations.
          </p>
        </div>

        {/* Outer Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Postcode Checker Form */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
            <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-amber-500" />
              Check Live Availability
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              Enter the first part of your postcode to query active crews in your local area.
            </p>

            <form onSubmit={handleSearch} className="space-y-4" id="coverage-checker-form">
              <div>
                <label htmlFor="coverage-postcode-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Postcode Outer Code (e.g., SE10, SW19, TW1, CR0)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="coverage-postcode-input"
                    placeholder="e.g. SE10"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    className="flex-1 bg-white text-slate-900 border border-slate-200 focus:border-amber-500 rounded-xl px-4 py-3 text-base font-bold tracking-widest placeholder:text-slate-400 focus:ring-1 focus:ring-amber-500 uppercase outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors cursor-pointer shrink-0"
                  >
                    Check Status
                  </button>
                </div>
              </div>
            </form>

            {/* Coverage Result Board */}
            {hasSearched && result && (
              <div
                className={`p-5 rounded-xl border animate-fade-in ${
                  result.isCovered
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-950'
                    : 'bg-red-500/5 border-red-500/20 text-red-950'
                }`}
                id="coverage-search-result"
              >
                {result.isCovered ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-extrabold text-sm uppercase tracking-wide text-emerald-800">
                          Rapid Dispatch Available!
                        </h5>
                        <p className="text-xs font-semibold text-slate-600 mt-1">
                          Postcode <strong className="text-slate-900">{result.postcode}</strong> is fully covered by our <strong className="text-slate-900">{result.regionName}</strong> unit.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-emerald-500/10">
                      <div className="bg-white p-3 rounded-lg border border-emerald-500/5 text-center">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Response Time</span>
                        <span className="text-sm font-black text-slate-900 flex items-center justify-center gap-1">
                          <Clock className="w-4 h-4 text-emerald-500" />
                          ~{result.averageResponseTimeMin} mins
                        </span>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-500/5 text-center">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Local Techs</span>
                        <span className="text-sm font-black text-slate-900 flex items-center justify-center gap-1">
                          <Users className="w-4 h-4 text-emerald-500" />
                          {result.activeTechnicians} Active
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/50 p-3 rounded-lg border border-emerald-500/5 text-xs text-slate-600">
                      <strong>Nearest Hub:</strong> {result.nearestStation}
                    </div>

                    <button
                      onClick={() => onNavigate('book')}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg text-xs tracking-wider uppercase transition-all text-center"
                    >
                      Book Priority Treatment Now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-extrabold text-sm uppercase tracking-wide text-red-800">
                          Outside Primary Area
                        </h5>
                        <p className="text-xs font-semibold text-slate-600 mt-1">
                          We do not currently operate rapid 1-hour dispatch in postcode <strong>{result.postcode}</strong>.
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-normal">
                      However, we may be able to dispatch a scheduled crew within 24 hours, or refer you to an vetted partner. Contact our central helpline to request a custom booking.
                    </p>
                    <a
                      href="tel:02088198627"
                      className="block text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg text-xs tracking-wider uppercase transition-colors"
                    >
                      Call Helpline: 020 8819 8627
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Quick Helper */}
            <div className="bg-amber-500/5 p-4 rounded-xl border border-amber-500/10 space-y-2">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block">No Service Charge Guarantee</span>
              <p className="text-xs text-slate-600 leading-normal font-medium">
                Unlike other services, if our technician arrives and identifies the swarm as honeybees that cannot be chemically treated, we will ONLY advise you on relocation. We put safety and bee protection first.
              </p>
            </div>
          </div>

          {/* Right Column: Visual Coverage List */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-3">Core Areas & Boroughs We Serve 24/7</h4>
              <p className="text-sm text-slate-500 mb-4 font-medium">
                We provide round-the-clock emergency support across all 33 boroughs of Greater London:
              </p>
              
              {/* Interactive Borough Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-2 border border-slate-100 p-3 rounded-xl bg-slate-50 scrollbar-thin">
                {coreBoroughs.map((borough) => (
                  <button
                    key={borough}
                    onClick={() => handleBoroughClick(borough)}
                    className="text-left text-xs bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 px-3 py-2.5 rounded-lg border border-slate-200/60 transition-colors font-semibold truncate cursor-pointer flex items-center gap-1.5"
                    id={`btn-borough-${borough.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {borough}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-3">Surrounding Home Counties Covered</h4>
              <p className="text-sm text-slate-500 mb-4 font-medium">
                We also dispatch our emergency specialist vehicles to border towns and major surrounding communities:
              </p>
              
              <ul className="grid sm:grid-cols-2 gap-3 text-sm font-semibold text-slate-700">
                {homeCounties.map((county, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 shrink-0 mt-1">•</span>
                    <span>{county}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
