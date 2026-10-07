"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { STAGES } from "@/lib/constants";

export async function signIn(_: unknown, formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  });
  if (error) return { error: error.message };
  redirect("/dashboard");
}

export async function signUp(_: unknown, formData: FormData) {
  const supabase = createClient();
  const origin = headers().get("origin") ?? "";
  const { error } = await supabase.auth.signUp({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
    options: {
      data: { full_name: String(formData.get("name") ?? "") },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) return { error: error.message };
  return { message: "Check your email to confirm your account." };
}

export async function signInWithOAuth(provider: "google" | "apple") {
  const supabase = createClient();
  const origin = headers().get("origin") ?? "";
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${origin}/auth/callback` },
  });
  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  redirect(data.url);
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function createProject(_: unknown, formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Give your project a name." };

  const { data, error } = await supabase
    .from("projects")
    .insert({
      user_id: user.id,
      name,
      format: String(formData.get("format")),
      language: String(formData.get("language")),
      genres: formData.getAll("genres").map(String),
      audience: formData.getAll("audience").map(String),
      tones: formData.getAll("tones").map(String),
      idea: String(formData.get("idea") ?? "").trim() || null,
      stage: STAGES[0],
      progress: 0,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  redirect(`/projects/${data.id}`);
}

export async function duplicateProject(id: string) {
  const supabase = createClient();
  const { data: p } = await supabase.from("projects").select("*").eq("id", id).single();
  if (!p) return;
  const { id: _id, created_at, updated_at, ...rest } = p;
  await supabase.from("projects").insert({ ...rest, name: `${p.name} (copy)` });
  revalidatePath("/dashboard");
}

export async function setArchived(id: string, archived: boolean) {
  const supabase = createClient();
  await supabase.from("projects").update({ status: archived ? "archived" : "active" }).eq("id", id);
  revalidatePath("/dashboard");
}

export async function deleteProject(id: string) {
  const supabase = createClient();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateProject(id: string, _: unknown, formData: FormData) {
  const supabase = createClient();
  const stage = String(formData.get("stage"));
  const idx = Math.max(0, STAGES.indexOf(stage as (typeof STAGES)[number]));
  const { error } = await supabase
    .from("projects")
    .update({
      name: String(formData.get("name")),
      idea: String(formData.get("idea") ?? "") || null,
      stage,
      progress: Math.round((idx / (STAGES.length - 1)) * 100),
    })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath(`/projects/${id}`);
  return { message: "Saved." };
}
