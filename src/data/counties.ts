/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CountyData {
  id: string;
  name: string;
  slug: string;
  description: string;
  dispatchHub: string;
  responseTimeMin: number;
  activeTechs: number;
  postcodes: string[];
}

export const countiesData: CountyData[] = [
  {
    id: 'greater-london',
    name: 'Greater London',
    slug: 'greater-london',
    description: 'Continuous emergency response coverage across the entire Greater London metropolis. Our dispatch hubs coordinate swift eradication vans throughout all inner and outer boroughs.',
    dispatchHub: 'Greater London Central Command',
    responseTimeMin: 25,
    activeTechs: 18,
    postcodes: [
      'SW1', 'SW2', 'SW3', 'SW4', 'SW5', 'SW6', 'SW7', 'SW8', 'SW9', 'SW10',
      'SW11', 'SW12', 'SW13', 'SW14', 'SW15', 'SW16', 'SW17', 'SW18', 'SW19', 'SW20',
      'SE1', 'SE2', 'SE3', 'SE4', 'SE5', 'SE6', 'SE7', 'SE8', 'SE9', 'SE10',
      'SE11', 'SE12', 'SE13', 'SE14', 'SE15', 'SE16', 'SE17', 'SE18', 'SE19', 'SE20',
      'SE21', 'SE22', 'SE23', 'SE24', 'SE25', 'SE26', 'SE27', 'SE28',
      'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12', 'W13', 'W14',
      'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'E12', 'E13', 'E14',
      'E15', 'E16', 'E17', 'E18',
      'N1', 'N2', 'N3', 'N4', 'N5', 'N6', 'N7', 'N8', 'N9', 'N10', 'N11', 'N12', 'N13', 'N14',
      'N15', 'N16', 'N17', 'N18', 'N19', 'N20', 'N21', 'N22',
      'NW1', 'NW2', 'NW3', 'NW4', 'NW5', 'NW6', 'NW7', 'NW8', 'NW9', 'NW10', 'NW11',
      'WC1', 'WC2',
      'CR0', 'CR2', 'CR4', 'CR7', 'CR8',
      'BR1', 'BR2', 'BR3', 'BR4', 'BR5', 'BR6', 'BR7', 'BR8',
      'SM1', 'SM2', 'SM3', 'SM4', 'SM5', 'SM6', 'SM7',
      'TW1', 'TW2', 'TW3', 'TW4', 'TW5', 'TW6', 'TW7', 'TW8', 'TW9', 'TW10', 'TW11', 'TW12',
      'HA0', 'HA1', 'HA2', 'HA3', 'HA4', 'HA5', 'HA6', 'HA7', 'HA8', 'HA9',
      'UB1', 'UB2', 'UB3', 'UB4', 'UB5', 'UB6', 'UB7', 'UB8', 'UB9', 'UB10', 'UB11',
      'EN1', 'EN2', 'EN3', 'EN4', 'EN5', 'EN6', 'EN7', 'EN8', 'EN9',
      'IG1', 'IG2', 'IG3', 'IG4', 'IG5', 'IG6', 'IG7', 'IG8', 'IG9', 'IG10', 'IG11',
      'RM1', 'RM2', 'RM3', 'RM4', 'RM5', 'RM6', 'RM7', 'RM8', 'RM9', 'RM10', 'RM11', 'RM12',
      'DA1', 'DA5', 'DA6', 'DA7', 'DA8', 'DA14', 'DA15', 'DA16', 'DA17', 'DA18',
      'KT1', 'KT2', 'KT3', 'KT4', 'KT5', 'KT6', 'KT7', 'KT8', 'KT9', 'KT10'
    ]
  },
  {
    id: 'city-of-london',
    name: 'City of London',
    slug: 'city-of-london',
    description: 'Ultra-fast emergency response coverage in the historic financial core and the square mile. Specialised technicians on hand for high-density commercial real estate, corporate offices, and heritage buildings.',
    dispatchHub: 'Square Mile Rapid Response Team',
    responseTimeMin: 20,
    activeTechs: 5,
    postcodes: ['EC1', 'EC2', 'EC3', 'EC4', 'EC1A', 'EC1M', 'EC1N', 'EC1P', 'EC1R', 'EC1V', 'EC1Y', 'EC2A', 'EC2M', 'EC2N', 'EC2R', 'EC2V', 'EC2Y', 'EC3A', 'EC3M', 'EC3N', 'EC3R', 'EC3V', 'EC4A', 'EC4M', 'EC4N', 'EC4R', 'EC4V', 'EC4Y']
  },
  {
    id: 'south-east-england',
    name: 'South East England',
    slug: 'south-east-england',
    description: 'Regional network of fully equipped pest control technicians serving the counties of the South East. Providing the signature 24/7 fast dispatch to homes, farms, and rural businesses.',
    dispatchHub: 'South East Regional Center',
    responseTimeMin: 45,
    activeTechs: 24,
    postcodes: ['SO', 'PO', 'GU', 'RG', 'SL', 'HP', 'OX', 'ME', 'CT', 'TN', 'BN', 'RH']
  },
  {
    id: 'berkshire',
    name: 'Berkshire',
    slug: 'berkshire',
    description: 'Prompt residential and commercial wasp nest removal services throughout Berkshire, covering busy commuter towns, historical properties, and agricultural holdings.',
    dispatchHub: 'Reading & Windsor Dispatch Depot',
    responseTimeMin: 40,
    activeTechs: 6,
    postcodes: [
      'RG1', 'RG2', 'RG4', 'RG5', 'RG6', 'RG7', 'RG8', 'RG10', 'RG12', 'RG14',
      'RG17', 'RG18', 'RG19', 'RG20', 'RG30', 'RG31', 'RG40', 'RG41', 'RG42', 'RG45',
      'SL1', 'SL2', 'SL3', 'SL4', 'SL5', 'SL6'
    ]
  },
  {
    id: 'buckinghamshire',
    name: 'Buckinghamshire',
    slug: 'buckinghamshire',
    description: 'Reliable, chemical-safe pest management solutions operating across Buckinghamshire. Swift dispatch to residential estates, business parks, and leafy suburban properties.',
    dispatchHub: 'Aylesbury & Wycombe Control Hub',
    responseTimeMin: 45,
    activeTechs: 5,
    postcodes: [
      'HP5', 'HP6', 'HP7', 'HP8', 'HP9', 'HP10', 'HP11', 'HP12', 'HP13', 'HP14',
      'HP15', 'HP16', 'HP17', 'HP18', 'HP19', 'HP20', 'HP21', 'HP22', 'HP23', 'MK18'
    ]
  },
  {
    id: 'east-sussex',
    name: 'East Sussex',
    slug: 'east-sussex',
    description: 'Professional wasp control operating on the coastal strip and inland downs of East Sussex. Fully insured, guaranteed treatments for hotels, private residences, and agricultural units.',
    dispatchHub: 'Brighton & Eastbourne Service Point',
    responseTimeMin: 45,
    activeTechs: 7,
    postcodes: [
      'BN1', 'BN2', 'BN3', 'BN7', 'BN8', 'BN9', 'BN10', 'BN20', 'BN21', 'BN22',
      'BN23', 'BN24', 'BN25', 'BN26', 'BN27', 'TN31', 'TN32', 'TN33', 'TN34', 'TN35',
      'TN36', 'TN37', 'TN38', 'TN39', 'TN40'
    ]
  },
  {
    id: 'hampshire',
    name: 'Hampshire',
    slug: 'hampshire',
    description: 'Comprehensive wasp and hornet nest treatment across Hampshire. Swift response times for coastal cities, rural market towns, and woodland cottages alike.',
    dispatchHub: 'Southampton & Winchester Depot',
    responseTimeMin: 45,
    activeTechs: 8,
    postcodes: [
      'SO14', 'SO15', 'SO16', 'SO17', 'SO18', 'SO19', 'SO21', 'SO22', 'SO23', 'SO24',
      'SO30', 'SO31', 'SO32', 'SO40', 'SO41', 'SO42', 'SO43', 'SO45', 'SO50', 'SO51',
      'SO52', 'SO53', 'PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8',
      'PO9', 'PO10', 'PO11', 'PO12', 'PO13', 'PO14', 'PO15', 'PO16', 'PO17', 'RG21',
      'RG22', 'RG23', 'RG24', 'RG25', 'RG26', 'RG27', 'RG28', 'RG29'
    ]
  },
  {
    id: 'kent',
    name: 'Kent',
    slug: 'kent',
    description: 'Trusted wasp and hornet nest eradication across Kent, the Garden of England. Quick local dispatches to commuter centers, seaside towns, and extensive agricultural lands.',
    dispatchHub: 'Maidstone & Ashford Service Hub',
    responseTimeMin: 35,
    activeTechs: 9,
    postcodes: [
      'CT1', 'CT2', 'CT3', 'CT4', 'CT9', 'CT10', 'CT11', 'CT12', 'CT13', 'CT14',
      'CT15', 'CT16', 'CT17', 'CT18', 'CT19', 'CT20', 'CT21', 'DA1', 'DA2', 'DA3',
      'DA4', 'DA5', 'DA6', 'DA7', 'DA8', 'DA9', 'DA10', 'DA11', 'DA12', 'DA13',
      'DA14', 'DA15', 'DA16', 'DA17', 'DA18', 'ME1', 'ME2', 'ME3', 'ME4', 'ME5',
      'ME6', 'ME7', 'ME8', 'ME9', 'ME10', 'ME11', 'ME12', 'ME13', 'ME14', 'ME15',
      'ME16', 'ME17', 'ME18', 'ME19', 'ME20', 'TN1', 'TN2', 'TN3', 'TN4', 'TN8',
      'TN9', 'TN10', 'TN11', 'TN12', 'TN13', 'TN14', 'TN15', 'TN16', 'TN17'
    ]
  },
  {
    id: 'oxfordshire',
    name: 'Oxfordshire',
    slug: 'oxfordshire',
    description: 'Certified, safe nest treatments operating throughout Oxfordshire. Expert removal of wasp and hornet colonies from historical roofs, educational buildings, and private homes.',
    dispatchHub: 'Oxford & Banbury Dispatch Hub',
    responseTimeMin: 45,
    activeTechs: 5,
    postcodes: [
      'OX1', 'OX2', 'OX3', 'OX4', 'OX5', 'OX9', 'OX10', 'OX11', 'OX12', 'OX13',
      'OX14', 'OX15', 'OX16', 'OX17', 'OX18', 'OX20', 'OX25', 'OX26', 'OX27', 'OX28',
      'OX29', 'OX33', 'OX39', 'OX44', 'OX49'
    ]
  },
  {
    id: 'surrey',
    name: 'Surrey',
    slug: 'surrey',
    description: 'Rapid-response wasp and hornet nest eradication across the county of Surrey. High-priority scheduling for family homes, schools, parks, and corporate premises.',
    dispatchHub: 'Guildford & Epsom Emergency Center',
    responseTimeMin: 30,
    activeTechs: 10,
    postcodes: [
      'GU1', 'GU2', 'GU3', 'GU4', 'GU5', 'GU6', 'GU7', 'GU8', 'GU9', 'GU10',
      'GU15', 'GU16', 'GU18', 'GU19', 'GU20', 'GU21', 'GU22', 'GU23', 'GU24', 'KT1',
      'KT2', 'KT3', 'KT4', 'KT5', 'KT6', 'KT7', 'KT8', 'KT9', 'KT10', 'KT11',
      'KT12', 'KT13', 'KT14', 'KT15', 'KT16', 'KT17', 'KT18', 'KT19', 'KT20', 'KT21',
      'KT22', 'KT23', 'KT24', 'RH1', 'RH2', 'RH3', 'RH4', 'RH5', 'RH6', 'RH8',
      'RH9', 'CR3', 'CR5', 'CR6'
    ]
  },
  {
    id: 'west-sussex',
    name: 'West Sussex',
    slug: 'west-sussex',
    description: 'Premier wasp nest treatment in West Sussex. Highly certified BPCA technicians ready to eliminate stinging insect threats from homes and businesses across the county.',
    dispatchHub: 'Crawley & Chichester Dispatch Point',
    responseTimeMin: 45,
    activeTechs: 6,
    postcodes: [
      'RH10', 'RH11', 'RH12', 'RH13', 'RH14', 'RH15', 'RH16', 'RH17', 'RH18', 'RH19',
      'RH20', 'BN11', 'BN12', 'BN13', 'BN14', 'BN15', 'BN16', 'BN17', 'BN18', 'PO18',
      'PO19', 'PO20', 'PO21', 'PO22'
    ]
  }
];
