/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bug, Phone, Mail, Clock, HelpCircle, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleItemClick = (id: string) => {
    if (location.pathname === '/') {
      onNavigate(id);
    } else {
      navigate(`/?section=${id}`);
    }
  };

  const coverageAreas = [
    { label: 'South West London (SW)', code: 'sw' },
    { label: 'South East London (SE)', code: 'se' },
    { label: 'West London (W)', code: 'w' },
    { label: 'East London (E)', code: 'e' },
    { label: 'North London (N)', code: 'n' },
    { label: 'Croydon & Surrey (CR)', code: 'cr' },
    { label: 'Kingston & Surrey (KT)', code: 'kt' },
    { label: 'Bromley & Kent (BR)', code: 'br' },
  ];

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Directory Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 pb-12 border-b border-slate-900">
          
          {/* Logo & Callout */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-amber-500 p-2 rounded-lg">
                <Bug className="text-slate-950 w-5 h-5" />
              </div>
              <span className="text-base font-black uppercase tracking-tight text-white leading-none">
                Wasps & Hornets Removal
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold">
              Professional, certified wasp and hornet nest eradication services. Operating 24/7/365 across London, Surrey, Kent, Essex, Hertfordshire, and Berkshire.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="tel:02079460852"
                className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-red-500 hover:text-red-400"
              >
                <Phone className="w-3.5 h-3.5" />
                Emergency Hotline: 020 7946 0852
              </a>
              <a
                href="mailto:info@waspsandhornetsremoval.com"
                className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-amber-500 hover:text-amber-400"
              >
                <Mail className="w-3.5 h-3.5" />
                info@waspsandhornetsremoval.com
              </a>
              <a
                href="https://www.waspsandhornetsremoval.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-slate-300 hover:text-white"
              >
                <Globe className="w-3.5 h-3.5" />
                waspsandhornetsremoval.com
              </a>
            </div>
          </div>

          {/* Service options */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Our Services</h4>
            <ul className="space-y-2 text-xs font-bold text-slate-400">
              <li>
                <Link to="/service/wasp-nest-removal" className="hover:text-amber-500 transition-colors">
                  Wasp Nest Eradication
                </Link>
              </li>
              <li>
                <Link to="/service/hornet-control" className="hover:text-amber-500 transition-colors">
                  European Hornet Treatment
                </Link>
              </li>
              <li>
                <Link to="/pest/honeybee" className="hover:text-amber-500 transition-colors">
                  Live Honeybee Extraction
                </Link>
              </li>
              <li>
                <Link to="/pest/bumblebee" className="hover:text-amber-500 transition-colors">
                  Bumblebee Relocation Survey
                </Link>
              </li>
              <li>
                <Link to="/service/commercial-control" className="hover:text-amber-500 transition-colors">
                  Commercial Compliance Surveys
                </Link>
              </li>
            </ul>
          </div>

          {/* Coverage Zones */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Coverage Areas</h4>
            <ul className="space-y-2 text-xs font-bold text-slate-400 grid grid-cols-1 gap-1">
              {coverageAreas.map((area) => (
                <li key={area.code}>
                  <Link to={`/zone/${area.code}`} className="hover:text-amber-500 transition-colors">
                    Wasp Control in {area.label.replace(' London', '')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Information & Accreditations */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Information</h4>
            <ul className="space-y-2 text-xs font-bold text-slate-400">
              <li>
                <button onClick={() => handleItemClick('coverage')} className="hover:text-amber-500 transition-colors cursor-pointer">
                  Postcode Coverage Check
                </button>
              </li>
              <li>
                <button onClick={() => handleItemClick('estimator')} className="hover:text-amber-500 transition-colors cursor-pointer">
                  Pricing Estimator
                </button>
              </li>
              <li>
                <button onClick={() => handleItemClick('faqs')} className="hover:text-amber-500 transition-colors cursor-pointer">
                  Safety & FAQ Portal
                </button>
              </li>
              <li>
                <p className="text-[11px] leading-relaxed font-semibold text-slate-500 mt-2">
                  Conforms strictly to BPCA Codes of Practice, COSHH, and supported by a £5 Million public liability shield.
                </p>
                <p className="text-[10px] text-slate-600 mt-1 leading-relaxed">
                  Company #08412903 • HQ: Battersea Park Road, London SW11.
                </p>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Disclaimer Statement */}
        <div className="grid md:grid-cols-12 gap-6 items-center pt-4">
          
          <div className="md:col-span-8 bg-slate-900 p-4 rounded-xl border border-slate-900 flex gap-3 text-xs text-slate-400 leading-normal">
            <HelpCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="font-semibold">
              <strong>Environmental Conservation Policy:</strong> Wasp nests pose serious sting hazards and must be eradicated if nested in structural properties. However, honeybees are critical ecological elements and are protected. We adhere to safe, chemical-free rehoming solutions for honeybees and bumblebees.
            </p>
          </div>

          <div className="md:col-span-4 text-center md:text-right text-[11px] text-slate-500 font-bold uppercase tracking-wider">
            © 2026 Wasps & Hornets Removal. All Rights Reserved.
          </div>

        </div>

      </div>
    </footer>
  );
}
