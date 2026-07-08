/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PostcodeResult } from '../types';
import { countiesData } from './counties';

// Map of prefixes to response metrics
export const coverageData: Record<string, { region: string; hub: string; responseTime: number; techs: number }> = {
  // Inner London
  'SW': { region: 'South West London', hub: 'Battersea Dispatch Center', responseTime: 25, techs: 6 },
  'SE': { region: 'South East London', hub: 'Greenwich Dispatch Center', responseTime: 30, techs: 5 },
  'W': { region: 'West London', hub: 'Kensington Dispatch Center', responseTime: 20, techs: 4 },
  'WC': { region: 'West Central London', hub: 'Holborn Dispatch Hub', responseTime: 35, techs: 3 },
  'EC': { region: 'East Central London', hub: 'City of London Hub', responseTime: 30, techs: 3 },
  'E': { region: 'East London', hub: 'Stratford Dispatch Center', responseTime: 25, techs: 6 },
  'N': { region: 'North London', hub: 'Finsbury Park Dispatch Hub', responseTime: 25, techs: 5 },
  'NW': { region: 'North West London', hub: 'Hampstead Dispatch Center', responseTime: 25, techs: 4 },

  // Outer London & Surrounding Areas (Home Counties)
  'CR': { region: 'Croydon & Surrey Borders', hub: 'Croydon Dispatch Hub', responseTime: 30, techs: 4 },
  'BR': { region: 'Bromley & Kent Borders', hub: 'Bromley Depot', responseTime: 35, techs: 3 },
  'SM': { region: 'Sutton & Surrey Borders', hub: 'Sutton Dispatch Hub', responseTime: 30, techs: 3 },
  'TW': { region: 'Richmond & Twickenham', hub: 'Richmond Dispatch', responseTime: 25, techs: 4 },
  'HA': { region: 'Harrow & Wembley', hub: 'Harrow Depot', responseTime: 35, techs: 3 },
  'UB': { region: 'Uxbridge & Middlesex', hub: 'Uxbridge Hub', responseTime: 40, techs: 3 },
  'EN': { region: 'Enfield & Hertfordshire', hub: 'Enfield Dispatch Hub', responseTime: 35, techs: 4 },
  'IG': { region: 'Ilford & Essex Borders', hub: 'Ilford Depot', responseTime: 30, techs: 3 },
  'RM': { region: 'Romford & Essex Borders', hub: 'Romford Hub', responseTime: 35, techs: 4 },
  'DA': { region: 'Dartford & Kent Borders', hub: 'Dartford Depot', responseTime: 40, techs: 3 },
  'KT': { region: 'Kingston & Surrey', hub: 'Kingston Dispatch Center', responseTime: 25, techs: 4 },
  'WD': { region: 'Watford & Hertfordshire', hub: 'Watford Hub', responseTime: 40, techs: 3 },
  'SL': { region: 'Slough & Berkshire Borders', hub: 'Slough Dispatch', responseTime: 45, techs: 2 },
  'TN': { region: 'Sevenoaks & Kent Borders', hub: 'Sevenoaks Dispatch', responseTime: 45, techs: 2 },
  'RH': { region: 'Redhill & Surrey Borders', hub: 'Redhill Depot', responseTime: 45, techs: 2 },
  'GU': { region: 'Guildford & Surrey Borders', hub: 'Guildford Dispatch', responseTime: 50, techs: 2 },
  'AL': { region: 'St Albans & Hertfordshire', hub: 'St Albans Depot', responseTime: 45, techs: 2 },
  'CM': { region: 'Chelmsford & Essex Borders', hub: 'Brentwood Depot', responseTime: 50, techs: 2 },
  'SS': { region: 'Southend & South Essex', hub: 'Basildon Depot', responseTime: 55, techs: 2 },
};

/**
 * Validates and checks coverage of a given postcode
 * Support both full postcodes (e.g. "SW1A 1AA", "CR0 2YY") or outward code prefixes (e.g. "SW1", "CR0").
 */
export function checkPostcodeCoverage(input: string): PostcodeResult {
  const cleanInput = input.trim().toUpperCase().replace(/\s+/g, '');
  if (!cleanInput) {
    return {
      postcode: input,
      isCovered: false,
      regionName: '',
      averageResponseTimeMin: 0,
      nearestStation: '',
      activeTechnicians: 0,
    };
  }

  // Extract the outward part (e.g., SW11, CR0, SE10, E1W, W1G, WC2H)
  // Typically the outward part is the first block before the space, or if no space, the first 2-4 characters.
  // We can try to match the prefix against our coverage keys.
  // We match by descending prefix length (e.g., check first 4 chars, then 3, then 2, then 1).
  let prefix = '';
  const matchLengths = [4, 3, 2, 1];
  let matchFound = false;

  for (const len of matchLengths) {
    if (cleanInput.length >= len) {
      const candidate = cleanInput.substring(0, len);
      // If candidate is purely alphabetical or starts with letters then has numbers, let's look it up
      // e.g., 'SW' or 'SW1' or 'SW11'
      // We also check just the alphabetical part of the candidate if the candidate has numbers (e.g., 'SW' for 'SW11')
      if (coverageData[candidate]) {
        prefix = candidate;
        matchFound = true;
        break;
      }
    }
  }

  // If no exact alphanumeric block matched, try matching just the leading letters
  if (!matchFound) {
    const lettersMatch = cleanInput.match(/^[A-Z]+/);
    if (lettersMatch) {
      const alphaPrefix = lettersMatch[0];
      if (coverageData[alphaPrefix]) {
        prefix = alphaPrefix;
        matchFound = true;
      }
    }
  }

  // If still no match in default coverageData, search inside countiesData
  if (!matchFound) {
    for (const len of [4, 3, 2, 1]) {
      if (cleanInput.length >= len) {
        const candidate = cleanInput.substring(0, len);
        const matchingCounty = countiesData.find(c => 
          c.postcodes.some(pc => pc.toUpperCase() === candidate)
        );
        if (matchingCounty) {
          const codeVal = candidate.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const responseTime = matchingCounty.responseTimeMin + (codeVal % 10);
          const techs = Math.max(2, matchingCounty.activeTechs - (codeVal % 3));
          
          return {
            postcode: input.toUpperCase(),
            isCovered: true,
            regionName: `${candidate} (${matchingCounty.name})`,
            averageResponseTimeMin: responseTime,
            nearestStation: matchingCounty.dispatchHub,
            activeTechnicians: techs,
          };
        }
      }
    }
  }

  if (matchFound && prefix) {
    const info = coverageData[prefix];
    // Add some realistic variation based on the exact input for high-fidelity response
    const minuteAdjustment = cleanInput.length % 5; 
    return {
      postcode: input.toUpperCase(),
      isCovered: true,
      regionName: info.region,
      averageResponseTimeMin: info.responseTime + minuteAdjustment,
      nearestStation: info.hub,
      activeTechnicians: info.techs,
    };
  }

  return {
    postcode: input.toUpperCase(),
    isCovered: false,
    regionName: 'Outside Core Coverage Area',
    averageResponseTimeMin: 0,
    nearestStation: '',
    activeTechnicians: 0,
  };
}
