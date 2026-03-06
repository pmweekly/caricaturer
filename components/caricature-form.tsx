"use client";

import { ChangeEvent, DragEvent, FormEvent, useEffect, useRef, useState } from "react";

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_MB = 10;

function validateFile(file: File) {
  if (!ALLOWED.includes(file.type)) {
    return "Only JPG, PNG, and WebP are supported.";
  }

  if (file.size > MAX_MB * 1024 * 1024) {
    return `Image must be <= ${MAX_MB}MB.`;
  }

  return null;
}

export function CaricatureForm() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("a businessman, laughing, with a big nose, bright colors, cartoon style");
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setUploadPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setUploadPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  function onFileSelect(nextFile: File | null) {
    setError(null);

    if (!nextFile) {
      setFile(null);
      return;
    }

    const validationError = validateFile(nextFile);
    if (validationError) {
      setError(validationError);
      return;
    }

    setFile(nextFile);
  }

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    onFileSelect(event.target.files?.[0] ?? null);
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
    onFileSelect(event.dataTransfer.files?.[0] ?? null);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setResultUrl(null);

    if (!file) {
      setError("Please upload a face photo first.");
      return;
    }

    if (!prompt.trim()) {
      setError("Please add a prompt.");
      return;
    }

    const formData = new FormData();
    formData.set("file", file);
    formData.set("prompt", prompt.trim());

    try {
      setIsGenerating(true);
      const response = await fetch("/api/generate-caricature", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as { imageUrl?: string; error?: string };

      if (!response.ok || !payload.imageUrl) {
        throw new Error(payload.error ?? "Generation failed.");
      }

      setResultUrl(payload.imageUrl);
    } catch (submissionError) {
      const message = submissionError instanceof Error ? submissionError.message : "Something went wrong.";
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="soft-card p-5 sm:p-6">
      <form onSubmit={onSubmit}>
        <h2 className="text-2xl font-extrabold">Upload and Generate</h2>
        <p className="mt-2 text-sm text-black/65">
          Upload one portrait and describe your style. We transform it into a playful caricature avatar.
        </p>

        <label
          onDragOver={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={onDrop}
          className={`mt-5 block cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition ${
            isDragOver ? "border-[#7852ff] bg-[#7852ff]/10" : "border-black/15 bg-[#fff8f4]"
          }`}
        >
          <div className="text-2xl">📸</div>
          <p className="mt-2 text-sm font-medium">Drag & drop your face photo here (JPG, PNG, WebP, max 10MB)</p>
          <p className="mt-2 text-xs text-black/55">or click to browse</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={onFileChange}
          />
        </label>

        <div className="mt-5">
          <label className="text-sm font-semibold">Prompt</label>
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            rows={4}
            className="mt-2 w-full rounded-xl border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#ff7b47]"
            placeholder="a businessman, laughing, with a big nose, bright colors, cartoon style"
          />
        </div>

        <p className="mt-3 text-xs text-black/55">
          Privacy: Your upload is used only to generate your caricature result.
        </p>

        {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={isGenerating}
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#ff7b47] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isGenerating ? "Generating..." : "Generate Caricature"}
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {uploadPreview && (
          <div className="soft-card overflow-hidden p-2">
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-black/55">Uploaded photo</p>
            <img src={uploadPreview} alt="Uploaded portrait" className="h-56 w-full rounded-xl object-cover" />
          </div>
        )}

        <div className="soft-card overflow-hidden p-2">
          <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-black/55">Generated preview</p>
          <div className="rounded-xl border border-dashed border-black/15 bg-[#fafafa]">
            {isGenerating && <p className="p-12 text-center text-sm text-black/60">Generating your caricature preview...</p>}
            {!isGenerating && !resultUrl && (
              <p className="p-12 text-center text-sm text-black/60">Your caricature preview appears here after generation.</p>
            )}
            {!isGenerating && resultUrl && (
              <img src={resultUrl} alt="Generated caricature" className="h-auto w-full object-cover" />
            )}
          </div>
          {resultUrl && !isGenerating && (
            <a
              className="mt-3 inline-flex rounded-full bg-[#7852ff] px-4 py-2 text-sm font-semibold text-white"
              href={resultUrl}
              download
              target="_blank"
              rel="noreferrer"
            >
              Download
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
