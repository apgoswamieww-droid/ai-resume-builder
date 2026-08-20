"use client";

import { useState } from "react";
import { X, Loader2, Check, Briefcase } from "lucide-react";

interface JobMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchResult: string | null;
  loading: boolean;
  jobDescription: string;
  setJobDescription: (desc: string) => void;
  onAnalyze: () => void;
}

export function JobMatchModal({
  isOpen,
  onClose,
  matchResult,
  loading,
  jobDescription,
  setJobDescription,
  onAnalyze
}: JobMatchModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Job Match Analysis
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Paste Job Description</label>
          <textarea
            rows={6}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here to compare against your resume..."
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-sm text-white focus:border-blue-500 focus:outline-none leading-relaxed"
            disabled={loading}
          />
        </div>

        {loading ? (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3 text-purple-400" />
            <p className="text-sm text-slate-400">Analyzing your resume against the job description...</p>
          </div>
        ) : matchResult ? (
          <div className="prose prose-invert prose-sm max-w-none space-y-4">
            {matchResult.split("\n").map((line, i) => {
              if (line.startsWith("# ")) {
                const scoreMatch = line.match(/(\d{1,3})\s*%/);
                return (
                  <div key={i} className="flex items-center gap-3 mb-4">
                    {scoreMatch && (
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-xl font-bold text-white">
                        {scoreMatch[1]}%
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-white m-0">{line.replace(/^#+\s*/, "")}</h3>
                  </div>
                );
              }
              if (line.startsWith("## ")) {
                return <h4 key={i} className="text-base font-semibold text-emerald-300 mt-4 mb-2">{line.replace(/^##+\s*/, "")}</h4>;
              }
              if (line.startsWith("- ")) {
                return <li key={i} className="text-sm text-slate-300 ml-4 list-disc">{line.replace(/^- /, "")}</li>;
              }
              if (line.trim() === "") {
                return <br key={i} />;
              }
              return <p key={i} className="text-sm text-slate-300">{line}</p>;
            })}
            <div className="flex justify-end mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-500 transition"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Briefcase className="h-10 w-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">Paste a job description and click <span className="text-purple-400 font-semibold">Analyze Match</span> to see how well your resume aligns.</p>
          </div>
        )}

        <button
          onClick={onAnalyze}
          disabled={loading || !jobDescription.trim()}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-purple-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Briefcase className="h-4 w-4" />
          )}
          {loading ? "Analyzing..." : "Analyze Match"}
        </button>
      </div>
    </div>
  );
}