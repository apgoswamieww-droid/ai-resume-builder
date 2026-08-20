import { FullResume } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Link as LinkIcon } from "lucide-react";

interface TemplateProps {
  resume: FullResume;
}

export function SidebarTemplate({ resume }: TemplateProps) {
  const { personalInfo, experiences, educations, skills, projects, certifications } = resume;
  const themeColor = resume.themeColor || "#3b82f6";

  return (
    <div className="w-full bg-white text-slate-800 font-sans min-h-[1050px] flex">
      {/* Left Sidebar */}
      <div className="w-[240px] shrink-0 p-6 flex flex-col gap-4" style={{ backgroundColor: `${themeColor}08` }}>
        <div className="text-center">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white" style={{ backgroundColor: themeColor }}>
            {(personalInfo?.fullName || "?").charAt(0)}
          </div>
          <h1 className="mt-3 text-lg font-bold text-slate-900 leading-tight">
            {personalInfo?.fullName || "Your Full Name"}
          </h1>
          {personalInfo?.jobTitle && (
            <p className="text-[11px] font-medium mt-1 text-slate-500">
              {personalInfo.jobTitle}
            </p>
          )}
        </div>

        <div className="border-t border-slate-200 pt-3 space-y-1.5">
          <h3 className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">Contact</h3>
          {personalInfo?.email && (
            <p className="text-[10px] text-slate-600 flex items-center gap-1">
              <Mail className="h-3 w-3" style={{ color: themeColor }} /> {personalInfo.email}
            </p>
          )}
          {personalInfo?.phone && (
            <p className="text-[10px] text-slate-600 flex items-center gap-1">
              <Phone className="h-3 w-3" style={{ color: themeColor }} /> {personalInfo.phone}
            </p>
          )}
          {personalInfo?.location && (
            <p className="text-[10px] text-slate-600 flex items-center gap-1">
              <MapPin className="h-3 w-3" style={{ color: themeColor }} /> {personalInfo.location}
            </p>
          )}
          {personalInfo?.linkedin && (
            <p className="text-[10px] text-slate-600 flex items-center gap-1">
              <LinkIcon className="h-3 w-3" style={{ color: themeColor }} /> {personalInfo.linkedin}
            </p>
          )}
          {personalInfo?.github && (
            <p className="text-[10px] text-slate-600 flex items-center gap-1">
              <Globe className="h-3 w-3" style={{ color: themeColor }} /> {personalInfo.github}
            </p>
          )}
        </div>

        {skills && skills.length > 0 && (
          <div className="border-t border-slate-200 pt-3">
            <h3 className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Skills</h3>
            <div className="space-y-1.5">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-[10px]">
                    <span className="font-medium text-slate-700">{skill.name}</span>
                  </div>
                  <div className="mt-0.5 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.min(100, 60 + Math.random() * 40)}%`, backgroundColor: themeColor }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications && certifications.length > 0 && (
          <div className="border-t border-slate-200 pt-3">
            <h3 className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Certifications</h3>
            <div className="space-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-[10px] font-medium text-slate-700 leading-tight">{cert.name}</p>
                  <p className="text-[9px] text-slate-400">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-5">
        {resume.summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: themeColor }}>Profile</h2>
            <div className="mt-1 h-px w-full bg-slate-200" />
            <p className="mt-1.5 text-[11px] text-slate-700 leading-relaxed whitespace-pre-line">
              {resume.summary}
            </p>
          </div>
        )}

        {experiences && experiences.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: themeColor }}>Experience</h2>
            <div className="mt-1 h-px w-full bg-slate-200" />
            <div className="mt-2 space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xs font-bold text-slate-900">{exp.position}</h3>
                    <span className="text-[9px] text-slate-400">
                      {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-[10px] font-medium" style={{ color: themeColor }}>{exp.company}</p>
                  {exp.description && (
                    <p className="mt-0.5 text-[10px] text-slate-600 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {educations && educations.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: themeColor }}>Education</h2>
            <div className="mt-1 h-px w-full bg-slate-200" />
            <div className="mt-2 space-y-2">
              {educations.map((edu) => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xs font-bold text-slate-900">
                      {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                    </h3>
                    <span className="text-[9px] text-slate-400">{edu.endDate}</span>
                  </div>
                  <p className="text-[10px] text-slate-600">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects && projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: themeColor }}>Projects</h2>
            <div className="mt-1 h-px w-full bg-slate-200" />
            <div className="mt-2 space-y-2">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="text-[11px] font-bold text-slate-900">{proj.title}</h3>
                  {proj.technologies && (
                    <p className="text-[9px] text-slate-400">{proj.technologies}</p>
                  )}
                  {proj.description && (
                    <p className="mt-0.5 text-[10px] text-slate-600 leading-relaxed">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}