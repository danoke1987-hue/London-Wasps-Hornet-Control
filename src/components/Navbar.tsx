/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Bug, Phone, Menu, X, ChevronDown, CheckCircle, Shield } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when changing page/route
  useEffect(() => {
    setActiveDropdown(null);
    setIsOpen(false);
  }, [location.pathname]);

  const handleItemClick = (id: string) => {
    setIsOpen(false);
    setActiveDropdown(null);
    if (location.pathname === '/') {
      onNavigate(id);
    } else {
      navigate(`/?section=${id}`);
    }
  };

  const servicesLinks = [
    { label: 'Wasp Nest Eradication', path: '/service/wasp-nest-removal' },
    { label: 'Hornet Control', path: '/service/hornet-control' },
    { label: 'Emergency 24/7 Call Out', path: '/service/emergency-removal' },
    { label: 'Residential Home Service', path: '/service/residential-control' },
    { label: 'Commercial SLA Support', path: '/service/commercial-control' },
  ];

  const areasLinks = [
    { label: 'South West London (SW)', path: '/zone/sw' },
    { label: 'South East London (SE)', path: '/zone/se' },
    { label: 'West London (W)', path: '/zone/w' },
    { label: 'East London (E)', path: '/zone/e' },
    { label: 'Croydon & Surrey (CR)', path: '/zone/cr' },
    { label: 'Kingston & Surrey (KT)', path: '/zone/kt' },
    { label: 'Enfield & Herts (EN)', path: '/zone/en' },
    { label: 'Romford & Essex (RM)', path: '/zone/rm' },
  ];

  const pestsLinks = [
    { label: 'Common Wasp', path: '/pest/wasp' },
    { label: 'European Hornet', path: '/pest/hornet' },
    { label: 'Honeybee (Protected)', path: '/pest/honeybee' },
    { label: 'Bumblebee (Protected)', path: '/pest/bumblebee' },
  ];

  const isHome = location.pathname === '/';

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 text-white shadow-xl backdrop-blur-md border-b border-slate-800'
          : 'bg-slate-900 text-white border-b border-slate-800'
      }`}
    >
      {/* Top Banner - Emergency Broadcast */}
      <div className="bg-amber-500 text-slate-950 px-4 py-2 text-center text-xs font-semibold flex items-center justify-center gap-2 select-none">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
        </span>
        <span className="uppercase tracking-wider font-bold">24/7 Emergency Wasp & Hornet Removal</span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:inline">1-Hour Dispatch Across London & Surroundings</span>
        <span className="hidden md:inline">•</span>
        <a href="tel:02079460852" className="underline font-bold hover:text-red-700 flex items-center gap-1">
          <Phone className="w-3 h-3" /> 020 7946 0852
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => {
              if (isHome) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 group text-left focus:outline-none"
            id="nav-logo"
          >
            <div className="bg-amber-500 p-2 rounded-lg group-hover:bg-amber-400 transition-colors">
              <Bug className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <span className="block text-lg font-black tracking-tight uppercase leading-none text-amber-500 group-hover:text-amber-400 animate-pulse">
                Wasps & Hornets
              </span>
              <span className="block text-xs font-semibold tracking-widest text-slate-400 uppercase leading-none mt-1">
                Removal
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Home / Scroll Link */}
            <button
              onClick={() => handleItemClick('hero')}
              className={`text-sm font-semibold tracking-wide hover:text-amber-500 transition-colors cursor-pointer py-2 ${
                isHome && activeSection === 'hero' ? 'text-amber-500 font-bold' : 'text-slate-300'
              }`}
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div 
              className="relative py-2 group"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-sm font-semibold tracking-wide text-slate-300 hover:text-amber-500 transition-colors cursor-pointer flex items-center gap-1">
                Services <ChevronDown className="w-4 h-4" />
              </button>
              
              <div className="absolute top-full left-0 w-60 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2.5 mt-1 hidden group-hover:block animate-fade-in">
                {servicesLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block text-xs font-bold text-slate-300 hover:text-amber-500 hover:bg-slate-800/50 p-2.5 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-slate-800 my-1.5"></div>
                <button
                  onClick={() => handleItemClick('services')}
                  className="w-full text-left text-[11px] font-extrabold text-amber-500 hover:text-white hover:bg-slate-800/50 p-2 rounded-lg transition-colors uppercase tracking-widest"
                >
                  All Services Panel
                </button>
              </div>
            </div>

            {/* Pest ID Dropdown */}
            <div 
              className="relative py-2 group"
              onMouseEnter={() => setActiveDropdown('pests')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-sm font-semibold tracking-wide text-slate-300 hover:text-amber-500 transition-colors cursor-pointer flex items-center gap-1">
                Pest Guides <ChevronDown className="w-4 h-4" />
              </button>
              
              <div className="absolute top-full left-0 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2.5 mt-1 hidden group-hover:block animate-fade-in">
                {pestsLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block text-xs font-bold text-slate-300 hover:text-amber-500 hover:bg-slate-800/50 p-2.5 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-slate-800 my-1.5"></div>
                <button
                  onClick={() => handleItemClick('pest-id')}
                  className="w-full text-left text-[11px] font-extrabold text-amber-500 hover:text-white hover:bg-slate-800/50 p-2 rounded-lg transition-colors uppercase tracking-widest"
                >
                  Diagnostic Tool
                </button>
              </div>
            </div>

            {/* Coverage Areas Dropdown */}
            <div 
              className="relative py-2 group"
              onMouseEnter={() => setActiveDropdown('areas')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-sm font-semibold tracking-wide text-slate-300 hover:text-amber-500 transition-colors cursor-pointer flex items-center gap-1">
                Local Areas <ChevronDown className="w-4 h-4" />
              </button>
              
              <div className="absolute top-full right-0 lg:left-0 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2.5 mt-1 hidden group-hover:block grid grid-cols-1 gap-1">
                {areasLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block text-xs font-bold text-slate-300 hover:text-amber-500 hover:bg-slate-800/50 p-2 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-slate-800 my-1.5 col-span-1"></div>
                <button
                  onClick={() => handleItemClick('coverage')}
                  className="w-full text-left text-[11px] font-extrabold text-amber-500 hover:text-white hover:bg-slate-800/50 p-2 rounded-lg transition-colors uppercase tracking-widest col-span-1"
                >
                  Postcode Coverage Checker
                </button>
              </div>
            </div>

            {/* Estimator */}
            <button
              onClick={() => handleItemClick('estimator')}
              className={`text-sm font-semibold tracking-wide hover:text-amber-500 transition-colors cursor-pointer py-2 ${
                isHome && activeSection === 'estimator' ? 'text-amber-500 font-bold' : 'text-slate-300'
              }`}
            >
              Cost Estimator
            </button>

            {/* FAQs */}
            <button
              onClick={() => handleItemClick('faqs')}
              className={`text-sm font-semibold tracking-wide hover:text-amber-500 transition-colors cursor-pointer py-2 ${
                isHome && activeSection === 'faqs' ? 'text-amber-500 font-bold' : 'text-slate-300'
              }`}
            >
              FAQs
            </button>
          </div>

          {/* Call and Book Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:02079460852"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-transform active:scale-95 shadow-md shadow-red-900/20 hover:shadow-red-900/40"
              id="navbar-emergency-call"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden md:inline">Call 24/7:</span> 020 7946 0852
            </a>
            <button
              onClick={() => handleItemClick('book')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-sm transition-all active:scale-95 shadow-md shadow-amber-500/10"
              id="navbar-book-online"
            >
              Book Online
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-md focus:outline-none"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 max-h-[calc(100vh-80px)] overflow-y-auto" id="mobile-menu-drawer">
          <div className="px-2 pt-2 pb-6 space-y-1.5 sm:px-3">
            {/* Scroll Links */}
            <button
              onClick={() => handleItemClick('hero')}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Home
            </button>

            {/* Specialist Services Sub-menu */}
            <div className="px-3 py-1 text-xs uppercase tracking-widest font-bold text-slate-500 border-b border-slate-800/60 mt-4">
              Specialist Services
            </div>
            {servicesLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-6 py-2 rounded-md text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-amber-500"
              >
                {link.label}
              </Link>
            ))}

            {/* Pest Species Sub-menu */}
            <div className="px-3 py-1 text-xs uppercase tracking-widest font-bold text-slate-500 border-b border-slate-800/60 mt-4">
              Pest Identifier Guides
            </div>
            {pestsLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-6 py-2 rounded-md text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-amber-500"
              >
                {link.label}
              </Link>
            ))}

            {/* Coverage Areas Sub-menu */}
            <div className="px-3 py-1 text-xs uppercase tracking-widest font-bold text-slate-500 border-b border-slate-800/60 mt-4">
              Popular Local Areas
            </div>
            {areasLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-6 py-2 rounded-md text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-amber-500"
              >
                {link.label}
              </Link>
            ))}

            {/* Quick Links */}
            <div className="px-3 py-1 text-xs uppercase tracking-widest font-bold text-slate-500 border-b border-slate-800/60 mt-4">
              Core Panels
            </div>
            <button
              onClick={() => handleItemClick('estimator')}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Cost Estimator Calculator
            </button>
            <button
              onClick={() => handleItemClick('faqs')}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              FAQs & Safety Rules
            </button>

            {/* Mobile Actions */}
            <div className="pt-6 border-t border-slate-800 space-y-3 px-3">
              <a
                href="tel:02079460852"
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded-lg text-base font-bold transition-all shadow-md"
              >
                <Phone className="w-5 h-5" />
                Emergency Call: 020 7946 0852
              </a>
              <button
                onClick={() => handleItemClick('book')}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-lg text-base transition-all"
              >
                Book Online
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
