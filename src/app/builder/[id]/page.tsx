import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { getResumeById } from "@/actions/resume-editor";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ResumeFormEditor } from "@/components/editor/ResumeFormEditor";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { PdfDownloadButton } from "@/components/PdfDownloadButton";
import { DocxExportButton } from "@/components/DocxExportButton";
import { RenameButton } from "@/components/RenameButton";
import { ImportExportButton } from "@/components/ImportExportButton";
import { PreviewToggle } from "@/components/PreviewToggle";

interface BuilderPageProps {
  params: Promise<{ id: string }>;
}

export default async function BuilderPage({ params }: BuilderPageProps) {
  const session = await auth();
  if (!session?.user) redirect("/");

  const { id } = await params;
  const resume = await getResumeById(id);

  if (!resume) notFound();

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Header */}
      <header className="flex h-14 items-center justify-between border-b border-slate-800 bg-slate-950 px-4">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </Link>
          <div className="h-4 w-px bg-slate-800" />
          <RenameButton resumeId={resume.id} initialTitle={resume.title} />
        </div>

        <div className="flex items-center gap-3">
          <ImportExportButton resume={resume} />
          <DocxExportButton resume={resume} />
          <PdfDownloadButton resumeId={resume.id} />
          <PreviewToggle />
        </div>
      </header>

      {/* Main Split Screen Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Form Editor Pane (50% on desktop, full on mobile) */}
        <div className="w-full lg:w-1/2 h-full overflow-hidden" id="editor-pane">
          <ResumeFormEditor resume={resume} />
        </div>

        {/* Right Preview Sheet Pane (50% on desktop, full overlay on mobile via toggle) */}
        <div className="hidden lg:flex w-1/2 h-full bg-slate-950 p-6 overflow-y-auto items-start justify-center" id="preview-pane">
          <div className="w-full max-w-[750px] shadow-2xl rounded-sm overflow-hidden border border-slate-800 bg-white">
            <TemplateRenderer resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
}
