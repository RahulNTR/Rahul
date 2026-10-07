import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions";

export default async function Nav() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={user ? "/dashboard" : "/"} className="font-display text-xl">
          Script <span className="text-marigold">Sahayak</span>
        </Link>
        {user ? (
          <div className="flex items-center gap-3 text-sm text-zinc-400">
            <span className="hidden sm:inline">{user.email}</span>
            <form action={signOut}><button className="btn-ghost">Sign out</button></form>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/login" className="btn-ghost">Log in</Link>
            <Link href="/signup" className="btn-primary">Start writing</Link>
          </div>
        )}
      </div>
    </header>
  );
}
