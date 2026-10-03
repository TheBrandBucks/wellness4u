import './globals.css';
import type { Metadata } from 'next';
import { buildMetadata, getSeoSetting, SITE_URL } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('page', '/');
  return {
    metadataBase: new URL(SITE_URL),
    ...buildMetadata(seo, {
      title: 'VIP Escort Services in Lahore | Beauty 4u',
      description: 'Looking for elite and private services in Lahore? Beauty 4u offers 24/7 premium profile choices and discrete bookings.',
      path: '/',
    }),
     keywords: [
      'VIP escort services Lahore',
      'premium escort services Lahore',
      'private booking Lahore',
      'VIP profiles Lahore',
      'premium companionship Lahore',
      'exclusive private services Lahore',
      'Lahore VIP services',
      'Beauty 4u Lahore',
    ],
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
