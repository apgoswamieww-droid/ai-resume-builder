"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getUserResumes() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const resumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    include: {
      personalInfo: true,
      experiences: true,
      educations: true,
      skills: true,
      projects: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  return resumes;
}

export async function createResume(data: { title: string; targetRole?: string }) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const resume = await prisma.resume.create({
    data: {
      userId: session.user.id,
      title: data.title || "Untitled Resume",
      targetRole: data.targetRole || "",
      personalInfo: {
        create: {
          fullName: session.user.name || "",
          email: session.user.email || "",
        },
      },
    },
  });

  revalidatePath("/dashboard");
  return resume;
}

export interface ParsedResumeData {
  title?: string;
  targetRole?: string;
  summary?: string;
  personalInfo?: {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    jobTitle?: string;
    linkedin?: string;
    github?: string;
  };
  experiences?: Array<{
    company: string;
    position: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    description?: string;
  }>;
  educations?: Array<{
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    endDate?: string;
  }>;
  skills?: Array<{ name: string }>;
  projects?: Array<{
    title: string;
    description?: string;
    technologies?: string;
  }>;
}

export async function createResumeFromParsed(data: ParsedResumeData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const resume = await prisma.resume.create({
    data: {
      userId: session.user.id,
      title: data.title || "Untitled Resume",
      targetRole: data.targetRole || "",
      summary: data.summary || "",
      personalInfo: {
        create: {
          fullName: data.personalInfo?.fullName || session.user.name || "",
          email: data.personalInfo?.email || session.user.email || "",
          phone: data.personalInfo?.phone || "",
          location: data.personalInfo?.location || "",
          jobTitle: data.personalInfo?.jobTitle || "",
          linkedin: data.personalInfo?.linkedin || "",
          github: data.personalInfo?.github || "",
        },
      },
      experiences: {
        create: data.experiences?.map((exp) => ({
          company: exp.company,
          position: exp.position,
          startDate: exp.startDate || "",
          endDate: exp.endDate || "",
          isCurrent: exp.isCurrent || false,
          description: exp.description || "",
        })) || [],
      },
      educations: {
        create: data.educations?.map((edu) => ({
          institution: edu.institution,
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy || "",
          endDate: edu.endDate || "",
        })) || [],
      },
      skills: {
        create: data.skills?.map((skill) => ({
          name: skill.name,
        })) || [],
      },
      projects: {
        create: data.projects?.map((proj) => ({
          title: proj.title,
          description: proj.description || "",
          technologies: proj.technologies || "",
        })) || [],
      },
    },
  });

  revalidatePath("/dashboard");
  return resume;
}

export async function deleteResume(resumeId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const existing = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
  });

  if (!existing) {
    throw new Error("Resume not found or permission denied");
  }

  await prisma.resume.delete({
    where: { id: resumeId },
  });

  revalidatePath("/dashboard");
  return { success: true };
}

export async function duplicateResume(resumeId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const original = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
    include: {
      personalInfo: true,
      experiences: true,
      educations: true,
      skills: true,
      projects: true,
      certifications: true,
      customSections: true,
    },
  });

  if (!original) {
    throw new Error("Original resume not found");
  }

  const newResume = await prisma.resume.create({
    data: {
      userId: session.user.id,
      title: `${original.title} (Copy)`,
      targetRole: original.targetRole,
      summary: original.summary,
      themeColor: original.themeColor,
      templateId: original.templateId,
      fontSize: original.fontSize,
      fontFamily: original.fontFamily,
      personalInfo: original.personalInfo
        ? {
            create: {
              fullName: original.personalInfo.fullName,
              email: original.personalInfo.email,
              phone: original.personalInfo.phone,
              location: original.personalInfo.location,
              jobTitle: original.personalInfo.jobTitle,
              website: original.personalInfo.website,
              linkedin: original.personalInfo.linkedin,
              github: original.personalInfo.github,
            },
          }
        : undefined,
      experiences: {
        create: original.experiences.map((exp) => ({
          company: exp.company,
          position: exp.position,
          startDate: exp.startDate,
          endDate: exp.endDate,
          isCurrent: exp.isCurrent,
          location: exp.location,
          description: exp.description,
          order: exp.order,
        })),
      },
      educations: {
        create: original.educations.map((edu) => ({
          institution: edu.institution,
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy,
          startDate: edu.startDate,
          endDate: edu.endDate,
          isCurrent: edu.isCurrent,
          gpa: edu.gpa,
          location: edu.location,
          description: edu.description,
          order: edu.order,
        })),
      },
      skills: {
        create: original.skills.map((skill) => ({
          name: skill.name,
          category: skill.category,
          level: skill.level,
          order: skill.order,
        })),
      },
      projects: {
        create: original.projects.map((proj) => ({
          title: proj.title,
          description: proj.description,
          technologies: proj.technologies,
          link: proj.link,
          startDate: proj.startDate,
          endDate: proj.endDate,
          order: proj.order,
        })),
      },
      certifications: {
        create: original.certifications.map((cert) => ({
          name: cert.name,
          issuer: cert.issuer,
          issueDate: cert.issueDate,
          expiryDate: cert.expiryDate,
          credentialUrl: cert.credentialUrl,
          order: cert.order,
        })),
      },
      customSections: {
        create: original.customSections.map((cs) => ({
          title: cs.title,
          content: cs.content,
          order: cs.order,
        })),
      },
    },
  });

  revalidatePath("/dashboard");
  return newResume;
}
