/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingCallButton from './components/FloatingCallButton';
import { LanguageProvider } from './context/LanguageContext';

// Pages
import Home from './pages/Home';
import ZonePage from './pages/ZonePage';
import ServicePage from './pages/ServicePage';
import PestPage from './pages/PestPage';
import PostcodeAreaPage from './pages/PostcodeAreaPage';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [prefilledPostcode, setPrefilledPostcode] = useState('');
  const [prefilledEstimates, setPrefilledEstimates] = useState<any>(undefined);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarOffset = 110; // offset for the sticky nav + top bar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCheckPostcode = (postcode: string) => {
    setPrefilledPostcode(postcode);
  };

  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 flex flex-col justify-between overflow-x-hidden">
          
          {/* Reset Scroll Position automatically on Route Changes */}
          <ScrollToTop />
          <Analytics />

          {/* Sticky Top-level Navigation */}
          <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

          {/* Core Content View Routing */}
          <main className="flex-grow overflow-x-hidden">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Home 
                    onCheckPostcode={handleCheckPostcode} 
                    prefilledPostcode={prefilledPostcode}
                    prefilledEstimates={prefilledEstimates}
                    setPrefilledEstimates={setPrefilledEstimates}
                  />
                } 
              />
              <Route path="/zone/:id" element={<ZonePage />} />
              <Route path="/service/:id" element={<ServicePage />} />
              <Route path="/pest/:id" element={<PestPage />} />
              <Route path="/area/:areaName/:postcode" element={<PostcodeAreaPage />} />
            </Routes>
          </main>

          {/* Footer Content */}
          <Footer onNavigate={handleNavigate} />

          {/* Floating Mobile-only Call Now Emergency Button */}
          <FloatingCallButton />

        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
