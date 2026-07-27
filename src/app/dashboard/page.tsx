import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserResumes } from "@/actions/resume";
import { Navbar } from "@/components/Navbar";
import { CreateResumeModal } from "@/components/CreateResumeModal";
import { ResumeCard } from "@/components/ResumeCard";
import {
  FileText,
  Sparkles,
  Zap,
  TrendingUp,
  Layout,
  PlusCircle,
} from "lucide-react";

export const metadata = {
  title: "Dashboard | AI Resume Builder",
  description: "Manage your professional ATS-friendly resumes and AI career tools.",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const resumes = await getUserResumes();

  const totalResumes = resumes.length;
  const totalSections = resumes.reduce((acc, r) => {
    return (
      acc +
      (r.experiences?.length || 0) +
      (r.educations?.length || 0) +
      (r.skills?.length || 0) +
      (r.projects?.length || 0)
    );
  }, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-8">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                {session.user.name || "Career Creator"}
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Build, optimize, and manage your ATS-compliant resumes with AI.
            </p>
          </div>

          <div>
            <CreateResumeModal />
          </div>
        </div>

        {/* Overview Stats Bar */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Total Resumes</p>
              <p className="text-2xl font-bold text-white">{totalResumes}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Layout className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Completed Sections</p>
              <p className="text-2xl font-bold text-white">{totalSections}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">AI Readiness</p>
              <p className="text-2xl font-bold text-purple-400">Ready</p>
            </div>
          </div>
        </div>

        {/* Resumes Grid */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span>Your Resumes</span>
              <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-300">
                {totalResumes}
              </span>
            </h2>
          </div>

          {resumes.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-400 border border-blue-500/20 mb-4">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-white">No resumes created yet</h3>
              <p className="mt-1 max-w-sm text-sm text-slate-400">
                Get started by creating your first AI-enhanced resume tailored for your target position.
              </p>
              <div className="mt-6">
                <CreateResumeModal />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
