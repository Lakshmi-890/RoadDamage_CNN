'use client';

import React, { useState } from 'react';
import { Camera, RefreshCw, Cpu, Crosshair, CheckCircle2 } from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Camera Ingestion',
    short: 'Capture',
    icon: Camera,
    color: 'from-blue-600 to-cyan-600',
    borderColor: 'border-blue-500/30',
    description: 'Vehicle dashboard cameras, smartphone mounts, or UAV drone optical sensors capture real-world pavement video or still imagery.',
    specs: 'Standard RGB optical sensor / 1080p-4K resolution'
  },
  {
    step: '02',
    title: 'Tensor Preprocessing',
    short: 'Normalize',
    icon: RefreshCw,
    color: 'from-cyan-600 to-teal-500',
    borderColor: 'border-cyan-500/30',
    description: 'Images are letterboxed and scaled to 640×640 pixels. Floating-point pixel normalization stabilizes neural gradients.',
    specs: 'Input Tensor: [1, 3, 640, 640] float32'
  },
  {
    step: '03',
    title: 'Deep Feature Extraction',
    short: 'Backbone',
    icon: Cpu,
    color: 'from-indigo-600 to-blue-500',
    borderColor: 'border-indigo-500/30',
    description: 'CSPDarknet backbone and C2f cross-stage attention modules extract multi-scale spatial textures across asphalt surfaces.',
    specs: 'Multi-scale Pyramids: P3, P4, P5 feature maps'
  },
  {
    step: '04',
    title: 'Anchor-Free Prediction',
    short: 'Localization',
    icon: Crosshair,
    color: 'from-amber-600 to-orange-500',
    borderColor: 'border-amber-500/30',
    description: 'Decoupled heads independently predict bounding box coordinates [x1, y1, x2, y2] and 4-class distress probabilities.',
    specs: 'NMS (Non-Maximum Suppression) IoU filtering'
  },
  {
    step: '05',
    title: 'Actionable Reporting',
    short: 'Report',
    icon: CheckCircle2,
    color: 'from-emerald-600 to-teal-500',
    borderColor: 'border-emerald-500/30',
    description: 'Detections are mapped to standard RDD distress codes (D00, D10, D20, D40) with repair urgency ratings for civil engineers.',
    specs: 'JSON / Table / Overlay visualization export'
  }
];

export default function WorkflowIllustration() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#0d1424]/70 p-6 sm:p-8 backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            Computer Vision Architecture
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            End-to-End Road Damage Detection Workflow
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Click any stage to inspect inner mechanics</span>
        </div>
      </div>

      {/* Step Buttons / Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 my-6">
        {WORKFLOW_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isCurrent = activeStep === idx;
          return (
            <button
              key={step.step}
              onClick={() => setActiveStep(idx)}
              className={`relative flex flex-col items-start p-4 rounded-xl text-left transition-all duration-200 border ${
                isCurrent
                  ? 'border-cyan-400/50 bg-cyan-950/40 shadow-lg shadow-cyan-500/15'
                  : 'border-white/5 bg-slate-900/40 hover:bg-slate-800/50 hover:border-white/10'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className={`text-xs font-mono font-bold ${isCurrent ? 'text-cyan-400' : 'text-slate-500'}`}>
                  {step.step}
                </span>
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${step.color} text-white`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
              </div>
              <span className={`text-sm font-semibold ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                {step.short}
              </span>
              <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detailed Active Stage Panel */}
      <div className="rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/30 via-slate-900/40 to-slate-900/20 p-5 sm:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                Stage {WORKFLOW_STEPS[activeStep].step}
              </span>
              <h4 className="text-lg font-bold text-white">
                {WORKFLOW_STEPS[activeStep].title}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {WORKFLOW_STEPS[activeStep].description}
            </p>
          </div>

          <div className="rounded-lg bg-slate-900/90 border border-white/10 px-4 py-3 shrink-0 text-left">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              Technical Specification
            </span>
            <span className="text-xs font-mono font-medium text-cyan-300 mt-0.5 block">
              {WORKFLOW_STEPS[activeStep].specs}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
