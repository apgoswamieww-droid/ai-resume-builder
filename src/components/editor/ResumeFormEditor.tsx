"use client";

import { useState, useTransition, useRef, useCallback, useEffect } from "react";
import { FullResume } from "@/types/resume";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Palette,
  Plus,
  Trash2,
  Loader2,
  Sparkles,
  Check,
  Award,
  Layout,
  ArrowUp,
  ArrowDown,
  Pencil,
  X,
  Wand2,
  BarChart3,
  ScrollText,
} from "lucide-react";
import {
  updatePersonalInfo,
  updateResumeDetails,
  addWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
  addEducation,
  updateEducation,
  deleteEducation,
  addSkill,
  updateSkill,
  deleteSkill,
  addProject,
  updateProject,
  deleteProject,
  addCertification,
  updateCertification,
  deleteCertification,
  addCustomSection,
  updateCustomSection,
  deleteCustomSection,
  reorderItems,
} from "@/actions/resume-editor";
import { generateSummary, improveExperience, suggestSkills, analyzeATS, generateCoverLetter, analyzeJobMatch, checkGrammar } from "@/actions/ai";
import { useRouter } from "next/navigation";
import { AtsAnalysisModal } from "@/components/ai/AtsAnalysisModal";
import { CoverLetterModal } from "@/components/ai/CoverLetterModal";
import { JobMatchModal } from "@/components/ai/JobMatchModal";
import { AIToastManager } from "@/components/ai/AISuggestionToast";

interface ResumeFormEditorProps {
  resume: FullResume;
}

type TabType =
  | "personal"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "custom"
  | "ats"
  | "cover"
  | "match"
  | "design";

export function ResumeFormEditor({ resume }: ResumeFormEditorProps) {
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const [isPending, startTransition] = useTransition();
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const router = useRouter();

  // Modal states
  const [showAtsModal, setShowAtsModal] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);

  // Toast state
  const [toasts, setToasts] = useState<Array<{
    id: string;
    message: string;
    type: "success" | "error" | "loading" | "info";
    actionLabel?: string;
    onAction?: () => void;
  }>>([]);

  const addToast = (message: string, type: "success" | "error" | "loading" | "info" = "info", actionLabel?: string, onAction?: () => void) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type, actionLabel, onAction }]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const [personalInfo, setPersonalInfo] = useState({
    fullName: resume.personalInfo?.fullName || "",
    email: resume.personalInfo?.email || "",
    phone: resume.personalInfo?.phone || "",
    location: resume.personalInfo?.location || "",
    jobTitle: resume.personalInfo?.jobTitle || "",
    website: resume.personalInfo?.website || "",
    linkedin: resume.personalInfo?.linkedin || "",
    github: resume.personalInfo?.github || "",
  });

  const [summary, setSummary] = useState(resume.summary || "");

  const [newExp, setNewExp] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    location: "",
    description: "",
  });

  const [newEdu, setNewEdu] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    gpa: "",
  });

  const [newSkill, setNewSkill] = useState("");

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    link: "",
  });

  const [newCert, setNewCert] = useState({
    name: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    credentialUrl: "",
  });

  const [newCustom, setNewCustom] = useState({ title: "", content: "" });

  const [atsResults, setAtsResults] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [matchResult, setMatchResult] = useState<string | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollTabs = useCallback((dir: "left" | "right") => {
    tabsRef.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  }, []);

  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(resume.title);

  const [editingSummary, setEditingSummary] = useState(false);
  const [summaryDraft, setSummaryDraft] = useState(resume.summary || "");

  const [isSaving, setIsSaving] = useState(false);
  const initialSummaryRef = useRef(resume.summary || "");
  const initialPersonalInfoRef = useRef(JSON.stringify(personalInfo));

  useEffect(() => {
    if (summary === initialSummaryRef.current) return;
    const timer = setTimeout(async () => {
      setIsSaving(true);
      try { await updateResumeDetails(resume.id, { summary }); }
      finally { setIsSaving(false); }
    }, 1500);
    return () => clearTimeout(timer);
  }, [summary, resume.id]);

  useEffect(() => {
    const current = JSON.stringify(personalInfo);
    if (current === initialPersonalInfoRef.current) return;
    const timer = setTimeout(async () => {
      setIsSaving(true);
      try { await updatePersonalInfo(resume.id, personalInfo); }
      finally { setIsSaving(false); }
    }, 1500);
    return () => clearTimeout(timer);
  }, [personalInfo, resume.id]);

  const handleRename = () => {
    setEditingTitle(false);
    if (titleDraft !== resume.title) {
      startTransition(async () => {
        await updateResumeDetails(resume.id, { title: titleDraft });
        router.refresh();
      });
    }
  };

  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await updatePersonalInfo(resume.id, personalInfo);
      router.refresh();
    });
  };

  const handleSaveSummary = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await updateResumeDetails(resume.id, { summary });
      router.refresh();
    });
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExp.company || !newExp.position) return;
    startTransition(async () => {
      await addWorkExperience(resume.id, newExp);
      setNewExp({ company: "", position: "", startDate: "", endDate: "", isCurrent: false, location: "", description: "" });
      router.refresh();
    });
  };

  const handleDeleteExperience = (id: string) => {
    startTransition(async () => {
      await deleteWorkExperience(id, resume.id);
      router.refresh();
    });
  };

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEdu.institution || !newEdu.degree) return;
    startTransition(async () => {
      await addEducation(resume.id, newEdu);
      setNewEdu({ institution: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", isCurrent: false, gpa: "" });
      router.refresh();
    });
  };

  const handleDeleteEducation = (id: string) => {
    startTransition(async () => {
      await deleteEducation(id, resume.id);
      router.refresh();
    });
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    startTransition(async () => {
      await addSkill(resume.id, { name: newSkill.trim() });
      setNewSkill("");
      router.refresh();
    });
  };

  const handleDeleteSkill = (id: string) => {
    startTransition(async () => {
      await deleteSkill(id, resume.id);
      router.refresh();
    });
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;
    startTransition(async () => {
      await addProject(resume.id, newProject);
      setNewProject({ title: "", description: "", technologies: "", link: "" });
      router.refresh();
    });
  };

  const handleDeleteProject = (id: string) => {
    startTransition(async () => {
      await deleteProject(id, resume.id);
      router.refresh();
    });
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.name || !newCert.issuer) return;
    startTransition(async () => {
      await addCertification(resume.id, newCert);
      setNewCert({ name: "", issuer: "", issueDate: "", expiryDate: "", credentialUrl: "" });
      router.refresh();
    });
  };

  const handleDeleteCert = (id: string) => {
    startTransition(async () => {
      await deleteCertification(id, resume.id);
      router.refresh();
    });
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustom.title.trim()) return;
    startTransition(async () => {
      await addCustomSection(resume.id, newCustom);
      setNewCustom({ title: "", content: "" });
      router.refresh();
    });
  };

  const handleDeleteCustom = (id: string) => {
    startTransition(async () => {
      await deleteCustomSection(id, resume.id);
      router.refresh();
    });
  };

  const handleColorChange = (color: string) => {
    startTransition(async () => {
      await updateResumeDetails(resume.id, { themeColor: color });
      router.refresh();
    });
  };

  const handleTemplateChange = (templateId: string) => {
    startTransition(async () => {
      await updateResumeDetails(resume.id, { templateId });
      router.refresh();
    });
  };

  const handleMoveItem = async (items: { id: string; order: number }[], model: any) => {
    startTransition(async () => {
      await reorderItems(resume.id, items, model);
      router.refresh();
    });
  };

  const handleGenerateSummary = async () => {
    setAiLoading("summary");
    addToast("Generating professional summary...", "loading");
    try {
      const skills = resume.skills.map((s) => s.name).join(", ");
      const background = resume.experiences.map((e) => `${e.position} at ${e.company}`).join("; ");
      const text = await generateSummary(resume.targetRole || "", [skills], background);
      setSummary(text);
      await updateResumeDetails(resume.id, { summary: text });
      router.refresh();
      removeToast(toasts[toasts.length - 1]?.id || "");
      addToast("Summary generated successfully!", "success");
    } catch (e: any) {
      removeToast(toasts[toasts.length - 1]?.id || "");
      addToast(`AI generation failed: ${e?.message || "Check API key"}`, "error");
    }
    setAiLoading(null);
  };

  const handleCheckGrammarSummary = async () => {
    if (!summary.trim()) {
      addToast("Please add some text to check", "error");
      return;
    }
    setAiLoading("grammar-summary");
    addToast("Checking grammar...", "loading");
    try {
      const corrected = await checkGrammar(summary);
      setSummary(corrected);
      await updateResumeDetails(resume.id, { summary: corrected });
      router.refresh();
      removeToast(toasts[toasts.length - 1]?.id || "");
      addToast("Grammar checked and corrected!", "success");
    } catch (e: any) {
      removeToast(toasts[toasts.length - 1]?.id || "");
      addToast(`Grammar check failed: ${e?.message || "Check API key"}`, "error");
    }
    setAiLoading(null);
  };

  const handleCheckGrammarExperience = async (id: string, description: string) => {
    if (!description?.trim()) {
      addToast("No description to check", "error");
      return;
    }
    setAiLoading(`grammar-exp-${id}`);
    addToast("Checking grammar...", "loading");
    try {
      const corrected = await checkGrammar(description);
      await updateWorkExperience(id, resume.id, { description: corrected });
      router.refresh();
      removeToast(toasts[toasts.length - 1]?.id || "");
      addToast("Grammar corrected!", "success");
    } catch (e: any) {
      removeToast(toasts[toasts.length - 1]?.id || "");
      addToast(`Grammar check failed: ${e?.message || "Check API key"}`, "error");
    }
    setAiLoading(null);
  };

  const handleImproveExperience = async (id: string, description: string) => {
    if (!description?.trim()) {
      addToast("No description to improve", "error");
      return;
    }
    setAiLoading(`exp-${id}`);
    addToast("Improving description with AI...", "loading");
    try {
      const improved = await improveExperience(description, resume.targetRole || "");
      await updateWorkExperience(id, resume.id, { description: improved });
      router.refresh();
      removeToast(toasts[toasts.length - 1]?.id || "");
      addToast("Description improved!", "success");
    } catch (e: any) {
      removeToast(toasts[toasts.length - 1]?.id || "");
      addToast(`AI improvement failed: ${e?.message || "Check API key"}`, "error");
    }
    setAiLoading(null);
  };

  const handleSuggestSkills = async () => {
    setAiLoading("skills");
    addToast("Suggesting relevant skills...", "loading");
    try {
      const suggestions = await suggestSkills(resume.targetRole || "", resume.skills.map((s) => s.name));
      let addedCount = 0;
      for (const skill of suggestions) {
        await addSkill(resume.id, { name: skill });
        addedCount++;
      }
      router.refresh();
      removeToast(toasts[toasts.length - 1]?.id || "");
      addToast(`Added ${addedCount} new skills!`, "success");
    } catch (e: any) {
      removeToast(toasts[toasts.length - 1]?.id || "");
      addToast(`Skill suggestions failed: ${e?.message || "Check API key"}`, "error");
    }
    setAiLoading(null);
  };

  const handleAnalyzeATS = async () => {
    setAiLoading("ats");
    setShowAtsModal(true);
    addToast("Analyzing ATS compatibility...", "loading");
    try {
      const sections: string[] = [];
      if (resume.summary) sections.push(`SUMMARY:\n${resume.summary}`);
      if (resume.experiences.length > 0) {
        sections.push("EXPERIENCE:");
        resume.experiences.forEach((e) => {
          sections.push(`- ${e.position} at ${e.company} (${e.startDate} - ${e.isCurrent ? "Present" : e.endDate})\n  ${e.description || ""}`);
        });
      }
      if (resume.educations.length > 0) {
        sections.push("EDUCATION:");
        resume.educations.forEach((e) => {
          sections.push(`- ${e.degree} in ${e.fieldOfStudy} from ${e.institution} (${e.endDate})`);
        });
      }
      if (resume.skills.length > 0) {
        sections.push(`SKILLS: ${resume.skills.map((s) => s.name).join(", ")}`);
      }
      if (resume.projects.length > 0) {
        sections.push("PROJECTS:");
        resume.projects.forEach((p) => {
          sections.push(`- ${p.title} (${p.technologies || ""}): ${p.description || ""}`);
        });
      }
      if (resume.certifications.length > 0) {
        sections.push("CERTIFICATIONS:");
        resume.certifications.forEach((c) => {
          sections.push(`- ${c.name} from ${c.issuer}`);
        });
      }
      const resumeText = sections.join("\n\n");
      const result = await analyzeATS(resume.targetRole || "", resumeText);
      setAtsResults(result);
      const scoreMatch = result.match(/(\d{1,3})\s*\/\s*100/);
      if (scoreMatch) {
        const score = parseInt(scoreMatch[1]);
        await updateResumeDetails(resume.id, { atsScore: score });
        router.refresh();
      }
      removeToast(toasts[toasts.length - 1]?.id || "");
      addToast("ATS analysis complete!", "success");
    } catch (e: any) {
      removeToast(toasts[toasts.length - 1]?.id || "");
      addToast(`ATS analysis failed: ${e?.message || "Check API key"}`, "error");
    }
    setAiLoading(null);
  };

  const handleGenerateCoverLetter = async () => {
    setAiLoading("cover");
    setShowCoverModal(true);
    addToast("Generating cover letter...", "loading");
    try {
      const sections: string[] = [];
      if (resume.summary) sections.push(`SUMMARY:\n${resume.summary}`);
      if (resume.experiences.length > 0) {
        sections.push("EXPERIENCE:");
        resume.experiences.forEach((e) => {
          sections.push(`- ${e.position} at ${e.company} (${e.startDate} - ${e.isCurrent ? "Present" : e.endDate})\n  ${e.description || ""}`);
        });
      }
      if (resume.educations.length > 0) {
        sections.push("EDUCATION:");
        resume.educations.forEach((e) => {
          sections.push(`- ${e.degree} in ${e.fieldOfStudy} from ${e.institution} (${e.endDate})`);
        });
      }
      if (resume.skills.length > 0) {
        sections.push(`SKILLS: ${resume.skills.map((s) => s.name).join(", ")}`);
      }
      const resumeText = sections.join("\n\n");
      const result = await generateCoverLetter(resume.targetRole || "", resumeText, companyName || undefined);
      setCoverLetter(result);
      removeToast(toasts[toasts.length - 1]?.id || "");
      addToast("Cover letter generated!", "success");
    } catch (e: any) {
      removeToast(toasts[toasts.length - 1]?.id || "");
      addToast(`Cover letter failed: ${e?.message || "Check API key"}`, "error");
    }
    setAiLoading(null);
  };

  const handleAnalyzeJobMatch = async () => {
    setAiLoading("match");
    setShowMatchModal(true);
    addToast("Analyzing job match...", "loading");
    try {
      const sections: string[] = [];
      if (resume.summary) sections.push(`SUMMARY:\n${resume.summary}`);
      if (resume.experiences.length > 0) {
        sections.push("EXPERIENCE:");
        resume.experiences.forEach((e) => {
          sections.push(`- ${e.position} at ${e.company} (${e.startDate} - ${e.isCurrent ? "Present" : e.endDate})\n  ${e.description || ""}`);
        });
      }
      if (resume.educations.length > 0) {
        sections.push("EDUCATION:");
        resume.educations.forEach((e) => {
          sections.push(`- ${e.degree} in ${e.fieldOfStudy} from ${e.institution} (${e.endDate})`);
        });
      }
      if (resume.skills.length > 0) {
        sections.push(`SKILLS: ${resume.skills.map((s) => s.name).join(", ")}`);
      }
      if (resume.projects.length > 0) {
        sections.push("PROJECTS:");
        resume.projects.forEach((p) => {
          sections.push(`- ${p.title} (${p.technologies || ""}): ${p.description || ""}`);
        });
      }
      const resumeText = sections.join("\n\n");
      const result = await analyzeJobMatch(resume.targetRole || "", resumeText, jobDescription);
      setMatchResult(result);
      const scoreMatch = result.match(/(\d{1,3})\s*%/);
      if (scoreMatch) {
        const score = parseInt(scoreMatch[1]);
        await updateResumeDetails(resume.id, { matchScore: score });
        router.refresh();
      }
      removeToast(toasts[toasts.length - 1]?.id || "");
      addToast("Job match analysis complete!", "success");
    } catch (e: any) {
      removeToast(toasts[toasts.length - 1]?.id || "");
      addToast(`Job match failed: ${e?.message || "Check API key"}`, "error");
    }
    setAiLoading(null);
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "summary", label: "Summary", icon: FileText },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Wrench },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "custom", label: "Custom", icon: Layout },
    { id: "ats", label: "ATS Score", icon: BarChart3 },
    { id: "cover", label: "Cover Letter", icon: ScrollText },
    { id: "match", label: "Job Match", icon: Briefcase },
    { id: "design", label: "Design", icon: Palette },
  ];

  const reorderUp = (list: any[], index: number, model: any) => {
    if (index === 0) return;
    const items = list.map((item, i) => ({
      id: item.id,
      order: i === index ? list[index - 1].order : i === index - 1 ? list[index].order : item.order,
    }));
    handleMoveItem(items, model);
  };

  const reorderDown = (list: any[], index: number, model: any) => {
    if (index === list.length - 1) return;
    const items = list.map((item, i) => ({
      id: item.id,
      order: i === index ? list[index + 1].order : i === index + 1 ? list[index].order : item.order,
    }));
    handleMoveItem(items, model);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800">
      <div className="flex items-center border-b border-slate-800 bg-slate-950/60 p-2 gap-0">
        <button
          onClick={() => scrollTabs("left")}
          className="shrink-0 flex items-center justify-center h-7 w-7 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition"
        >
          ‹
        </button>
        <div ref={tabsRef} className="flex overflow-x-auto gap-1 scrollable-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold whitespace-nowrap transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        <button
          onClick={() => scrollTabs("right")}
          className="shrink-0 flex items-center justify-center h-7 w-7 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition"
        >
          ›
        </button>
        {isSaving && (
          <span className="flex items-center gap-1 ml-2 text-[10px] text-blue-400 font-medium shrink-0">
            <Loader2 className="h-3 w-3 animate-spin" />
            Saving...
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {activeTab === "personal" && (
          <form onSubmit={handleSavePersonalInfo} className="space-y-4">
            <h3 className="font-semibold text-white text-base border-b border-slate-800 pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={personalInfo.fullName}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Job Title</label>
                <input
                  type="text"
                  value={personalInfo.jobTitle}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, jobTitle: e.target.value })}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Phone</label>
                <input
                  type="text"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  value={personalInfo.location}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                  placeholder="San Francisco, CA"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">LinkedIn</label>
                <input
                  type="text"
                  value={personalInfo.linkedin}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                  placeholder="linkedin.in/alexmorgan"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="mt-4 flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-500 transition"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              Save Changes
            </button>
          </form>
        )}

        {activeTab === "summary" && (
          <form onSubmit={handleSaveSummary} className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-semibold text-white text-base">Professional Summary</h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGenerateSummary}
                  disabled={aiLoading === "summary"}
                  className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-purple-500 transition disabled:opacity-50"
                >
                  {aiLoading === "summary" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="h-3.5 w-3.5" />
                  )}
                  Generate
                </button>
                <button
                  type="button"
                  onClick={handleCheckGrammarSummary}
                  disabled={aiLoading === "grammar-summary" || !summary.trim()}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-emerald-500 transition disabled:opacity-50"
                >
                  {aiLoading === "grammar-summary" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Check className="h-3.5 w-3.5" />
                  )}
                  {aiLoading === "grammar-summary" ? "Checking..." : "Check Grammar"}
                </button>
              </div>
            </div>
            <div>
              <textarea
                rows={6}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Write a compelling professional summary..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-sm text-white focus:border-blue-500 focus:outline-none leading-relaxed"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-500 transition"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              Save Summary
            </button>
          </form>
        )}

        {activeTab === "experience" && (
          <div className="space-y-6">
            <h3 className="font-semibold text-white text-base border-b border-slate-800 pb-2">
              Work Experience
            </h3>

            <div className="space-y-3">
              {resume.experiences.map((exp, idx) => (
                <div key={exp.id}>
                  {editingId === exp.id ? (
                    <EditExperienceForm
                      exp={exp}
                      onSave={async (data) => {
                        await updateWorkExperience(exp.id, resume.id, data);
                        setEditingId(null);
                        router.refresh();
                      }}
                      onCancel={() => setEditingId(null)}
                    />
                  ) : (
                    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-white">{exp.position}</h4>
                        <p className="text-xs text-slate-400">
                          {exp.company} • {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleImproveExperience(exp.id, exp.description || "")}
                          disabled={aiLoading === `exp-${exp.id}`}
                          className="p-1.5 text-purple-400 hover:text-purple-300 transition"
                          title="Improve with AI"
                        >
                          {aiLoading === `exp-${exp.id}` ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Wand2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleCheckGrammarExperience(exp.id, exp.description || "")}
                          disabled={aiLoading === `grammar-exp-${exp.id}` || !exp.description}
                          className="p-1.5 text-emerald-400 hover:text-emerald-300 transition"
                          title="Check Grammar"
                        >
                          {aiLoading === `grammar-exp-${exp.id}` ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Check className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => { setEditingId(exp.id); }}
                          className="p-1.5 text-slate-500 hover:text-blue-400 transition"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => reorderUp(resume.experiences, idx, "experience")}
                          disabled={idx === 0}
                          className="p-1.5 text-slate-500 hover:text-white transition disabled:opacity-30"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => reorderDown(resume.experiences, idx, "experience")}
                          disabled={idx === resume.experiences.length - 1}
                          className="p-1.5 text-slate-500 hover:text-white transition disabled:opacity-30"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteExperience(exp.id)}
                          className="p-1.5 text-slate-500 hover:text-red-400 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleAddExperience} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
              <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">+ Add Experience</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" placeholder="Job Title *" required value={newExp.position} onChange={(e) => setNewExp({ ...newExp, position: e.target.value })} className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
                <input type="text" placeholder="Company Name *" required value={newExp.company} onChange={(e) => setNewExp({ ...newExp, company: e.target.value })} className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
                <input type="text" placeholder="Start Date" value={newExp.startDate} onChange={(e) => setNewExp({ ...newExp, startDate: e.target.value })} className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
                <input type="text" placeholder="End Date" value={newExp.endDate} onChange={(e) => setNewExp({ ...newExp, endDate: e.target.value })} className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
              </div>
              <textarea rows={3} placeholder="Key accomplishments..." value={newExp.description} onChange={(e) => setNewExp({ ...newExp, description: e.target.value })} className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white focus:border-blue-500 focus:outline-none" />
              <button type="submit" disabled={isPending} className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-500 transition">
                <Plus className="h-4 w-4" /> Add Experience
              </button>
            </form>
          </div>
        )}

        {activeTab === "education" && (
          <div className="space-y-6">
            <h3 className="font-semibold text-white text-base border-b border-slate-800 pb-2">Education</h3>
            <div className="space-y-3">
              {resume.educations.map((edu, idx) => (
                <div key={edu.id}>
                  {editingId === edu.id ? (
                    <EditEducationForm
                      edu={edu}
                      onSave={async (data) => {
                        await updateEducation(edu.id, resume.id, data);
                        setEditingId(null);
                        router.refresh();
                      }}
                      onCancel={() => setEditingId(null)}
                    />
                  ) : (
                    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                      <div>
                        <h4 className="font-semibold text-sm text-white">
                          {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                        </h4>
                        <p className="text-xs text-slate-400">{edu.institution}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setEditingId(edu.id); }} className="p-1.5 text-slate-500 hover:text-blue-400 transition"><Pencil className="h-3.5 w-3.5" /></button>
                        <button onClick={() => reorderUp(resume.educations, idx, "education")} disabled={idx === 0} className="p-1.5 text-slate-500 hover:text-white transition disabled:opacity-30"><ArrowUp className="h-3.5 w-3.5" /></button>
                        <button onClick={() => reorderDown(resume.educations, idx, "education")} disabled={idx === resume.educations.length - 1} className="p-1.5 text-slate-500 hover:text-white transition disabled:opacity-30"><ArrowDown className="h-3.5 w-3.5" /></button>
                        <button onClick={() => handleDeleteEducation(edu.id)} className="p-1.5 text-slate-500 hover:text-red-400 transition"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleAddEducation} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
              <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">+ Add Education</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" placeholder="Institution *" required value={newEdu.institution} onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })} className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
                <input type="text" placeholder="Degree *" required value={newEdu.degree} onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })} className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
                <input type="text" placeholder="Field of Study" value={newEdu.fieldOfStudy} onChange={(e) => setNewEdu({ ...newEdu, fieldOfStudy: e.target.value })} className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
                <input type="text" placeholder="Graduation Year" value={newEdu.endDate} onChange={(e) => setNewEdu({ ...newEdu, endDate: e.target.value })} className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
              </div>
              <button type="submit" disabled={isPending} className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-500 transition">
                <Plus className="h-4 w-4" /> Add Education
              </button>
            </form>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-semibold text-white text-base">Skills & Competencies</h3>
              <button
                type="button"
                onClick={handleSuggestSkills}
                disabled={aiLoading === "skills"}
                className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-purple-500 transition disabled:opacity-50"
              >
                {aiLoading === "skills" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5" />
                )}
                AI Suggest
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, idx) => (
                <div key={skill.id} className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-200">
                  {editingId === skill.id ? (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const input = (e.target as HTMLFormElement).querySelector("input")!;
                        await updateSkill(skill.id, resume.id, { name: input.value });
                        setEditingId(null);
                        router.refresh();
                      }}
                      className="flex items-center gap-1"
                    >
                      <input
                        defaultValue={skill.name}
                        className="w-24 rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 text-xs text-white focus:outline-none"
                        autoFocus
                        onBlur={(e) => {
                          updateSkill(skill.id, resume.id, { name: e.target.value });
                          setEditingId(null);
                          router.refresh();
                        }}
                      />
                    </form>
                  ) : (
                    <>
                      <span>{skill.name}</span>
                      <button onClick={() => setEditingId(skill.id)} className="text-slate-500 hover:text-blue-400 transition"><Pencil className="h-3 w-3" /></button>
                      <button onClick={() => reorderUp(resume.skills, idx, "skill")} disabled={idx === 0} className="text-slate-500 hover:text-white transition disabled:opacity-30"><ArrowUp className="h-3 w-3" /></button>
                      <button onClick={() => reorderDown(resume.skills, idx, "skill")} disabled={idx === resume.skills.length - 1} className="text-slate-500 hover:text-white transition disabled:opacity-30"><ArrowDown className="h-3 w-3" /></button>
                      <button onClick={() => handleDeleteSkill(skill.id)} className="text-slate-500 hover:text-red-400 transition"><Trash2 className="h-3 w-3" /></button>
                    </>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input type="text" placeholder="Add skill (e.g. React, TypeScript)" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
              <button type="submit" disabled={isPending || !newSkill.trim()} className="flex items-center gap-1 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-500 transition">
                <Plus className="h-4 w-4" /> Add
              </button>
            </form>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="space-y-6">
            <h3 className="font-semibold text-white text-base border-b border-slate-800 pb-2">Projects</h3>
            <div className="space-y-3">
              {resume.projects.map((proj, idx) => (
                <div key={proj.id}>
                  {editingId === proj.id ? (
                    <EditProjectForm
                      proj={proj}
                      onSave={async (data) => {
                        await updateProject(proj.id, resume.id, data);
                        setEditingId(null);
                        router.refresh();
                      }}
                      onCancel={() => setEditingId(null)}
                    />
                  ) : (
                    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                      <div>
                        <h4 className="font-semibold text-sm text-white">{proj.title}</h4>
                        {proj.technologies && <p className="text-xs text-slate-400">Tech: {proj.technologies}</p>}
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setEditingId(proj.id); }} className="p-1.5 text-slate-500 hover:text-blue-400 transition"><Pencil className="h-3.5 w-3.5" /></button>
                        <button onClick={() => reorderUp(resume.projects, idx, "project")} disabled={idx === 0} className="p-1.5 text-slate-500 hover:text-white transition disabled:opacity-30"><ArrowUp className="h-3.5 w-3.5" /></button>
                        <button onClick={() => reorderDown(resume.projects, idx, "project")} disabled={idx === resume.projects.length - 1} className="p-1.5 text-slate-500 hover:text-white transition disabled:opacity-30"><ArrowDown className="h-3.5 w-3.5" /></button>
                        <button onClick={() => handleDeleteProject(proj.id)} className="p-1.5 text-slate-500 hover:text-red-400 transition"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleAddProject} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
              <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider">+ Add Project</h4>
              <input type="text" placeholder="Project Title *" required value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
              <input type="text" placeholder="Technologies Used" value={newProject.technologies} onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
              <textarea rows={2} placeholder="Brief project summary..." value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white focus:border-blue-500 focus:outline-none" />
              <button type="submit" disabled={isPending} className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-500 transition">
                <Plus className="h-4 w-4" /> Add Project
              </button>
            </form>
          </div>
        )}

        {activeTab === "certifications" && (
          <div className="space-y-6">
            <h3 className="font-semibold text-white text-base border-b border-slate-800 pb-2">Certifications</h3>
            <div className="space-y-3">
              {resume.certifications.map((cert, idx) => (
                <div key={cert.id}>
                  {editingId === cert.id ? (
                    <EditCertForm
                      cert={cert}
                      onSave={async (data) => {
                        await updateCertification(cert.id, resume.id, data);
                        setEditingId(null);
                        router.refresh();
                      }}
                      onCancel={() => setEditingId(null)}
                    />
                  ) : (
                    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                      <div>
                        <h4 className="font-semibold text-sm text-white">{cert.name}</h4>
                        <p className="text-xs text-slate-400">{cert.issuer}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setEditingId(cert.id); }} className="p-1.5 text-slate-500 hover:text-blue-400 transition"><Pencil className="h-3.5 w-3.5" /></button>
                        <button onClick={() => reorderUp(resume.certifications, idx, "certification")} disabled={idx === 0} className="p-1.5 text-slate-500 hover:text-white transition disabled:opacity-30"><ArrowUp className="h-3.5 w-3.5" /></button>
                        <button onClick={() => reorderDown(resume.certifications, idx, "certification")} disabled={idx === resume.certifications.length - 1} className="p-1.5 text-slate-500 hover:text-white transition disabled:opacity-30"><ArrowDown className="h-3.5 w-3.5" /></button>
                        <button onClick={() => handleDeleteCert(cert.id)} className="p-1.5 text-slate-500 hover:text-red-400 transition"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleAddCert} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">+ Add Certification</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" placeholder="Certification Name *" required value={newCert.name} onChange={(e) => setNewCert({ ...newCert, name: e.target.value })} className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
                <input type="text" placeholder="Issuing Organization *" required value={newCert.issuer} onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })} className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
                <input type="text" placeholder="Issue Date" value={newCert.issueDate} onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })} className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
                <input type="text" placeholder="Expiry Date" value={newCert.expiryDate} onChange={(e) => setNewCert({ ...newCert, expiryDate: e.target.value })} className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
              </div>
              <input type="text" placeholder="Credential URL (optional)" value={newCert.credentialUrl} onChange={(e) => setNewCert({ ...newCert, credentialUrl: e.target.value })} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
              <button type="submit" disabled={isPending} className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-500 transition">
                <Plus className="h-4 w-4" /> Add Certification
              </button>
            </form>
          </div>
        )}

        {activeTab === "custom" && (
          <div className="space-y-6">
            <h3 className="font-semibold text-white text-base border-b border-slate-800 pb-2">Custom Sections</h3>
            <div className="space-y-3">
              {resume.customSections.map((cs, idx) => (
                <div key={cs.id}>
                  {editingId === cs.id ? (
                    <EditCustomForm
                      section={cs}
                      onSave={async (data) => {
                        await updateCustomSection(cs.id, resume.id, data);
                        setEditingId(null);
                        router.refresh();
                      }}
                      onCancel={() => setEditingId(null)}
                    />
                  ) : (
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm text-white">{cs.title}</h4>
                        <div className="flex items-center gap-1">
                          <button onClick={() => { setEditingId(cs.id); }} className="p-1.5 text-slate-500 hover:text-blue-400 transition"><Pencil className="h-3.5 w-3.5" /></button>
                          <button onClick={() => reorderUp(resume.customSections, idx, "customSection")} disabled={idx === 0} className="p-1.5 text-slate-500 hover:text-white transition disabled:opacity-30"><ArrowUp className="h-3.5 w-3.5" /></button>
                          <button onClick={() => reorderDown(resume.customSections, idx, "customSection")} disabled={idx === resume.customSections.length - 1} className="p-1.5 text-slate-500 hover:text-white transition disabled:opacity-30"><ArrowDown className="h-3.5 w-3.5" /></button>
                          <button onClick={() => handleDeleteCustom(cs.id)} className="p-1.5 text-slate-500 hover:text-red-400 transition"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      </div>
                      {cs.content && <p className="mt-1 text-xs text-slate-400 whitespace-pre-line">{cs.content}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleAddCustom} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
              <h4 className="text-xs font-semibold text-teal-400 uppercase tracking-wider">+ Add Custom Section</h4>
              <input type="text" placeholder="Section Title *" required value={newCustom.title} onChange={(e) => setNewCustom({ ...newCustom, title: e.target.value })} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
              <textarea rows={3} placeholder="Section content..." value={newCustom.content} onChange={(e) => setNewCustom({ ...newCustom, content: e.target.value })} className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white focus:border-blue-500 focus:outline-none" />
              <button type="submit" disabled={isPending} className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-500 transition">
                <Plus className="h-4 w-4" /> Add Section
              </button>
            </form>
          </div>
        )}

        {activeTab === "ats" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-semibold text-white text-base">ATS Compatibility Analysis</h3>
              <button
                type="button"
                onClick={handleAnalyzeATS}
                disabled={aiLoading === "ats"}
                className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-purple-500 transition disabled:opacity-50"
              >
                {aiLoading === "ats" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <BarChart3 className="h-3.5 w-3.5" />
                )}
                {aiLoading === "ats" ? "Analyzing..." : "Run ATS Analysis"}
              </button>
            </div>

            {!atsResults && aiLoading !== "ats" && (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center">
                <BarChart3 className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-400">Click <span className="text-purple-400 font-semibold">Run ATS Analysis</span> to check your resume&apos;s compatibility with Applicant Tracking Systems.</p>
              </div>
            )}

            {aiLoading === "ats" && (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin text-purple-400 mx-auto" />
                <p className="text-sm text-slate-400">Analyzing your resume for ATS compatibility...</p>
              </div>
            )}

            {atsResults && (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <div className="prose prose-invert prose-sm max-w-none">
                  {atsResults.split("\n").map((line, i) => {
                    if (line.startsWith("# ")) {
                      const scoreMatch = line.match(/(\d{1,3})\s*\/\s*100/);
                      return (
                        <div key={i} className="flex items-center gap-3 mb-4">
                          {scoreMatch && (
                            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-xl font-bold text-white">
                              {scoreMatch[1]}
                            </div>
                          )}
                          <h3 className="text-lg font-bold text-white m-0">{line.replace(/^#+\s*/, "")}</h3>
                        </div>
                      );
                    }
                    if (line.startsWith("## ")) {
                      return <h4 key={i} className="text-base font-semibold text-purple-300 mt-4 mb-2">{line.replace(/^##+\s*/, "")}</h4>;
                    }
                    if (line.startsWith("- ")) {
                      return <li key={i} className="text-sm text-slate-300 ml-4 list-disc">{line.replace(/^- /, "")}</li>;
                    }
                    if (line.trim() === "") {
                      return <br key={i} />;
                    }
                    return <p key={i} className="text-sm text-slate-300">{line}</p>;
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "cover" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-semibold text-white text-base">Cover Letter</h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Company name (optional)"
                  className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none w-48"
                />
                <button
                  type="button"
                  onClick={handleGenerateCoverLetter}
                  disabled={aiLoading === "cover"}
                  className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-purple-500 transition disabled:opacity-50"
                >
                  {aiLoading === "cover" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <ScrollText className="h-3.5 w-3.5" />
                  )}
                  {aiLoading === "cover" ? "Generating..." : "Generate Cover Letter"}
                </button>
              </div>
            </div>

            {!coverLetter && aiLoading !== "cover" && (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center">
                <ScrollText className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-400">Click <span className="text-purple-400 font-semibold">Generate Cover Letter</span> to create a professional cover letter based on your resume.</p>
              </div>
            )}

            {aiLoading === "cover" && (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin text-purple-400 mx-auto" />
                <p className="text-sm text-slate-400">Writing your cover letter...</p>
              </div>
            )}

            {coverLetter && (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <textarea
                  readOnly
                  rows={18}
                  value={coverLetter}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-sm text-white leading-relaxed focus:outline-none resize-none"
                />
              </div>
            )}
          </div>
        )}

        {activeTab === "match" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-semibold text-white text-base">Job Match Analysis</h3>
              <button
                type="button"
                onClick={handleAnalyzeJobMatch}
                disabled={aiLoading === "match" || !jobDescription.trim()}
                className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-purple-500 transition disabled:opacity-50"
              >
                {aiLoading === "match" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Briefcase className="h-3.5 w-3.5" />
                )}
                {aiLoading === "match" ? "Analyzing..." : "Analyze Match"}
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Paste Job Description</label>
              <textarea
                rows={8}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here to compare against your resume..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-sm text-white focus:border-blue-500 focus:outline-none leading-relaxed"
              />
            </div>

            {aiLoading === "match" && (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin text-purple-400 mx-auto" />
                <p className="text-sm text-slate-400">Analyzing your resume against the job description...</p>
              </div>
            )}

            {matchResult && (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <div className="prose prose-invert prose-sm max-w-none">
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
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "design" && (
          <div className="space-y-6">
            <h3 className="font-semibold text-white text-base border-b border-slate-800 pb-2">Theme & Styling</h3>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-3">Resume Template</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "classic", label: "Classic", desc: "Traditional layout" },
                  { id: "modern", label: "Modern", desc: "Bold sidebar style" },
                  { id: "minimal", label: "Minimal", desc: "Clean & simple" },
                  { id: "executive", label: "Executive", desc: "Dark sidebar, two-column" },
                  { id: "creative", label: "Creative", desc: "Bold colors, skill bars" },
                  { id: "compact", label: "Compact", desc: "Dense two-column layout" },
                  { id: "timeline", label: "Timeline", desc: "Chronological timeline" },
                  { id: "sidebar", label: "Sidebar", desc: "Profile sidebar layout" },
                  { id: "split", label: "Split", desc: "Balanced two-column" },
                  { id: "bold", label: "Bold", desc: "Strong header, bold accents" },
                  { id: "gradient", label: "Gradient", desc: "Modern gradient header" },
                  { id: "elegant", label: "Elegant", desc: "Serif, classic elegance" },
                  { id: "tech", label: "Tech", desc: "Developer-focused style" },
                  { id: "dark", label: "Dark", desc: "Modern dark theme" },
                  { id: "card", label: "Card", desc: "Card-based sections" },
                  { id: "luxury", label: "Luxury", desc: "Premium gold & black" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTemplateChange(t.id)}
                    className={`rounded-xl border p-3 text-left transition ${
                      resume.templateId === t.id
                        ? "border-blue-500 bg-blue-500/10 text-white"
                        : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <div className="text-xs font-semibold">{t.label}</div>
                    <div className="text-[10px] mt-0.5 opacity-70">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-3">Accent Theme Color</label>
              <div className="flex items-center gap-3 flex-wrap">
                {["#3b82f6", "#10b981", "#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#0f172a", "#dc2626", "#14b8a6"].map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`h-8 w-8 rounded-full border-2 transition ${
                      resume.themeColor === color ? "border-white scale-110 shadow-lg" : "border-transparent opacity-80 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Modals and Toasts */}
      <AtsAnalysisModal
        isOpen={showAtsModal}
        onClose={() => setShowAtsModal(false)}
        atsResults={atsResults}
        loading={aiLoading === "ats"}
      />
      <CoverLetterModal
        isOpen={showCoverModal}
        onClose={() => setShowCoverModal(false)}
        coverLetter={coverLetter}
        loading={aiLoading === "cover"}
        companyName={companyName}
        setCompanyName={setCompanyName}
      />
      <JobMatchModal
        isOpen={showMatchModal}
        onClose={() => setShowMatchModal(false)}
        matchResult={matchResult}
        loading={aiLoading === "match"}
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
        onAnalyze={handleAnalyzeJobMatch}
      />
      <AIToastManager toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

function EditExperienceForm({ exp, onSave, onCancel }: { exp: any; onSave: (data: any) => Promise<void>; onCancel: () => void }) {
  const [form, setForm] = useState({
    company: exp.company || "",
    position: exp.position || "",
    startDate: exp.startDate || "",
    endDate: exp.endDate || "",
    isCurrent: exp.isCurrent || false,
    location: exp.location || "",
    description: exp.description || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-blue-500/40 bg-slate-900 p-3.5 space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none" placeholder="Position" />
        <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none" placeholder="Company" />
        <input value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none" placeholder="Start Date" />
        <input value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none" placeholder="End Date" />
      </div>
      <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-xs text-white focus:border-blue-500 focus:outline-none" rows={2} placeholder="Description" />
      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition">
          {saving ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onCancel} className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 transition">
          Cancel
        </button>
      </div>
    </form>
  );
}

function EditEducationForm({ edu, onSave, onCancel }: { edu: any; onSave: (data: any) => Promise<void>; onCancel: () => void }) {
  const [form, setForm] = useState({
    institution: edu.institution || "",
    degree: edu.degree || "",
    fieldOfStudy: edu.fieldOfStudy || "",
    startDate: edu.startDate || "",
    endDate: edu.endDate || "",
    gpa: edu.gpa || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-indigo-500/40 bg-slate-900 p-3.5 space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <input value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none" placeholder="Institution" />
        <input value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none" placeholder="Degree" />
        <input value={form.fieldOfStudy} onChange={(e) => setForm({ ...form, fieldOfStudy: e.target.value })} className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none" placeholder="Field of Study" />
        <input value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none" placeholder="Graduation Year" />
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition">Save</button>
        <button type="button" onClick={onCancel} className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 transition">Cancel</button>
      </div>
    </form>
  );
}

function EditProjectForm({ proj, onSave, onCancel }: { proj: any; onSave: (data: any) => Promise<void>; onCancel: () => void }) {
  const [form, setForm] = useState({
    title: proj.title || "",
    description: proj.description || "",
    technologies: proj.technologies || "",
    link: proj.link || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-purple-500/40 bg-slate-900 p-3.5 space-y-2">
      <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none" placeholder="Title" />
      <input value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none" placeholder="Technologies" />
      <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-xs text-white focus:border-blue-500 focus:outline-none" rows={2} placeholder="Description" />
      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition">Save</button>
        <button type="button" onClick={onCancel} className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 transition">Cancel</button>
      </div>
    </form>
  );
}

function EditCertForm({ cert, onSave, onCancel }: { cert: any; onSave: (data: any) => Promise<void>; onCancel: () => void }) {
  const [form, setForm] = useState({
    name: cert.name || "",
    issuer: cert.issuer || "",
    issueDate: cert.issueDate || "",
    expiryDate: cert.expiryDate || "",
    credentialUrl: cert.credentialUrl || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-amber-500/40 bg-slate-900 p-3.5 space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none" placeholder="Certification Name" />
        <input value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none" placeholder="Issuer" />
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition">Save</button>
        <button type="button" onClick={onCancel} className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 transition">Cancel</button>
      </div>
    </form>
  );
}

function EditCustomForm({ section, onSave, onCancel }: { section: any; onSave: (data: any) => Promise<void>; onCancel: () => void }) {
  const [form, setForm] = useState({
    title: section.title || "",
    content: section.content || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-teal-500/40 bg-slate-900 p-3.5 space-y-2">
      <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none" placeholder="Section Title" />
      <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-xs text-white focus:border-blue-500 focus:outline-none" rows={3} placeholder="Content" />
      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition">Save</button>
        <button type="button" onClick={onCancel} className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 transition">Cancel</button>
      </div>
    </form>
  );
}
