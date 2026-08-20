import { FullResume } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Link as LinkIcon } from "lucide-react";

interface TemplateProps {
  resume: FullResume;
}

export function BoldTemplate({ resume }: TemplateProps) {
  const { personalInfo, experiences, educations, skills, projects, certifications } = resume;
  const themeColor = resume.themeColor || "#3b82f6";

  return (
    <div className="w-full bg-white text-slate-800 font-sans min-h-[1050px] flex flex-col">
      {/* Bold Header */}
      <div className="p-8 text-white" style={{ backgroundColor: themeColor }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase">
              {personalInfo?.fullName || "Your Full Name"}
            </h1>
            {personalInfo?.jobTitle && (
              <p className="text-base font-semibold mt-1 opacity-90">
                {personalInfo.jobTitle}
              </p>
            )}
          </div>
          <div className="text-right text-xs opacity-85 space-y-0.5">
            {personalInfo?.email && <p className="flex items-center gap-1"><Mail className="h-3 w-3" /> {personalInfo.email}</p>}
            {personalInfo?.phone && <p className="flex items-center gap-1"><Phone className="h-3 w-3" /> {personalInfo.phone}</p>}
            {personalInfo?.location && <p className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {personalInfo.location}</p>}
            {personalInfo?.linkedin && <p className="flex items-center gap-1"><LinkIcon className="h-3 w-3" /> {personalInfo.linkedin}</p>}
            {personalInfo?.github && <p className="flex items-center gap-1"><Globe className="h-3 w-3" /> {personalInfo.github}</p>}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6 flex-1">
        {resume.summary && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider" style={{ color: themeColor }}>
              Professional Summary
            </h2>
            <div className="mt-2 h-1 w-16 rounded" style={{ backgroundColor: themeColor }} />
            <p className="mt-2 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
              {resume.summary}
            </p>
          </div>
        )}

        {experiences && experiences.length > 0 && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider" style={{ color: themeColor }}>
              Experience
            </h2>
            <div className="mt-2 h-1 w-16 rounded" style={{ backgroundColor: themeColor }} />
            <div className="mt-3 space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold text-slate-900">{exp.position}</h3>
                    <span className="text-[11px] font-medium text-slate-500">
                      {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs font-bold" style={{ color: themeColor }}>{exp.company}</p>
                  {exp.description && (
                    <p className="mt-1 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
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
            <h2 className="text-sm font-black uppercase tracking-wider" style={{ color: themeColor }}>
              Education
            </h2>
            <div className="mt-2 h-1 w-16 rounded" style={{ backgroundColor: themeColor }} />
            <div className="mt-3 space-y-3">
              {educations.map((edu) => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xs font-bold text-slate-900">
                      {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                    </h3>
                    <span className="text-[11px] text-slate-500">{edu.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-600">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects && projects.length > 0 && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider" style={{ color: themeColor }}>
              Projects
            </h2>
            <div className="mt-2 h-1 w-16 rounded" style={{ backgroundColor: themeColor }} />
            <div className="mt-3 space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                    {proj.link && (
                      <span className="text-[11px] text-blue-600 underline">{proj.link}</span>
                    )}
                  </div>
                  {proj.technologies && (
                    <p className="text-[11px] text-slate-500 font-medium">Tech: {proj.technologies}</p>
                  )}
                  {proj.description && (
                    <p className="mt-1 text-xs text-slate-700 leading-relaxed">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {skills && skills.length > 0 && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider" style={{ color: themeColor }}>
              Skills
            </h2>
            <div className="mt-2 h-1 w-16 rounded" style={{ backgroundColor: themeColor }} />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded-md px-3 py-1 text-xs font-bold"
                  style={{
                    backgroundColor: `${themeColor}15`,
                    color: themeColor,
                    border: `2px solid ${themeColor}30`,
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider" style={{ color: themeColor }}>
              Certifications
            </h2>
            <div className="mt-2 h-1 w-16 rounded" style={{ backgroundColor: themeColor }} />
            <div className="mt-3 flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span key={cert.id} className="text-xs px-2.5 py-1 rounded-md font-bold" style={{ backgroundColor: `${themeColor}12`, color: themeColor, border: `2px solid ${themeColor}30` }}>
                  {cert.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}