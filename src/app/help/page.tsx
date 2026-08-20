import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PanelLayout } from "@/components/PanelLayout";
import {
  HelpCircle,
  FileText,
  Sparkles,
  BarChart3,
  ScrollText,
  Briefcase,
  Upload,
  Download,
  Palette,
  Mail,
  MessageCircle,
  BookOpen,
  LifeBuoy,
} from "lucide-react";

export const metadata = {
  title: "Help & Support | AI Resume Builder",
  description: "Get help and support for using AI Resume Builder.",
};

export default async function HelpPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const helpSections = [
    {
      icon: FileText,
      title: "Getting Started",
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
      items: [
        { title: "Create Your First Resume", desc: "Click 'Create Resume' on the dashboard, enter a title and target role, then start filling in your details." },
        { title: "Edit Resume Sections", desc: "Use the tabs in the editor to add personal info, summary, experience, education, skills, projects, and more." },
        { title: "Choose a Template", desc: "Go to the Design tab to switch between 16 professional templates and customize the accent color." },
      ],
    },
    {
      icon: Sparkles,
      title: "AI Features",
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
      items: [
        { title: "Generate Summary", desc: "In the Summary tab, click 'Generate' to have AI write a professional summary based on your skills and experience." },
        { title: "Improve Experience", desc: "Click the wand icon next to any experience to have AI rewrite it with stronger action verbs and metrics." },
        { title: "Suggest Skills", desc: "In the Skills tab, click 'AI Suggest' to get relevant skill recommendations for your target role." },
        { title: "Check Grammar", desc: "Use the grammar check button to proofread and improve your resume content." },
      ],
    },
    {
      icon: BarChart3,
      title: "Analysis Tools",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      items: [
        { title: "ATS Analysis", desc: "Run an ATS compatibility check to see how well your resume performs with Applicant Tracking Systems." },
        { title: "Job Match", desc: "Paste a job description to see how well your resume aligns with the requirements." },
        { title: "Cover Letter", desc: "Generate a professional cover letter based on your resume content." },
      ],
    },
    {
      icon: Upload,
      title: "Import & Export",
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
      items: [
        { title: "Upload Resume", desc: "Upload an existing PDF or DOCX resume and AI will parse it into a structured format." },
        { title: "Download PDF", desc: "Export your resume as a high-quality PDF using the Download PDF button." },
        { title: "Export DOCX", desc: "Export your resume as a Word document for further editing." },
        { title: "JSON Import/Export", desc: "Backup or transfer your resume data using the JSON import/export feature." },
      ],
    },
    {
      icon: Palette,
      title: "Customization",
      color: "text-pink-400",
      bg: "bg-pink-500/10 border-pink-500/20",
      items: [
        { title: "Templates", desc: "Choose from 16 different resume templates including Classic, Modern, Minimal, Executive, Creative, and more." },
        { title: "Theme Colors", desc: "Customize the accent color of your resume to match your personal brand." },
        { title: "Section Ordering", desc: "Use the up/down arrows to reorder sections like experience, education, and skills." },
      ],
    },
    {
      icon: LifeBuoy,
      title: "Troubleshooting",
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/20",
      items: [
        { title: "AI Features Not Working", desc: "Make sure the OMNIROUTE_API_KEY is configured in your environment variables." },
        { title: "Upload Fails", desc: "Ensure your file is a valid PDF or DOCX. Very complex resumes may need manual entry." },
        { title: "PDF Download Issues", desc: "Try using the Print button as a fallback if PDF generation fails." },
      ],
    },
  ];

  return (
    <PanelLayout>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-8">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Help &{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Support
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Everything you need to know about using AI Resume Builder.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:support@airesumebuilder.com"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition"
            >
              <Mail className="h-4 w-4" />
              Contact Support
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <a href="#getting-started" className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-slate-700 transition">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Getting Started</p>
              <p className="text-xs text-slate-400">Learn the basics</p>
            </div>
          </a>
          <a href="#ai-features" className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-slate-700 transition">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">AI Features</p>
              <p className="text-xs text-slate-400">Use AI assistance</p>
            </div>
          </a>
          <a href="#troubleshooting" className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-slate-700 transition">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Troubleshooting</p>
              <p className="text-xs text-slate-400">Fix common issues</p>
            </div>
          </a>
        </div>

        {/* Help Sections */}
        <div className="mt-8 space-y-6">
          {helpSections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} id={section.title.toLowerCase().replace(/\s+/g, "-")} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${section.bg}`}>
                    <Icon className={`h-5 w-5 ${section.color}`} />
                  </div>
                  <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {section.items.map((item) => (
                    <div key={item.title} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 p-6 text-center">
          <HelpCircle className="h-10 w-10 text-blue-400 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-white">Still Need Help?</h2>
          <p className="mt-1 text-sm text-slate-400 max-w-md mx-auto">
            Our support team is here to help you with any questions or issues you may have.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <a
              href="mailto:support@airesumebuilder.com"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-500 transition"
            >
              <Mail className="h-3.5 w-3.5" />
              Email Support
            </a>
            <a
              href="/dashboard"
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
            >
              <FileText className="h-3.5 w-3.5" />
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
}