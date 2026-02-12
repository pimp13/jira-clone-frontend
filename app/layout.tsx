import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Apophis',
  description:
    'Apophis is pouya ghazanfary weblog website',
  authors: [{name: 'Pouya-Ghazanfary', url: 'https://apophis.ir'}],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.info(
    'i love typescript i love backend and frontend and i love golang!',
  );

  return (
    <html lang="en">
      <body className={cn(inter.className, 'antialiased min-h-screen')}>
        <NuqsAdapter>
          <Sonner />
          {children}
        </NuqsAdapter>
      </body>
    </html>
  );
}
