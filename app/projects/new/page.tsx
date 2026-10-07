import Nav from "@/components/Nav";
import NewProjectForm from "./NewProjectForm";

export default function NewProject() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="font-display text-3xl">New Project</h1>
        <p className="mt-2 text-zinc-400">Set the basics. You can change everything later.</p>
        <div className="card mt-8"><NewProjectForm /></div>
      </main>
    </>
  );
}
