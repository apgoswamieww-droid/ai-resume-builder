"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { Pencil, Check, X, Loader2 } from "lucide-react";
import { updateResumeDetails } from "@/actions/resume-editor";
import { useRouter } from "next/navigation";

export function RenameButton({ resumeId, initialTitle }: { resumeId: string; initialTitle: string }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(initialTitle);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleSave = () => {
    if (draft.trim() && draft !== initialTitle) {
      startTransition(async () => {
        await updateResumeDetails(resumeId, { title: draft.trim() });
        router.refresh();
        setEditing(false);
      });
    } else {
      setDraft(initialTitle);
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setDraft(initialTitle);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="flex items-center gap-1.5">
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
          className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-sm font-semibold text-white focus:border-blue-500 focus:outline-none w-64"
        />
        <button onClick={handleSave} disabled={isPending} className="p-1 text-blue-400 hover:text-blue-300 transition">
          {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
        </button>
        <button onClick={handleCancel} className="p-1 text-slate-500 hover:text-white transition">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 group">
      <h1 className="font-semibold text-sm text-white truncate max-w-xs sm:max-w-md">
        {initialTitle}
      </h1>
      <button
        onClick={() => setEditing(true)}
        className="p-1 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-blue-400 transition"
      >
        <Pencil className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
