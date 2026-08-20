import { FullResume } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Link as LinkIcon } from "lucide-react";

interface TemplateProps {
  resume: FullResume;
}

export function TimelineTemplate({ resume }: TemplateProps) {
  const { personalInfo, experiences, educations, skills, projects, certifications } = resume;
  const themeColor = resume.themeColor || "#3b82f6";

  return (
    <div className="w-full bg-white text-slate-800 font-sans min-h-[1050px] flex flex-col">
      {/* Header */}
      <div className="p-8 border-b-4" style={{ borderColor: themeColor }}>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {personalInfo?.fullName || "Your Full Name"}
        </h1>
        {personalInfo?.jobTitle && (
          <p className="text-base font-medium mt-1 text-slate-600">
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
          {personalInfo?.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" style={{ color: themeColor }} /> {personalInfo.email}
            </span>
          )}
          {personalInfo?.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" style={{ color: themeColor }} /> {personalInfo.phone}
            </span>
          )}
          {personalInfo?.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" style={{ color: themeColor }} /> {personalInfo.location}
            </span>
          )}
          {personalInfo?.linkedin && (
            <span className="flex items-center gap-1">
              <LinkIcon className="h-3 w-3" style={{ color: themeColor }} /> {personalInfo.linkedin}
            </span>
          )}
          {personalInfo?.github && (
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" style={{ color: themeColor }} /> {personalInfo.github}
            </span>
          )}
        </div>
      </div>

      <div className="p-8 space-y-6 flex-1">
        {resume.summary && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: themeColor }}>
              Professional Summary
            </h2>
            <div className="mt-2 h-0.5 w-12 rounded" style={{ backgroundColor: themeColor }} />
            <p className="mt-2 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
              {resume.summary}
            </p>
          </div>
        )}

        {experiences && experiences.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: themeColor }}>
              Experience
            </h2>
            <div className="mt-2 h-0.5 w-12 rounded" style={{ backgroundColor: themeColor }} />
            <div className="mt-4 space-y-4">
              {experiences.map((exp, idx) => (
                <div key={exp.id} className="relative pl-6">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 w-3 h-3 rounded-full" style={{ backgroundColor: themeColor }} />
                  {/* Timeline line */}
                  {idx < experiences.length - 1 && (
                    <div className="absolute left-1.5 top-3 w-0.5 h-full bg-slate-200" />
                  )}
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold text-slate-900">{exp.position}</h3>
                    <span className="text-[11px] font-medium text-slate-500">
                      {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs font-medium" style={{ color: themeColor }}>{exp.company}</p>
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
            <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: themeColor }}>
              Education
            </h2>
            <div className="mt-2 h-0.5 w-12 rounded" style={{ backgroundColor: themeColor }} />
            <div className="mt-4 space-y-3">
              {educations.map((edu, idx) => (
                <div key={edu.id} className="relative pl-6">
                  <div className="absolute left-0 top-0 w-3 h-3 rounded-full" style={{ backgroundColor: themeColor }} />
                  {idx < educations.length - 1 && (
                    <div className="absolute left-1.5 top-3 w-0.5 h-full bg-slate-200" />
                  )}
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
            <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: themeColor }}>
              Projects
            </h2>
            <div className="mt-2 h-0.5 w-12 rounded" style={{ backgroundColor: themeColor }} />
            <div className="mt-4 space-y-3">
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
            <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: themeColor }}>
              Skills
            </h2>
            <div className="mt-2 h-0.5 w-12 rounded" style={{ backgroundColor: themeColor }} />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: `${themeColor}15`,
                    color: themeColor,
                    border: `1px solid ${themeColor}30`,
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
            <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: themeColor }}>
              Certifications
            </h2>
            <div className="mt-2 h-0.5 w-12 rounded" style={{ backgroundColor: themeColor }} />
            <div className="mt-3 flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span key={cert.id} className="text-xs px-2.5 py-1 rounded-md font-medium" style={{ backgroundColor: `${themeColor}12`, color: themeColor, border: `1px solid ${themeColor}30` }}>
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