"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  FileText,
  Edit3,
  Copy,
  Trash2,
  MoreVertical,
  Calendar,
  Briefcase,
  Loader2,
  Pencil,
} from "lucide-react";
import { deleteResume, duplicateResume } from "@/actions/resume";
import { updateResumeDetails } from "@/actions/resume-editor";
import { useRouter } from "next/navigation";

interface ResumeCardProps {
  resume: {
    id: string;
    title: string;
    targetRole?: string | null;
    updatedAt: Date;
    themeColor?: string;
    templateId?: string;
    atsScore?: number | null;
    matchScore?: number | null;
    experiences?: unknown[];
    educations?: unknown[];
    skills?: unknown[];
    projects?: unknown[];
  };
}

export function ResumeCard({ resume }: ResumeCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [renaming, setRenaming] = useState(false);
  const [renameDraft, setRenameDraft] = useState(resume.title);
  const router = useRouter();

  const handleDuplicate = () => {
    setShowMenu(false);
    startTransition(async () => {
      try {
        await duplicateResume(resume.id);
        router.refresh();
      } catch (err) {
        console.error("Failed to duplicate resume:", err);
      }
    });
  };

  const handleDelete = () => {
    if (!confirm(`Are you sure you want to delete "${resume.title}"?`)) return;
    setShowMenu(false);
    startTransition(async () => {
      try {
        await deleteResume(resume.id);
        router.refresh();
      } catch (err) {
        console.error("Failed to delete resume:", err);
      }
    });
  };

  const handleRename = () => {
    setShowMenu(false);
    setRenaming(true);
    setRenameDraft(resume.title);
  };

  const submitRename = () => {
    if (!renameDraft.trim()) return;
    setRenaming(false);
    startTransition(async () => {
      await updateResumeDetails(resume.id, { title: renameDraft.trim() });
      router.refresh();
    });
  };

  const updatedDate = new Date(resume.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const sectionCount =
    (resume.experiences?.length || 0) +
    (resume.educations?.length || 0) +
    (resume.skills?.length || 0) +
    (resume.projects?.length || 0);

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/90 p-5 transition-all duration-200 hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl hover:shadow-blue-950/20">
      {/* Top Header & Actions */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-700/60 shadow-inner"
              style={{ backgroundColor: `${resume.themeColor || "#3b82f6"}15` }}
            >
              <FileText
                className="h-5 w-5"
                style={{ color: resume.themeColor || "#3b82f6" }}
              />
            </div>
              <div>
                {renaming ? (
                  <form onSubmit={(e) => { e.preventDefault(); submitRename(); }}>
                    <input
                      type="text"
                      value={renameDraft}
                      onChange={(e) => setRenameDraft(e.target.value)}
                      onBlur={submitRename}
                      autoFocus
                      className="w-full rounded-lg border border-blue-500/40 bg-slate-800 px-2 py-1 text-sm text-white focus:outline-none"
                    />
                  </form>
                ) : (
                  <h4 className="font-semibold text-white text-base group-hover:text-blue-400 transition line-clamp-1">
                    {resume.title}
                  </h4>
                )}
              {resume.targetRole ? (
                <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                  <Briefcase className="h-3 w-3 text-slate-500" />
                  <span>{resume.targetRole}</span>
                </div>
              ) : (
                <span className="text-xs text-slate-500 italic mt-0.5 block">
                  No target role set
                </span>
              )}
            </div>
          </div>

          {/* Context Menu Button */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              disabled={isPending}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
              ) : (
                <MoreVertical className="h-4 w-4" />
              )}
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-8 z-20 w-40 rounded-xl border border-slate-800 bg-slate-950 py-1.5 shadow-xl shadow-black/50">
                  <button
                    onClick={handleRename}
                    className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-900 hover:text-white transition"
                  >
                    <Pencil className="h-3.5 w-3.5 text-indigo-400" />
                    Rename
                  </button>
                  <button
                    onClick={handleDuplicate}
                    className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-900 hover:text-white transition"
                  >
                    <Copy className="h-3.5 w-3.5 text-blue-400" />
                    Duplicate
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Preview Summary Box */}
        <div className="mt-4 rounded-xl bg-slate-950/60 p-3.5 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Template</span>
            <span className="capitalize text-slate-200 font-medium">
              {resume.templateId || "Classic"}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Sections Completed</span>
            <span className="text-blue-400 font-semibold">{sectionCount} items</span>
          </div>
          <div className="flex gap-2 pt-1">
            {resume.atsScore != null && (
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                resume.atsScore >= 80 ? "bg-green-500/20 text-green-400" :
                resume.atsScore >= 60 ? "bg-yellow-500/20 text-yellow-400" :
                "bg-red-500/20 text-red-400"
              }`}>
                ATS {resume.atsScore}
              </span>
            )}
            {resume.matchScore != null && (
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                resume.matchScore >= 80 ? "bg-green-500/20 text-green-400" :
                resume.matchScore >= 60 ? "bg-yellow-500/20 text-yellow-400" :
                "bg-red-500/20 text-red-400"
              }`}>
                Match {resume.matchScore}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-800/80 pt-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Calendar className="h-3.5 w-3.5" />
          <span>Updated {updatedDate}</span>
        </div>

        <Link
          href={`/builder/${resume.id}`}
          className="flex items-center gap-1.5 rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400 transition hover:bg-blue-600 hover:text-white"
        >
          <Edit3 className="h-3.5 w-3.5" />
          <span>Edit</span>
        </Link>
      </div>
    </div>
  );
}
