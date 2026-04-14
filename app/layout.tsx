import type { Metadata } from 'next';
import { Inter, Outfit, DM_Sans } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });

export const metadata: Metadata = {
  title: 'Amkyaw AI',
  description: 'A premium Groq-powered AI web application built with Next.js 14.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} ${dmSans.variable} bg-background font-sans text-slate-100 antialiased`}>
        <div className='fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_25%),radial-gradient(circle_at_80%_15%,rgba(139,92,246,0.16),transparent_20%),linear-gradient(180deg,#030712_0%,#020617_45%,#020617_100%)]' />
        <div className='fixed inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.45)_1px,transparent_1px)] bg-[size:70px_70px] opacity-25' />
        <Navbar />
        <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>{children}</main>
      </body>
    </html>
  );
}
