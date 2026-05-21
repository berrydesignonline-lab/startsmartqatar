# Domain Update & 12-Month Battery Warranty Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the site domain from `startsmartqa.com` to `startsmartqatar.com` across 16 files, and add a 12-month replacement warranty section to the battery replacement service page (EN + AR) with a warranty badge, conditions list, and updated JSON-LD schema.

**Architecture:** Domain change is a global string replace across all `SITE_URL` constants. Warranty is data-driven — a new optional `warranty` field added to `ServiceTranslation` in `services-data.ts`, rendered conditionally in `ServicePageTemplate` between the hero and benefits sections. Only `batteryReplacementData` carries warranty data; jump-start and electrical-repair do not.

**Tech Stack:** Next.js 16 App Router, TypeScript, inline styles + CSS variables, Schema.org JSON-LD, Sanity (no changes needed)

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| MODIFY | `lib/services-data.ts` | Add `warranty?` field to `ServiceTranslation`, add warranty data to `batteryReplacementData` |
| MODIFY | `components/templates/ServicePageTemplate.tsx` | Render warranty section + add warranty to Service JSON-LD |
| REPLACE all | 16 files (see list below) | `startsmartqa.com` → `startsmartqatar.com` |
| MODIFY | `PROJECT.md` | Update domain reference |
| MODIFY | `.env.local` | Update `NEXT_PUBLIC_SITE_URL` if set |

**16 files with domain string:**
1. `app/layout.tsx`
2. `app/sitemap.ts`
3. `app/robots.ts` (via MetadataRoute — sitemap URL)
4. `app/opengraph-image.tsx`
5. `app/ar/page.tsx`
6. `app/ar/blog/page.tsx`
7. `app/ar/blog/[slug]/page.tsx`
8. `app/blog/[slug]/page.tsx`
9. `app/services/battery-replacement/page.tsx`
10. `app/services/jump-start/page.tsx`
11. `app/services/electrical-repair/page.tsx`
12. `app/ar/services/battery-replacement/page.tsx`
13. `app/ar/services/jump-start/page.tsx`
14. `app/ar/services/electrical-repair/page.tsx`
15. `components/templates/ServicePageTemplate.tsx`
16. `components/sections/Testimonials.tsx`

---

## Task 1: Global Domain Replace

**Files:** All 16 listed above

- [ ] **Step 1: Run sed replace across all files**

```bash
cd /home/ubuntu/projects/startsmartqatar
find app components lib -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/startsmartqa\.com/startsmartqatar.com/g'
```

- [ ] **Step 2: Verify — no old domain remains**

```bash
grep -r "startsmartqa\.com" app/ components/ lib/ --include="*.tsx" --include="*.ts"
```

Expected: no output. If any file still shows the old domain, fix it manually.

- [ ] **Step 3: Verify build still passes**

```bash
npm run build 2>&1 | grep -E "(error|Error|✓)" | head -10
```

Expected: `✓ Compiled successfully`

- [ ] **Step 4: Update PROJECT.md domain reference**

In `PROJECT.md` line 8, change:
```
- Website: `https://startsmartqa.com`
```
to:
```
- Website: `https://startsmartqatar.com`
```

- [ ] **Step 5: Update .env.local**

In `.env.local`, if `NEXT_PUBLIC_SITE_URL` is set, change its value to `https://startsmartqatar.com`. (Currently the file has no `NEXT_PUBLIC_SITE_URL` line — skip this step if absent.)

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "fix: update domain from startsmartqa.com to startsmartqatar.com across all files"
```

---

## Task 2: Add Warranty Fields to `lib/services-data.ts`

**Files:**
- Modify: `lib/services-data.ts`

- [ ] **Step 1: Add `WarrantyData` interface and `warranty` field to `ServiceTranslation`**

Open `lib/services-data.ts`. After the closing `}` of `ServiceTranslation`, add the new interface. Then add `warranty?` as the last field of `ServiceTranslation`:

```ts
export interface WarrantyData {
  title: string;
  months: number;
  description: string;
  conditions: string[];
  badge: string;
}

export interface ServiceTranslation {
  // ... all existing fields remain unchanged ...
  metaTitle: string;
  metaDescription: string;
  badge: string;
  h1: string;
  h1Accent: string;
  description: string;
  whatsappText: string;
  ctaLabel: string;
  cardIcon: string;
  cardTitle: string;
  cardDesc: string;
  benefitsHeading: string;
  benefits: { icon: string; title: string; desc: string }[];
  areasHeading: string;
  areasNote: string;
  faqHeading: string;
  faq: { q: string; a: string }[];
  relatedHeading: string;
  warranty?: WarrantyData;   // ← ADD THIS LINE
}
```

- [ ] **Step 2: Add warranty data to `batteryReplacementData`**

Inside `batteryReplacementData.en`, after `relatedHeading: 'Other Services',`, add:

```ts
    warranty: {
      title: '12-Month Battery Warranty',
      months: 12,
      badge: '🛡️ 12-Month Warranty Included',
      description: 'Every battery we install comes with a 12-month replacement warranty. If your battery fails due to a manufacturing defect within 12 months, we replace it free — parts and labour included. No questions asked.',
      conditions: [
        'Covers manufacturing defects and premature failure',
        'Free replacement — parts and labour included',
        'We come to your location for the replacement',
        'Valid for 12 months from installation date',
        'Does not cover physical damage or misuse',
      ],
    },
```

Inside `batteryReplacementData.ar`, after `relatedHeading: 'خدمات أخرى',`, add:

```ts
    warranty: {
      title: 'ضمان البطارية 12 شهراً',
      months: 12,
      badge: '🛡️ ضمان 12 شهراً مشمول',
      description: 'كل بطارية نركبها تأتي مع ضمان استبدال لمدة 12 شهراً. إذا توقفت بطاريتك بسبب عيب في الصنع خلال 12 شهراً، نستبدلها مجاناً — يشمل القطع والعمالة. بدون أي تعقيدات.',
      conditions: [
        'يغطي عيوب الصنع والأعطال المبكرة',
        'استبدال مجاني — يشمل القطع والعمالة',
        'نجي عندك في موقعك للاستبدال',
        'صالح لمدة 12 شهراً من تاريخ التركيب',
        'لا يغطي الأضرار الجسدية أو سوء الاستخدام',
      ],
    },
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /home/ubuntu/projects/startsmartqatar && npx tsc --noEmit 2>&1 | head -20
```

Expected: no output (no errors).

- [ ] **Step 4: Commit**

```bash
git add lib/services-data.ts
git commit -m "feat: add 12-month warranty data to battery replacement service"
```

---

## Task 3: Render Warranty Section in `ServicePageTemplate.tsx`

**Files:**
- Modify: `components/templates/ServicePageTemplate.tsx`

The warranty section renders between the Hero and Benefits sections. It only appears when `data.en.warranty` (or `data.ar.warranty`) is defined — so jump-start and electrical-repair pages are unaffected.

- [ ] **Step 1: Add the warranty section between Hero and Benefits**

In `components/templates/ServicePageTemplate.tsx`, find the Benefits section comment `{/* ── Benefits ── */}` and insert the following block immediately before it:

```tsx
        {/* ── Warranty ── */}
        {t.warranty && (
          <section style={{
            maxWidth: '860px', margin: '0 auto', padding: '0 1.5rem 2rem',
          }}>
            <div style={{
              border: '2px solid var(--c-accent)',
              borderRadius: '1rem',
              padding: 'clamp(1.25rem, 4vw, 2rem)',
              backgroundColor: 'rgba(var(--c-accent-rgb), 0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '2rem', lineHeight: 1 }}>🛡️</span>
                <div>
                  <h2 style={{
                    margin: 0,
                    fontWeight: 800,
                    fontSize: 'clamp(1.25rem, 3vw, 1.625rem)',
                    color: 'var(--c-accent)',
                    lineHeight: 1.15,
                  }}>
                    {t.warranty.title}
                  </h2>
                  <p style={{ margin: '0.25rem 0 0', color: 'var(--c-muted)', fontSize: '0.875rem' }}>
                    {t.warranty.months} {ar ? 'شهراً من تاريخ التركيب' : 'months from installation date'}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p style={{
                margin: 0,
                color: 'var(--c-text)',
                lineHeight: 1.7,
                fontSize: '0.9375rem',
              }}>
                {t.warranty.description}
              </p>

              {/* Conditions */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {t.warranty.conditions.map((c) => (
                  <li key={c} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', fontSize: '0.9375rem', color: 'var(--c-text)' }}>
                    <span style={{ color: 'var(--c-accent)', fontWeight: 700, flexShrink: 0, marginTop: '0.1rem' }}>✓</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
```

- [ ] **Step 2: Add warranty to the Service JSON-LD schema**

In the same file, find the `serviceSchema` object and add a `hasWarrantyScope` property conditionally:

```tsx
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${t.h1} ${t.h1Accent}`,
    description: t.metaDescription,
    provider: { '@type': 'LocalBusiness', name: 'StartSmart Qatar', url: SITE_URL },
    areaServed: { '@type': 'Country', name: 'Qatar' },
    url: pageUrl,
    ...(t.warranty && {
      hasWarrantyScope: {
        '@type': 'WarrantyScope',
        name: t.warranty.title,
        durationOfWarranty: {
          '@type': 'QuantitativeValue',
          value: t.warranty.months,
          unitCode: 'MON',
        },
      },
    }),
  };
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /home/ubuntu/projects/startsmartqatar && npx tsc --noEmit 2>&1 | head -20
```

Expected: no output.

- [ ] **Step 4: Run build**

```bash
npm run build 2>&1 | grep -E "(error|Error|✓)" | head -10
```

Expected: `✓ Compiled successfully`

- [ ] **Step 5: Commit**

```bash
git add components/templates/ServicePageTemplate.tsx
git commit -m "feat: add 12-month warranty section to battery replacement page with schema markup"
```

---

## Task 4: Final Verification

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Check battery replacement pages**

Open `http://localhost:3001/services/battery-replacement` — verify:
- Yellow bordered warranty box appears between hero CTA and "Why Choose StartSmart?" section
- Shield emoji, "12-Month Battery Warranty" title in accent colour
- 5 condition checkmarks listed
- Box background is subtle yellow tint (not white, not solid yellow)

Open `http://localhost:3001/ar/services/battery-replacement` — verify:
- Same box appears in Arabic, RTL layout
- Title: "ضمان البطارية 12 شهراً"
- All 5 Arabic conditions visible

- [ ] **Step 3: Verify warranty does NOT appear on other pages**

Open `http://localhost:3001/services/jump-start` — warranty section must be absent.
Open `http://localhost:3001/services/electrical-repair` — warranty section must be absent.

- [ ] **Step 4: Check JSON-LD in page source**

View source on `/services/battery-replacement`. Search for `WarrantyScope`. Should see:

```json
"hasWarrantyScope": {
  "@type": "WarrantyScope",
  "name": "12-Month Battery Warranty",
  "durationOfWarranty": {
    "@type": "QuantitativeValue",
    "value": 12,
    "unitCode": "MON"
  }
}
```

- [ ] **Step 5: Verify domain is correct everywhere**

```bash
grep -r "startsmartqa\.com" app/ components/ lib/ --include="*.tsx" --include="*.ts"
```

Expected: no output.

- [ ] **Step 6: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: warranty section adjustments from verification"
```
