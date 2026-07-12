/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Bug, Phone, Menu, X, ChevronDown, CheckCircle, Shield, Globe, Languages } from 'lucide-react';
import { useLanguage, languages } from '../context/LanguageContext';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const { currentLanguage, setLanguage, t, isRtl } = useLanguage();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
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
        <a href="tel:02088198627" className="underline font-bold hover:text-red-700 flex items-center gap-1">
          <Phone className="w-3 h-3" /> 020 8819 8627
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
                Wasp Nest
              </span>
              <span className="block text-xs font-semibold tracking-widest text-slate-400 uppercase leading-none mt-1">
                Exterminators
              </span>
            </div>
          </Link>
          <div className="hidden lg:flex items-center gap-5">
            {/* Home / Scroll Link */}
            <button
              onClick={() => handleItemClick('hero')}
              className={`text-sm font-semibold tracking-wide hover:text-amber-500 transition-colors cursor-pointer py-2 ${
                isHome && activeSection === 'hero' ? 'text-amber-500 font-bold' : 'text-slate-300'
              }`}
            >
              {t('nav.home')}
            </button>

            {/* Services Dropdown */}
            <div 
              className="relative py-2 group"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-sm font-semibold tracking-wide text-slate-300 hover:text-amber-500 transition-colors cursor-pointer flex items-center gap-1">
                {t('nav.services')} <ChevronDown className="w-4 h-4" />
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
                    className="block text-xs font-bold text-slate-300 hover:text-amber-500 hover:bg-slate-800/50 p-2.5 rounded-lg transition-colors"
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
              {t('nav.calculator')}
            </button>

            {/* Multilingual Support */}
            <button
              onClick={() => handleItemClick('multilingual-support')}
              className={`text-sm font-semibold tracking-wide hover:text-amber-500 transition-colors cursor-pointer py-2 ${
                isHome && activeSection === 'multilingual-support' ? 'text-amber-500 font-bold' : 'text-slate-300'
              }`}
            >
              {t('nav.languages')}
            </button>

            {/* FAQs */}
            <button
              onClick={() => handleItemClick('faqs')}
              className={`text-sm font-semibold tracking-wide hover:text-amber-500 transition-colors cursor-pointer py-2 ${
                isHome && activeSection === 'faqs' ? 'text-amber-500 font-bold' : 'text-slate-300'
              }`}
            >
              {t('nav.faqs')}
            </button>
          </div>

          {/* Call and Book Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Language Dropdown Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 hover:bg-slate-750 px-3 py-2 rounded-xl text-xs font-black text-white hover:text-amber-500 transition-all cursor-pointer select-none"
              >
                <span>{languages.find(l => l.code === currentLanguage)?.flag}</span>
                <span className="uppercase tracking-wider">{currentLanguage}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 z-50 max-h-72 overflow-y-auto custom-scrollbar">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 hover:bg-slate-800 hover:text-amber-500 cursor-pointer ${
                        currentLanguage === lang.code ? 'text-amber-500 bg-slate-850 font-black' : 'text-slate-300'
                      }`}
                    >
                      <span className="text-sm">{lang.flag}</span>
                      <div className="flex flex-col text-left">
                        <span className="leading-none text-[11px]">{lang.nativeName}</span>
                        <span className="text-[8px] text-slate-500 mt-0.5 uppercase tracking-wider">{lang.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="tel:02088198627"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-transform active:scale-95 shadow-md shadow-red-900/20 hover:shadow-red-900/40"
              id="navbar-emergency-call"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden md:inline">{t('nav.callNow')}:</span> 020 8819 8627
            </a>
            <button
              onClick={() => handleItemClick('book')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-sm transition-all active:scale-95 shadow-md shadow-amber-500/10"
              id="navbar-book-online"
            >
              {t('hero.btnBook')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Simple Mobile Lang Button */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-black text-white cursor-pointer select-none"
              >
                <span>{languages.find(l => l.code === currentLanguage)?.flag}</span>
                <span className="uppercase">{currentLanguage}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-850 rounded-xl shadow-2xl p-1 z-50 max-h-60 overflow-y-auto custom-scrollbar">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full text-left px-2 py-1.5 rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1.5 hover:bg-slate-800 hover:text-amber-500 text-slate-300 cursor-pointer"
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

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
              {t('nav.home')}
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
              {t('nav.calculator')}
            </button>
            <button
              onClick={() => handleItemClick('multilingual-support')}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              {t('nav.languages')}
            </button>
            <button
              onClick={() => handleItemClick('faqs')}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              {t('nav.faqs')}
            </button>

            {/* Mobile Language Grid */}
            <div className="px-3 pt-6 border-t border-slate-800">
              <div className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">
                Select Website Language / Diller 🌐
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all text-center cursor-pointer ${
                      currentLanguage === lang.code
                        ? 'bg-amber-500 border-amber-500 text-slate-950 font-black shadow-lg'
                        : 'bg-slate-850 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-lg leading-none">{lang.flag}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider mt-1">{lang.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="pt-6 border-t border-slate-800 space-y-3 px-3">
              <a
                href="tel:02088198627"
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded-lg text-base font-bold transition-all shadow-md"
              >
                <Phone className="w-5 h-5" />
                020 8819 8627
              </a>
              <button
                onClick={() => handleItemClick('book')}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-lg text-base transition-all"
              >
                {t('hero.btnBook')}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
