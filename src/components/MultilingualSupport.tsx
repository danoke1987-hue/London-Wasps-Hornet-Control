/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Globe2, PhoneCall, ShieldCheck, Heart, AlertTriangle, 
  MessageSquare, Languages, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LanguageDetail {
  id: string;
  name: string;
  nativeName: string;
  flag: string; // Emoji flag representation
  welcome: string;
  description: string;
  hotkeyText: string;
  phrases: {
    waspNest: string;
    emergency: string;
    safety: string;
    guarantee: string;
  };
}

const languagesData: LanguageDetail[] = [
  {
    id: 'polish',
    name: 'Polish',
    nativeName: 'Polski',
    flag: '🇵🇱',
    welcome: 'Witamy! Usuwanie gniazd os i szerszeni w Londynie.',
    description: 'Oferujemy profesjonalne i bezpieczne usuwanie gniazd os i szerszeni przez 24 godziny na dobę, 7 dni w tygodniu. Bezpieczne dla dzieci i zwierząt domowych z pełną gwarancją.',
    hotkeyText: 'Zadzwoń do nas pod numer 020 7946 0852. Współpracujemy z tłumaczem telefonicznym na żywo.',
    phrases: {
      waspNest: 'Usuwanie gniazd os',
      emergency: 'Pomoc w nagłych wypadkach 24/7',
      safety: 'Bezpieczne dla dzieci i zwierząt',
      guarantee: '100% Gwarancji skuteczności'
    }
  },
  {
    id: 'spanish',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    welcome: '¡Bienvenido! Eliminación de nidos de avispas y avispones en Londres.',
    description: 'Servicio profesional de erradicación de nidos de avispas y avispones las 24 horas, los 7 días de la semana. Seguro para niños y mascotas, respaldado por una garantía del 100%.',
    hotkeyText: 'Llámenos ahora al 020 7946 0852. Ofrecemos asistencia con traductores telefónicos en tiempo real.',
    phrases: {
      waspNest: 'Eliminación de nidos de avispas',
      emergency: 'Urgencias 24 horas al día',
      safety: 'Seguro para niños y mascotas',
      guarantee: 'Garantía del 100% de eliminación'
    }
  },
  {
    id: 'bengali',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇧🇩',
    welcome: 'স্বাগতম! লন্ডনে বোলতা এবং ভিমরুল বাসা অপসারণ সেবা।',
    description: 'লন্ডনে ২৪/৭ পেশাদার এবং নিরাপদ বোলতা ও ভimerul অপসারণ সেবা। শিশু এবং পোষা প্রাণীদের জন্য সম্পূর্ণ নিরাপদ এবং ১০০% গ্যারান্টিযুক্ত।',
    hotkeyText: 'আমাদের ০২০ ৭৯৪৬ ০৮৫২ নম্বরে কল করুন। আমরা ফোনের মাধ্যমে তাত্ক্ষণিক দোভাষী সহায়তা প্রদান করি।',
    phrases: {
      waspNest: 'বোলতার বাসা অপসারণ',
      emergency: '২৪/৭ জরুরী প্রতিক্রিয়া',
      safety: 'শিশু এবং পোষা প্রাণীদের নিরাপত্তা',
      guarantee: '১০০% নিশ্চিত ফলাফল'
    }
  },
  {
    id: 'gujarati',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    flag: '🇮🇳',
    welcome: 'સ્વાગત છે! લંડનમાં ભમરી અને મધમાખીના માળાઓ હટાવવાની સેવા.',
    description: 'ચોવીસ કલાક (24/7) વ્યાવસાયિક ભમરીના માળા હટાવવાની અત્યંત સુરક્ષિત અને ઝડપી સેવા. બાળકો અને પાલતુ પ્રાણીઓ માટે સંપૂર્ણપણે સલામત.',
    hotkeyText: 'અમને 020 7946 0852 પર કૉલ કરો. અમે ફોન પર ત્વરિત અનુવાદ સહાય પૂરી પાડી શકીએ છીએ.',
    phrases: {
      waspNest: 'ભમરીના માળા હટાવવા',
      emergency: '૨૪/૭ કટોકટી સેવા',
      safety: 'બાળકો અને પાલતુ માટે સુરક્ષિત',
      guarantee: '૧૦૦% નાબૂદી ગેરંટી'
    }
  },
  {
    id: 'french',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    welcome: 'Bienvenue ! Éradication de nids de guêpes et de frelons à Londres.',
    description: 'Services professionnels d’élimination de nids de guêpes et frelons 24h/24, 7j/7. Totalement sûr pour les enfants et vos animaux, avec une garantie de ré-intervention gratuite.',
    hotkeyText: 'Contactez-nous au 020 7946 0852. Nous disposons d’interprètes par téléphone en temps réel.',
    phrases: {
      waspNest: 'Destruction de nids de guêpes',
      emergency: 'Intervention d’urgence 24h/7j',
      safety: 'Sûr pour enfants et animaux',
      guarantee: 'Garantie d’élimination à 100%'
    }
  },
  {
    id: 'italian',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    welcome: 'Benvenuto! Rimozione nidi di vespe e calabroni a Londra.',
    description: 'Disinfestazione professionale di vespe e calabroni attiva 24 ore su 24. Trattamenti ecologici sicuri per la tua famiglia e animali domestici, coperti da polizza da £5M.',
    hotkeyText: 'Chiamaci subito al numero 020 7946 0852. Possiamo attivare un traduttore simultaneo al telefono.',
    phrases: {
      waspNest: 'Rimozione nidi di vespe',
      emergency: 'Pronto intervento 24/7',
      safety: 'Sicuro per bambini e animali',
      guarantee: 'Successo garantito al 100%'
    }
  },
  {
    id: 'portuguese',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    welcome: 'Bem-vindo! Eliminação de ninhos de vespas e vespões em Londres.',
    description: 'Remoção urgente e profissional de ninhos de vespas 24h por dia. Soluções de alta segurança para crianças e animais domésticos, com garantia absoluta de eliminação.',
    hotkeyText: 'Ligue para 020 7946 0852. Fornecemos suporte imediato com intérpretes de chamada em português.',
    phrases: {
      waspNest: 'Remoção de ninhos de vespas',
      emergency: 'Serviço de urgência 24/7',
      safety: 'Seguro para crianças e animais',
      guarantee: 'Garantia de eliminação a 100%'
    }
  },
  {
    id: 'romanian',
    name: 'Romanian',
    nativeName: 'Română',
    flag: '🇷🇴',
    welcome: 'Bun venit! Îndepărtarea cuiburilor de viespi și gărgăuni în Londra.',
    description: 'Servicii de urgență 24/7 pentru eliminarea cuiburilor de viespi. Tratamente cu substanțe omologate COSHH, sigure pentru copii și animalele de companie.',
    hotkeyText: 'Sunați-ne la 020 7946 0852. Vă conectăm instantaneu cu un traducător live în timpul apelului.',
    phrases: {
      waspNest: 'Eliminare cuiburi de viespi',
      emergency: 'Asistență de urgență 24/7',
      safety: 'Sigur pentru copii și animale',
      guarantee: 'Garanție de combatere 100%'
    }
  },
  {
    id: 'turkish',
    name: 'Turkish',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
    welcome: 'Hoş geldiniz! Londra genelinde yaban arısı ve eşek arısı yuvaları imhası.',
    description: '7 gün 24 saat acil arı yuvası imha hizmeti. Evcil hayvanlar ve çocuklarınız için tamamen zararsız ilaçlama prosedürleri, %100 kesin çözüm.',
    hotkeyText: 'Hemen 020 7946 0852 numaralı telefonu arayın. Telefonda anında Türkçe tercüman bağlayabiliriz.',
    phrases: {
      waspNest: 'Yaban arısı yuvası imhası',
      emergency: '7/24 Kesintisiz Acil Destek',
      safety: 'Çocuk ve evcil hayvan dostu',
      guarantee: '%100 Kalıcı Sonuç Garantisi'
    }
  },
  {
    id: 'arabic',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    welcome: 'مرحباً بكم! خدمة التخلص السريع من أعشاش الدبابير في لندن.',
    description: 'خدمة مهنية معتمدة للقضاء على الدبابير والزنابير على مدار ٢٤ ساعة طوال أيام الأسبوع. آمن تماماً على الأطفال والحيوانات الأليفة مع ضمان إعادة الخدمة مجاناً.',
    hotkeyText: 'اتصل بنا الآن على الرقم 02079460852. يمكننا توفير مترجم فوري مباشر باللغة العربية أثناء المكالمة.',
    phrases: {
      waspNest: 'إزالة أعشاش الدبابير والزنابير',
      emergency: 'استجابة سريعة للطوارئ ٢٤/٧',
      safety: 'آمن على الأطفال والحيوانات الأليفة',
      guarantee: 'ضمان إزالة تام بنسبة ١٠٠%'
    }
  }
];

export default function MultilingualSupport() {
  const [selectedLangId, setSelectedLangId] = useState<string>('polish');

  const selectedLang = languagesData.find(l => l.id === selectedLangId) || languagesData[0];
  const isRtl = selectedLang.id === 'arabic';

  const handleScrollToBook = () => {
    const bookingSection = document.getElementById('book');
    if (bookingSection) {
      // Find the select element inside booking section and set value or simply focus on it
      const selectElement = bookingSection.querySelector('select[name="languageSupport"]');
      if (selectElement) {
        (selectElement as HTMLSelectElement).value = selectedLang.name;
        // Trigger simulated change event
        const event = new Event('change', { bubbles: true });
        selectElement.dispatchEvent(event);
      }
      
      const navbarOffset = 110;
      const elementPosition = bookingSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="multilingual-support" className="py-20 bg-white border-b border-slate-100 relative overflow-hidden">
      {/* Background aesthetic details */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full filter blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-600 uppercase tracking-wider mb-4">
            <Languages className="w-4 h-4 animate-spin-slow" />
            London Multilingual Support Centre
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
            Multilingual Customer Assistance
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-semibold leading-relaxed">
            London is home to vibrant international communities speaking over 300 languages. To ensure the safety of all families, we offer specialized phone-translation support in London's 10 most common non-English languages. Explore guidelines in your native language below.
          </p>
        </div>

        {/* Outer grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Language Tabs */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3 px-1">
              Select your preferred language:
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 max-h-[460px] overflow-y-auto pr-1.5 custom-scrollbar">
              {languagesData.map((lang) => {
                const isSelected = selectedLangId === lang.id;
                return (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLangId(lang.id)}
                    className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-center gap-3 cursor-pointer focus:outline-none ${
                      isSelected
                        ? 'bg-slate-950 border-slate-950 text-white font-black shadow-lg shadow-slate-950/10'
                        : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100 text-slate-700 font-bold hover:text-slate-900'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl" role="img" aria-label={lang.name}>
                      {lang.flag}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-black">{lang.nativeName}</span>
                      <span className={`text-[10px] uppercase font-bold tracking-wider leading-none mt-0.5 ${
                        isSelected ? 'text-amber-500' : 'text-slate-400'
                      }`}>
                        {lang.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side: Active Language Translation Details card */}
          <div className="lg:col-span-8">
            <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-900 shadow-xl relative overflow-hidden">
              <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-amber-500/5 rounded-full filter blur-[100px] pointer-events-none"></div>

              {/* Header inside card */}
              <div className="flex items-center justify-between border-b border-slate-850 pb-6 mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl sm:text-5xl" role="img" aria-label={selectedLang.name}>
                    {selectedLang.flag}
                  </span>
                  <div>
                    <span className="text-xs font-black uppercase text-amber-500 tracking-wider">
                      {selectedLang.name} Translations
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                      {selectedLang.nativeName}
                    </h3>
                  </div>
                </div>

                <div className="hidden sm:inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <Globe2 className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
                  Live Interpreter Active
                </div>
              </div>

              {/* Content Translation Block */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLang.id}
                  initial={{ opacity: 0, x: isRtl ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRtl ? 10 : -10 }}
                  transition={{ duration: 0.2 }}
                  className={`space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}
                  dir={isRtl ? 'rtl' : 'ltr'}
                >
                  <div className="space-y-3">
                    <h4 className="text-lg sm:text-xl font-extrabold text-amber-500 leading-snug">
                      "{selectedLang.welcome}"
                    </h4>
                    <p className="text-sm text-slate-300 font-medium leading-relaxed">
                      {selectedLang.description}
                    </p>
                  </div>

                  {/* 4 Core Phrases Grid */}
                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-900">
                    <div className="bg-slate-900/60 border border-slate-850 p-4 rounded-xl flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Wasp Nest Removal
                        </span>
                        <span className="block text-xs font-black text-white mt-0.5">
                          {selectedLang.phrases.waspNest}
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-850 p-4 rounded-xl flex items-start gap-3">
                      <PhoneCall className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Emergency Assistance
                        </span>
                        <span className="block text-xs font-black text-white mt-0.5">
                          {selectedLang.phrases.emergency}
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-850 p-4 rounded-xl flex items-start gap-3">
                      <Heart className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Pet & Child Safety
                        </span>
                        <span className="block text-xs font-black text-white mt-0.5">
                          {selectedLang.phrases.safety}
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-850 p-4 rounded-xl flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Eradication Guarantee
                        </span>
                        <span className="block text-xs font-black text-white mt-0.5">
                          {selectedLang.phrases.guarantee}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Immediate Action instructions */}
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl mt-6 space-y-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <h5 className="text-xs font-black uppercase text-white tracking-wider">
                        How to Speak to us in {selectedLang.name}:
                      </h5>
                    </div>

                    <p className="text-xs text-slate-300 font-bold leading-normal">
                      {selectedLang.hotkeyText}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      <a
                        href="tel:02079460852"
                        className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-black py-3 px-4 rounded-xl text-xs sm:text-sm transition-all"
                      >
                        <PhoneCall className="w-4 h-4" />
                        Call and Ask for "{selectedLang.name}"
                      </a>

                      <button
                        onClick={handleScrollToBook}
                        className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-950 font-black py-3 px-4 rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
                      >
                        Book Online with Interpreter
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

        {/* Translation disclaimer & Info blocks */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-slate-100">
          <div className="space-y-2">
            <h4 className="font-black text-slate-950 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Telephone Interpreter Service
            </h4>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              When calling, simply state your language (e.g., "Polish interpreter please"). Our agents will connect with a professional pest control translation partner within 60 seconds.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-black text-slate-950 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Multilingual On-Site Technicians
            </h4>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              Many of our active London specialists speak multiple languages natively. If possible, we dispatch a technician who speaks your language for clear communication of treatment steps.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-black text-slate-950 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Digital Support & Invoicing
            </h4>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              Our safety instructions, booking confirmations, treatment reports, and commercial invoices can be dynamically issued in any of the 10 languages selected.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
