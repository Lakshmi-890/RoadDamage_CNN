'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, ShieldCheck, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050810] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & Purpose */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold text-sm">
                RD
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                RoadDamage<span className="text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Interactive deep learning computer vision dashboard for automated roadway surface distress detection, classification, and civil infrastructure inspection.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-cyan-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Safe Stage 1 Isolated Implementation</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase">
              Application Pages
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Home (Overview & Distress Taxonomy)
                </Link>
              </li>
              <li>
                <Link href="/detection" className="hover:text-cyan-400 transition-colors">
                  Detection Prototype (Demo Mode)
                </Link>
              </li>
              <li>
                <Link href="/cnn-explorer" className="hover:text-cyan-400 transition-colors">
                  CNN Pipeline Explorer
                </Link>
              </li>
              <li>
                <Link href="/performance" className="hover:text-cyan-400 transition-colors">
                  Model Baseline Performance
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About Project & Limitations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Distress Classes */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase">
              Supported Distress Classes
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                <span>Longitudinal Crack (D00)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                <span>Transverse Crack (D10)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                <span>Alligator Crack (D20)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                <span>Pothole (D40)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Technology & Space Link */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-slate-300">Next.js 16</span>
              <span className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-slate-300">React 19</span>
              <span className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-slate-300">TypeScript</span>
              <span className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-slate-300">Tailwind CSS</span>
              <span className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-slate-300">YOLOv8 Vision</span>
              <span className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-slate-300">Gradio 5.50.0</span>
            </div>

            <div className="pt-2">
              <a
                href="https://huggingface.co/spaces/nclakshmipriya/RoadDamageAI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <span>Hugging Face Space: nclakshmipriya/RoadDamageAI</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 RoadDamageAI Interactive — Created by{' '}
            <span className="text-slate-300 font-medium">Nagapatla Chenchu Lakshmi Priya</span>.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 rounded bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-400 border border-slate-800">
              <Terminal className="h-3 w-3 text-cyan-400" /> Stage 2: Live Model Connected
            </span>
            <span className="text-slate-600">|</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
