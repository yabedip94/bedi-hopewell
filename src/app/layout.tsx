import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, Space_Mono } from 'next/font/google';
import { BRAND_CONFIG } from '@/lib/brand';
import '@/styles/globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`,
    template: `%s | ${BRAND_CONFIG.name}`,
  },
  description: BRAND_CONFIG.meta.description,
  authors: [{ name: BRAND_CONFIG.name }],
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: BRAND_CONFIG.colors.oceanNavy,
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

