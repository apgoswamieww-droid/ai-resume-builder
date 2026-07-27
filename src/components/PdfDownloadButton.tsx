"use client";

import { useState } from "react";
import { Loader2, FileDown } from "lucide-react";

export function PdfDownloadButton({ resumeId }: { resumeId: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const domtoimage = (await import("dom-to-image-more")).default;
      const jsPDF = (await import("jspdf")).default;

      const previewEl = document.querySelector(".lg\\:flex .shadow-2xl") as HTMLElement;
      if (!previewEl) {
        window.print();
        return;
      }

      const dataUrl = await domtoimage.toPng(previewEl, {
        width: previewEl.scrollWidth,
        height: previewEl.scrollHeight,
        style: {
          transform: "scale(1)",
        },
      });

      const imgWidth = 210;
      const imgHeight = (previewEl.scrollHeight * imgWidth) / previewEl.scrollWidth;

      const pdf = new jsPDF("p", "mm", "a4");
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= 297;

      while (heightLeft > 0) {
        position -= 297;
        pdf.addPage();
        pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= 297;
      }

      pdf.save("resume.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
      window.print();
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow shadow-emerald-500/20 hover:from-emerald-500 hover:to-teal-500 transition disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <FileDown className="h-3.5 w-3.5" />
      )}
      <span>Download PDF</span>
    </button>
  );
}
