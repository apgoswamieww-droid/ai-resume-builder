"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition"
    >
      <Printer className="h-3.5 w-3.5" />
      <span>Print / PDF</span>
    </button>
  );
}
