import type { Metadata } from 'next';
import SectionPageShell from '@/components/SectionPageShell';
import OurServices from '@/components/OurServices';
import { buildMetadata, getSeoSetting, JsonLd, SITE_URL } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('page', '/services');
  return buildMetadata(seo, {
    title: 'Our Services | Lahore Girls for Date',
    description: 'Explore our premium services in Lahore, tailored to your preferences and comfort.',
    path: '/services',
  });
}

export default async function ServicesPage() {
  const seo = await getSeoSetting('page', '/services');
  return (
    <SectionPageShell>
      <OurServices />
      <JsonLd data={seo?.schemaJson} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
        ],
      }} />
    </SectionPageShell>
  );
}
