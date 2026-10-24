'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Info, 
  Cpu, 
  Database,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { HISTORICAL_BASELINE_METRICS, MODEL_CLASSES, MODEL_SPECS } from '@/lib/metricsData';

export default function PerformancePage() {
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

  const toggleMetric = (name: string) => {
    setExpandedMetric(expandedMetric === name ? null : name);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <BarChart3 className="h-4 w-4" />
            <span>Evaluation Benchmark</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Model Performance
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Historical baseline evaluation metrics and validation benchmark analysis for RoadDamageAI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-3 py-1.5 text-xs font-mono text-cyan-300">
            Model: YOLOv8 Baseline
          </span>
        </div>
      </div>

      {/* Baseline Metric Disclaimer Banner */}
      <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-5 backdrop-blur-md">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-cyan-300">
              Recorded Test Split Baseline — Historical Evaluation Results
            </h4>
            <p className="text-xs leading-relaxed text-slate-300">
              The metrics shown below are <strong>historical model evaluation results</strong> measured on a held-out test split during baseline validation. They are static historical reference values, <strong>not live real-time metrics or guaranteed future performance</strong>. Real-world road conditions with diverse lighting, moisture, and road textures will yield varying performance.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Recorded Test Split Baseline Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/10 pb-3">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
              <span>Recorded Test Split Baseline</span>
            </h2>
            <p className="text-xs text-slate-400">
              Click any card to expand full mathematical definitions and benchmark context.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400">
            Historical Validation Split
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HISTORICAL_BASELINE_METRICS.map((metric) => {
            const isExpanded = expandedMetric === metric.name;
            return (
              <div
                key={metric.name}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6 backdrop-blur-xl transition-all duration-200 hover:border-cyan-500/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
                onClick={() => toggleMetric(metric.name)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {metric.label}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                      Baseline
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                      {metric.formatted}
                    </span>
                  </div>

                  {/* Progress bar visual indicator */}
                  <div className="space-y-1 pt-1">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-300 transition-all duration-700"
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-mono text-cyan-300/90 block font-medium">
                      {metric.benchmarkContext}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-300 pt-2 border-t border-white/5">
                    {metric.definition}
                  </p>

                  {/* Expandable Explanation Toggle */}
                  <div className="pt-2 flex items-center justify-between text-[11px] text-cyan-400 font-medium">
                    <span>{isExpanded ? 'Hide details' : 'View context'}</span>
                    {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </div>

                  {isExpanded && (
                    <div className="pt-2 border-t border-cyan-500/20 text-[11px] text-slate-300 bg-cyan-950/30 p-2.5 rounded-lg space-y-1">
                      <span className="font-semibold text-cyan-300 block">Interpretation:</span>
                      <p className="leading-relaxed">{metric.distressImpact}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analytical Discussion: Objective Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Precision vs Recall Analysis */}
        <div className="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6 backdrop-blur-xl space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-950 border border-blue-500/30 text-blue-400">
              <Info className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white">
              Precision (60.42%) vs Recall (28.65%) Analysis
            </h3>
          </div>
          <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              The difference between baseline Precision (<strong>60.42%</strong>) and Recall (<strong>28.65%</strong>) 
              indicates that <strong>missed detections are a concern</strong> on the evaluation test split. 
            </p>
            <p>
              While 6 out of 10 predicted boxes correspond to true positive damage instances (Precision = TP / (TP + FP)), 
              a recall of 28.65% (Recall = TP / (TP + FN)) reflects that more than 70% of ground-truth distress instances 
              present in the test split were not detected by this baseline model.
            </p>
          </div>
        </div>

        {/* mAP@50 vs mAP@50-95 Analysis */}
        <div className="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6 backdrop-blur-xl space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400">
              <Info className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white">
              Localization Strictness: mAP@50 (28.06%) vs mAP@50–95 (11.36%)
            </h3>
          </div>
          <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>mAP@50–95 is stricter about bounding-box localization than mAP@50.</strong> 
            </p>
            <p>
              While mAP@50 requires only a 50% spatial overlap (IoU ≥ 0.50) between predicted and ground-truth boxes, 
              mAP@50–95 calculates the mean precision across 10 progressive IoU thresholds (from 0.50 to 0.95 in 0.05 increments). 
              Because higher IoU thresholds demand near-perfect coordinate alignment, average precision drops from 28.06% to 11.36%.
            </p>
          </div>
        </div>

      </div>

      {/* Section 3: Confusion Matrix Section */}
      <div className="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6 sm:p-8 backdrop-blur-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Model Diagnostic Artifacts
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              Confusion Matrix
            </h3>
          </div>
          <span className="rounded bg-amber-950/60 border border-amber-500/30 px-3 py-1 text-xs font-medium text-amber-300">
            Awaiting validation artifact.
          </span>
        </div>

        {/* Informational Banner */}
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/40 p-8 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
            <Database className="h-6 w-6 text-cyan-400" />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <h4 className="text-base font-bold text-slate-200">
              No verified confusion matrix is currently available.
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              In accordance with project safety guidelines, no fabricated confusion matrix values, heatmaps, or synthetic counts are displayed. 
              The confusion matrix will be rendered directly from the actual validation output once the validation artifact is exported.
            </p>
          </div>

          {/* Model Class Reference based on exact model specification */}
          <div className="max-w-2xl mx-auto pt-2">
            <span className="text-xs font-mono text-slate-400 block mb-2 font-semibold text-left">
              Model Classes (4 target categories):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left font-mono text-xs">
              {MODEL_CLASSES.map((cls) => (
                <div key={cls.id} className="rounded-lg bg-slate-950/80 border border-white/5 p-2.5">
                  <span className="text-cyan-400 font-bold block">{cls.id}: {cls.name}</span>
                  <span className="text-slate-400 text-[11px]">{cls.label} ({cls.code})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ultralytics Validation Output Documentation */}
          <div className="max-w-xl mx-auto rounded-lg bg-slate-950/90 border border-white/5 p-4 text-left text-xs space-y-2 mt-4">
            <span className="text-[11px] font-mono text-cyan-300 font-semibold uppercase tracking-wider block">
              Validation Output Notice:
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Standard Ultralytics validation saves graphic artifacts such as <code className="text-cyan-400 font-mono">confusion_matrix.png</code> or <code className="text-cyan-400 font-mono">confusion_matrix_normalized.png</code> in the validation run directory. Numerical matrices or background/unmatched-detection categories will be incorporated once verified from the evaluation output format.
            </p>
          </div>
        </div>
      </div>

      {/* Model Technical Specifications */}
      <div className="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6 sm:p-8 backdrop-blur-xl space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Cpu className="h-5 w-5 text-cyan-400" />
          <span>Model Architecture Specifications</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MODEL_SPECS.map((spec) => (
            <div
              key={spec.label}
              className="flex items-center justify-between rounded-xl bg-slate-900/50 border border-white/5 p-3.5 text-xs"
            >
              <span className="text-slate-400 font-medium">{spec.label}</span>
              <span className="font-mono font-semibold text-slate-200 text-right">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
