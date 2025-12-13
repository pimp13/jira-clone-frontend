import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'JiraClone For Next And Nest js',
  description:
    'Jira Clone Application Programmer Pouya Meke by NextJs and NestJs',
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
        {children}
      </body>
    </html>
  );
}
