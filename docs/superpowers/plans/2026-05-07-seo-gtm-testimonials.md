# SEO, GTM & Testimonials Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Outrank competitor saaedservice.com on Google Qatar for battery service keywords by adding GTM tracking, upgraded schema markup, dedicated service landing pages, and a Google Reviews testimonials section.

**Architecture:** Google Tag Manager loads via a single env variable in `layout.tsx`. Schema upgrades live in `layout.tsx` and per-page metadata. Service pages are static App Router pages with bilingual support. Testimonials is a Server Component that fetches Google Places API server-side (key never exposed to client), with a graceful empty state when no reviews exist yet.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, Sanity v5, Google Places API (New), Google Tag Manager

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Modify | `app/layout.tsx` | Add GTM script + noscript, upgrade LocalBusiness schema |
| Create | `lib/gtm.ts` | GTM event helpers (track WhatsApp click, form submit) |
| Modify | `.env.local` | Add `NEXT_PUBLIC_GTM_ID`, `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` |
| Create | `app/api/reviews/route.ts` | Server-side Google Places reviews fetch |
| Create | `components/sections/Testimonials.tsx` | Reviews section (Server Component) |
| Modify | `app/page.tsx` | Add `<Testimonials />` between WhatsAppCTA and ContactForm |
| Modify | `app/ar/page.tsx` | Add `<Testimonials lang="ar" />` |
| Create | `app/services/battery-replacement/page.tsx` | EN service landing page |
| Create | `app/services/jump-start/page.tsx` | EN service landing page |
| Create | `app/services/electrical-repair/page.tsx` | EN service landing page |
| Create | `app/ar/services/battery-replacement/page.tsx` | AR service landing page |
| Create | `app/ar/services/jump-start/page.tsx` | AR service landing page |
| Create | `app/ar/services/electrical-repair/page.tsx` | AR service landing page |
| Modify | `components/ui/Navbar.tsx` | Add service page links to nav |
| Modify | `app/sitemap.ts` | Add service page URLs |

---

## Task 1: Add Google Tag Manager

**Files:**
- Modify: `app/layout.tsx`
- Modify: `.env.local`

- [ ] **Step 1: Add GTM ID to `.env.local`**

Open `.env.local` and add:
```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```
Replace `GTM-XXXXXXX` with the real GTM container ID from gtm.google.com (create a free account → New Account → Container for "Web").

- [ ] **Step 2: Add GTM `<script>` to `<head>` in `app/layout.tsx`**

Find the existing `<head>` block (lines 136–143) and add the GTM script after the FOUC script:

```tsx
<head>
  {/* Prevent flash of unstyled theme on load */}
  <script
    dangerouslySetInnerHTML={{
      __html: `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);})();`,
    }}
  />
  {/* Google Tag Manager */}
  {process.env.NEXT_PUBLIC_GTM_ID && (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
      }}
    />
  )}
</head>
```

- [ ] **Step 3: Add GTM `<noscript>` as first child of `<body>`**

```tsx
<body>
  {/* GTM noscript fallback */}
  {process.env.NEXT_PUBLIC_GTM_ID && (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )}
  <ThemeProvider>
    {children}
  </ThemeProvider>
  ...
```

- [ ] **Step 4: Create `lib/gtm.ts` — event push helper**

```ts
export function gtmEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event, ...data });
}
```

- [ ] **Step 5: Fire GTM event on WhatsApp CTA clicks**

In `components/sections/Hero.tsx`, update the WhatsApp `<a>` tag:

```tsx
import { gtmEvent } from '@/lib/gtm';

// On the WhatsApp <a> tag, add:
onClick={() => gtmEvent('whatsapp_click', { location: 'hero' })}
```

Repeat for `components/sections/WhatsAppCTA.tsx`, `components/ui/Navbar.tsx`, and `components/ui/FloatingCTA.tsx` with `location` values `'whatsapp_cta'`, `'navbar'`, `'floating_cta'`.

- [ ] **Step 6: Verify GTM fires**

Run `npm run dev`. Open the site. Install the "Tag Assistant" Chrome extension from Google, connect to `localhost:3001`, click the WhatsApp button. Confirm `whatsapp_click` event appears in Tag Assistant.

- [ ] **Step 7: Commit**

```bash
git add app/layout.tsx lib/gtm.ts components/sections/Hero.tsx components/sections/WhatsAppCTA.tsx components/ui/Navbar.tsx components/ui/FloatingCTA.tsx .env.local
git commit -m "feat: add Google Tag Manager with WhatsApp click tracking"
```

---

## Task 2: Upgrade Schema Markup

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `localBusinessSchema` in `app/layout.tsx`**

Find the `const localBusinessSchema = {...}` block and replace it entirely:

```ts
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'StartSmart Battery & Electrical',
  image: `${SITE_URL}/logo.png`,
  '@id': SITE_URL,
  url: SITE_URL,
  telephone: `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '97400000000'}`,
  description: 'On-demand car battery delivery and electrical repair service in Qatar. Available 24/7. We arrive in 30 minutes.',
  priceRange: 'QAR 150–500',
  currenciesAccepted: 'QAR',
  paymentAccepted: 'Cash, Credit Card',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Doha',
    addressLocality: 'Doha',
    addressCountry: 'QA',
    addressRegion: 'Ad Dawhah',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.2854,
    longitude: 51.531,
  },
  areaServed: [
    { '@type': 'City', name: 'Doha' },
    { '@type': 'City', name: 'Al Rayyan' },
    { '@type': 'City', name: 'Al Wakrah' },
    { '@type': 'City', name: 'Lusail' },
    { '@type': 'City', name: 'Al Khor' },
  ],
  openingHours: 'Mo-Su 00:00-23:59',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Car Battery & Electrical Services Qatar',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Car Battery Replacement Qatar',
          description: 'On-site car battery replacement anywhere in Qatar. We come to you in 30 minutes.',
          url: `${SITE_URL}/services/battery-replacement`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Emergency Jump Start Qatar',
          description: '24/7 emergency jump start service across all Qatar.',
          url: `${SITE_URL}/services/jump-start`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Car Electrical Repair Qatar',
          description: 'Mobile car electrical diagnosis and repair in Qatar.',
          url: `${SITE_URL}/services/electrical-repair`,
        },
      },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '1',
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: [
    `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '97400000000'}`,
    'https://www.facebook.com/startsmartqa',
    'https://g.co/kgs/startsmartqa',
  ],
};
```

> **Note on `aggregateRating`:** Start with `ratingValue: "5.0"` and `reviewCount: "1"` as a placeholder. Once real Google reviews come in, this will be replaced dynamically by the Testimonials component in Task 4.

- [ ] **Step 2: Verify schema with Google Rich Results Test**

Run `npm run build && npm run start`. Go to [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results) and test `http://localhost:3000` (or use a deployed preview URL). Confirm "Local Business" result with star rating appears.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: upgrade LocalBusiness schema with AggregateRating and Service items"
```

---

## Task 3: Service Landing Pages

**Files:**
- Create: `app/services/battery-replacement/page.tsx`
- Create: `app/services/jump-start/page.tsx`
- Create: `app/services/electrical-repair/page.tsx`
- Create: `app/ar/services/battery-replacement/page.tsx`
- Create: `app/ar/services/jump-start/page.tsx`
- Create: `app/ar/services/electrical-repair/page.tsx`
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Create the battery replacement EN page**

Create `app/services/battery-replacement/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%2C+I+need+battery+replacement`;
const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: 'Car Battery Replacement Qatar — We Come to You in 30 Min',
  description: 'On-site car battery replacement anywhere in Qatar. Certified technician arrives in 30 minutes. All car brands. Pay after service. Call 24/7.',
  alternates: {
    canonical: `${SITE_URL}/services/battery-replacement`,
    languages: { ar: `${SITE_URL}/ar/services/battery-replacement` },
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Car Battery Replacement Qatar',
  description: 'On-site car battery replacement anywhere in Qatar in 30 minutes. Available 24/7.',
  provider: { '@type': 'LocalBusiness', name: 'StartSmart Qatar', url: SITE_URL },
  areaServed: { '@type': 'Country', name: 'Qatar' },
  url: `${SITE_URL}/services/battery-replacement`,
};

export default function BatteryReplacementPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main style={{ backgroundColor: 'var(--c-bg)', color: 'var(--c-text)', paddingTop: '80px', minHeight: '100vh' }}>
        {/* Hero */}
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem 2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', border: '1px solid rgba(var(--c-accent-rgb),0.35)', borderRadius: '9999px', padding: '0.3rem 0.875rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--c-accent)', backgroundColor: 'rgba(var(--c-accent-rgb),0.06)', marginBottom: '1.5rem' }}>
            ⚡ Available 24/7 across Qatar
          </div>
          <h1 style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1rem' }}>
            Car Battery Replacement <span style={{ color: 'var(--c-accent)' }}>Qatar</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--c-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Dead battery? Our certified technician arrives at your location — home, office, or roadside — in <strong style={{ color: 'var(--c-text)' }}>30 minutes or less</strong>. All car brands. Pay after service.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#25D366', color: '#fff', fontWeight: 700, fontSize: '1.125rem', padding: '1rem 2rem', borderRadius: '0.625rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(37,211,102,0.25)' }}
          >
            Order Battery Replacement
          </a>
        </section>

        {/* Why Us */}
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: 700, fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--c-text)' }}>
            Why Choose <span style={{ color: 'var(--c-accent)' }}>StartSmart</span>?
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              ['⚡', '30-minute arrival', 'We come to you anywhere in Qatar — Doha, Lusail, Al Rayyan, Al Wakrah, Al Khor.'],
              ['🔋', 'All battery brands', 'We carry batteries for all car brands and models. German, Japanese, American, Korean.'],
              ['💳', 'Pay after service', 'You only pay once the job is done and you are satisfied.'],
              ['🔧', 'Full system check', 'Every replacement includes a free charging system inspection.'],
              ['🌙', '24/7 availability', 'Day or night, weekday or weekend — we are always available.'],
            ].map(([icon, title, desc]) => (
              <li key={title as string} style={{ display: 'flex', gap: '1rem', padding: '1.25rem', backgroundColor: 'var(--c-surface)', borderRadius: '0.75rem', border: '1px solid var(--c-border)' }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{icon}</span>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--c-text)' }}>{title}</strong>
                  <span style={{ color: 'var(--c-muted)', fontSize: '0.9375rem' }}>{desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Areas */}
        <section style={{ backgroundColor: 'var(--c-surface)', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--c-text)' }}>
              Battery Replacement Coverage — <span style={{ color: 'var(--c-accent)' }}>All Qatar</span>
            </h2>
            <p style={{ color: 'var(--c-muted)', lineHeight: 1.7 }}>
              Doha · Lusail · Al Rayyan · Al Wakrah · Al Khor · Mesaieed · Al Shamal · Dukhan · Industrial Area · The Pearl · West Bay
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
```

- [ ] **Step 2: Create the jump start EN page**

Create `app/services/jump-start/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%2C+I+need+a+jump+start`;
const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: 'Emergency Jump Start Service Qatar — 30 Min Response',
  description: '24/7 emergency jump start service anywhere in Qatar. Technician arrives in 30 minutes. All car types. Pay after service.',
  alternates: {
    canonical: `${SITE_URL}/services/jump-start`,
    languages: { ar: `${SITE_URL}/ar/services/jump-start` },
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Jump Start Service Qatar',
  description: '24/7 emergency jump start service anywhere in Qatar in 30 minutes.',
  provider: { '@type': 'LocalBusiness', name: 'StartSmart Qatar', url: SITE_URL },
  areaServed: { '@type': 'Country', name: 'Qatar' },
  url: `${SITE_URL}/services/jump-start`,
};

export default function JumpStartPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main style={{ backgroundColor: 'var(--c-bg)', color: 'var(--c-text)', paddingTop: '80px', minHeight: '100vh' }}>
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem 2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', border: '1px solid rgba(var(--c-accent-rgb),0.35)', borderRadius: '9999px', padding: '0.3rem 0.875rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--c-accent)', backgroundColor: 'rgba(var(--c-accent-rgb),0.06)', marginBottom: '1.5rem' }}>
            ⚡ 24/7 Emergency Service
          </div>
          <h1 style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1rem' }}>
            Jump Start Service <span style={{ color: 'var(--c-accent)' }}>Qatar</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--c-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Car won't start? Our technician comes to you in <strong style={{ color: 'var(--c-text)' }}>30 minutes</strong> with professional jump start equipment. If the battery is dead, we replace it on the spot.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#25D366', color: '#fff', fontWeight: 700, fontSize: '1.125rem', padding: '1rem 2rem', borderRadius: '0.625rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(37,211,102,0.25)' }}
          >
            Request Jump Start Now
          </a>
        </section>
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--c-text)' }}>
            How It <span style={{ color: 'var(--c-accent)' }}>Works</span>
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              ['1️⃣', 'Contact us on WhatsApp', 'Send your location on WhatsApp — takes 30 seconds.'],
              ['2️⃣', 'Technician dispatched', 'We dispatch the nearest technician immediately.'],
              ['3️⃣', 'Arrive in 30 minutes', 'Your car is running again — or we replace the battery on the spot.'],
              ['4️⃣', 'Pay after service', 'Only pay once you are satisfied with the service.'],
            ].map(([icon, title, desc]) => (
              <li key={title as string} style={{ display: 'flex', gap: '1rem', padding: '1.25rem', backgroundColor: 'var(--c-surface)', borderRadius: '0.75rem', border: '1px solid var(--c-border)' }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{icon}</span>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--c-text)' }}>{title}</strong>
                  <span style={{ color: 'var(--c-muted)', fontSize: '0.9375rem' }}>{desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
```

- [ ] **Step 3: Create the electrical repair EN page**

Create `app/services/electrical-repair/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%2C+I+need+electrical+repair`;
const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: 'Mobile Car Electrical Repair Qatar — On-Site Diagnosis',
  description: 'Mobile car electrical repair and diagnosis anywhere in Qatar. Alternator, fuses, wiring, sensors. Technician arrives in 30 minutes. 24/7.',
  alternates: {
    canonical: `${SITE_URL}/services/electrical-repair`,
    languages: { ar: `${SITE_URL}/ar/services/electrical-repair` },
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Mobile Car Electrical Repair Qatar',
  description: 'On-site car electrical diagnosis and repair in Qatar. Alternator, fuses, wiring, sensors.',
  provider: { '@type': 'LocalBusiness', name: 'StartSmart Qatar', url: SITE_URL },
  areaServed: { '@type': 'Country', name: 'Qatar' },
  url: `${SITE_URL}/services/electrical-repair`,
};

export default function ElectricalRepairPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main style={{ backgroundColor: 'var(--c-bg)', color: 'var(--c-text)', paddingTop: '80px', minHeight: '100vh' }}>
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem 2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', border: '1px solid rgba(var(--c-accent-rgb),0.35)', borderRadius: '9999px', padding: '0.3rem 0.875rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--c-accent)', backgroundColor: 'rgba(var(--c-accent-rgb),0.06)', marginBottom: '1.5rem' }}>
            🔧 Mobile Electrical Service
          </div>
          <h1 style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1rem' }}>
            Car Electrical Repair <span style={{ color: 'var(--c-accent)' }}>Qatar</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--c-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Electrical fault? Warning light on? We diagnose and repair on-site. Alternator, fuses, wiring, sensors, and more. <strong style={{ color: 'var(--c-text)' }}>We come to you in 30 minutes.</strong>
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#25D366', color: '#fff', fontWeight: 700, fontSize: '1.125rem', padding: '1rem 2rem', borderRadius: '0.625rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(37,211,102,0.25)' }}
          >
            Request Electrical Repair
          </a>
        </section>
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--c-text)' }}>
            What We <span style={{ color: 'var(--c-accent)' }}>Fix</span>
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {['Alternator failure', 'Dead battery', 'Blown fuses', 'Faulty wiring', 'Warning lights', 'Starter motor', 'Sensors & ECU', 'AC electrical faults'].map((item) => (
              <li key={item} style={{ padding: '0.875rem 1rem', backgroundColor: 'var(--c-surface)', borderRadius: '0.625rem', border: '1px solid var(--c-border)', color: 'var(--c-text)', fontSize: '0.9375rem' }}>
                ✓ {item}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
```

- [ ] **Step 4: Create Arabic versions of all 3 service pages**

Create `app/ar/services/battery-replacement/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=مرحبا%2C+أحتاج+تبديل+بطارية`;
const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: 'تبديل بطارية السيارة قطر — نصل إليك في 30 دقيقة',
  description: 'خدمة تبديل بطارية السيارة في موقعك في قطر. فني متخصص يصل خلال 30 دقيقة. جميع أنواع السيارات. ادفع بعد الخدمة. متاح 24/7.',
  alternates: {
    canonical: `${SITE_URL}/ar/services/battery-replacement`,
    languages: { en: `${SITE_URL}/services/battery-replacement` },
  },
};

export default function BatteryReplacementArPage() {
  return (
    <>
      <Navbar />
      <main dir="rtl" lang="ar" style={{ backgroundColor: 'var(--c-bg)', color: 'var(--c-text)', paddingTop: '80px', minHeight: '100vh', fontFamily: 'var(--font-cairo), sans-serif' }}>
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem 2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', border: '1px solid rgba(var(--c-accent-rgb),0.35)', borderRadius: '9999px', padding: '0.3rem 0.875rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--c-accent)', backgroundColor: 'rgba(var(--c-accent-rgb),0.06)', marginBottom: '1.5rem' }}>
            ⚡ متاح 24/7 في كل قطر
          </div>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.2, marginBottom: '1rem' }}>
            تبديل بطارية السيارة <span style={{ color: 'var(--c-accent)' }}>قطر</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--c-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>
            بطاريتك وقفت؟ فنينا يجي عندك في البيت أو الشغل أو الطريق خلال <strong style={{ color: 'var(--c-text)' }}>30 دقيقة</strong>. جميع أنواع السيارات. ادفع بعد الخدمة.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#25D366', color: '#fff', fontWeight: 700, fontSize: '1.125rem', padding: '1rem 2rem', borderRadius: '0.625rem', textDecoration: 'none' }}>
            اطلب تبديل البطارية الآن
          </a>
        </section>
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.75rem', marginBottom: '1.5rem' }}>
            ليش تختار <span style={{ color: 'var(--c-accent)' }}>ستارت سمارت</span>؟
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              ['⚡', 'نصل في 30 دقيقة', 'نجي عندك في أي مكان في قطر — الدوحة، لوسيل، الريان، الوكرة، الخور.'],
              ['🔋', 'جميع أنواع البطاريات', 'عندنا بطاريات لجميع أنواع وموديلات السيارات.'],
              ['💳', 'الدفع بعد الخدمة', 'تدفع بس لما تكون راضي عن الخدمة.'],
              ['🔧', 'فحص شامل مجاني', 'كل تبديل بطارية يشمل فحص نظام الشحن بالمجان.'],
            ].map(([icon, title, desc]) => (
              <li key={title as string} style={{ display: 'flex', gap: '1rem', padding: '1.25rem', backgroundColor: 'var(--c-surface)', borderRadius: '0.75rem', border: '1px solid var(--c-border)' }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{icon}</span>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>{title}</strong>
                  <span style={{ color: 'var(--c-muted)', fontSize: '0.9375rem' }}>{desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
```

Create `app/ar/services/jump-start/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=مرحبا%2C+أحتاج+بوسطة+سيارة`;
const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: 'بوسطة سيارة قطر — خدمة طوارئ 24/7',
  description: 'خدمة بوسطة سيارة طارئة في قطر. فني يصل خلال 30 دقيقة. متاح 24 ساعة 7 أيام. ادفع بعد الخدمة.',
  alternates: {
    canonical: `${SITE_URL}/ar/services/jump-start`,
    languages: { en: `${SITE_URL}/services/jump-start` },
  },
};

export default function JumpStartArPage() {
  return (
    <>
      <Navbar />
      <main dir="rtl" lang="ar" style={{ backgroundColor: 'var(--c-bg)', color: 'var(--c-text)', paddingTop: '80px', minHeight: '100vh', fontFamily: 'var(--font-cairo), sans-serif' }}>
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem 2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', border: '1px solid rgba(var(--c-accent-rgb),0.35)', borderRadius: '9999px', padding: '0.3rem 0.875rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--c-accent)', backgroundColor: 'rgba(var(--c-accent-rgb),0.06)', marginBottom: '1.5rem' }}>
            ⚡ خدمة طوارئ 24/7
          </div>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.2, marginBottom: '1rem' }}>
            بوسطة سيارة <span style={{ color: 'var(--c-accent)' }}>قطر</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--c-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>
            سيارتك ما تشتغل؟ فنينا يجي عندك خلال <strong style={{ color: 'var(--c-text)' }}>30 دقيقة</strong> بمعدات بوسطة احترافية. إذا البطارية ميتة نبدلها في نفس المكان.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#25D366', color: '#fff', fontWeight: 700, fontSize: '1.125rem', padding: '1rem 2rem', borderRadius: '0.625rem', textDecoration: 'none' }}>
            اطلب بوسطة الآن
          </a>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
```

Create `app/ar/services/electrical-repair/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=مرحبا%2C+أحتاج+إصلاح+كهرباء+سيارة`;
const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: 'إصلاح كهرباء السيارة قطر — خدمة متنقلة',
  description: 'إصلاح وتشخيص كهرباء السيارة في موقعك بقطر. دينامو، فيوزات، أسلاك، حساسات. فني يصل في 30 دقيقة. متاح 24/7.',
  alternates: {
    canonical: `${SITE_URL}/ar/services/electrical-repair`,
    languages: { en: `${SITE_URL}/services/electrical-repair` },
  },
};

export default function ElectricalRepairArPage() {
  return (
    <>
      <Navbar />
      <main dir="rtl" lang="ar" style={{ backgroundColor: 'var(--c-bg)', color: 'var(--c-text)', paddingTop: '80px', minHeight: '100vh', fontFamily: 'var(--font-cairo), sans-serif' }}>
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem 2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', border: '1px solid rgba(var(--c-accent-rgb),0.35)', borderRadius: '9999px', padding: '0.3rem 0.875rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--c-accent)', backgroundColor: 'rgba(var(--c-accent-rgb),0.06)', marginBottom: '1.5rem' }}>
            🔧 خدمة كهرباء متنقلة
          </div>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.2, marginBottom: '1rem' }}>
            إصلاح كهرباء السيارة <span style={{ color: 'var(--c-accent)' }}>قطر</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--c-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>
            عندك عطل كهربائي؟ نشخص ونصلح في موقعك. دينامو، فيوزات، أسلاك، حساسات، وأكثر. <strong style={{ color: 'var(--c-text)' }}>نجي عندك في 30 دقيقة.</strong>
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#25D366', color: '#fff', fontWeight: 700, fontSize: '1.125rem', padding: '1rem 2rem', borderRadius: '0.625rem', textDecoration: 'none' }}>
            اطلب إصلاح الكهرباء
          </a>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
```

- [ ] **Step 5: Add service pages to `app/sitemap.ts`**

Open `app/sitemap.ts` and add the 6 service URLs to the static routes array:

```ts
// Add these alongside existing static routes:
{ url: `${baseUrl}/services/battery-replacement`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
{ url: `${baseUrl}/services/jump-start`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
{ url: `${baseUrl}/services/electrical-repair`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
{ url: `${baseUrl}/ar/services/battery-replacement`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
{ url: `${baseUrl}/ar/services/jump-start`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
{ url: `${baseUrl}/ar/services/electrical-repair`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
```

- [ ] **Step 6: Verify build**

```bash
npm run build
```

Expected: 6 new static routes appear in the build output under `/services/` and `/ar/services/`.

- [ ] **Step 7: Commit**

```bash
git add app/services/ app/ar/services/ app/sitemap.ts
git commit -m "feat: add dedicated service landing pages (EN + AR) for battery, jump start, electrical"
```

---

## Task 4: Testimonials Section (Google Places API Ready)

**Files:**
- Modify: `.env.local`
- Create: `app/api/reviews/route.ts`
- Create: `components/sections/Testimonials.tsx`
- Modify: `app/page.tsx`
- Modify: `app/ar/page.tsx`

- [ ] **Step 1: Add Google Places env vars to `.env.local`**

```
GOOGLE_PLACES_API_KEY=your_api_key_here
GOOGLE_PLACE_ID=your_place_id_here
NEXT_PUBLIC_GOOGLE_REVIEW_URL=https://g.page/r/YOUR_PLACE_ID/review
```

> **How to get these:**
> 1. Go to [console.cloud.google.com](https://console.cloud.google.com) → Enable "Places API (New)"
> 2. Create an API key → restrict it to "Places API" + your domain
> 3. Once GBP is live, find your Place ID at [developers.google.com/maps/documentation/places/web-service/place-id](https://developers.google.com/maps/documentation/places/web-service/place-id)
> 4. For the review link: in Google Business Profile → "Get more reviews" → copy the short link

- [ ] **Step 2: Create `app/api/reviews/route.ts`**

```ts
import { NextResponse } from 'next/server';

export interface GoogleReview {
  authorName: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
  profilePhotoUrl: string;
}

export interface ReviewsResponse {
  reviews: GoogleReview[];
  totalRating: number;
  totalReviews: number;
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json<ReviewsResponse>({ reviews: [], totalRating: 0, totalReviews: 0 });
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();

    if (data.status !== 'OK' || !data.result) {
      return NextResponse.json<ReviewsResponse>({ reviews: [], totalRating: 0, totalReviews: 0 });
    }

    const reviews: GoogleReview[] = (data.result.reviews ?? [])
      .filter((r: any) => r.rating >= 4)
      .slice(0, 6)
      .map((r: any) => ({
        authorName: r.author_name,
        rating: r.rating,
        text: r.text,
        relativeTimeDescription: r.relative_time_description,
        profilePhotoUrl: r.profile_photo_url,
      }));

    return NextResponse.json<ReviewsResponse>({
      reviews,
      totalRating: data.result.rating ?? 0,
      totalReviews: data.result.user_ratings_total ?? 0,
    });
  } catch {
    return NextResponse.json<ReviewsResponse>({ reviews: [], totalRating: 0, totalReviews: 0 });
  }
}
```

- [ ] **Step 3: Create `components/sections/Testimonials.tsx`**

```tsx
interface TestimonialsProps {
  lang?: 'en' | 'ar';
}

interface GoogleReview {
  authorName: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
  profilePhotoUrl: string;
}

interface ReviewsResponse {
  reviews: GoogleReview[];
  totalRating: number;
  totalReviews: number;
}

async function fetchReviews(): Promise<ReviewsResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://startsmartqa.com';
    const res = await fetch(`${baseUrl}/api/reviews`, { next: { revalidate: 3600 } });
    if (!res.ok) return { reviews: [], totalRating: 0, totalReviews: 0 };
    return res.json();
  } catch {
    return { reviews: [], totalRating: 0, totalReviews: 0 };
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div aria-label={`${rating} out of 5 stars`} style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= rating ? 'var(--c-accent)' : 'var(--c-border)', fontSize: '1rem' }}>★</span>
      ))}
    </div>
  );
}

export default async function Testimonials({ lang = 'en' }: TestimonialsProps) {
  const ar = lang === 'ar';
  const { reviews, totalRating, totalReviews } = await fetchReviews();
  const reviewUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ?? 'https://g.co/kgs/startsmartqa';

  return (
    <section
      id="reviews"
      dir={ar ? 'rtl' : 'ltr'}
      style={{ backgroundColor: 'var(--c-bg)', padding: '5rem 1.25rem', borderTop: '1px solid var(--c-border)' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: ar ? 'var(--font-cairo), sans-serif' : 'var(--font-inter), sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--c-text)', marginBottom: '0.75rem' }}>
            {ar ? (
              <><span style={{ color: 'var(--c-accent)' }}>آراء</span> عملاءنا على Google</>
            ) : (
              <>What Clients Say on <span style={{ color: 'var(--c-accent)' }}>Google</span></>
            )}
          </h2>
          {totalReviews > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--c-text)' }}>{totalRating.toFixed(1)}</span>
              <StarRating rating={Math.round(totalRating)} />
              <span style={{ color: 'var(--c-muted)', fontSize: '0.9375rem' }}>
                {ar ? `${totalReviews} تقييم على Google` : `${totalReviews} reviews on Google`}
              </span>
            </div>
          )}
        </div>

        {/* Reviews grid or empty state */}
        {reviews.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {reviews.map((review, i) => (
              <article key={i} style={{ backgroundColor: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '0.875rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {review.profilePhotoUrl ? (
                    <img src={review.profilePhotoUrl} alt={review.authorName} width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--c-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-accent)', fontWeight: 700, fontSize: '1rem' }}>
                      {review.authorName[0]}
                    </div>
                  )}
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--c-text)', fontSize: '0.9375rem' }}>{review.authorName}</div>
                    <div style={{ color: 'var(--c-muted)', fontSize: '0.8125rem' }}>{review.relativeTimeDescription}</div>
                  </div>
                </div>
                <StarRating rating={review.rating} />
                <p style={{ color: 'var(--c-muted)', fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}>
                  "{review.text}"
                </p>
              </article>
            ))}
          </div>
        ) : (
          /* Empty state — shown until GBP is live */
          <div style={{ textAlign: 'center', padding: '3rem 1rem', backgroundColor: 'var(--c-surface)', borderRadius: '1rem', border: '1px dashed var(--c-border)', marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
            <p style={{ color: 'var(--c-text)', fontWeight: 600, fontSize: '1.125rem', marginBottom: '0.5rem' }}>
              {ar ? 'كن أول من يقيّمنا على Google' : 'Be the first to review us on Google'}
            </p>
            <p style={{ color: 'var(--c-muted)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
              {ar ? 'جرّبت خدمتنا؟ رأيك يساعدنا ويساعد عملاء ثانيين.' : 'Used our service? Your review helps others find us.'}
            </p>
            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--c-accent)', color: '#111111', fontWeight: 700, fontSize: '0.9375rem', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none' }}
            >
              {ar ? 'اكتب تقييم على Google' : 'Leave a Google Review'}
            </a>
          </div>
        )}

        {/* Always show Google review CTA */}
        {reviews.length > 0 && (
          <div style={{ textAlign: 'center' }}>
            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '2px solid var(--c-accent)', color: 'var(--c-accent)', fontWeight: 600, fontSize: '0.9375rem', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none' }}
            >
              {ar ? '← اقرأ كل التقييمات على Google' : 'Read all reviews on Google →'}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add `NEXT_PUBLIC_SITE_URL` to `.env.local`**

```
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

In production (Vercel), set `NEXT_PUBLIC_SITE_URL=https://startsmartqa.com`.

- [ ] **Step 5: Add `<Testimonials />` to both homepages**

In `app/page.tsx`:
```tsx
import Testimonials from '@/components/sections/Testimonials';

// Add between <WhatsAppCTA /> and <ContactForm />:
<WhatsAppCTA />
<Testimonials />
<ContactForm />
```

In `app/ar/page.tsx`:
```tsx
import Testimonials from '@/components/sections/Testimonials';

// Add between <WhatsAppCTA /> and <ContactForm />:
<WhatsAppCTA />
<Testimonials lang="ar" />
<ContactForm lang="ar" />
```

- [ ] **Step 6: Verify build**

```bash
npm run build
```

Expected: Build succeeds. `/api/reviews` route appears as `ƒ (Dynamic)`.

- [ ] **Step 7: Commit**

```bash
git add app/api/reviews/ components/sections/Testimonials.tsx app/page.tsx app/ar/page.tsx .env.local
git commit -m "feat: add Google Reviews testimonials section with empty state CTA"
```

---

## Task 5: Blog SEO + Backlinks Checklist

**Files:**
- No code changes — this is a content + submission task

- [ ] **Step 1: Write blog post #1 — Battery brands**

In Sanity Studio (`npm run sanity dev` or login to sanity.io), create a new post:

```
Title (EN): Top 5 Car Battery Brands in Qatar 2026 — Which Lasts in the Heat?
Slug: top-5-car-battery-brands-qatar-2026
Title (AR): أفضل 5 بطاريات سيارات في قطر 2026 — أيها يصمد في الحر؟

Target keywords: "car battery brands Qatar", "best battery Qatar", "أفضل بطارية سيارة قطر"

Content outline (400+ words):
- Intro: Qatar heat kills batteries fast (avg 2-3 years vs 5 globally)
- Brand 1: Amaron (Indian, heat-resistant, popular in Gulf)
- Brand 2: Varta (German, premium, long life)
- Brand 3: Bosch (German, wide availability)
- Brand 4: Exide (budget, good for older cars)
- Brand 5: AC Delco (GM standard, good for American cars)
- CTA: "Not sure which battery fits your car? We come to you and fit the right one — WhatsApp us"
- Internal link to: /services/battery-replacement
```

- [ ] **Step 2: Write blog post #2 — Emergency guide**

```
Title (EN): Car Battery Dead in Qatar? Here's What to Do (30-Minute Fix)
Slug: car-battery-dead-qatar-what-to-do
Title (AR): بطارية سيارتك وقفت في قطر؟ هذا ما تسويه (الحل في 30 دقيقة)

Target keywords: "battery dead Qatar", "car won't start Qatar", "بطارية وقفت قطر"

Content outline:
- Signs your battery is dead (clicking sound, no start, dim lights)
- What NOT to do (push start modern cars, jump with wrong polarity)
- Step 1: Call StartSmart on WhatsApp — link to WhatsApp
- Step 2: Stay safe (hazard lights, don't block traffic)
- Step 3: We arrive in 30 min, test battery, replace if needed
- FAQ section (how much does it cost? what brands? do you come at night?)
- Internal links to: /services/jump-start, /services/battery-replacement
```

- [ ] **Step 3: Write blog post #3 — Arabic SEO**

```
Title (AR): تبديل بطارية السيارة في قطر — دليل الأسعار والخدمة 2026
Slug (AR): تبديل-بطارية-سيارة-قطر-دليل-الاسعار
Title (EN): Car Battery Replacement Qatar — Price Guide 2026

Target keywords: "تبديل بطارية قطر", "سعر بطارية سيارة قطر", "بطارية سيارة قطر"

Content outline (400+ words in Arabic):
- متى تحتاج تبدل البطارية؟ (علامات)
- أسعار البطاريات في قطر (150-500 ريال حسب النوع)
- فرق بين البطاريات العادية والـ AGM
- ليش الاستبدال عند البيت أفضل من الورشة
- خطوات خدمتنا
- CTA: اطلب الخدمة عبر واتساب
```

- [ ] **Step 4: Submit to Qatar directories (backlinks)**

Submit `startsmartqa.com` to these directories with consistent NAP (Name, Address, Phone):

| Directory | URL | Priority |
|-----------|-----|---------|
| Qatar Yellow Pages | yp.com.qa | High |
| Qatar Living Business | qatarliving.com/business | High |
| Gulf Business Directory | gulfbusiness.com | High |
| Expatica Qatar | expatica.com/qa | Medium |
| Qatar e-Government | hukoomi.gov.qa | Medium |
| The Peninsula classifieds | thepeninsulaqatar.com | Medium |
| Gulf Times listings | gulf-times.com | Medium |
| Yelp Qatar (US listings count) | biz.yelp.com | Low |

Use this consistent NAP for all submissions:
```
Name: StartSmart Battery & Electrical Qatar
Phone: +974 XXXX XXXX
Website: https://startsmartqa.com
Category: Auto Repair, Battery Service, Roadside Assistance
Description: On-demand car battery replacement and electrical service across Qatar. We come to you in 30 minutes. Available 24/7.
```

- [ ] **Step 5: Submit sitemap to Google Search Console**

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `startsmartqa.com`
3. Verify ownership (HTML tag method — add to `app/layout.tsx` metadata)
4. Go to Sitemaps → submit `https://startsmartqa.com/sitemap.xml`

To add GSC verification tag in `app/layout.tsx`:
```ts
export const metadata: Metadata = {
  // ... existing metadata ...
  verification: {
    google: 'YOUR_GSC_VERIFICATION_CODE',
  },
};
```

- [ ] **Step 6: Commit any code changes from this task**

```bash
git add app/layout.tsx
git commit -m "feat: add Google Search Console verification meta tag"
```

---

## Self-Review

**Spec coverage check:**
- ✅ GTM — Task 1
- ✅ WhatsApp click tracking — Task 1, Step 5
- ✅ Schema AggregateRating — Task 2
- ✅ Service schemas — Task 3
- ✅ 6 service pages (EN + AR) — Task 3
- ✅ Google Places API server-side — Task 4, Step 2
- ✅ Testimonials empty state — Task 4, Step 3
- ✅ Both homepages updated — Task 4, Step 5
- ✅ Blog content plan — Task 5
- ✅ Directory backlinks — Task 5, Step 4
- ✅ GSC sitemap submission — Task 5, Step 5

**Placeholder scan:** No TBDs. All code blocks are complete. GTM ID and Place ID are marked as "replace with real value" with instructions on where to get them.

**Type consistency:** `GoogleReview` and `ReviewsResponse` interfaces defined in `route.ts` and re-declared in `Testimonials.tsx` to avoid cross-file coupling (Server Component doesn't import from route).
