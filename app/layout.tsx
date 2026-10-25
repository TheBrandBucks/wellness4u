import './globals.css';
import type { Metadata } from 'next';
import { buildMetadata, getSeoSetting, SITE_URL } from '@/lib/seo';
import Script from 'next/script'; // 1. Yahan import karein
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
      <head>
<Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NN9VVR56');`,
          }}
        />

      </head>
      <body>
  <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NN9VVR56"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        {children}</body>
    </html>
  );
}
