"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

export function PreviewToggle() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const pane = document.getElementById("preview-pane");
    if (!pane) return;
    if (show) {
      pane.classList.remove("hidden");
      pane.classList.add("fixed", "inset-0", "z-50", "flex");
      document.body.style.overflow = "hidden";
    } else {
      pane.classList.add("hidden");
      pane.classList.remove("fixed", "inset-0", "z-50", "flex");
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [show]);

  return (
    <button
      onClick={() => setShow(!show)}
      className="lg:hidden flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
      title={show ? "Hide preview" : "Show preview"}
    >
      {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
      <span className="hidden sm:inline">{show ? "Editor" : "Preview"}</span>
    </button>
  );
}
