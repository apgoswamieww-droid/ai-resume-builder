import {
  Resume as PrismaResume,
  PersonalInfo as PrismaPersonalInfo,
  WorkExperience as PrismaWorkExperience,
  Education as PrismaEducation,
  Skill as PrismaSkill,
  Project as PrismaProject,
  Certification as PrismaCertification,
  CustomSection as PrismaCustomSection,
} from "@prisma/client";

export type Resume = PrismaResume;
export type PersonalInfo = PrismaPersonalInfo;
export type WorkExperience = PrismaWorkExperience;
export type Education = PrismaEducation;
export type Skill = PrismaSkill;
export type Project = PrismaProject;
export type Certification = PrismaCertification;
export type CustomSection = PrismaCustomSection;

export type FullResume = Resume & {
  personalInfo: PersonalInfo | null;
  experiences: WorkExperience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  customSections: CustomSection[];
};
