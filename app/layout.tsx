import './globals.css';
import type { Metadata } from 'next';
import { buildMetadata, getSeoSetting, SITE_URL } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('page', '/');
  return {
    metadataBase: new URL(SITE_URL),
    ...buildMetadata(seo, {
      title: 'WellWisher',
      description: 'Expert visa consultancy, document checklists and application guidance for destinations worldwide.',
      path: '/',
    }),
    keywords: 'visa consultancy, student visa, work visa, tourist visa, immigration guidance',
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
