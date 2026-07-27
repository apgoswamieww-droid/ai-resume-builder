import Link from "next/link";
import { auth, signOut } from "@/auth";
import { FileText, LogOut, User as UserIcon, Sparkles } from "lucide-react";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 shadow-md shadow-blue-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            AI Resume Builder
          </span>
        </Link>

        {session?.user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-full bg-slate-900/80 px-3 py-1.5 border border-slate-800">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User Avatar"}
                  className="h-7 w-7 rounded-full object-cover border border-slate-700"
                />
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600/30 text-blue-400 font-semibold text-xs border border-blue-500/30">
                  <UserIcon className="h-3.5 w-3.5" />
                </div>
              )}
              <span className="text-xs font-medium text-slate-300 hidden sm:inline-block">
                {session.user.name || session.user.email}
              </span>
            </div>

            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline-block">Sign Out</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
