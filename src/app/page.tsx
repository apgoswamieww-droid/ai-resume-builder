import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Sparkles, ArrowRight, CheckCircle2, Shield, Zap, FileText } from "lucide-react";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 font-bold text-xl text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 shadow-md shadow-blue-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              AI Resume Builder
            </span>
          </div>

          <Link
            href="/login"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition"
          >
            Sign In <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden px-4 pt-20 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-400 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Next-Gen AI Resume & Career Platform</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl leading-tight">
              Build ATS-Optimized Resumes in{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Minutes with AI
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Craft stunning, professional resumes tailored to target roles. Boost your ATS scores, generate compelling job descriptions, and stand out to recruiters.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Feature highlights */}
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 text-left">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-4 border border-blue-500/20">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-white text-base">ATS Friendly</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Clean, parser-ready templates engineered to pass Application Tracking Systems seamlessly.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 mb-4 border border-indigo-500/20">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-white text-base">AI Writing Assistance</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Generate professional summaries, improve work bullet points, and highlight key skills.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 mb-4 border border-purple-500/20">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-white text-base">Instant Live Preview</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  See real-time design updates as you type and export high-resolution PDFs in one click.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
      </footer>
    </div>
  );
}
