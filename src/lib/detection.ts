import { DetectionItem, DetectionResult } from '@/types';

export interface SampleImage {
  id: string;
  name: string;
  tagline: string;
  src: string;
  expectedDistress: string;
  mockDetections: DetectionItem[];
}

export const SAMPLE_IMAGES: SampleImage[] = [
  {
    id: 'sample-pothole',
    name: 'Pothole & Fatigue Distress',
    tagline: 'Deep asphalt cavity with adjacent base cracking',
    src: '/samples/pothole-sample.jpg',
    expectedDistress: 'Pothole (D40) + Alligator Crack (D20)',
    mockDetections: [
      {
        id: 'det-pothole-1',
        className: 'Pothole',
        distressCode: 'D40',
        confidence: 0.74,
        box: { x1: 52, y1: 36, x2: 78, y2: 66 },
        severity: 'Severe',
        dimensionsEstimated: '~42cm dia × 6.5cm depth',
        recommendedAction: 'Emergency cold patch within 24h; permanent square-cut asphalt patch scheduled.',
      },
      {
        id: 'det-alligator-1',
        className: 'Alligator Crack',
        distressCode: 'D20',
        confidence: 0.61,
        box: { x1: 24, y1: 59, x2: 45, y2: 84 },
        severity: 'High',
        dimensionsEstimated: '~1.2m² fatigue area',
        recommendedAction: 'Structural assessment of sub-base; localized milling and sub-grade stabilization.',
      },
    ],
  },
  {
    id: 'sample-alligator',
    name: 'Alligator Fatigue Cracking',
    tagline: 'Interconnected polygonal surface failure',
    src: '/samples/alligator-sample.jpg',
    expectedDistress: 'Alligator Crack (D20)',
    mockDetections: [
      {
        id: 'det-alligator-2',
        className: 'Alligator Crack',
        distressCode: 'D20',
        confidence: 0.69,
        box: { x1: 26, y1: 26, x2: 72, y2: 78 },
        severity: 'High',
        dimensionsEstimated: '~3.4m² fatigue network',
        recommendedAction: 'Full-depth reclamation or heavy overlay patch to arrest sub-base degradation.',
      },
    ],
  },
  {
    id: 'sample-longitudinal',
    name: 'Longitudinal & Transverse Cracks',
    tagline: 'Travel lane joint crack with thermal crossing',
    src: '/samples/longitudinal-sample.jpg',
    expectedDistress: 'Longitudinal (D00) + Transverse (D10)',
    mockDetections: [
      {
        id: 'det-long-1',
        className: 'Longitudinal Crack',
        distressCode: 'D00',
        confidence: 0.68,
        box: { x1: 39, y1: 4, x2: 47, y2: 95 },
        severity: 'Medium',
        dimensionsEstimated: '~4.8m linear crack length',
        recommendedAction: 'Routing and rubberized hot-pour asphalt crack sealant before winter freeze cycles.',
      },
      {
        id: 'det-trans-1',
        className: 'Transverse Crack',
        distressCode: 'D10',
        confidence: 0.58,
        box: { x1: 22, y1: 38, x2: 82, y2: 49 },
        severity: 'Medium',
        dimensionsEstimated: '~2.9m linear width',
        recommendedAction: 'Crack sealant application to arrest water penetration and edge spalling.',
      },
    ],
  },
  {
    id: 'sample-clean',
    name: 'Intact Asphalt (Negative Control)',
    tagline: 'Freshly paved roadway with no surface distress',
    src: '/samples/clean-road-sample.svg',
    expectedDistress: 'None (Demonstrates no-detection state)',
    mockDetections: [], // Clean road returns zero detections!
  },
];

/**
 * Stage 1 Isolated Mock Detection Engine.
 * Simulates asynchronous deep learning inference with realistic latency.
 * NOTE: Clearly flagged as Demo Mode. Connects to Hugging Face API in Stage 2.
 */
export async function runMockDetection(
  imageSrc: string,
  threshold: number,
  options?: { shouldFail?: boolean; customDetections?: DetectionItem[] }
): Promise<DetectionResult> {
  // Simulate neural network forward pass inference latency (600ms - 1100ms)
  const simulatedLatency = Math.floor(Math.random() * 400) + 700;
  await new Promise((resolve) => setTimeout(resolve, simulatedLatency));

  if (options?.shouldFail) {
    throw new Error('Simulation Error: Unable to process road tensor (Simulated backend fault).');
  }

  // Check if image matches one of our known samples
  const matchedSample = SAMPLE_IMAGES.find((s) => s.src === imageSrc || imageSrc.includes(s.id));

  let rawCandidates: DetectionItem[] = [];

  if (matchedSample) {
    rawCandidates = [...matchedSample.mockDetections];
  } else if (options?.customDetections) {
    rawCandidates = [...options.customDetections];
  } else {
    // For user-uploaded images, generate realistic mock demo detections
    // Clearly documented as synthetic demo predictions
    rawCandidates = [
      {
        id: 'det-custom-1',
        className: 'Longitudinal Crack',
        distressCode: 'D00',
        confidence: 0.65,
        box: { x1: 32, y1: 28, x2: 56, y2: 74 },
        severity: 'Medium',
        dimensionsEstimated: '~1.8m simulated length',
        recommendedAction: 'Inspect joint sealant and apply hot-pour mastic if crack width > 5mm.',
      },
      {
        id: 'det-custom-2',
        className: 'Pothole',
        distressCode: 'D40',
        confidence: 0.52,
        box: { x1: 58, y1: 45, x2: 78, y2: 68 },
        severity: 'High',
        dimensionsEstimated: '~28cm dia depression',
        recommendedAction: 'Schedule asphalt patch repair to prevent tire impact damage.',
      },
    ];
  }

  // Filter candidates based on user confidence threshold
  const activeDetections = rawCandidates.filter((d) => d.confidence >= threshold);

  return {
    isDemoMode: true,
    status: activeDetections.length > 0 ? 'success' : 'no-damage',
    modelIdentifier: 'YOLOv8-RoadDamage-Demo',
    modelVersion: 'v8.0.0-RDD-historical-baseline',
    inferenceDurationMs: simulatedLatency,
    thresholdApplied: threshold,
    totalDetections: activeDetections.length,
    detections: activeDetections,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Stage 2: Real Hugging Face Space Live Model Detection Engine.
 * Sends the image and confidence threshold to our server-side /api/detect route,
 * which securely executes inference on the YOLOv8 Gradio endpoint.
 */
export async function runHuggingFaceDetection(
  imageInput: Blob | File | string,
  threshold: number
): Promise<import('@/types').RealModelDetectionResult> {
  const formData = new FormData();

  let fileBlob: Blob;
  if (typeof imageInput === 'string') {
    // If data URL or relative /samples/ path, convert to Blob
    const response = await fetch(imageInput);
    if (!response.ok) {
      throw new Error(`Failed to load selected image (${response.statusText}).`);
    }
    fileBlob = await response.blob();
  } else {
    fileBlob = imageInput;
  }

  formData.append(
    'image',
    fileBlob,
    fileBlob instanceof File ? fileBlob.name : 'road_surface.jpg'
  );
  formData.append('confidence', String(threshold));
  formData.append('conf', String(threshold));
  formData.append('conf_threshold', String(threshold));

  const res = await fetch('/api/detect', {
    method: 'POST',
    body: formData,
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || `Inference request failed with status ${res.status}`);
  }

  return json as import('@/types').RealModelDetectionResult;
}
