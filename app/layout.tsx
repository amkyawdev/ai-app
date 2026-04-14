import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Amkyaw AI - Smart AI Assistant',
  description: 'A next-generation AI assistant with ultra-fast token streaming.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} bg-[#0a0a0a] font-sans text-white antialiased`}>
        {/* Background */}
        <div className='fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,242,255,0.08),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.08),transparent_40%)]' />
        
        <Navbar />
        <main className='pt-16 min-h-screen'>
          {children}
        </main>
      </body>
    </html>
  );
}
