/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BookingDetails {
  id: string;
  name: string;
  phone: string;
  email: string;
  postcode: string;
  propertyType: 'residential' | 'commercial';
  pestType: 'wasp' | 'hornet' | 'unidentified';
  urgency: 'standard' | 'emergency';
  nestCount: number;
  nestLocation: string;
  preferredDate: string;
  preferredTimeSlot: string;
  additionalNotes?: string;
}

export interface CostEstimate {
  basePrice: number;
  additionalNestCharge: number;
  urgencySurcharge: number;
  commercialSurcharge: number;
  total: number;
  isGuaranteed: boolean;
}

export interface PestInfo {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  dangerLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  behavior: string;
  appearance: string;
  actionRequired: string;
  treatmentType: string;
  colorClass: string;
}

export interface PostcodeResult {
  postcode: string;
  isCovered: boolean;
  regionName: string;
  averageResponseTimeMin: number;
  nearestStation: string;
  activeTechnicians: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  clientType: 'Residential' | 'Commercial';
  pestType: 'Wasps Nest' | 'Hornets Nest' | 'Wasp Prevention';
  comment: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'safety' | 'pricing' | 'process' | 'commercial';
}
