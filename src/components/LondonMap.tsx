/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, Users, Clock, MapPin, Navigation } from 'lucide-react';

interface ZoneData {
  id: string;
  name: string;
  postcode: string;
  region: string;
  techs: number;
  responseTime: number;
  status: 'active' | 'standby';
  description: string;
  path: string; // SVG Path
  cx?: number;  // Label position
  cy?: number;
}

interface LondonMapProps {
  onSelectPostcode: (postcode: string) => void;
  activePostcode?: string;
}

export default function LondonMap({ onSelectPostcode, activePostcode }: LondonMapProps) {
  const [hoveredZone, setHoveredZone] = useState<ZoneData | null>(null);
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);

  // SVG dimensions: 600x400
  // Central hub is located around (300, 200)
  const zones: ZoneData[] = [
    {
      id: 'central',
      name: 'Central London',
      postcode: 'EC2A',
      region: 'WC & EC Boroughs',
      techs: 6,
      responseTime: 20,
      status: 'active',
      description: 'City, Westminster, Holborn & central business zones. Rapid scooter dispatch.',
      // Hexagon in the center
      path: 'M 270,180 L 330,180 L 350,210 L 330,240 L 270,240 L 250,210 Z',
      cx: 300,
      cy: 210,
    },
    {
      id: 'north',
      name: 'North London',
      postcode: 'N1',
      region: 'N, NW, Enfield & Barnet',
      techs: 8,
      responseTime: 25,
      status: 'active',
      description: 'Finsbury Park, Hampstead, Camden & Enfield hubs.',
      // Shape above central
      path: 'M 250,210 L 270,180 L 250,110 L 350,110 L 330,180 Z',
      cx: 300,
      cy: 145,
    },
    {
      id: 'east',
      name: 'East London',
      postcode: 'E1',
      region: 'E, IG, RM & Newham',
      techs: 7,
      responseTime: 25,
      status: 'active',
      description: 'Stratford, Hackney, Romford & Barking corridors.',
      // Shape to the right
      path: 'M 330,180 L 410,140 L 440,210 L 400,260 L 330,240 L 350,210 Z',
      cx: 375,
      cy: 200,
    },
    {
      id: 'south',
      name: 'South London',
      postcode: 'SE10',
      region: 'SE, SW, Bromley & Croydon',
      techs: 9,
      responseTime: 30,
      status: 'active',
      description: 'Greenwich, Croydon, Battersea & South Downs crews.',
      // Shape below central
      path: 'M 270,240 L 330,240 L 400,260 L 350,310 L 250,310 L 200,260 Z',
      cx: 300,
      cy: 275,
    },
    {
      id: 'west',
      name: 'West London',
      postcode: 'W8',
      region: 'W, TW, UB & Hounslow',
      techs: 6,
      responseTime: 22,
      status: 'active',
      description: 'Kensington, Richmond, Ealing & Heathrow boundary.',
      // Shape to the left
      path: 'M 250,210 L 270,180 L 190,140 L 160,210 L 200,260 Z',
      cx: 215,
      cy: 200,
    },
    // Home Counties Rings (Outer boundaries)
    {
      id: 'herts',
      name: 'Hertfordshire Border',
      postcode: 'AL1',
      region: 'St Albans, Watford & Welwyn',
      techs: 4,
      responseTime: 40,
      status: 'standby',
      description: 'Outer ring M25 dispatch teams for North London borders.',
      path: 'M 190,140 L 250,110 L 350,110 L 410,140 L 380,50 L 220,50 Z',
      cx: 300,
      cy: 80,
    },
    {
      id: 'essex',
      name: 'Essex Border',
      postcode: 'CM12',
      region: 'Brentwood, Chigwell & Southend',
      techs: 5,
      responseTime: 35,
      status: 'active',
      description: 'East Anglia & M25 radial emergency coverage.',
      path: 'M 410,140 L 530,120 L 550,240 L 400,260 L 440,210 Z',
      cx: 470,
      cy: 180,
    },
    {
      id: 'kent',
      name: 'Kent Border',
      postcode: 'DA1',
      region: 'Dartford, Sevenoaks & Orpington',
      techs: 4,
      responseTime: 38,
      status: 'active',
      description: 'South East arterial crews near Orpington & Dartford.',
      path: 'M 400,260 L 550,240 L 500,340 L 350,310 Z',
      cx: 440,
      cy: 290,
    },
    {
      id: 'surrey',
      name: 'Surrey Border',
      postcode: 'GU1',
      region: 'Guildford, Epsom & Woking',
      techs: 5,
      responseTime: 35,
      status: 'active',
      description: 'South West coverage covering Surrey Hills, Woking & Guildford.',
      path: 'M 200,260 L 250,310 L 350,310 L 300,370 L 140,350 Z',
      cx: 240,
      cy: 335,
    },
    {
      id: 'bucks',
      name: 'Berkshire & Bucks Border',
      postcode: 'SL1',
      region: 'Slough, Windsor & Bucks',
      techs: 3,
      responseTime: 45,
      status: 'standby',
      description: 'West boundary near Heathrow, Slough, and Windsor Great Park.',
      path: 'M 190,140 L 160,210 L 200,260 L 140,350 L 60,260 L 90,120 Z',
      cx: 120,
      cy: 230,
    },
  ];

  const handleZoneClick = (zone: ZoneData) => {
    setSelectedZoneId(zone.id);
    onSelectPostcode(zone.postcode);
  };

  const activeZone = hoveredZone || zones.find(z => z.id === selectedZoneId) || zones[0];

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl relative overflow-hidden" id="interactive-coverage-map">
      {/* Background radial glow */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 relative z-10">
        <div>
          <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Dispatch Operations Map
          </span>
          <h4 className="text-lg font-bold text-white">Visual Coverage & Service Rings</h4>
        </div>
        <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs flex items-center gap-1.5">
          <Navigation className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
          <span className="font-medium text-slate-300">Click any zone to search</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-center relative z-10">
        {/* SVG Map (7 cols on large screens) */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative w-full max-w-[440px] sm:max-w-[480px]">
            <svg
              viewBox="0 0 600 400"
              className="w-full h-auto select-none overflow-visible filter drop-shadow-2xl"
              id="london-svg-layer"
            >
              {/* Dot Grid Background */}
              <defs>
                <pattern id="map-dots" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" className="fill-slate-800" />
                </pattern>
                
                {/* Glow effects */}
                <filter id="glow-amber" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              
              <rect width="600" height="400" fill="url(#map-dots)" rx="16" />

              {/* Styled Thames River Flowing through London */}
              <path
                d="M 40,240 C 130,240 160,200 240,200 C 310,200 340,250 440,210 C 500,190 550,200 580,200"
                fill="none"
                stroke="rgba(14, 165, 233, 0.25)"
                strokeWidth="10"
                strokeLinecap="round"
                className="pointer-events-none"
              />
              <path
                d="M 40,240 C 130,240 160,200 240,200 C 310,200 340,250 440,210 C 500,190 550,200 580,200"
                fill="none"
                stroke="rgba(14, 165, 233, 0.4)"
                strokeWidth="3"
                strokeLinecap="round"
                className="pointer-events-none"
              />

              {/* M25 Orbital motorway visual placeholder boundary */}
              <rect
                x="45"
                y="35"
                width="510"
                height="330"
                rx="160"
                ry="120"
                fill="none"
                stroke="rgba(100, 116, 139, 0.15)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                className="pointer-events-none"
              />
              <text
                x="210"
                y="28"
                className="text-[9px] font-bold fill-slate-600 tracking-widest uppercase pointer-events-none"
              >
                M25 Greater London Boundary Ring
              </text>

              {/* Interactive Zone Polygons */}
              {zones.map((zone) => {
                const isSelected = selectedZoneId === zone.id;
                const isHovered = hoveredZone?.id === zone.id;
                
                return (
                  <g key={zone.id}>
                    <path
                      d={zone.path}
                      onClick={() => handleZoneClick(zone)}
                      onMouseEnter={() => setHoveredZone(zone)}
                      onMouseLeave={() => setHoveredZone(null)}
                      className={`transition-all duration-300 cursor-pointer stroke-slate-950 stroke-2 ${
                        isSelected
                          ? 'fill-amber-500 opacity-90 shadow-lg'
                          : isHovered
                          ? 'fill-amber-500/50 opacity-80'
                          : 'fill-slate-800/65 hover:fill-slate-700/80 opacity-70'
                      }`}
                    />
                    
                    {/* Minimal Center Dots/Markers */}
                    {zone.cx && zone.cy && (
                      <circle
                        cx={zone.cx}
                        cy={zone.cy}
                        r={isSelected || isHovered ? 4.5 : 3.5}
                        className={`pointer-events-none transition-all duration-300 ${
                          isSelected ? 'fill-slate-950' : 'fill-amber-500'
                        }`}
                      />
                    )}
                    
                    {/* Dynamic text layer */}
                    {zone.cx && zone.cy && (
                      <text
                        x={zone.cx}
                        y={zone.cy - 10}
                        textAnchor="middle"
                        className={`text-[9px] font-black uppercase tracking-wider pointer-events-none transition-colors duration-200 ${
                          isSelected ? 'fill-white font-extrabold' : isHovered ? 'fill-amber-400' : 'fill-slate-400'
                        }`}
                      >
                        {zone.id === 'bucks' ? 'BERKS' : zone.id.toUpperCase()}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Dynamic Zone Statistics Display (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950 border border-slate-800 p-4 sm:p-5 rounded-xl space-y-4 shadow-inner relative">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">Selected Hub / Sector</span>
                <h5 className="text-base font-black text-white mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  {activeZone.name}
                </h5>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                activeZone.status === 'active'
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              }`}>
                ● {activeZone.status}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-semibold">
              {activeZone.description}
            </p>

            {/* Technical Metrics Dashboard */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center">
                <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1.5">Average Response</span>
                <span className="text-sm font-black text-white flex items-center justify-center gap-1">
                  <Clock className="w-4 h-4 text-amber-500" />
                  ~{activeZone.responseTime} min
                </span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center">
                <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1.5">Active Crews</span>
                <span className="text-sm font-black text-white flex items-center justify-center gap-1">
                  <Users className="w-4 h-4 text-amber-500" />
                  {activeZone.techs} Dispatch
                </span>
              </div>
            </div>

            {/* Selection Prompt CTA */}
            <button
              onClick={() => handleZoneClick(activeZone)}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 px-4 rounded-lg text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 shadow-md shadow-amber-500/10"
            >
              <Shield className="w-4 h-4" />
              Check Area: {activeZone.postcode}
            </button>
          </div>

          <div className="text-[10px] text-slate-500 leading-normal flex items-start gap-1.5 px-1 font-semibold">
            <span className="text-amber-500">•</span>
            <span>Hover or tap different sectors to explore response centers. Clicking updates the checker with local outward codes.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
