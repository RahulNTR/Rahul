import Link from "next/link";
import Nav from "@/components/Nav";

const JOURNEY = ["Idea", "Story", "Characters", "Structure", "Scenes", "Screenplay", "Analysis", "Production"];

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-marigold">The AI development room for storytellers</p>
        <h1 className="font-display text-5xl leading-tight sm:text-7xl">
          From Idea to Screenplay.<br />
          <span className="text-zinc-500">From Screenplay to Production.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          Script Sahayak guides Indian and regional writers from a raw idea to a structured, production-ready
          screenplay — in English, Telugu, Hindi and more. AI assists. You decide.
        </p>
        <div className="mt-10 flex gap-3">
          <Link href="/signup" className="btn-primary px-6 py-3 text-base">Start your first project</Link>
          <Link href="/login" className="btn-ghost px-6 py-3 text-base">Log in</Link>
        </div>
        <div className="mt-20 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
          {JOURNEY.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className="rounded-full border border-white/10 px-3 py-1">{s}</span>
              {i < JOURNEY.length - 1 && <span className="text-marigold">→</span>}
            </span>
          ))}
        </div>
        <p className="mt-16 text-sm text-zinc-500">Your screenplay belongs to you. Projects are private by default.</p>
      </main>
    </>
  );
}
