"use client";

import { useFormState } from "react-dom";
import { updateProject } from "@/app/actions";
import { STAGES, type Project } from "@/lib/constants";

export default function EditForm({ p }: { p: Project }) {
  const [state, action] = useFormState(updateProject.bind(null, p.id), null as any);
  return (
    <form action={action} className="space-y-5">
      <div><label className="label">Name</label><input name="name" defaultValue={p.name} className="input" /></div>
      <div>
        <label className="label">Current stage</label>
        <select name="stage" defaultValue={p.stage} className="input">{STAGES.map((s) => <option key={s}>{s}</option>)}</select>
      </div>
      <div><label className="label">Idea</label><textarea name="idea" rows={6} defaultValue={p.idea ?? ""} className="input" /></div>
      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
      {state?.message && <p className="text-sm text-emerald-400">{state.message}</p>}
      <button className="btn-primary">Save</button>
    </form>
  );
}
