/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { countiesData } from '../src/data/counties';

// Let's mock or import what's needed or just list the static services/pests
const BASE_URL = 'https://www.waspnestexterminators.co.uk';

const staticRoutes = [
  '',
  '/service/wasp-nest-removal',
  '/service/hornet-control',
  '/service/emergency-removal',
  '/service/residential-control',
  '/service/commercial-control',
  '/pest/wasp',
  '/pest/hornet',
  '/pest/honeybee',
  '/pest/bumblebee',
];

const zoneKeys = [
  'SW', 'SE', 'W', 'WC', 'EC', 'E', 'N', 'NW',
  'CR', 'BR', 'SM', 'TW', 'HA', 'UB', 'EN', 'IG',
  'RM', 'DA', 'KT', 'WD', 'SL', 'TN', 'RH', 'GU',
  'AL', 'CM', 'SS'
];

function generateSitemap() {
  console.log('Generating dynamic sitemap...');
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // 1. Add static routes
  staticRoutes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${route}</loc>\n`;
    xml += '    <lastmod>2026-07-22</lastmod>\n';
    xml += '    <changefreq>daily</changefreq>\n';
    xml += '    <priority>1.0</priority>\n';
    xml += '  </url>\n';
  });

  // 2. Add zone routes
  zoneKeys.forEach(zone => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}/zone/${zone.toLowerCase()}</loc>\n`;
    xml += '    <lastmod>2026-07-22</lastmod>\n';
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  });

  // 3. Add dynamic area postcode routes from countiesData
  let count = 0;
  countiesData.forEach(county => {
    county.postcodes.forEach(postcode => {
      xml += '  <url>\n';
      xml += `    <loc>${BASE_URL}/${county.slug}/${postcode.toLowerCase()}</loc>\n`;
      xml += '    <lastmod>2026-07-22</lastmod>\n';
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
      count++;
    });
  });

  xml += '</urlset>\n';

  const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(publicPath, xml, 'utf8');
  console.log(`Successfully generated public/sitemap.xml with ${staticRoutes.length} static routes, ${zoneKeys.length} zone routes, and ${count} postcode area routes.`);
}

generateSitemap();
