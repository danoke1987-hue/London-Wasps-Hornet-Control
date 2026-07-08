/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { countiesData } from '../data/counties';
import { Map, MapPin, Search, ChevronRight, Compass, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CountyDirectory() {
  const [selectedCountyId, setSelectedCountyId] = useState<string>('greater-london');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedCounty = useMemo(() => {
    return countiesData.find(c => c.id === selectedCountyId) || countiesData[0];
  }, [selectedCountyId]);

  // Global searchable matching postcode results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.trim().toUpperCase();
    const results: { countyName: string; countySlug: string; postcode: string }[] = [];

    countiesData.forEach(c => {
      c.postcodes.forEach(pc => {
        if (pc.toUpperCase().includes(q)) {
          results.push({
            countyName: c.name,
            countySlug: c.slug,
            postcode: pc
          });
        }
      });
    });

    return results.slice(0, 24);
  }, [searchQuery]);

  return (
    <section id="coverage-directory" className="py-20 bg-slate-900 text-white border-b border-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-amber-500 uppercase mb-3">
            <Compass className="w-4 h-4" />
            M25 & Home Counties Coverage Network
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Local Postcode Coverage Directory
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 font-medium">
            Browse our dedicated service areas across Greater London, City of London, and South East England. Click your local postcode prefix to view direct dispatch speed and local specialist rates.
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5 text-amber-500" />
            </div>
            <input
              type="text"
              placeholder="Search postcode prefix (e.g., SW11, GU1, SL4, TN13)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-slate-950/80 border border-slate-800 rounded-2xl text-white placeholder-slate-500 font-semibold focus:outline-none focus:border-amber-500 transition-colors shadow-lg"
            />
          </div>

          <div className="text-center mt-2.5">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Direct dispatch coverage guaranteed for all listed zones
            </span>
          </div>
        </div>

        {/* Search Results Display or Standard Explorer */}
        {searchResults !== null ? (
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto min-h-[250px]">
            <h3 className="text-base font-black text-amber-500 mb-6 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Found {searchResults.length} matching coverage sectors:
            </h3>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {searchResults.map((res) => (
                  <Link
                    key={`${res.countySlug}-${res.postcode}`}
                    to={`/area/${res.countySlug}/${res.postcode.toLowerCase()}`}
                    className="p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-400 rounded-xl flex items-center justify-between text-xs font-black transition-all group"
                  >
                    <span>{res.postcode} area</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-500 transition-colors" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 space-y-3">
                <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
                <p className="text-sm font-bold text-slate-300">No exact prefix matches found.</p>
                <p className="text-xs text-slate-500 font-semibold max-w-md mx-auto">
                  Try searching for general beginnings like "SW", "GU", "PO", or "SL" to explore matching counties. We cover all areas across South East England!
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: County Selection Tabs */}
            <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 px-2">
                Select Your County / Region
              </div>
              {countiesData.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCountyId(c.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer focus:outline-none ${
                    selectedCountyId === c.id
                      ? 'bg-amber-500 border-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/10'
                      : 'bg-slate-950/80 border-slate-850 hover:border-slate-700 text-slate-300 font-bold hover:text-white'
                  }`}
                >
                  <span className="text-xs sm:text-sm tracking-wide">{c.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      selectedCountyId === c.id ? 'bg-slate-950 text-white' : 'bg-slate-900 text-slate-400'
                    }`}>
                      {c.postcodes.length}
                    </span>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Selected County Postcodes List */}
            <div className="lg:col-span-8 bg-slate-950/80 border border-slate-850 rounded-2xl p-6 md:p-8 space-y-6">
              
              {/* County summary */}
              <div className="border-b border-slate-900 pb-6 space-y-3 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h3 className="text-xl font-black text-white">{selectedCounty.name} Specialist Fleet</h3>
                  <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded text-emerald-500 text-xs font-bold leading-none w-fit mx-auto sm:mx-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    24/7 Priority Emergency Coverage
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-semibold">
                  {selectedCounty.description}
                </p>

                {/* Micro Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs font-semibold text-slate-300">
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    <span className="block text-[10px] text-slate-500 font-black uppercase tracking-wider">On-Call Hub</span>
                    <span className="block text-white font-black mt-0.5 truncate">{selectedCounty.dispatchHub}</span>
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    <span className="block text-[10px] text-slate-500 font-black uppercase tracking-wider">Avg Response Speed</span>
                    <span className="block text-white font-black mt-0.5">{selectedCounty.responseTimeMin} Minutes</span>
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 col-span-2 sm:col-span-1">
                    <span className="block text-[10px] text-slate-500 font-black uppercase tracking-wider">Active Patrol Vans</span>
                    <span className="block text-white font-black mt-0.5">{selectedCounty.activeTechs} Vehicles</span>
                  </div>
                </div>
              </div>

              {/* Grid of Postcode Buttons */}
              <div className="space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                  Select A Postcode Area Guide:
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCounty.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 max-h-[300px] overflow-y-auto pr-1.5 custom-scrollbar"
                  >
                    {selectedCounty.postcodes.map((pc) => (
                      <Link
                        key={pc}
                        to={`/area/${selectedCounty.slug}/${pc.toLowerCase()}`}
                        className="p-2.5 bg-slate-900 hover:bg-slate-850 hover:border-amber-500 border border-slate-800 rounded-lg text-center text-xs font-black transition-all text-slate-100 hover:text-white hover:scale-[1.02] duration-250 shrink-0"
                      >
                        {pc} Sector
                      </Link>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
