/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'pl' | 'es' | 'bn' | 'gu' | 'fr' | 'it' | 'pt' | 'ro' | 'tr' | 'ar';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  isRtl: boolean;
}

export const languages: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', isRtl: false },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', isRtl: false },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', isRtl: false },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', isRtl: false },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', isRtl: false },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', isRtl: false },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', isRtl: false },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', isRtl: false },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', isRtl: false },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', isRtl: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', isRtl: true }
];

export const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.calculator': 'Cost Estimator',
    'nav.languages': 'Languages 🌐',
    'nav.faqs': 'FAQs',
    'nav.reviews': 'Reviews',
    'nav.callNow': 'Call Dispatcher',
    'nav.emergencyHotline': 'Emergency Hotline: 020 8819 8627',
    'nav.coverage': 'Postcode Coverage',

    // Hero Section
    'hero.title': 'Professional Wasp & Hornet Nest Eradication',
    'hero.subtitle': 'Certified local pest control technicians dispatching 24/7/365 across London & South East. 100% eradication guaranteed or your money back. Under 1 hour response time.',
    'hero.tag': 'Emergency Dispatch Active • 24/7/365',
    'hero.btnBook': 'Book Removal Online',
    'hero.btnCall': 'Call Emergency Hotline',
    'hero.guarantee': '100% Elimination Guarantee',
    'hero.certified': 'BPCA Certified',
    'hero.insurance': '£5M Liability Cover',

    // Quick Stats
    'stats.activeTechs': 'Active On-Call Techs',
    'stats.avgResponse': 'Average Response',
    'stats.warranty': 'Re-treatment Warranty',
    'stats.warrantyVal': '100% Guaranteed',
    'stats.safety': 'Safety Protocols',
    'stats.safetyVal': 'Pet & Child Safe',

    // Pest Identifier
    'pest.title': 'Identify the Threat',
    'pest.subtitle': 'Different species require specific eradication methods. Select a type to see diagnostic details.',
    'pest.select': 'Select Pest Category',
    'pest.wasp': 'Common Wasp',
    'pest.hornet': 'European Hornet',
    'pest.yellowjacket': 'Yellowjacket Wasp',

    // Coverage Checker
    'coverage.title': 'Enter Postcode to Check Live Dispatch',
    'coverage.subtitle': 'Check if we have an active patrol vehicle near your neighborhood right now.',
    'coverage.placeholder': 'Enter your outcode (e.g., SW19, GU1, KT12, SL4)',
    'coverage.btnCheck': 'Check Coverage',
    'coverage.dispatched': 'Technicians can arrive in average',
    'coverage.activeTechs': 'Active on-duty technicians nearby',
    'coverage.nearestStation': 'Nearest emergency response station',

    // Calculator
    'calc.title': 'Instant Treatment Cost Estimator',
    'calc.subtitle': 'No hidden fees. Select your parameters below to receive an official, fully-transparent price quote.',
    'calc.propertyType': 'Property Classification',
    'calc.residential': 'Residential Home',
    'calc.commercial': 'Commercial / Corporate',
    'calc.nestCount': 'Number of Active Nests',
    'calc.nestCountDesc': 'Additional nests are treated at highly discounted rates.',
    'calc.urgency': 'Response Priority Level',
    'calc.standard': 'Standard Same-Day (Within 24 Hours)',
    'calc.emergency': 'Emergency Priority Dispatch (Under 1 Hour)',
    'calc.location': 'Nest Location & Height Access',
    'calc.lowGround': 'Ground Level / Low Access (Under 2m)',
    'calc.highRoof': 'High Elevation / Roof / Loft Cavity (Over 2m)',
    'calc.estTotal': 'Estimated Fixed Cost',
    'calc.warrantyIncluded': 'Includes 100% eradication warranty & ecological safety assessment.',
    'calc.bookWithEst': 'Book Online with this Estimate',

    // Booking Form
    'book.title': 'Request Same-Day Treatment',
    'book.subtitle': 'Fill out the form below. Our regional controller will instantly assign the job to the closest technician in your postcode sector.',
    'book.fullName': 'Your Full Name *',
    'book.phone': 'Primary Contact Phone *',
    'book.email': 'Email Address (For Invoice & Warranty) *',
    'book.postcode': 'Treatment Postcode (e.g. SW19 1AA) *',
    'book.date': 'Preferred Booking Date *',
    'book.time': 'Preferred Arrival Slot *',
    'book.timeAm': 'AM (08:00 - 12:00)',
    'book.timePm': 'PM (12:00 - 17:00)',
    'book.timeEve': 'Evening / Emergency (17:00 - 22:00)',
    'book.nestLoc': 'Where is the nest located? *',
    'book.nestLocPlace': 'e.g. Inside the attic / roof tiles',
    'book.lang': 'Preferred Language Support',
    'book.notes': 'Additional Instructions / Safety Warnings',
    'book.notesPlace': 'e.g. Beware of dog, nest is high up in oak tree, etc.',
    'book.btnSubmit': 'Request Technician Dispatch',
    'book.successTitle': 'Booking Request Received!',
    'book.successDesc': 'Our dispatcher is assigning your technician. We will call you back on your phone in under 10 minutes to finalize details.',

    // Multilingual Section
    'multi.title': 'Multilingual Customer Assistance',
    'multi.subtitle': 'We offer live phone-interpreter support in London\'s 10 most common non-English languages. Explore guidelines in your native language.',
    'multi.guide': 'How to speak to us in your native language:',
    'multi.interpreterText': 'When calling, simply request your language. We will connect with a professional telephone translator in under 60 seconds.',

    // Reviews
    'reviews.title': '100% Verified Customer Reviews',
    'reviews.subtitle': 'Read testimonials from local homeowners and property managers who we saved from painful infestations.',
    'reviews.verified': 'Verified London Customer',

    // Footer
    'footer.desc': 'Professional, certified wasp and hornet nest eradication services. Operating 24/7/365 across London, Surrey, Kent, Essex, Hertfordshire, and Berkshire.',
    'footer.hours': 'Operating Hours: 24/7/365 Emergency Service',
    'footer.disclaimer': 'All treatments comply strictly with COSHH regulations and health & safety standards. Professional wasp and hornet control technicians are BPCA-accredited.',
    'footer.rights': 'All rights reserved. Professional Wasp & Hornet Nest Eradication Services.',

    // County / Postcode Page
    'county.localHub': 'Local Dispatch Hub',
    'county.estArrival': 'Est. Arrival Time',
    'county.activeTechs': 'Active Specialists',
    'county.warranty': 'Eradication Warranty',
    'county.warrantyVal': '100% Safe',
    'county.commitment': 'Our Coverage Commitment',
    'county.protocols': 'Service Protocols for this Location',
    'county.bpca': 'BPCA Certified Technicians',
    'county.bpcaDesc': 'Every specialist on call is fully qualified, trained in COSHH regulations, and carries £5M liability protection.',
    'county.retreatment': '100% Re-treatment Guarantee',
    'county.retreatmentDesc': 'If active wasps are still present 48 hours after treatment, we return to re-dose the nest free of charge.',
    'county.ecological': 'Ecological Safeguards',
    'county.ecologicalDesc': 'We do not exterminate beneficial bee colonies. We offer dynamic rehoming alternatives for Honeybees and Bumblebees.'
  },
  pl: {
    // Navigation
    'nav.home': 'Strona Główna',
    'nav.services': 'Usługi',
    'nav.calculator': 'Kalkulator Kosztów',
    'nav.languages': 'Języki 🌐',
    'nav.faqs': 'Częste Pytania',
    'nav.reviews': 'Opinie',
    'nav.callNow': 'Zadzwoń do Dyspozytora',
    'nav.emergencyHotline': 'Infolinia Ratunkowa: 020 8819 8627',
    'nav.coverage': 'Zasięg Kodów Pocztowych',

    // Hero Section
    'hero.title': 'Profesjonalne Usuwanie Gniazd Os i Szerszeni',
    'hero.subtitle': 'Certyfikowani lokalni technicy zwalczania szkodników wysyłani 24/7/365 w Londynie i na Południowym Wschodzie. 100% gwarancji usunięcia lub zwrot pieniędzy. Czas reakcji poniżej godziny.',
    'hero.tag': 'Wysyłka Ratunkowa Aktywna • 24/7/365',
    'hero.btnBook': 'Zarezerwuj Usuwanie Online',
    'hero.btnCall': 'Zadzwoń na Infolinię Ratunkową',
    'hero.guarantee': '100% Gwarancja Likwidacji',
    'hero.certified': 'Certyfikat BPCA',
    'hero.insurance': '£5M Ubezpieczenie OC',

    // Quick Stats
    'stats.activeTechs': 'Aktywni Technicy na Dyżurze',
    'stats.avgResponse': 'Średni Czas Reakcji',
    'stats.warranty': 'Gwarancja Ponownego Zabiegu',
    'stats.warrantyVal': '100% Gwarantowane',
    'stats.safety': 'Protokoły Bezpieczeństwa',
    'stats.safetyVal': 'Bezpieczne dla Dzieci i Zwierząt',

    // Pest Identifier
    'pest.title': 'Zidentyfikuj Zagrożenie',
    'pest.subtitle': 'Różne gatunki wymagają określonych metod likwidacji. Wybierz typ, aby zobaczyć szczegóły diagnostyczne.',
    'pest.select': 'Wybierz Kategorię Szkodnika',
    'pest.wasp': 'Osa Pospolita',
    'pest.hornet': 'Szerszeń Europejski',
    'pest.yellowjacket': 'Osa Dachowa / Klecanka',

    // Coverage Checker
    'coverage.title': 'Wpisz Kod Pocztowy, aby Sprawdzić Zasięg',
    'coverage.subtitle': 'Sprawdź, czy w pobliżu Twojej okolicy znajduje się obecnie aktywny pojazd patrolowy.',
    'coverage.placeholder': 'Wpisz swój kod pocztowy (np. SW19, GU1, KT12, SL4)',
    'coverage.btnCheck': 'Sprawdź Zasięg',
    'coverage.dispatched': 'Technicy mogą przyjechać średnio w',
    'coverage.activeTechs': 'Aktywni dyżurujący technicy w pobliżu',
    'coverage.nearestStation': 'Najbliższa stacja pogotowia ratunkowego',

    // Calculator
    'calc.title': 'Natychmiastowy Kalkulator Kosztów Zabiegu',
    'calc.subtitle': 'Brak ukrytych opłat. Wybierz parametry poniżej, aby otrzymać oficjalną, w pełni przejrzystą wycenę.',
    'calc.propertyType': 'Klasyfikacja Nieruchomości',
    'calc.residential': 'Dom Mieszkalny',
    'calc.commercial': 'Komercyjna / Biurowa',
    'calc.nestCount': 'Liczba Aktywnych Gniazd',
    'calc.nestCountDesc': 'Dodatkowe gniazda są usuwane po bardzo obniżonych cenach.',
    'calc.urgency': 'Poziom Priorytetu Reakcji',
    'calc.standard': 'Standardowy Tego Samego Dnia (W ciągu 24h)',
    'calc.emergency': 'Wysyłka Awaryjna (Poniżej 1 Godziny)',
    'calc.location': 'Lokalizacja Gniazda i Dostępność wysokości',
    'calc.lowGround': 'Poziom Gruntu / Niski Dostęp (Poniżej 2m)',
    'calc.highRoof': 'Wysokie Położenie / Dach / Szczelina w Poddaszu (Powyżej 2m)',
    'calc.estTotal': 'Szacowany Stały Koszt',
    'calc.warrantyIncluded': 'Obejmuje 100% gwarancji usunięcia oraz ekologiczną ocenę bezpieczeństwa.',
    'calc.bookWithEst': 'Zarezerwuj Online z tą Wyceną',

    // Booking Form
    'book.title': 'Poproś o Zabieg Tego Samego Dnia',
    'book.subtitle': 'Wypełnij poniższy formularz. Nasz dyspozytor regionalny natychmiast przypisze zlecenie najbliższemu technikowi w Twojej okolicy.',
    'book.fullName': 'Twoje Imię i Nazwisko *',
    'book.phone': 'Główny Telefon Kontaktowy *',
    'book.email': 'Adres E-mail (Do Faktury i Gwarancji) *',
    'book.postcode': 'Kod Pocztowy Zabiegu (np. SW19 1AA) *',
    'book.date': 'Preferowana Data Rezerwacji *',
    'book.time': 'Preferowane Godziny Przyjazdu *',
    'book.timeAm': 'Przedpołudnie (08:00 - 12:00)',
    'book.timePm': 'Popołudnie (12:00 - 17:00)',
    'book.timeEve': 'Wieczór / Awaryjny (17:00 - 22:00)',
    'book.nestLoc': 'Gdzie znajduje się gniazdo? *',
    'book.nestLocPlace': 'np. Na poddaszu / pod dachówkami',
    'book.lang': 'Preferowany Język Kontaktu',
    'book.notes': 'Dodatkowe Instrukcje / Ostrzeżenia',
    'book.notesPlace': 'np. Uwaga na psa, gniazdo wysoko na dębie itp.',
    'book.btnSubmit': 'Zażądaj Wysyłki Technika',
    'book.successTitle': 'Zgłoszenie Rezerwacji Otrzymane!',
    'book.successDesc': 'Nasz dyspozytor przydziela technika. Oddzwonimy na Twój telefon w ciągu 10 minut, aby potwierdzić szczegóły.',

    // Multilingual Section
    'multi.title': 'Wsparcie Wielojęzyczne dla Klientów',
    'multi.subtitle': 'Oferujemy wsparcie telefoniczne z tłumaczem na żywo w 10 najpopularniejszych językach obcych w Londynie. Zapoznaj się ze wskazówkami w swoim języku.',
    'multi.guide': 'Jak rozmawiać z nami w swoim języku ojczystym:',
    'multi.interpreterText': 'Podczas rozmowy telefonicznej poproś o polskiego tłumacza. Połączymy się z profesjonalnym tłumaczem w mniej niż 60 sekund.',

    // Reviews
    'reviews.title': 'W 100% Zweryfikowane Opinie Klientów',
    'reviews.subtitle': 'Przeczytaj referencje od lokalnych właścicieli domów i zarządców nieruchomości, których uratowaliśmy przed bolesnymi plagami.',
    'reviews.verified': 'Zweryfikowany Klient z Londynu',

    // Footer
    'footer.desc': 'Profesjonalne, certyfikowane usługi usuwania gniazd os i szerszeni. Działamy 24/7/365 w Londynie, Surrey, Kent, Essex, Hertfordshire i Berkshire.',
    'footer.hours': 'Godziny Pracy: Pogotowie Ratunkowe 24/7/365',
    'footer.disclaimer': 'Wszystkie zabiegi są ściśle zgodne z przepisami COSHH oraz normami BHP. Profesjonalni technicy zwalczania os posiadają akredytację BPCA.',
    'footer.rights': 'Wszelkie prawa zastrzeżone. Profesjonalne Usługi Usuwania Gniazd Os i Szerszeni.',

    // County / Postcode Page
    'county.localHub': 'Lokalne Centrum Wysyłki',
    'county.estArrival': 'Szacowany Czas Przybycia',
    'county.activeTechs': 'Aktywni Specjaliści',
    'county.warranty': 'Gwarancja Likwidacji',
    'county.warrantyVal': '100% Bezpieczne',
    'county.commitment': 'Nasze Zobowiązanie do Zasięgu',
    'county.protocols': 'Protokoły Usług dla tej Lokalizacji',
    'county.bpca': 'Technicy z Certyfikatem BPCA',
    'county.bpcaDesc': 'Każdy specjalista na dyżurze posiada pełne kwalifikacje, przeszkolenie COSHH oraz ubezpieczenie OC na kwotę £5M.',
    'county.retreatment': '100% Gwarancji Ponownego Zabiegu',
    'county.retreatmentDesc': 'Jeśli po 48 godzinach od zabiegu osy nadal będą aktywne, wrócimy i bezpłatnie zneutralizujemy gniazdo.',
    'county.ecological': 'Zabezpieczenia Ekologiczne',
    'county.ecologicalDesc': 'Nie zabijamy pożytecznych kolonii pszczół. Oferujemy ekologiczne alternatywy przenoszenia dla pszczół miodnych i trzmieli.'
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.calculator': 'Calculadora de Costos',
    'nav.languages': 'Idiomas 🌐',
    'nav.faqs': 'Preguntas Frecuentes',
    'nav.reviews': 'Opiniones',
    'nav.callNow': 'Llamar al Despachador',
    'nav.emergencyHotline': 'Línea de Emergencia: 020 8819 8627',
    'nav.coverage': 'Cobertura de Códigos Postales',

    // Hero Section
    'hero.title': 'Erradicación Profesional de Nidos de Avispas y Avispones',
    'hero.subtitle': 'Técnicos certificados locales disponibles las 24 horas, los 365 días del año en todo Londres y el sureste. 100% de erradicación garantizada o le devolvemos su dinero. Tiempo de respuesta menor a 1 hora.',
    'hero.tag': 'Despacho de Emergencia Activo • 24/7/365',
    'hero.btnBook': 'Reservar Eliminación Online',
    'hero.btnCall': 'Llamar a Línea de Emergencia',
    'hero.guarantee': 'Garantía de Eliminación del 100%',
    'hero.certified': 'Certificado BPCA',
    'hero.insurance': 'Cobertura de Responsabilidad de £5M',

    // Quick Stats
    'stats.activeTechs': 'Técnicos de Guardia Activos',
    'stats.avgResponse': 'Respuesta Promedio',
    'stats.warranty': 'Garantía de Re-tratamiento',
    'stats.warrantyVal': '100% Garantizado',
    'stats.safety': 'Protocolos de Seguridad',
    'stats.safetyVal': 'Seguro para Niños y Mascotas',

    // Pest Identifier
    'pest.title': 'Identificar la Amenaza',
    'pest.subtitle': 'Diferentes especies requieren métodos específicos de erradicación. Seleccione un tipo para ver detalles de diagnóstico.',
    'pest.select': 'Seleccionar Categoría de Plaga',
    'pest.wasp': 'Avispa Común',
    'pest.hornet': 'Avispón Europeo',
    'pest.yellowjacket': 'Avispa de Chaqueta Amarilla',

    // Coverage Checker
    'coverage.title': 'Ingrese Código Postal para Verificar Despacho',
    'coverage.subtitle': 'Verifique si tenemos un vehículo de patrulla activo cerca de su vecindario en este momento.',
    'coverage.placeholder': 'Ingrese su código postal (ej. SW19, GU1, KT12, SL4)',
    'coverage.btnCheck': 'Verificar Cobertura',
    'coverage.dispatched': 'Los técnicos pueden llegar en un promedio de',
    'coverage.activeTechs': 'Técnicos activos de guardia cercanos',
    'coverage.nearestStation': 'Estación de respuesta de emergencia más cercana',

    // Calculator
    'calc.title': 'Estimador de Costo de Tratamiento Instantáneo',
    'calc.subtitle': 'Sin tarifas ocultas. Seleccione sus parámetros a continuación para recibir una cotización de precio oficial y transparente.',
    'calc.propertyType': 'Clasificación de la Propiedad',
    'calc.residential': 'Casa Residencial',
    'calc.commercial': 'Comercial / Corporativo',
    'calc.nestCount': 'Número de Nidos Activos',
    'calc.nestCountDesc': 'Los nidos adicionales se tratan a tarifas muy reducidas.',
    'calc.urgency': 'Nivel de Prioridad de Respuesta',
    'calc.standard': 'Estándar el Mismo Día (Dentro de 24 Horas)',
    'calc.emergency': 'Despacho de Emergencia Prioritario (Menos de 1 Hora)',
    'calc.location': 'Ubicación del Nido y Acceso de Altura',
    'calc.lowGround': 'Nivel del Suelo / Bajo Acceso (Menos de 2m)',
    'calc.highRoof': 'Gran Elevación / Techo / Cavidad de Ático (Más de 2m)',
    'calc.estTotal': 'Costo Fijo Estimado',
    'calc.warrantyIncluded': 'Incluye garantía de erradicación del 100% y evaluación de seguridad ecológica.',
    'calc.bookWithEst': 'Reservar Online con esta Estimación',

    // Booking Form
    'book.title': 'Solicitar Tratamiento el Mismo Día',
    'book.subtitle': 'Complete el formulario a continuación. Nuestro controlador regional asignará instantáneamente el trabajo al técnico más cercano en su sector postal.',
    'book.fullName': 'Su Nombre Completo *',
    'book.phone': 'Teléfono de Contacto Principal *',
    'book.email': 'Dirección de Correo (Para Factura y Garantía) *',
    'book.postcode': 'Código Postal del Tratamiento (ej. SW19 1AA) *',
    'book.date': 'Fecha de Reserva Preferida *',
    'book.time': 'Horario de Llegada Preferido *',
    'book.timeAm': 'AM (08:00 - 12:00)',
    'book.timePm': 'PM (12:00 - 17:00)',
    'book.timeEve': 'Tarde / Emergencia (17:00 - 22:00)',
    'book.nestLoc': '¿Dónde está ubicado el nido? *',
    'book.nestLocPlace': 'ej. Dentro del ático / bajo las tejas',
    'book.lang': 'Soporte de Idioma Preferido',
    'book.notes': 'Instrucciones Adicionales / Advertencias de Seguridad',
    'book.notesPlace': 'ej. Cuidado con el perro, el nido está alto en un roble, etc.',
    'book.btnSubmit': 'Solicitar Despacho de Técnico',
    'book.successTitle': '¡Solicitud de Reserva Recibida!',
    'book.successDesc': 'Nuestro despachador está asignando a su técnico. Le devolveremos la llamada a su teléfono en menos de 10 minutos para finalizar los detalles.',

    // Multilingual Section
    'multi.title': 'Asistencia Multilingüe al Cliente',
    'multi.subtitle': 'Ofrecemos soporte de intérprete telefónico en vivo en los 10 idiomas no ingleses más comunes de Londres. Explore las pautas en su idioma nativo.',
    'multi.guide': 'Cómo hablar con nosotros en su idioma nativo:',
    'multi.interpreterText': 'Cuando llame, simplemente solicite su idioma. Nos conectaremos con un traductor telefónico profesional en menos de 60 segundos.',

    // Reviews
    'reviews.title': 'Opiniones de Clientes 100% Verificadas',
    'reviews.subtitle': 'Lea testimonios de propietarios locales y administradores de propiedades a quienes salvamos de dolorosas infestaciones.',
    'reviews.verified': 'Cliente Verificado de Londres',

    // Footer
    'footer.desc': 'Servicios profesionales y certificados de erradicación de nidos de avispas y avispones. Operando 24/7/365 en todo Londres, Surrey, Kent, Essex, Hertfordshire y Berkshire.',
    'footer.hours': 'Horas de Operación: Servicio de Emergencia 24/7/365',
    'footer.disclaimer': 'Todos los tratamientos cumplen estrictamente con las regulaciones COSHH y los estándares de salud y seguridad. Los técnicos de control de avispas están acreditados por la BPCA.',
    'footer.rights': 'Todos los derechos reservados. Servicios Profesionales de Erradicación de Avispas y Avispones.',

    // County / Postcode Page
    'county.localHub': 'Centro de Despacho Local',
    'county.estArrival': 'Tiempo de Llegada Est.',
    'county.activeTechs': 'Especialistas Activos',
    'county.warranty': 'Garantía de Erradicación',
    'county.warrantyVal': '100% Seguro',
    'county.commitment': 'Nuestro Compromiso de Cobertura',
    'county.protocols': 'Protocolos de Servicio para esta Ubicación',
    'county.bpca': 'Técnicos Certificados por la BPCA',
    'county.bpcaDesc': 'Cada especialista de guardia está completamente calificado, capacitado en las regulaciones de COSHH y cuenta con una protección de responsabilidad de £5 millones.',
    'county.retreatment': 'Garantía del 100% de Re-tratamiento',
    'county.retreatmentDesc': 'Si las avispas activas siguen presentes 48 horas después del tratamiento, volveremos a aplicar la dosis en el nido de forma gratuita.',
    'county.ecological': 'Salvaguardas Ecológicas',
    'county.ecologicalDesc': 'No exterminamos colonias de abejas beneficiosas. Ofrecemos alternativas dinámicas de reubicación para abejas melíferas y abejorros.'
  },
  bn: {
    // Navigation
    'nav.home': 'মূল পাতা',
    'nav.services': 'সেবাসমূহ',
    'nav.calculator': 'খরচ হিসাবকারী',
    'nav.languages': 'ভাষা সমূহ 🌐',
    'nav.faqs': 'জিজ্ঞাস্য প্রশ্নাবলী',
    'nav.reviews': 'গ্রাহক মতামত',
    'nav.callNow': 'কল করুন',
    'nav.emergencyHotline': 'জরুরী হটলাইন: ০২০ ৭৯৪৬ ০৮৫২',
    'nav.coverage': 'পোস্টকোড কভারেজ',

    // Hero Section
    'hero.title': 'বোলতা ও ভিমরুল বাসা অপসারণ সেবা',
    'hero.subtitle': 'লন্ডন এবং সাউথ ইস্ট জুড়ে ২৪/৭ প্রত্যয়িত স্থানীয় কীট নিয়ন্ত্রণ টেকনিশিয়ান। ১০০% সম্পূর্ণ অপসারণের গ্যারান্টি অন্যথায় মানি ব্যাক গ্যারান্টি। ১ ঘণ্টার মধ্যে দ্রুত সাড়া প্রদান।',
    'hero.tag': 'জরুরী ডিসপ্যাচ সক্রিয় • ২৪/৭/৩৬৫',
    'hero.btnBook': 'অনলাইনে বুক করুন',
    'hero.btnCall': 'জরুরী হটলাইনে কল করুন',
    'hero.guarantee': '১০০% নির্মূলের গ্যারান্টি',
    'hero.certified': 'BPCA প্রত্যয়িত',
    'hero.insurance': '£৫M লাইবিলিটি কভার',

    // Quick Stats
    'stats.activeTechs': 'অন-কল সক্রিয় টেকনিশিয়ান',
    'stats.avgResponse': 'গড় রেসপন্স সময়',
    'stats.warranty': 'রি-ট্রিটমেন্ট ওয়ারেন্টি',
    'stats.warrantyVal': '১০০% নিশ্চিত',
    'stats.safety': 'নিরাপত্তা প্রোটোকল',
    'stats.safetyVal': 'শিশু ও পোষা প্রাণীর জন্য নিরাপদ',

    // Pest Identifier
    'pest.title': 'ক্ষতিকর পোকা সনাক্ত করুন',
    'pest.subtitle': 'বিভিন্ন প্রজাতির জন্য নির্দিষ্ট অপসারণ পদ্ধতি প্রয়োজন। বিস্তারিত দেখতে একটি ধরণ নির্বাচন করুন।',
    'pest.select': 'শ্রেণি নির্বাচন করুন',
    'pest.wasp': 'সাধারণ বোলতা (Wasp)',
    'pest.hornet': 'ইউরোপীয় ভিমরুল (Hornet)',
    'pest.yellowjacket': 'হলুদ জ্যাকেট বোলতা',

    // Coverage Checker
    'coverage.title': 'লাইভ ডিসপ্যাচ চেক করতে পোস্টকোড লিখুন',
    'coverage.subtitle': 'আপনার এলাকার কাছাকাছি এই মুহূর্তে আমাদের কোনো সক্রিয় টহল গাড়ি আছে কি না তা পরীক্ষা করুন।',
    'coverage.placeholder': 'আপনার পোস্টকোড কোড লিখুন (যেমন: SW19, GU1, KT12)',
    'coverage.btnCheck': 'কভারেজ পরীক্ষা করুন',
    'coverage.dispatched': 'টেকনিশিয়ানরা গড়ে পৌঁছাতে পারেন',
    'coverage.activeTechs': 'আশেপাশে সক্রিয় অন-ডিউটি টেকনিশিয়ান',
    'coverage.nearestStation': 'নিকটতম প্রতিক্রিয়া স্টেশন',

    // Calculator
    'calc.title': 'তাত্ক্ষণিক চিকিৎসা খরচ হিসাবকারী',
    'calc.subtitle': 'কোনো লুকানো চার্জ নেই। সম্পূর্ণ স্বচ্ছ মূল্যের উদ্ধৃতি পেতে নীচে আপনার তথ্য নির্বাচন করুন।',
    'calc.propertyType': 'সম্পত্তি শ্রেণীবিভাগ',
    'calc.residential': 'আবাসিক বাড়ি',
    'calc.commercial': 'বাণিজ্যিক / কর্পোরেট',
    'calc.nestCount': 'সক্রিয় বাসার সংখ্যা',
    'calc.nestCountDesc': 'অতিরিক্ত বাসাগুলির অত্যন্ত ছাড়ের মূল্যে চিকিৎসা করা হয়।',
    'calc.urgency': 'প্রতিক্রিয়া অগ্রাধিকার স্তর',
    'calc.standard': 'স্ট্যান্ডার্ড একই দিন (২৪ ঘণ্টার মধ্যে)',
    'calc.emergency': 'জরুরী অগ্রাধিকার ডিসপ্যাচ (১ ঘণ্টার নিচে)',
    'calc.location': 'বাসার অবস্থান ও উচ্চতা',
    'calc.lowGround': 'মাটি স্তর / নিম্ন প্রবেশাধিকার (২ মিটারের নিচে)',
    'calc.highRoof': 'উচ্চ উচ্চতা / ছাদ / অ্যাটিক গহ্বর (২ মিটারের উপরে)',
    'calc.estTotal': 'আনুমানিক নির্ধারিত খরচ',
    'calc.warrantyIncluded': '১০০% অপসারণ ওয়ারেন্টি এবং পরিবেশগত নিরাপত্তা মূল্যায়ন অন্তর্ভুক্ত।',
    'calc.bookWithEst': 'এই অনুমান সহ অনলাইনে বুক করুন',

    // Booking Form
    'book.title': 'একই দিনে চিকিৎসার জন্য অনুরোধ করুন',
    'book.subtitle': 'নিচের ফর্মটি পূরণ করুন। আমাদের আঞ্চলিক নিয়ামক তাৎক্ষণিকভাবে আপনার পোস্টকোড এলাকার নিকটতম টেকনিশিয়ানের কাছে কাজটি বরাদ্দ করবেন।',
    'book.fullName': 'আপনার সম্পূর্ণ নাম *',
    'book.phone': 'যোগাযোগের ফোন নম্বর *',
    'book.email': 'ইমেল ঠিকানা (ইনভয়েস এবং ওয়ারেন্টির জন্য) *',
    'book.postcode': 'চিকিৎসার পোস্টকোড (যেমন: SW19 1AA) *',
    'book.date': 'পছন্দের বুকিং তারিখ *',
    'book.time': 'পছন্দের পৌঁছানোর সময় স্লট *',
    'book.timeAm': 'সকাল (০৮:০০ - ১২:০০)',
    'book.timePm': 'দুপুর (১২:০০ - ১৭:০০)',
    'book.timeEve': 'সন্ধ্যা / জরুরী (১৭:০০ - ২২:০০)',
    'book.nestLoc': 'বাসাটি কোথায় অবস্থিত? *',
    'book.nestLocPlace': 'যেমন: ছাদের নিচে / অ্যাটিকের ভিতরে',
    'book.lang': 'পছন্দের ভাষা সহায়তা',
    'book.notes': 'অতিরিক্ত নির্দেশাবলী / নিরাপত্তা সতর্কতা',
    'book.notesPlace': 'যেমন: কুকুর থেকে সাবধান, বাসাটি ওক গাছের উঁচুতে ইত্যাদি।',
    'book.btnSubmit': 'টেকনিশিয়ান ডিসপ্যাচ করার অনুরোধ',
    'book.successTitle': 'বুকিং অনুরোধ গৃহীত হয়েছে!',
    'book.successDesc': 'আমাদের ডিসপ্যাচার আপনার টেকনিশিয়ানকে বরাদ্দ করছেন। বিবরণ চূড়ান্ত করতে আমরা ১০ মিনিটের কম সময়ের মধ্যে আপনার ফোনে কল করব।',

    // Multilingual Section
    'multi.title': 'বহুভাষিক গ্রাহক সহায়তা',
    'multi.subtitle': 'আমরা লন্ডনের ১০টি সবচেয়ে সাধারণ অ-ইংরেজি ভাষায় লাইভ ফোন-দোভাষী সহায়তা অফার করি। আপনার মাতৃভাষায় নির্দেশাবলী অন্বেষণ করুন।',
    'multi.guide': 'আপনার মাতৃভাষায় আমাদের সাথে কীভাবে কথা বলবেন:',
    'multi.interpreterText': 'কল করার সময়, কেবল আপনার ভাষার অনুরোধ করুন। আমরা ৬০ সেকেন্ডের কম সময়ের মধ্যে একজন পেশাদার দোভাষীর সাথে সংযোগ করব।',

    // Reviews
    'reviews.title': '১০০% যাচাইকৃত গ্রাহক পর্যালোচনা',
    'reviews.subtitle': 'স্থানীয় বাড়ির মালিকদের কাছ থেকে প্রশংসাপত্র পড়ুন যাদের আমরা বেদনাদায়ক উপদ্রব থেকে বাঁচিয়েছি।',
    'reviews.verified': 'যাচাইকৃত লন্ডন গ্রাহক',

    // Footer
    'footer.desc': 'পেশাদার, প্রত্যয়িত বোলতা এবং ভিমরুলের বাসা নির্মূল পরিষেবা। লন্ডন, সারে, কেন্ট, এসেক্স এবং বার্কশায়ার জুড়ে ২৪/৭/৩৬৫ কাজ করছে।',
    'footer.hours': 'কাজের সময়: ২৪/৭/৩৬৫ জরুরী পরিষেবা',
    'footer.disclaimer': 'সমস্ত চিকিৎসা কঠোরভাবে COSHH প্রবিধান এবং স্বাস্থ্য ও নিরাপত্তা মান মেনে চলে। আমাদের টেকনিশিয়ানরা BPCA-অনুমোদিত।',
    'footer.rights': 'সর্বস্বত্ব সংরক্ষিত। বোলতা ও ভিমরুল বাসা অপসারণ পরিষেবা।',

    // County / Postcode Page
    'county.localHub': 'স্থানীয় ডিসপ্যাচ হাব',
    'county.estArrival': 'আনুমানিক পৌঁছানোর সময়',
    'county.activeTechs': 'সক্রিয় বিশেষজ্ঞ',
    'county.warranty': 'নির্মূল ওয়ারেন্টি',
    'county.warrantyVal': '১০০% নিরাপদ',
    'county.commitment': 'আমাদের কভারেজ প্রতিশ্রুতি',
    'county.protocols': 'এই অবস্থানের জন্য পরিষেবা প্রোটোকল',
    'county.bpca': 'BPCA প্রত্যয়িত টেকনিশিয়ান',
    'county.bpcaDesc': 'ডিউটিতে থাকা প্রতিটি বিশেষজ্ঞ সম্পূর্ণ যোগ্য, COSHH প্রবিধানে প্রশিক্ষিত এবং £৫M দায় কভারেজ বহন করে।',
    'county.retreatment': '১০০% রি-ট্রিটমেন্ট গ্যারান্টি',
    'county.retreatmentDesc': 'চিকিৎসার ৪৮ ঘণ্টা পরেও যদি বোলতা সক্রিয় থাকে, তাহলে আমরা কোনো অতিরিক্ত চার্জ ছাড়াই বাসাটি পুনরায় ডোজ দিতে ফিরে আসব।',
    'county.ecological': 'পরিবেশগত সুরক্ষা',
    'county.ecologicalDesc': 'আমরা উপকারী মৌমাছি কলোনি ধ্বংস করি না। আমরা মৌমাছি এবং ভিমরুলের জন্য নিরাপদ স্থানান্তর সেবা অফার করি।'
  },
  gu: {
    // Navigation
    'nav.home': 'હોમ પેજ',
    'nav.services': 'સેવાઓ',
    'nav.calculator': 'ખર્ચ ગણતરી પત્રક',
    'nav.languages': 'ભાષાઓ 🌐',
    'nav.faqs': 'વારંવાર પૂછાતા પ્રશ્નો',
    'nav.reviews': 'ગ્રાહક સમીક્ષા',
    'nav.callNow': 'ડિસ્પેચરને કૉલ કરો',
    'nav.emergencyHotline': 'ઇમરજન્સી હેલ્પલાઇન: 020 8819 8627',
    'nav.coverage': 'પોસ્ટકોડ કવરેજ',

    // Hero Section
    'hero.title': 'ભમરી અને મધમાખીના માળાઓ હટાવવાની સેવા',
    'hero.subtitle': 'સમગ્ર લંડન અને સાઉથ ઇસ્ટમાં ૨૪/૭ વ્યવસાયિક સ્થાનિક જંતુ નિયંત્રણ ટેકનિશિયન. ૧૦૦% નાબૂદીની ખાતરી, નહીં તો પૈસા પાછા. ૧ કલાકથી ઓછો પ્રતિભાવ સમય.',
    'hero.tag': 'ઇમરજન્સી ડિસ્પેચ સક્રિય • 24/7/365',
    'hero.btnBook': 'ઓનલાઈન બુક કરો',
    'hero.btnCall': 'ઇમરજન્સી હેલ્પલાઇન પર કૉલ કરો',
    'hero.guarantee': '૧૦૦% નાબૂદી ગેરંટી',
    'hero.certified': 'BPCA પ્રમાણિત',
    'hero.insurance': '£5M જવાબદારી કવચ',

    // Quick Stats
    'stats.activeTechs': 'સક્રિય ટેકનિશિયન',
    'stats.avgResponse': 'સરેરાશ પ્રતિભાવ સમય',
    'stats.warranty': 'રી-ટ્રીટમેન્ટ વોરંટી',
    'stats.warrantyVal': '૧૦૦% ગેરંટીડ',
    'stats.safety': 'સુરક્ષા પ્રોટોકોલ',
    'stats.safetyVal': 'બાળકો અને પાલતુ માટે સુરક્ષિત',

    // Pest Identifier
    'pest.title': 'ભય ઓળખો',
    'pest.subtitle': 'વિવિધ જંતુઓ માટે ચોક્કસ પદ્ધતિઓ જરૂરી છે. વિગતો જોવા માટે પ્રકાર પસંદ કરો.',
    'pest.select': 'કેટેગરી પસંદ કરો',
    'pest.wasp': 'સામાન્ય ભમરી (Wasp)',
    'pest.hornet': 'યુરોપિયન હોર્નેટ (Hornet)',
    'pest.yellowjacket': 'યલોજેકેટ ભમરી',

    // Coverage Checker
    'coverage.title': 'કવરેજ ચેક કરવા પોસ્ટકોડ દાખલ કરો',
    'coverage.subtitle': 'અમારી પેટ્રોલિંગ કાર તમારા વિસ્તારની નજીક સક્રિય છે કે નહીં તે જાણો.',
    'coverage.placeholder': 'તમારો પોસ્ટકોડ દાખલ કરો (દા.ત., SW19, GU1, KT12)',
    'coverage.btnCheck': 'કવરેજ ચેક કરો',
    'coverage.dispatched': 'ટેકનિશિયનો સરેરાશ સમયમાં પહોંચી શકે છે',
    'coverage.activeTechs': 'નજીકમાં સક્રિય ટેકનિશિયન',
    'coverage.nearestStation': 'નજીકનું ઇમરજન્સી સ્ટેશન',

    // Calculator
    'calc.title': 'ત્વરિત સારવાર ખર્ચ અંદાજક',
    'calc.subtitle': 'કોઈ છુપા ચાર્જ નથી. અંદાજ મેળવવા માટે નીચેની વિગતો પસંદ કરો.',
    'calc.propertyType': 'મિલકત પ્રકાર',
    'calc.residential': 'રહેણાંક ઘર',
    'calc.commercial': 'વ્યાપારી / કોર્પોરેટ',
    'calc.nestCount': 'સક્રિય માળાઓની સંખ્યા',
    'calc.nestCountDesc': 'વધારાના માળાઓ માટે ભારે વળતર આપવામાં આવે છે.',
    'calc.urgency': 'પ્રતિભાવ સ્તર',
    'calc.standard': 'સામાન્ય તે જ દિવસે (૨૪ કલાકની અંદર)',
    'calc.emergency': 'ઇમરજન્સી ઝડપી ડિસ્પેચ (૧ કલાકની અંદર)',
    'calc.location': 'માળાનું સ્થાન અને ઊંચાઈ',
    'calc.lowGround': 'જમીન સ્તર / નીચી ઊંચાઈ (૨ મીટરથી ઓછી)',
    'calc.highRoof': 'ઊંચી જગ્યા / છત / એટિક (૨ મીટરથી વધુ)',
    'calc.estTotal': 'અંદાજિત નિયત ખર્ચ',
    'calc.warrantyIncluded': '૧૦૦% નાબૂદી અને પર્યાવરણીય સુરક્ષા મૂલ્યાંકન શામેલ છે.',
    'calc.bookWithEst': 'આ અંદાજ સાથે ઓનલાઈન બુક કરો',

    // Booking Form
    'book.title': 'તે જ દિવસે સારવાર માટે વિનંતી કરો',
    'book.subtitle': 'નીચેનું ફોર્મ ભરો. અમારા સ્થાનિક કંટ્રોલર નજીકના ટેકનિશિયનને તરત જ કામ સોંપશે.',
    'book.fullName': 'તમારું પૂરું નામ *',
    'book.phone': 'સંપર્ક ફોન નંબર *',
    'book.email': 'ઈમેલ એડ્રેસ (બિલ અને વોરંટી માટે) *',
    'book.postcode': 'સારવારનું પોસ્ટકોડ (દા.ત. SW19 1AA) *',
    'book.date': 'પસંદગીની બુકિંગ તારીખ *',
    'book.time': 'આવવાનો મનપસંદ સમય *',
    'book.timeAm': 'સવારે (08:00 - 12:00)',
    'book.timePm': 'બપોરે (12:00 - 17:00)',
    'book.timeEve': 'સાંજે / કટોકટી (17:00 - 22:00)',
    'book.nestLoc': 'માળો ક્યાં આવેલો છે? *',
    'book.nestLocPlace': 'દા.ત. છતની નીચે / એટિકની અંદર',
    'book.lang': 'પસંદગીની ભાષા સહાય',
    'book.notes': 'વધારાની સૂચનાઓ / સુરક્ષા ચેતવણીઓ',
    'book.notesPlace': 'દા.ત. કૂતરાથી સાવધ રહો, માળો ઉંચા ઝાડ પર છે વગેરે.',
    'book.btnSubmit': 'ટેકનિશિયન મોકલવા વિનંતી',
    'book.successTitle': 'બુકિંગ વિનંતી મળી ગઈ છે!',
    'book.successDesc': 'અમે તમારા માટે ટેકનિશિયન ફાળવી રહ્યા છીએ. વિગતો નક્કી કરવા માટે અમે ૧૦ મિનિટથી ઓછા સમયમાં તમારા ફોન પર કૉલ કરીશું.',

    // Multilingual Section
    'multi.title': 'બહુભાષી ગ્રાહક સહાયતા',
    'multi.subtitle': 'અમે લંડનની ૧૦ સૌથી સામાન્ય બિન-અંગ્રેજી ભાષાઓમાં ફોન-અનુવાદક સેવા પ્રદાન કરીએ છીએ. તમારી ભાષામાં માર્ગદર્શિકા જુઓ.',
    'multi.guide': 'તમારી માતૃભાષામાં અમારી સાથે કેવી રીતે વાત કરવી:',
    'multi.interpreterText': 'કૉલ કરતી વખતે, ફક્ત તમારી ભાષા માટે વિનંતી કરો. અમે ૬૦ સેકન્ડથી ઓછા સમયમાં વ્યાવસાયિક અનુવાદક સાથે જોડાણ કરીશું.',

    // Reviews
    'reviews.title': '૧૦૦% ચકાસાયેલ ગ્રાહક સમીક્ષાઓ',
    'reviews.subtitle': 'અમારા સંતોષકારક ગ્રાહકોના અનુભવો વાંચો જેમને અમે જોખમી જંતુઓથી બચાવ્યા છે.',
    'reviews.verified': 'ચકાસાયેલ લંડનના ગ્રાહક',

    // Footer
    'footer.desc': 'વ્યવસાયિક, પ્રમાણિત ભમરી અને મધમાખી નાબૂદી સેવાઓ. લંડન, સરે, કન્ટ, એસેક્સ અને બર્કશાયર પર ચોવીસ કલાક કાર્યરત.',
    'footer.hours': 'કામગીરીનો સમય: ૨૪/૭/૩૬૫ ઇમરજન્સી સેવા',
    'footer.disclaimer': 'તમામ સારવાર COSHH નિયમો અને આરોગ્ય અને સુરક્ષા ધોરણોને આધીન છે. અમારા ટેકનિશિયનો BPCA માન્ય છે.',
    'footer.rights': 'સર્વાધિકાર સુરક્ષિત. વ્યવસાયિક ભમરી અને જંતુ નિયંત્રણ સેવાઓ.',

    // County / Postcode Page
    'county.localHub': 'સ્થાનિક ડિસ્પેચ હબ',
    'county.estArrival': 'અંદાજિત આગમન સમય',
    'county.activeTechs': 'સક્રિય નિષ્ણાતો',
    'county.warranty': 'નાબૂદી વોરંટી',
    'county.warrantyVal': '૧૦૦% સુરક્ષિત',
    'county.commitment': 'અમારી કવરેજ પ્રતિબદ્ધતા',
    'county.protocols': 'આ સ્થાન માટે સેવા પ્રોટોકોલ',
    'county.bpca': 'BPCA પ્રમાણિત ટેકનિશિયન',
    'county.bpcaDesc': 'દરેક નિષ્ણાત સંપૂર્ણ લાયકાત ધરાવે છે, COSHH નિયમોમાં પ્રશિક્ષિત છે અને £5M ની જવાબદારી વીમો ધરાવે છે.',
    'county.retreatment': '૧૦૦% મફત પુનઃ સારવારની ખાતરી',
    'county.retreatmentDesc': 'જો સારવારના ૪૮ કલાક પછી પણ જીવંત ભમરીઓ દેખાય, તો અમે મફતમાં ફરીથી સેવા પ્રદાન કરવા આવીશું.',
    'county.ecological': 'પર્યાવરણીય સુરક્ષા',
    'county.ecologicalDesc': 'અમે ઉપયોગી મધમાખીઓનો નાશ કરતા નથી. અમે મધમાખીઓ અને ભમરીઓ માટે સલામત પુનઃસ્થાપનની સેવા પ્રદાન કરીએ છીએ.'
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.calculator': 'Estimateur de Prix',
    'nav.languages': 'Langues 🌐',
    'nav.faqs': 'FAQs',
    'nav.reviews': 'Avis',
    'nav.callNow': 'Appeler le Répartiteur',
    'nav.emergencyHotline': 'Urgence 24h/24 : 020 8819 8627',
    'nav.coverage': 'Couverture Postale',

    // Hero Section
    'hero.title': 'Éradication Professionnelle de Nids de Guêpes et Frelons',
    'hero.subtitle': 'Techniciens locaux certifiés dépêchés 24h/24, 7j/7 à Londres et dans le Sud-Est. Éradication 100% garantie ou remboursé. Délai de réponse inférieur à 1 heure.',
    'hero.tag': 'Répartition d\'Urgence Active • 24h/24, 7j/7',
    'hero.btnBook': 'Réserver en Ligne',
    'hero.btnCall': 'Appeler l\'Urgence 24h/24',
    'hero.guarantee': 'Garantie d\'Élimination à 100%',
    'hero.certified': 'Certifié BPCA',
    'hero.insurance': 'Responsabilité Civile 5M£',

    // Quick Stats
    'stats.activeTechs': 'Techniciens Actifs de Garde',
    'stats.avgResponse': 'Réponse Moyenne',
    'stats.warranty': 'Garantie de Ré-intervention',
    'stats.warrantyVal': '100% Garanti',
    'stats.safety': 'Protocoles de Sécurité',
    'stats.safetyVal': 'Sans Danger Enfants/Animaux',

    // Pest Identifier
    'pest.title': 'Identifier la Menace',
    'pest.subtitle': 'Chaque espèce nécessite une méthode d’éradication spécifique. Sélectionnez un type pour voir les détails.',
    'pest.select': 'Sélectionner la Catégorie',
    'pest.wasp': 'Guêpe Commune',
    'pest.hornet': 'Frelon Européen',
    'pest.yellowjacket': 'Guêpe Jaune',

    // Coverage Checker
    'coverage.title': 'Vérifier la Disponibilité dans votre Secteur',
    'coverage.subtitle': 'Saisissez votre code postal pour voir si un véhicule patrouille actuellement près de chez vous.',
    'coverage.placeholder': 'Entrez votre code postal (ex: SW19, GU1, KT12, SL4)',
    'coverage.btnCheck': 'Vérifier',
    'coverage.dispatched': 'Les techniciens peuvent arriver en moyenne en',
    'coverage.activeTechs': 'Techniciens de garde actifs à proximité',
    'coverage.nearestStation': 'Station d\'urgence la plus proche',

    // Calculator
    'calc.title': 'Calculateur Instantané de Prix de Traitement',
    'calc.subtitle': 'Pas de frais cachés. Sélectionnez vos critères pour recevoir un devis officiel et entièrement transparent.',
    'calc.propertyType': 'Type de Propriété',
    'calc.residential': 'Maison Résidentielle',
    'calc.commercial': 'Commercial / Entreprise',
    'calc.nestCount': 'Nombre de Nids Actifs',
    'calc.nestCountDesc': 'Les nids supplémentaires sont traités à des tarifs très réduits.',
    'calc.urgency': 'Niveau de Priorité de Réponse',
    'calc.standard': 'Standard Même Jour (Sous 24h)',
    'calc.emergency': 'Urgence Prioritaire (Moins d’une heure)',
    'calc.location': 'Emplacement du Nid et Accès',
    'calc.lowGround': 'Niveau du sol / Accès facile (Moins de 2m)',
    'calc.highRoof': 'Hauteur élevée / Toiture / Combles (Plus de 2m)',
    'calc.estTotal': 'Coût Fixe Estimé',
    'calc.warrantyIncluded': 'Comprend la garantie d\'éradication à 100% et l\'évaluation environnementale.',
    'calc.bookWithEst': 'Réserver en ligne avec ce tarif',

    // Booking Form
    'book.title': 'Demander une Intervention le Jour Même',
    'book.subtitle': 'Remplissez le formulaire ci-dessous. Notre répartiteur régional assignera immédiatement la tâche au technicien le plus proche de votre secteur.',
    'book.fullName': 'Votre Nom Complet *',
    'book.phone': 'Téléphone Principal de Contact *',
    'book.email': 'Adresse E-mail (Facture & Garantie) *',
    'book.postcode': 'Code Postal de l\'intervention (ex: SW19 1AA) *',
    'book.date': 'Date Souhaitée d\'Intervention *',
    'book.time': 'Créneau Horaire Souhaité *',
    'book.timeAm': 'Matin (08:00 - 12:00)',
    'book.timePm': 'Après-midi (12:00 - 17:00)',
    'book.timeEve': 'Soirée / Urgence (17:00 - 22:00)',
    'book.nestLoc': 'Où se situe le nid ? *',
    'book.nestLocPlace': 'ex: Dans le grenier / sous les tuiles',
    'book.lang': 'Langue de Support Souhaitée',
    'book.notes': 'Instructions Additionnelles / Consignes de Sécurité',
    'book.notesPlace': 'ex: Attention au chien, nid très haut dans un chêne, etc.',
    'book.btnSubmit': 'Demander l\'envoi du technicien',
    'book.successTitle': 'Demande de réservation reçue !',
    'book.successDesc': 'Notre répartiteur est en train de désigner votre technicien. Nous vous rappellerons sur votre téléphone en moins de 10 minutes pour finaliser les détails.',

    // Multilingual Section
    'multi.title': 'Assistance Client Multilingue',
    'multi.subtitle': 'Nous offrons un service d’interprètes par téléphone en direct dans les 10 langues non anglaises les plus parlées à Londres. Consultez les instructions dans votre langue.',
    'multi.guide': 'Comment nous parler dans votre langue maternelle :',
    'multi.interpreterText': 'Lors de votre appel, demandez simplement un interprète pour votre langue. Nous vous mettrons en relation avec un traducteur en moins de 60 secondes.',

    // Reviews
    'reviews.title': 'Avis Clients 100% Vérifiés',
    'reviews.subtitle': 'Découvrez les témoignages de propriétaires et de gestionnaires immobiliers locaux débarrassés de nuisibles dangereux.',
    'reviews.verified': 'Client Londonien Vérifié',

    // Footer
    'footer.desc': 'Services certifiés d\'élimination des nids de guêpes et de frelons. Interventions 24h/24, 7j/7 à Londres, Surrey, Kent, Essex, Hertfordshire et Berkshire.',
    'footer.hours': 'Horaires : Service d\'urgence 24h/24, 7j/7, 365 jours par an',
    'footer.disclaimer': 'Tous les traitements respectent scrupuleusement la réglementation COSHH et les normes de santé et de sécurité. Les techniciens sont agréés BPCA.',
    'footer.rights': 'Tous droits réservés. Services Professionnels de Destruction de Nids de Guêpes et Frelons.',

    // County / Postcode Page
    'county.localHub': 'Centre de Répartition Local',
    'county.estArrival': 'Délai d\'Arrivée Estimé',
    'county.activeTechs': 'Spécialistes Actifs',
    'county.warranty': 'Garantie d\'Élimination',
    'county.warrantyVal': '100% Sûr',
    'county.commitment': 'Notre Engagement de Couverture',
    'county.protocols': 'Protocoles d\'Intervention pour ce Secteur',
    'county.bpca': 'Techniciens Certifiés BPCA',
    'county.bpcaDesc': 'Chaque spécialiste de garde est pleinement qualifié, formé aux réglementations COSHH et couvert par une assurance responsabilité civile de 5M£.',
    'county.retreatment': 'Garantie de 100% de Ré-intervention Gratuite',
    'county.retreatmentDesc': 'Si des guêpes actives sont toujours présentes 48 heures après l’intervention, nous revenons gratuitement pour un second traitement.',
    'county.ecological': 'Mesures Écologiques de Sauvegarde',
    'county.ecologicalDesc': 'Nous n\'exterminons pas les abeilles bénéfiques. Nous proposons des solutions de relogement pour les abeilles mellifères et les bourdons.'
  },
  it: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Servizi',
    'nav.calculator': 'Calcolatore Costi',
    'nav.languages': 'Lingue 🌐',
    'nav.faqs': 'Domande Frequenti',
    'nav.reviews': 'Recensioni',
    'nav.callNow': 'Chiama Operatore',
    'nav.emergencyHotline': 'Pronto Intervento: 020 8819 8627',
    'nav.coverage': 'Copertura CAP',

    // Hero Section
    'hero.title': 'Rimozione Professionale Nidi di Vespe e Calabroni',
    'hero.subtitle': 'Tecnici locali certificati operativi 24/7/365 a Londra e nel Sud-Est. Eliminazione garantita al 100% o rimborsati. Tempi di arrivo inferiori a 1 ora.',
    'hero.tag': 'Pronto Intervento Attivo • 24/7/365',
    'hero.btnBook': 'Prenota Trattamento Online',
    'hero.btnCall': 'Chiama Linea Emergenza',
    'hero.guarantee': 'Garanzia Disinfestazione 100%',
    'hero.certified': 'Certificazione BPCA',
    'hero.insurance': 'Copertura R.C. £5 Milioni',

    // Quick Stats
    'stats.activeTechs': 'Tecnici di Guardia Attivi',
    'stats.avgResponse': 'Tempo Medio di Risposta',
    'stats.warranty': 'Garanzia di Re-intervento',
    'stats.warrantyVal': '100% Garantito',
    'stats.safety': 'Protocolli di Sicurezza',
    'stats.safetyVal': 'Sicuro per Bambini e Animali',

    // Pest Identifier
    'pest.title': 'Identifica il Pericolo',
    'pest.subtitle': 'Specie diverse richiedono metodi di disinfestazione differenti. Seleziona una tipologia per visualizzare i dettagli.',
    'pest.select': 'Seleziona Categoria Squalificata',
    'pest.wasp': 'Vespa Comune',
    'pest.hornet': 'Calabrone Europeo',
    'pest.yellowjacket': 'Vespa Gialla (Giacca Gialla)',

    // Coverage Checker
    'coverage.title': 'Inserisci il CAP per Verificare la Disponibilità',
    'coverage.subtitle': 'Verifica se c\'è una pattuglia attiva vicino al tuo quartiere in questo momento.',
    'coverage.placeholder': 'Inserisci il prefisso del tuo CAP (es: SW19, GU1, KT12, SL4)',
    'coverage.btnCheck': 'Verifica Copertura',
    'coverage.dispatched': 'I tecnici possono arrivare in media in',
    'coverage.activeTechs': 'Tecnici attivi in zona in servizio',
    'coverage.nearestStation': 'Stazione di emergenza locale più vicina',

    // Calculator
    'calc.title': 'Calcolatore Istantaneo del Costo del Trattamento',
    'calc.subtitle': 'Nessun costo nascosto. Seleziona i tuoi parametri per ricevere un preventivo ufficiale e trasparente.',
    'calc.propertyType': 'Tipologia Immobile',
    'calc.residential': 'Abitazione Privata',
    'calc.commercial': 'Azienda / Ufficio',
    'calc.nestCount': 'Numero di Nidi Attivi',
    'calc.nestCountDesc': 'I nidi extra sono trattati a tariffe notevolmente scontate.',
    'calc.urgency': 'Priorità di Intervento',
    'calc.standard': 'Standard in Giornata (Entro 24 ore)',
    'calc.emergency': 'Pronto Intervento Prioritario (Sotto l\'Ora)',
    'calc.location': 'Ubicazione del Nido e Accesso',
    'calc.lowGround': 'Livello del suolo / Bassa quota (Sotto i 2m)',
    'calc.highRoof': 'Quota elevata / Tetto / Mansarda / Sottotetto (Sopra i 2m)',
    'calc.estTotal': 'Costo Fisso Stimato',
    'calc.warrantyIncluded': 'Include garanzia di eliminazione al 100% e valutazione ecologica.',
    'calc.bookWithEst': 'Prenota Online con questa Stima',

    // Booking Form
    'book.title': 'Richiedi Trattamento in Giornata',
    'book.subtitle': 'Compila il modulo sottostante. Il nostro dispatcher regionale assegnerà il lavoro al tecnico più vicino al tuo CAP.',
    'book.fullName': 'Nome Completo *',
    'book.phone': 'Telefono di Contatto Primario *',
    'book.email': 'Indirizzo E-mail (Fattura e Garanzia) *',
    'book.postcode': 'CAP di Intervento (es: SW19 1AA) *',
    'book.date': 'Data Richiesta Intervento *',
    'book.time': 'Orario di Arrivo Preferito *',
    'book.timeAm': 'Mattina (08:00 - 12:00)',
    'book.timePm': 'Pomeriggio (12:00 - 17:00)',
    'book.timeEve': 'Sera / Emergenza (17:00 - 22:00)',
    'book.nestLoc': 'Dove si trova il nido? *',
    'book.nestLocPlace': 'es: Nel sottotetto / sotto le tegole',
    'book.lang': 'Servizio di Interprete Richiesto',
    'book.notes': 'Istruzioni Aggiuntive / Note di Sicurezza',
    'book.notesPlace': 'es: Attenzione al cane, nido situato in alto su una quercia, ecc.',
    'book.btnSubmit': 'Invia Richiesta di Pronto Intervento',
    'book.successTitle': 'Richiesta di Prenotazione Ricevuta!',
    'book.successDesc': 'Il nostro coordinatore sta assegnando il tuo tecnico. Ti richiameremo entro 10 minuti per confermare i dettagli.',

    // Multilingual Section
    'multi.title': 'Assistenza Clienti Multilingue',
    'multi.subtitle': 'Offriamo supporto telefonico con interpreti in tempo reale nelle 10 lingue non inglesi più parlate a Londra. Leggi le linee guida nella tua lingua.',
    'multi.guide': 'Come parlarci nella tua lingua madre:',
    'multi.interpreterText': 'Al telefono, richiedi semplicemente un interprete in italiano. Ti connetteremo con un traduttore professionale in meno di 60 secondi.',

    // Reviews
    'reviews.title': 'Recensioni di Clienti Verificate al 100%',
    'reviews.subtitle': 'Leggi le testimonianze di proprietari di case e gestori immobiliari che abbiamo salvato da dolorose infestazioni.',
    'reviews.verified': 'Cliente Certificato di Londra',

    // Footer
    'footer.desc': 'Servizi professionali e certificati di disinfestazione di nidi di vespe e calabroni. Operativi 24/7/365 a Londra, Surrey, Kent, Essex, Hertfordshire e Berkshire.',
    'footer.hours': 'Orario: Pronto Intervento Emergenze 24/7/365',
    'footer.disclaimer': 'Tutti i trattamenti sono rigorosamente conformi alle normative COSHH e agli standard di salute e sicurezza. I tecnici sono certificati BPCA.',
    'footer.rights': 'Tutti i diritti riservati. Servizi Professionali Disinfestazione Vespe e Calabroni.',

    // County / Postcode Page
    'county.localHub': 'Centro Operativo di Zona',
    'county.estArrival': 'Tempo di Arrivo Stimato',
    'county.activeTechs': 'Specialisti Attivi',
    'county.warranty': 'Garanzia di Rimozione',
    'county.warrantyVal': '100% Sicuro',
    'county.commitment': 'La Nostra Promessa di Copertura',
    'county.protocols': 'Protocolli di Servizio per questa Località',
    'county.bpca': 'Tecnici Certificati BPCA',
    'county.bpcaDesc': 'Ogni specialista in servizio è pienamente qualificato, formato secondo le normative COSHH e coperto da polizza R.C. da £5M.',
    'county.retreatment': 'Garanzia di 100% di Re-intervento Gratuito',
    'county.retreatmentDesc': 'Se le vespe attive sono ancora presenti 48 ore dopo il trattamento, torneremo per una disinfestazione gratuita.',
    'county.ecological': 'Misure di Salvaguardia Ecologica',
    'county.ecologicalDesc': 'Non sterminiamo colonie di api benefiche. Offriamo alternative dinamiche di ricollocamento per api mellifere e bombi.'
  },
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.services': 'Serviços',
    'nav.calculator': 'Calculadora de Custos',
    'nav.languages': 'Idiomas 🌐',
    'nav.faqs': 'FAQs',
    'nav.reviews': 'Opiniões',
    'nav.callNow': 'Ligar para Despachante',
    'nav.emergencyHotline': 'Linha de Emergência: 020 8819 8627',
    'nav.coverage': 'Cobertura Postal',

    // Hero Section
    'hero.title': 'Eliminação Profissional de Ninhos de Vespas e Vespões',
    'hero.subtitle': 'Técnicos locais certificados operando 24 horas por dia, 365 dias por ano em Londres e no Sudeste. 100% de eliminação garantida ou o seu dinheiro de volta. Tempo de resposta menor que 1 hora.',
    'hero.tag': 'Despacho de Emergência Ativo • 24/7/365',
    'hero.btnBook': 'Reservar Remoção Online',
    'hero.btnCall': 'Ligar para Linha de Emergência',
    'hero.guarantee': 'Garantia de Eliminação a 100%',
    'hero.certified': 'Certificado BPCA',
    'hero.insurance': 'Seguro de Responsabilidade Civil de £5M',

    // Quick Stats
    'stats.activeTechs': 'Técnicos de Plantão Ativos',
    'stats.avgResponse': 'Resposta Média',
    'stats.warranty': 'Garantia de Re-tratamento',
    'stats.warrantyVal': '100% Garantido',
    'stats.safety': 'Protocolos de Segurança',
    'stats.safetyVal': 'Seguro para Crianças/Animais',

    // Pest Identifier
    'pest.title': 'Identificar a Ameaça',
    'pest.subtitle': 'Espécies diferentes exigem métodos específicos de erradicação. Selecione um tipo para ver detalhes diagnósticos.',
    'pest.select': 'Selecionar Categoria de Praga',
    'pest.wasp': 'Vespa Comum',
    'pest.hornet': 'Vespão Europeu',
    'pest.yellowjacket': 'Vespa Jaqueta Amarela',

    // Coverage Checker
    'coverage.title': 'Digite o Código Postal para Verificar Disponibilidade',
    'coverage.subtitle': 'Verifique se temos um veículo de patrulha ativo perto do seu bairro neste momento.',
    'coverage.placeholder': 'Insira seu código postal (ex: SW19, GU1, KT12, SL4)',
    'coverage.btnCheck': 'Verificar Cobertura',
    'coverage.dispatched': 'Os técnicos podem chegar numa média de',
    'coverage.activeTechs': 'Técnicos de plantão ativos nas proximidades',
    'coverage.nearestStation': 'Estação de resposta de emergência mais próxima',

    // Calculator
    'calc.title': 'Calculadora de Custos de Tratamento Instantâneo',
    'calc.subtitle': 'Sem taxas ocultas. Selecione as suas opções para receber um orçamento oficial e transparente.',
    'calc.propertyType': 'Classificação da Propriedade',
    'calc.residential': 'Habitação Residencial',
    'calc.commercial': 'Comercial / Empresarial',
    'calc.nestCount': 'Número de Ninhos Ativos',
    'calc.nestCountDesc': 'Ninhos adicionais são tratados com descontos significativos.',
    'calc.urgency': 'Prioridade de Resposta',
    'calc.standard': 'Padrão no Mesmo Dia (Dentro de 24h)',
    'calc.emergency': 'Despacho de Emergência Prioritário (Menos de 1 Hora)',
    'calc.location': 'Localização do Ninho e Altura',
    'calc.lowGround': 'Nível do Chão / Acesso Baixo (Menos de 2m)',
    'calc.highRoof': 'Altura Elevada / Telhado / Sótão (Mais de 2m)',
    'calc.estTotal': 'Custo Fixo Estimado',
    'calc.warrantyIncluded': 'Inclui garantia de eliminação a 100% e avaliação de segurança ecológica.',
    'calc.bookWithEst': 'Reservar Online com este Orçamento',

    // Booking Form
    'book.title': 'Solicitar Tratamento no Mesmo Dia',
    'book.subtitle': 'Preencha o formulário abaixo. O nosso despachante regional atribuirá o trabalho ao técnico mais próximo do seu código postal.',
    'book.fullName': 'Seu Nome Completo *',
    'book.phone': 'Telefone Principal de Contacto *',
    'book.email': 'Endereço de E-mail (Para Fatura e Garantia) *',
    'book.postcode': 'Código Postal do Tratamiento (ex: SW19 1AA) *',
    'book.date': 'Data de Reserva Preferida *',
    'book.time': 'Horário de Chegada Preferido *',
    'book.timeAm': 'Manhã (08:00 - 12:00)',
    'book.timePm': 'Tarde (12:00 - 17:00)',
    'book.timeEve': 'Noite / Emergência (17:00 - 22:00)',
    'book.nestLoc': 'Onde está localizado o ninho? *',
    'book.nestLocPlace': 'ex: Dentro do sótão / sob as telhas',
    'book.lang': 'Suporte de Idioma Preferido',
    'book.notes': 'Instruções Adicionais / Avisos de Segurança',
    'book.notesPlace': 'ex: Cuidado com o cão, ninho está alto num carvalho, etc.',
    'book.btnSubmit': 'Solicitar Despacho de Técnico',
    'book.successTitle': 'Solicitação de Reserva Recebida!',
    'book.successDesc': 'O nosso despachante está a atribuir o seu técnico. Nós ligaremos de volta no seu telefone em menos de 10 minutos para finalizar os detalhes.',

    // Multilingual Section
    'multi.title': 'Assistência Multilingue ao Cliente',
    'multi.subtitle': 'Oferecemos suporte de intérpretes telefónicos em direto nos 10 idiomas não ingleses mais comuns falados em Londres. Consulte as diretrizes na sua língua nativa.',
    'multi.guide': 'Como falar connosco na sua língua materna:',
    'multi.interpreterText': 'Ao telefonar, basta pedir o serviço de intérprete em português. Faremos a ligação com um tradutor profissional em menos de 60 segundos.',

    // Reviews
    'reviews.title': 'Opiniões de Clientes 100% Verificadas',
    'reviews.subtitle': 'Leia os testemunhos de proprietários locais e gestores de propriedades que livramos de infestações perigosas.',
    'reviews.verified': 'Cliente Verificado de Londres',

    // Footer
    'footer.desc': 'Serviços certificados e profissionais de erradicação de ninhos de vespas e vespões. Operando 24/7/365 em Londres, Surrey, Kent, Essex, Hertfordshire e Berkshire.',
    'footer.hours': 'Horário: Serviço de Emergência 24/7/365',
    'footer.disclaimer': 'Todos os tratamentos cumprem estritamente os regulamentos COSHH e as normas de saúde e segurança. Os técnicos são credenciados pela BPCA.',
    'footer.rights': 'Todos os direitos reservados. Serviços Profissionais de Eliminação de Vespas e Vespões.',

    // County / Postcode Page
    'county.localHub': 'Centro de Despacho Local',
    'county.estArrival': 'Tempo Estimado de Chegada',
    'county.activeTechs': 'Especialistas Ativos',
    'county.warranty': 'Garantia de Eliminação',
    'county.warrantyVal': '100% Seguro',
    'county.commitment': 'O Nosso Compromisso de Cobertura',
    'county.protocols': 'Protocolos de Serviço para esta Localidade',
    'county.bpca': 'Técnicos Certificados pela BPCA',
    'county.bpcaDesc': 'Cada especialista de plantão está totalmente qualificado, treinado em regulamentos de COSHH e possui cobertura de responsabilidade civil de £5M.',
    'county.retreatment': 'Garantia de Re-tratamento a 100% Gratuito',
    'county.retreatmentDesc': 'Se vespas ativas continuarem presentes 48 horas após o tratamento, retornaremos para reaplicar a dosagem gratuitamente.',
    'county.ecological': 'Salvaguardas Ecológicas',
    'county.ecologicalDesc': 'Não exterminamos colónias benéficas de abelhas. Oferecemos alternativas dinâmicas de recolocação para abelhas e mamangabas.'
  },
  ro: {
    // Navigation
    'nav.home': 'Acasă',
    'nav.services': 'Servicii',
    'nav.calculator': 'Calculator Prețuri',
    'nav.languages': 'Limbi 🌐',
    'nav.faqs': 'Întrebări Frecvente',
    'nav.reviews': 'Recenzii',
    'nav.callNow': 'Sună Dispecerul',
    'nav.emergencyHotline': 'Urgențe 24/7: 020 8819 8627',
    'nav.coverage': 'Zonă de Acoperire',

    // Hero Section
    'hero.title': 'Eliminarea Profesionistă a Cuiburilor de Viespi și Gărgăuni',
    'hero.subtitle': 'Tehnicieni locali autorizați trimiși 24/7/365 în toată Londra și Sud-Estul Angliei. Eradicare garantată 100% sau banii înapoi. Intervenție rapidă în sub o oră.',
    'hero.tag': 'Dispecerat Urgențe Activ • 24/7/365',
    'hero.btnBook': 'Rezervă Eliminare Online',
    'hero.btnCall': 'Sună la Linia de Urgență',
    'hero.guarantee': 'Garanție de Combatere 100%',
    'hero.certified': 'Acreditat BPCA',
    'hero.insurance': 'Asigurare R.C. de 5 Milioane £',

    // Quick Stats
    'stats.activeTechs': 'Tehnicieni Activi de Gardă',
    'stats.avgResponse': 'Timp Mediu de Răspuns',
    'stats.warranty': 'Garanție pentru Re-tratare',
    'stats.warrantyVal': '100% Garantat',
    'stats.safety': 'Protocol de Siguranță',
    'stats.safetyVal': 'Sigur pentru Copii și Animale',

    // Pest Identifier
    'pest.title': 'Identifică Amenințarea',
    'pest.subtitle': 'Specii diferite necesită metode specifice de combatere. Selectați un dăunător pentru a vizualiza detalii.',
    'pest.select': 'Selectați Tipul Dăunătorului',
    'pest.wasp': 'Viespe Comună',
    'pest.hornet': 'Gărgăun European (Viespe Uriașă)',
    'pest.yellowjacket': 'Viespe Galbenă',

    // Coverage Checker
    'coverage.title': 'Verificați Acoperirea în Zona Dvs.',
    'coverage.subtitle': 'Verificați dacă avem un vehicul activ în patrula de gardă aproape de zona dumneavoastră în acest moment.',
    'coverage.placeholder': 'Introduceți codul poștal (ex: SW19, GU1, KT12, SL4)',
    'coverage.btnCheck': 'Verifică Acoperirea',
    'coverage.dispatched': 'Tehnicienii pot sosi în medie în',
    'coverage.activeTechs': 'Tehnicieni de serviciu activi în zonă',
    'coverage.nearestStation': 'Cea mai apropiată stație de intervenție rapidă',

    // Calculator
    'calc.title': 'Calculator Instant de Costuri Tratament',
    'calc.subtitle': 'Fără taxe ascunse. Selectați opțiunile de mai jos pentru a primi o ofertă oficială și complet transparentă.',
    'calc.propertyType': 'Clasificare Proprietate',
    'calc.residential': 'Locuință Rezidențială',
    'calc.commercial': 'Comercial / Corporate',
    'calc.nestCount': 'Număr de Cuiburi Active',
    'calc.nestCountDesc': 'Cuiburile suplimentare sunt tratate la tarife reduse considerabil.',
    'calc.urgency': 'Nivel de Prioritate Intervenție',
    'calc.standard': 'Standard în Aceeași Zi (În decurs de 24h)',
    'calc.emergency': 'Urgență Prioritară Rapidă (Sub o Oră)',
    'calc.location': 'Locația Cuibului și Accesul la Înălțime',
    'calc.lowGround': 'Nivelul Solului / Acces Simplu (Sub 2m)',
    'calc.highRoof': 'La Înălțime / Acoperiș / Mansardă (Peste 2m)',
    'calc.estTotal': 'Cost Fix Estimat',
    'calc.warrantyIncluded': 'Include garanție de combatere 100% și evaluarea de mediu ecologică.',
    'calc.bookWithEst': 'Rezervă Online cu acest Preț Estimat',

    // Booking Form
    'book.title': 'Solicită Intervenție în Aceeași Zi',
    'book.subtitle': 'Completați formularul de mai jos. Dispecerul nostru regional va aloca imediat lucrarea celui mai apropiat tehnician disponibil.',
    'book.fullName': 'Numele și Prenumele *',
    'book.phone': 'Telefon de Contact Principal *',
    'book.email': 'Adresă de Email (Pentru Factură și Garanție) *',
    'book.postcode': 'Cod Poștal unde se Intervine (ex: SW19 1AA) *',
    'book.date': 'Data Dorită pentru Intervenție *',
    'book.time': 'Intervalul Orar Preferat de Sosire *',
    'book.timeAm': 'Dimineață (08:00 - 12:00)',
    'book.timePm': 'După-amiază (12:00 - 17:00)',
    'book.timeEve': 'Seară / Urgențe (17:00 - 22:00)',
    'book.nestLoc': 'Unde se află cuibul dăunătorilor? *',
    'book.nestLocPlace': 'ex: În mansardă / sub țiglele acoperișului',
    'book.lang': 'Limba de Contact Preferată',
    'book.notes': 'Instrucțiuni Suplimentare / Măsuri de Siguranță',
    'book.notesPlace': 'ex: Atenție la câine, cuibul este sus în stejar etc.',
    'book.btnSubmit': 'Trimite Solicitare pentru Tehnician',
    'book.successTitle': 'Solicitarea de Rezervare a fost Primită!',
    'book.successDesc': 'Dispecerul nostru alocă tehnicianul. Vă vom suna înapoi pe telefon în maximum 10 minute pentru confirmarea detaliilor.',

    // Multilingual Section
    'multi.title': 'Asistență Clienți în Limba Maternă',
    'multi.subtitle': 'Oferim servicii de traducători telefonici în direct în cele mai vorbite 10 limbi străine din Londra. Citiți instrucțiunile în limba română.',
    'multi.guide': 'Cum ne puteți apela în limba maternă:',
    'multi.interpreterText': 'La inițierea apelului, solicitați pur și simplu un interpret în limba română. Vă vom pune în legătură cu un traducător în mai puțin de 60 de secunde.',

    // Reviews
    'reviews.title': 'Recenzii Clienți 100% Verificate',
    'reviews.subtitle': 'Citiți feedback-ul oferit de proprietarii locali pe care i-am salvat de infestări dureroase.',
    'reviews.verified': 'Client Verificat din Londra',

    // Footer
    'footer.desc': 'Servicii autorizate și profesioniste pentru eliminarea cuiburilor de viespi și gărgăuni. Operăm 24/7/365 în Londra, Surrey, Kent, Essex, Hertfordshire și Berkshire.',
    'footer.hours': 'Program de lucru: Urgențe Non-Stop 24/7/365',
    'footer.disclaimer': 'Toate intervențiile sunt realizate în deplină conformitate cu reglementările COSHH și standardele de siguranță. Tehnicienii sunt certificați BPCA.',
    'footer.rights': 'Toate drepturile rezervate. Servicii Profesioniste Combatere Viespi și Gărgăuni.',

    // County / Postcode Page
    'county.localHub': 'Punct Local de Dispecerat',
    'county.estArrival': 'Timp Estimat de Sosire',
    'county.activeTechs': 'Specialiști Activi',
    'county.warranty': 'Garanție de Eradicare',
    'county.warrantyVal': '100% Sigur',
    'county.commitment': 'Angajamentul Nostru de Acoperire',
    'county.protocols': 'Protocoale de Serviciu pentru Această Locație',
    'county.bpca': 'Tehnicieni Certificați BPCA',
    'county.bpcaDesc': 'Fiecare tehnician de serviciu este pe deplin calificat, instruit conform normelor COSHH și deține o asigurare de răspundere civilă de 5M £.',
    'county.retreatment': 'Garanție 100% pentru Re-tratare Gratuită',
    'county.retreatmentDesc': 'Dacă viespile sunt în continuare active la 48 de ore de la tratament, ne întoarcem să aplicăm o nouă doză fără costuri suplimentare.',
    'county.ecological': 'Măsuri de Protecție Ecologică',
    'county.ecologicalDesc': 'Nu ucidem coloniile benefice de albine. Oferim opțiuni dinamice de mutare/salvare pentru albinele de miere și bondari.'
  },
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.services': 'Hizmetlerimiz',
    'nav.calculator': 'Fiyat Hesaplama',
    'nav.languages': 'Diller 🌐',
    'nav.faqs': 'Sık Sorulan Sorular',
    'nav.reviews': 'Yorumlar',
    'nav.callNow': 'Merkezi Ara',
    'nav.emergencyHotline': 'Acil Yardım Hattı: 020 8819 8627',
    'nav.coverage': 'Posta Kodu Alanı',

    // Hero Section
    'hero.title': 'Profesyonel Yaban Arısı ve Eşek Arısı Yuvası İmhası',
    'hero.subtitle': 'Sertifikalı yerel haşere uzmanları ile Londra ve Güney Doğu genelinde 7/24 kesintisiz hizmet. %100 kesin imha garantisi veya paranız iade. 1 saatin altında acil ulaşım süresi.',
    'hero.tag': 'Acil Teknik Ekip Aktif • 7/24/365',
    'hero.btnBook': 'Online Rezervasyon Yap',
    'hero.btnCall': 'Acil Yardım Hattını Ara',
    'hero.guarantee': '%100 Arı Temizleme Garantisi',
    'hero.certified': 'BPCA Sertifikalı',
    'hero.insurance': '£5M Mali Mesuliyet Sigortası',

    // Quick Stats
    'stats.activeTechs': 'Nöbetçi Aktif Uzmanlar',
    'stats.avgResponse': 'Ortalama Varış Süresi',
    'stats.warranty': 'Yeniden İlaçlama Garantisi',
    'stats.warrantyVal': '%100 Garantili',
    'stats.safety': 'Güvenlik Protokolleri',
    'stats.safetyVal': 'Çocuk ve Evcil Hayvan Dostu',

    // Pest Identifier
    'pest.title': 'Tehlikeyi Teşhis Edin',
    'pest.subtitle': 'Farklı arı türleri farklı imha yöntemleri gerektirir. Teşhis detaylarını görmek için bir tür seçin.',
    'pest.select': 'Arı Kategorisini Seçin',
    'pest.wasp': 'Yaban Arısı (Wasp)',
    'pest.hornet': 'Eşek Arısı (Hornet)',
    'pest.yellowjacket': 'Sarı Ceket Arı',

    // Coverage Checker
    'coverage.title': 'Canlı Teknik Destek için Posta Kodunuzu Girin',
    'coverage.subtitle': 'Bölgenize yakın aktif bir devriye aracımızın bulunup bulunmadığını kontrol edin.',
    'coverage.placeholder': 'Posta kodunuzu girin (ör: SW19, GU1, KT12, SL4)',
    'coverage.btnCheck': 'Hizmet Bölgesini Kontrol Et',
    'coverage.dispatched': 'Teknisyenler ortalama şu sürede ulaşabilir',
    'coverage.activeTechs': 'Yakındaki aktif nöbetçi uzman sayısı',
    'coverage.nearestStation': 'En yakın acil müdahale istasyonu',

    // Calculator
    'calc.title': 'Anında Tedavi Maliyet Hesaplayıcı',
    'calc.subtitle': 'Gizli ücret yok. Net bir fiyat teklifi almak için kriterlerinizi aşağıdan seçin.',
    'calc.propertyType': 'Mülk Sınıflandırması',
    'calc.residential': 'Müstakil / Apartman Daire',
    'calc.commercial': 'Ticari / Şirket / Ofis',
    'calc.nestCount': 'Aktif Yuva Sayısı',
    'calc.nestCountDesc': 'Ekstra yuvalar çok yüksek indirimli fiyatlarla ilaçlanır.',
    'calc.urgency': 'Aciliyet Seviyesi',
    'calc.standard': 'Standart Aynı Gün (24 Saat İçinde)',
    'calc.emergency': 'Acil Öncelikli Ekip (1 Saatin Altında)',
    'calc.location': 'Yuvanın Konumu ve Yükseklik Erişimi',
    'calc.lowGround': 'Zemin Seviyesi / Alçak Erişim (2m Altı)',
    'calc.highRoof': 'Yüksek Bölge / Çatı / Tavan Arası (2m Üstü)',
    'calc.estTotal': 'Tahmini Sabit Maliyet',
    'calc.warrantyIncluded': '%100 kesin imha garantisi ve ekolojik çevre güvenliği değerlendirmesi dahildir.',
    'calc.bookWithEst': 'Bu Fiyat Teklifiyle Rezervasyon Yap',

    // Booking Form
    'book.title': 'Aynı Gün Müdahale Talep Edin',
    'book.subtitle': 'Aşağıdaki formu doldurun. Bölge sorumlumuz işi hemen posta kodunuza en yakın teknisyene aktaracaktır.',
    'book.fullName': 'Adınız Soyadınız *',
    'book.phone': 'Birincil İletişim Telefonu *',
    'book.email': 'E-posta Adresi (Fatura ve Garanti İçin) *',
    'book.postcode': 'İlaçlama Posta Kodu (ör: SW19 1AA) *',
    'book.date': 'Tercih Edilen Rezervasyon Tarihi *',
    'book.time': 'Tercih Edilen Varış Saati Aralığı *',
    'book.timeAm': 'Sabah (08:00 - 12:00)',
    'book.timePm': 'Öğleden Sonra (12:00 - 17:00)',
    'book.timeEve': 'Akşam / Acil (17:00 - 22:00)',
    'book.nestLoc': 'Yuva nerede bulunuyor? *',
    'book.nestLocPlace': 'ör: Tavan arasında / çatı kiremitlerinin altında',
    'book.lang': 'Tercih Edilen Tercüman Desteği',
    'book.notes': 'Ek Talimatlar / Güvenlik Uyarıları',
    'book.notesPlace': 'ör: Köpeğe dikkat edin, yuva meşe ağacının tepesinde vb.',
    'book.btnSubmit': 'Uzman Ekip Talep Et',
    'book.successTitle': 'Rezervasyon Talebi Alındı!',
    'book.successDesc': 'Merkezimiz uzman teknisyeni yönlendiriyor. Detayları kesinleştirmek için 10 dakika içinde telefonunuzdan sizi arayacağız.',

    // Multilingual Section
    'multi.title': 'Çok Dilli Müşteri Desteği',
    'multi.subtitle': 'Londra\'da en çok konuşulan 10 yabancı dilde canlı telefon tercümanı desteği sunuyoruz. Kendi dilinizdeki yönergeleri keşfedin.',
    'multi.guide': 'Kendi dilinizde bizimle nasıl iletişime geçebilirsiniz:',
    'multi.interpreterText': 'Aradığınızda sadece Türkçe tercüman istediğinizi belirtin. 60 saniyeden kısa sürede profesyonel bir telefon tercümanı bağlayabiliriz.',

    // Reviews
    'reviews.title': '%100 Doğrulanmış Müşteri Yorumları',
    'reviews.subtitle': 'Bölgedeki ev sahiplerinin ve mülk yöneticilerinin acılı arı istilalarından kurtulma hikayelerini okuyun.',
    'reviews.verified': 'Doğrulanmış Londra Müşterisi',

    // Footer
    'footer.desc': 'Profesyonel, sertifikalı yaban arısı ve eşek arısı yuvası imhası hizmetleri. Londra, Surrey, Kent, Essex, Hertfordshire ve Berkshire genelinde 7/24 çalışıyoruz.',
    'footer.hours': 'Çalışma Saatleri: 7 Gün 24 Saat Kesintisiz Acil Hizmet',
    'footer.disclaimer': 'Tüm tedaviler COSHH yönetmeliklerine ve sağlık güvenlik standartlarına tamamen uygundur. Uzmanlarımız BPCA onaylıdır.',
    'footer.rights': 'Tüm hakları saklıdır. Profesyonel Yaban Arısı & Haşere Kontrol Hizmetleri.',

    // County / Postcode Page
    'county.localHub': 'Yerel Dağıtım Merkezi',
    'county.estArrival': 'Tahmini Varış Süresi',
    'county.activeTechs': 'Aktif Uzmanlar',
    'county.warranty': 'Arı İmha Garantisi',
    'county.warrantyVal': '%100 Güvenli',
    'county.commitment': 'Hizmet Güvencemiz',
    'county.protocols': 'Bu Bölge İçin Hizmet Protokolleri',
    'county.bpca': 'BPCA Sertifikalı Teknisyenler',
    'county.bpcaDesc': 'Nöbetçi olan her bir uzman tam yetkili olup COSHH yönetmeliklerinde eğitilmiştir ve £5M sorumluluk teminatına sahiptir.',
    'county.retreatment': '%100 Ücretsiz Yeniden İlaçlama Garantisi',
    'county.retreatmentDesc': 'Uygulamadan sonraki 48 saat içinde aktif arılar hala mevcutsa, yuvayı ücretsiz olarak yeniden ilaçlamak için geri dönüyoruz.',
    'county.ecological': 'Ekolojik Koruma Önlemleri',
    'county.ecologicalDesc': 'Yararlı bal arısı kolonilerini yok etmiyoruz. Bal arıları ve bombus arıları için dinamik güvenli taşıma alternatifleri sunuyoruz.'
  },
  ar: {
    // Navigation
    'nav.home': 'الصفحة الرئيسية',
    'nav.services': 'خدماتنا',
    'nav.calculator': 'حاسبة التكلفة',
    'nav.languages': 'اللغات 🌐',
    'nav.faqs': 'الأسئلة الشائعة',
    'nav.reviews': 'التقييمات',
    'nav.callNow': 'اتصل بالموظف المختص',
    'nav.emergencyHotline': 'الخط الساخن للطوارئ: 020 8819 8627',
    'nav.coverage': 'مناطق التغطية',

    // Hero Section
    'hero.title': 'إبادة أعشاش الدبابير والزنابير باحترافية',
    'hero.subtitle': 'فنيون محليون معتمدون لمكافحة الآفات يتم إرسالهم على مدار الساعة طوال أيام السنة في جميع أنحاء لندن والجنوب الشرقي. إبادة مضمونة بنسبة 100% أو استرداد أموالك. وقت الاستجابة أقل من ساعة.',
    'hero.tag': 'إرسال الطوارئ نشط • 24/7/365',
    'hero.btnBook': 'احجز الخدمة عبر الإنترنت',
    'hero.btnCall': 'اتصل بخط الطوارئ الساخن',
    'hero.guarantee': 'ضمان القضاء التام 100%',
    'hero.certified': 'معتمد من BPCA',
    'hero.insurance': 'تأمين ضد المسؤولية بقيمة 5 ملايين جنيه إسترليني',

    // Quick Stats
    'stats.activeTechs': 'الفنيون المناوبون النشطون',
    'stats.avgResponse': 'متوسط الاستجابة',
    'stats.warranty': 'ضمان إعادة الخدمة مجاناً',
    'stats.warrantyVal': 'مضمون بنسبة 100%',
    'stats.safety': 'بروتوكولات السلامة',
    'stats.safetyVal': 'آمن على الأطفال والحيوانات الأليفة',

    // Pest Identifier
    'pest.title': 'تحديد نوع الآفة والتهديد',
    'pest.subtitle': 'تتطلب الأنواع المختلفة طرق إبادة محددة. اختر نوعاً لمعاينة التفاصيل التشخيصية.',
    'pest.select': 'اختر فئة الحشرة',
    'pest.wasp': 'الدبور العادي',
    'pest.hornet': 'الزنبور الأوروبي الضخم',
    'pest.yellowjacket': 'الدبور ذو السترة الصفراء',

    // Coverage Checker
    'coverage.title': 'أدخل الرمز البريدي للتحقق من الخدمة الفورية',
    'coverage.subtitle': 'تحقق مما إذا كان لدينا سيارة دورية نشطة بالقرب من منطقتك في الوقت الحالي.',
    'coverage.placeholder': 'أدخل الرمز البريدي الخاص بك (مثل SW19 ، GU1 ، KT12 ، SL4)',
    'coverage.btnCheck': 'التحقق من التغطية',
    'coverage.dispatched': 'يمكن للفنيين الوصول في متوسط زمن قدره',
    'coverage.activeTechs': 'الفنيون المناوبون النشطون في الجوار',
    'coverage.nearestStation': 'أقرب محطة استجابة للطوارئ',

    // Calculator
    'calc.title': 'حاسبة تكلفة العلاج والإبادة الفورية',
    'calc.subtitle': 'لا توجد رسوم خفية. حدد التفاصيل أدناه للحصول على عرض أسعار رسمي وشفاف بالكامل.',
    'calc.propertyType': 'تصنيف العقار والمنشأة',
    'calc.residential': 'منزل سكني وعائلي',
    'calc.commercial': 'تجاري / مؤسسة / شركات',
    'calc.nestCount': 'عدد الأعشاش النشطة',
    'calc.nestCountDesc': 'يتم علاج الأعشاش الإضافية بأسعار مخفضة للغاية.',
    'calc.urgency': 'مستوى أولوية الاستجابة',
    'calc.standard': 'عادي في نفس اليوم (خلال 24 ساعة)',
    'calc.emergency': 'إرسال طوارئ ذو أولوية (أقل من ساعة واحدة)',
    'calc.location': 'موقع العش والارتفاع عن الأرض',
    'calc.lowGround': 'مستوى الأرض / ارتفاع منخفض (أقل من 2 متر)',
    'calc.highRoof': 'ارتفاع عالٍ / سقف / تجويف علية (أكثر من 2 متر)',
    'calc.estTotal': 'التكلفة الثابتة المقدرة',
    'calc.warrantyIncluded': 'يشمل ضمان إبادة 100% وتقييم السلامة البيئية للحالة.',
    'calc.bookWithEst': 'احجز الآن بناءً على هذا السعر المقدر',

    // Booking Form
    'book.title': 'طلب الإبادة والعلاج في نفس اليوم',
    'book.subtitle': 'املأ النموذج أدناه. سيقوم موظف الإرسال الإقليمي لدينا على الفور بتعيين المهمة لأقرب فني في منطقتك البريدية.',
    'book.fullName': 'الاسم الكامل بالكامل *',
    'book.phone': 'رقم هاتف الاتصال الرئيسي *',
    'book.email': 'البريد الإلكتروني (الفاتورة والضمان) *',
    'book.postcode': 'الرمز البريدي لموقع العلاج (مثل SW19 1AA) *',
    'book.date': 'تاريخ الحجز المفضل *',
    'book.time': 'فترة الوصول المفضلة *',
    'book.timeAm': 'صباحاً (08:00 - 12:00)',
    'book.timePm': 'مساءً (12:00 - 17:00)',
    'book.timeEve': 'مساءً / طوارئ (17:00 - 22:00)',
    'book.nestLoc': 'أين يقع العش؟ *',
    'book.nestLocPlace': 'مثال: داخل العلية / تحت قرميد السقف',
    'book.lang': 'دعم اللغة المفضل للاتصال',
    'book.notes': 'تعليمات إضافية / تحذيرات السلامة',
    'book.notesPlace': 'مثال: احذر من الكلب، العش مرتفع على شجرة بلوط، إلخ.',
    'book.btnSubmit': 'طلب إرسال فني الإبادة',
    'book.successTitle': 'تم استلام طلب الحجز بنجاح!',
    'book.successDesc': 'يقوم موزعنا بتعيين الفني الخاص بك الآن. سنعاود الاتصال بك على هاتفك في أقل من 10 دقائق لتأكيد التفاصيل.',

    // Multilingual Section
    'multi.title': 'مساعدة العملاء بلغات متعددة',
    'multi.subtitle': 'نحن نقدم خدمة الترجمة الفورية عبر الهاتف بلغات لندن العشر غير الإنجليزية الأكثر شيوعاً. تعرف على الإرشادات بلغتك الأم.',
    'multi.guide': 'كيف تتحدث معنا بلغتك الأم:',
    'multi.interpreterText': 'عند الاتصال، ما عليك سوى طلب مترجم للغة العربية. سنقوم بتوصيلك بمترجم هاتف محترف في أقل من 60 ثانية.',

    // Reviews
    'reviews.title': 'آراء وتقييمات عملاء موثقة 100%',
    'reviews.subtitle': 'اقرأ شهادات حية من أصحاب المنازل والشركات المحلية الذين أنقذناهم من إصابات مؤلمة بالآفات الحشرية.',
    'reviews.verified': 'عميل موثق من لندن',

    // Footer
    'footer.desc': 'خدمات احترافية معتمدة لإبادة أعشاش الدبابير والزنابير. نعمل على مدار الساعة طوال أيام السنة في لندن، ساري، كينت، إيسكس، هيرتفوردشاير، وبيركشاير.',
    'footer.hours': 'ساعات العمل: خدمة الطوارئ على مدار الساعة 24/7/365',
    'footer.disclaimer': 'تتوافق جميع العلاجات بدقة مع لوائح COSHH ومعايير الصحة والسلامة. جميع الفنيين مكافحة الدبابير معتمدون من BPCA.',
    'footer.rights': 'جميع الحقوق محفوظة. الخدمات المهنية لإبادة الدبابير والزنابير الآفات.',

    // County / Postcode Page
    'county.localHub': 'مركز الإرسال المحلي',
    'county.estArrival': 'زمن الوصول المقدر',
    'county.activeTechs': 'المتخصصون النشطون',
    'county.warranty': 'ضمان إبادة الآفات',
    'county.warrantyVal': 'آمن 100%',
    'county.commitment': 'التزامنا بالتغطية',
    'county.protocols': 'بروتوكولات الخدمة لهذا الموقع',
    'county.bpca': 'فنيون معتمدون من BPCA',
    'county.bpcaDesc': 'كل أخصائي مناوب مؤهل تأهيلاً كاملاً، ومدرب على لوائح COSHH ويحمل تأميناً ضد المسؤولية بقيمة 5 ملايين جنيه إسترليني.',
    'county.retreatment': 'ضمان إعادة المعالجة 100% مجاناً',
    'county.retreatmentDesc': 'إذا كانت هناك دبابير نشطة لا تزال موجودة بعد 48 ساعة من المعالجة، فسنعود لإعادة رش العش مجاناً دون تكلفة إضافية.',
    'county.ecological': 'الضمانات البيئية والتوازن الحيوي',
    'county.ecologicalDesc': 'نحن لا نبيد خلايا النحل المفيدة والنافعة. نحن نقدم بدائل نقل آمنة وصديقة للبيئة لنحل العسل والطقس.'
  }
};

interface LanguageContextProps {
  currentLanguage: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (key: string) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');

  // Detect language direction
  const activeLanguageInfo = languages.find(l => l.code === currentLanguage) || languages[0];
  const isRtl = activeLanguageInfo.isRtl;

  // Persist language setting
  useEffect(() => {
    const savedLang = localStorage.getItem('wasp_removal_lang') as LanguageCode;
    if (savedLang && translations[savedLang]) {
      setCurrentLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (code: LanguageCode) => {
    if (translations[code]) {
      setCurrentLanguage(code);
      localStorage.setItem('wasp_removal_lang', code);
    }
  };

  const t = (key: string): string => {
    const activeDict = translations[currentLanguage] || translations.en;
    if (activeDict[key]) {
      return activeDict[key];
    }
    // Fallback to English
    return translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage: handleSetLanguage, t, isRtl }}>
      <div dir={isRtl ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
