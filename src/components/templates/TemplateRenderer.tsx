import { FullResume } from "@/types/resume";
import { ClassicTemplate } from "./ClassicTemplate";
import { ModernTemplate } from "./ModernTemplate";
import { MinimalTemplate } from "./MinimalTemplate";
import { ExecutiveTemplate } from "./ExecutiveTemplate";
import { CreativeTemplate } from "./CreativeTemplate";
import { CompactTemplate } from "./CompactTemplate";
import { TimelineTemplate } from "./TimelineTemplate";
import { SidebarTemplate } from "./SidebarTemplate";
import { SplitTemplate } from "./SplitTemplate";
import { BoldTemplate } from "./BoldTemplate";
import { GradientTemplate } from "./GradientTemplate";
import { ElegantTemplate } from "./ElegantTemplate";
import { TechTemplate } from "./TechTemplate";
import { DarkTemplate } from "./DarkTemplate";
import { CardTemplate } from "./CardTemplate";
import { LuxuryTemplate } from "./LuxuryTemplate";

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
    case "creative":
      return <CreativeTemplate resume={resume} />;
    case "compact":
      return <CompactTemplate resume={resume} />;
    case "timeline":
      return <TimelineTemplate resume={resume} />;
    case "sidebar":
      return <SidebarTemplate resume={resume} />;
    case "split":
      return <SplitTemplate resume={resume} />;
    case "bold":
      return <BoldTemplate resume={resume} />;
    case "gradient":
      return <GradientTemplate resume={resume} />;
    case "elegant":
      return <ElegantTemplate resume={resume} />;
    case "tech":
      return <TechTemplate resume={resume} />;
    case "dark":
      return <DarkTemplate resume={resume} />;
    case "card":
      return <CardTemplate resume={resume} />;
    case "luxury":
      return <LuxuryTemplate resume={resume} />;
    case "classic":
    default:
      return <ClassicTemplate resume={resume} />;
  }
}
