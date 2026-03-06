import { put } from "@vercel/blob";

export async function uploadGeneratedImage(sourceUrl: string) {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  // Local development can still work without Blob by returning provider URL directly.
  if (!blobToken) {
    return sourceUrl;
  }

  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch generated image from model output URL.");
  }

  const contentType = response.headers.get("content-type") ?? "image/png";
  const ext = contentType.includes("jpeg") ? "jpg" : contentType.includes("webp") ? "webp" : "png";
  const bytes = await response.arrayBuffer();
  const key = `caricatures/${Date.now()}-${crypto.randomUUID()}.${ext}`;

  const saved = await put(key, bytes, {
    access: "public",
    contentType,
    token: blobToken,
    addRandomSuffix: false,
  });

  return saved.url;
}
