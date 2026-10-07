import Link from "next/link";
import Nav from "@/components/Nav";
import ProjectCard from "@/components/ProjectCard";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/constants";

export default async function Dashboard({ searchParams }: { searchParams: { view?: string } }) {
  const supabase = createClient();
  const archived = searchParams.view === "archived";
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("status", archived ? "archived" : "active")
    .order("updated_at", { ascending: false });
  const projects = (data ?? []) as Project[];

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-display text-3xl">My Projects</h1>
            <div className="mt-2 flex gap-4 text-sm">
              <Link href="/dashboard" className={!archived ? "text-marigold" : "text-zinc-400"}>Active</Link>
              <Link href="/dashboard?view=archived" className={archived ? "text-marigold" : "text-zinc-400"}>Archived</Link>
            </div>
          </div>
          <Link href="/projects/new" className="btn-primary">+ New Project</Link>
        </div>
        {projects.length === 0 ? (
          <div className="card mt-10 text-center">
            <p className="text-zinc-400">{archived ? "No archived projects." : "Every film starts with an idea. Start yours."}</p>
            {!archived && <Link href="/projects/new" className="btn-primary mt-4">Create your first project</Link>}
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => <ProjectCard key={p.id} p={p} />)}
          </div>
        )}
      </main>
    </>
  );
}
