import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Capitalized Fireside',
  description: 'Africa in the Age of AI · How to evolve and win with AI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#fafafa] text-[#0b1220] antialiased font-sans">{children}</body>
    </html>
  );
}


