import { DamageCategoryMeta } from '@/types';

export const DAMAGE_CATEGORIES: DamageCategoryMeta[] = [
  {
    id: 'longitudinal-crack',
    code: 'D00',
    name: 'Longitudinal Crack',
    urgency: 'Moderate',
    colorHex: '#38bdf8', // Sky / Cyan
    badgeBg: 'bg-cyan-950/60',
    badgeText: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    description:
      'Cracks running parallel to the direction of vehicular traffic, typically forming along lane boundaries, wheel paths, or construction joints.',
    primaryCauses: [
      'Pavement joint segregation and poor joint compaction during asphalt laying',
      'Fatigue cracking in wheel paths under repetitive heavy axle loads',
      'Thermal shrinkage during severe seasonal temperature drops',
    ],
    safetyRisks: [
      'Moisture infiltration eroding the base course',
      'Widening into structural rutting and pavement raveling',
      'Hazards for two-wheelers and narrow motorcycle tires',
    ],
    typicalRepair: 'Crack sealing with rubberized hot-pour asphalt or localized routing and joint fill.',
    sampleThumbnail: '/samples/longitudinal-sample.jpg',
  },
  {
    id: 'transverse-crack',
    code: 'D10',
    name: 'Transverse Crack',
    urgency: 'Moderate',
    colorHex: '#60a5fa', // Electric Blue
    badgeBg: 'bg-blue-950/60',
    badgeText: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    description:
      'Cracks running perpendicular to the roadway centerline, spanning across travel lanes due to thermal contraction or joint reflection.',
    primaryCauses: [
      'Low-temperature thermal contraction stressing asphalt tensile strength beyond capacity',
      'Reflection cracking propagating upward from joints in underlying concrete sub-bases',
      'Daily extreme thermal cycling causing asphalt binder aging and brittleness',
    ],
    safetyRisks: [
      'Spalling along crack edges creating stepped ridges and rough ride quality',
      'Water ingress causing subgrade softening and frost heave in cold seasons',
      'Vehicle suspension wear and tire slap impact at speed',
    ],
    typicalRepair: 'Hot-pour mastic crack sealing or shallow milling and structural inlay patching.',
    sampleThumbnail: '/samples/longitudinal-sample.jpg',
  },
  {
    id: 'alligator-crack',
    code: 'D20',
    name: 'Alligator Crack',
    urgency: 'High',
    colorHex: '#f59e0b', // Amber / Warning
    badgeBg: 'bg-amber-950/60',
    badgeText: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    description:
      'A series of interconnected, polygonal or hexagonal fatigue cracks resembling the scales of an alligator skin, indicating base-layer failure.',
    primaryCauses: [
      'Excessive structural deflection under repetitive heavy commercial vehicle loads',
      'Weakened base or subgrade caused by poor drainage, saturation, or water table rise',
      'Inadequate asphalt thickness designed for current traffic volume',
    ],
    safetyRisks: [
      'Rapid disintegration into severe potholes when chunks dislodge under tires',
      'Complete loss of structural pavement load-carrying capacity',
      'Vehicle hydroplaning risk from uneven depressions holding surface water',
    ],
    typicalRepair: 'Full-depth reclamation, structural patch excavation, and base course stabilization.',
    sampleThumbnail: '/samples/alligator-sample.jpg',
  },
  {
    id: 'pothole',
    code: 'D40',
    name: 'Pothole',
    urgency: 'Critical',
    colorHex: '#f43f5e', // Rose / Red Alert
    badgeBg: 'bg-rose-950/60',
    badgeText: 'text-rose-400',
    borderColor: 'border-rose-500/30',
    description:
      'Bowl-shaped cavities or localized depressions in the road surface with sharp vertical edges, created when moisture undermines asphalt chunks under traffic.',
    primaryCauses: [
      'Water penetrating untreated cracks, freeze-thaw expansion, and traffic suction forces',
      'Cavitation and base loss under progressive alligator fatigue',
      'Severe pavement delamination and subgrade erosion',
    ],
    safetyRisks: [
      'Severe tire blowouts, rim deformation, and steering loss causing accidents',
      'Critical risk to motorcyclists and bicyclists from abrupt wheel entrapment',
      'Sudden driver swerving into adjacent lanes causing multi-vehicle collisions',
    ],
    typicalRepair: 'Emergency cold-mix temporary patch followed by permanent square-cut hot-mix asphalt patching.',
    sampleThumbnail: '/samples/pothole-sample.jpg',
  },
];
