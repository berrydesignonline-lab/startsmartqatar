// Battery brands StartSmart stocks. Drives /batteries hub + /batteries/[brand] pages.
// Logos live in /public/brands/. Keep order = display order in slider + hub.

export interface BrandData {
  slug: string;          // url slug, e.g. "bosch"
  nameEn: string;
  nameAr: string;
  logo: string;          // path under /public
  logoBg?: string;       // optional background behind logo (some logos aren't transparent)
  taglineEn: string;
  taglineAr: string;
  introEn: string;       // 2-3 sentences, unique, SEO ("Bosch battery Qatar")
  introAr: string;       // Qatari Arabic, targets "بطارية بوش قطر"
  strengthsEn: string[];
  strengthsAr: string[];
  bestForEn: string;     // which cars / use-case
  bestForAr: string;
  metaTitleEn: string;
  metaDescEn: string;
  metaTitleAr: string;
  metaDescAr: string;
}

export const BRANDS: BrandData[] = [
  {
    slug: 'bosch',
    nameEn: 'Bosch',
    nameAr: 'بوش',
    logo: '/brands/bosch.svg',
    taglineEn: 'German engineering for start-stop & European cars',
    taglineAr: 'هندسة ألمانية لسيارات ستارت-ستوب والسيارات الأوروبية',
    introEn:
      "Bosch is the premium German battery choice in Qatar, built with PowerFrame grid technology for strong corrosion resistance in extreme heat. It's the go-to for European cars and vehicles with start-stop and heavy electronics. We deliver and fit genuine Bosch batteries anywhere in Qatar with a warranty.",
    introAr:
      'بطارية بوش هي الخيار الألماني الفاخر في قطر، مصنوعة بتقنية PowerFrame لمقاومة عالية للحرارة والتآكل. هي الأنسب للسيارات الأوروبية والسيارات اللي فيها نظام ستارت-ستوب وكهرباء كثيرة. نوصّل ونركّب بطارية بوش الأصلية في أي مكان بقطر مع ضمان.',
    strengthsEn: ['PowerFrame anti-corrosion grid', 'Ideal for start-stop systems', 'Strong cold-cranking power', 'Trusted by European brands'],
    strengthsAr: ['شبكة PowerFrame ضد التآكل', 'مثالية لأنظمة ستارت-ستوب', 'قدرة تشغيل قوية', 'موثوقة للسيارات الأوروبية'],
    bestForEn: 'Audi, Mercedes, Volkswagen, BMW, and any car with start-stop or AGM requirements.',
    bestForAr: 'أودي، مرسيدس، فولكس واجن، بي إم دبليو، وأي سيارة فيها ستارت-ستوب أو تحتاج AGM.',
    metaTitleEn: 'Bosch Battery Qatar — Genuine, Delivered & Fitted | StartSmart',
    metaDescEn: 'Genuine Bosch car batteries in Qatar, delivered and fitted on-site in minutes. PowerFrame technology, ideal for European & start-stop cars. Warranty. Pay after service.',
    metaTitleAr: 'بطارية بوش قطر — أصلية مع التوصيل والتركيب | ستارت سمارت',
    metaDescAr: 'بطارية بوش الأصلية في قطر، توصيل وتركيب في مكانك خلال دقايق. تقنية PowerFrame، مثالية للسيارات الأوروبية وستارت-ستوب. ضمان. ادفع بعد الخدمة.',
  },
  {
    slug: 'infinity',
    nameEn: 'Infinity',
    nameAr: 'إنفنتي',
    logo: '/brands/infinity.jpg',
    logoBg: '#ffffff',
    taglineEn: 'Reliable everyday power for Japanese & Korean cars',
    taglineAr: 'قوة يومية موثوقة للسيارات اليابانية والكورية',
    introEn:
      'Infinity batteries offer dependable, value-for-money power that handles Qatar\'s heat well. They\'re a popular choice for everyday Japanese and Korean cars — Toyota, Nissan, Honda, Hyundai and Kia. We carry the right Infinity size for your car and fit it on the spot, anywhere in Qatar.',
    introAr:
      'بطارية إنفنتي تعطيك قوة موثوقة وسعر مناسب وتتحمل حر قطر زين. هي خيار شائع للسيارات اليابانية والكورية اليومية — تويوتا، نيسان، هوندا، هيونداي وكيا. عندنا المقاس المناسب لسيارتك ونركّبه لك بمكانك في أي منطقة بقطر.',
    strengthsEn: ['Great value for money', 'Tested for Gulf heat', 'Wide range of sizes', 'Reliable daily starting'],
    strengthsAr: ['سعر ممتاز مقابل الجودة', 'مختبرة لحر الخليج', 'مقاسات كثيرة', 'تشغيل يومي موثوق'],
    bestForEn: 'Toyota, Nissan, Honda, Hyundai, Kia and most Japanese/Korean daily drivers.',
    bestForAr: 'تويوتا، نيسان، هوندا، هيونداي، كيا ومعظم السيارات اليابانية والكورية اليومية.',
    metaTitleEn: 'Infinity Battery Qatar — Delivered & Fitted On-Site | StartSmart',
    metaDescEn: 'Infinity car batteries in Qatar — reliable, heat-tested, great value. Delivered and fitted at your location for Toyota, Nissan, Honda & more. Warranty. Pay after service.',
    metaTitleAr: 'بطارية إنفنتي قطر — توصيل وتركيب في الموقع | ستارت سمارت',
    metaDescAr: 'بطارية إنفنتي في قطر — موثوقة، مختبرة للحر، سعر ممتاز. توصيل وتركيب بمكانك لتويوتا، نيسان، هوندا وغيرها. ضمان. ادفع بعد الخدمة.',
  },
  {
    slug: 'q-power',
    nameEn: 'Q-Power',
    nameAr: 'كيو باور',
    logo: '/brands/q-power.png',
    logoBg: '#ffffff',
    taglineEn: "Qatar's own battery — made in Doha",
    taglineAr: 'بطارية قطر — صناعة الدوحة',
    introEn:
      "Q-Power is Qatar's first battery factory, manufactured right here in Doha and built specifically for the Gulf climate. As a local OEM brand it offers fast local support and genuine warranty backing. Choose Q-Power for proudly Qatari-made batteries delivered and fitted anywhere in the country.",
    introAr:
      'كيو باور هي أول مصنع بطاريات في قطر، تُصنع هنا في الدوحة ومصمّمة خصيصاً لمناخ الخليج. كونها ماركة محلية، تعطيك دعم سريع وضمان أصلي. اختر كيو باور لبطارية قطرية الصنع بكل فخر، نوصّلها ونركّبها لك في أي مكان بالدولة.',
    strengthsEn: ['Made in Qatar (Doha factory)', 'Designed for Gulf heat', 'Fast local warranty support', 'OEM-grade quality'],
    strengthsAr: ['صناعة قطر (مصنع الدوحة)', 'مصممة لحر الخليج', 'دعم وضمان محلي سريع', 'جودة بمستوى الوكالة'],
    bestForEn: 'Drivers who want a locally-made, Gulf-tested battery with fast local warranty support.',
    bestForAr: 'لمن يبي بطارية محلية الصنع، مختبرة للخليج، مع دعم وضمان محلي سريع.',
    metaTitleEn: 'Q-Power Battery Qatar — Made in Doha, Delivered & Fitted | StartSmart',
    metaDescEn: "Q-Power batteries — Qatar's own brand, made in Doha for Gulf heat. Delivered and fitted on-site anywhere in Qatar with fast local warranty. Pay after service.",
    metaTitleAr: 'بطارية كيو باور قطر — صناعة الدوحة مع التوصيل والتركيب | ستارت سمارت',
    metaDescAr: 'بطارية كيو باور — ماركة قطر، صناعة الدوحة لحر الخليج. توصيل وتركيب بمكانك في أي منطقة بقطر مع ضمان محلي سريع. ادفع بعد الخدمة.',
  },
  {
    slug: 'exide',
    nameEn: 'Exide',
    nameAr: 'إكسايد',
    logo: '/brands/exide.png',
    logoBg: '#ffffff',
    taglineEn: 'Globally trusted, heat-resistant, great value',
    taglineAr: 'موثوقة عالمياً، تتحمل الحر، سعر ممتاز',
    introEn:
      'Exide is a globally trusted battery brand known for high resistance to extreme temperatures — ideal for Qatar\'s climate. It delivers reliable starting power at a competitive price across a wide range of car types. We stock Exide in the right size for your car and fit it on-site anywhere in Qatar.',
    introAr:
      'إكسايد ماركة بطاريات موثوقة عالمياً ومعروفة بتحمّلها للحرارة العالية — مثالية لمناخ قطر. تعطيك قوة تشغيل موثوقة بسعر منافس وتناسب أنواع كثيرة من السيارات. عندنا إكسايد بالمقاس المناسب لسيارتك ونركّبه لك بمكانك في أي منطقة بقطر.',
    strengthsEn: ['High heat resistance', 'Competitive pricing', 'Wide vehicle coverage', 'Globally proven brand'],
    strengthsAr: ['تحمّل عالي للحرارة', 'سعر منافس', 'تغطية واسعة للسيارات', 'ماركة عالمية مثبتة'],
    bestForEn: 'Budget-conscious drivers who still want a globally proven, heat-tough battery.',
    bestForAr: 'لمن يبي سعر مناسب وبنفس الوقت بطارية عالمية تتحمّل الحر.',
    metaTitleEn: 'Exide Battery Qatar — Heat-Resistant, Delivered & Fitted | StartSmart',
    metaDescEn: 'Exide car batteries in Qatar — globally trusted, heat-resistant, great value. Delivered and fitted on-site in minutes. Warranty. Pay after service. 24/7.',
    metaTitleAr: 'بطارية إكسايد قطر — تتحمل الحر مع التوصيل والتركيب | ستارت سمارت',
    metaDescAr: 'بطارية إكسايد في قطر — موثوقة عالمياً، تتحمل الحر، سعر ممتاز. توصيل وتركيب بمكانك خلال دقايق. ضمان. ادفع بعد الخدمة. ٢٤/٧.',
  },
];

export function getBrand(slug: string): BrandData | undefined {
  return BRANDS.find((b) => b.slug === slug);
}
