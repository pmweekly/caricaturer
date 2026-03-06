import { NextRequest, NextResponse } from "next/server";
import { generateCaricatureWithPoe } from "@/lib/ai/poe";
import { checkRateLimit } from "@/lib/rate-limit";
import { uploadGeneratedImage } from "@/lib/storage/blob";
import { validateImage, validatePrompt } from "@/lib/validation";

export const runtime = "nodejs";

function toDataUrl(file: File, bytes: ArrayBuffer) {
  const base64 = Buffer.from(bytes).toString("base64");
  return `data:${file.type};base64,${base64}`;
}

export async function POST(request: NextRequest) {
  const startedAt = Date.now();
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(rateLimit.retryAfterMs / 1000)),
        },
      },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const promptRaw = formData.get("prompt");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Image file is required." }, { status: 400 });
    }

    if (typeof promptRaw !== "string") {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const validPrompt = validatePrompt(promptRaw);
    if (!validPrompt.ok) {
      return NextResponse.json({ error: validPrompt.error }, { status: 400 });
    }

    const validImage = validateImage(file);
    if (!validImage.ok) {
      return NextResponse.json({ error: validImage.error }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const imageDataUrl = toDataUrl(file, bytes);

    const generatedUrl = await generateCaricatureWithPoe({
      prompt: validPrompt.value,
      imageDataUrl,
    });

    const outputUrl = await uploadGeneratedImage(generatedUrl);
    const durationMs = Date.now() - startedAt;

    return NextResponse.json({
      imageUrl: outputUrl,
      durationMs,
    });
  } catch (error) {
    console.error("Generate caricature failed", {
      message: error instanceof Error ? error.message : "Unknown error",
      durationMs: Date.now() - startedAt,
    });

    return NextResponse.json(
      {
        error: "Failed to generate caricature. Please verify model settings and try again.",
      },
      { status: 500 },
    );
  }
}
