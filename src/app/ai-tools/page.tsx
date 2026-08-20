import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PanelLayout } from "@/components/PanelLayout";
import {
  Sparkles,
  FileText,
  Wand2,
  Wrench,
  Check,
  BarChart3,
  ScrollText,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "AI Tools | AI Resume Builder",
  description: "Explore AI-powered tools to enhance your resume.",
};

export default async function AIToolsPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const tools = [
    {
      icon: FileText,
      title: "Generate Summary",
      desc: "Create a compelling professional summary based on your skills and experience.",
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
      href: "/dashboard",
      action: "Open Editor",
    },
    {
      icon: Wand2,
      title: "Improve Experience",
      desc: "Rewrite your work experience with stronger action verbs and quantifiable achievements.",
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
      href: "/dashboard",
      action: "Open Editor",
    },
    {
      icon: Wrench,
      title: "Suggest Skills",
      desc: "Get AI-recommended skills for your target role to strengthen your resume.",
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/20",
      href: "/dashboard",
      action: "Open Editor",
    },
    {
      icon: Check,
      title: "Check Grammar",
      desc: "Proofread and improve your resume content with AI-powered grammar checking.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      href: "/dashboard",
      action: "Open Editor",
    },
    {
      icon: BarChart3,
      title: "ATS Analysis",
      desc: "Check how well your resume performs with Applicant Tracking Systems.",
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
      href: "/dashboard",
      action: "Run Analysis",
    },
    {
      icon: ScrollText,
      title: "Cover Letter",
      desc: "Generate a professional cover letter tailored to your resume and target role.",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
      href: "/dashboard",
      action: "Generate",
    },
    {
      icon: Briefcase,
      title: "Job Match",
      desc: "Compare your resume against a job description to see how well you align.",
      color: "text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/20",
      href: "/dashboard",
      action: "Analyze Match",
    },
  ];

  return (
    <PanelLayout>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-8">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              AI{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Tools
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Powerful AI-powered tools to enhance your resume and career documents.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition"
          >
            <Sparkles className="h-4 w-4" />
            Open Resume Editor
          </Link>
        </div>

        {/* Tools Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.title}
                href={tool.href}
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-700 hover:bg-slate-900 transition"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${tool.bg}`}>
                  <Icon className={`h-5 w-5 ${tool.color}`} />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-white">{tool.title}</h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">{tool.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-blue-400 group-hover:text-blue-300 transition">
                  {tool.action}
                  <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Info Banner */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-gradient-to-r from-purple-600/10 via-indigo-600/10 to-blue-600/10 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">How AI Tools Work</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                All AI tools are available directly in the resume editor. Open any resume, navigate to the relevant tab
                (Summary, Experience, Skills, ATS, Cover Letter, or Job Match), and click the AI-powered button to
                generate content. The AI uses your resume data and target role to provide personalized suggestions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
}