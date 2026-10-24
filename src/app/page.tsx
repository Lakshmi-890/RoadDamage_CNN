import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Activity, 
  Crosshair,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { DAMAGE_CATEGORIES } from '@/lib/damageCategories';
import DamageCard from '@/components/DamageCard';
import WorkflowIllustration from '@/components/WorkflowIllustration';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Background Gradient Orbs */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-gradient-to-tr from-cyan-600/20 via-blue-600/20 to-indigo-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/3 -right-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-medium text-cyan-300 backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Next-Gen Computer Vision for Infrastructure</span>
                <span className="text-cyan-500/60">•</span>
                <span className="text-slate-300 font-mono">Stage 1 Prototype</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                AI-Powered{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                  Road Damage
                </span>{' '}
                Detection
              </h1>

              {/* Subtitle Description */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Harnessing deep convolutional neural networks and state-of-the-art YOLOv8 object detection 
                to automatically localize, classify, and assess asphalt surface distress in real time—protecting 
                motorists and empowering civil engineering infrastructure teams.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/detection"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:shadow-cyan-500/40 hover:opacity-95"
                >
                  <Crosshair className="h-4 w-4" />
                  <span>Start Detection</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/cnn-explorer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all duration-200 hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white"
                >
                  <Layers className="h-4 w-4 text-cyan-400" />
                  <span>Explore CNN</span>
                </Link>
              </div>

              {/* Highlight Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/5">
                <div>
                  <span className="block text-xl font-extrabold text-white">4 Classes</span>
                  <span className="text-xs text-slate-400">Standard RDD Taxonomy</span>
                </div>
                <div>
                  <span className="block text-xl font-extrabold text-cyan-400">YOLOv8</span>
                  <span className="text-xs text-slate-400">Deep Vision Backbone</span>
                </div>
                <div>
                  <span className="block text-xl font-extrabold text-white">60.4%</span>
                  <span className="text-xs text-slate-400">Baseline Precision</span>
                </div>
                <div>
                  <span className="block text-xl font-extrabold text-cyan-400">Zero GPU</span>
                  <span className="text-xs text-slate-400">Cloud Acceleration</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl border border-cyan-500/30 bg-[#0c1220]/90 p-4 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl">
                
                {/* Window header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-[11px] text-slate-400">detection_stream.yolov8</span>
                  </div>
                  <span className="rounded bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
                    Illustrative Demo Preview
                  </span>
                </div>

                {/* Road Image with Illustrative Example Bounding Box Overlays */}
                <div className="relative mt-3 h-64 sm:h-72 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/samples/pothole-sample.jpg"
                    alt="Illustrative sample road detection"
                    className="h-full w-full object-cover"
                  />

                  {/* Illustrative Bounding Box 1: Pothole */}
                  <div 
                    className="absolute border-2 border-rose-500 bg-rose-500/15 rounded transition-all duration-300"
                    style={{ left: '52%', top: '36%', width: '26%', height: '30%' }}
                  >
                    <span className="absolute -top-6 left-0 rounded bg-rose-600 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm flex items-center gap-1">
                      <span>Pothole (D40)</span>
                      <span className="text-rose-200">74%</span>
                    </span>
                  </div>

                  {/* Illustrative Bounding Box 2: Alligator Fatigue */}
                  <div 
                    className="absolute border-2 border-amber-400 bg-amber-500/15 rounded transition-all duration-300"
                    style={{ left: '24%', top: '59%', width: '22%', height: '26%' }}
                  >
                    <span className="absolute -top-6 left-0 rounded bg-amber-600 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm flex items-center gap-1">
                      <span>Alligator (D20)</span>
                      <span className="text-amber-200">61%</span>
                    </span>
                  </div>

                  {/* Radar Scanning Line Effect */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400 animate-radar-scan opacity-75" />
                </div>

                {/* Notice that this is an illustrative example */}
                <p className="mt-2 text-[10px] text-slate-400 text-center font-mono">
                  Illustrative example only — connect to real model on Detection page
                </p>

                {/* Mini Result Stream Indicator */}
                <div className="mt-2 flex items-center justify-between rounded-lg bg-slate-900/80 px-3 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-cyan-400" />
                    <span className="text-slate-300">Live Model:</span>
                    <span className="font-mono text-cyan-400 font-bold">YOLOv8 Online</span>
                  </div>
                  <Link 
                    href="/detection" 
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
                  >
                    <span>Open Detection Suite</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Project Overview & Four Damage Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            Pavement Distress Taxonomy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Four Core Road Damage Categories
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Aligned with international Road Damage Detection (RDD) benchmarks, our deep learning model 
            is trained to identify and categorize the four most critical structural asphalt failures.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DAMAGE_CATEGORIES.map((cat) => (
            <DamageCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Interactive Workflow Illustration */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <WorkflowIllustration />
      </section>

      {/* Callout Strip: Model Performance & Live Hugging Face Space */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-blue-950/40 via-[#0d1322] to-cyan-950/40 p-8 sm:p-10 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-full">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                <span>Verified Historical Baseline Evaluation</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Inspect Model Baseline Metrics & Architecture
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                Explore measured baseline evaluation results (Precision: 60.42%, Recall: 28.65%, mAP@50: 28.06%) 
                and review the YOLOv8 architectural framework before live Space connection in Stage 2.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3">
              <Link
                href="/performance"
                className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-5 py-3 text-xs font-bold text-slate-950 transition-colors shadow-lg shadow-cyan-500/20"
              >
                <span>View Performance Baseline</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://huggingface.co/spaces/nclakshmipriya/RoadDamageAI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
              >
                <span>Live Hugging Face Space</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
