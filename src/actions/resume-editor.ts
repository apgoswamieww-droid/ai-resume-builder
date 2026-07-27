"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function verifyOwnership(resumeId: string, userId: string) {
  const existing = await prisma.resume.findFirst({
    where: { id: resumeId, userId },
  });
  if (!existing) {
    throw new Error("Resume not found or unauthorized");
  }
  return existing;
}

export async function getResumeById(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const resume = await prisma.resume.findFirst({
    where: { id, userId: session.user.id },
    include: {
      personalInfo: true,
      experiences: { orderBy: { order: "asc" } },
      educations: { orderBy: { order: "asc" } },
      skills: { orderBy: { order: "asc" } },
      projects: { orderBy: { order: "asc" } },
      certifications: { orderBy: { order: "asc" } },
      customSections: { orderBy: { order: "asc" } },
    },
  });

  return resume;
}

export async function updateResumeDetails(
  resumeId: string,
  data: {
    title?: string;
    targetRole?: string;
    summary?: string;
    themeColor?: string;
    templateId?: string;
    fontSize?: string;
    fontFamily?: string;
    atsScore?: number | null;
    matchScore?: number | null;
  }
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  const updated = await prisma.resume.update({
    where: { id: resumeId },
    data,
  });

  revalidatePath(`/builder/${resumeId}`);
  return updated;
}

export async function updatePersonalInfo(
  resumeId: string,
  data: {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    jobTitle?: string;
    website?: string;
    linkedin?: string;
    github?: string;
  }
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  const updated = await prisma.personalInfo.upsert({
    where: { resumeId },
    update: data,
    create: {
      resumeId,
      ...data,
    },
  });

  revalidatePath(`/builder/${resumeId}`);
  return updated;
}

// ─── Work Experience ──────────────────────────────────────────────

export async function addWorkExperience(
  resumeId: string,
  data: {
    company: string;
    position: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    location?: string;
    description?: string;
  }
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  const exp = await prisma.workExperience.create({
    data: {
      resumeId,
      ...data,
    },
  });

  revalidatePath(`/builder/${resumeId}`);
  return exp;
}

export async function updateWorkExperience(
  id: string,
  resumeId: string,
  data: {
    company?: string;
    position?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    location?: string;
    description?: string;
  }
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  const updated = await prisma.workExperience.update({
    where: { id },
    data,
  });

  revalidatePath(`/builder/${resumeId}`);
  return updated;
}

export async function deleteWorkExperience(id: string, resumeId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  await prisma.workExperience.delete({ where: { id } });

  revalidatePath(`/builder/${resumeId}`);
  return { success: true };
}

// ─── Education ────────────────────────────────────────────────────

export async function addEducation(
  resumeId: string,
  data: {
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    gpa?: string;
    location?: string;
    description?: string;
  }
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  const edu = await prisma.education.create({
    data: {
      resumeId,
      ...data,
    },
  });

  revalidatePath(`/builder/${resumeId}`);
  return edu;
}

export async function updateEducation(
  id: string,
  resumeId: string,
  data: {
    institution?: string;
    degree?: string;
    fieldOfStudy?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    gpa?: string;
    location?: string;
    description?: string;
  }
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  const updated = await prisma.education.update({
    where: { id },
    data,
  });

  revalidatePath(`/builder/${resumeId}`);
  return updated;
}

export async function deleteEducation(id: string, resumeId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  await prisma.education.delete({ where: { id } });

  revalidatePath(`/builder/${resumeId}`);
  return { success: true };
}

// ─── Skills ───────────────────────────────────────────────────────

export async function addSkill(
  resumeId: string,
  data: { name: string; category?: string; level?: string }
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  const skill = await prisma.skill.create({
    data: {
      resumeId,
      ...data,
    },
  });

  revalidatePath(`/builder/${resumeId}`);
  return skill;
}

export async function deleteSkill(id: string, resumeId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  await prisma.skill.delete({ where: { id } });

  revalidatePath(`/builder/${resumeId}`);
  return { success: true };
}

// ─── Projects ─────────────────────────────────────────────────────

export async function addProject(
  resumeId: string,
  data: {
    title: string;
    description?: string;
    technologies?: string;
    link?: string;
    startDate?: string;
    endDate?: string;
  }
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  const project = await prisma.project.create({
    data: {
      resumeId,
      ...data,
    },
  });

  revalidatePath(`/builder/${resumeId}`);
  return project;
}

export async function updateProject(
  id: string,
  resumeId: string,
  data: {
    title?: string;
    description?: string;
    technologies?: string;
    link?: string;
    startDate?: string;
    endDate?: string;
  }
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  const updated = await prisma.project.update({
    where: { id },
    data,
  });

  revalidatePath(`/builder/${resumeId}`);
  return updated;
}

export async function deleteProject(id: string, resumeId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  await prisma.project.delete({ where: { id } });

  revalidatePath(`/builder/${resumeId}`);
  return { success: true };
}

// ─── Skills Update ─────────────────────────────────────────────────

export async function updateSkill(
  id: string,
  resumeId: string,
  data: { name?: string; category?: string; level?: string }
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  const updated = await prisma.skill.update({
    where: { id },
    data,
  });

  revalidatePath(`/builder/${resumeId}`);
  return updated;
}

// ─── Certifications ────────────────────────────────────────────────

export async function addCertification(
  resumeId: string,
  data: {
    name: string;
    issuer: string;
    issueDate?: string;
    expiryDate?: string;
    credentialUrl?: string;
  }
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  const cert = await prisma.certification.create({
    data: { resumeId, ...data },
  });

  revalidatePath(`/builder/${resumeId}`);
  return cert;
}

export async function updateCertification(
  id: string,
  resumeId: string,
  data: {
    name?: string;
    issuer?: string;
    issueDate?: string;
    expiryDate?: string;
    credentialUrl?: string;
  }
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  const updated = await prisma.certification.update({
    where: { id },
    data,
  });

  revalidatePath(`/builder/${resumeId}`);
  return updated;
}

export async function deleteCertification(id: string, resumeId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  await prisma.certification.delete({ where: { id } });

  revalidatePath(`/builder/${resumeId}`);
  return { success: true };
}

// ─── Custom Sections ───────────────────────────────────────────────

export async function addCustomSection(
  resumeId: string,
  data: { title: string; content?: string }
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  const section = await prisma.customSection.create({
    data: { resumeId, ...data },
  });

  revalidatePath(`/builder/${resumeId}`);
  return section;
}

export async function updateCustomSection(
  id: string,
  resumeId: string,
  data: { title?: string; content?: string }
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  const updated = await prisma.customSection.update({
    where: { id },
    data,
  });

  revalidatePath(`/builder/${resumeId}`);
  return updated;
}

export async function deleteCustomSection(id: string, resumeId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  await prisma.customSection.delete({ where: { id } });

  revalidatePath(`/builder/${resumeId}`);
  return { success: true };
}

// ─── Reorder ───────────────────────────────────────────────────────

export async function importResumeData(
  resumeId: string,
  data: {
    title?: string;
    targetRole?: string;
    summary?: string;
    themeColor?: string;
    templateId?: string;
    personalInfo?: {
      fullName?: string;
      email?: string;
      phone?: string;
      location?: string;
      jobTitle?: string;
      website?: string;
      linkedin?: string;
      github?: string;
    };
  }
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  await prisma.resume.update({
    where: { id: resumeId },
    data: {
      title: data.title,
      targetRole: data.targetRole,
      summary: data.summary,
      themeColor: data.themeColor,
      templateId: data.templateId,
      personalInfo: data.personalInfo ? {
        upsert: {
          create: { ...data.personalInfo, resumeId },
          update: data.personalInfo,
        },
      } : undefined,
    },
  });
}

export async function reorderItems(
  resumeId: string,
  items: { id: string; order: number }[],
  model: "experience" | "education" | "skill" | "project" | "certification" | "customSection"
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await verifyOwnership(resumeId, session.user.id);

  const modelMap = {
    experience: "workExperience",
    education: "education",
    skill: "skill",
    project: "project",
    certification: "certification",
    customSection: "customSection",
  } as const;

  const prismaModel = (prisma as any)[modelMap[model]];

  for (const item of items) {
    await prismaModel.update({
      where: { id: item.id },
      data: { order: item.order },
    });
  }

  revalidatePath(`/builder/${resumeId}`);
  return { success: true };
}
