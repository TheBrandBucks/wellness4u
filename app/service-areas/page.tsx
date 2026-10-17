import type { Metadata } from 'next';
import SectionPageShell from '@/components/SectionPageShell';
import ServiceAreas from '@/components/ServiceAreas';
import { buildMetadata, getSeoSetting, JsonLd, SITE_URL } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('page', '/service-areas');
  return buildMetadata(seo, {
    title: 'Service Areas in Lahore | Lahore Girls for Date',
    description: 'Discover available services in your preferred location across Lahore.',
    path: '/service-areas',
  });
}

export default async function ServiceAreasPage() {
  const seo = await getSeoSetting('page', '/service-areas');
  return (
    <SectionPageShell>
      <ServiceAreas />
      <JsonLd data={seo?.schemaJson} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${SITE_URL}/service-areas` },
        ],
      }} />
    </SectionPageShell>
  );
}
