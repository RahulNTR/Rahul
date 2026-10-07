import Link from "next/link";
import type { Project } from "@/lib/constants";
import { duplicateProject, setArchived, deleteProject } from "@/app/actions";

function ago(iso: string) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))}m ago`;
  if (s < 86400) return `${Math.round(s / 3600)}h ago`;
  return `${Math.round(s / 86400)}d ago`;
}

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="card flex flex-col gap-4">
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl">{p.name}</h3>
          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-zinc-400">
            {p.status === "archived" ? "Archived" : "Draft"}
          </span>
        </div>
        <p className="mt-1 text-sm text-zinc-400">
          {p.language} | {p.genres[0] ?? "—"} | {p.format}
        </p>
      </div>
      <div>
        <div className="mb-1 flex justify-between text-xs text-zinc-400">
          <span>{p.stage}</span><span>{p.progress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/5">
          <div className="h-1.5 rounded-full bg-marigold" style={{ width: `${p.progress}%` }} />
        </div>
      </div>
      <p className="text-xs text-zinc-500">Edited {ago(p.updated_at)}</p>
      <div className="flex flex-wrap gap-2">
        <Link href={`/projects/${p.id}`} className="btn-primary">Continue</Link>
        <form action={duplicateProject.bind(null, p.id)}><button className="btn-ghost">Duplicate</button></form>
        <form action={setArchived.bind(null, p.id, p.status !== "archived")}>
          <button className="btn-ghost">{p.status === "archived" ? "Restore" : "Archive"}</button>
        </form>
        <form action={deleteProject.bind(null, p.id)}><button className="btn-ghost text-red-400">Delete</button></form>
      </div>
    </div>
  );
}
