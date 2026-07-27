import { FullResume } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Link as LinkIcon } from "lucide-react";

interface TemplateProps {
  resume: FullResume;
}

export function ClassicTemplate({ resume }: TemplateProps) {
  const { personalInfo, experiences, educations, skills, projects } = resume;
  const themeColor = resume.themeColor || "#3b82f6";

  return (
    <div className="w-full bg-white text-slate-800 p-8 shadow-sm font-sans min-h-[1050px] flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="text-center border-b pb-6" style={{ borderColor: `${themeColor}40` }}>
          <h1 className="text-3xl font-bold tracking-tight uppercase" style={{ color: themeColor }}>
            {personalInfo?.fullName || "Your Full Name"}
          </h1>
          {personalInfo?.jobTitle && (
            <p className="text-base font-semibold text-slate-600 mt-1 uppercase tracking-wide">
              {personalInfo.jobTitle}
            </p>
          )}

          {/* Contact Details */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-600">
            {personalInfo?.email && (
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3" style={{ color: themeColor }} />
                {personalInfo.email}
              </span>
            )}
            {personalInfo?.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" style={{ color: themeColor }} />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo?.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" style={{ color: themeColor }} />
                {personalInfo.location}
              </span>
            )}
            {personalInfo?.linkedin && (
              <span className="flex items-center gap-1">
                <LinkIcon className="h-3 w-3" style={{ color: themeColor }} />
                {personalInfo.linkedin}
              </span>
            )}
            {personalInfo?.github && (
              <span className="flex items-center gap-1">
                <Globe className="h-3 w-3" style={{ color: themeColor }} />
                {personalInfo.github}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        {resume.summary && (
          <div className="mt-6">
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2"
              style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
              Professional Summary
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
              {resume.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {experiences && experiences.length > 0 && (
          <div className="mt-6">
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-3"
              style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
              Work Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold text-slate-900">{exp.position}</h3>
                    <span className="text-[11px] font-medium text-slate-500">
                      {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span>{exp.company}</span>
                    {exp.location && <span>{exp.location}</span>}
                  </div>
                  {exp.description && (
                    <p className="mt-1.5 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {educations && educations.length > 0 && (
          <div className="mt-6">
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-3"
              style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {educations.map((edu) => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xs font-bold text-slate-900">
                      {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      {edu.startDate} - {edu.isCurrent ? "Present" : edu.endDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>{edu.institution}</span>
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="mt-6">
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-3"
              style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
              Key Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                    {proj.link && (
                      <span className="text-[11px] text-blue-600 underline">
                        {proj.link}
                      </span>
                    )}
                  </div>
                  {proj.technologies && (
                    <p className="text-[11px] text-slate-500 font-medium">
                      Tech: {proj.technologies}
                    </p>
                  )}
                  {proj.description && (
                    <p className="mt-1 text-xs text-slate-700 leading-relaxed">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mt-6">
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2"
              style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                >
                  {skill.name} {skill.level ? `(${skill.level})` : ""}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-[10px] text-slate-400 border-t pt-2">
        Generated with AI Resume Builder
      </div>
    </div>
  );
}
