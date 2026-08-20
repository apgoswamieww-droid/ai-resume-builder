"use client";

import { useRef, useState } from "react";
import { Download, Upload, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { importResumeData } from "@/actions/resume-editor";
import { useToast } from "@/providers/ToastProvider";

interface ImportExportProps {
  resume: {
    id: string;
    title: string;
    targetRole?: string | null;
    summary?: string | null;
    themeColor?: string;
    templateId?: string;
    personalInfo?: {
      fullName?: string | null;
      email?: string | null;
      phone?: string | null;
      location?: string | null;
      jobTitle?: string | null;
      website?: string | null;
      linkedin?: string | null;
      github?: string | null;
    } | null;
  };
}

export function ImportExportButton({ resume }: ImportExportProps) {
  const [importing, setImporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { addToast } = useToast();

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${resume.title.replace(/\s+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      await importResumeData(resume.id, data);
      router.refresh();
      addToast("Resume data imported successfully!", "success");
    } catch (err) {
      addToast("Failed to import: invalid JSON file", "error");
    }
    setImporting(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
      <button
        onClick={handleExport}
        className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
        title="Export as JSON"
      >
        <Download className="h-3.5 w-3.5" />
        Export
      </button>
      <button
        onClick={() => fileRef.current?.click()}
        disabled={importing}
        className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition disabled:opacity-50"
        title="Import from JSON"
      >
        {importing ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Upload className="h-3.5 w-3.5" />
        )}
        Import
      </button>
    </>
  );
}
