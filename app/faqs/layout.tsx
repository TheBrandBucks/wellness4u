import type { Metadata } from 'next';
import { buildMetadata, getSeoSetting, JsonLd, SITE_URL } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('page', '/faqs');
  return buildMetadata(seo, {
    title: 'Frequently Asked Questions | WellWisher',
    description: 'Find clear answers about WellWisher visa services, documents, process and support.',
    path: '/faqs',
  });
}

export default async function FaqsLayout({ children }: { children: React.ReactNode }) {
  const seo = await getSeoSetting('page', '/faqs');
  return <>
    {children}
    <JsonLd data={seo?.schemaJson} />
    <JsonLd data={{
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'FAQs', item: `${SITE_URL}/faqs` },
      ],
    }} />
  </>;
}
