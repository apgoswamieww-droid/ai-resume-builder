"use client";

import { useState, useMemo } from "react";
import { ResumeCard } from "./ResumeCard";
import { CreateResumeModal } from "./CreateResumeModal";
import { UploadResumeButton } from "./UploadResumeButton";
import { Search, SortDesc, ArrowUpDown, FileText, Layout, Sparkles } from "lucide-react";

interface ResumeData {
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
}

interface DashboardContentProps {
  resumes: ResumeData[];
  totalResumes: number;
  totalSections: number;
  userName: string;
}

type SortKey = "updatedAt" | "title" | "atsScore";

export function DashboardContent({ resumes, totalResumes, totalSections, userName }: DashboardContentProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("updatedAt");

  const filtered = useMemo(() => {
    let list = resumes;

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((r) => r.title.toLowerCase().includes(q) || (r.targetRole?.toLowerCase() || "").includes(q));
    }

    return [...list].sort((a, b) => {
      switch (sortKey) {
        case "title":
          return a.title.localeCompare(b.title);
        case "atsScore":
          return (b.atsScore ?? 0) - (a.atsScore ?? 0);
        case "updatedAt":
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });
  }, [resumes, search, sortKey]);

  return (
    <>
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-8">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              {userName}
            </span>
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Build, optimize, and manage your ATS-compliant resumes with AI.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <UploadResumeButton />
          <CreateResumeModal />
        </div>
      </div>

      {/* Overview Stats Bar */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 dashboard-stat-grid">
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

      {/* Search & Sort Bar */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 shrink-0">
          <span>Your Resumes</span>
          <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-300">
            {filtered.length}
          </span>
        </h2>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by title or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs px-1">
                ✕
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="appearance-none rounded-xl border border-slate-800 bg-slate-950 pl-3 pr-8 py-2 text-xs text-white focus:border-blue-500 focus:outline-none transition cursor-pointer"
            >
              <option value="updatedAt">Last Updated</option>
              <option value="title">Title A-Z</option>
              <option value="atsScore">ATS Score</option>
            </select>
            <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Resumes Grid */}
      <div className="mt-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-400 border border-blue-500/20 mb-4">
              <FileText className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              {search ? "No resumes match your search" : "No resumes created yet"}
            </h3>
            <p className="mt-1 max-w-sm text-sm text-slate-400">
              {search ? "Try a different search term or clear the filter." : "Get started by creating your first AI-enhanced resume."}
            </p>
            {!search && (
              <div className="mt-6">
                <CreateResumeModal />
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
