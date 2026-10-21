// Per-city data for the city service landing pages (battery / jump-start / electrical)
// Used by app/services/<service>/[city]/page.tsx (EN + AR) via the City* templates.
// Each city carries UNIQUE local content (real landmarks, response reasoning, per-service
// intros) so Google treats every page as distinct, not a city-name swap.

export interface CityServiceCopy {
  introEn: string;
  introAr: string;
}

export interface CityData {
  slug: string;            // URL slug e.g. "doha"
  nameEn: string;          // "Doha"
  nameAr: string;          // "الدوحة"
  responseMin: number;     // promised minutes for that city
  responseReasonEn: string; // why that response time — tied to a real depot/landmark
  responseReasonAr: string;
  mapsQuery: string;       // Google Maps embed query for this city
  landmarksEn: string[];   // real areas/streets/malls (body copy + coverage chips)
  landmarksAr: string[];
  battery: CityServiceCopy;
  jumpStart: CityServiceCopy;
  electrical: CityServiceCopy;
}

export const CITIES: CityData[] = [
  {
    slug: 'doha',
    nameEn: 'Doha',
    nameAr: 'الدوحة',
    responseMin: 10,
    responseReasonEn: 'We keep service vans stationed near Al Sadd and West Bay, so we reach most of central Doha in about 10 minutes.',
    responseReasonAr: 'عندنا فانات جاهزة قريب من السد والخليج الغربي، عشان نوصلك في وسط الدوحة خلال ١٠ دقايق تقريباً.',
    mapsQuery: 'Doha, Qatar',
    landmarksEn: ['West Bay', 'The Pearl-Qatar', 'Msheireb Downtown', 'Al Sadd', 'Salwa Road', 'Al Waab', 'Villaggio Mall', 'Doha Festival City', 'Old Airport'],
    landmarksAr: ['الخليج الغربي', 'اللؤلؤة', 'مشيرب قلب الدوحة', 'السد', 'طريق سلوى', 'الوعب', 'فيلاجيو مول', 'دوحة فستيفال سيتي', 'المطار القديم'],
    battery: {
      introEn: 'When your car battery dies in Doha, we bring a fresh replacement straight to you — whether you are parked at Villaggio Mall on Al Waab Street or stuck in a tower garage in West Bay. Our team tests the old battery, fits a matching one on the spot, and you drive off without towing or waiting at a garage.',
      introAr: 'إذا بطاريتك فصلت في الدوحة، نجيب لك بطارية جديدة لين مكانك — سواء كنت واقف عند فيلاجيو مول في الوعب أو في كراج برج بالخليج الغربي. فريقنا يفحص البطارية القديمة ويركب لك وحدة مناسبة في الحين، وتمشي بدون سحب ولا انتظار بالكراج خلال ١٠ دقايق تقريباً.',
    },
    jumpStart: {
      introEn: 'Need an emergency jump start (بوستر) anywhere from Salwa Road to The Pearl-Qatar? Our mobile units carry heavy-duty boosters that get your engine cranking again in minutes, day or night. We come to you at Doha Festival City, Old Airport, or any roadside in between so you are never stranded.',
      introAr: 'محتاج بوستر طوارئ من طريق سلوى لين اللؤلؤة؟ سياراتنا المتنقلة فيها أجهزة بوستر قوية تشغّل لك السيارة خلال دقايق، ليل أو نهار. نوصلك عند دوحة فستيفال سيتي أو المطار القديم أو أي طريق بينهم عشان ما تبقى عالق.',
    },
    electrical: {
      introEn: 'From a failing alternator to faulty wiring or a stubborn dashboard sensor, our technicians diagnose car electrical faults right at the curb across Doha. We cover Msheireb Downtown, Al Sadd, and the busy streets off Salwa Road, finding the real cause instead of guessing so your repair lasts.',
      introAr: 'من الدينمو الخربان لين التوصيلات أو حساس اللوحة المزعج، فنيينا يشخّصون أعطال الكهرباء على الطريق في كل أنحاء الدوحة. نغطي مشيرب قلب الدوحة والسد والشوارع المزدحمة حول طريق سلوى، ونلقى السبب الحقيقي بدل التخمين عشان التصليح يدوم.',
    },
  },
  {
    slug: 'lusail',
    nameEn: 'Lusail',
    nameAr: 'لوسيل',
    responseMin: 12,
    responseReasonEn: 'We keep vans stationed around the Marina District and Lusail Boulevard, so we reach most of Lusail in about 12 minutes.',
    responseReasonAr: 'سياراتنا متمركزة حوالي حي المارينا وبوليفارد لوسيل، عشان نوصلك في أغلب مناطق لوسيل خلال ١٢ دقيقة تقريباً.',
    mapsQuery: 'Lusail, Qatar',
    landmarksEn: ['Marina District', 'Lusail Boulevard', 'Place Vendôme Mall', 'Fox Hills', 'Energy City', 'Lusail Stadium', 'Waterfront Residential District', 'Marina Promenade', 'Crescent Park'],
    landmarksAr: ['حي المارينا', 'بوليفارد لوسيل', 'مول بلاس فاندوم', 'فوكس هيلز', 'مدينة الطاقة', 'استاد لوسيل', 'حي الواجهة البحرية السكني', 'ممشى المارينا', 'حديقة الكريسنت'],
    battery: {
      introEn: 'A flat battery in the towers of the Waterfront Residential District or the parking under Place Vendôme Mall can leave you stuck fast. Our team comes to you with the right replacement battery, tests your charging system, and fits it on the spot — whether you are in Fox Hills or out by the Marina. No towing, no waiting at a workshop.',
      introAr: 'بطارية فاضية في أبراج حي الواجهة البحرية أو في مواقف مول بلاس فاندوم تخليك واقف ما تتحرك. فريقنا يجيك للموقع ببطارية بديلة مناسبة، يفحص نظام الشحن، ويركبها لك على طول — سواء كنت في فوكس هيلز أو عند المارينا. بدون سحب وبدون انتظار في الورشة.',
    },
    jumpStart: {
      introEn: 'Car will not crank after a long evening on Lusail Boulevard or at a match near Lusail Stadium? Our mobile booster reaches you across Energy City and the Marina District within minutes to jump start your engine. We give it a safe boost and check why it died before you drive off.',
      introAr: 'سيارتك ما تدور بعد سهرة طويلة في بوليفارد لوسيل أو بعد مباراة قريب من استاد لوسيل؟ البوستر المتنقل حقنا يوصلك في مدينة الطاقة وحي المارينا خلال دقايق عشان يشغّل المحرك. نعطيك بوست آمن ونتأكد ليش وقفت قبل ما تكمل طريقك.',
    },
    electrical: {
      introEn: 'Lights flickering, alternator warning on, or the car keeps draining around Crescent Park and the Marina Promenade? Our technicians diagnose starters, alternators, and wiring faults right where you are parked — from Fox Hills to the Waterfront. We trace the fault on the spot so you are not guessing on the road.',
      introAr: 'الأنوار ترفّ، أو لمبة الدينمو طالعة، أو السيارة تفصل عند حديقة الكريسنت وممشى المارينا؟ الفنيين حقنا يفحصون السلف والدينمو وأعطال الأسلاك في نفس مكان وقوفك — من فوكس هيلز لين الواجهة البحرية. نلقى العطل في الموقع عشان ما تظل تخمّن في الطريق.',
    },
  },
  {
    slug: 'al-rayyan',
    nameEn: 'Al Rayyan',
    nameAr: 'الريان',
    responseMin: 12,
    responseReasonEn: 'We keep mobile vans stationed near Ahmad Bin Ali Stadium and Mall of Qatar, so we reach most of Al Rayyan within about 12 minutes via Al Rayyan Road and Dukhan Highway.',
    responseReasonAr: 'عندنا سيارات جاهزة قريب من استاد أحمد بن علي ومول قطر، عشان نوصلك بأغلب مناطق الريان خلال ١٢ دقيقة تقريباً عن طريق شارع الريان وطريق دخان.',
    mapsQuery: 'Al Rayyan, Qatar',
    landmarksEn: ['Mall of Qatar', 'Ahmad Bin Ali Stadium', 'Education City', 'Aspire Zone', 'Al Gharrafa', 'Muaither', 'Al Aziziya', 'New Rayyan', 'Bani Hajer'],
    landmarksAr: ['مول قطر', 'استاد أحمد بن علي', 'المدينة التعليمية', 'أسباير زون', 'الغرافة', 'معيذر', 'العزيزية', 'الريان الجديد', 'بني هاجر'],
    battery: {
      introEn: 'Al Rayyan summers are brutal on car batteries, and the long villa-lined streets of New Rayyan and Muaither mean a dead battery can leave you stranded far from the nearest garage. Our team carries genuine replacement batteries in stock and fits them on the spot at your home or office, whether you are off Al Rayyan Road or out near Bani Hajer. No towing, no waiting at a workshop.',
      introAr: 'الحر في الريان قاسي على بطاريات السيارات، وشوارع الفلل الطويلة في الريان الجديد ومعيذر تخليك بعيد عن أقرب كراج لو وقفت البطارية. فريقنا عنده بطاريات أصلية جاهزة ويركّبها لك بمكانك، سواء كنت قريب من شارع الريان أو جهة بني هاجر. بدون سحب وبدون انتظار بالورشة.',
    },
    jumpStart: {
      introEn: "Stuck with a car that won't turn over in the Mall of Qatar parking or outside Ahmad Bin Ali Stadium after a match? Our jump start (بوستر) units reach the busy lots around Aspire Zone and Al Gharrafa fast and get your engine running in minutes. We carry heavy-duty boosters that handle SUVs and 4x4s common across Al Rayyan.",
      introAr: 'سيارتك ما تشتغل في مواقف مول قطر أو برّا استاد أحمد بن علي بعد المباراة؟ خدمة البوستر عندنا توصل بسرعة للمواقف الزحمة حوالين أسباير زون والغرافة وتشغّل سيارتك خلال دقايق. عندنا أجهزة بوستر قوية تناسب سيارات الدفع الرباعي والـ٤×٤ المنتشرة بالريان.',
    },
    electrical: {
      introEn: 'Faulty alternators, blown fuses, and bad wiring are common after dusty Dukhan Highway drives and the daily heat in districts like Al Aziziya and Education City. Our mobile electrician diagnoses starting and charging faults right where your car sits, from the Al Gharrafa neighbourhoods to the heart of New Rayyan. We trace the real fault instead of just swapping parts.',
      introAr: 'أعطال الدينمو والفيوزات والأسلاك شي عادي بعد القيادة على طريق دخان المغبّر والحر اليومي في مناطق مثل العزيزية والمدينة التعليمية. كهربائي السيارات المتنقل عندنا يفحص أعطال التشغيل والشحن بمكان سيارتك، من أحياء الغرافة لين قلب الريان الجديد. نلقى العطل الأصلي بدل ما نبدّل قطع على الفاضي.',
    },
  },
  {
    slug: 'al-wakrah',
    nameEn: 'Al Wakrah',
    nameAr: 'الوكرة',
    responseMin: 15,
    responseReasonEn: 'Our vans are stationed along Al Wakra Main Road so we reach most of Al Wakrah — from Souq Al Wakrah on the Corniche to Al Mashaf and Barwa City — in about 15 minutes.',
    responseReasonAr: 'فرقنا متمركزة على شارع الوكرة الرئيسي، عشان جذي نوصلك بأغلب مناطق الوكرة — من سوق الوكرة على الكورنيش لين المشاف وبروة سيتي — خلال ١٥ دقيقة تقريباً.',
    mapsQuery: 'Al Wakrah, Qatar',
    landmarksEn: ['Souq Al Wakrah', 'Al Wakrah Corniche & Beach', 'Al Janoub Stadium', 'Al Mashaf', 'Al Wukair', 'Ezdan Mall Al Wakra', 'Barwa City', 'Al Wakra Metro Station', 'Mesaieed Road'],
    landmarksAr: ['سوق الوكرة', 'كورنيش وشاطئ الوكرة', 'استاد الجنوب', 'المشاف', 'الوكير', 'إزدان مول الوكرة', 'بروة سيتي', 'محطة مترو الوكرة', 'طريق مسيعيد'],
    battery: {
      introEn: 'When your car battery dies in Al Wakrah, our technician comes to you with a fresh, tested replacement battery and fits it on the spot — whether you are parked at Souq Al Wakrah, outside Ezdan Mall Al Wakra, or in the residential streets of Al Mashaf. We carry sizes for sedans, 4x4s and family SUVs in our vans, so there is no towing and no waiting for a workshop. The old battery is removed and disposed of for free, and we check your charging system before we leave.',
      introAr: 'إذا فصلت بطارية سيارتك بالوكرة، الفني يجيك لمكانك ببطارية جديدة مفحوصة ويركبها لك على طول — سواء كنت واقف عند سوق الوكرة، أو برّا إزدان مول الوكرة، أو بين بيوت المشاف. عندنا مقاسات للسيدان والدفع الرباعي وسيارات العائلة بالفان، فما يصير سحب ولا انتظار بالورشة. نشيل البطارية القديمة ونتخلص منها ببلاش، ونفحص نظام الشحن قبل لا نمشي.',
    },
    jumpStart: {
      introEn: 'Stuck with a car that will not crank near Al Wakrah Corniche or in the Barwa City parking lots? Our team brings a professional booster (بوستر) and gets your engine running in minutes, day or night. We cover the Al Janoub Stadium area and the Al Wakra Main Road corridor fast, then advise whether your battery just needs a charge or a full replacement before you head onto Mesaieed Road.',
      introAr: 'سيارتك ما تشتغل عند كورنيش الوكرة أو في مواقف بروة سيتي؟ فريقنا يجيك ببوستر احترافي ويشغّل لك المكينة خلال دقايق، بالليل وبالنهار. نغطي منطقة استاد الجنوب وامتداد شارع الوكرة الرئيسي بسرعة، وبعدها ننصحك إذا البطارية تبي شحن بس أو تبي تبديل كامل قبل ما تطلع على طريق مسيعيد.',
    },
    electrical: {
      introEn: 'Car electrical faults — a weak alternator, corroded terminals, or lights and AC that cut out — are common in Al Wakrah heat. Our mobile auto-electrician diagnoses the problem on-site in Al Wukair, Al Mashaf or near Al Wakra Metro Station, testing the alternator, starter and wiring with proper equipment. We fix the root cause so your battery stops draining, instead of just swapping parts.',
      introAr: 'أعطال كهرباء السيارة — دينمو ضعيف، أطراف بطارية صدية، أو أنوار ومكيف يفصلون — وايد بتلقاها بحر الوكرة. كهربائي السيارات المتنقل عندنا يكشف المشكلة بمكانك في الوكير أو المشاف أو يم محطة مترو الوكرة، ويفحص الدينمو والسلف والأسلاك بأجهزة صح. نعالج أصل المشكلة عشان البطارية ما تنزف، مو بس نبدّل قطع.',
    },
  },
  {
    slug: 'al-khor',
    nameEn: 'Al Khor',
    nameAr: 'الخور',
    responseMin: 20,
    responseReasonEn: 'Our dedicated northern unit is stationed near Al Khor Corniche and the Shamal Road, so it covers the city centre, Al Thakhira and the Ras Laffan route in about 20 minutes.',
    responseReasonAr: 'وحدتنا الشمالية ثابتة قريب من كورنيش الخور وطريق الشمال، فتغطي وسط المدينة والذخيرة وطريق راس لفان خلال ٢٠ دقيقة تقريباً.',
    mapsQuery: 'Al Khor, Qatar',
    landmarksEn: ['Al Khor Corniche', 'Al Khor Mall', 'Al Khor Family Park & Zoo', 'Al Khor Towers', 'Al Thakhira', 'Simaisma', 'Ras Laffan', 'Shamal Road', 'Al Khor Archaeological Museum'],
    landmarksAr: ['كورنيش الخور', 'الخور مول', 'حديقة الخور العائلية وحديقة الحيوان', 'أبراج الخور', 'الذخيرة', 'سميسمة', 'راس لفان', 'طريق الشمال', 'متحف الخور الأثري'],
    battery: {
      introEn: 'A dead battery on a humid morning along the Al Khor Corniche is common, and the salty coastal air near Al Thakhira shortens battery life faster than inland Doha. Our northern team carries genuine batteries in every common size and replaces yours on the spot — whether you are parked outside Al Khor Mall or at home in Al Khor Community. No towing, no waiting at a garage.',
      introAr: 'بطارية ميتة في صباح رطب على كورنيش الخور شي عادي، وهواء البحر المالح قريب الذخيرة يقصّر عمر البطارية أسرع من الدوحة الداخلية. فريقنا الشمالي يحمل بطاريات أصلية بكل المقاسات ويبدّلها لك بمكانك — سواء كنت واقف برّا الخور مول أو بالبيت في مجمع الخور. بدون سحب وبدون انتظار في الكراج.',
    },
    jumpStart: {
      introEn: 'If your car will not crank near Al Khor Towers or out on the Ras Laffan road, our booster (بوستر) van reaches you fast from the Shamal Road. We jump-start cars, SUVs and work pickups on the spot, then test the alternator so you are not stranded again between Simaisma and the city. One quick call gets you moving in minutes.',
      introAr: 'إذا سيارتك ما تدير قريب أبراج الخور أو على طريق راس لفان، فان البوستر حقنا يوصلك بسرعة من طريق الشمال. نشغّل السيارات والدفع الرباعي وبكبات الشغل في الحين، وبعدها نفحص الدينمو عشان ما تتعطّل مرة ثانية بين سميسمة والمدينة. مكالمة وحدة وتمشي خلال دقايق.',
    },
    electrical: {
      introEn: 'Modern cars in Al Khor face constant heat and coastal moisture, which corrodes terminals and trips warning lights from the Family Park to the Al Khor Mall parking. Our mobile electrician diagnoses no-start faults, parasitic drains, bad alternators and wiring issues right where you are. We fix the electrical problem on site across Al Khor and Al Thakhira instead of sending you to Doha.',
      introAr: 'السيارات الحديثة في الخور تواجه حرارة ورطوبة بحرية دايمة، تصدّي الأطراف وتشغّل علامات التحذير من الحديقة العائلية لين موقف الخور مول. كهربائينا المتنقل يشخّص أعطال عدم التشغيل والتسريب الكهربائي والدينمو وأسلاك التوصيل بمكانك. نصلّح المشكلة الكهربائية بالموقع في كل الخور والذخيرة بدل ما نرسلك للدوحة.',
    },
  },
];

export function getCity(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}
