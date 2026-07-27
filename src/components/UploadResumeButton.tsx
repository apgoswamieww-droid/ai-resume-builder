"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, FileText } from "lucide-react";
import { extractTextFromFile } from "@/actions/parse-resume";
import { parseResumeText } from "@/actions/ai";
import { createResumeFromParsed, ParsedResumeData } from "@/actions/resume";

export function UploadResumeButton() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setStatus("Extracting text...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const rawText = await extractTextFromFile(formData);

      setStatus("Parsing with AI...");
      const parsedJson = await parseResumeText(rawText);

      const parsed: ParsedResumeData = JSON.parse(parsedJson);

      setStatus("Creating resume...");
      const resume = await createResumeFromParsed(parsed);

      setStatus("Analyzing ATS...");
      router.push(`/builder/${resume.id}`);
    } catch (err: any) {
      alert(`Upload failed: ${err?.message || "Could not parse resume"}`);
      setLoading(false);
      setStatus("");
    }

    setLoading(false);
    setStatus("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.docx"
        onChange={handleUpload}
        className="hidden"
      />
      <button
        onClick={() => fileRef.current?.click()}
        disabled={loading}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow shadow-purple-500/20 hover:from-purple-500 hover:to-indigo-500 transition disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{status}</span>
          </>
        ) : (
          <>
            <Upload className="h-4 w-4" />
            <span>Upload Resume</span>
          </>
        )}
      </button>
    </>
  );
}
