import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@gradio/client';

const HUGGINGFACE_SPACE_ID = process.env.HUGGINGFACE_SPACE_ID || 'nclakshmipriya/RoadDamageAI';
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

/**
 * Resilient connection helper with retry logic:
 * - Try Client.connect("nclakshmipriya/RoadDamageAI")
 * - If fails with "Space metadata could not be loaded" (or sleep/connection error), wait 10 seconds and retry once
 * - If still fails, throw error for graceful 502 handling
 */
async function connectToSpaceWithRetry(spaceId: string): Promise<Client> {
  console.log(`[API /api/detect] Attempting connection to Hugging Face Space: "${spaceId}"...`);
  try {
    const client = await Client.connect(spaceId);
    console.log(`[API /api/detect] Successfully connected to "${spaceId}"`);
    return client;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[API /api/detect] First connection attempt failed (${msg}). Space may be sleeping.`);

    // Wait 10 seconds to allow the Space container to spin up and retry once
    console.log('[API /api/detect] Waiting 10 seconds before retry attempt...');
    await new Promise((resolve) => setTimeout(resolve, 10000));

    console.log(`[API /api/detect] Retrying connection to "${spaceId}"...`);
    const client = await Client.connect(spaceId);
    console.log(`[API /api/detect] Successfully connected to "${spaceId}" on retry!`);
    return client;
  }
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const formData = await req.formData();
    const file = formData.get('image');
    const confRaw = formData.get('conf') || formData.get('confidence') || formData.get('conf_threshold');

    // 1. Validate Image Input
    if (!file || !(file instanceof Blob)) {
      console.warn('[API /api/detect] Validation failed: No image file provided');
      return NextResponse.json(
        { error: 'No image file uploaded. Please upload a valid road image.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      console.warn(`[API /api/detect] Validation failed: File size ${file.size} exceeds 10MB limit`);
      return NextResponse.json(
        { error: `Image file exceeds maximum allowed limit of 10 MB (Received: ${(file.size / (1024 * 1024)).toFixed(1)} MB).` },
        { status: 400 }
      );
    }

    // Check MIME type if present
    if (file.type && !file.type.startsWith('image/')) {
      console.warn(`[API /api/detect] Validation failed: Invalid MIME type ${file.type}`);
      return NextResponse.json(
        { error: `Unsupported file format (${file.type}). Please upload a standard image (JPEG, PNG, WebP).` },
        { status: 400 }
      );
    }

    // 2. Validate Confidence Threshold
    let conf = 0.25;
    if (confRaw !== null && confRaw !== undefined) {
      const parsed = parseFloat(String(confRaw));
      if (!isNaN(parsed) && parsed >= 0.05 && parsed <= 0.80) {
        conf = parsed;
      }
    }

    console.log(`[API /api/detect] Incoming request — Image size: ${(file.size / 1024).toFixed(1)} KB, Confidence: ${conf}`);

    // 3. Connect to Hugging Face Space with resilient retry logic
    let client: Client;
    try {
      client = await connectToSpaceWithRetry(HUGGINGFACE_SPACE_ID);
    } catch (connectErr: unknown) {
      const message = connectErr instanceof Error ? connectErr.message : String(connectErr);
      console.error(`[API /api/detect] Space connection failed after retry: ${message}`);
      return NextResponse.json(
        {
          error: 'Model is waking up (cold start takes 30-60s). Please retry in 40 seconds.',
          isColdStart: true,
        },
        { status: 502 }
      );
    }

    // 4. Call /predict endpoint with image and confidence
    console.log(`[API /api/detect] Calling client.predict('/predict') with confidence: ${conf}...`);
    let result: unknown;
    try {
      result = await client.predict('/predict', {
        image: file,
        confidence: conf,
      });
      console.log('[API /api/detect] Model inference completed successfully');
    } catch (predictErr: unknown) {
      const msg = predictErr instanceof Error ? predictErr.message : String(predictErr);
      console.error(`[API /api/detect] Model prediction call failed: ${msg}`);
      return NextResponse.json(
        {
          error: 'An error occurred during YOLOv8 inference execution on Hugging Face. Please retry.',
        },
        { status: 502 }
      );
    }

    // 5. Parse Actual Gradio Output Schema
    // Expected structure: result.data = [ ImageObject, DataframeObject ]
    const typedResult = result as {
      data?: [
        { url?: string; path?: string } | undefined,
        { headers?: string[]; data?: (string | number)[][] } | undefined
      ];
    };

    if (!typedResult || !Array.isArray(typedResult.data)) {
      console.error('[API /api/detect] Unexpected Gradio response format:', typeof result);
      return NextResponse.json(
        { error: 'Received malformed output structure from the Hugging Face model.' },
        { status: 502 }
      );
    }

    const imageOutput = typedResult.data[0];
    const dataframeOutput = typedResult.data[1];

    const annotatedImageUrl = imageOutput?.url || null;
    const rawHeaders = Array.isArray(dataframeOutput?.headers) 
      ? dataframeOutput.headers 
      : ['Damage Class', 'Confidence (%)'];
    const rawRows = Array.isArray(dataframeOutput?.data) 
      ? dataframeOutput.data 
      : [];

    // Parse Detected Objects rows
    const parsedRows = rawRows.map((row) => {
      const className = String(row[0] || 'Unknown');
      const confNum = typeof row[1] === 'number' 
        ? row[1] 
        : parseFloat(String(row[1])) || 0;

      return {
        className,
        confidencePercent: confNum,
        rawRow: row,
      };
    });

    const elapsedMs = Date.now() - startTime;
    console.log(`[API /api/detect] Completed request in ${elapsedMs}ms with ${parsedRows.length} detections`);

    return NextResponse.json({
      success: true,
      isRealModel: true,
      data: typedResult.data,
      status: parsedRows.length > 0 ? 'success' : 'no-damage',
      annotatedImageUrl,
      table: {
        headers: rawHeaders,
        rows: parsedRows,
      },
      totalDetections: parsedRows.length,
      thresholdApplied: conf,
      inferenceDurationMs: elapsedMs,
      spaceIdentifier: HUGGINGFACE_SPACE_ID,
      timestamp: new Date().toISOString(),
    });

  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown server error';
    console.error('[API /api/detect] Unhandled internal error:', errorMsg);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred while processing the road damage detection request.' },
      { status: 500 }
    );
  }
}
