export interface WarrantyData {
  title: string;
  months: number;
  description: string;
  conditions: string[];
  badge: string;
}

export interface ServiceTranslation {
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
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
  warranty?: WarrantyData;
}

export interface ServiceData {
  slug: 'battery-replacement' | 'jump-start' | 'electrical-repair';
  en: ServiceTranslation;
  ar: ServiceTranslation;
}

export const batteryReplacementData: ServiceData = {
  slug: 'battery-replacement',
  en: {
    metaTitle: 'Car Battery Replacement Qatar — Infinity, Bosch, Q-Power, Exide',
    metaDescription: 'On-site car battery replacement in Qatar. Infinity, Bosch, Q-Power & Exide batteries. Certified technician arrives in 10 minutes within service areas. 12-month warranty. Pay after service. 24/7.',
    badge: '⚡ Available 24/7 across Qatar',
    h1: 'Car Battery Replacement',
    h1Accent: 'Qatar',
    description: 'Dead battery? Our certified technician arrives at your location — home, office, or roadside — in 10 minutes or less (within service areas). All car brands. Pay after service.',
    whatsappText: 'Hi, I need battery replacement',
    ctaLabel: 'Order Battery Replacement',
    cardIcon: '🔋',
    cardTitle: 'Battery Replacement',
    cardDesc: 'New battery delivered and fitted at your location in 10 min (within service areas).',
    benefitsHeading: 'Why Choose StartSmart?',
    benefits: [
      { icon: '⚡', title: '10-minute arrival', desc: 'We come to you within service areas — Doha, Lusail, Al Rayyan, Al Wakrah, Al Khor.' },
      { icon: '🔋', title: 'All battery brands', desc: 'We carry batteries for all car brands and models. German, Japanese, American, Korean.' },
      { icon: '💳', title: 'Pay after service', desc: 'You only pay once the job is done and you are satisfied.' },
      { icon: '🔧', title: 'Free charging system check', desc: 'Every replacement includes a free alternator and charging system inspection.' },
      { icon: '🌙', title: '24/7 availability', desc: 'Day or night, weekday or weekend — we are always available.' },
    ],
    areasHeading: 'Battery Replacement — All Qatar',
    areasNote: 'From West Bay to Al Wakra — we come to you anywhere in Qatar.',
    faqHeading: 'Common Questions',
    faq: [
      { q: 'How fast do you arrive?', a: 'Our technician arrives in 10 minutes or less within service areas — Doha, Lusail, Al Rayyan, Al Wakrah, and beyond.' },
      { q: 'Which battery brands do you carry?', a: 'We stock Infinity, Bosch, Q-Power, and Exide. We match the right battery to your car model.' },
      { q: 'Do you test the alternator after replacing the battery?', a: 'Yes. Every battery replacement includes a free charging system inspection to make sure your new battery charges correctly.' },
      { q: 'How much does battery replacement cost?', a: 'Price depends on your car model and battery type. We give you the exact price before starting. Pay only after the job is done.' },
    ],
    relatedHeading: 'Other Services',
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
  },
  ar: {
    metaTitle: 'تبديل بطارية السيارة قطر — بوش، إنفنتي، كيو باور، إكسايد | توصيل وتركيب في الموقع',
    metaDescription: 'بطارية سيارتك ميتة في قطر؟ نوصلك ونركب البطارية في مكانك. بطاريات بوش، إنفنتي، كيو باور، إكسايد. فني يصل في أسرع وقت داخل مناطق الخدمة. ضمان ١٢ شهر. ادفع بعد الخدمة. ٢٤/٧.',
    keywords: [
      'تبديل بطارية السيارة قطر',
      'تغيير بطارية سيارة قطر',
      'استبدال بطارية السيارة الدوحة',
      'توصيل بطارية سيارة قطر',
      'تركيب بطارية في الموقع قطر',
      'بطارية سيارة ميتة قطر',
      'بطارية ميتة قطر',
      'البطارية خلصت قطر',
      'أسعار بطاريات السيارات في قطر',
      'أفضل بطارية سيارة قطر',
      'أنواع بطاريات السيارات قطر',
      'بطارية بوش قطر',
      'بطارية إنفنتي قطر',
      'بطارية أماريون قطر',
      'بطارية إكسايد قطر',
      'بطارية سوليت قطر',
      'بطارية فارتا قطر',
      'خدمة بطارية الدوحة',
      'بطارية سيارة لوسيل',
      'بطارية سيارة الريان',
    ],
    badge: '⚡ متاح 24/7 في كل قطر',
    h1: 'تبديل بطارية السيارة',
    h1Accent: 'قطر',
    description: 'بطاريتك تعطلت؟ فريق الخدمة الخاص بنا يصلك في مكانك أينما كنت داخل دولة قطر في أسرع وقت. جميع أنواع السيارات. ادفع بعد الخدمة.',
    whatsappText: 'مرحبا، أحتاج تبديل بطارية',
    ctaLabel: 'اطلب تبديل البطارية الآن',
    cardIcon: '🔋',
    cardTitle: 'تبديل البطارية',
    cardDesc: 'بطارية جديدة تُوصّل وتُركّب في موقعك في أسرع وقت داخل كل مناطق الدوحة وكل مناطق قطر.',
    benefitsHeading: 'لماذا تختار ستارت سمارت؟',
    benefits: [
      { icon: '⚡', title: 'ستارت سمارت أسرع خدمة توصيل بطاريات في قطر', desc: 'كل مناطق قطر — الدوحة، لوسيل، الريان، الوكرة، الخور، وجميع مناطق قطر.' },
      { icon: '🔋', title: 'كل أنواع البطاريات', desc: 'متوفر لدينا بطاريات لكل أنواع وموديلات السيارات. ألمانية، يابانية، أمريكية، كورية، صينية.' },
      { icon: '💳', title: 'تدفع بعد تقديم الخدمة', desc: '' },
      { icon: '🔧', title: 'فحص الدينامو مجاناً', desc: 'كل تبديل بطارية يشمل فحص الدينامو ونظام الشحن مجاناً.' },
      { icon: '🌙', title: 'متاحين ٢٤/٧', desc: 'نهار أو ليل، طول الأسبوع والإجازات — دايماً معاك.' },
    ],
    areasHeading: 'تبديل البطارية — كل قطر',
    areasNote: 'نغطّي كل مناطق قطر — وين ما كنت، نوصلك.',
    faqHeading: 'أسئلة شائعة',
    faq: [
      { q: 'كم يستغرق الوصول؟', a: 'فريق الخدمة الخاص بنا يصل إليك من ١٠ إلى ٣٠ دقيقة داخل كل مناطق الدوحة وكل مناطق قطر.' },
      { q: 'ما هي أنواع البطاريات المتوفرة لديكم؟', a: 'متوفر لدينا إنفنتي، بوش، كيو باور، وإكسايد. نختار البطارية المناسبة لسيارتك.' },
      { q: 'تفحصون الدينامو بعد تبديل البطارية؟', a: 'كل تبديل بطارية يشمل فحص لنظام الشحن مجاناً، للتأكد من أن البطارية الجديدة تعمل بصورة صحيحة.' },
      { q: 'بكم سعر تبديل البطارية؟', a: 'السعر يعتمد على نوع سيارتك والبطارية المناسبة. نقولك السعر قبل ما نبدأ. تدفع بس بعد ما نخلّص.' },
      { q: 'هل هناك رسوم إضافية للتوصيل والتركيب؟', a: 'التوصيل والتركيب مجاناً داخل مناطق الدوحة.' },
    ],
    relatedHeading: 'خدمات أخرى',
    warranty: {
      title: 'ضمان البطارية ١٢ شهر',
      months: 12,
      badge: '🛡️ ضمان ١٢ شهر مشمول',
      description: 'جميع البطاريات تشمل ضمان استبدال لمدة 12 شهر ضد عيوب التصنيع. تطبق الشروط والأحكام.',
      conditions: [
        'يغطي عيوب التصنيع',
        'استبدال مجاني بدون رسوم',
        'نصل إليك في مكانك للاستبدال',
        'لا يغطي الحوادث أو سوء الاستخدام',
      ],
    },
  },
};

export const jumpStartData: ServiceData = {
  slug: 'jump-start',
  en: {
    metaTitle: 'Emergency Jump Start Service Qatar — 10 Min Response',
    metaDescription: '24/7 emergency jump start service anywhere in Qatar. Technician arrives in 10 minutes. All car types. Pay after service.',
    badge: '⚡ 24/7 Emergency Service',
    h1: 'Jump Start Service',
    h1Accent: 'Qatar',
    description: "Car won't start? Our technician comes to you in 10 minutes (within service areas) with professional jump start equipment. If the battery is dead, we replace it on the spot.",
    whatsappText: 'Hi, I need a jump start',
    ctaLabel: 'Request Jump Start Now',
    cardIcon: '⚡',
    cardTitle: 'Jump Start',
    cardDesc: 'Emergency jump start within service areas — 10 min response, 24/7.',
    benefitsHeading: 'How It Works',
    benefits: [
      { icon: '1️⃣', title: 'Contact us on WhatsApp', desc: 'Send your location on WhatsApp — takes 30 seconds.' },
      { icon: '2️⃣', title: 'Technician dispatched', desc: 'We dispatch the nearest technician immediately.' },
      { icon: '3️⃣', title: 'Arrive in 10 minutes (within service areas)', desc: 'Your car is running again — or we replace the battery on the spot.' },
      { icon: '4️⃣', title: 'Pay after service', desc: 'Only pay once you are satisfied with the service.' },
      { icon: '🌙', title: 'Available 24/7', desc: 'Day or night, weekday or weekend — we are always on call.' },
    ],
    areasHeading: 'Jump Start Coverage — All Qatar',
    areasNote: 'Stranded anywhere in Qatar? We come to you — day or night.',
    faqHeading: 'Common Questions',
    faq: [
      { q: 'What if my battery is dead after the jump start?', a: "If your battery doesn't hold a charge, we carry replacement batteries and can swap it on the spot — no second visit needed." },
      { q: 'Do you provide jump start service at night?', a: 'Yes. We operate 24/7, including nights, weekends, and public holidays. Call us any time.' },
      { q: 'How do I request a jump start?', a: 'Send your location on WhatsApp. We dispatch the nearest technician and arrive in 10 minutes (within service areas).' },
      { q: 'Is jump start available outside Doha?', a: 'Yes — we cover all Qatar: Lusail, Al Rayyan, Al Wakrah, Al Khor, Mesaieed, and more.' },
    ],
    relatedHeading: 'Other Services',
  },
  ar: {
    metaTitle: 'بوستر سيارة قطر — تشغيل بطارية طارئة ٢٤/٧ | مساعدة على الطريق',
    metaDescription: 'سيارتك ما تشتغل في قطر؟ نرسل لك فني بوستر في أسرع وقت. خدمة تشغيل البطارية الطارئة ٢٤/٧ في كل مناطق قطر. مساعدة على الطريق فورية — لو البطارية ميتة نبدلها في نفس المكان. تدفع بعد الخدمة.',
    keywords: [
      'بوستر سيارة قطر',
      'تشغيل بطارية سيارة قطر',
      'جمب ستارت قطر',
      'خدمة البوستر قطر',
      'سيارتي ما تشتغل قطر',
      'تعطلت سيارتي قطر',
      'مساعدة على الطريق قطر',
      'مساعدة على الطريق الدوحة',
      'خدمة طوارئ سيارة قطر',
      'خدمة طوارئ سيارة ٢٤ ساعة قطر',
      'مساعدة طارئة سيارة قطر',
      'إنقاذ سيارة قطر',
      'خدمة متنقلة للسيارة قطر',
      'بدء تشغيل البطارية قطر',
      'مساعدة سيارة الدوحة',
    ],
    badge: '⚡ خدمة طوارئ ٢٤/٧',
    h1: 'تشغيل البطارية (إشتراك) للسيارات',
    h1Accent: 'قطر',
    description: 'سيارتك ما تشتغل؟ فريق الخدمة الخاص بنا يصل إليك في جميع مناطق قطر بمعدات تشغيل بطارية احترافية. لو البطارية معطوبة، يتم استبدالها فوراً في الموقع.',
    whatsappText: 'مرحبا، أحتاج تشغيل البطارية (إشتراك) للسيارات',
    ctaLabel: 'اطلب الخدمة الآن',
    cardIcon: '⚡',
    cardTitle: 'تشغيل البطارية (إشتراك) للسيارات',
    cardDesc: 'خدمة تشغيل بطارية طارئة في أسرع وقت داخل كل مناطق الدوحة وكل مناطق قطر — ٢٤/٧.',
    benefitsHeading: 'كيف تطلب الخدمة',
    benefits: [
      { icon: '💬', title: 'تواصل معنا على الواتساب', desc: 'أرسل مكانك على الواتساب — ما تاخذ غير ٣٠ ثانية.' },
      { icon: '🚗', title: 'نرسل أقرب فني', desc: 'نرسل لك أقرب فني فوراً.' },
      { icon: '⚡', title: 'نصل إليك في أسرع وقت', desc: 'في كل مناطق الدوحة وكل مناطق قطر — سيارتك تشتغل، أو نبدل البطارية فوراً.' },
      { icon: '💳', title: 'تدفع بعد تقديم الخدمة', desc: '' },
      { icon: '🌙', title: 'متاحين ٢٤/٧', desc: 'نهار أو ليل، طول الأسبوع والإجازات — دايماً معاك.' },
    ],
    areasHeading: 'تشغيل البطارية (إشتراك) للسيارات — كل قطر',
    areasNote: 'نغطّي جميع أنحاء دولة قطر — وين ما كنت، نوصلك. نهار أو ليل.',
    faqHeading: 'أسئلة شائعة',
    faq: [
      { q: 'ماذا لو أن البطارية معطوبة بعد تشغيل السيارة؟', a: 'لو البطارية معطوبة، متوفر لدينا بطاريات بديلة ونبدلها في نفس المكان — من غير زيارة ثانية.' },
      { q: 'تقدمون خدمة تشغيل البطارية (إشتراك) للسيارات في الليل؟', a: 'نعم. نشتغل ٢٤/٧، حتى الليل والإجازات والأعياد.' },
      { q: 'كيف أطلب تشغيل البطارية (إشتراك) للسيارات؟', a: 'أرسل مكانك على الواتساب. نرسل لك أقرب فني، ويصل في أسرع وقت داخل كل مناطق الدوحة وكل مناطق قطر.' },
      { q: 'تغطون المناطق خارج الدوحة؟', a: 'نعم — نغطّي جميع أنحاء دولة قطر: لوسيل، الريان، الوكرة، الخور، مسيعيد، وغيرها.' },
    ],
    relatedHeading: 'خدمات أخرى',
  },
};

export const electricalRepairData: ServiceData = {
  slug: 'electrical-repair',
  en: {
    metaTitle: 'Mobile Car Electrical Repair Qatar — On-Site Diagnosis',
    metaDescription: 'Mobile car electrical repair and diagnosis anywhere in Qatar. Alternator, fuses, wiring, sensors. Technician arrives in 10 minutes. 24/7.',
    badge: '🔧 Mobile Electrical Service',
    h1: 'Car Electrical Repair',
    h1Accent: 'Qatar',
    description: 'Electrical fault? Warning light on? We diagnose and repair on-site. Alternator, fuses, wiring, sensors, and more. We come to you in 10 minutes (within service areas).',
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
      { q: 'How long does an electrical repair take?', a: 'Simple faults like fuses take 15–10 minutes. Alternator replacement or wiring issues take 1–2 hours depending on the fault.' },
      { q: 'Can you diagnose my electrical fault before I pay?', a: 'Yes. We diagnose on-site and explain what needs to be fixed. You only pay if you approve the repair.' },
    ],
    relatedHeading: 'Other Services',
  },
  ar: {
    metaTitle: 'إصلاح كهرباء السيارة قطر — خدمة متنقلة ٢٤/٧ | مساعدة على الطريق',
    metaDescription: 'عطل كهربائي في سيارتك بقطر؟ فني متخصص يصل إليك في موقعك. إصلاح دينامو، فيوزات، أسلاك، حساسات. خدمة متنقلة ٢٤/٧ في كل مناطق قطر. مساعدة على الطريق فورية. تدفع بعد الخدمة.',
    keywords: [
      'إصلاح كهرباء السيارة قطر',
      'خدمة كهرباء السيارة المتنقلة قطر',
      'إصلاح دينامو السيارة قطر',
      'كهرباء سيارة الدوحة',
      'خدمة طوارئ كهرباء سيارة قطر',
      'مساعدة على الطريق قطر',
      'تشخيص أعطال السيارة قطر',
      'إصلاح أسلاك السيارة قطر',
      'مشكلة كهرباء سيارة قطر',
    ],
    badge: '🔧 خدمة كهرباء متنقلة',
    h1: 'إصلاح كهرباء السيارة',
    h1Accent: 'قطر',
    description: 'هل تواجه عطلاً كهربائياً في سيارتك؟ فريقنا المتخصص يصل إليك في موقعك لتشخيص وإصلاح الأعطال الكهربائية بسرعة وكفاءة. نوفر خدمات فحص وإصلاح الدينامو، الفيوزات، الأسلاك، الحساسات وغيرها من الأنظمة الكهربائية، مع تغطية جميع مناطق الدوحة.',
    whatsappText: 'مرحبا، أحتاج إصلاح كهرباء سيارة',
    ctaLabel: 'اطلب إصلاح الكهرباء',
    cardIcon: '🔧',
    cardTitle: 'إصلاح الكهرباء',
    cardDesc: 'تشخيص وإصلاح كهرباء السيارة في موقعك — دينامو، فيوزات، أسلاك، حساسات.',
    benefitsHeading: 'خدمات الصيانة الكهربائية',
    benefits: [
      { icon: '⚡', title: 'عطل الدينامو', desc: 'تشخيص وإصلاح الدينامو المعطوب أو استبدالها في الموقع.' },
      { icon: '🛠️', title: 'الفيوزات والأسلاك', desc: 'فيوزات معطوبة، أسلاك تالفة، دوائر قصر — نشخص العطل ونقوم بإصلاحه.' },
      { icon: '⚠️', title: 'أضواء التحذير', desc: 'نقرأ أكواد الأعطال ونشخّص سبب أي ضوء تحذير في الطبلون.' },
      { icon: '⚙️', title: 'موتور البدائ (السيلف)', desc: 'تشخيص وإصلاح موتور البدائ (السيلف) أو استبدالها في الموقع.' },
      { icon: '🌡️', title: 'الحساسات والـ ECU', desc: 'حساسات معطوبة، مشاكل ECU، أعطال كهرباء المكيف، نقوم بإصلاحها بعد ما نشخصها في مكانك.' },
    ],
    areasHeading: 'إصلاح الكهرباء — كل قطر',
    areasNote: 'عطل كهربائي في أي مكان بقطر؟ نصل إليك — من غير ونش.',
    faqHeading: 'أسئلة شائعة',
    faq: [
      { q: 'ما هي أنواع الأعطال الكهربائية التي تصلحونها؟', a: 'عطل الدينامو، الفيوزات المعطوبة، الأسلاك المعطوبة، أضواء التحذير، موتور البدائ (السيلف)، حساسات ECU، أعطال كهرباء المكيف، وغيرها. نحرص دائماً على تشخيص العطل أولاً ثم نقوم بإصلاحه، وإذا لم ينجح الإصلاح نقوم بالاستبدال.' },
      { q: 'هل تحضرون معكم قطع الغيار؟', a: 'نعم، القطع المعروفة دائماً متوفرة معنا. أما القطع الخاصة فنشخص أولاً ثم نحضر القطعة المناسبة — عادةً في نفس اليوم.' },
      { q: 'كم يستغرق إصلاح أعطال الكهرباء؟', a: 'الأعطال البسيطة مثل الفيوزات تأخذ من ١٠ إلى ١٥ دقيقة. استبدال الدينامو أو مشاكل الأسلاك تأخذ من ساعة إلى ساعتين حسب العطل.' },
      { q: 'هل تشخصون المشكلة قبل الدفع؟', a: 'نعم، نشخص المشكلة ونخبرك بالتكلفة قبل التصليح. في حالة عدم رغبتك في التصليح في الموقع، هناك رسوم للتشخيص فقط.' },
    ],
    relatedHeading: 'خدمات أخرى',
  },
};

export const ALL_SERVICES: ServiceData[] = [
  batteryReplacementData,
  jumpStartData,
  electricalRepairData,
];
