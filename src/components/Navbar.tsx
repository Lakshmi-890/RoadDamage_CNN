'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Layers, 
  ExternalLink,
  BarChart3, 
  HelpCircle, 
  Eye
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', href: '/', icon: Eye },
  { name: 'Detection', href: '/detection', icon: Eye },
  { name: 'CNN Explorer', href: '/cnn-explorer', icon: Layers },
  { name: 'Model Performance', href: '/performance', icon: BarChart3 },
  { name: 'About', href: '/about', icon: HelpCircle },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#070a12]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Road-AI Icon */}
        <Link 
          href="/" 
          className="group flex items-center gap-3 transition-opacity hover:opacity-95"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-sky-400 p-[1px] shadow-lg shadow-cyan-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#090d18]">
              {/* Custom Road AI Icon: Two road lanes with AI detection bounding box */}
              <svg className="h-5 w-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Road Perspective */}
                <path d="M4 19L9 5" stroke="currentColor" strokeOpacity="0.5" />
                <path d="M20 19L15 5" stroke="currentColor" strokeOpacity="0.5" />
                <line x1="12" y1="7" x2="12" y2="10" stroke="currentColor" strokeDasharray="2 2" />
                <line x1="12" y1="14" x2="12" y2="18" stroke="currentColor" strokeDasharray="2 2" />
                {/* AI Target Box */}
                <rect x="8" y="9" width="8" height="6" rx="1.5" stroke="#38bdf8" strokeWidth="1.8" className="animate-pulse" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white text-lg">
                RoadDamage<span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-2 py-0.5 text-[11px] font-medium text-cyan-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                Live YOLOv8 Model
              </span>
            </div>
            <span className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
              Deep Learning Vision Suite
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Links */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://huggingface.co/spaces/nclakshmipriya/RoadDamageAI"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-cyan-500/50 hover:text-white hover:bg-slate-850"
            title="Open existing live Hugging Face Space"
          >
            <span className="text-amber-400 text-sm">🤗</span>
            <span>Hugging Face Space</span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </a>

          <Link
            href="/detection"
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-cyan-500/20 transition-all hover:opacity-95 hover:shadow-cyan-500/30"
          >
            <span>Live Detection</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#070a12]/98 px-4 pt-3 pb-6 space-y-2 backdrop-blur-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Navigation Menu</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-2 py-0.5 text-[10px] font-medium text-cyan-300">
              Live YOLOv8 Model
            </span>
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                {item.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-white/5 space-y-2">
            <a
              href="https://huggingface.co/spaces/nclakshmipriya/RoadDamageAI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300"
            >
              <div className="flex items-center gap-2">
                <span className="text-amber-400">🤗</span>
                <span>Original Hugging Face Space</span>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
