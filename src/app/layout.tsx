import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MovieRec - Movie Recommendations',
  description: 'Discover your next favorite movie with MovieRec',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <ErrorBoundary>
                  {children}
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}