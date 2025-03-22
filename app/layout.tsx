import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import ThemeProviderWrapper from '@providers/MUIprovider';
import { ReduxProvider } from '@providers/reduxProvider';
import MainLayout from '@components/MainLayout.tsx';
import ProtectedRoutes from '@components/ProtectRoutes';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" />
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
