"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { signIn, signUp, signInWithOAuth } from "@/app/actions";

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return <button className="btn-primary w-full" disabled={pending}>{pending ? "…" : label}</button>;
}

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [state, action] = useFormState(mode === "login" ? signIn : signUp, null as any);
  return (
    <div className="mx-auto mt-20 w-full max-w-sm card">
      <h1 className="font-display text-2xl">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
      <form action={action} className="mt-6 space-y-4">
        {mode === "signup" && (
          <div><label className="label">Name</label><input name="name" className="input" /></div>
        )}
        <div><label className="label">Email</label><input name="email" type="email" required className="input" /></div>
        <div><label className="label">Password</label><input name="password" type="password" minLength={8} required className="input" /></div>
        {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
        {state?.message && <p className="text-sm text-emerald-400">{state.message}</p>}
        <Submit label={mode === "login" ? "Log in" : "Sign up"} />
      </form>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <form action={signInWithOAuth.bind(null, "google")}><button className="btn-ghost w-full">Google</button></form>
        <form action={signInWithOAuth.bind(null, "apple")}><button className="btn-ghost w-full">Apple</button></form>
      </div>
      <p className="mt-6 text-center text-sm text-zinc-400">
        {mode === "login" ? (
          <>New here? <Link href="/signup" className="text-marigold">Create an account</Link></>
        ) : (
          <>Have an account? <Link href="/login" className="text-marigold">Log in</Link></>
        )}
      </p>
    </div>
  );
}
