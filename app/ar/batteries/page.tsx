import type { Metadata } from 'next';
import BatteriesHubPage from '@/components/templates/BatteriesHubPage';

const SITE_URL = 'https://startsmartqatar.com';

export const metadata: Metadata = {
  title: 'بطاريات السيارات في قطر — بوش، إنفنتي، كيو باور، إكسايد | ستارت سمارت',
  description: 'بطاريات سيارات أصلية في قطر — بوش، إنفنتي، كيو باور وإكسايد. جد البطارية المناسبة لسيارتك، توصيل وتركيب بمكانك خلال دقايق. ضمان. ادفع بعد الخدمة. ٢٤/٧.',
  keywords: ['بطارية سيارة قطر', 'ماركات بطاريات قطر', 'بطارية بوش قطر', 'بطارية إنفنتي قطر', 'بطارية كيو باور قطر', 'بطارية إكسايد قطر', 'أفضل بطارية سيارة قطر'],
  alternates: {
    canonical: `${SITE_URL}/ar/batteries`,
    languages: { en: `${SITE_URL}/batteries`, 'x-default': `${SITE_URL}/batteries` },
  },
  openGraph: { url: `${SITE_URL}/ar/batteries`, title: 'بطاريات السيارات في قطر — بوش، إنفنتي، كيو باور، إكسايد', description: 'جد البطارية المناسبة لسيارتك. توصيل وتركيب في أي مكان بقطر.' },
};

export default function Page() {
  return <BatteriesHubPage lang="ar" />;
}
