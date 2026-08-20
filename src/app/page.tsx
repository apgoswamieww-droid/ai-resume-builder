import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation"
import { Sparkles, ArrowRight, FileText, Zap, Shield, CheckCircle2, BarChart3 } from "lucide-react"

function SignInButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github", { redirectTo: "/dashboard" })
      }}
    >
      <button
        type="submit"
        className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-200"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302.866 10.064 2.3 14.2C3.94 23.73 5.66 24 7.3 24c1.55 0 2.75-.65 3.5-1.6.75 1.05 1.95 1.6 3.5 1.6 1.64 0 2.85-0.3 3.6-1.3.75 1.05 1.95 1.6 3.5 1.6 1.64 0 2.85-0.3 3.6-1.3C21.34 18.064 24 13.302 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
        Continue with GitHub
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  )
}

export default async function Home() {
  const session = await auth()
  if (session?.user) redirect("/dashboard")

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 font-bold text-xl text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 shadow-md shadow-blue-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              AI Resume Builder
            </span>
          </div>

          <form
            action={async () => {
              "use server"
              await signIn("github", { redirectTo: "/dashboard" })
            }}
          >
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition-all duration-200"
            >
              Sign In
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="relative px-4 pt-24 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-400 mb-6 backdrop-blur-sm">
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
              Craft stunning, professional resumes tailored to target roles. Boost your ATS scores, generate compelling job descriptions, and land more interviews.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4">
              <SignInButton />
              <p className="text-xs text-slate-500">Free to start. No credit card required.</p>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <FileText className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-white">16</p>
                  <p className="text-xs text-slate-400">Professional Templates</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <Shield className="h-5 w-5 text-indigo-400" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-white">100%</p>
                  <p className="text-xs text-slate-400">ATS Compatible</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <Zap className="h-5 w-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-white">AI</p>
                  <p className="text-xs text-slate-400">Writing & Analysis</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 text-left">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm hover:border-slate-700 transition">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-4 border border-blue-500/20">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-white text-base">ATS Friendly</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Clean, parser-ready templates engineered to pass Applicant Tracking Systems seamlessly.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm hover:border-slate-700 transition">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 mb-4 border border-indigo-500/20">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-white text-base">AI Writing Assistance</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Generate professional summaries, improve bullet points, and highlight key skills with AI.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm hover:border-slate-700 transition">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 mb-4 border border-purple-500/20">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-white text-base">ATS Scoring & Match</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Analyze your resume against job descriptions and get a real ATS compatibility score.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
      </footer>
    </div>
  )
}
