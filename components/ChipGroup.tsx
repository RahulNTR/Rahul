"use client";

import { useState } from "react";

export default function ChipGroup({ name, options, multi = true }: { name: string; options: readonly string[]; multi?: boolean }) {
  const [sel, setSel] = useState<string[]>([]);
  const toggle = (o: string) =>
    setSel((s) => (s.includes(o) ? s.filter((x) => x !== o) : multi ? [...s, o] : [o]));
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button type="button" key={o} onClick={() => toggle(o)} className={`chip ${sel.includes(o) ? "chip-on" : ""}`}>
          {o}
        </button>
      ))}
      {sel.map((s) => <input key={s} type="hidden" name={name} value={s} />)}
    </div>
  );
}
