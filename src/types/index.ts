export type DamageClass = 
  | 'Longitudinal Crack'
  | 'Transverse Crack'
  | 'Alligator Crack'
  | 'Pothole';

export type DistressCode = 'D00' | 'D10' | 'D20' | 'D40';

export type SeverityLevel = 'Low' | 'Medium' | 'High' | 'Severe';

export interface BoundingBox {
  // Coordinates in percentage [0, 100] relative to original image
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface DetectionItem {
  id: string;
  className: DamageClass;
  distressCode: DistressCode;
  confidence: number; // 0.00 to 1.00
  box: BoundingBox;
  severity: SeverityLevel;
  dimensionsEstimated?: string;
  recommendedAction: string;
}

export interface DetectionResult {
  isDemoMode: boolean;
  status: 'success' | 'no-damage' | 'error';
  modelIdentifier: string;
  modelVersion: string;
  inferenceDurationMs: number;
  thresholdApplied: number;
  totalDetections: number;
  detections: DetectionItem[];
  timestamp: string;
}

export interface DetectedObjectRow {
  className: string;
  confidencePercent: number; // e.g. 74.0
  rawRow: (string | number)[];
}

export interface RealModelDetectionResult {
  isRealModel: true;
  status: 'success' | 'no-damage';
  annotatedImageUrl: string | null;
  table: {
    headers: string[];
    rows: DetectedObjectRow[];
  };
  totalDetections: number;
  thresholdApplied: number;
  inferenceDurationMs: number;
  spaceIdentifier: string;
  timestamp: string;
}

export interface CNNStage {
  id: string;
  stepNumber: number;
  title: string;
  shortName: string;
  tagline: string;
  tensorShape: string;
  receptiveField: string;
  description: string;
  mathematicalConcept: string;
  distressRelevance: string;
  yoloArchitectureContext: string;
  visualIcon: string;
  mockFeatureMaps?: {
    label: string;
    description: string;
    filterType: string;
  }[];
}

export interface BaselineMetric {
  name: string;
  label: string;
  value: number; // e.g. 60.42
  formatted: string;
  benchmarkContext: string;
  definition: string;
  distressImpact: string;
}

export interface DamageCategoryMeta {
  id: string;
  code: DistressCode;
  name: DamageClass;
  urgency: 'Low' | 'Moderate' | 'High' | 'Critical';
  colorHex: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  description: string;
  primaryCauses: string[];
  safetyRisks: string[];
  typicalRepair: string;
  sampleThumbnail: string;
}
