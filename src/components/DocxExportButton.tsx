"use client";

import { useState } from "react";
import { Loader2, FileDown } from "lucide-react";

interface DocxExportProps {
  resume: {
    title: string;
    targetRole?: string | null;
    summary?: string | null;
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
    experiences?: { company: string; position: string; startDate?: string | null; endDate?: string | null; isCurrent?: boolean; location?: string | null; description?: string | null }[];
    educations?: { institution: string; degree: string; fieldOfStudy?: string | null; startDate?: string | null; endDate?: string | null; gpa?: string | null }[];
    skills?: { name: string; category?: string | null; level?: string | null }[];
    projects?: { title: string; description?: string | null; technologies?: string | null; link?: string | null }[];
    certifications?: { name: string; issuer: string; issueDate?: string | null }[];
  };
}

export function DocxExportButton({ resume }: DocxExportProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } = await import("docx");

      const pi = resume.personalInfo;
      const fullName = pi?.fullName || resume.title || "Resume";
      const contactLine = [pi?.email, pi?.phone, pi?.location].filter(Boolean).join(" | ");
      const links = [pi?.website, pi?.linkedin, pi?.github].filter(Boolean).join(" | ");

      const children: any[] = [];

      children.push(
        new Paragraph({ children: [new TextRun({ text: fullName, bold: true, size: 32, color: "1e40af" })], alignment: AlignmentType.CENTER, spacing: { after: 60 } }),
      );
      if (pi?.jobTitle) {
        children.push(
          new Paragraph({ children: [new TextRun({ text: pi.jobTitle, size: 24, color: "4b5563" })], alignment: AlignmentType.CENTER, spacing: { after: 60 } }),
        );
      }
      if (contactLine) {
        children.push(
          new Paragraph({ children: [new TextRun({ text: contactLine, size: 18, color: "6b7280" })], alignment: AlignmentType.CENTER, spacing: { after: links ? 20 : 200 } }),
        );
      }
      if (links) {
        children.push(
          new Paragraph({ children: [new TextRun({ text: links, size: 18, color: "6b7280" })], alignment: AlignmentType.CENTER, spacing: { after: 200 } }),
        );
      }

      const sectionHeader = (text: string) =>
        new Paragraph({
          children: [new TextRun({ text, bold: true, size: 22, color: "1e40af" })],
          spacing: { before: 300, after: 120 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "1e40af" } },
        });

      if (resume.summary) {
        children.push(sectionHeader("PROFESSIONAL SUMMARY"));
        children.push(
          new Paragraph({ children: [new TextRun({ text: resume.summary, size: 20, color: "374151" })], spacing: { after: 120 } }),
        );
      }

      if (resume.experiences && resume.experiences.length > 0) {
        children.push(sectionHeader("EXPERIENCE"));
        for (const exp of resume.experiences) {
          const dates = [exp.startDate, exp.isCurrent ? "Present" : exp.endDate].filter(Boolean).join(" - ");
          children.push(
            new Paragraph({ spacing: { before: 120 }, children: [
              new TextRun({ text: exp.position, bold: true, size: 20, color: "111827" }),
              new TextRun({ text: dates ? `  |  ${dates}` : "", size: 18, color: "6b7280" }),
            ]}),
          );
          children.push(
            new Paragraph({ children: [new TextRun({ text: exp.company, size: 19, color: "4b5563", italics: true })], spacing: { after: 60 } }),
          );
          if (exp.description) {
            children.push(
              new Paragraph({ children: [new TextRun({ text: exp.description, size: 19, color: "374151" })], spacing: { after: 120 } }),
            );
          }
        }
      }

      if (resume.educations && resume.educations.length > 0) {
        children.push(sectionHeader("EDUCATION"));
        for (const edu of resume.educations) {
          children.push(
            new Paragraph({ spacing: { before: 120 }, children: [
              new TextRun({ text: edu.degree, bold: true, size: 20, color: "111827" }),
              edu.fieldOfStudy ? new TextRun({ text: ` in ${edu.fieldOfStudy}`, size: 19, color: "374151" }) : undefined,
            ].filter(Boolean) }),
          );
          children.push(
            new Paragraph({ children: [
              new TextRun({ text: edu.institution, size: 19, color: "4b5563", italics: true }),
              edu.endDate ? new TextRun({ text: `  |  ${edu.endDate}`, size: 18, color: "6b7280" }) : undefined,
            ].filter(Boolean), spacing: { after: 120 } }),
          );
        }
      }

      if (resume.skills && resume.skills.length > 0) {
        children.push(sectionHeader("SKILLS"));
        const skillText = resume.skills.map((s) => s.name).join(", ");
        children.push(
          new Paragraph({ children: [new TextRun({ text: skillText, size: 20, color: "374151" })], spacing: { after: 120 } }),
        );
      }

      if (resume.projects && resume.projects.length > 0) {
        children.push(sectionHeader("PROJECTS"));
        for (const proj of resume.projects) {
          children.push(
            new Paragraph({ spacing: { before: 120 }, children: [
              new TextRun({ text: proj.title, bold: true, size: 20, color: "111827" }),
              proj.technologies ? new TextRun({ text: `  |  ${proj.technologies}`, size: 18, color: "6b7280" }) : undefined,
            ].filter(Boolean) }),
          );
          if (proj.description) {
            children.push(
              new Paragraph({ children: [new TextRun({ text: proj.description, size: 19, color: "374151" })], spacing: { after: 120 } }),
            );
          }
        }
      }

      if (resume.certifications && resume.certifications.length > 0) {
        children.push(sectionHeader("CERTIFICATIONS"));
        for (const cert of resume.certifications) {
          children.push(
            new Paragraph({ spacing: { before: 80 }, children: [
              new TextRun({ text: cert.name, bold: true, size: 20, color: "111827" }),
              new TextRun({ text: `  —  ${cert.issuer}`, size: 19, color: "4b5563" }),
              cert.issueDate ? new TextRun({ text: `  (${cert.issueDate})`, size: 18, color: "6b7280" }) : undefined,
            ].filter(Boolean) }),
          );
        }
      }

      const doc = new Document({ sections: [{ properties: {}, children }] });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${resume.title.replace(/\s+/g, "_")}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("DOCX export failed:", err);
      alert("Failed to export DOCX. See console for details.");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition disabled:opacity-50"
      title="Export as DOCX"
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <FileDown className="h-3.5 w-3.5" />
      )}
      DOCX
    </button>
  );
}
