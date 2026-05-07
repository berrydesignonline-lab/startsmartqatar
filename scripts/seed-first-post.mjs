import { createClient } from '@sanity/client';
import https from 'https';
import { createWriteStream, unlinkSync, readFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

const client = createClient({
  projectId: 'ptc1d1gj',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Download an image from URL and upload to Sanity
async function uploadImageFromUrl(url, filename) {
  const tmpPath = join(tmpdir(), filename);
  await new Promise((resolve, reject) => {
    const file = createWriteStream(tmpPath);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, (res2) => res2.pipe(file));
      } else {
        res.pipe(file);
      }
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });

  const buffer = readFileSync(tmpPath);
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: 'image/jpeg',
  });
  unlinkSync(tmpPath);
  console.log(`✓ Uploaded: ${filename} → ${asset._id}`);
  return asset;
}

async function run() {
  console.log('Seeding first blog post to Sanity...\n');

  // Upload images from Unsplash (car battery related)
  const [heroImage, img2, img3] = await Promise.all([
    uploadImageFromUrl(
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80',
      'car-battery-hero.jpg'
    ),
    uploadImageFromUrl(
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'car-engine-battery.jpg'
    ),
    uploadImageFromUrl(
      'https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?w=800&q=80',
      'car-maintenance.jpg'
    ),
  ]);

  // Create Category first
  let category;
  const existing = await client.fetch('*[_type == "category" && slug.current == "car-tips"][0]');
  if (existing) {
    category = existing;
    console.log('✓ Category already exists');
  } else {
    category = await client.create({
      _type: 'category',
      title: 'Car Tips',
      slug: { _type: 'slug', current: 'car-tips' },
    });
    console.log(`✓ Created category: ${category._id}`);
  }

  // Create the blog post
  const post = await client.create({
    _type: 'post',
    title: 'How to Choose the Best Battery for Your Car in Qatar',
    titleAr: 'كيف تختار أفضل بطارية لسيارتك في قطر',
    slug: { _type: 'slug', current: 'how-to-choose-best-car-battery-qatar' },
    publishedAt: new Date().toISOString(),
    category: { _type: 'reference', _ref: category._id },

    excerpt: "Qatar's extreme heat is the #1 killer of car batteries. Learn how to pick the right battery for your car model, climate, and budget — and avoid costly mistakes.",
    excerptAr: 'الحرارة الشديدة في قطر هي العدو الأول للبطارية. تعرّف على كيفية اختيار البطارية المناسبة لسيارتك وميزانيتك — وتجنب الأخطاء الشائعة.',

    mainImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: heroImage._id },
      alt: 'Car battery replacement service Qatar — StartSmart',
    },

    seoTitle: 'Best Car Battery for Qatar Climate — How to Choose (2025)',
    seoDescription: "Qatar's heat destroys batteries fast. Learn which battery type suits your car, how to read specs, and what to avoid when buying in Qatar.",
    seoKeywords: ['car battery Qatar', 'best battery Qatar', 'battery replacement Doha', 'AGM battery Qatar', 'بطارية سيارة قطر'],

    body: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: "Qatar's scorching summers — with temperatures regularly hitting 45°C — are among the harshest conditions a car battery can face. Heat accelerates the chemical reactions inside a battery, causing it to degrade and fail far faster than in cooler climates. Choosing the wrong battery means you could be stranded in weeks, not years.", marks: [] }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'h1',
        style: 'h2',
        children: [{ _type: 'span', _key: 's2', text: '1. Know Your Battery Types', marks: [] }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'types',
        style: 'normal',
        children: [{ _type: 'span', _key: 's3', text: 'Not all batteries are equal. There are three main types you\'ll find in Qatar:', marks: [] }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'type-list',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', _key: 's4', text: 'Standard Flooded (SLI) — cheapest, but weakest in heat. Fine for older, simple cars.', marks: [] }],
        markDefs: [],
        level: 1,
      },
      {
        _type: 'block',
        _key: 'type-list2',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', _key: 's5', text: 'EFB (Enhanced Flooded Battery) — better cycling ability. Good for cars with start-stop systems.', marks: [] }],
        markDefs: [],
        level: 1,
      },
      {
        _type: 'block',
        _key: 'type-list3',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', _key: 's6', text: 'AGM (Absorbent Glass Mat) — the best choice for Qatar. Sealed, spill-proof, and handles heat far better. Ideal for modern cars with advanced electronics.', marks: [] }],
        markDefs: [],
        level: 1,
      },
      {
        _type: 'image',
        _key: 'img2',
        asset: { _type: 'reference', _ref: img2._id },
        alt: 'Car engine battery compartment — checking battery type',
        caption: 'Modern cars often require AGM batteries to power advanced electronics',
      },
      {
        _type: 'block',
        _key: 'h2',
        style: 'h2',
        children: [{ _type: 'span', _key: 's7', text: '2. Read the Specs Correctly', marks: [] }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'specs-intro',
        style: 'normal',
        children: [{ _type: 'span', _key: 's8', text: 'When you look at a battery label, three numbers matter most:', marks: [] }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'spec1',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', _key: 's9', text: 'CCA (Cold Cranking Amps) — how much power to start the engine. Higher is better, even in Qatar (AC compressors are heavy loads).', marks: [] }],
        markDefs: [],
        level: 1,
      },
      {
        _type: 'block',
        _key: 'spec2',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', _key: 's10', text: 'Ah (Ampere-hours) — total energy stored. Match or exceed your car\'s original spec — never go lower.', marks: [] }],
        markDefs: [],
        level: 1,
      },
      {
        _type: 'block',
        _key: 'spec3',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', _key: 's11', text: 'Reserve Capacity (RC) — how long the battery can power the car if the alternator fails. Higher RC = more peace of mind.', marks: [] }],
        markDefs: [],
        level: 1,
      },
      {
        _type: 'block',
        _key: 'h3',
        style: 'h2',
        children: [{ _type: 'span', _key: 's12', text: '3. Match the Battery to Your Car', marks: [] }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'match',
        style: 'normal',
        children: [{ _type: 'span', _key: 's13', text: 'Always check your car\'s owner manual for the OEM specification. Using the wrong size or chemistry can damage your alternator or BCM (Body Control Module). If your car originally came with an AGM battery, you must replace it with AGM — never downgrade to a flooded battery.', marks: [] }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'blockquote1',
        style: 'blockquote',
        children: [{ _type: 'span', _key: 's14', text: '⚡ Pro tip: In Qatar, always size up. If your manual says 60Ah, go 70Ah — the AC load in summer is punishing on the electrical system.', marks: [] }],
        markDefs: [],
      },
      {
        _type: 'image',
        _key: 'img3',
        asset: { _type: 'reference', _ref: img3._id },
        alt: 'Car maintenance and battery check in Qatar',
        caption: 'Regular battery checks are essential — especially before summer',
      },
      {
        _type: 'block',
        _key: 'h4',
        style: 'h2',
        children: [{ _type: 'span', _key: 's15', text: '4. Warning Signs Your Battery is Dying', marks: [] }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'signs1',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', _key: 's16', text: 'Slow engine crank when starting — especially on hot days', marks: [] }],
        markDefs: [],
        level: 1,
      },
      {
        _type: 'block',
        _key: 'signs2',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', _key: 's17', text: 'Dashboard battery warning light', marks: [] }],
        markDefs: [],
        level: 1,
      },
      {
        _type: 'block',
        _key: 'signs3',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', _key: 's18', text: 'Swollen or bloated battery case — heat damage, replace immediately', marks: [] }],
        markDefs: [],
        level: 1,
      },
      {
        _type: 'block',
        _key: 'signs4',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', _key: 's19', text: 'Battery older than 2 years in Qatar\'s climate — time to test it', marks: [] }],
        markDefs: [],
        level: 1,
      },
      {
        _type: 'block',
        _key: 'h5',
        style: 'h2',
        children: [{ _type: 'span', _key: 's20', text: '5. Brands Available in Qatar', marks: [] }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'brands',
        style: 'normal',
        children: [{ _type: 'span', _key: 's21', text: 'Common reliable brands available across Qatar: Bosch, Varta, Exide, Amaron, and Century. For premium modern cars, stick to Bosch AGM or Varta Silver Dynamic AGM. For budget-friendly options on older cars, Amaron and Century offer solid value.', marks: [] }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'outro',
        style: 'normal',
        children: [{ _type: 'span', _key: 's22', text: 'Not sure which battery fits your car? Contact StartSmart — we identify the right battery for your exact make, model, and year, deliver it to your location, and install it on the spot. No need to visit a workshop.', marks: ['strong'] }],
        markDefs: [],
      },
    ],

    bodyAr: [
      {
        _type: 'block',
        _key: 'ar-intro',
        style: 'normal',
        children: [{ _type: 'span', _key: 'ar-s1', text: 'صيف قطر القاسي — حيث تتجاوز درجات الحرارة 45 درجة مئوية بانتظام — من أصعب البيئات على بطارية السيارة. الحرارة تسرّع التفاعلات الكيميائية داخل البطارية وتتلفها بسرعة أكبر بكثير من المناخات الباردة. اختيار البطارية الخاطئة يعني أنك قد تجد نفسك عالقاً في الطريق خلال أسابيع لا سنوات.', marks: [] }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'ar-h1',
        style: 'h2',
        children: [{ _type: 'span', _key: 'ar-s2', text: '١. اعرف أنواع البطاريات', marks: [] }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'ar-types',
        style: 'normal',
        children: [{ _type: 'span', _key: 'ar-s3', text: 'ليست كل البطاريات متشابهة. هناك ثلاثة أنواع رئيسية ستجدها في قطر:', marks: [] }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'ar-type1',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', _key: 'ar-s4', text: 'البطارية العادية (SLI) — الأرخص، لكنها الأضعف في الحرارة. مناسبة للسيارات القديمة البسيطة.', marks: [] }],
        markDefs: [],
        level: 1,
      },
      {
        _type: 'block',
        _key: 'ar-type2',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', _key: 'ar-s5', text: 'بطارية EFB — قدرة أفضل على الشحن المتكرر. مناسبة للسيارات ذات نظام الإيقاف التلقائي.', marks: [] }],
        markDefs: [],
        level: 1,
      },
      {
        _type: 'block',
        _key: 'ar-type3',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', _key: 'ar-s6', text: 'بطارية AGM — الخيار الأفضل لقطر. مختومة، تتحمل الحرارة بشكل أفضل بكثير. مثالية للسيارات الحديثة ذات الإلكترونيات المتقدمة.', marks: [] }],
        markDefs: [],
        level: 1,
      },
      {
        _type: 'block',
        _key: 'ar-outro',
        style: 'normal',
        children: [{ _type: 'span', _key: 'ar-s7', text: 'مش عارف أي بطارية تناسب سيارتك؟ تواصل مع StartSmart — نحدد البطارية المناسبة لموديل سيارتك بالضبط، ونوصلها لمكانك ونركبها في الحال. بدون ورشة، بدون انتظار.', marks: ['strong'] }],
        markDefs: [],
      },
    ],
  });

  console.log(`\n✅ Blog post created!`);
  console.log(`   ID:   ${post._id}`);
  console.log(`   Slug: how-to-choose-best-car-battery-qatar`);
  console.log(`\n🌐 View at: http://localhost:3001/blog/how-to-choose-best-car-battery-qatar`);
}

run().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
