# RoadDamageAI Interactive — Stage 2: Live Model Integration

An interactive web application for **RoadDamageAI: Road Damage Detection Using Deep Learning**. Built with Next.js (App Router), TypeScript, Tailwind CSS, and the official `@gradio/client`.

---

## 🚧 Overview

**RoadDamageAI** automates pavement distress inspection by using deep convolutional neural network architectures (specifically **YOLOv8**) to detect, localize, and classify road surface defects in real time.

This project connects the interactive detection suite to the live deployed **YOLOv8** model running on Hugging Face Spaces.

- **Deployed Hugging Face Space (Live Model):** [https://huggingface.co/spaces/nclakshmipriya/RoadDamageAI](https://huggingface.co/spaces/nclakshmipriya/RoadDamageAI)
- **Space Identifier:** `nclakshmipriya/RoadDamageAI`
- **Gradio Endpoint:** `/predict` (accepts `image` and `confidence` slider)
- **Author:** Nagapatla Chenchu Lakshmi Priya
- **Stage:** Stage 2 — Live Model Connected

---

## 🛠️ Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Library:** React 19 & TypeScript
- **Styling:** Tailwind CSS (Modern dark navy / electric cyan aesthetic)
- **Icons:** Lucide Icons (`lucide-react`)
- **API Client:** `@gradio/client` (Official JavaScript/TypeScript Gradio SDK)
- **Server Route:** `/api/detect` (Next.js server-side route protecting client credentials and validating inputs)

---

## 🛣️ Supported Road Damage Categories

Aligned with international Road Damage Detection (RDD) benchmarks:

| Distress Code | Category Name | Description | Urgency |
| :--- | :--- | :--- | :--- |
| **D00** | Longitudinal Crack | Cracks running parallel to vehicular traffic flow | Moderate |
| **D10** | Transverse Crack | Thermal cracks running perpendicular to the roadway | Moderate |
| **D20** | Alligator Crack | Interconnected polygonal fatigue cracking (base failure) | High |
| **D40** | Pothole | Bowl-shaped cavity in asphalt surface | Critical |

---

## 📊 Recorded Test Split Baseline Metrics

Recorded during benchmark test split validation:

- **Precision:** `60.42%` — $\text{Precision} = \frac{\text{TP}}{\text{TP} + \text{FP}}$
- **Recall:** `28.65%` — $\text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}}$
- **mAP@50:** `28.06%` — Mean Average Precision at $\text{IoU} = 0.50$
- **mAP@50–95:** `11.36%` — Mean Average Precision averaged across $\text{IoU} \in [0.50, 0.95]$ in increments of $0.05$

*Note: These are historical baseline evaluation results from validation runs, not live real-time metrics or guarantees.*

---

## 🔌 API Architecture & Endpoints

### Server Route: `POST /api/detect`

- **Payload:** `multipart/form-data`
  - `image`: Image file / blob (JPEG, PNG, WebP; max 10 MB)
  - `confidence`: Decimal confidence threshold between $0.05$ and $0.80$ (default $0.25$)
- **Upstream Connection:** Server-side connection to `nclakshmipriya/RoadDamageAI` using `@gradio/client`.
- **Response Format:**
  ```json
  {
    "success": true,
    "isRealModel": true,
    "status": "success",
    "annotatedImageUrl": "https://nclakshmipriya-roaddamageai.hf.space/gradio_api/file=...",
    "table": {
      "headers": ["Damage Class", "Confidence (%)"],
      "rows": [
        {
          "className": "pothole",
          "confidencePercent": 74.2,
          "rawRow": ["pothole", 74.2]
        }
      ]
    },
    "totalDetections": 1,
    "thresholdApplied": 0.25,
    "inferenceDurationMs": 1420,
    "spaceIdentifier": "nclakshmipriya/RoadDamageAI",
    "timestamp": "2026-10-24T12:00:00.000Z"
  }
  ```

---

## 🚀 Getting Started Locally

### Prerequisites

- Node.js (v18.18.0 or higher; v20+ recommended)
- npm or yarn

### Installation

```bash
# Clone or navigate to the project directory
cd Road_Damage_Detection

# Install dependencies
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the website.

### Production Build & Lint Checks

```bash
# Run ESLint
npx eslint

# Build for production
npm run build
```

---

## 📁 Project Structure

```
├── public/
│   └── samples/                  # SVG road distress test samples
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── detect/
│   │   │       └── route.ts      # Server-side Gradio client proxy endpoint
│   │   ├── layout.tsx            # Global layout with SEO, Navbar & Footer
│   │   ├── page.tsx              # Home page with hero & distress taxonomy
│   │   ├── globals.css           # Styling & animations
│   │   ├── detection/
│   │   │   └── page.tsx          # Live Detection Suite connected to YOLOv8 Space
│   │   ├── cnn-explorer/
│   │   │   └── page.tsx          # Educational CNN pipeline & 3x3 kernel visualizer
│   │   ├── performance/
│   │   │   └── page.tsx          # Historical baseline metrics & spec dashboard
│   │   └── about/
│   │       └── page.tsx          # Project purpose, mechanics & limitations
│   ├── components/
│   │   ├── Navbar.tsx            # Navigation bar with live model badge
│   │   ├── Footer.tsx            # Footer with credits
│   │   ├── DamageCard.tsx        # Reusable RDD distress category card
│   │   └── WorkflowIllustration.tsx # Step-by-step end-to-end CV workflow
│   ├── lib/
│   │   ├── detection.ts          # Detection client invoking /api/detect
│   │   ├── damageCategories.ts   # Damage category metadata
│   │   ├── cnnData.ts            # CNN pipeline stages & YOLOv8 context
│   │   └── metricsData.ts        # Baseline metrics & specs
│   └── types/
│       └── index.ts              # Clean TypeScript interfaces
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛡️ Critical Safety & Scope Declarations

1. **Safety Compliance:** No files in the existing `RoadDamageAI` project or Hugging Face Space were modified or overwritten.
2. **Real Model Inference:** All predictions on the Detection page are generated directly by the deployed YOLOv8 model on Hugging Face Spaces.
3. **No Retraining:** No model retraining, replacement, or deployment modification was performed.
