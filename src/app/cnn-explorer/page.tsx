'use client';

import React, { useState } from 'react';
import { 
  Cpu, 
  Target, 
  Info, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { CNN_STAGES } from '@/lib/cnnData';

// Interactive 3x3 Convolution Kernel Presets for the interactive simulator widget
const KERNEL_PRESETS = [
  {
    name: 'Vertical Edge Kernel (Sobel-X)',
    targetDistress: 'Longitudinal Cracks (D00)',
    matrix: [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1],
    ],
    description: 'Calculates horizontal intensity gradients, highlighting vertical line fractures parallel to traffic lanes.',
  },
  {
    name: 'Horizontal Edge Kernel (Sobel-Y)',
    targetDistress: 'Transverse Cracks (D10)',
    matrix: [
      [-1, -2, -1],
      [ 0,  0,  0],
      [ 1,  2,  1],
    ],
    description: 'Calculates vertical intensity gradients, isolating thermal cracks crossing perpendicularly across roadways.',
  },
  {
    name: 'Laplacian Edge (Omnidirectional)',
    targetDistress: 'Pothole Cavities (D40)',
    matrix: [
      [ 0, -1,  0],
      [-1,  4, -1],
      [ 0, -1,  0],
    ],
    description: 'Second-order derivative operator detecting abrupt multi-directional boundaries enclosing pothole perimeters.',
  },
  {
    name: 'High-Pass Sharpen Kernel',
    targetDistress: 'Alligator Fatigue Mesh (D20)',
    matrix: [
      [ 0, -1,  0],
      [-1,  5, -1],
      [ 0, -1,  0],
    ],
    description: 'Emphasizes high-frequency polygon junctions and fine cracks while muting uniform asphalt background.',
  },
];

export default function CNNExplorerPage() {
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);
  const [selectedKernelIndex, setSelectedKernelIndex] = useState<number>(0);

  const activeStage = CNN_STAGES[selectedStageIndex];
  const activeKernel = KERNEL_PRESETS[selectedKernelIndex];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <BookOpen className="h-4 w-4" />
            <span>Educational Deep Learning Visualizer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            CNN Pipeline Explorer
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Interactive, beginner-friendly walkthrough of how convolutional neural networks transform raw asphalt pixels into classified road distress bounding boxes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-3 py-1.5 text-xs font-mono text-cyan-300">
            Illustrative Educational Visualization
          </span>
        </div>
      </div>

      {/* Critical Architecture Callout: YOLOv8 vs Sequential CNN */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-blue-950/40 via-[#0d1424] to-cyan-950/40 p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 shrink-0">
            <Cpu className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Crucial Model Architecture Clarification
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Why RoadDamageAI Employs YOLOv8 Rather Than A Simple Sequential CNN
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              While classical computer vision education teaches sequential CNNs (like LeNet or simple VGG-style linear stacks), 
              the deployed model in <strong>RoadDamageAI is YOLOv8</strong> (Ultralytics). Real-time road damage detection requires 
              both <em>classification</em> (what kind of crack?) and <em>localization</em> (where on the road is it, and how large?).
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              YOLOv8 utilizes a sophisticated <strong>CSPDarknet backbone</strong> with <strong>C2f (Cross-Stage Partial)</strong> spatial attention modules, 
              a <strong>PANet (Path Aggregation Network)</strong> multi-scale feature pyramid neck, and <strong>decoupled anchor-free detection heads</strong>. 
              The pipeline below simplifies these concepts into sequential stages to teach core convolutional principles.
            </p>
          </div>
        </div>
      </div>

      {/* Pipeline Stepper / Stages Navigator */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold uppercase tracking-wider">Pipeline Stages (Click to Inspect)</span>
          <span className="font-mono text-cyan-400">Stage {activeStage.stepNumber} of {CNN_STAGES.length}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {CNN_STAGES.map((stage, idx) => {
            const isSelected = selectedStageIndex === idx;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageIndex(idx)}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/50 shadow-md shadow-cyan-500/20'
                    : 'border-white/5 bg-slate-900/40 hover:bg-slate-800/60 hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                    0{stage.stepNumber}
                  </span>
                  <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-cyan-400 animate-ping' : 'bg-slate-700'}`} />
                </div>
                <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {stage.shortName}
                </span>
                <span className="text-[10px] font-mono text-slate-500 mt-1 line-clamp-1">
                  {stage.tensorShape.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep-Dive Card */}
      <div className="rounded-2xl border border-white/10 bg-[#0d1424]/90 p-6 sm:p-8 backdrop-blur-xl space-y-6">
        
        {/* Stage Header Info */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                Stage 0{activeStage.stepNumber}
              </span>
              <span className="text-xs text-slate-400 font-mono">Tensor Flow Node</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {activeStage.title}
            </h2>
            <p className="text-xs sm:text-sm text-cyan-300/90 font-medium">
              {activeStage.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <div className="rounded-lg bg-slate-900/90 border border-white/10 px-3 py-2">
              <span className="text-[10px] text-slate-500 block">Tensor Dimensions</span>
              <span className="text-cyan-300 font-bold">{activeStage.tensorShape}</span>
            </div>
            <div className="rounded-lg bg-slate-900/90 border border-white/10 px-3 py-2">
              <span className="text-[10px] text-slate-500 block">Receptive Field</span>
              <span className="text-slate-200 font-medium">{activeStage.receptiveField}</span>
            </div>
          </div>
        </div>

        {/* 2-Column Content: Detailed Explanation & Distress Relevance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Column 1: Core Mechanics */}
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-900/50 border border-white/5 p-4 space-y-2">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Info className="h-3.5 w-3.5 text-cyan-400" />
                <span>Beginner-Friendly Explanation</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeStage.description}
              </p>
            </div>

            <div className="rounded-xl bg-slate-900/50 border border-white/5 p-4 space-y-2">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span>Mathematical Foundation</span>
              </h4>
              <p className="text-xs font-mono text-cyan-200 bg-black/40 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                {activeStage.mathematicalConcept}
              </p>
            </div>
          </div>

          {/* Column 2: Distress Relevance & YOLOv8 Engineering */}
          <div className="space-y-4">
            <div className="rounded-xl bg-cyan-950/20 border border-cyan-500/20 p-4 space-y-2">
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                <Target className="h-3.5 w-3.5 text-cyan-400" />
                <span>Road Distress Application Relevance</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeStage.distressRelevance}
              </p>
            </div>

            <div className="rounded-xl bg-slate-900/50 border border-white/5 p-4 space-y-2">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Cpu className="h-3.5 w-3.5 text-blue-400" />
                <span>YOLOv8 Modern Implementation</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeStage.yoloArchitectureContext}
              </p>
            </div>
          </div>

        </div>

        {/* Feature Maps Slices Gallery for this stage */}
        {activeStage.mockFeatureMaps && activeStage.mockFeatureMaps.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Simulated Feature Activation Channels (Illustrative Slices)
              </h4>
              <span className="text-[10px] text-slate-500 font-mono">Illustrative Mock Activations</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeStage.mockFeatureMaps.map((map, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/5 bg-slate-950/60 p-3 space-y-2"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-white">{map.label}</span>
                    <span className="text-[10px] text-cyan-400 font-mono">{map.filterType}</span>
                  </div>
                  {/* Visual simulated feature grid */}
                  <div className="h-20 w-full rounded bg-gradient-to-br from-slate-900 to-[#070b14] border border-slate-800 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:8px_8px]" />
                    <span className="text-[11px] font-mono text-cyan-400/80 z-10">
                      Channel #{i + 1}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {map.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stepper Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs">
          <button
            onClick={() => setSelectedStageIndex(Math.max(0, selectedStageIndex - 1))}
            disabled={selectedStageIndex === 0}
            className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            ← Previous Stage
          </button>

          <span className="text-slate-500 font-mono text-[11px]">
            Stage {selectedStageIndex + 1} of {CNN_STAGES.length}
          </span>

          <button
            onClick={() => setSelectedStageIndex(Math.min(CNN_STAGES.length - 1, selectedStageIndex + 1))}
            disabled={selectedStageIndex === CNN_STAGES.length - 1}
            className="px-3.5 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/60 text-cyan-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Next Stage →
          </button>
        </div>

      </div>

      {/* Interactive 3x3 Convolution Kernel Playground */}
      <div className="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6 sm:p-8 backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Hands-On Mini Simulator
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              Interactive 3×3 Convolution Kernel Matrix Explorer
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Select a filter kernel below to observe how discrete spatial weights highlight different road distress geometries.
            </p>
          </div>
          <span className="rounded bg-slate-900 border border-white/10 px-2.5 py-1 text-[11px] font-mono text-slate-400">
            Kernel Size: 3 × 3 (9 Weights)
          </span>
        </div>

        {/* Kernel Selection Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {KERNEL_PRESETS.map((kernel, idx) => {
            const isSelected = selectedKernelIndex === idx;
            return (
              <button
                key={kernel.name}
                onClick={() => setSelectedKernelIndex(idx)}
                className={`flex flex-col text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/50 shadow-sm shadow-cyan-500/20'
                    : 'border-white/5 bg-slate-900/40 hover:bg-slate-800/60'
                }`}
              >
                <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {kernel.name}
                </span>
                <span className="text-[11px] font-mono text-cyan-400 mt-1">
                  Target: {kernel.targetDistress}
                </span>
              </button>
            );
          })}
        </div>

        {/* Matrix Display & Description */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center rounded-xl bg-slate-950/70 border border-white/5 p-5">
          
          {/* 3x3 Matrix Grid */}
          <div className="md:col-span-5 flex flex-col items-center">
            <span className="text-[11px] font-mono text-slate-400 mb-2">
              Active Convolution Weight Matrix [3 × 3]
            </span>
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-900 border border-cyan-500/30">
              {activeKernel.matrix.flat().map((weight, i) => (
                <div
                  key={i}
                  className={`flex h-12 w-12 items-center justify-center rounded-lg font-mono text-sm font-bold border ${
                    weight > 0
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : weight < 0
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {weight > 0 ? `+${weight}` : weight}
                </div>
              ))}
            </div>
          </div>

          {/* Description & Impact */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">{activeKernel.name}</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 font-mono">
                {activeKernel.targetDistress}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeKernel.description}
            </p>
            <div className="rounded-lg bg-slate-900/80 p-3 text-[11px] text-slate-400 border border-white/5">
              <span className="text-slate-200 font-semibold">Convolution Calculation: </span>
              In YOLOv8, these filters are not hand-engineered like classical Sobel filters. Instead, all weights are learned autonomously through backpropagation on thousands of annotated road distress training images.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
