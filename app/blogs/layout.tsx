import type { Metadata } from 'next';
import { buildMetadata, getSeoSetting, JsonLd, SITE_URL } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('page', '/blogs');
  return buildMetadata(seo, {
    title: 'WellWisher',
    description: 'Read practical visa, immigration and travel guidance from WellWisher experts.',
    path: '/blogs',
  });
}

export default async function BlogsLayout({ children }: { children: React.ReactNode }) {
  const seo = await getSeoSetting('page', '/blogs');
  return <>
    {children}
    <JsonLd data={seo?.schemaJson} />
    <JsonLd data={{
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blogs', item: `${SITE_URL}/blogs` },
      ],
    }} />
  </>;
}
