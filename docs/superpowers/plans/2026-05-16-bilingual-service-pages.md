# Bilingual Service Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace 6 thin, inconsistent service pages with 6 full SEO-optimised pages (EN + AR) driven by a shared template and a single content file.

**Architecture:** One `ServicePageTemplate` component reads a `ServiceData` object plus a `lang` prop. Each of the 6 page files becomes a thin wrapper that exports `metadata` and renders the template. All three JSON-LD blocks (Service, BreadcrumbList, FAQPage) are injected by the template automatically.

**Tech Stack:** Next.js 16 App Router, TypeScript, inline styles + scoped `<style>` tags, Google Fonts (Inter + Cairo), Schema.org JSON-LD

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| CREATE | `lib/services-data.ts` | All EN + AR content for 3 services |
| CREATE | `components/templates/ServicePageTemplate.tsx` | Full page renderer |
| REPLACE | `app/services/battery-replacement/page.tsx` | Thin EN wrapper |
| REPLACE | `app/services/jump-start/page.tsx` | Thin EN wrapper |
| REPLACE | `app/services/electrical-repair/page.tsx` | Thin EN wrapper |
| REPLACE | `app/ar/services/battery-replacement/page.tsx` | Thin AR wrapper |
| REPLACE | `app/ar/services/jump-start/page.tsx` | Thin AR wrapper |
| REPLACE | `app/ar/services/electrical-repair/page.tsx` | Thin AR wrapper |

---

## Task 1: Create `lib/services-data.ts`

**Files:**
- Create: `lib/services-data.ts`

- [ ] **Step 1: Create the file with complete content**

Create `/home/ubuntu/projects/startsmartqatar/lib/services-data.ts` with this exact content:

```ts
export interface ServiceTranslation {
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
}

export interface ServiceData {
  slug: 'battery-replacement' | 'jump-start' | 'electrical-repair';
  en: ServiceTranslation;
  ar: ServiceTranslation;
}

export const batteryReplacementData: ServiceData = {
  slug: 'battery-replacement',
  en: {
    metaTitle: 'Car Battery Replacement Qatar — We Come to You in 30 Min',
    metaDescription: 'On-site car battery replacement anywhere in Qatar. Certified technician arrives in 30 minutes. All car brands. Pay after service. Available 24/7.',
    badge: '⚡ Available 24/7 across Qatar',
    h1: 'Car Battery Replacement',
    h1Accent: 'Qatar',
    description: 'Dead battery? Our certified technician arrives at your location — home, office, or roadside — in 30 minutes or less. All car brands. Pay after service.',
    whatsappText: 'Hi, I need battery replacement',
    ctaLabel: 'Order Battery Replacement',
    cardIcon: '🔋',
    cardTitle: 'Battery Replacement',
    cardDesc: 'New battery delivered and fitted at your location in 30 min.',
    benefitsHeading: 'Why Choose StartSmart?',
    benefits: [
      { icon: '⚡', title: '30-minute arrival', desc: 'We come to you anywhere in Qatar — Doha, Lusail, Al Rayyan, Al Wakrah, Al Khor.' },
      { icon: '🔋', title: 'All battery brands', desc: 'We carry batteries for all car brands and models. German, Japanese, American, Korean.' },
      { icon: '💳', title: 'Pay after service', desc: 'You only pay once the job is done and you are satisfied.' },
      { icon: '🔧', title: 'Free charging system check', desc: 'Every replacement includes a free alternator and charging system inspection.' },
      { icon: '🌙', title: '24/7 availability', desc: 'Day or night, weekday or weekend — we are always available.' },
    ],
    areasHeading: 'Battery Replacement — All Qatar',
    areasNote: 'From West Bay to Al Wakra — we come to you anywhere in Qatar.',
    faqHeading: 'Common Questions',
    faq: [
      { q: 'How fast do you arrive?', a: 'Our technician arrives in 30 minutes or less anywhere in Qatar — Doha, Lusail, Al Rayyan, Al Wakrah, and beyond.' },
      { q: 'Which battery brands do you carry?', a: 'We stock all major brands — Varta, Bosch, Amaron, Exide, AC Delco, and more. We match the right battery to your car model.' },
      { q: 'Do you test the alternator after replacing the battery?', a: 'Yes. Every battery replacement includes a free charging system inspection to make sure your new battery charges correctly.' },
      { q: 'How much does battery replacement cost?', a: 'Price depends on your car model and battery type. We give you the exact price before starting. Pay only after the job is done.' },
    ],
    relatedHeading: 'Other Services',
  },
  ar: {
    metaTitle: 'تبديل بطارية السيارة قطر — نصل إليك في 30 دقيقة',
    metaDescription: 'خدمة تبديل بطارية السيارة في موقعك في قطر. فني متخصص يصل خلال 30 دقيقة. جميع أنواع السيارات. ادفع بعد الخدمة. متاح 24/7.',
    badge: '⚡ متاح 24/7 في كل قطر',
    h1: 'تبديل بطارية السيارة',
    h1Accent: 'قطر',
    description: 'بطاريتك وقفت؟ فنينا يجي عندك في البيت أو الشغل أو الطريق خلال 30 دقيقة. جميع أنواع السيارات. ادفع بعد الخدمة.',
    whatsappText: 'مرحبا، أحتاج تبديل بطارية',
    ctaLabel: 'اطلب تبديل البطارية الآن',
    cardIcon: '🔋',
    cardTitle: 'تبديل البطارية',
    cardDesc: 'بطارية جديدة تُوصّل وتُركّب في موقعك خلال 30 دقيقة.',
    benefitsHeading: 'ليش تختار ستارت سمارت؟',
    benefits: [
      { icon: '⚡', title: 'نصل في 30 دقيقة', desc: 'نجي عندك في أي مكان في قطر — الدوحة، لوسيل، الريان، الوكرة، الخور.' },
      { icon: '🔋', title: 'جميع أنواع البطاريات', desc: 'عندنا بطاريات لجميع أنواع وموديلات السيارات. ألمانية، يابانية، أمريكية، كورية.' },
      { icon: '💳', title: 'الدفع بعد الخدمة', desc: 'تدفع بس لما تكون راضي عن الخدمة.' },
      { icon: '🔧', title: 'فحص نظام الشحن مجاناً', desc: 'كل تبديل بطارية يشمل فحص الدينامو ونظام الشحن بالمجان.' },
      { icon: '🌙', title: 'متاح 24/7', desc: 'نهاراً أو ليلاً، أيام الأسبوع أو العطل — دائماً متاحين.' },
    ],
    areasHeading: 'تبديل البطارية — كل قطر',
    areasNote: 'من ويست باي إلى الوكرة — نجي عندك في أي مكان في قطر.',
    faqHeading: 'أسئلة شائعة',
    faq: [
      { q: 'كم يستغرق الوصول إليك؟', a: 'فنينا يصل في 30 دقيقة أو أقل في أي مكان بقطر — الدوحة، لوسيل، الريان، الوكرة، وغيرها.' },
      { q: 'ما أنواع البطاريات التي تحملونها؟', a: 'نحمل جميع الماركات الرئيسية — فارتا، بوش، أمارون، إكسايد، وغيرها. نختار البطارية المناسبة لسيارتك.' },
      { q: 'هل تفحصون الدينامو بعد تبديل البطارية؟', a: 'نعم. كل تبديل بطارية يشمل فحص نظام الشحن مجاناً للتأكد من أن البطارية الجديدة تشحن بشكل صحيح.' },
      { q: 'كم تبلغ تكلفة تبديل البطارية؟', a: 'السعر يعتمد على نوع سيارتك والبطارية المناسبة. نخبرك بالسعر قبل البدء. تدفع بعد انتهاء العمل فقط.' },
    ],
    relatedHeading: 'خدمات أخرى',
  },
};

export const jumpStartData: ServiceData = {
  slug: 'jump-start',
  en: {
    metaTitle: 'Emergency Jump Start Service Qatar — 30 Min Response',
    metaDescription: '24/7 emergency jump start service anywhere in Qatar. Technician arrives in 30 minutes. All car types. Pay after service.',
    badge: '⚡ 24/7 Emergency Service',
    h1: 'Jump Start Service',
    h1Accent: 'Qatar',
    description: "Car won't start? Our technician comes to you in 30 minutes with professional jump start equipment. If the battery is dead, we replace it on the spot.",
    whatsappText: 'Hi, I need a jump start',
    ctaLabel: 'Request Jump Start Now',
    cardIcon: '⚡',
    cardTitle: 'Jump Start',
    cardDesc: 'Emergency jump start anywhere in Qatar — 30 min response, 24/7.',
    benefitsHeading: 'How It Works',
    benefits: [
      { icon: '1️⃣', title: 'Contact us on WhatsApp', desc: 'Send your location on WhatsApp — takes 30 seconds.' },
      { icon: '2️⃣', title: 'Technician dispatched', desc: 'We dispatch the nearest technician immediately.' },
      { icon: '3️⃣', title: 'Arrive in 30 minutes', desc: 'Your car is running again — or we replace the battery on the spot.' },
      { icon: '4️⃣', title: 'Pay after service', desc: 'Only pay once you are satisfied with the service.' },
      { icon: '🌙', title: 'Available 24/7', desc: 'Day or night, weekday or weekend — we are always on call.' },
    ],
    areasHeading: 'Jump Start Coverage — All Qatar',
    areasNote: 'Stranded anywhere in Qatar? We come to you — day or night.',
    faqHeading: 'Common Questions',
    faq: [
      { q: 'What if my battery is dead after the jump start?', a: "If your battery doesn't hold a charge, we carry replacement batteries and can swap it on the spot — no second visit needed." },
      { q: 'Do you provide jump start service at night?', a: 'Yes. We operate 24/7, including nights, weekends, and public holidays. Call us any time.' },
      { q: 'How do I request a jump start?', a: 'Send your location on WhatsApp. We dispatch the nearest technician and arrive in 30 minutes.' },
      { q: 'Is jump start available outside Doha?', a: 'Yes — we cover all Qatar: Lusail, Al Rayyan, Al Wakrah, Al Khor, Mesaieed, and more.' },
    ],
    relatedHeading: 'Other Services',
  },
  ar: {
    metaTitle: 'بوسطة سيارة قطر — خدمة طوارئ 24/7',
    metaDescription: 'خدمة بوسطة سيارة طارئة في قطر. فني يصل خلال 30 دقيقة. متاح 24 ساعة 7 أيام. ادفع بعد الخدمة.',
    badge: '⚡ خدمة طوارئ 24/7',
    h1: 'بوسطة سيارة',
    h1Accent: 'قطر',
    description: 'سيارتك ما تشتغل؟ فنينا يجي عندك خلال 30 دقيقة بمعدات بوسطة احترافية. إذا البطارية ميتة نبدلها في نفس المكان.',
    whatsappText: 'مرحبا، أحتاج بوسطة سيارة',
    ctaLabel: 'اطلب بوسطة الآن',
    cardIcon: '⚡',
    cardTitle: 'بوسطة سيارة',
    cardDesc: 'بوسطة طارئة في أي مكان بقطر — 30 دقيقة، 24/7.',
    benefitsHeading: 'كيف تطلب الخدمة',
    benefits: [
      { icon: '1️⃣', title: 'تواصل معنا عبر واتساب', desc: 'أرسل موقعك على واتساب — يأخذ 30 ثانية.' },
      { icon: '2️⃣', title: 'إرسال الفني', desc: 'نرسل أقرب فني فورًا.' },
      { icon: '3️⃣', title: 'يصل في 30 دقيقة', desc: 'سيارتك تشتغل — أو نبدل البطارية في نفس المكان.' },
      { icon: '4️⃣', title: 'الدفع بعد الخدمة', desc: 'تدفع بس لما تكون راضي عن الخدمة.' },
      { icon: '🌙', title: 'متاح 24/7', desc: 'نهاراً أو ليلاً، أيام الأسبوع أو العطل — دائماً متاحين.' },
    ],
    areasHeading: 'بوسطة سيارة — كل قطر',
    areasNote: 'واقف في أي مكان بقطر؟ نجي عندك — نهاراً أو ليلاً.',
    faqHeading: 'أسئلة شائعة',
    faq: [
      { q: 'ماذا لو كانت البطارية ميتة بعد البوسطة؟', a: 'إذا البطارية ما تشحن، عندنا بطاريات بديلة ونبدلها في نفس المكان — بدون زيارة ثانية.' },
      { q: 'هل تقدمون خدمة البوسطة في الليل؟', a: 'نعم. نعمل 24/7 بما في ذلك الليل وعطل نهاية الأسبوع والأعياد.' },
      { q: 'كيف أطلب البوسطة؟', a: 'أرسل موقعك على واتساب. نرسل أقرب فني ويصل في 30 دقيقة.' },
      { q: 'هل تغطون المناطق خارج الدوحة؟', a: 'نعم — نغطي كل قطر: لوسيل، الريان، الوكرة، الخور، مسيعيد، وأكثر.' },
    ],
    relatedHeading: 'خدمات أخرى',
  },
};

export const electricalRepairData: ServiceData = {
  slug: 'electrical-repair',
  en: {
    metaTitle: 'Mobile Car Electrical Repair Qatar — On-Site Diagnosis',
    metaDescription: 'Mobile car electrical repair and diagnosis anywhere in Qatar. Alternator, fuses, wiring, sensors. Technician arrives in 30 minutes. 24/7.',
    badge: '🔧 Mobile Electrical Service',
    h1: 'Car Electrical Repair',
    h1Accent: 'Qatar',
    description: 'Electrical fault? Warning light on? We diagnose and repair on-site. Alternator, fuses, wiring, sensors, and more. We come to you in 30 minutes.',
    whatsappText: 'Hi, I need electrical repair',
    ctaLabel: 'Request Electrical Repair',
    cardIcon: '🔧',
    cardTitle: 'Electrical Repair',
    cardDesc: 'On-site electrical diagnosis and repair — alternator, fuses, wiring, sensors.',
    benefitsHeading: 'What We Fix',
    benefits: [
      { icon: '⚡', title: 'Alternator failure', desc: 'Diagnosis and replacement of faulty alternators on-site at your location.' },
      { icon: '🔌', title: 'Fuses & wiring', desc: 'Blown fuses, damaged wiring, short circuits — we trace and fix the fault.' },
      { icon: '💡', title: 'Warning lights', desc: 'We read fault codes and diagnose the root cause of any dashboard warning light.' },
      { icon: '⚙️', title: 'Starter motor', desc: "Starter motor diagnosis and replacement. Car cranks but won't start? We fix it." },
      { icon: '🌡️', title: 'Sensors & ECU', desc: 'Faulty sensors, ECU issues, AC electrical faults, and other electronics diagnosed on-site.' },
    ],
    areasHeading: 'Electrical Repair Coverage — All Qatar',
    areasNote: 'Electrical fault anywhere in Qatar? We come to you — no need to tow.',
    faqHeading: 'Common Questions',
    faq: [
      { q: 'What types of electrical faults do you fix?', a: 'Alternator failure, blown fuses, faulty wiring, warning lights, starter motor, ECU sensors, AC electrical faults, and more.' },
      { q: 'Do you bring spare parts?', a: 'We carry common parts. For specific components, we diagnose first and source the exact part — usually same day.' },
      { q: 'How long does an electrical repair take?', a: 'Simple faults like fuses take 15–30 minutes. Alternator replacement or wiring issues take 1–2 hours depending on the fault.' },
      { q: 'Do you offer a warranty on electrical repairs?', a: "Yes — all parts and labour come with a warranty. We'll return if the same fault reappears." },
    ],
    relatedHeading: 'Other Services',
  },
  ar: {
    metaTitle: 'إصلاح كهرباء السيارة قطر — خدمة متنقلة',
    metaDescription: 'إصلاح وتشخيص كهرباء السيارة في موقعك بقطر. دينامو، فيوزات، أسلاك، حساسات. فني يصل في 30 دقيقة. متاح 24/7.',
    badge: '🔧 خدمة كهرباء متنقلة',
    h1: 'إصلاح كهرباء السيارة',
    h1Accent: 'قطر',
    description: 'عندك عطل كهربائي؟ نشخص ونصلح في موقعك. دينامو، فيوزات، أسلاك، حساسات، وأكثر. نجي عندك في 30 دقيقة.',
    whatsappText: 'مرحبا، أحتاج إصلاح كهرباء سيارة',
    ctaLabel: 'اطلب إصلاح الكهرباء',
    cardIcon: '🔧',
    cardTitle: 'إصلاح الكهرباء',
    cardDesc: 'تشخيص وإصلاح كهرباء السيارة في موقعك — دينامو، فيوزات، أسلاك، حساسات.',
    benefitsHeading: 'ماذا نصلح',
    benefits: [
      { icon: '⚡', title: 'عطل الدينامو', desc: 'تشخيص واستبدال الدينامو المعطوب في موقعك.' },
      { icon: '🔌', title: 'الفيوزات والأسلاك', desc: 'فيوزات محترقة، أسلاك تالفة، دوائر قصر — نتتبع العطل ونصلحه.' },
      { icon: '💡', title: 'أضواء التحذير', desc: 'نقرأ أكواد الأخطاء ونشخص سبب أي ضوء تحذير في لوحة القيادة.' },
      { icon: '⚙️', title: 'موتور البادئ', desc: 'تشخيص واستبدال موتور البادئ. السيارة تدور بس ما تشتغل؟ نصلحها.' },
      { icon: '🌡️', title: 'الحساسات والـ ECU', desc: 'حساسات معطوبة، مشاكل ECU، أعطال كهرباء المكيف، وغيرها نشخصها في موقعك.' },
    ],
    areasHeading: 'إصلاح الكهرباء — كل قطر',
    areasNote: 'عطل كهربائي في أي مكان بقطر؟ نجي عندك — بدون سحب.',
    faqHeading: 'أسئلة شائعة',
    faq: [
      { q: 'ما أنواع الأعطال الكهربائية التي تصلحونها؟', a: 'عطل الدينامو، الفيوزات المحترقة، الأسلاك المعطوبة، أضواء التحذير، موتور البادئ، حساسات ECU، أعطال كهرباء المكيف، وأكثر.' },
      { q: 'هل تحضرون قطع الغيار؟', a: 'نحمل القطع الشائعة. للقطع الخاصة، نشخص أولاً ونحضر القطعة المناسبة — عادةً في نفس اليوم.' },
      { q: 'كم يستغرق إصلاح الكهرباء؟', a: 'الأعطال البسيطة مثل الفيوزات تأخذ 15-30 دقيقة. استبدال الدينامو أو مشاكل الأسلاك تأخذ 1-2 ساعة حسب العطل.' },
      { q: 'هل تقدمون ضمان على الإصلاح؟', a: 'نعم — جميع القطع والعمالة مضمونة. نرجع إذا ظهر نفس العطل مرة أخرى.' },
    ],
    relatedHeading: 'خدمات أخرى',
  },
};

export const ALL_SERVICES: ServiceData[] = [
  batteryReplacementData,
  jumpStartData,
  electricalRepairData,
];
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/ubuntu/projects/startsmartqatar && npx tsc --noEmit 2>&1 | head -20
```

Expected: no output (no errors). If errors appear, fix them before continuing.

- [ ] **Step 3: Commit**

```bash
git add lib/services-data.ts
git commit -m "feat: add bilingual service content data for all 3 services"
```

---

## Task 2: Create `components/templates/ServicePageTemplate.tsx`

**Files:**
- Create: `components/templates/ServicePageTemplate.tsx`

- [ ] **Step 1: Create the templates directory and component file**

```bash
mkdir -p /home/ubuntu/projects/startsmartqatar/components/templates
```

Then create `components/templates/ServicePageTemplate.tsx` with this exact content:

```tsx
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';
import { type ServiceData, ALL_SERVICES } from '@/lib/services-data';

const SITE_URL = 'https://startsmartqa.com';

const AREAS_EN = [
  'West Bay', 'The Pearl', 'Lusail', 'Al Rayyan',
  'Madinat Khalifa', 'Al Wakrah', 'Al Duhail', 'Al Khor',
  'Muaither', 'Old Airport', 'Industrial Area', 'All Qatar ✓',
];

const AREAS_AR = [
  'ويست باي', 'اللؤلؤة', 'لوسيل', 'الريان',
  'مدينة خليفة', 'الوكرة', 'الدحيل', 'الخور',
  'مويثر', 'المطار القديم', 'المنطقة الصناعية', 'كل قطر ✓',
];

interface Props {
  data: ServiceData;
  lang: 'en' | 'ar';
}

export default function ServicePageTemplate({ data, lang }: Props) {
  const ar = lang === 'ar';
  const t = ar ? data.ar : data.en;
  const areas = ar ? AREAS_AR : AREAS_EN;
  const related = ALL_SERVICES.filter((s) => s.slug !== data.slug);

  const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsappText)}`;
  const pageUrl = `${SITE_URL}${ar ? '/ar' : ''}/services/${data.slug}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${t.h1} ${t.h1Accent}`,
    description: t.metaDescription,
    provider: { '@type': 'LocalBusiness', name: 'StartSmart Qatar', url: SITE_URL },
    areaServed: { '@type': 'Country', name: 'Qatar' },
    url: pageUrl,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: ar ? 'الرئيسية' : 'Home',
        item: ar ? `${SITE_URL}/ar` : SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${t.h1} ${t.h1Accent}`,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main
        dir={ar ? 'rtl' : 'ltr'}
        lang={lang}
        style={{
          backgroundColor: 'var(--c-bg)',
          color: 'var(--c-text)',
          paddingTop: '80px',
          minHeight: '100vh',
          fontFamily: ar ? 'var(--font-cairo), sans-serif' : 'var(--font-inter), sans-serif',
        }}
      >
        {/* ── Breadcrumb ── */}
        <nav
          aria-label={ar ? 'مسار التنقل' : 'Breadcrumb'}
          style={{ maxWidth: '860px', margin: '0 auto', padding: '1rem 1.5rem 0', fontSize: '0.875rem' }}
        >
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <li>
              <a href={ar ? '/ar' : '/'} style={{ color: 'var(--c-muted)', textDecoration: 'none' }}>
                {ar ? 'الرئيسية' : 'Home'}
              </a>
            </li>
            <li aria-hidden="true" style={{ color: 'var(--c-border)', padding: '0 0.125rem' }}>
              {ar ? '←' : '→'}
            </li>
            <li style={{ color: 'var(--c-text)', fontWeight: 500 }}>
              {t.h1} <span style={{ color: 'var(--c-accent)' }}>{t.h1Accent}</span>
            </li>
          </ol>
        </nav>

        {/* ── Hero ── */}
        <section style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 1.5rem 2rem', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
            border: '1px solid rgba(var(--c-accent-rgb),0.35)', borderRadius: '9999px',
            padding: '0.3rem 0.875rem', fontSize: '0.8125rem', fontWeight: 600,
            color: 'var(--c-accent)', backgroundColor: 'rgba(var(--c-accent-rgb),0.06)',
            marginBottom: '1.25rem',
          }}>
            {t.badge}
          </div>
          <h1 style={{
            fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.1,
            marginBottom: '1rem',
            color: 'var(--c-text)',
          }}>
            {t.h1} <span style={{ color: 'var(--c-accent)' }}>{t.h1Accent}</span>
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
            color: 'var(--c-muted)',
            lineHeight: 1.75,
            maxWidth: '600px',
            margin: '0 auto 2rem',
          }}>
            {t.description}
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="svc-cta-btn"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.5rem', backgroundColor: '#25D366', color: '#fff',
              fontWeight: 700, fontSize: '1.125rem', padding: '1rem 2rem',
              borderRadius: '0.625rem', textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(37,211,102,0.25)',
            }}
          >
            <WhatsAppIcon />
            {t.ctaLabel}
          </a>
        </section>

        {/* ── Benefits ── */}
        <section style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <h2 style={{
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
            marginBottom: '1.5rem',
            color: 'var(--c-text)',
          }}>
            {t.benefitsHeading}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {t.benefits.map((b) => (
              <li key={b.title} style={{
                display: 'flex', gap: '1rem', padding: '1.25rem',
                backgroundColor: 'var(--c-surface)', borderRadius: '0.75rem',
                border: '1px solid var(--c-border)',
              }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0, lineHeight: 1.2 }}>{b.icon}</span>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--c-text)', fontSize: '1rem' }}>
                    {b.title}
                  </strong>
                  <span style={{ color: 'var(--c-muted)', fontSize: '0.9375rem', lineHeight: 1.55 }}>
                    {b.desc}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Coverage Areas ── */}
        <section style={{ backgroundColor: 'var(--c-surface)', padding: '3rem 1.5rem', marginTop: '1rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{
              fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
              marginBottom: '0.75rem',
              color: 'var(--c-text)',
              textAlign: 'center',
            }}>
              {t.areasHeading}
            </h2>
            <p style={{ color: 'var(--c-muted)', textAlign: 'center', marginBottom: '1.75rem', lineHeight: 1.65 }}>
              {t.areasNote}
            </p>
            <ul
              className="svc-areas-grid"
              style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}
            >
              {areas.map((area, i) => (
                <li key={area} style={{
                  padding: '0.625rem 1rem', textAlign: 'center',
                  backgroundColor: i === areas.length - 1 ? 'rgba(var(--c-accent-rgb),0.08)' : 'var(--c-bg)',
                  border: `1px solid ${i === areas.length - 1 ? 'var(--c-accent)' : 'var(--c-border)'}`,
                  borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 500,
                  color: 'var(--c-text)',
                }}>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          <h2 style={{
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
            marginBottom: '1.5rem',
            color: 'var(--c-text)',
          }}>
            {t.faqHeading}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {t.faq.map(({ q, a }) => (
              <div key={q} style={{
                backgroundColor: 'var(--c-surface)', border: '1px solid var(--c-border)',
                borderRadius: '0.75rem', padding: '1.25rem 1.5rem',
              }}>
                <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--c-text)', margin: '0 0 0.5rem' }}>
                  <span style={{
                    color: 'var(--c-accent)',
                    marginRight: ar ? 0 : '0.375rem',
                    marginLeft: ar ? '0.375rem' : 0,
                  }}>
                    Q.
                  </span>
                  {q}
                </p>
                <p style={{ color: 'var(--c-muted)', margin: 0, lineHeight: 1.65, fontSize: '0.9375rem' }}>
                  {a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related Services ── */}
        <section style={{ backgroundColor: 'var(--c-surface)', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{
              fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
              marginBottom: '1.5rem',
              color: 'var(--c-text)',
              textAlign: 'center',
            }}>
              {t.relatedHeading}
            </h2>
            <div className="svc-related-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              {related.map((s) => {
                const rt = ar ? s.ar : s.en;
                const href = `${ar ? '/ar' : ''}/services/${s.slug}`;
                return (
                  <a key={s.slug} href={href} style={{
                    display: 'flex', flexDirection: 'column', gap: '0.5rem',
                    padding: '1.5rem', backgroundColor: 'var(--c-bg)',
                    border: '1px solid var(--c-border)', borderRadius: '0.75rem',
                    textDecoration: 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{rt.cardIcon}</span>
                      <strong style={{ fontSize: '1.0625rem', color: 'var(--c-text)' }}>{rt.cardTitle}</strong>
                    </div>
                    <p style={{ color: 'var(--c-muted)', margin: 0, fontSize: '0.9375rem', lineHeight: 1.55 }}>
                      {rt.cardDesc}
                    </p>
                    <span style={{ color: 'var(--c-accent)', fontSize: '0.875rem', fontWeight: 600, marginTop: '0.25rem' }}>
                      {ar ? 'اعرف أكثر ←' : 'Learn more →'}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <style>{`
          @media (min-width: 640px) {
            .svc-areas-grid { grid-template-columns: repeat(4, 1fr) !important; }
            .svc-related-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 480px) {
            .svc-cta-btn { width: 100% !important; }
          }
        `}</style>
      </main>
      <Footer lang={lang} />
      <FloatingCTA />
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/ubuntu/projects/startsmartqatar && npx tsc --noEmit 2>&1 | head -20
```

Expected: no output. Fix any errors before continuing.

- [ ] **Step 3: Commit**

```bash
git add components/templates/ServicePageTemplate.tsx
git commit -m "feat: add ServicePageTemplate with breadcrumb, benefits, areas, faq, related services"
```

---

## Task 3: Replace EN Service Page Wrappers

**Files:**
- Modify: `app/services/battery-replacement/page.tsx`
- Modify: `app/services/jump-start/page.tsx`
- Modify: `app/services/electrical-repair/page.tsx`

- [ ] **Step 1: Replace `app/services/battery-replacement/page.tsx`**

Overwrite the entire file with:

```tsx
import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import { batteryReplacementData } from '@/lib/services-data';

const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: batteryReplacementData.en.metaTitle,
  description: batteryReplacementData.en.metaDescription,
  alternates: {
    canonical: `${SITE_URL}/services/battery-replacement`,
    languages: { ar: `${SITE_URL}/ar/services/battery-replacement` },
  },
};

export default function Page() {
  return <ServicePageTemplate data={batteryReplacementData} lang="en" />;
}
```

- [ ] **Step 2: Replace `app/services/jump-start/page.tsx`**

Overwrite the entire file with:

```tsx
import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import { jumpStartData } from '@/lib/services-data';

const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: jumpStartData.en.metaTitle,
  description: jumpStartData.en.metaDescription,
  alternates: {
    canonical: `${SITE_URL}/services/jump-start`,
    languages: { ar: `${SITE_URL}/ar/services/jump-start` },
  },
};

export default function Page() {
  return <ServicePageTemplate data={jumpStartData} lang="en" />;
}
```

- [ ] **Step 3: Replace `app/services/electrical-repair/page.tsx`**

Overwrite the entire file with:

```tsx
import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import { electricalRepairData } from '@/lib/services-data';

const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: electricalRepairData.en.metaTitle,
  description: electricalRepairData.en.metaDescription,
  alternates: {
    canonical: `${SITE_URL}/services/electrical-repair`,
    languages: { ar: `${SITE_URL}/ar/services/electrical-repair` },
  },
};

export default function Page() {
  return <ServicePageTemplate data={electricalRepairData} lang="en" />;
}
```

- [ ] **Step 4: Run build to verify EN wrappers**

```bash
cd /home/ubuntu/projects/startsmartqatar && npm run build 2>&1 | tail -30
```

Expected: build succeeds, all 3 EN service routes listed as `○ (Static)`.

- [ ] **Step 5: Commit**

```bash
git add app/services/battery-replacement/page.tsx app/services/jump-start/page.tsx app/services/electrical-repair/page.tsx
git commit -m "feat: replace EN service pages with shared template wrappers"
```

---

## Task 4: Replace AR Service Page Wrappers

**Files:**
- Modify: `app/ar/services/battery-replacement/page.tsx`
- Modify: `app/ar/services/jump-start/page.tsx`
- Modify: `app/ar/services/electrical-repair/page.tsx`

- [ ] **Step 1: Replace `app/ar/services/battery-replacement/page.tsx`**

Overwrite the entire file with:

```tsx
import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import { batteryReplacementData } from '@/lib/services-data';

const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: batteryReplacementData.ar.metaTitle,
  description: batteryReplacementData.ar.metaDescription,
  alternates: {
    canonical: `${SITE_URL}/ar/services/battery-replacement`,
    languages: { en: `${SITE_URL}/services/battery-replacement` },
  },
};

export default function Page() {
  return <ServicePageTemplate data={batteryReplacementData} lang="ar" />;
}
```

- [ ] **Step 2: Replace `app/ar/services/jump-start/page.tsx`**

Overwrite the entire file with:

```tsx
import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import { jumpStartData } from '@/lib/services-data';

const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: jumpStartData.ar.metaTitle,
  description: jumpStartData.ar.metaDescription,
  alternates: {
    canonical: `${SITE_URL}/ar/services/jump-start`,
    languages: { en: `${SITE_URL}/services/jump-start` },
  },
};

export default function Page() {
  return <ServicePageTemplate data={jumpStartData} lang="ar" />;
}
```

- [ ] **Step 3: Replace `app/ar/services/electrical-repair/page.tsx`**

Overwrite the entire file with:

```tsx
import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import { electricalRepairData } from '@/lib/services-data';

const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: electricalRepairData.ar.metaTitle,
  description: electricalRepairData.ar.metaDescription,
  alternates: {
    canonical: `${SITE_URL}/ar/services/electrical-repair`,
    languages: { en: `${SITE_URL}/services/electrical-repair` },
  },
};

export default function Page() {
  return <ServicePageTemplate data={electricalRepairData} lang="ar" />;
}
```

- [ ] **Step 4: Run build to verify all 6 pages**

```bash
cd /home/ubuntu/projects/startsmartqatar && npm run build 2>&1 | tail -30
```

Expected: clean build, all 6 service routes listed as `○ (Static)`:
```
├ ○ /ar/services/battery-replacement
├ ○ /ar/services/electrical-repair
├ ○ /ar/services/jump-start
├ ○ /services/battery-replacement
├ ○ /services/electrical-repair
└ ○ /services/jump-start
```

- [ ] **Step 5: Commit**

```bash
git add app/ar/services/battery-replacement/page.tsx app/ar/services/jump-start/page.tsx app/ar/services/electrical-repair/page.tsx
git commit -m "feat: replace AR service pages with shared template wrappers"
```

---

## Task 5: Final Verification

- [ ] **Step 1: Start dev server and check all 6 URLs**

```bash
cd /home/ubuntu/projects/startsmartqatar && npm run dev
```

Open each URL and verify all 6 sections appear (breadcrumb, hero, benefits, areas, FAQ, related):
- `http://localhost:3001/services/battery-replacement`
- `http://localhost:3001/services/jump-start`
- `http://localhost:3001/services/electrical-repair`
- `http://localhost:3001/ar/services/battery-replacement`
- `http://localhost:3001/ar/services/jump-start`
- `http://localhost:3001/ar/services/electrical-repair`

Checklist for each page:
- Breadcrumb shows Home → Service Name
- H1 displays correctly with accent color on "Qatar"/country word
- All 5 benefit cards visible
- 12 area chips in grid (2-col mobile → 4-col desktop)
- 4 FAQ items visible
- 2 related service cards link to the correct other services
- AR pages: `dir="rtl"`, Cairo font, all Arabic text

- [ ] **Step 2: Verify JSON-LD in browser**

In Chrome DevTools → Elements → search for `application/ld+json`. Each page should have 3 script tags with valid JSON. Check:
- Service schema: has `name`, `description`, `provider`, `url`
- BreadcrumbList: has 2 items, position 1 = Home, position 2 = service name
- FAQPage: has 4 Question items with acceptedAnswer

- [ ] **Step 3: Verify hreflang in page source**

View source on any service page. Should see:
```html
<link rel="alternate" hreflang="ar" href="https://startsmartqa.com/ar/services/battery-replacement" />
```
(EN page points to AR equivalent, AR page points to EN equivalent)

- [ ] **Step 4: Verify mobile layout**

In DevTools, toggle device toolbar to iPhone SE (375px). Check:
- CTA button is full width
- Area chips are 2 columns
- Related service cards are stacked (1 column)
- Text is readable (no overflow)
- AR pages are properly RTL aligned

- [ ] **Step 5: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: service page template adjustments from verification"
```
