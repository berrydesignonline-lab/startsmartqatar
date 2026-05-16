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
