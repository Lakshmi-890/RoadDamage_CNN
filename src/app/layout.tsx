import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RoadDamageAI — AI-Powered Road Surface Damage Detection',
  description:
    'Interactive deep learning computer vision dashboard for detecting, localizing, and classifying road surface damages (cracks and potholes) using YOLOv8.',
  keywords: [
    'Road Damage Detection',
    'Computer Vision',
    'YOLOv8',
    'Deep Learning',
    'Pothole Detection',
    'Crack Detection',
    'Asphalt Inspection',
    'Infrastructure AI',
  ],
  authors: [{ name: 'Nagapatla Chenchu Lakshmi Priya' }],
  openGraph: {
    title: 'RoadDamageAI — Interactive Road Damage Detection',
    description: 'Deep learning vision suite for automated road pavement distress inspection.',
    url: 'https://huggingface.co/spaces/nclakshmipriya/RoadDamageAI',
    siteName: 'RoadDamageAI',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#070a12] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
