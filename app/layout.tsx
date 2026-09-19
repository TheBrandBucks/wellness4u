import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata =  {
   metadataBase: new URL("https://wellness4u.love"),
  title: "Escorts Services in Lahore | Call Girls Lahore | Premium Lahore Escorts",
  description: "Top class Escorts Services in Lahore. Book verified Call Girls in Lahore with hotel room at affordable rates. Trusted, discreet and professional Lahore escort agency available 24/7.",
  keywords: "Escorts Services Lahore, Call Girls in Lahore, Lahore Escorts, Call Girl Services Lahore, Premium Escorts Lahore, Independent Call Girls Lahore, VIP Escorts Lahore, Cheap Escorts Lahore, Bahria Town Escorts, Gulberg Escorts Lahore, DHA Escorts Lahore",
  openGraph: {
    title: "Escorts Services in Lahore | Call Girls Lahore",
    description: "Book verified and professional Call Girls in Lahore. Discreet, safe and premium escort service available across Lahore.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
