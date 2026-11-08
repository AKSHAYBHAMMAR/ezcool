import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#0284c7',
};

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EZCOOL AC Servicing | Premium AC Service. Exceptional Comfort.',
  description:
    'EZCOOL AC Servicing — Premium AC Service. Exceptional Comfort. Expert AC repair, sanitization, installation, refrigerant charging, and precision thermodynamic diagnostics.',
  applicationName: 'EZCOOL AC Servicing',
  keywords: [
    'EZCOOL',
    'EZCOOL AC Servicing',
    'AC Service',
    'AC Repair',
    'Air Conditioning Servicing',
    'HVAC Maintenance',
    'AC Installation',
    'Cooling Services',
  ],
  authors: [{ name: 'EZCOOL AC Servicing' }],
  creator: 'EZCOOL AC Servicing',
  publisher: 'EZCOOL AC Servicing',
  formatDetection: {
    telephone: true,
  },
  openGraph: {
    title: 'EZCOOL AC Servicing | Premium AC Service. Exceptional Comfort.',
    description:
      'EZCOOL AC Servicing — Premium AC Service. Exceptional Comfort. Expert AC repair, sanitization, installation, and precision cooling diagnostics.',
    siteName: 'EZCOOL AC Servicing',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EZCOOL AC Servicing | Premium AC Service. Exceptional Comfort.',
    description:
      'EZCOOL AC Servicing — Premium AC Service. Exceptional Comfort. Expert AC repair, sanitization, installation, and precision cooling diagnostics.',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Preload first-frame hero posters for instant paint without blank/black flash */}
        <link
          rel="preload"
          as="image"
          href="/hero-poster.jpg"
          media="(min-width: 768px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/hero-poster-mobile.jpg"
          media="(max-width: 767px)"
          fetchPriority="high"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-[#f4f9fd] text-[#0f2744] antialiased selection:bg-[#38bdf8] selection:text-[#0f2744] overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
