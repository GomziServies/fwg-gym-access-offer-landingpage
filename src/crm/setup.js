/**
 * FG Group CRM tracking for this site: cookie banner, visitor tracker, and the link that makes an inquiry and the
 * visitor's browsing one lead. Site key 'fwg-gym-access-offer' is registered in fg-api src/config/website-sources.js, which
 * sends this site's leads to the FWG section of the CRM. How it works: ./fg-crm-tracking.js
 */
import { API_BASE } from '../data/offer';
import { initCrmTracking } from './fg-crm-tracking';

initCrmTracking({
  apiBase: API_BASE,
  siteKey: 'fwg-gym-access-offer',
  brand: 'Fitness With Gomzi',
  accent: '#99c229',
  accentText: '#0f172a',
  profileKeys: [],
});
