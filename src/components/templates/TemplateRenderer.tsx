import { FullResume } from "@/types/resume";
import { ClassicTemplate } from "./ClassicTemplate";
import { ModernTemplate } from "./ModernTemplate";
import { MinimalTemplate } from "./MinimalTemplate";
import { ExecutiveTemplate } from "./ExecutiveTemplate";

interface TemplateRendererProps {
  resume: FullResume;
}

export function TemplateRenderer({ resume }: TemplateRendererProps) {
  switch (resume.templateId) {
    case "modern":
      return <ModernTemplate resume={resume} />;
    case "minimal":
      return <MinimalTemplate resume={resume} />;
    case "executive":
      return <ExecutiveTemplate resume={resume} />;
    case "classic":
    default:
      return <ClassicTemplate resume={resume} />;
  }
}
