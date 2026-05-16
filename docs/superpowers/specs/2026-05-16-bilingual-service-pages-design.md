# Bilingual Service Pages — Design Spec
**Date:** 2026-05-16
**Project:** StartSmart Qatar (`startsmartqa.com`)
**Goal:** All 3 service pages fully built in English + Arabic, SEO-optimised, structurally identical, zero content drift between languages.

---

## Problem

The 6 existing service pages (3 services × 2 languages) are:
- Structurally inconsistent — AR pages are missing sections that EN has
- Thin on content — not enough text for Google to rank
- Missing SEO elements — no FAQ schema, no breadcrumb schema, no related-service links per page
- Duplicated code — changing a section layout requires editing 6 files

---

## Solution: Shared `ServicePageTemplate` Component

One component renders all 6 pages. Content lives in one data file. Page files become thin wrappers.

---

## Architecture

### New files

| File | Purpose |
|------|---------|
| `components/templates/ServicePageTemplate.tsx` | Renders the full page given a service data object and `lang` |
| `lib/services-data.ts` | All EN + AR content for all 3 services |

### Modified files

| File | Change |
|------|--------|
| `app/services/battery-replacement/page.tsx` | Thin wrapper — exports metadata, renders template |
| `app/services/jump-start/page.tsx` | Thin wrapper |
| `app/services/electrical-repair/page.tsx` | Thin wrapper |
| `app/ar/services/battery-replacement/page.tsx` | Thin wrapper |
| `app/ar/services/jump-start/page.tsx` | Thin wrapper |
| `app/ar/services/electrical-repair/page.tsx` | Thin wrapper |

---

## Page Structure (all 6 pages, guaranteed)

Sections render in this order. Arabic pages use `dir="rtl"` and `font-family: var(--font-cairo)`.

```
1. Breadcrumb bar       Home > Services > [Service Name]
2. Hero                 Badge pill + H1 + description + WhatsApp CTA
3. Benefits             5 cards: icon + bold title + description
4. Coverage Areas       Grid of Qatar areas + "We come to you" note
5. FAQ                  4 questions, static open display (no accordion), with FAQPage schema
6. Related Services     2 cards linking to the other 2 services
```

---

## Data Shape (`lib/services-data.ts`)

```ts
interface ServiceTranslation {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  h1: string;
  h1Accent: string;          // highlighted word(s) in accent color
  description: string;
  whatsappText: string;      // pre-filled WhatsApp message
  ctaLabel: string;
  benefitsHeading: string;
  benefits: { icon: string; title: string; desc: string }[];  // exactly 5
  areasHeading: string;
  areasNote: string;
  faqHeading: string;
  faq: { q: string; a: string }[];   // exactly 4
  relatedHeading: string;
}

interface ServiceData {
  slug: 'battery-replacement' | 'jump-start' | 'electrical-repair';
  en: ServiceTranslation;
  ar: ServiceTranslation;
}
```

One `ServiceData` object per service. The template reads the correct language based on the `lang` prop.

---

## SEO Elements (automatic, per page)

| Element | Implementation |
|---------|---------------|
| `<title>` | From `ServiceTranslation.metaTitle` |
| `<meta description>` | From `ServiceTranslation.metaDescription` |
| `canonical` | `https://startsmartqa.com/[ar/]services/[slug]` |
| `hreflang` alternate | EN page points to AR, AR page points to EN |
| `Service` JSON-LD | name, description, provider, areaServed, serviceUrl |
| `BreadcrumbList` JSON-LD | Home → Services (anchor) → This service |
| `FAQPage` JSON-LD | 4 Q&As from `faq` array — rendered in `<head>` |

All 3 JSON-LD blocks are injected in `<head>` (not afterInteractive) so Google crawlers see them on first parse.

---

## Template Component Interface

```tsx
interface ServicePageTemplateProps {
  data: ServiceData;
  lang: 'en' | 'ar';
}

export default function ServicePageTemplate({ data, lang }: ServicePageTemplateProps)
```

The template derives everything from these two props:
- Which language strings to display
- `dir="rtl"` on Arabic
- Correct canonical + hreflang URLs using `data.slug` + `lang`
- Which 2 services to show in "Related Services" (the other 2 from the 3-service list)

---

## Thin Wrapper Pattern

```tsx
// app/services/battery-replacement/page.tsx
import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import { batteryReplacementData } from '@/lib/services-data';

export const metadata: Metadata = {
  title: batteryReplacementData.en.metaTitle,
  description: batteryReplacementData.en.metaDescription,
  alternates: {
    canonical: 'https://startsmartqa.com/services/battery-replacement',
    languages: { ar: 'https://startsmartqa.com/ar/services/battery-replacement' },
  },
};

export default function Page() {
  return <ServicePageTemplate data={batteryReplacementData} lang="en" />;
}
```

Arabic wrapper is identical but `lang="ar"` and canonical/hreflang swapped.

---

## Content: Services Data Summary

### Battery Replacement
- **EN keywords:** car battery replacement Qatar, battery delivery Doha, 30 min battery service
- **AR keywords:** تبديل بطارية السيارة قطر، توصيل بطارية الدوحة
- **FAQ topics:** How fast? Which brands? Do you test the alternator? Price range?

### Jump Start
- **EN keywords:** jump start service Qatar, car won't start Doha, emergency jump start 24/7
- **AR keywords:** بوسطة سيارة قطر، شحن بطارية طوارئ
- **FAQ topics:** What if battery is dead after jump start? Do you come at night? How to request?

### Electrical Repair
- **EN keywords:** car electrical repair Qatar, mobile electrician Qatar, alternator repair Doha
- **AR keywords:** إصلاح كهرباء السيارة قطر، فني كهرباء متنقل
- **FAQ topics:** What faults do you fix? Do you bring parts? How long does repair take?

---

## Coverage Areas (same list on all 6 pages)

West Bay · The Pearl · Lusail · Al Rayyan · Madinat Khalifa · Al Wakrah · Al Duhail · Al Khor · Muaither · Old Airport · Industrial Area · All Other Areas

Arabic: ويست باي · اللؤلؤة · لوسيل · الريان · مدينة خليفة · الوكرة · الدحيل · الخور · مويثر · المطار القديم · المنطقة الصناعية · كل المناطق

---

## Mobile-First Requirements

- All sections use `clamp()` for font sizes
- Benefits cards: 1 column on mobile, 2 on tablet, stays 1-col list on narrow
- Coverage areas: 2-col on mobile, 4-col on desktop (matches homepage)
- FAQ: full width, no side-by-side
- Related services: stacked on mobile, 2-col on desktop
- CTA button: full width on mobile (`width: 100%` below 480px)

---

## Out of Scope

- Adding new services beyond the 3 existing
- City-specific landing pages (e.g. `/services/battery-replacement/doha`)
- Pricing page
- CMS-driven content editing (content stays in `services-data.ts`)

---

## Implementation Order

1. Create `lib/services-data.ts` with all content
2. Create `components/templates/ServicePageTemplate.tsx`
3. Replace all 6 page files with thin wrappers
4. Verify build passes
5. Verify all 6 pages render correctly in both languages
