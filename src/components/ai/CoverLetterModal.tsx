"use client";

import { useState } from "react";
import { X, Loader2, Check, ScrollText } from "lucide-react";

interface CoverLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  coverLetter: string | null;
  loading: boolean;
  companyName: string;
  setCompanyName: (name: string) => void;
}

export function CoverLetterModal({
  isOpen,
  onClose,
  coverLetter,
  loading,
  companyName,
  setCompanyName
}: CoverLetterModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <ScrollText className="h-5 w-5" />
            Cover Letter Generator
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Company Name (Optional)</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company name for personalized cover letter"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3 text-purple-400" />
            <p className="text-sm text-slate-400">Writing your cover letter...</p>
          </div>
        ) : coverLetter ? (
          <div className="space-y-4">
            <textarea
              readOnly
              rows={18}
              value={coverLetter}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-sm text-white leading-relaxed focus:outline-none resize-none"
            />
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
            <ScrollText className="h-10 w-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">Generate a professional cover letter based on your resume.</p>
          </div>
        )}
      </div>
    </div>
  );
}