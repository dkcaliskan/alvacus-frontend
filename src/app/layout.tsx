// Api & Core imports
import NextTopLoader from 'nextjs-toploader';

// UI & Icon imports
import './globals.css';

// Components
import Navbar from '@/components/Navigation/Navbar';
import Provider from './Provider';
import GoogleAnalytics from '@/components/Shared/GoogleAnalytics';

// Constants
import { KEYWORDS, DESCRIPTION } from '@/constants/AppConstants';

// Types
import type { Metadata, Viewport } from 'next';

type RootLayoutTypes = {
  children: React.ReactNode;
};

// Font
import { Alexandria } from 'next/font/google';
const alexandria = Alexandria({ subsets: ['latin'] });

// Metadata
export const metadata: Metadata = {
  title: {
    template: '%s | Alvacus',
    default: 'Alvacus',
  },
  description: DESCRIPTION,
  manifest: '/assets/icons/core/site.webmanifest',
  generator: 'Alvacus',
  keywords: KEYWORDS,
  authors: [{ name: 'Doğu Kaan Çalışkan' }],
  creator: 'Doğu Kaan Çalışkan',
  publisher: 'Doğu Kaan Çalışkan',
  metadataBase: new URL('https://www.alvacus.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Alvacus',
    description: DESCRIPTION,
    url: 'https://alvacus.com',
    siteName: 'alvacus',
    images: [
      {
        url: 'https://alvacus.com/assets/icons/core/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'Alvacus logo',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@alvacus',
    title: 'Alvacus',
    description: DESCRIPTION,
    images: [
      'https://alvacus.com/assets/icons/core/android-chrome-512x512.png',
    ],
  },

  /* verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
  }, */
};

export const viewport: Viewport = {
  themeColor: '#121212',
};

export default function RootLayout({ children }: RootLayoutTypes) {
  return (
    <html lang='en'>
      <body className={alexandria.className}>
        <GoogleAnalytics />
        <Provider>
          <>
            <NextTopLoader
              color='#d99c32'
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing='ease'
              speed={200}
              shadow='0 0 10px #d99c32, 0 0 5px #d99c32'
            />
            <Navbar />
            <main className=''>{children}</main>
          </>
        </Provider>
      </body>
    </html>
  );
}
