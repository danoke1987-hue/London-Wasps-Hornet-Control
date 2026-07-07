/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PestInfo } from '../types';

export const pestsData: PestInfo[] = [
  {
    id: 'wasp',
    name: 'Common Wasp',
    scientificName: 'Vespula vulgaris',
    description: 'Bright yellow and black striped bodies with a distinct narrow waist. Highly active, social insects that build round, grey, paper-like nests in attics, sheds, wall cavities, and bushes.',
    dangerLevel: 'High',
    appearance: 'Smooth, shiny body with clear yellow/black bands. No hair. Pointed rear abdomen containing a painful, multi-use sting.',
    behavior: 'Aggressive when threatened or near their nest. Strongly attracted to sugary foods, drinks, and ripe fruits, particularly in late summer.',
    actionRequired: 'Professional treatment is highly recommended. Do not attempt to approach or spray the nest yourself, as wasps will swarm to defend it.',
    treatmentType: 'Direct high-reach insecticide dust/spray entry. 100% eradicated within 24 hours.',
    colorClass: 'amber'
  },
  {
    id: 'hornet',
    name: 'European Hornet',
    scientificName: 'Vespa crabro',
    description: 'Significantly larger than wasps, with a loud, deep buzz. Often build nests in hollow trees, rafters, and quiet lofts. Can chew wood to create large paper nests.',
    dangerLevel: 'Critical',
    appearance: 'Large size (up to 3.5cm). Dark orange/reddish-brown and yellow markings. Distinct, intimidating buzzing sound in flight.',
    behavior: 'Less aggressive than wasps unless their nest is approached within 2-3 meters. Stings are extremely painful and deliver more venom, causing severe swelling or systemic reactions.',
    actionRequired: 'Urgent professional removal is required. Hornet stings pose elevated health risks, especially to children, elderly, and those with allergies.',
    treatmentType: 'High-grade safety suit intervention, rapid eradication and structural exclusion.',
    colorClass: 'red'
  },
  {
    id: 'honeybee',
    name: 'Honeybee (Protected/Beneficial)',
    scientificName: 'Apis mellifera',
    description: 'Key beneficial pollinators. Fuzzy, golden-brown bodies. Nests are composed of vertical wax combs. Highly protected, crucial for the ecosystem.',
    dangerLevel: 'Low',
    appearance: 'Furry thorax, dull yellow/brown stripes (not bright yellow). Typically seen in swarms on branches or nesting in chimneys and wall cavities.',
    behavior: 'Non-aggressive. Only stings as a last resort (such as being stepped on or squeezed), after which they die. Attracted to flowers, not human food.',
    actionRequired: 'CONSERVATION REQUIRED. We do NOT kill honeybees. Contact us to arrange safe live extraction and relocation to local apiaries by our expert bee handlers.',
    treatmentType: 'Safe live relocation and rehoming (No chemical treatment used).',
    colorClass: 'yellow'
  },
  {
    id: 'bumblebee',
    name: 'Bumblebee (Protected/Beneficial)',
    scientificName: 'Bombus',
    description: 'Very round, fat, and extremely fuzzy bees. Nest in small underground cavities, bird boxes, or under compost heaps. Colonies are tiny (usually fewer than 150 bees).',
    dangerLevel: 'Low',
    appearance: 'Plump, very hairy bodies. Black with yellow bands and a distinct white or orange tail tip. Gentle, slow flyers.',
    behavior: 'Extremely docile and non-aggressive. You can stand right next to them without concern. They will only sting if physically crushed.',
    actionRequired: 'Leave undisturbed. Bumblebee nests last only a single season (dying out naturally by autumn) and cause zero structural damage.',
    treatmentType: 'Conservation advisory. Removal only recommended if nested in high-impact school or playground zones.',
    colorClass: 'orange'
  }
];
