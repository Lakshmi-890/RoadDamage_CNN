import { BaselineMetric } from '@/types';

export const HISTORICAL_BASELINE_METRICS: BaselineMetric[] = [
  {
    name: 'Precision',
    label: 'Precision',
    value: 60.42,
    formatted: '60.42%',
    benchmarkContext: 'Precision = TP / (TP + FP)',
    definition:
      'The proportion of predicted road damage detections that correspond to true positive defects. Precision = TP / (TP + FP).',
    distressImpact:
      'Measures detection purity: when a bounding box is predicted, how often it aligns with an actual defect.',
  },
  {
    name: 'Recall',
    label: 'Recall',
    value: 28.65,
    formatted: '28.65%',
    benchmarkContext: 'Recall = TP / (TP + FN)',
    definition:
      'The proportion of all actual road damage defects in the evaluation set that were successfully detected. Recall = TP / (TP + FN).',
    distressImpact:
      'The precision–recall difference (60.42% vs 28.65%) indicates that missed detections are a concern in this baseline model.',
  },
  {
    name: 'mAP@50',
    label: 'mAP@50',
    value: 28.06,
    formatted: '28.06%',
    benchmarkContext: 'mAP@50 = mean average precision at IoU 0.50',
    definition:
      'Mean Average Precision across all 4 distress classes calculated at an Intersection-over-Union (IoU) threshold of 0.50.',
    distressImpact:
      'Evaluates general localization and classification accuracy with a moderate 50% spatial overlap requirement.',
  },
  {
    name: 'mAP@50-95',
    label: 'mAP@50–95',
    value: 11.36,
    formatted: '11.36%',
    benchmarkContext: 'mAP@50–95 = mean average precision averaged across IoU 0.50:0.05:0.95',
    definition:
      'Mean Average Precision averaged across 10 IoU thresholds from 0.50 to 0.95 in increments of 0.05.',
    distressImpact:
      'mAP@50–95 is stricter about bounding-box localization than mAP@50, penalizing imperfect boundary coordinates.',
  },
];

export const MODEL_CLASSES = [
  { id: 0, name: 'longitudinal_crack', label: 'Longitudinal Crack', code: 'D00' },
  { id: 1, name: 'transverse_crack', label: 'Transverse Crack', code: 'D10' },
  { id: 2, name: 'alligator_crack', label: 'Alligator Crack', code: 'D20' },
  { id: 3, name: 'pothole', label: 'Pothole', code: 'D40' },
];

export const MODEL_SPECS = [
  { label: 'Core Architecture', value: 'YOLOv8 (Ultralytics Object Detector)' },
  { label: 'Target Model Classes', value: '0: longitudinal_crack, 1: transverse_crack, 2: alligator_crack, 3: pothole' },
  { label: 'Input Resolution', value: '640 × 640 pixels (RGB)' },
  { label: 'Evaluation Baseline Source', value: 'Historical test-split validation run' },
  { label: 'Production Space Host', value: 'Hugging Face Spaces (nclakshmipriya/RoadDamageAI)' },
];
