'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Upload, 
  Crosshair, 
  Sliders, 
  AlertCircle, 
  CheckCircle2, 
  Image as ImageIcon, 
  RefreshCw, 
  Info, 
  ExternalLink,
  ChevronRight,
  Eye,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { RealModelDetectionResult } from '@/types';
import { SAMPLE_IMAGES, runHuggingFaceDetection } from '@/lib/detection';

export default function DetectionPage() {
  const [selectedImageSrc, setSelectedImageSrc] = useState<string>('/samples/pothole-sample.jpg');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSampleId, setSelectedSampleId] = useState<string>('sample-pothole');
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(0.25);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('⏳ Waking up AI model from Hugging Face (30-60s cold start first time)...');
  const [realResult, setRealResult] = useState<RealModelDetectionResult | null>(null);
  const [activeView, setActiveView] = useState<'annotated' | 'original'>('annotated');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectSample = (sampleId: string) => {
    const sample = SAMPLE_IMAGES.find((s) => s.id === sampleId);
    if (!sample) return;
    setSelectedSampleId(sample.id);
    setSelectedImageSrc(sample.src);
    setSelectedFile(null);
    setErrorMsg(null);
    setRealResult(null); // Clear previous inference results
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Invalid file format. Please upload a valid road image (JPEG, PNG, WebP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File exceeds 10 MB limit. Please select a smaller image.');
      return;
    }

    setSelectedFile(file);
    setSelectedSampleId('');
    setErrorMsg(null);
    setRealResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setSelectedImageSrc(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Invalid file format. Please upload an image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File exceeds 10 MB limit. Please select a smaller image.');
      return;
    }

    setSelectedFile(file);
    setSelectedSampleId('');
    setErrorMsg(null);
    setRealResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setSelectedImageSrc(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRunRealDetection = async () => {
    if (!selectedImageSrc && !selectedFile) {
      setErrorMsg('Please select or upload a road image before running detection.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    // Staged loading indicators
    setLoadingStep('⏳ Waking up AI model from Hugging Face (30-60s cold start first time)...');
    const timer1 = setTimeout(() => {
      setLoadingStep('Connecting to Hugging Face Space (nclakshmipriya/RoadDamageAI)...');
    }, 5000);
    const timer2 = setTimeout(() => {
      setLoadingStep('Executing YOLOv8 forward pass on Zero-GPU...');
    }, 15000);
    const timer3 = setTimeout(() => {
      setLoadingStep('Parsing model bounding boxes and distress dataframe...');
    }, 25000);

    try {
      // Pass the uploaded file or the selected image path
      const imageToDetect = selectedFile || selectedImageSrc;
      const result = await runHuggingFaceDetection(imageToDetect, confidenceThreshold);
      setRealResult(result);
      setActiveView('annotated');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Inference request failed';
      setErrorMsg(message);
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      setIsLoading(false);
    }
  };

  const mapClassToCode = (className: string): string => {
    const lower = className.toLowerCase().replace(/[\s_-]+/g, '');
    if (lower.includes('longitudinal')) return 'D00';
    if (lower.includes('transverse')) return 'D10';
    if (lower.includes('alligator')) return 'D20';
    if (lower.includes('pothole')) return 'D40';
    return 'RDD';
  };

  const getClassBadgeStyle = (code: string) => {
    switch (code) {
      case 'D00':
        return 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30';
      case 'D10':
        return 'bg-blue-950/60 text-blue-300 border-blue-500/30';
      case 'D20':
        return 'bg-amber-950/60 text-amber-300 border-amber-500/30';
      case 'D40':
        return 'bg-rose-950/60 text-rose-300 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <Sparkles className="h-4 w-4" />
            <span>Stage 2 Live Model Integration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Road Damage Detection Suite
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Connected to deployed YOLOv8 model on Hugging Face Spaces for real-time road distress inference.
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
            <span>Hugging Face Space: nclakshmipriya/RoadDamageAI</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Live Integration Status Banner */}
      <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 sm:p-5 backdrop-blur-md">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-cyan-300">
              LIVE MODEL INFERENCE ACTIVE — YOLOv8 via Hugging Face Spaces
            </h4>
            <p className="text-xs leading-relaxed text-slate-300">
              Inference requests are routed through a secure Next.js server route (<code className="text-cyan-300 font-mono">/api/detect</code>) 
              connecting to the deployed <code className="text-cyan-300 font-mono">nclakshmipriya/RoadDamageAI</code> Gradio API. 
              The resulting annotated image and detection table are generated directly by the live deep learning model.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Controls & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Image Selector, Upload & Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Section 1: Pre-loaded Test Samples */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-5 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-cyan-400" />
                <span>Preset Test Samples</span>
              </h3>
              <span className="text-[11px] text-slate-400">Click to preview</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SAMPLE_IMAGES.map((sample) => {
                const isSelected = selectedSampleId === sample.id;
                return (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample.id)}
                    className={`flex flex-col text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/40 shadow-sm shadow-cyan-500/20'
                        : 'border-white/5 bg-slate-900/50 hover:bg-slate-800/60 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-xs font-semibold ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                        {sample.name}
                      </span>
                      {isSelected && <Check className="h-3.5 w-3.5 text-cyan-400" />}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                      {sample.expectedDistress}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Drag & Drop File Upload */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-5 backdrop-blur-xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Upload className="h-4 w-4 text-cyan-400" />
              <span>Or Upload Custom Road Image</span>
            </h3>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
                isDragOver
                  ? 'border-cyan-400 bg-cyan-950/30'
                  : 'border-slate-700 bg-slate-900/40 hover:border-cyan-500/40 hover:bg-slate-900/70'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Upload className={`h-8 w-8 mb-2 ${isDragOver ? 'text-cyan-400' : 'text-slate-400'}`} />
              <p className="text-xs font-medium text-slate-200">
                <span className="text-cyan-400 underline">Click to upload</span> or drag & drop
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                JPG, PNG, or WebP (Max 10 MB)
              </p>
              {selectedFile && (
                <span className="mt-2 inline-flex items-center gap-1 rounded bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  <CheckCircle2 className="h-3 w-3" /> {selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)
                </span>
              )}
            </div>
          </div>

          {/* Section 3: Detection Parameters & Actions */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-5 backdrop-blur-xl space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <label 
                  htmlFor="confidence-slider"
                  className="font-bold text-slate-200 flex items-center gap-1.5"
                >
                  <Sliders className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Confidence Threshold</span>
                </label>
                <span className="font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded text-xs">
                  {confidenceThreshold.toFixed(2)} ({(confidenceThreshold * 100).toFixed(0)}%)
                </span>
              </div>

              {/* Slider matching the Hugging Face Gradio app min=0.05, max=0.8, step=0.05 */}
              <input
                id="confidence-slider"
                type="range"
                min="0.05"
                max="0.80"
                step="0.05"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>0.05 (High Recall)</span>
                <span>0.25 (Default)</span>
                <span>0.80 (High Precision)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                Detections below the selected threshold are filtered out. Higher thresholds yield fewer, more confident detections but do not guarantee absolute correctness.
              </p>
            </div>

            {/* Error Message display with Retry option */}
            {errorMsg && (
              <div className="rounded-lg bg-rose-950/60 border border-rose-500/30 p-3 text-xs text-rose-300 space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{errorMsg}</span>
                </div>
                <button
                  onClick={handleRunRealDetection}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-rose-900/60 border border-rose-500/40 text-rose-200 text-xs font-semibold hover:bg-rose-900 transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Retry Inference</span>
                </button>
              </div>
            )}

            {/* Detect Road Damage Button */}
            <div className="space-y-2">
              <button
                onClick={handleRunRealDetection}
                disabled={isLoading || (!selectedImageSrc && !selectedFile)}
                className="w-full group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:opacity-95 hover:shadow-cyan-500/30 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-white" />
                    <span className="text-xs sm:text-sm">⏳ Waking up AI model from Hugging Face (30-60s cold start first time)...</span>
                  </>
                ) : (
                  <>
                    <Crosshair className="h-4 w-4 text-white" />
                    <span>Detect Road Damage</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                <span>Model: YOLOv8 (Live Space)</span>
                <span>Endpoint: /predict</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Visual Result Canvas & Detection Table (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual Display Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-5 backdrop-blur-xl space-y-4">
            
            {/* Display Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">Detection Result Canvas</span>
                {realResult && (
                  <span className="rounded bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                    Live Response · {realResult.inferenceDurationMs}ms
                  </span>
                )}
              </div>

              {/* View Toggle between Annotated and Original */}
              {realResult?.annotatedImageUrl && (
                <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                  <button
                    onClick={() => setActiveView('annotated')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                      activeView === 'annotated'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Annotated (YOLOv8)
                  </button>
                  <button
                    onClick={() => setActiveView('original')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                      activeView === 'original'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Original Image
                  </button>
                </div>
              )}
            </div>

            {/* Canvas / Image Stage */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-800 bg-[#070b14] flex items-center justify-center">
              
              {/* Display Annotated Image if available and selected */}
              {realResult?.annotatedImageUrl && activeView === 'annotated' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={realResult.annotatedImageUrl}
                  alt="Live YOLOv8 Annotated Road Damage"
                  className="h-full w-full object-contain select-none"
                />
              ) : selectedImageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedImageSrc}
                  alt="Original Road surface preview"
                  className="h-full w-full object-contain select-none"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 space-y-2">
                  <ImageIcon className="h-10 w-10 text-slate-600" />
                  <p className="text-sm font-semibold text-slate-300">No Image Selected</p>
                  <p className="text-xs text-slate-500">Choose a preset sample or upload an image to inspect.</p>
                </div>
              )}

              {/* Loading Scan Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs flex flex-col items-center justify-center z-30 space-y-3">
                  <div className="relative">
                    <RefreshCw className="h-10 w-10 text-cyan-400 animate-spin" />
                    <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl animate-pulse" />
                  </div>
                  <span className="text-xs font-mono font-medium text-cyan-300 bg-slate-900/90 px-3.5 py-1.5 rounded-full border border-cyan-500/30 shadow-lg">
                    {loadingStep}
                  </span>
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400 animate-radar-scan" />
                </div>
              )}
            </div>

            {/* Status Footer Indicator */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <div>
                {realResult ? (
                  realResult.totalDetections > 0 ? (
                    <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{realResult.totalDetections} road distress instance{realResult.totalDetections > 1 ? 's' : ''} detected by model</span>
                    </span>
                  ) : (
                    <span className="text-amber-400 font-medium flex items-center gap-1.5">
                      <Info className="h-4 w-4" />
                      <span>No detections above this confidence threshold ({(confidenceThreshold * 100).toFixed(0)}%)</span>
                    </span>
                  )
                ) : (
                  <span>Ready for detection — click &ldquo;Detect Road Damage&rdquo;</span>
                )}
              </div>

              <span className="font-mono text-[11px] text-slate-500">
                Space: {process.env.NEXT_PUBLIC_SPACE_NAME || 'nclakshmipriya/RoadDamageAI'}
              </span>
            </div>

          </div>

          {/* Section: Results Table */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1424]/80 p-5 backdrop-blur-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Eye className="h-4 w-4 text-cyan-400" />
                  <span>Detected Objects Table</span>
                </h3>
                <span className="text-[11px] font-mono text-cyan-400 block mt-0.5">
                  Actual model outputs returned from Hugging Face Space
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-white/5">
                Threshold: {confidenceThreshold.toFixed(2)}
              </span>
            </div>

            {/* If live results with detections exist */}
            {realResult && realResult.table.rows.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 font-mono">
                      <th className="py-2.5 px-3">Class</th>
                      <th className="py-2.5 px-3">Code</th>
                      <th className="py-2.5 px-3">Confidence</th>
                      <th className="py-2.5 px-3">Visual Localization</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {realResult.table.rows.map((row, idx) => {
                      const code = mapClassToCode(row.className);
                      const badgeClass = getClassBadgeStyle(code);
                      const confVal = row.confidencePercent <= 1 ? row.confidencePercent * 100 : row.confidencePercent;
                      const isLowConfidence = confVal < 40;

                      return (
                        <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                          <td className="py-3 px-3 font-semibold text-white capitalize">
                            <div className="flex items-center gap-2">
                              <span 
                                className="h-2 w-2 rounded-full"
                                style={{
                                  backgroundColor: code === 'D40' ? '#f43f5e' : code === 'D20' ? '#f59e0b' : '#38bdf8'
                                }}
                              />
                              <span>{row.className.replace(/_/g, ' ')}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 font-mono">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${badgeClass}`}>
                              {code}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-mono">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-bold text-cyan-400">
                                {confVal.toFixed(1)}% {row.className.replace(/_/g, ' ')} {code}
                              </span>
                              {isLowConfidence && (
                                <span className="inline-flex items-center gap-1 rounded bg-amber-950/70 border border-amber-500/40 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                                  ⚠️ Low confidence - needs review
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-3 text-slate-300 text-[11px]">
                            <span className="rounded bg-slate-900 border border-white/5 px-2 py-0.5 text-slate-400 font-mono">
                              Annotated on result image
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : realResult && realResult.table.rows.length === 0 ? (
              /* Explicit No-Detection State */
              <div className="rounded-xl border border-white/5 bg-slate-900/40 p-6 text-center space-y-2">
                <AlertCircle className="h-8 w-8 text-amber-400 mx-auto" />
                <h4 className="text-sm font-semibold text-slate-200">
                  No Detections Above This Confidence Threshold ({(confidenceThreshold * 100).toFixed(0)}%)
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  The model did not detect any cracks or potholes meeting the {confidenceThreshold.toFixed(2)} threshold in this image. 
                  Try lowering the confidence threshold slider or selecting another road surface image.
                </p>
              </div>
            ) : (
              /* Awaiting Run State */
              <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/30 p-8 text-center space-y-3">
                <Crosshair className="h-8 w-8 text-slate-500 mx-auto" />
                <h4 className="text-sm font-semibold text-slate-300">
                  Awaiting Model Execution
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Click &ldquo;Detect Road Damage&rdquo; to send the current image to the deployed YOLOv8 model on Hugging Face Spaces.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Technical Architecture Details */}
      <div className="rounded-2xl border border-white/10 bg-[#0a0f1d] p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-cyan-400">API Pipeline Details</span>
            <h4 className="text-base font-bold text-white">
              End-to-End Gradio Integration Architecture
            </h4>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Requests are posted to <code className="text-cyan-300 font-mono">/api/detect</code> which validates file integrity, enforces size limits (10 MB), and initiates a secure prediction via the official <code className="text-cyan-300 font-mono">@gradio/client</code> to Space <code className="text-cyan-300 font-mono">nclakshmipriya/RoadDamageAI</code>. Results are parsed directly from the Gradio output schema without client-side credential exposure.
            </p>
          </div>
          <Link
            href="/about"
            className="shrink-0 flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white"
          >
            <span>Read Architecture Docs</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
