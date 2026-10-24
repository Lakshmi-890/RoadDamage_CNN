'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  HelpCircle, 
  Cpu, 
  AlertTriangle, 
  ExternalLink, 
  CheckCircle2, 
  Compass, 
  ArrowRight,
  User
} from 'lucide-react';
import { DAMAGE_CATEGORIES } from '@/lib/damageCategories';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <HelpCircle className="h-4 w-4" />
            <span>Project Documentation & Technical Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            About RoadDamageAI
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Automating roadway surface distress inspection through computer vision and deep learning.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://huggingface.co/spaces/nclakshmipriya/RoadDamageAI"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-200 hover:border-cyan-500/40 hover:text-white transition-colors"
          >
            <span className="text-amber-400">🤗</span>
            <span>Hugging Face Space</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* 1. Project Purpose & Motivation */}
      <section className="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6 sm:p-8 backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          <Compass className="h-4 w-4" />
          <span>Core Mission</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          Why RoadDamageAI? The Infrastructure Imperative
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Traditional road pavement inspection relies heavily on manual visual surveys, where human inspectors 
            walk along high-speed corridors or drive specialized sensor vans. This process is time-consuming, subjective, 
            prohibitively expensive for local municipalities, and exposes surveyors to acute roadside traffic hazards.
          </p>
          <p>
            <strong>RoadDamageAI</strong> bridges this gap by leveraging automated computer vision. By mounting standard 
            optical cameras or dashcams onto municipal vehicles, public transit buses, or maintenance patrol cars, 
            asphalt distress can be captured continuously. Deep learning models evaluate and index damages with spatial coordinates, 
            allowing civil road authorities to prioritize repairs before small cracks deteriorate into hazardous potholes.
          </p>
        </div>
      </section>

      {/* 2. The Four Supported Damage Categories */}
      <section className="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6 sm:p-8 backdrop-blur-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Taxonomy Breakdown
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">
              Four Supported Damage Categories
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">International RDD Standard</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DAMAGE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="rounded-xl border border-white/5 bg-slate-900/50 p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-xs font-bold px-2 py-0.5 rounded border"
                    style={{
                      color: cat.colorHex,
                      borderColor: `${cat.colorHex}40`,
                      backgroundColor: `${cat.colorHex}15`,
                    }}
                  >
                    {cat.code}
                  </span>
                  <h3 className="text-base font-bold text-white">{cat.name}</h3>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cat.borderColor} ${cat.badgeBg} ${cat.badgeText}`}>
                  {cat.urgency} Urgency
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {cat.description}
              </p>

              <div className="space-y-1 text-[11px] text-slate-400">
                <div className="font-semibold text-slate-300">Failure Mechanism:</div>
                <ul className="list-disc pl-4 space-y-0.5">
                  {cat.primaryCauses.map((cause, i) => (
                    <li key={i}>{cause}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-white/5 text-[11px] text-slate-300">
                <span className="font-semibold text-cyan-400">Standard Repair: </span>
                <span>{cat.typicalRepair}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. How Image-Based Detection Works */}
      <section className="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6 sm:p-8 backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          <Cpu className="h-4 w-4" />
          <span>Computer Vision Pipeline</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          How Image-Based Road Distress Detection Works
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl bg-slate-900/60 border border-white/5 p-4 space-y-2">
            <div className="text-xs font-bold text-cyan-300 font-mono">01. Spatial Convolutions</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Optical RGB images are normalized into 640×640 tensors. Learnable convolutional kernels compute spatial gradient dot-products, capturing high-frequency asphalt textures and dark crack boundaries.
            </p>
          </div>
          <div className="rounded-xl bg-slate-900/60 border border-white/5 p-4 space-y-2">
            <div className="text-xs font-bold text-cyan-300 font-mono">02. Multi-Scale Neck (PANet)</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Path Aggregation Networks combine high-resolution spatial maps (for narrow hairline cracks) with deep semantic feature maps (for large pothole contexts) across multiple receptive field scales.
            </p>
          </div>
          <div className="rounded-xl bg-slate-900/60 border border-white/5 p-4 space-y-2">
            <div className="text-xs font-bold text-cyan-300 font-mono">03. Anchor-Free Regression & NMS</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Decoupled heads independently predict bounding box distances and class probabilities. Non-Maximum Suppression (NMS) removes duplicate overlapping detections to retain the single most confident bounding box.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Current Model & Limitations */}
      <section className="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6 sm:p-8 backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
          <AlertTriangle className="h-4 w-4" />
          <span>Engineering Realism</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          Current Model Capabilities & Operational Limitations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="space-y-3 rounded-xl bg-slate-900/40 border border-white/5 p-5">
            <h3 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Proven Strengths</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300 list-disc pl-4">
              <li>Strong baseline precision (60.42%) on distinct potholes and pronounced longitudinal joint cracks.</li>
              <li>Real-time single-stage inference capability suitable for high-frame-rate dashcam feeds.</li>
              <li>Standardized output coordinates compatible with GIS mapping and civil asset databases.</li>
            </ul>
          </div>

          <div className="space-y-3 rounded-xl bg-slate-900/40 border border-white/5 p-5">
            <h3 className="font-bold text-rose-400 text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Current Technical Limitations</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300 list-disc pl-4">
              <li><strong>Lower Baseline Recall (28.65%):</strong> Conservative confidence thresholding causes faint hairline cracks and dust-covered fissures to be missed.</li>
              <li><strong>Lighting & Weather Sensitivity:</strong> Wet pavement reflections, rain puddles, and deep tree shadows introduce artifacts that can deceive convolutional filters.</li>
              <li><strong>Domain Shifts:</strong> Performance may degrade on rural unpaved roads, gravel, brick, or cobblestone surfaces unrepresented in the primary training dataset.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Distinction Between Demo Mode and Real Model Inference */}
      <section className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-blue-950/40 via-[#0d1424] to-cyan-950/40 p-6 sm:p-8 backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          <ShieldCheck className="h-4 w-4" />
          <span>Stage 1 vs Stage 2 Scope</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          Distinction Between Demo Mode & Real Model Inference
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="rounded-xl bg-slate-900/70 border border-slate-700 p-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200">Stage 1: Frontend Foundation & Architecture</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Established the responsive user interface, design system, interactive CNN visualizer, 
              preset road damage samples, confidence threshold sliders, and baseline model performance documentation.
            </p>
          </div>

          <div className="rounded-xl bg-slate-900/70 border border-cyan-500/40 p-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-cyan-300">Stage 2: Live Hugging Face Space Connection (Active)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Connects the detection suite via a secure Next.js server route (<code className="text-cyan-300 font-mono">/api/detect</code>) to the live deployed Hugging Face Space (<code className="text-cyan-300 font-mono">nclakshmipriya/RoadDamageAI</code>) using the official <code className="text-cyan-300 font-mono">@gradio/client</code>, returning authentic YOLOv8 annotated images and parsed distress detection dataframes.
            </p>
          </div>
        </div>
      </section>

      {/* Author and Project Metadata */}
      <section className="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold text-base">
            <User className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-mono text-cyan-400 block">Project Lead & Developer</span>
            <h3 className="text-base font-bold text-white">Nagapatla Chenchu Lakshmi Priya</h3>
            <span className="text-xs text-slate-400">RoadDamageAI Computer Vision Suite</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/detection"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-cyan-500/20 hover:opacity-95 transition-opacity"
          >
            <span>Launch Detection Suite</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
