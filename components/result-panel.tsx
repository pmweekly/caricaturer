type ResultPanelProps = {
  imageUrl: string | null;
  isGenerating: boolean;
};

export function ResultPanel({ imageUrl, isGenerating }: ResultPanelProps) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-4 shadow-card">
      <h3 className="text-lg font-bold">Result</h3>
      <div className="mt-4 overflow-hidden rounded-xl border border-dashed border-ink/20 bg-paper/60">
        {isGenerating && <p className="p-10 text-center text-sm text-ink/70">Generating your caricature...</p>}
        {!isGenerating && !imageUrl && <p className="p-10 text-center text-sm text-ink/70">Your generated image appears here.</p>}
        {!isGenerating && imageUrl && (
          <img src={imageUrl} alt="Generated caricature" className="h-auto w-full object-cover" />
        )}
      </div>
      {imageUrl && !isGenerating && (
        <a
          className="mt-4 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
          href={imageUrl}
          download
          target="_blank"
          rel="noreferrer"
        >
          Download Image
        </a>
      )}
    </div>
  );
}
