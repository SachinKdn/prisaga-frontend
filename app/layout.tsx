import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import ThemeProviderWrapper from '@providers/MUIprovider';
import { ReduxProvider } from '@providers/reduxProvider';
import MainLayout from '@components/MainLayout.tsx';
import ProtectedRoutes from '@components/ProtectRoutes';

export const metadata: Metadata = {
  title: 'Prisaga Hiring+',
  description: 'A product by Prisaga',
};

const favicons = [
  {
    rel: 'icon',
    href: '/favicon/light/favicon.ico',
    sizes: 'any',
    media: '(prefers-color-scheme: light)',
  },
  {
    rel: 'icon',
    href: '/favicon/light/favicon-32x32.png',
    sizes: '32x32',
    type: 'image/png',
    media: '(prefers-color-scheme: light)',
  },
  {
    rel: 'icon',
    href: '/favicon/light/favicon-16x16.png',
    sizes: '16x16',
    type: 'image/png',
    media: '(prefers-color-scheme: light)',
  },
  {
    rel: 'apple-touch-icon',
    href: '/favicon/light/apple-touch-icon.png',
    sizes: '180x180',
    media: '(prefers-color-scheme: light)',
  },
  {
    rel: 'manifest',
    href: '/favicon/light/site.webmanifest',
    media: '(prefers-color-scheme: light)',
  },
  {
    rel: 'icon',
    href: '/favicon/dark/favicon.ico',
    sizes: 'any',
    media: '(prefers-color-scheme: dark)',
  },
  {
    rel: 'icon',
    href: '/favicon/dark/favicon-32x32.png',
    sizes: '32x32',
    type: 'image/png',
    media: '(prefers-color-scheme: dark)',
  },
  {
    rel: 'icon',
    href: '/favicon/dark/favicon-16x16.png',
    sizes: '16x16',
    type: 'image/png',
    media: '(prefers-color-scheme: dark)',
  },
  {
    rel: 'apple-touch-icon',
    href: '/favicon/dark/apple-touch-icon.png',
    sizes: '180x180',
    media: '(prefers-color-scheme: dark)',
  },
  {
    rel: 'manifest',
    href: '/favicon/dark/site.webmanifest',
    media: '(prefers-color-scheme: dark)',
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" />
        {favicons.map((favicon, index) => (
          <link
            key={index}
            rel={favicon.rel}
            href={favicon.href}
            sizes={favicon.sizes}
            type={favicon.type}
            media={favicon.media}
          />
        ))}
      </head>
      <body>
        <ReduxProvider>
          <ThemeProviderWrapper>
            <ProtectedRoutes>
              <MainLayout>{children}</MainLayout>
            </ProtectedRoutes>
          </ThemeProviderWrapper>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                fontSize: '12px',
                fontWeight: '500',
              },
            }}
            reverseOrder={false}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
