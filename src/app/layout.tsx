import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { BRAND_CONFIG } from '@/lib/brand';
import '@/styles/globals.css';

const fraunces = localFont({
  src: '../../public/fonts/fraunces-latin-wght-normal.woff2',
  variable: '--font-display',
  display: 'swap',
  weight: '100 900',
});

const inter = localFont({
  src: '../../public/fonts/inter-latin-wght-normal.woff2',
  variable: '--font-body',
  display: 'swap',
  weight: '100 900',
});

const spaceMono = localFont({
  src: [
    {
      path: '../../public/fonts/space-mono-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/space-mono-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
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
