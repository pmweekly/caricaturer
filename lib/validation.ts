const DEFAULT_MAX_UPLOAD_MB = 10;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function getUploadLimitBytes() {
  const maxUploadMb = Number(process.env.MAX_UPLOAD_MB ?? DEFAULT_MAX_UPLOAD_MB);
  return Math.max(1, maxUploadMb) * 1024 * 1024;
}

export function validateImage(file: File) {
  const maxSize = getUploadLimitBytes();

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { ok: false, error: "Only JPG, PNG, and WebP are supported." };
  }

  if (file.size > maxSize) {
    return { ok: false, error: `Image must be <= ${Math.round(maxSize / (1024 * 1024))}MB.` };
  }

  return { ok: true, error: null };
}

export function validatePrompt(prompt: string) {
  const trimmed = prompt.trim();
  if (!trimmed) {
    return { ok: false as const, error: "Prompt is required." };
  }

  if (trimmed.length > 500) {
    return { ok: false as const, error: "Prompt must be 500 characters or less." };
  }

  return { ok: true as const, error: null, value: trimmed };
}
