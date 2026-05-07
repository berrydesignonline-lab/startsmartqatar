# StartSmart Qatar — Project Knowledge Base

> Read this file at the start of every session. It documents the full codebase so you can make changes instantly.

---

## What This Project Is

**StartSmart Qatar** — an on-demand car battery delivery and electrical repair service in Qatar.
- Website: `https://startsmartqa.com`
- Bilingual: English + Arabic (RTL)
- Built by: Berry Design (`berrydesign.online`)

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + inline styles |
| Fonts | Inter (EN), Cairo (AR) — Google Fonts via `next/font` |
| CMS | Sanity v5 (blog posts only) |
| Form backend | `/api/contact` route → saves to Sanity as `lead` |
| Dev port | **3001** (`npm run dev`) |
| Deployment | Vercel |

---

## Running the Project

```bash
npm run dev      # http://localhost:3001
npm run build    # production build
npm run start    # serve production build
```

---

## Environment Variables

File: `.env.local` (not committed)

| Variable | Purpose | Status |
|----------|---------|--------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Phone/WhatsApp number (no `+`, no spaces) | ⚠️ needs real number |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED` | Google Maps embed URL | ⚠️ not set yet |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | ✓ |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset | ✓ |
| `SANITY_API_TOKEN` | Sanity write token (server-side only) | ✓ |
| `GOOGLE_PLACES_API_KEY` | Google Places API key (server-side, reviews) | ⚠️ needs GBP first |
| `GOOGLE_PLACE_ID` | Google Place ID for the business | ⚠️ needs GBP first |
| `NEXT_PUBLIC_GOOGLE_REVIEW_URL` | Short link to leave a Google review | ⚠️ needs GBP first |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console HTML tag code | ⚠️ needs GSC setup |
| `NEXT_PUBLIC_SITE_URL` | Full site URL (used by Testimonials for SSR fetch) | set to `https://startsmartqa.com` in prod, `http://localhost:3001` in dev |

> **Phone number change:** Update `NEXT_PUBLIC_WHATSAPP_NUMBER` — it auto-fills everywhere (Navbar, Hero, Footer, WhatsAppCTA, Services, ContactForm, schema markup in layout).

---

## ⚡ Pending Actions (Next Session Checklist)

These are the outstanding items that require Ali's action — not code tasks.

### 1. Set up Google Business Profile (GBP)
- Go to business.google.com → create/claim the business
- Once approved, get:
  - **Place ID** → from https://developers.google.com/maps/documentation/places/web-service/place-id
  - **Review link** → GBP dashboard → "Get more reviews" → copy short link
- Add to `.env.local` AND Vercel environment variables:
  ```
  GOOGLE_PLACES_API_KEY=...   (from Google Cloud Console → enable Places API)
  GOOGLE_PLACE_ID=...
  NEXT_PUBLIC_GOOGLE_REVIEW_URL=https://g.page/r/YOUR_ID/review
  ```
- The Testimonials section (`components/sections/Testimonials.tsx`) is already built and will auto-display real reviews once these vars are set.

### 2. Set up Google Search Console (GSC)
- Go to https://search.google.com/search-console
- Add property: `startsmartqa.com`
- Choose **HTML tag** verification method → copy the code (looks like: `AbCdEf1234567890`)
- Add to `.env.local` AND Vercel:
  ```
  NEXT_PUBLIC_GSC_VERIFICATION=AbCdEf1234567890
  ```
- After verifying → Sitemaps → submit: `https://startsmartqa.com/sitemap.xml`

### 3. Add real phone number
- Add to `.env.local`: `NEXT_PUBLIC_WHATSAPP_NUMBER=974XXXXXXXX` (no `+`, no spaces)

### 4. Add Google Maps embed
- Get embed URL from Google Maps → Share → Embed → copy `src="..."` value
- Add to `.env.local`: `NEXT_PUBLIC_GOOGLE_MAPS_EMBED=https://www.google.com/maps/embed?...`

### 5. Write 3 blog posts in Sanity (SEO priority)
- **Post 1 (EN):** "Top 5 Car Battery Brands in Qatar 2026 — Which Lasts in the Heat?"
  - Keywords: `car battery brands Qatar`, `best battery Qatar`
  - Internal link to `/services/battery-replacement`
- **Post 2 (EN):** "Car Battery Dead in Qatar? Here's What to Do (30-Minute Fix)"
  - Keywords: `battery dead Qatar`, `car won't start Qatar`
  - Internal links to `/services/jump-start`, `/services/battery-replacement`
- **Post 3 (AR):** "تبديل بطارية السيارة في قطر — دليل الأسعار والخدمة 2026"
  - Keywords: `تبديل بطارية قطر`, `سعر بطارية سيارة قطر`

### 6. Submit to Qatar business directories (backlinks)
| Directory | URL | Priority |
|-----------|-----|---------|
| Qatar Yellow Pages | yp.com.qa | High |
| Qatar Living Business | qatarliving.com/business | High |
| Gulf Business Directory | gulfbusiness.com | High |
| Expatica Qatar | expatica.com/qa | Medium |

Use consistent NAP:
```
Name: StartSmart Battery & Electrical Qatar
Phone: +974 XXXX XXXX
Website: https://startsmartqa.com
Category: Auto Repair, Battery Service, Roadside Assistance
```

---

## Design Tokens (Colors)

File: `app/globals.css`

```css
/* Dark mode (default) */
--c-accent: #FFD600   /* yellow */

/* Light mode */
--c-accent: #E63030   /* red */
```

All components use `var(--c-accent)` — never hardcoded hex. Theme toggle in Navbar switches between dark/light.

**To change accent color:** Edit `app/globals.css` — `--c-accent` in the relevant theme block.

---

## File Structure

```
app/
  layout.tsx              ← Root layout: fonts, metadata, LocalBusiness JSON-LD schema
  page.tsx                ← EN homepage
  globals.css             ← Design tokens, base styles, animations
  robots.ts               ← robots.txt
  sitemap.ts              ← sitemap.xml (auto-includes blog + service pages)
  api/
    contact/route.ts      ← POST: saves form to Sanity as `lead`
    reviews/route.ts      ← GET: fetches Google Places reviews (server-side)
  blog/
    page.tsx              ← EN blog listing
    [slug]/page.tsx       ← EN blog post
  services/
    battery-replacement/page.tsx   ← EN service page
    jump-start/page.tsx            ← EN service page
    electrical-repair/page.tsx     ← EN service page
  ar/
    page.tsx              ← AR homepage
    blog/
      page.tsx            ← AR blog listing
      [slug]/page.tsx     ← AR blog post
    services/
      battery-replacement/page.tsx ← AR service page
      jump-start/page.tsx          ← AR service page
      electrical-repair/page.tsx   ← AR service page

components/
  sections/
    Hero.tsx          ← Split layout: headline left, car image right
    StatsBar.tsx      ← Animated stats (30 min / All Qatar / Pay After / 24/7)
    Services.tsx      ← 3 service cards
    HowItWorks.tsx    ← 3-step explainer
    Areas.tsx         ← Coverage map + areas list
    WhatsAppCTA.tsx   ← Green WhatsApp banner
    Testimonials.tsx  ← Google Reviews (Server Component, empty state until GBP live)
    ContactForm.tsx   ← Request form + FAQ accordion
  ui/
    Navbar.tsx        ← Fixed top nav + dark/light toggle + language toggle
    Footer.tsx        ← 3-col footer
    FloatingCTA.tsx   ← Floating WhatsApp button (mobile, bottom-right)
    BlogCard.tsx      ← Blog listing card
    RelatedCard.tsx   ← Related posts card

lib/
  theme.tsx           ← ThemeProvider + useTheme hook (dark/light mode)
  sanity.ts           ← Sanity client config
  queries.ts          ← GROQ queries for blog posts
  types.ts            ← TypeScript types

sanity/schemas/
  post.ts / category.ts / lead.ts / index.ts
```

---

## Quick Change Guide

### Change phone number
→ `.env.local`: `NEXT_PUBLIC_WHATSAPP_NUMBER=974XXXXXXXX`

### Change accent/brand color (per theme)
→ `app/globals.css`: `--c-accent` under `[data-theme="dark"]` or `[data-theme="light"]`

### Change logo (SVG battery icon)
→ `components/ui/Navbar.tsx` — `BatteryLogo()` function (top of file)
→ `components/ui/Footer.tsx` — same SVG, slightly smaller

### Change hero headline
→ `components/sections/Hero.tsx` — EN/AR H1 near top of component

### Change services (cards)
→ `components/sections/Services.tsx` — `SERVICES` array (icon, titleEn/Ar, descEn/Ar, ctaEn/Ar, href)

### Change nav links
→ `components/ui/Navbar.tsx` — `NAV_LINKS` array

### Change FAQ questions
→ `components/sections/ContactForm.tsx` — `FAQ_ITEMS` array

### Change site URL (production)
→ `app/layout.tsx` line ~21: `const SITE_URL = 'https://startsmartqa.com'`

### Update service page content
→ `app/services/<service>/page.tsx` for EN
→ `app/ar/services/<service>/page.tsx` for AR

### Activate Google Reviews
→ Set `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`, `NEXT_PUBLIC_GOOGLE_REVIEW_URL` in `.env.local`
→ Testimonials section shows automatically

---

## Bilingual System

Every section component accepts `lang?: 'en' | 'ar'` prop.
- EN pages (`/`, `/blog`, `/services/*`) pass no prop → defaults to `'en'`
- AR pages (`/ar`, `/ar/blog`, `/ar/services/*`) pass `lang="ar"`
- `dir="rtl"` applied per section when AR
- Arabic font (Cairo) activates via CSS on elements with `fontFamily: var(--font-cairo)`

---

## Theme System

- Dark mode (default): yellow accent `#FFD600`
- Light mode: red accent `#E63030`
- Toggle button in Navbar (sun/moon icons)
- Persisted in `localStorage`
- FOUC prevention: inline script in `<head>` sets `data-theme` before paint
- ThemeProvider in `lib/theme.tsx` wraps the app

---

## SEO Architecture

| Schema | Location |
|--------|----------|
| `LocalBusiness` + `AggregateRating` | `app/layout.tsx` |
| `Service` (per service page) | each `app/services/*/page.tsx` |
| `ItemList` (service cards) | `components/sections/Services.tsx` |
| `FAQPage` | `components/sections/ContactForm.tsx` |

- Sitemap: `app/sitemap.ts` — includes homepage, service pages, blog posts from Sanity
- Canonical + hreflang alternates on all pages
- GSC verification: `NEXT_PUBLIC_GSC_VERIFICATION` env var → metadata in `layout.tsx`

---

## Form → API Flow

1. User fills `ContactForm` → submits
2. POST to `/api/contact`
3. Route saves to Sanity as a `lead` document
4. On success: shows `SuccessBanner`
5. On error: shows inline error with WhatsApp fallback

---

## Known Placeholders

- Phone number: needs real number in `.env.local`
- Google Maps: needs `NEXT_PUBLIC_GOOGLE_MAPS_EMBED`
- Facebook URL: hardcoded `https://www.facebook.com/startsmartqa` in `layout.tsx`
- Google Business URL: hardcoded `https://g.co/kgs/startsmartqa` in `Footer.tsx`
- Reviews: empty state shown until GBP + API keys configured
