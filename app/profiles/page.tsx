import type { Metadata } from 'next';
import SectionPageShell from '@/components/SectionPageShell';
import ProfilesSection from '@/components/ProfilesSection';
import { buildMetadata, getSeoSetting, JsonLd, SITE_URL } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('page', '/profiles');
  return buildMetadata(seo, {
    title: 'Verified Profiles | Lahore Girls for Date',
    description: 'Meet verified community members across Lahore through a privacy-focused and respectful directory.',
    path: '/profiles',
  });
}

export default async function ProfilesPage() {
  const seo = await getSeoSetting('page', '/profiles');
  return (
    <SectionPageShell>
      <ProfilesSection />
      <JsonLd data={seo?.schemaJson} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Profiles', item: `${SITE_URL}/profiles` },
        ],
      }} />
    </SectionPageShell>
  );
}
