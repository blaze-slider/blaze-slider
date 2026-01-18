import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Instrument_Serif } from 'next/font/google';
import type { Metadata } from 'next';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
});

const title = 'Blaze Slider';
const description =
  'A high-performance, lightweight carousel library built for speed with zero layout shifts and minimal bundle size. 30x faster than Slick, 2KB gzipped.';

export const metadata: Metadata = {
  metadataBase: new URL('https://blaze-slider.dev'),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  keywords: [
    'slider',
    'carousel',
    'javascript',
    'typescript',
    'react',
    'zero layout shift',
    'swiper alternative',
    'slick alternative',
  ],
  authors: [{ name: 'Manan Tank', url: 'https://manantank.dev' }],
  creator: 'Manan Tank',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blaze-slider.dev',
    siteName: title,
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col font-sans">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
