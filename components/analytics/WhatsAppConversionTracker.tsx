'use client';

import { useEffect } from 'react';

/**
 * Fires the Google Ads "CONTACT/WEBSITE" conversion whenever a visitor clicks
 * any WhatsApp link (anchor pointing at wa.me) anywhere on the site.
 *
 * Uses event delegation on the document so it covers every WhatsApp button —
 * floating CTA, hero, navbar, service pages, blog, etc. — including any added
 * later, without touching each component.
 *
 * The conversion label comes from the Google Ads conversion action
 * (Goals → Conversions → CONTACT/WEBSITE → Tag setup). Format: AW-XXXX/LABEL.
 */
const CONVERSION_SEND_TO = 'AW-18181500536/jNaeCLrc5b8cEPjczt1D';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
  }
}

export default function WhatsAppConversionTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const link = target?.closest('a');
      if (!link) return;

      const href = link.getAttribute('href') ?? '';
      if (!href.includes('wa.me') && !href.includes('api.whatsapp.com')) return;

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: CONVERSION_SEND_TO,
          value: 1.0,
          currency: 'QAR',
        });
      }
    }

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, []);

  return null;
}
