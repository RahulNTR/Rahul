"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createProject } from "@/app/actions";
import ChipGroup from "@/components/ChipGroup";
import { FORMATS, LANGUAGES, GENRES, AUDIENCES, TONES } from "@/lib/constants";

function Submit() {
  const { pending } = useFormStatus();
  return <button className="btn-primary px-6 py-3" disabled={pending}>{pending ? "Creating…" : "Create project"}</button>;
}

export default function NewProjectForm() {
  const [state, action] = useFormState(createProject, null as any);
  return (
    <form action={action} className="space-y-8">
      <div><label className="label">Project name</label><input name="name" placeholder="The Last Monsoon" className="input text-lg" required /></div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="label">Format</label>
          <select name="format" className="input">{FORMATS.map((f) => <option key={f}>{f}</option>)}</select>
        </div>
        <div>
          <label className="label">Language</label>
          <select name="language" className="input" defaultValue="Telugu">{LANGUAGES.map((l) => <option key={l}>{l}</option>)}</select>
        </div>
      </div>
      <div><label className="label">Genre</label><ChipGroup name="genres" options={GENRES} /></div>
      <div><label className="label">Audience</label><ChipGroup name="audience" options={AUDIENCES} /></div>
      <div><label className="label">Tone</label><ChipGroup name="tones" options={TONES} /></div>
      <div>
        <label className="label">Tell us your idea (optional)</label>
        <textarea name="idea" rows={5} className="input"
          placeholder="A failed police officer returns to his village after 15 years and discovers that his father's death wasn't an accident." />
      </div>
      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
      <Submit />
    </form>
  );
}
