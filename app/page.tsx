import { CaricatureForm } from "@/components/caricature-form";

const steps = ["Upload Photo", "Describe Your Style", "Generate with AI", "Preview & Download"];

const benefits = [
  {
    title: "Fun and Free",
    body: "Generate unlimited playful caricatures for profile shots, cards, and social posts.",
    icon: "🎉",
  },
  {
    title: "Fast and Easy",
    body: "No drawing skills needed. Upload, describe, and get results in seconds.",
    icon: "⚡",
  },
  {
    title: "High Quality",
    body: "Download high-resolution, watermark-free caricatures ready to share.",
    icon: "✨",
  },
];

const useCases = [
  "Wedding invitations",
  "Couple avatars",
  "Business profile photos",
  "Holiday cards",
  "Sports caricatures",
  "Fantasy & sci-fi characters",
];

const faqItems = [
  {
    q: "What is a caricature?",
    a: "A caricature is a playful portrait that exaggerates facial features while keeping the person recognizable.",
  },
  {
    q: "Is it free to use?",
    a: "Yes. You can generate caricatures for free in this version.",
  },
  {
    q: "Is my photo safe?",
    a: "Your upload is used for generation only. We recommend publishing your retention policy before production launch.",
  },
];

export default function HomePage() {
  return (
    <main>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/75 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <p className="text-xl font-extrabold">Caricaturer</p>
          <a
            href="#generator"
            className="rounded-full bg-[#1f1f2b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1f1f2b]/90"
          >
            Create Caricatures
          </a>
        </div>
      </header>

      <section className="px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="float-in">
            <p className="inline-flex rounded-full border border-[#ff7b47]/30 bg-[#ff7b47]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff7b47]">
              AI Caricature Maker
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Free AI Caricature Maker</h1>
            <p className="mt-4 max-w-xl text-lg text-black/70">
              Turn your photo and text into a hilarious caricature in seconds.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#generator"
                className="inline-flex items-center justify-center rounded-full bg-[#ff7b47] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
              >
                Create Caricatures
              </a>
              <a
                href="#generator"
                className="inline-flex items-center justify-center rounded-full border border-[#7852ff]/40 bg-white px-6 py-3 text-sm font-semibold text-[#7852ff] transition hover:bg-[#7852ff]/5"
              >
                Try Text to Caricature
              </a>
            </div>
          </div>

          <div className="glass-card relative overflow-hidden rounded-3xl p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff7b47]/20 via-transparent to-[#7852ff]/25" />
            <div className="grid-overlay relative rounded-2xl p-5">
              <div className="relative mx-auto mt-2 grid max-w-md grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="soft-card p-3 text-center">
                  <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-slate-200 to-slate-300" />
                  <p className="mt-2 text-xs font-semibold text-black/55">Portrait</p>
                </div>
                <div className="text-2xl">→</div>
                <div className="soft-card p-3 text-center">
                  <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-[#ff7b47] to-[#7852ff]" />
                  <p className="mt-2 text-xs font-semibold text-black/55">Caricature</p>
                </div>
              </div>

              <div className="absolute -left-3 -top-3 h-10 w-10 rounded-full bg-[#ff7b47]/70" />
              <div className="absolute -bottom-3 right-3 h-8 w-8 rounded-full bg-[#7852ff]/70" />
              <div className="absolute right-10 top-4 h-3 w-14 rounded-full bg-[#34c3ff]/70" />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <aside
          role="status"
          className="mt-6 rounded-2xl bg-gradient-to-r from-[#fff6ee] via-[#fffdf8] to-[#f0f9ff] border border-[#ffd7b5] p-4 shadow-md"
        >
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📢</span>
              <p className="text-lg font-semibold">Free to try — powered by nano-banana-2</p>
            </div>
            <p className="mt-1 text-sm text-black/70 sm:ml-4">
              This site generates exaggerated caricatures using the <strong>nano-banana-2</strong> model. Try it for free — click "Create Caricatures" to get started.
            </p>
          </div>
        </aside>
      </div>

      <section id="generator" className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <CaricatureForm />
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-extrabold sm:text-3xl">How it works</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((title, index) => (
              <article key={title} className="soft-card p-4">
                <p className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#7852ff]/15 text-xs font-bold text-[#7852ff]">
                  {index + 1}
                </p>
                <h3 className="mt-3 font-bold">{title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Benefits</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {benefits.map((item) => (
              <article key={item.title} className="glass-card rounded-2xl p-5">
                <p className="text-2xl">{item.icon}</p>
                <h3 className="mt-3 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-black/65">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Use cases</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((item) => (
              <article key={item} className="soft-card flex items-center gap-3 p-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#ff7b47]/25 to-[#7852ff]/25" />
                <p className="text-sm font-semibold">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-black/10 bg-white p-6 shadow-[0_14px_35px_rgba(0,0,0,0.06)]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#1f1f2b] px-3 py-1 text-xs font-semibold text-white">Since 2021</span>
            <p className="text-sm text-black/65">Providing stunning caricature results worldwide.</p>
          </div>

          <h2 className="mt-5 text-2xl font-extrabold">Trust & FAQ</h2>
          <div className="mt-4 space-y-3">
            {faqItems.map((item) => (
              <article key={item.q} className="rounded-xl border border-black/10 bg-[#fcfcff] p-4">
                <h3 className="font-semibold">{item.q}</h3>
                <p className="mt-1 text-sm text-black/65">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-extrabold">Caricaturer</p>
          <div className="flex items-center gap-3">
            <select className="rounded-lg border border-black/15 bg-white px-2 py-1 text-sm">
              <option>English</option>
              <option>中文</option>
            </select>
            <a
              href="#"
              className="text-sm text-black/70 transition hover:text-black"
            >
              Terms of Use
            </a>
            <a
              href="#"
              className="text-sm text-black/70 transition hover:text-black"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-black/70 transition hover:text-black"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
