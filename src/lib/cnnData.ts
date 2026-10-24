import { CNNStage } from '@/types';

export const CNN_STAGES: CNNStage[] = [
  {
    id: 'stage-1-input',
    stepNumber: 1,
    title: 'Input Image & Tensor Normalization',
    shortName: 'Input Tensor',
    tagline: 'Converting digital road photographs into standardized mathematical matrices',
    tensorShape: '640 × 640 × 3 (RGB Channels)',
    receptiveField: '1 × 1 pixel',
    description:
      'The raw road image captured by an onboard vehicle camera or mobile sensor is downscaled or padded to a standardized input dimension (640×640 pixels). Pixel intensities (0 to 255) across the Red, Green, and Blue channels are normalized to floating-point values between 0.0 and 1.0 to ensure gradient stability during backpropagation.',
    mathematicalConcept:
      'Normalization transformation: X_norm = (X_raw / 255.0). Represented as a 3D float32 tensor of shape [Batch, Channels, Height, Width] = [1, 3, 640, 640].',
    distressRelevance:
      'Normalizing color distribution dampens sudden lighting shifts, overcast sky glares, and shadows cast by roadside trees or highway bridges, allowing distress patterns to be recognized uniformly.',
    yoloArchitectureContext:
      'YOLOv8 utilizes Letterbox padding to maintain image aspect ratios without distorting the geometric proportions of narrow cracks and potholes.',
    visualIcon: 'Camera',
    mockFeatureMaps: [
      { label: 'Red Channel', description: 'Emphasizes clay dust, dried dirt, and warm stone aggregates in asphalt.', filterType: 'Color channel' },
      { label: 'Green Channel', description: 'Highlights surface foliage debris, edge vegetation, and organic staining.', filterType: 'Color channel' },
      { label: 'Blue Channel', description: 'Enhances high-contrast dark crevices, standing moisture in cavities, and deep shadows.', filterType: 'Color channel' },
    ],
  },
  {
    id: 'stage-2-convolution',
    stepNumber: 2,
    title: 'Convolutional Filtering (Spatial Kernels)',
    shortName: 'Convolution',
    tagline: 'Sliding learned weight kernels across asphalt surfaces to detect directional gradients',
    tensorShape: '320 × 320 × 32 (Stride 2)',
    receptiveField: '3 × 3 to 7 × 7 pixels',
    description:
      'Learnable matrix kernels (e.g., 3×3 weight matrices) slide across the input tensor with specified strides and padding. At each location, the dot product between kernel weights and local pixel patches is computed. Convolution preserves spatial relationships while extracting localized features.',
    mathematicalConcept:
      'Discrete 2D Convolution: S(i, j) = (I * K)(i, j) = Σ_m Σ_n I(i - m, j - n) · K(m, n) + bias.',
    distressRelevance:
      'Different kernels specialize automatically during training: vertical kernels respond to longitudinal seams; horizontal kernels trigger on transverse thermal cracks; diagonal and multi-angle edge detectors capture perimeter fractures around potholes.',
    yoloArchitectureContext:
      'In YOLOv8, standard convolutions are paired with CBS blocks (Conv + BatchNorm + SiLU) and C2f cross-stage partial modules that fuse gradient paths without excessive computational bottlenecks.',
    visualIcon: 'Grid',
    mockFeatureMaps: [
      { label: 'Vertical Edge Kernel', description: 'Responds strongly to longitudinal joint separations along travel lanes.', filterType: 'Sobel-like kernel' },
      { label: 'Horizontal Gradient', description: 'Triggers on transverse crack boundaries cutting perpendicular across lanes.', filterType: 'Directional gradient' },
      { label: 'Laplacian Edge Filter', description: 'Detects sharp omnidirectional boundaries outlining pothole cavity perimeters.', filterType: 'High-pass filter' },
    ],
  },
  {
    id: 'stage-3-feature-maps',
    stepNumber: 3,
    title: 'Feature Maps (Intermediate Representations)',
    shortName: 'Feature Maps',
    tagline: 'Transforming raw pixels into multi-dimensional distress activation planes',
    tensorShape: '160 × 160 × 64',
    receptiveField: '15 × 15 pixels',
    description:
      'After kernels pass across the input, the resulting activation matrices form feature maps. Each channel represents the presence and intensity of a specific visual primitive across the entire spatial area of the roadway. Shallow layers capture fine textures; intermediate layers capture connected crack segments.',
    mathematicalConcept:
      'Each feature map channel C_k represents activation values: A_k = σ(W_k * X + b_k). Stacking C channels creates a 3D feature volume.',
    distressRelevance:
      'Rather than looking at color, the neural network now "sees" isolated crack skeletons, aggregate grain contrast, pavement patches, and depression depth cues.',
    yoloArchitectureContext:
      'YOLOv8 features are split into multiple hierarchical levels: P3 (stride 8, fine detail for small cracks), P4 (stride 16, medium distress), and P5 (stride 32, large potholes and global context).',
    visualIcon: 'Layers',
    mockFeatureMaps: [
      { label: 'Crack Continuity Map', description: 'Isolates continuous narrow dark lines while suppressing uniform asphalt noise.', filterType: 'Pattern activation' },
      { label: 'Asphalt Texture Map', description: 'Encodes rough aggregate vs smooth polished surface variations.', filterType: 'Texture descriptor' },
      { label: 'Cavity Depth Map', description: 'Highlights dark interior pockets characteristic of deep potholes.', filterType: 'Depression sensor' },
    ],
  },
  {
    id: 'stage-4-relu',
    stepNumber: 4,
    title: 'Activation Functions (SiLU & ReLU Non-Linearity)',
    shortName: 'Non-Linear Activation',
    tagline: 'Zeroing out background noise and allowing complex non-linear boundary learning',
    tensorShape: '160 × 160 × 64 (Unchanged spatial dimensions)',
    receptiveField: 'Unchanged',
    description:
      'Without non-linear activation functions, stacking multiple convolutional layers would collapse mathematically into a single linear matrix operation. Activation functions introduce non-linearities, allowing the network to distinguish complex curved crack patterns and jagged pothole perimeters from smooth asphalt.',
    mathematicalConcept:
      'ReLU: f(x) = max(0, x). In modern YOLOv8, SiLU (Swish-1) is used: f(x) = x · σ(x) = x / (1 + e^(-x)), providing smooth gradient flow even for small negative values.',
    distressRelevance:
      'Thresholding out negative activations effectively silences unremarkable, defect-free asphalt pavement, focusing the model computational budget solely on structural damage anomalies.',
    yoloArchitectureContext:
      'YOLOv8 standardizes on SiLU (Sigmoid Linear Unit) inside all convolutional blocks, which yields better gradient preservation and smoother optimization curves than standard piecewise linear ReLU.',
    visualIcon: 'Zap',
    mockFeatureMaps: [
      { label: 'Thresholded Crack Map', description: 'Negative and neutral asphalt background zeroed out; crack core preserved.', filterType: 'Rectified response' },
      { label: 'Pothole Edge Contour', description: 'Sharp positive activations outlining high-contrast cavity drop-offs.', filterType: 'Non-linear threshold' },
      { label: 'Fatigue Web Activations', description: 'Interconnected crack intersection nodes highlighted against smooth pavement.', filterType: 'Sparse activation' },
    ],
  },
  {
    id: 'stage-5-pooling',
    stepNumber: 5,
    title: 'Downsampling & Spatial Pooling',
    shortName: 'Spatial Pooling',
    tagline: 'Compressing dimensions to achieve translation invariance across camera angles',
    tensorShape: '80 × 80 × 128 (Downsampled resolution)',
    receptiveField: '31 × 31 pixels',
    description:
      'Downsampling operations (such as Strided Convolutions or Max Pooling) summarize local patches by retaining only the highest activation value or dominant feature. This reduces spatial dimensions, cuts memory footprint, and provides translational invariance so a pothole is detected regardless of its exact pixel position.',
    mathematicalConcept:
      'Max Pooling: y(i, j) = max_{m, n ∈ W} x(i · s + m, j · s + n), where W is the pooling window (e.g. 2×2) and s is stride.',
    distressRelevance:
      'A crack should be recognized as a longitudinal crack whether it sits on the left lane edge, right wheel path, or road shoulder. Pooling helps the network tolerate vehicle vibrations, minor tilts, and varying camera mounting heights.',
    yoloArchitectureContext:
      'YOLOv8 replaces traditional hand-crafted Max Pooling with strided convolutions and SPPF (Spatial Pyramid Pooling - Fast) blocks, which pool at multiple rates (5×5, 9×9, 13×13) to capture multiple receptive field scales simultaneously.',
    visualIcon: 'Minimize2',
    mockFeatureMaps: [
      { label: 'Multi-scale Invariant Map', description: 'Compact representation preserving distress presence across shifts.', filterType: 'Downsampled pooling' },
      { label: 'Macro Distress Region', description: 'Aggregated zones indicating high-probability cluster of fatigue cracks.', filterType: 'Spatial aggregation' },
      { label: 'Contextual Landmark Map', description: 'Road boundary and curb position cues to orient distress location.', filterType: 'Global context' },
    ],
  },
  {
    id: 'stage-6-feature-extraction',
    stepNumber: 6,
    title: 'Deep Feature Fusion (PANet Neck & C2f Modules)',
    shortName: 'Feature Fusion',
    tagline: 'Synthesizing multi-scale spatial and semantic cues to distinguish distress classes',
    tensorShape: 'Fused P3 (80×80), P4 (40×40), P5 (20×20)',
    receptiveField: 'Global image receptive field',
    description:
      'Deep in the neural network, features are no longer simple pixels or edges. They represent high-level conceptual descriptors. The network combines fine-grained spatial details from early layers with semantic contextual understanding from deep layers using bidirectional feature pyramid networks.',
    mathematicalConcept:
      'Feature Pyramid Network (FPN) + Path Aggregation Network (PANet): Top-down semantic enrichment concatenated with bottom-up localized edge propagation across multiple scales.',
    distressRelevance:
      'Crucial for differentiating distress types: a single line could be an expansion joint or a longitudinal crack; the deep network checks continuity, irregularity, width variation, and pavement context to make the correct engineering classification.',
    yoloArchitectureContext:
      'YOLOv8 uses C2f blocks with multiple split-and-merge gradient flows in the neck, eliminating older YOLOv5 C3 bottlenecks and boosting cross-channel feature expressiveness.',
    visualIcon: 'GitMerge',
    mockFeatureMaps: [
      { label: 'Alligator Mesh Representation', description: 'Detects repetitive polygon frequency characteristic of fatigue cracking.', filterType: 'High-level semantic' },
      { label: 'Thermal Joint Identifier', description: 'Differentiates engineered expansion joints from accidental thermal cracks.', filterType: 'Geometric context' },
      { label: 'Cavity Volume Estimator', description: 'Estimates dark core surrounded by broken lip geometry for pothole sizing.', filterType: 'Distress feature' },
    ],
  },
  {
    id: 'stage-7-output',
    stepNumber: 7,
    title: 'Detection Head & Non-Maximum Suppression (NMS)',
    shortName: 'Detection Head',
    tagline: 'Predicting bounding box coordinates and distress probability distributions',
    tensorShape: 'Decoupled: [B, 64, H, W] for bbox + [B, 4, H, W] for classes',
    receptiveField: '640 × 640 full image field',
    description:
      'The final detection head is decoupled: separate convolutional branches independently predict bounding box coordinates and class probabilities. Candidate predictions across all grid cells are filtered through confidence thresholding and Non-Maximum Suppression (NMS) to eliminate overlapping duplicate boxes.',
    mathematicalConcept:
      'Bounding box regression with Distribution Focal Loss (DFL) + Complete IoU (CIoU) loss. NMS calculates IoU = (Area_A ∩ Area_B) / (Area_A ∪ Area_B) and suppresses redundant boxes where IoU > threshold.',
    distressRelevance:
      'Outputs clear bounding boxes `[x1, y1, x2, y2]`, assigns the appropriate road distress category (Longitudinal, Transverse, Alligator, Pothole), and displays the confidence percentage for maintenance crews.',
    yoloArchitectureContext:
      'Unlike older anchor-based architectures (YOLOv3–v5), YOLOv8 is anchor-free. It directly predicts distance from grid centers to the 4 bounding box edges, resulting in faster inference and better handling of irregular aspect ratios.',
    visualIcon: 'Target',
    mockFeatureMaps: [
      { label: 'Class Score Head (4 Classes)', description: 'Probability distribution over Longitudinal, Transverse, Alligator, Pothole.', filterType: 'Softmax/BCE head' },
      { label: 'Box Regression Head', description: 'Anchor-free bounding box edge offsets normalized to 0–1 image space.', filterType: 'DFL coordinate head' },
      { label: 'NMS Filtered Result', description: 'Single highest-confidence bounding box per physical distress instance.', filterType: 'Post-processed output' },
    ],
  },
];
