import Link from "next/link";
import { auth } from "@/auth";
import { Sparkles } from "lucide-react";
import { ProfileDropdown } from "./ProfileDropdown";
import { Sidebar } from "./Sidebar";

interface PanelLayoutProps {
  children: React.ReactNode;
  resumeCount?: number;
}

export async function PanelLayout({ children, resumeCount = 0 }: PanelLayoutProps) {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 shadow-md shadow-blue-500/20">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent hidden sm:inline">
                AI Resume Builder
              </span>
            </Link>
          </div>

          {user && (
            <div className="flex items-center gap-3">
              <ProfileDropdown
                user={{
                  name: user.name,
                  email: user.email,
                  image: user.image,
                }}
              />
            </div>
          )}
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          userName={user?.name}
          userEmail={user?.email}
          userImage={user?.image}
          resumeCount={resumeCount}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p>© {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
          <p className="mt-1 text-[10px] text-slate-600">
            Build ATS-optimized resumes with AI assistance
          </p>
        </div>
      </footer>
    </div>
  );
}