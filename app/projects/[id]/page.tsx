import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import EditForm from "./EditForm";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/constants";

const SECTIONS = ["Overview", "Idea", "Story", "Characters", "Structure", "Scenes", "Screenplay", "AI Review", "Export"];

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data } = await supabase.from("projects").select("*").eq("id", params.id).single();
  if (!data) notFound();
  const p = data as Project;

  return (
    <>
      <Nav />
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[200px_1fr]">
        <aside className="space-y-1 text-sm">
          <Link href="/dashboard" className="mb-4 block text-zinc-500">← My Projects</Link>
          {SECTIONS.map((s, i) => (
            <div key={s} className={`rounded-lg px-3 py-2 ${i === 0 ? "bg-white/5 text-marigold" : "text-zinc-500"}`}>
              {s}{i > 0 && <span className="ml-2 text-[10px] uppercase">soon</span>}
            </div>
          ))}
        </aside>
        <main>
          <h1 className="font-display text-4xl">{p.name}</h1>
          <p className="mt-2 text-zinc-400">{p.language} | {p.genres.join(", ") || "—"} | {p.format}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="card"><p className="label">Stage</p><p>{p.stage}</p></div>
            <div className="card"><p className="label">Progress</p><p>{p.progress}%</p></div>
            <div className="card"><p className="label">Tone</p><p>{p.tones.join(", ") || "—"}</p></div>
          </div>
          <div className="card mt-6"><EditForm p={p} /></div>
        </main>
      </div>
    </>
  );
}
